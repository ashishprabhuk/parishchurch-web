import { LiveMassView } from "@/components/parish/live-mass-view"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useSeo } from "@/hooks/use-seo"

export default function LivestreamPage() {
  useSeo({
    title: "Livestream | Church of Our Lady of Fatima",
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
      <LiveMassView compact />
    </>
  )
}