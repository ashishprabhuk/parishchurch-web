import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useCommunities } from "@/features/parish"

export default function CommunitiesPage() {
  const { data = [] } = useCommunities()

  return (
    <>
      <ParishPageHeader
        title="Communities"
        subtitle="SCCs and parish communities growing in faith together."
        image="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <ul className="grid gap-3">
          {data.map((item) => (
            <li
              key={item}
              className="border-border/70 bg-card/85 rounded-xl border p-4 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </PageShell>
    </>
  )
}
