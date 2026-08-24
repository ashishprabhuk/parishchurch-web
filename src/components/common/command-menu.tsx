import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Command } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

type MenuItem = {
  label: string
  href: string
}

const items: MenuItem[] = [
  { label: "Go to Home", href: "/" },
  { label: "Go to Dashboard", href: "/dashboard" },
  { label: "Go to Settings", href: "/settings" },
  { label: "Go to Login", href: "/login" },
]

export function CommandMenu() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((state) => !state)
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Command className="mr-2 size-4" /> Command Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find route or action..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {items.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => {
                  navigate(item.href)
                  setOpen(false)
                }}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
