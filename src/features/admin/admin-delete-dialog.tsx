import type { ReactElement } from "react"

import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { notify } from "@/lib/toast"

import { useArchiveAdminRecord, useDeleteAdminRecord } from "./use-admin"
import type { AdminEntityConfig, AdminRecord } from "./types"

export function AdminDeleteDialog({
  config,
  record,
  trigger,
  action = "archive",
}: {
  config: AdminEntityConfig
  record: AdminRecord
  trigger: ReactElement
  action?: "archive" | "delete"
}) {
  const archiveMutation = useArchiveAdminRecord(config.type)
  const deleteMutation = useDeleteAdminRecord(config.type)

  const onConfirm = async () => {
    try {
      if (action === "delete") {
        await deleteMutation.mutateAsync(record.id)
        notify.success(`${config.singular} deleted.`)
      } else {
        await archiveMutation.mutateAsync(record.id)
        notify.success(`${config.singular} archived.`)
      }
    } catch {
      notify.error(
        `Could not ${action === "delete" ? "delete" : "archive"} ${config.singular.toLowerCase()}.`,
      )
    }
  }

  const title = String(record[config.titleKey] ?? config.singular)

  return (
    <ConfirmDialog
      trigger={trigger}
      title={`${action === "delete" ? "Delete" : "Archive"} ${config.singular.toLowerCase()}?`}
      description={`${action === "delete" ? `This will permanently delete "${title}".` : `This will archive "${title}" and remove it from active schedules.`}`}
      onConfirm={onConfirm}
    />
  )
}
