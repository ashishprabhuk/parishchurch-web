import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { Card, CardContent } from "@/components/ui/card"
import { useSeo } from "@/hooks/use-seo"

import { ADMIN_ENTITIES } from "./types"

export default function AdminDashboardPage() {
  useSeo({
    title: "Admin | St. Mary of Grace Parish",
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
