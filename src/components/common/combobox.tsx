import { Check, ChevronsUpDown } from "lucide-react"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Option = { label: string; value: string }

export function Combobox({
  value,
  onChange,
  options,
  placeholder = "Select option",
}: {
  value?: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)

  const selectedLabel = useMemo(
    () => options.find((item) => item.value === value)?.label ?? placeholder,
    [options, placeholder, value],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="w-[220px] justify-between" />
        }
      >
        {selectedLabel}
        <ChevronsUpDown className="ml-2 size-4 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
