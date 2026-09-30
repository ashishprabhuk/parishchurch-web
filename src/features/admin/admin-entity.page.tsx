import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"

import { EmptyState } from "@/components/feedback/empty-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { PaginationControls } from "@/components/common/pagination-controls"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  type?:
    | "text"
    | "textarea"
    | "date"
    | "time"
    | "number"
    | "key-value"
    | "member-list"
    | "select",
): string {
  if (value === undefined || value === null || value === "") {
    return "—"
  }
  if (type === "date") {
    return formatDate(value as string, "dd MMM yyyy", "—")
  }
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, entryValue]) => `${key}: ${String(entryValue)}`)
      .join("; ")
  }
  return String(value)
}

function ObjectCell({
  label,
  value,
}: {
  label: string
  value: Record<string, unknown>
}) {
  const entries = Object.entries(value)

  if (entries.length === 0) return <span>—</span>

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="max-w-full"
            aria-label={`View ${label}`}
          />
        }
      >
        <Eye className="size-3.5" />
        <span>{entries.length} {entries.length === 1 ? "entry" : "entries"}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-border/70">
          {entries.map(([entryKey, entryValue]) => (
            <div
              key={entryKey}
              className="grid gap-1 border-b border-border/60 px-3 py-2.5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-4"
            >
              <span className="text-muted-foreground text-xs font-medium break-words">
                {entryKey}
              </span>
              <span className="text-sm break-words">
                {String(entryValue)}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ChronicleBodyCell({ value }: { value: unknown }) {
  const body = String(value ?? "").trim()
  if (!body) return <span>—</span>

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="View Chronicle body"
          />
        }
      >
        <Eye className="size-3.5" /> View body
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chronicle body</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-border/70 p-4 text-sm leading-7 whitespace-pre-wrap">
          {body}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MemberListCell({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return <span>—</span>

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="View cell members"
          />
        }
      >
        <Eye className="size-3.5" />
        <span>{value.length} {value.length === 1 ? "member" : "members"}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cell members</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-border/70">
          {value.map((member, index) => {
            const entry =
              member && typeof member === "object"
                ? (member as Record<string, unknown>)
                : {}
            return (
              <div
                key={`${String(entry.name ?? "member")}-${index}`}
                className="grid gap-1 border-b border-border/60 px-3 py-2.5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-4"
              >
                <span className="text-sm font-medium break-words">
                  {String(entry.name ?? "—")}
                </span>
                <span className="text-muted-foreground text-sm break-words">
                  {String(entry.phone ?? "—")}
                </span>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminEntityPage() {
  const { entity = "" } = useParams()
  const config = getAdminEntity(entity)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const pageSize = 10

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
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize)

  const updateSearchTerm = (value: string) => {
    setSearchTerm(value)
    setPage(1)
  }

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

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder={`Search ${config.label.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => updateSearchTerm(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
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
                {pagedData.map((record) => (
                  <TableRow key={record.id}>
                    {config.columns.map((column, columnIndex) => (
                      <TableCell
                        key={column.key}
                        className={
                          columnIndex === 0 ? "font-medium" : undefined
                        }
                      >
                        {config.type === "chronicle" && column.key === "body" ? (
                          <ChronicleBodyCell value={record[column.key]} />
                        ) : column.type === "member-list" ? (
                          <MemberListCell value={record[column.key]} />
                        ) : column.type === "key-value" &&
                        record[column.key] &&
                        typeof record[column.key] === "object" ? (
                          <ObjectCell
                            label={column.label}
                            value={record[column.key] as Record<string, unknown>}
                          />
                        ) : columnIndex === 1 && column.key === "category" ? (
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
          {totalPages > 1 ? (
            <div className="border-t border-border/70 px-4 py-3">
              <PaginationControls
                page={page}
                totalPages={totalPages}
                onPrevious={() => setPage((current) => Math.max(1, current - 1))}
                onNext={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              />
            </div>
          ) : null}
        </Card>
      )}
    </div>
  )
}
