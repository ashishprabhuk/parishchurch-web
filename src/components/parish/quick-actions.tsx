import {
  CalendarDays,
  Church,
  HeartHandshake,
  Megaphone,
  Play,
  Wallet,
} from "lucide-react"
import { Link } from "react-router-dom"

import { PageShell } from "@/components/parish/page-shell"
import { SectionHeading } from "@/components/parish/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const actions = [
  {
    title: "Mass Times",
    description: "View daily and weekly liturgy schedules.",
    icon: Church,
    href: "/prayer-liturgy/mass-schedule",
  },
  {
    title: "Livestream",
    description: "Join Mass online from anywhere.",
    icon: Play,
    href: "/prayer-liturgy/livestream",
  },
  {
    title: "Sacraments",
    description: "Baptism, Marriage, Confirmation and more.",
    icon: HeartHandshake,
    href: "/prayer-liturgy/sacraments",
  },
  {
    title: "Events",
    description: "See upcoming parish gatherings.",
    icon: CalendarDays,
    href: "/events",
  },
  {
    title: "Announcements",
    description: "Stay updated with parish news.",
    icon: Megaphone,
    href: "/announcements",
  },
  {
    title: "Donate",
    description: "Support the mission and outreach.",
    icon: Wallet,
    href: "/donate",
  },
]

export function QuickActions() {
  return (
    <PageShell className="py-16">
      <SectionHeading
        eyebrow="Quick Access"
        title="Everything you need in one place"
        description="Simple paths for prayer, community life, sacraments, and service."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Link key={action.title} to={action.href} className="group">
              <Card
                className={cn(
                  "border-border/70 bg-card/85 h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
                  index % 2 === 0 ? "lg:translate-y-2" : "",
                )}
              >
                <CardHeader>
                  <Icon className="text-primary size-5" />
                  <CardTitle className="font-heading text-2xl">
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </PageShell>
  )
}
