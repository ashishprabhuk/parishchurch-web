import { ChronicleCard } from "@/components/parish/chronicle-card"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useChronicle } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function ChroniclePage() {
  useSeo({
    title: "Parish Chronicle | St. Mary of Grace Parish",
    description: "Stories and reflections from parish life.",
    canonicalPath: "/events/chronicle",
  })

  const { data = [] } = useChronicle()

  return (
    <>
      <ParishPageHeader
        title="The Parish Chronicle"
        subtitle="Stories from our parish community."
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((issue) => (
            <ChronicleCard key={issue.id} issue={issue} />
          ))}
        </div>
      </PageShell>
    </>
  )
}
