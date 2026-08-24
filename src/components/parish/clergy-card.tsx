import type { ClergyMember } from "@/features/parish"
import { Card, CardContent } from "@/components/ui/card"

export function ClergyCard({ item }: { item: ClergyMember }) {
  return (
    <Card className="border-border/70 bg-card/85 overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="h-56 w-full object-cover"
      />
      <CardContent className="p-5">
        <h3 className="font-heading text-2xl">{item.name}</h3>
        <p className="text-accent text-sm font-medium">{item.role}</p>
        <p className="text-muted-foreground mt-2 text-sm">{item.bio}</p>
      </CardContent>
    </Card>
  )
}
