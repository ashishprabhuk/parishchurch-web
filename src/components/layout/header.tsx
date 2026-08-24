import { Bell } from "lucide-react"

import { AppBreadcrumbs } from "@/components/common/breadcrumbs"
import { CommandMenu } from "@/components/common/command-menu"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { UserAvatar } from "@/components/common/user-avatar"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-20 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <MobileSidebar />
        <div className="min-w-0 flex-1">
          <AppBreadcrumbs />
        </div>
        <div className="hidden sm:block">
          <CommandMenu />
        </div>
        <Button variant="outline" size="icon-sm" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <ThemeToggle />
        <UserAvatar name="Starter User" />
      </div>
    </header>
  )
}
