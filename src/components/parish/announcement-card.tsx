import { format } from "date-fns"
import { Link } from "react-router-dom"

import type { ParishAnnouncement } from "@/features/parish"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function AnnouncementCard({
  item,
  featured = false,
}: {
  item: ParishAnnouncement
  featured?: boolean
}) {
  return (
    <Card className="border-border/70 bg-card/85 overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className={
          featured ? "h-72 w-full object-cover" : "h-44 w-full object-cover"
        }
      />
      <CardContent className="space-y-3 p-5">
        <div className="text-muted-foreground flex items-center gap-3 text-xs tracking-[0.14em] uppercase">
          <span>{item.category}</span>
          <span>•</span>
          <span>{format(item.date, "dd MMM yyyy")}</span>
        </div>
        <h3
          className={
            featured ? "font-heading text-3xl" : "font-heading text-2xl"
          }
        >
          {item.title}
        </h3>
        <p className="text-muted-foreground text-sm">{item.excerpt}</p>
        <Button
          render={<Link to={`/announcements/${item.slug}`} />}
          variant="outline"
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  )
}
