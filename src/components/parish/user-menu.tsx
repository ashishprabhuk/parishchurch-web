import { Bell, LayoutDashboard, LogOut, UserRound } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { initialsFromName } from "@/components/common/user-avatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { notify } from "@/lib/toast"
import { useAuthStore } from "@/stores/auth.store"

export function UserMenu() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  const isAdmin = user.role === "admin"

  const onLogout = () => {
    logout()
    notify.success("You have been signed out.")
    navigate("/")
  }

  const comingSoon = (feature: string) =>
    notify.success(`${feature} is coming soon.`)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Account menu"
            className="ring-brass/40 hover:ring-primary/60 rounded-full ring-2 transition-shadow focus-visible:outline-none"
          />
        }
      >
        <Avatar className="size-9">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name} />
          ) : null}
          <AvatarFallback>{initialsFromName(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <span className="text-sm font-medium">{user.name}</span>
              <Badge
                variant={isAdmin ? "default" : "secondary"}
                className="text-[0.6rem] tracking-[0.08em] uppercase"
              >
                {isAdmin ? "Admin" : "Member"}
              </Badge>
            </span>
            <span className="text-muted-foreground text-xs font-normal">
              {user.email}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {isAdmin ? (
          <DropdownMenuItem render={<Link to="/admin" />}>
            <LayoutDashboard className="mr-2 size-4" /> Admin dashboard
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem render={<Link to="/profile" />}>
          <UserRound className="mr-2 size-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => comingSoon("Notifications")}>
          <Bell className="mr-2 size-4" /> Notifications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 size-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
