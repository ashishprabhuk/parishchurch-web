import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { useSeo } from "@/hooks/use-seo"

export default function LivestreamPage() {
  useSeo({
    title: "Livestream | St. Mary of Grace Parish",
    description: "Join Holy Mass and prayer moments online.",
    canonicalPath: "/prayer-liturgy/livestream",
  })

  return (
    <>
      <ParishPageHeader
        title="Livestream"
        subtitle="Pray with us online when you cannot be physically present."
        image="https://images.unsplash.com/photo-1457131760772-a7b327f2e5c5?auto=format&fit=crop&w=1600&q=80"
      />
      <PageShell className="py-14">
        <Card className="border-border/70 bg-card/85">
          <CardContent className="space-y-4 p-6">
            <h2 className="font-heading text-3xl">Holy Mass - Live</h2>
            <div className="border-border/70 aspect-video overflow-hidden rounded-xl border">
              <iframe
                title="Parish livestream"
                className="h-full w-full"
                src="https://www.youtube.com/embed/5qap5aO4i9A"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </PageShell>
    </>
  )
}
