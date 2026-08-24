import { Link } from "react-router-dom"

import { ClergyCard } from "@/components/parish/clergy-card"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { SectionHeading } from "@/components/parish/section-heading"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useClergy, useHistoryTimeline } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function WhoWeArePage() {
  useSeo({
    title: "Who We Are | St. Mary of Grace Parish",
    description: "Meet our clergy, communities, and parish journey.",
    canonicalPath: "/who-we-are",
  })

  const { data: clergy = [] } = useClergy()
  const { data: timeline = [] } = useHistoryTimeline()

  return (
    <>
      <ParishPageHeader
        title="Who We Are"
        subtitle="A parish rooted in the Gospel and alive through community."
        image="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <SectionHeading eyebrow="Clergy" title="Pastoral leadership" />
        <div className="grid gap-4 md:grid-cols-2">
          {clergy.map((item) => (
            <ClergyCard key={item.id} item={item} />
          ))}
        </div>
      </PageShell>
      <PageShell className="py-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/70 bg-card/85">
            <CardContent className="p-5">
              <h3 className="font-heading text-2xl">Communities</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                SCCs, youth groups, and family ministries that nurture
                belonging.
              </p>
              <Button
                render={<Link to="/who-we-are/communities" />}
                variant="outline"
                className="mt-3"
              >
                View
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border/70 bg-card/85">
            <CardContent className="p-5">
              <h3 className="font-heading text-2xl">Cells & Associations</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Lay movements and pastoral associations serving the parish.
              </p>
              <Button
                render={<Link to="/who-we-are/cells-associations" />}
                variant="outline"
                className="mt-3"
              >
                View
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border/70 bg-card/85">
            <CardContent className="p-5">
              <h3 className="font-heading text-2xl">Parish History</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Our journey from humble beginnings to a vibrant faith community.
              </p>
              <Button
                render={<Link to="/who-we-are/history" />}
                variant="outline"
                className="mt-3"
              >
                View
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageShell>
      <PageShell className="py-14">
        <SectionHeading eyebrow="Our Journey" title="A living timeline" />
        <div className="space-y-3">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="border-border/70 bg-card/85 grid gap-2 rounded-xl border p-4 sm:grid-cols-[90px_1fr]"
            >
              <p className="font-heading text-primary text-2xl">{item.year}</p>
              <p className="text-muted-foreground text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </PageShell>
    </>
  )
}
