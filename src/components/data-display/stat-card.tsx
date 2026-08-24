import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  title,
  value,
  delta,
}: {
  title: string
  value: string
  delta: number
}) {
  const positive = delta >= 0

  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        <p
          className={cn(
            "mt-2 flex items-center text-xs",
            positive ? "text-emerald-600" : "text-rose-600",
          )}
        >
          {positive ? (
            <ArrowUpRight className="mr-1 size-3.5" />
          ) : (
            <ArrowDownRight className="mr-1 size-3.5" />
          )}
          {Math.abs(delta)}% from last week
        </p>
      </CardContent>
    </Card>
  )
}
