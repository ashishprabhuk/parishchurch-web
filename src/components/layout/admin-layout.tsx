import { Church, LogOut } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

import { ThemeToggle } from "@/components/common/theme-toggle"
import { Button } from "@/components/ui/button"
import { AdminSidebarNav } from "@/features/admin/admin-sidebar-nav"

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="border-sidebar-border bg-sidebar sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r lg:flex">
        <div className="border-sidebar-border flex h-14 items-center gap-2 border-b px-4">
          <span className="border-brass/70 bg-antique-cream grid size-8 shrink-0 place-items-center rounded-full border">
            <Church className="text-primary size-4" />
          </span>
          <div className="min-w-0">
            <p className="font-heading truncate text-sm font-semibold">
              Parish Admin
            </p>
            <p className="text-muted-foreground truncate text-[0.65rem] tracking-[0.14em] uppercase">
              Content management
            </p>
          </div>
        </div>
        <div className="flex-1 p-3">
          <AdminSidebarNav />
        </div>
        <div className="border-sidebar-border border-t p-3">
          <Button
            variant="ghost"
            className="text-muted-foreground w-full justify-start"
            render={<Link to="/" />}
          >
            <LogOut className="size-4" /> Back to site
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-border/60 bg-background/80 sticky top-0 z-20 border-b backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
            <p className="text-sm font-semibold">Admin Console</p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-muted-foreground lg:hidden"
                render={<Link to="/" />}
              >
                <LogOut className="size-4" /> Site
              </Button>
              <ThemeToggle />
            </div>
          </div>
          {/* Mobile nav (sidebar is hidden on small screens) */}
          <div className="border-border/60 overflow-x-auto border-t px-3 py-2 lg:hidden">
            <AdminSidebarNav />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
