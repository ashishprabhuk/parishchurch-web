import { LiveMassView } from "@/components/parish/live-mass-view"
import { useSeo } from "@/hooks/use-seo"

export default function LivePage() {
  useSeo({
    title: "Live Mass | St. Mary of Grace Parish",
    description: "Join St. Mary of Grace Parish for live Holy Mass online.",
    canonicalPath: "/live",
  })

  return <LiveMassView />
}
