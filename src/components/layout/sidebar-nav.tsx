import { Home, LayoutDashboard, Settings } from "lucide-react"
import { NavLink } from "react-router-dom"

import { APP_CONFIG } from "@/config/app.config"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/stores/app.store"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

const iconMap = {
  home: Home,
  "layout-dashboard": LayoutDashboard,
  settings: Settings,
}

export function SidebarNav() {
  const collapsed = useAppStore((state) => state.sidebarCollapsed)

  return (
    <nav className="space-y-6">
      {APP_CONFIG.nav.map((group) => (
        <div key={group.title} className="space-y-1.5">
          {!collapsed ? (
            <p className="text-muted-foreground px-3 text-[11px] font-semibold tracking-[0.16em] uppercase">
              {group.title}
            </p>
          ) : null}
          {group.items.map((item) => {
            const Icon = iconMap[item.icon]

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      className={cn(
                        "h-auto w-full rounded-lg px-0 py-0",
                        collapsed ? "justify-center" : "justify-start",
                      )}
                    />
                  }
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                        collapsed ? "justify-center" : "justify-start",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )
                    }
                  >
                    <Icon className="size-4" />
                    {!collapsed ? <span>{item.label}</span> : null}
                  </NavLink>
                </TooltipTrigger>
                {collapsed ? (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                ) : null}
              </Tooltip>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
