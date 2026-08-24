import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { format, parseISO } from "date-fns"

import { StatusBadge } from "@/components/common/status-badge"
import { StatusProgress } from "@/components/data-display/status-progress"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { ProjectRow } from "@/types/table"

export const projectColumns: ColumnDef<ProjectRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(checked === true)
        }
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(checked === true)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-3"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "health",
    header: "Health",
    cell: ({ row }) => <StatusProgress value={row.original.health} />,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => format(parseISO(row.original.updatedAt), "MMM d, yyyy"),
  },
]
