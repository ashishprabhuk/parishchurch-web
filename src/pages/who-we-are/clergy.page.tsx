import { ClergyCard } from "@/components/parish/clergy-card"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useClergy } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function ClergyPage() {
  useSeo({
    title: "Parish Clergy | Church of Our Lady of Fatima, Chulne",
    description:
      "Meet the parish priest and associate clergy serving the Catholic community at Our Lady of Fatima Church in Chulne, Vasai West.",
    canonicalPath: "/who-we-are/clergy",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "About Us", item: "/who-we-are" },
      { name: "Clergy", item: "/who-we-are/clergy" },
    ],
  })

  const { data = [] } = useClergy()
  return (
    <>
      <ParishPageHeader
        title="Clergy"
        subtitle="Meet our priests and pastoral leaders."
        image="https://images.unsplash.com/photo-1442503126439-9bf9a0d4d50d?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {data.map((item) => (
            <ClergyCard key={item.id} item={item} />
          ))}
        </div>
      </PageShell>
    </>
  )
}
