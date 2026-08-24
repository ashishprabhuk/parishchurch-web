import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useHistoryTimeline } from "@/features/parish"

export default function HistoryPage() {
  const { data = [] } = useHistoryTimeline()

  return (
    <>
      <ParishPageHeader
        title="Parish History"
        subtitle="Our journey through the decades."
        image="https://images.unsplash.com/photo-1490682143684-14369e18dce8?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="space-y-3">
          {data.map((entry) => (
            <article
              key={entry.year}
              className="border-border/70 bg-card/85 grid gap-2 rounded-xl border p-4 md:grid-cols-[100px_1fr]"
            >
              <p className="font-heading text-primary text-3xl">{entry.year}</p>
              <p className="text-muted-foreground text-sm">{entry.text}</p>
            </article>
          ))}
        </div>
      </PageShell>
    </>
  )
}
