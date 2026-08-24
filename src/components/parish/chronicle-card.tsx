import { format } from "date-fns"

import type { ChronicleIssue } from "@/features/parish"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ChronicleCard({ issue }: { issue: ChronicleIssue }) {
  return (
    <Card className="border-border/70 bg-card/85 overflow-hidden">
      <img
        src={issue.cover}
        alt={issue.title}
        className="h-56 w-full object-cover"
      />
      <CardContent className="space-y-2 p-5">
        <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
          {format(issue.issueDate, "dd MMM yyyy")}
        </p>
        <h3 className="font-heading text-2xl">{issue.title}</h3>
        <Button variant="outline">View Latest Issue</Button>
      </CardContent>
    </Card>
  )
}
