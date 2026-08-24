import { CheckCircle2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SuccessState({
  title = "Success",
  description = "The action completed successfully.",
}: {
  title?: string
  description?: string
}) {
  return (
    <Card className="border-emerald-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}
