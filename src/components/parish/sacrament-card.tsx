import { ChevronRight, Cross, Heart, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Sacrament } from "@/features/parish"

const icons = [Cross, Heart, ShieldCheck]

export function SacramentCard({
  sacrament,
  index,
}: {
  sacrament: Sacrament
  index: number
}) {
  const Icon = icons[index % icons.length]

  return (
    <Card className="group border-border/70 bg-card/85 flex h-full flex-col overflow-hidden pt-0 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brass/60 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={sacrament.image}
          alt={sacrament.name}
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="bg-card text-primary absolute bottom-0 left-0 grid size-10 place-items-center border-t border-r border-brass/50 font-heading text-lg">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <CardHeader className="gap-3 pb-3">
        <div className="flex items-center gap-2">
          <Icon className="text-brass size-4" aria-hidden="true" />
          <span className="text-muted-foreground text-[0.65rem] font-semibold tracking-[0.16em] uppercase">
            Sacrament
          </span>
        </div>
        <CardTitle className="font-heading text-walnut text-2xl leading-tight">
          {sacrament.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {sacrament.description}
        </p>
        <Link
          to={`/prayer-liturgy/sacraments/${sacrament.name.toLowerCase().replaceAll(" ", "-")}`}
          className="text-primary hover:text-brass mt-auto inline-flex items-center gap-1 pt-6 text-xs font-semibold tracking-[0.12em] uppercase transition-colors"
        >
          Explore sacrament
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}
