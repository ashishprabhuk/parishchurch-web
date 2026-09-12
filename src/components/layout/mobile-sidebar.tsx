import { Menu } from "lucide-react"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { SidebarNav } from "@/components/layout/sidebar-nav"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAppStore } from "@/stores/app.store"

export function MobileSidebar() {
  const open = useAppStore((state) => state.sidebarOpenMobile)
  const setOpen = useAppStore((state) => state.setSidebarOpenMobile)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])

  return (
    <Sheet
      open={Boolean(open)}
      onOpenChange={(nextOpen) => setOpen(Boolean(nextOpen))}
    >
      <SheetTrigger
        render={
          <Button variant="outline" size="icon-sm" className="lg:hidden" />
        }
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-sidebar w-[74vw] max-w-[280px] p-0 shadow-xl"
      >
        <SheetHeader className="border-sidebar-border border-b px-4 py-3 text-left">
          <SheetTitle className="text-base font-semibold">Navigation</SheetTitle>
        </SheetHeader>
        <div
          className="max-h-[calc(100vh-5rem)] overflow-y-auto p-3"
          onClick={() => setOpen(false)}
        >
          <SidebarNav onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
