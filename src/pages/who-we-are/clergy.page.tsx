import { ClergyCard } from "@/components/parish/clergy-card"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useClergy } from "@/features/parish"

export default function ClergyPage() {
  const { data = [] } = useClergy()
  return (
    <>
      <ParishPageHeader
        title="Clergy"
        subtitle="Meet our priests and pastoral leaders."
        image="https://images.unsplash.com/photo-1442503126439-9bf9a0d4d50d?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((item) => (
            <ClergyCard key={item.id} item={item} />
          ))}
        </div>
      </PageShell>
    </>
  )
}
