import { addMonths, format, isSameDay, startOfMonth } from "date-fns"
import { useMemo, useState } from "react"

import { EventCard } from "@/components/parish/event-card"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEventsCalendar } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"
import { toDateOrNull } from "@/lib/format"

export default function EventsCalendarPage() {
  useSeo({
    title: "Events Calendar | St. Mary of Grace Parish",
    description: "Monthly event calendar and upcoming agenda.",
    canonicalPath: "/events/calendar",
  })

  const { data = [] } = useEventsCalendar()
  const [month, setMonth] = useState(startOfMonth(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const selectedEvents = useMemo(
    () =>
      data.filter((item) => {
        if (!selectedDate) {
          return true
        }
        const eventDate = toDateOrNull(item.date)
        return eventDate ? isSameDay(eventDate, selectedDate) : false
      }),
    [data, selectedDate],
  )

  return (
    <>
      <ParishPageHeader
        title="Events Calendar"
        subtitle="Navigate by month and explore upcoming parish gatherings."
        image="https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-3xl">
            {format(month, "MMMM yyyy")}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setMonth((m) => addMonths(m, -1))}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              onClick={() => setMonth((m) => addMonths(m, 1))}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <Card className="border-border/70 bg-card/85">
            <CardContent className="p-4">
              <Calendar
                month={month}
                onMonthChange={setMonth}
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </CardContent>
          </Card>
          <div className="space-y-4">
            <h3 className="font-heading text-2xl">Upcoming events</h3>
            {selectedEvents.length === 0 ? (
              <Card className="border-border/80 bg-card/80 border-dashed">
                <CardContent className="text-muted-foreground p-6 text-sm">
                  No events on this date.
                </CardContent>
              </Card>
            ) : (
              selectedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      </PageShell>
    </>
  )
}
