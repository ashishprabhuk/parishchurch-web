import { Menu } from "lucide-react"

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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" size="icon-sm" className="lg:hidden" />
        }
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-sidebar w-[84vw] max-w-xs p-0">
        <SheetHeader className="border-sidebar-border border-b">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="p-3">
          <SidebarNav />
        </div>
      </SheetContent>
    </Sheet>
  )
}
