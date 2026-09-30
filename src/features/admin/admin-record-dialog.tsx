import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import type { ReactElement } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { notify } from "@/lib/toast"

import {
  useCreateAdminRecord,
  useUpdateAdminRecord,
} from "./use-admin"
import type { AdminEntityConfig, AdminField, AdminRecord } from "./types"

type RecordDialogProps = {
  config: AdminEntityConfig
  /** When provided, the dialog edits this record. Otherwise it creates one. */
  record?: AdminRecord
  trigger: ReactElement
}

function FieldInput({
  field,
  value,
  onChange,
  invalid,
}: {
  field: AdminField
  value: string
  onChange: (value: string) => void
  invalid?: boolean
}) {
  const id = `admin-field-${field.key}`

  if (field.type === "key-value") {
    return (
      <KeyValueEditor
        id={id}
        value={value}
        numericValues={field.key === "zoneDetails"}
        onChange={onChange}
      />
    )
  }

  if (field.type === "member-list") {
    return <MemberListEditor id={id} value={value} onChange={onChange} />
  }

  if (field.type === "textarea") {
    return (
      <Textarea
        id={id}
        value={value}
        rows={4}
        aria-invalid={invalid}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }

  if (field.type === "select" && field.options) {
    return (
      <Select value={value} onValueChange={(next) => onChange(String(next))}>
        <SelectTrigger className="w-full" aria-invalid={invalid}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {field.options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  if (field.type === "time") {
    return (
      <Input
        id={id}
        type="time"
        value={value}
        aria-invalid={invalid}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }

  if (field.type === "number") {
    return (
      <Input
        id={id}
        type="number"
        min="0"
        step="1"
        value={value}
        aria-invalid={invalid}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }

  return (
    <Input
      id={id}
      type={field.type === "date" ? "date" : "text"}
      value={value}
      aria-invalid={invalid}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

type KeyValueRow = { key: string; value: string }

function KeyValueEditor({
  id,
  value,
  numericValues,
  onChange,
}: {
  id: string
  value: string
  numericValues: boolean
  onChange: (value: string) => void
}) {
  const [rows, setRows] = useState<KeyValueRow[]>(() => parseRows(value))

  const updateRows = (nextRows: KeyValueRow[]) => {
    setRows(nextRows)
    const object = Object.fromEntries(
      nextRows
        .filter((row) => row.key.trim())
        .map((row) => [
          row.key.trim(),
          numericValues && row.value.trim() !== ""
            ? Number(row.value)
            : row.value,
        ]),
    )
    onChange(JSON.stringify(object))
  }

  return (
    <div id={id} className="space-y-2 rounded-lg border border-border/70 bg-muted/20 p-3">
      {rows.length === 0 ? (
        <p className="text-muted-foreground text-xs">No entries added yet.</p>
      ) : null}
      {rows.map((row, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            aria-label={`${numericValues ? "Statistic" : "Member"} label ${index + 1}`}
            placeholder={numericValues ? "Statistic name" : "Role or member"}
            value={row.key}
            onChange={(event) => {
              const nextRows = [...rows]
              nextRows[index] = { ...row, key: event.target.value }
              updateRows(nextRows)
            }}
          />
          <Input
            aria-label={`${numericValues ? "Statistic" : "Member"} value ${index + 1}`}
            type={numericValues ? "number" : "text"}
            placeholder={numericValues ? "0" : "Name"}
            value={row.value}
            onChange={(event) => {
              const nextRows = [...rows]
              nextRows[index] = { ...row, value: event.target.value }
              updateRows(nextRows)
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Remove entry ${index + 1}`}
            onClick={() => updateRows(rows.filter((_, rowIndex) => rowIndex !== index))}
          >
            <Trash2 className="text-destructive size-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => updateRows([...rows, { key: "", value: "" }])}
      >
        <Plus className="size-4" /> Add entry
      </Button>
    </div>
  )
}

function parseRows(value: string): KeyValueRow[] {
  if (!value.trim()) return []
  try {
    const parsed: unknown = JSON.parse(value)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return []
    return Object.entries(parsed).map(([key, entryValue]) => ({
      key,
      value: entryValue === null ? "" : String(entryValue),
    }))
  } catch {
    return []
  }
}

type MemberRow = { name: string; phone: string }

function MemberListEditor({
  id,
  value,
  onChange,
}: {
  id: string
  value: string
  onChange: (value: string) => void
}) {
  const [rows, setRows] = useState<MemberRow[]>(() => parseMemberRows(value))

  const updateRows = (nextRows: MemberRow[]) => {
    setRows(nextRows)
    onChange(JSON.stringify(nextRows))
  }

  return (
    <div id={id} className="space-y-2 rounded-lg border border-border/70 bg-muted/20 p-3">
      {rows.map((row, index) => (
        <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
          <Input
            aria-label={`Member name ${index + 1}`}
            placeholder="Member name"
            value={row.name}
            onChange={(event) => {
              const nextRows = [...rows]
              nextRows[index] = { ...row, name: event.target.value }
              updateRows(nextRows)
            }}
          />
          <Input
            aria-label={`Member phone ${index + 1}`}
            placeholder="Phone number"
            value={row.phone}
            onChange={(event) => {
              const nextRows = [...rows]
              nextRows[index] = { ...row, phone: event.target.value }
              updateRows(nextRows)
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Remove member ${index + 1}`}
            onClick={() => updateRows(rows.filter((_, rowIndex) => rowIndex !== index))}
          >
            <Trash2 className="text-destructive size-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => updateRows([...rows, { name: "", phone: "" }])}
      >
        <Plus className="size-4" /> Add member
      </Button>
    </div>
  )
}

function parseMemberRows(value: string): MemberRow[] {
  if (!value.trim()) return []
  try {
    const parsed: unknown = JSON.parse(value)
    if (!Array.isArray(parsed)) return []
    return parsed.map((member) => ({
      name: String((member as Record<string, unknown>).name ?? ""),
      phone: String((member as Record<string, unknown>).phone ?? ""),
    }))
  } catch {
    return []
  }
}

export function AdminRecordDialog({
  config,
  record,
  trigger,
}: RecordDialogProps) {
  const isEdit = Boolean(record)
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const createMutation = useCreateAdminRecord(config.type)
  const updateMutation = useUpdateAdminRecord(config.type)
  const isPending = createMutation.isPending || updateMutation.isPending

  const getSeedValues = () => {
    const seed: Record<string, string> = {}
    for (const field of config.fields) {
      const raw = record?.[field.key]
      const value =
        raw === undefined || raw === null
          ? ""
          : typeof raw === "object"
            ? JSON.stringify(raw, null, 2)
            : String(raw)
      seed[field.key] =
        field.type === "time" ? value.match(/^\d{2}:\d{2}/)?.[0] ?? value : value
    }
    return seed
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setValues(getSeedValues())
      setFieldErrors({})
    }
    setOpen(nextOpen)
  }

  const setField = (key: string, value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
    setFieldErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  const onSubmit = async () => {
    const primaryField = config.fields.find(
      (field) => field.key === config.titleKey,
    )
    const primaryLabel = primaryField?.label || config.columns[0]?.label || "Title"
    const nextErrors: Record<string, string> = {}
    const titleValue = values[config.titleKey]?.trim()
    if (!titleValue) {
      nextErrors[config.titleKey] = `${primaryLabel} is required.`
    }
    for (const field of config.fields) {
      const value = values[field.key]?.trim() ?? ""
      if (field.type === "date" && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        nextErrors[field.key] = `${field.label} must be a valid date.`
      }
      if (field.type === "time" && value && !/^\d{2}:\d{2}$/.test(value)) {
        nextErrors[field.key] = `${field.label} must use HH:MM format.`
      }
      if (field.type === "number" && value && !/^\d+$/.test(value)) {
        nextErrors[field.key] = `${field.label} must be a whole number.`
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      return
    }

    const payload: Record<string, unknown> = { ...values }
    try {
      if (isEdit && record) {
        await updateMutation.mutateAsync({ id: record.id, payload })
        notify.success(`${config.singular} updated.`)
      } else {
        await createMutation.mutateAsync(payload)
        notify.success(`${config.singular} created.`)
      }
      setOpen(false)
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : `Could not save ${config.singular.toLowerCase()}.`
      notify.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto p-4 sm:p-6 gap-4">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? `Edit ${config.singular}` : `New ${config.singular}`}
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {config.fields.map((field) => (
            <div key={`${field.key}-${open ? "open" : "closed"}`} className="grid gap-2">
              <Label htmlFor={`admin-field-${field.key}`}>{field.label}</Label>
              <FieldInput
                field={field}
                value={values[field.key] ?? ""}
                invalid={Boolean(fieldErrors[field.key])}
                onChange={(value) => setField(field.key, value)}
              />
              {fieldErrors[field.key] ? (
                <p className="text-destructive text-xs" role="alert">
                  {fieldErrors[field.key]}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button type="button" onClick={onSubmit} disabled={isPending}>
            {isPending
              ? "Saving..."
              : isEdit
                ? "Save changes"
                : `Create ${config.singular.toLowerCase()}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
