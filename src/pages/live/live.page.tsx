import { LiveMassView } from "@/components/parish/live-mass-view"
import { useSeo } from "@/hooks/use-seo"

export default function LivePage() {
  useSeo({
    title: "Live Mass | Church of Our Lady of Fatima",
    description: "Join Church of Our Lady of Fatima for live Holy Mass online.",
    canonicalPath: "/live",
  })

  return <LiveMassView />
}
