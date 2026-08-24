import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function DatePicker({
  date,
  onChange,
}: {
  date?: Date
  onChange: (date: Date | undefined) => void
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "w-[220px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          />
        }
      >
        <CalendarIcon className="mr-2 size-4" />
        {date ? format(date, "PPP") : "Pick a date"}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  )
}
