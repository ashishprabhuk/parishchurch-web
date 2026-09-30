import type { ClergyMember } from "@/features/parish"
import { Card, CardContent } from "@/components/ui/card"

export function ClergyCard({ item }: { item: ClergyMember }) {
  return (
    <Card className="border-border/70 bg-card/85 flex h-full flex-col overflow-hidden rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-brass/60 hover:shadow-md">
      <div className="bg-antique-cream aspect-[4/5] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="size-full object-cover object-top"
        />
      </div>
      <CardContent className="flex min-h-44 flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-walnut text-lg font-semibold leading-tight">
          {item.name}
        </h3>
        <p className="text-brass mt-1 text-xs font-semibold tracking-[0.1em] uppercase">
          {item.role}
        </p>
        <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
          {item.bio}
        </p>
      </CardContent>
    </Card>
  )
}
