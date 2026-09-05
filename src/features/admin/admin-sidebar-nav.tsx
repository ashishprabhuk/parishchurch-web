import {
  CalendarDays,
  Church,
  Clock3,
  Cross,
  FileText,
  HandHeart,
  History,
  LayoutDashboard,
  Megaphone,
  Users,
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { cn } from "@/lib/utils"

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  megaphone: Megaphone,
  calendar: CalendarDays,
  clock: Clock3,
  cross: Cross,
  church: Church,
  users: Users,
  "users-round": Users,
  history: History,
  "file-text": FileText,
  "hand-heart": HandHeart,
}

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: "layout-dashboard" },
  { label: "Announcements", href: "/admin/announcements", icon: "megaphone" },
  { label: "Events", href: "/admin/events", icon: "calendar" },
  { label: "Mass Timings", href: "/admin/mass-timings", icon: "clock" },
  { label: "Sacraments", href: "/admin/sacraments", icon: "cross" },
  { label: "Clergy", href: "/admin/clergy", icon: "church" },
  { label: "Communities", href: "/admin/communities", icon: "users" },
  {
    label: "Cells & Associations",
    href: "/admin/associations",
    icon: "users-round",
  },
  { label: "History Timeline", href: "/admin/history", icon: "history" },
  { label: "Chronicle Issues", href: "/admin/chronicle", icon: "file-text" },
  { label: "Outreach", href: "/admin/outreach", icon: "hand-heart" },
] as const

export function AdminSidebarNav() {
  return (
    <nav className="grid gap-0.5">
      {adminNav.map((item) => {
        const Icon = iconMap[item.icon]
        return (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/admin"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )
            }
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </NavLink>
        )
      })}
    </nav>
  )
}
