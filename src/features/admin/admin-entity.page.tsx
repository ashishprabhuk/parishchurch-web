import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"

import { EmptyState } from "@/components/feedback/empty-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSeo } from "@/hooks/use-seo"
import { formatDate } from "@/lib/format"

import { AdminDeleteDialog } from "./admin-delete-dialog"
import { AdminRecordDialog } from "./admin-record-dialog"
import { getAdminEntity } from "./types"
import { useAdminCollection } from "./use-admin"

function cellValue(
  value: unknown,
  type?: "text" | "textarea" | "date" | "select",
): string {
  if (value === undefined || value === null || value === "") {
    return "—"
  }
  if (type === "date") {
    return formatDate(value as string, "dd MMM yyyy", "—")
  }
  return String(value)
}

export default function AdminEntityPage() {
  const { entity = "" } = useParams()
  const config = getAdminEntity(entity)
  const [searchTerm, setSearchTerm] = useState("")

  useSeo({
    title: `${config?.label ?? "Admin"} | Parish Admin`,
    description: config?.description ?? "Manage content.",
    canonicalPath: `/admin/${entity}`,
  })

  const { data = [], isLoading } = useAdminCollection(
    config?.type ?? "announcements",
  )

  if (!config) {
    return <Navigate to="/admin" replace />
  }

  const filteredData = data.filter((record) => {
    if (!searchTerm.trim()) return true
    const query = searchTerm.toLowerCase()
    return Object.values(record).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        String(val).toLowerCase().includes(query),
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl">{config.label}</h1>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {config.description}
          </p>
        </div>
        <AdminRecordDialog
          config={config}
          trigger={
            <Button className="w-full sm:w-auto">
              <Plus className="size-4" /> New {config.singular}
            </Button>
          }
        />
      </div>

      <div className="relative max-w-sm">
        <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          type="search"
          placeholder={`Search ${config.label.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-9 text-xs"
        />
      </div>

      {isLoading ? (
        <LoadingState />
      ) : filteredData.length === 0 ? (
        <EmptyState
          title={`No ${config.label.toLowerCase()} found`}
          description={
            searchTerm
              ? "No records matched your search query."
              : `Create your first ${config.singular.toLowerCase()} to see it here.`
          }
        />
      ) : (
        <Card>
          <CardContent className="overflow-x-auto p-0">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow>
                  {config.columns.map((column) => (
                    <TableHead key={column.key}>{column.label}</TableHead>
                  ))}
                  <TableHead className="w-[110px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    {config.columns.map((column, columnIndex) => (
                      <TableCell
                        key={column.key}
                        className={
                          columnIndex === 0 ? "font-medium" : undefined
                        }
                      >
                        {columnIndex === 1 && column.key === "category" ? (
                          <Badge variant="secondary">
                            {cellValue(record[column.key], column.type)}
                          </Badge>
                        ) : (
                          <span className="line-clamp-2">
                            {cellValue(record[column.key], column.type)}
                          </span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <AdminRecordDialog
                          config={config}
                          record={record}
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Edit ${config.singular}`}
                            >
                              <Pencil className="size-4" />
                            </Button>
                          }
                        />
                        <AdminDeleteDialog
                          config={config}
                          record={record}
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Delete ${config.singular}`}
                            >
                              <Trash2 className="text-destructive size-4" />
                            </Button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
