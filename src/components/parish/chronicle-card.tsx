import type { ChronicleIssue } from "@/features/parish"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/format"
import { Link } from "react-router-dom"

export function ChronicleCard({ issue }: { issue: ChronicleIssue }) {
  return (
    <Card className="border-border/70 bg-card/85 overflow-hidden">
      <CardContent className="space-y-2 p-5">
        <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
          {formatDate(issue.publishDate ?? issue.issueDate, "dd MMM yyyy")}
        </p>
        <h3 className="font-heading text-2xl">{issue.title}</h3>
        <Button variant="outline" render={<Link to={`/events/chronicle/${issue.slug ?? issue.id}`} />}>
          View Chronicle Issue
        </Button>
      </CardContent>
    </Card>
  )
}
