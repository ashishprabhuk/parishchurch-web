import { Pencil, Plus, Trash2 } from "lucide-react"
import { Navigate, useParams } from "react-router-dom"

import { EmptyState } from "@/components/feedback/empty-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl">{config.label}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {config.description}
          </p>
        </div>
        <AdminRecordDialog
          config={config}
          trigger={
            <Button>
              <Plus className="size-4" /> New {config.singular}
            </Button>
          }
        />
      </div>

      {isLoading ? (
        <LoadingState />
      ) : data.length === 0 ? (
        <EmptyState
          title={`No ${config.label.toLowerCase()} yet`}
          description={`Create your first ${config.singular.toLowerCase()} to see it here.`}
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
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
                {data.map((record) => (
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
