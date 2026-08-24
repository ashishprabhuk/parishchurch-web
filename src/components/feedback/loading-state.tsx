import { Loader2 } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState({
  label = "Loading content...",
}: {
  label?: string
}) {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Loader2 className="size-4 animate-spin" />
        <span>{label}</span>
      </div>
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
}
