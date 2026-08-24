import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useI18n } from "@/hooks/use-i18n"

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
        <Languages className="mr-2 size-4" />
        {lang.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang("en")}>EN</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("mr")}>MR</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
