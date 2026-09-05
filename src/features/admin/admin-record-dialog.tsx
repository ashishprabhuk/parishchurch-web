import { useEffect, useState } from "react"
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
}: {
  field: AdminField
  value: string
  onChange: (value: string) => void
}) {
  const id = `admin-field-${field.key}`

  if (field.type === "textarea") {
    return (
      <Textarea
        id={id}
        value={value}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }

  if (field.type === "select" && field.options) {
    return (
      <Select value={value} onValueChange={(next) => onChange(String(next))}>
        <SelectTrigger className="w-full">
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

  return (
    <Input
      id={id}
      type={field.type === "date" ? "date" : "text"}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export function AdminRecordDialog({
  config,
  record,
  trigger,
}: RecordDialogProps) {
  const isEdit = Boolean(record)
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})

  const createMutation = useCreateAdminRecord(config.type)
  const updateMutation = useUpdateAdminRecord(config.type)
  const isPending = createMutation.isPending || updateMutation.isPending

  // Seed the form from the record when opening in edit mode.
  useEffect(() => {
    if (!open) {
      return
    }
    const seed: Record<string, string> = {}
    for (const field of config.fields) {
      const raw = record?.[field.key]
      seed[field.key] = raw === undefined || raw === null ? "" : String(raw)
    }
    setValues(seed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const setField = (key: string, value: string) =>
    setValues((current) => ({ ...current, [key]: value }))

  const onSubmit = async () => {
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
    } catch {
      notify.error(`Could not save ${config.singular.toLowerCase()}.`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? `Edit ${config.singular}` : `New ${config.singular}`}
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {config.fields.map((field) => (
            <div key={field.key} className="grid gap-2">
              <Label htmlFor={`admin-field-${field.key}`}>{field.label}</Label>
              <FieldInput
                field={field}
                value={values[field.key] ?? ""}
                onChange={(value) => setField(field.key, value)}
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={onSubmit} disabled={isPending}>
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
