import { Button } from "@/components/ui/button"

export function PaginationControls({
  page,
  totalPages,
  onPrevious,
  onNext,
}: {
  page: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={onPrevious}
      >
        Previous
      </Button>
      <span className="text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  )
}
