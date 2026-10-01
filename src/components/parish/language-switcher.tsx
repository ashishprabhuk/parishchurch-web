import { Check, Languages } from "lucide-react"

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
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="border-primary/25 text-primary hover:border-primary/50 hover:bg-primary/5 h-8 gap-1.5 rounded-full px-2.5 text-xs font-semibold tracking-[0.08em]"
            aria-label="Choose language"
          />
        }
      >
        <Languages className="size-3.5" aria-hidden="true" />
        <span>{lang === "en" ? "EN" : "MR"}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36 rounded-xl p-1.5">
        <DropdownMenuItem
          onClick={() => setLang("en")}
          className="justify-between rounded-lg"
        >
          <span className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary grid size-6 place-items-center rounded-full text-[0.65rem] font-bold">
              EN
            </span>
            English
          </span>
          {lang === "en" ? <Check className="text-primary size-4" /> : null}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLang("mr")}
          className="justify-between rounded-lg"
        >
          <span className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary grid size-6 place-items-center rounded-full text-[0.65rem] font-bold">
              MR
            </span>
            मराठी
          </span>
          {lang === "mr" ? <Check className="text-primary size-4" /> : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
