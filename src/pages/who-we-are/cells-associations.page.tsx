import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useCellsAssociations } from "@/features/parish"

export default function CellsAssociationsPage() {
  const { data = [] } = useCellsAssociations()

  return (
    <>
      <ParishPageHeader
        title="Cells & Associations"
        subtitle="Lay associations that enrich parish mission."
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1700&q=80"
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
