import type { ReactElement } from "react"

import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { notify } from "@/lib/toast"

import { useArchiveAdminRecord } from "./use-admin"
import type { AdminEntityConfig, AdminRecord } from "./types"

export function AdminDeleteDialog({
  config,
  record,
  trigger,
}: {
  config: AdminEntityConfig
  record: AdminRecord
  trigger: ReactElement
}) {
  const archiveMutation = useArchiveAdminRecord(config.type)

  const onConfirm = async () => {
    try {
      await archiveMutation.mutateAsync(record.id)
      notify.success(`${config.singular} archived.`)
    } catch {
      notify.error(`Could not archive ${config.singular.toLowerCase()}.`)
    }
  }

  const title = String(record[config.titleKey] ?? config.singular)

  return (
    <ConfirmDialog
      trigger={trigger}
      title={`Archive ${config.singular.toLowerCase()}?`}
      description={`This will archive "${title}" and remove it from active schedules.`}
      onConfirm={onConfirm}
    />
  )
}
