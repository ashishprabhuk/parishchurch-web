import { Badge } from "@/components/ui/badge"

const statusVariant = {
  active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  paused: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  archived: "bg-slate-500/15 text-slate-700 dark:text-slate-300",
} as const

export function StatusBadge({
  status,
}: {
  status: keyof typeof statusVariant
}) {
  return <Badge className={statusVariant[status]}>{status}</Badge>
}
