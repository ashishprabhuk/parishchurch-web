import { Link } from "react-router-dom"

import { EventCard } from "@/components/parish/event-card"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { Button } from "@/components/ui/button"
import { useEventsCalendar } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function EventsPage() {
  useSeo({
    title: "Events | St. Mary of Grace Parish",
    description: "Upcoming liturgical and community events.",
    canonicalPath: "/events",
  })

  const { data = [] } = useEventsCalendar()

  return (
    <>
      <ParishPageHeader
        title="Events"
        subtitle="Walk together in prayer, formation, and celebration."
        image="https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="grid gap-4 lg:grid-cols-2">
          {data.map((item) => (
            <EventCard key={item.id} event={item} />
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Button render={<Link to="/events/calendar" />}>View Calendar</Button>
          <Button render={<Link to="/events/chronicle" />} variant="outline">
            Parish Chronicle
          </Button>
        </div>
      </PageShell>
    </>
  )
}
