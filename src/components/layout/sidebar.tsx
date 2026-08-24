import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { SidebarNav } from "@/components/layout/sidebar-nav"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/stores/app.store"

export function Sidebar() {
  const collapsed = useAppStore((state) => state.sidebarCollapsed)
  const toggle = useAppStore((state) => state.toggleSidebarCollapsed)

  return (
    <aside
      className={cn(
        "border-sidebar-border bg-sidebar hidden border-r transition-all lg:flex lg:flex-col",
        collapsed ? "w-[82px]" : "w-[250px]",
      )}
    >
      <div className="border-sidebar-border flex h-14 items-center justify-between border-b px-3">
        <span className={cn("font-semibold", collapsed ? "sr-only" : "inline")}>
          Starter Kit
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggle}
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <SidebarNav />
      </div>
    </aside>
  )
}
