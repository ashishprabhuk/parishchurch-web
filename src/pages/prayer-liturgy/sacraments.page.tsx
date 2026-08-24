import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { SacramentCard } from "@/components/parish/sacrament-card"
import { useSacraments } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function SacramentsPage() {
  useSeo({
    title: "Sacraments | St. Mary of Grace Parish",
    description: "Explore the sacraments and prepare with pastoral support.",
    canonicalPath: "/prayer-liturgy/sacraments",
  })

  const { data = [] } = useSacraments()

  return (
    <>
      <ParishPageHeader
        title="Sacraments"
        subtitle="Grace-filled encounters with Christ throughout life's journey."
        image="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <SacramentCard key={item.id} sacrament={item} index={index} />
          ))}
        </div>
      </PageShell>
    </>
  )
}
