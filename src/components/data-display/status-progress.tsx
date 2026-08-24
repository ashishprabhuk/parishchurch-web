import { Progress } from "@/components/ui/progress"

export function StatusProgress({ value }: { value: number }) {
  return (
    <div className="min-w-32 space-y-1">
      <Progress value={value} className="h-2" />
      <p className="text-muted-foreground text-xs">{value}%</p>
    </div>
  )
}
