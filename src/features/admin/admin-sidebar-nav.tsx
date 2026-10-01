import {
  CalendarDays,
  Church,
  Clock3,
  Cross,
  FileText,
  LayoutDashboard,
  Megaphone,
  Radio,
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
  "file-text": FileText,
  radio: Radio,
}

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: "layout-dashboard" },
  { label: "Live Mass", href: "/admin/live", icon: "radio" },
  { label: "Announcements", href: "/admin/announcements", icon: "megaphone" },
  { label: "Events", href: "/admin/events", icon: "calendar" },
  { label: "Mass Timings", href: "/admin/mass-timings", icon: "clock" },
  { label: "Sacraments", href: "/admin/sacraments", icon: "cross" },
  { label: "Clergy", href: "/admin/clergy", icon: "church" },
  { label: "Communities", href: "/admin/communities", icon: "users" },
  {
    label: "Cells & Associations",
    href: "/admin/cell-associations",
    icon: "users-round",
  },
  { label: "Chronicle Issues", href: "/admin/chronicle", icon: "file-text" },
] as const

export function AdminSidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="grid gap-0.5">
      {adminNav.map((item) => {
        const Icon = iconMap[item.icon]
        return (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/admin"}
            onClick={onNavigate}
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
