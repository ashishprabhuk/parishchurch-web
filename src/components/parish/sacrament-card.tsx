import { Cross, Heart, ShieldCheck } from "lucide-react"

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
    <Card className="border-border/70 bg-card/85 h-full">
      <CardHeader>
        <Icon className="text-primary size-5" />
        <CardTitle className="font-heading text-2xl">
          {sacrament.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{sacrament.description}</p>
        <p className="text-primary mt-3 text-sm font-medium">Learn more</p>
      </CardContent>
    </Card>
  )
}
