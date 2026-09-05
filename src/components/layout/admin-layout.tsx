import { Church, LogOut, Menu } from "lucide-react"
import { useState } from "react"
import { Link, Outlet } from "react-router-dom"

import { ThemeToggle } from "@/components/common/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AdminSidebarNav } from "@/features/admin/admin-sidebar-nav"

export function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

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
            <div className="flex items-center gap-2">
              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="lg:hidden"
                      aria-label="Open admin navigation"
                    />
                  }
                >
                  <Menu className="size-4" />
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="bg-sidebar w-[82vw] max-w-[280px] p-0 shadow-xl"
                >
                  <SheetHeader className="border-sidebar-border border-b px-4 py-3 text-left">
                    <SheetTitle className="flex items-center gap-2 text-base">
                      <Church className="size-4" /> Admin navigation
                    </SheetTitle>
                  </SheetHeader>
                  <div
                    className="max-h-[calc(100vh-5rem)] overflow-y-auto p-3"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <AdminSidebarNav />
                  </div>
                </SheetContent>
              </Sheet>
              <p className="text-sm font-semibold">Admin Console</p>
            </div>
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
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
