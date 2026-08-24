import { Link } from "react-router-dom"

import { MassSchedulePreview } from "@/components/parish/mass-schedule-preview"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { SacramentCard } from "@/components/parish/sacrament-card"
import { SectionHeading } from "@/components/parish/section-heading"
import { Button } from "@/components/ui/button"
import { useSacraments } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function PrayerLiturgyPage() {
  useSeo({
    title: "Prayer & Liturgy | St. Mary of Grace Parish",
    description:
      "Mass schedule, livestream, and liturgical life of our parish.",
    canonicalPath: "/prayer-liturgy",
  })

  const { data = [] } = useSacraments()

  return (
    <>
      <ParishPageHeader
        title="Prayer & Liturgy"
        subtitle="Come, worship with us and grow through sacramental grace."
        image="https://images.unsplash.com/photo-1535743686920-55e4145369b9?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <MassSchedulePreview />
      </PageShell>
      <PageShell className="py-10">
        <SectionHeading
          eyebrow="Sacraments"
          title="The life of grace in Christ"
          description="Learn and prepare for each sacrament in the life of the Church."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <SacramentCard key={item.id} sacrament={item} index={index} />
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Button render={<Link to="/prayer-liturgy/livestream" />}>
            Watch Livestream
          </Button>
          <Button
            render={<Link to="/prayer-liturgy/mass-schedule" />}
            variant="outline"
          >
            Full Mass Schedule
          </Button>
        </div>
      </PageShell>
    </>
  )
}
