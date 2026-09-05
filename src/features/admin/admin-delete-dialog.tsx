import type { ReactElement } from "react"

import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { notify } from "@/lib/toast"

import { useDeleteAdminRecord } from "./use-admin"
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
  const deleteMutation = useDeleteAdminRecord(config.type)

  const onConfirm = async () => {
    try {
      await deleteMutation.mutateAsync(record.id)
      notify.success(`${config.singular} deleted.`)
    } catch {
      notify.error(`Could not delete ${config.singular.toLowerCase()}.`)
    }
  }

  const title = String(record[config.titleKey] ?? config.singular)

  return (
    <ConfirmDialog
      trigger={trigger}
      title={`Delete ${config.singular.toLowerCase()}?`}
      description={`This will permanently remove "${title}". This action cannot be undone.`}
      onConfirm={onConfirm}
    />
  )
}
