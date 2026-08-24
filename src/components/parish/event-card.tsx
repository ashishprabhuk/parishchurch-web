import { format } from "date-fns"

import type { ParishEvent } from "@/features/parish"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EventCard({ event }: { event: ParishEvent }) {
  return (
    <Card className="border-border/70 bg-card/85">
      <CardContent className="grid grid-cols-[70px_1fr] gap-4 p-5">
        <div className="border-border/80 bg-muted/50 rounded-xl border p-2 text-center">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">
            {format(event.date, "MMM")}
          </p>
          <p className="font-heading text-3xl">{format(event.date, "dd")}</p>
        </div>
        <div>
          <p className="text-accent text-xs tracking-[0.14em] uppercase">
            {event.category}
          </p>
          <h3 className="font-heading mt-1 text-2xl">{event.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            {event.time} · {event.location}
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            {event.description}
          </p>
          <Button variant="outline" className="mt-3">
            View Event
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
