import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useMassTimings } from "@/features/parish"

export function MassSchedulePreview() {
  const { data = [] } = useMassTimings()
  const today = data.filter((item) => item.dayGroup === "today")
  const sunday = data.filter((item) => item.dayGroup === "sunday")

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <img
        src="https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1400&q=80"
        alt="Parish liturgy interior"
        className="h-full min-h-80 w-full rounded-2xl object-cover"
      />
      <div className="space-y-5">
        <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
          Prayer & Liturgy
        </p>
        <h3 className="font-heading text-3xl">Come, worship with us.</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Mass is at the heart of our parish community. Join us in prayer
          through weekday liturgies and Sunday celebrations.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button render={<Link to="/prayer-liturgy/mass-schedule" />}>
            View Mass Schedule
          </Button>
          <Button
            render={<Link to="/prayer-liturgy/livestream" />}
            variant="outline"
          >
            Watch Livestream
          </Button>
        </div>
        <Card className="border-border/70 bg-card/85">
          <CardContent className="grid gap-5 p-5 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground mb-2 text-xs tracking-[0.15em] uppercase">
                Today
              </p>
              <ul className="space-y-2">
                {today.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{item.label}</span>
                    <span className="font-medium">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs tracking-[0.15em] uppercase">
                Sunday
              </p>
              <ul className="space-y-2">
                {sunday.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{item.label}</span>
                    <span className="font-medium">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
