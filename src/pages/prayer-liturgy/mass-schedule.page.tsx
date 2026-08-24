import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMassTimings } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function MassSchedulePage() {
  useSeo({
    title: "Mass Schedule | St. Mary of Grace Parish",
    description: "Daily, weekday, and Sunday Mass timings.",
    canonicalPath: "/prayer-liturgy/mass-schedule",
  })

  const { data = [] } = useMassTimings()

  const groups = {
    today: data.filter((item) => item.dayGroup === "today"),
    sunday: data.filter((item) => item.dayGroup === "sunday"),
    weekday: data.filter((item) => item.dayGroup === "weekday"),
  }

  return (
    <>
      <ParishPageHeader
        title="Mass Schedule"
        subtitle="Plan your week around prayer and Eucharistic celebration."
        image="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80"
      />
      <PageShell className="py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(groups).map(([label, items]) => (
            <Card key={label} className="border-border/70 bg-card/85">
              <CardHeader>
                <CardTitle className="font-heading text-2xl capitalize">
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {items.length === 0 ? (
                    <li className="text-muted-foreground text-sm">
                      No schedule available.
                    </li>
                  ) : (
                    items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{item.label}</span>
                        <span className="font-medium">{item.time}</span>
                      </li>
                    ))
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>
    </>
  )
}
