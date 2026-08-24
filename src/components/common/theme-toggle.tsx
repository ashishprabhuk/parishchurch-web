import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/stores/app.store"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const themePreference = useAppStore((state) => state.themePreference)
  const setThemePreference = useAppStore((state) => state.setThemePreference)

  const applyTheme = (theme: "light" | "dark" | "system") => {
    setThemePreference(theme)
    setTheme(theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" aria-label="Toggle theme" />
        }
      >
        {themePreference === "dark" ? (
          <Moon className="size-4" />
        ) : themePreference === "light" ? (
          <Sun className="size-4" />
        ) : (
          <Monitor className="size-4" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => applyTheme("light")}>
          <Sun className="mr-2 size-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme("dark")}>
          <Moon className="mr-2 size-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme("system")}>
          <Monitor className="mr-2 size-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
