import { format } from "date-fns"

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

export function toDateOrNull(
  value: string | number | Date | null | undefined,
): Date | null {
  if (value === null || value === undefined || value === "") {
    return null
  }
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(
  value: string | number | Date | null | undefined,
  pattern: string,
  fallback = "",
): string {
  const date = toDateOrNull(value)
  return date ? format(date, pattern) : fallback
}
