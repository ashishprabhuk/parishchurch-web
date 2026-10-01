import { EmptyState } from "@/components/feedback/empty-state"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useSeo } from "@/hooks/use-seo"

export default function ChroniclePage() {
  useSeo({
    title: "Parish Chronicle Coming Soon | Church of Our Lady of Fatima",
    description: "The parish chronicle is coming soon.",
    canonicalPath: "/events/chronicle",
  })

  return (
    <>
      <ParishPageHeader
        title="The Parish Chronicle"
        subtitle="Stories from our parish community."
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <EmptyState
          title="The parish chronicle is coming soon"
          description="Stories, reflections, and memories from parish life will be shared here soon."
        />
      </PageShell>
    </>
  )
}
