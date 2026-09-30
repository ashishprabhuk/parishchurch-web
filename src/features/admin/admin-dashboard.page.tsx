import { ArrowRight, Radio } from "lucide-react"
import { Link } from "react-router-dom"

import { Card, CardContent } from "@/components/ui/card"
import { useSeo } from "@/hooks/use-seo"

import { ADMIN_ENTITIES } from "./types"

export default function AdminDashboardPage() {
  useSeo({
    title: "Admin | Church of Our Lady of Fatima",
    description: "Manage parish website content.",
    canonicalPath: "/admin",
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl">Content management</h1>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          Choose a section to manage the content shown across the parish
          website.
        </p>
      </div>
      <Link to="/admin/live">
        <Card className="mb-4 border-primary/35 bg-primary/5 group hover:border-primary/70 transition-colors">
          <CardContent className="flex items-center gap-4 p-4 sm:p-5">
            <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-full">
              <Radio className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="font-heading block text-lg">Live Mass</span>
              <span className="text-muted-foreground mt-1 block text-sm leading-relaxed">
                Publish or end the current YouTube Live broadcast.
              </span>
            </span>
            <ArrowRight className="text-primary size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </CardContent>
        </Card>
      </Link>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ADMIN_ENTITIES.map((entity) => (
          <Link key={entity.type} to={`/admin/${entity.type}`}>
            <Card className="group hover:border-primary/60 h-full min-h-[180px] transition-colors">
              <CardContent className="flex h-full flex-col p-4 sm:p-5">
                <h2 className="font-heading text-lg sm:text-xl">{entity.label}</h2>
                <p className="text-muted-foreground mt-1.5 flex-1 text-sm leading-relaxed">
                  {entity.description}
                </p>
                <span className="text-primary mt-4 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.12em] uppercase sm:text-xs">
                  Manage
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
