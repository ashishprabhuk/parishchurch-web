import { extractYouTubeVideoId } from "@/lib/youtube"
import type { LiveMassRecord, LiveMassStatus } from "@/features/parish/types"

export const CHURCH_TIMEZONE = "Asia/Kolkata"

export type LiveMassInput = {
  startsAt: string
  endsAt?: string | null
  durationMinutes?: number | null
  status?: string | null
  live?: boolean | null
  isCancelled?: boolean | null
}

/**
 * Safely parses an ISO date or timestamp string from the backend.
 * Appends 'Z' if timezone offset is missing on ISO timestamps to prevent
 * accidental local timezone conversion of UTC server timestamps.
 */
export function parseServerDate(
  value: string | number | Date | null | undefined,
): Date | null {
  if (value === null || value === undefined || value === "") return null
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  if (typeof value === "number") {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? null : d
  }
  const trimmed = String(value).trim()
  if (!trimmed) return null

  // If timestamp has a date and time with T, but no trailing Z or offset (+HH:MM / -HH:MM)
  const hasTimezone =
    trimmed.endsWith("Z") || /[+-]\d{2}(:?\d{2})?$/.test(trimmed)
  const normalized =
    !hasTimezone && trimmed.includes("T") ? `${trimmed}+05:30` : trimmed

  const date = new Date(normalized)
  return Number.isNaN(date.getTime()) ? null : date
}

/**
 * Calculates effective end time: uses endsAt if present, or startsAt + durationMinutes.
 */
export function getEffectiveEndDate(
  startsAt: string,
  endsAt?: string | null,
  durationMinutes?: number | null,
): Date | null {
  const end = parseServerDate(endsAt)
  if (end) return end

  const start = parseServerDate(startsAt)
  if (!start) return null

  const duration =
    typeof durationMinutes === "number" && durationMinutes > 0
      ? durationMinutes
      : 60

  return new Date(start.getTime() + duration * 60 * 1000)
}

/**
 * Evaluates whether a Live Mass record is CANCELLED, UPCOMING, LIVE, or COMPLETED.
 */
export function calculateMassStatus(
  input: LiveMassInput,
  now: Date = new Date(),
): LiveMassStatus {
  if (
    input.isCancelled === true ||
    input.status?.toUpperCase() === "CANCELLED"
  ) {
    return "CANCELLED"
  }

  const startDate = parseServerDate(input.startsAt)
  if (!startDate) return "COMPLETED"

  const endDate = getEffectiveEndDate(
    input.startsAt,
    input.endsAt,
    input.durationMinutes,
  )

  const nowMs = now.getTime()
  const startMs = startDate.getTime()
  const endMs = endDate ? endDate.getTime() : startMs + 60 * 60 * 1000

  if (input.status?.toUpperCase() === "ENDED" || nowMs >= endMs) {
    return "COMPLETED"
  }

  if (nowMs < startMs) {
    return "UPCOMING"
  }

  if (nowMs >= startMs && nowMs < endMs) {
    return "LIVE"
  }

  if (input.live === true || input.status?.toUpperCase() === "LIVE") {
    return "LIVE"
  }

  return "COMPLETED"
}

/**
 * Parses and normalizes a live-mass record returned by backend APIs.
 */
export function parseApiLiveMass(
  item: unknown,
  now: Date = new Date(),
): LiveMassRecord | null {
  if (!item || typeof item !== "object") return null
  const record = item as Record<string, unknown>
  const id = String(record.id ?? "").trim()
  if (!id) return null

  const title = String(record.title ?? "Holy Mass").trim() || "Holy Mass"
  const youtubeUrl = String(record.youtubeUrl ?? "").trim()
  const youtubeVideoId =
    extractYouTubeVideoId(youtubeUrl) ||
    String(record.youtubeVideoId ?? "").trim()
  const startsAt = String(record.startsAt ?? record.startedAt ?? "").trim()

  const startDate = parseServerDate(startsAt)
  const endsAtRaw = String(record.endsAt ?? record.endedAt ?? "").trim()
  const endDate = parseServerDate(endsAtRaw)
  const responseDurationMinutes = Number(record.durationMinutes)
  const durationMinutes =
    responseDurationMinutes > 0
      ? responseDurationMinutes
      : startDate && endDate
        ? Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / 60000))
        : 60
  const endsAt =
    endsAtRaw ||
    (startDate
      ? new Date(startDate.getTime() + durationMinutes * 60 * 1000).toISOString()
      : "")

  const rawStatus = String(record.status ?? "").trim()
  const isCancelled =
    record.isCancelled === true || rawStatus.toUpperCase() === "CANCELLED"
  const live = record.live === true || rawStatus.toUpperCase() === "LIVE"

  const massData = {
    id,
    title,
    youtubeUrl,
    youtubeVideoId,
    startsAt,
    endsAt,
    durationMinutes,
    status: rawStatus,
    live,
    isCancelled,
  }

  const computedStatus = calculateMassStatus(massData, now)

  return {
    ...massData,
    computedStatus,
  }
}

/**
 * Given a list of Live Mass records, identifies the active live stream (if any)
 * and the next upcoming scheduled stream (if any).
 */
export function selectActiveAndUpcomingMass(
  masses: LiveMassRecord[],
  now: Date = new Date(),
): {
  activeMass: LiveMassRecord | null
  upcomingMass: LiveMassRecord | null
  updatedMasses: LiveMassRecord[]
} {
  const updatedMasses = masses.map((mass) => ({
    ...mass,
    computedStatus: calculateMassStatus(mass, now),
  }))

  // Active: computedStatus === "LIVE", not cancelled, has valid youtubeVideoId
  const activeCandidates = updatedMasses
    .filter(
      (m) => m.computedStatus === "LIVE" && !m.isCancelled && m.youtubeVideoId,
    )
    .sort((a, b) => {
      const aStart = parseServerDate(a.startsAt)?.getTime() ?? 0
      const bStart = parseServerDate(b.startsAt)?.getTime() ?? 0
      return bStart - aStart // most recent first
    })

  const activeMass = activeCandidates[0] ?? null

  // Upcoming: computedStatus === "UPCOMING", not cancelled, has valid youtubeVideoId
  const upcomingCandidates = updatedMasses
    .filter(
      (m) =>
        m.computedStatus === "UPCOMING" && !m.isCancelled && m.youtubeVideoId,
    )
    .sort((a, b) => {
      const aStart = parseServerDate(a.startsAt)?.getTime() ?? 0
      const bStart = parseServerDate(b.startsAt)?.getTime() ?? 0
      return aStart - bStart // closest upcoming first
    })

  const upcomingMass = upcomingCandidates[0] ?? null

  return { activeMass, upcomingMass, updatedMasses }
}

/**
 * Formats a timestamp into the church's intended timezone (Asia/Kolkata).
 */
export function formatChurchDateTime(
  date: Date | string | null | undefined,
): string {
  const d = parseServerDate(date)
  if (!d) return "—"
  const formatted = new Intl.DateTimeFormat("en-IN", {
    timeZone: CHURCH_TIMEZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d)
  return `${formatted} (IST)`
}

/**
 * Formats time only in the church's timezone (Asia/Kolkata).
 */
export function formatChurchTime(
  date: Date | string | null | undefined,
): string {
  const d = parseServerDate(date)
  if (!d) return "—"
  const formatted = new Intl.DateTimeFormat("en-IN", {
    timeZone: CHURCH_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d)
  return `${formatted} (IST)`
}

/**
 * Converts a UTC ISO timestamp or Date into a 'YYYY-MM-DDTHH:mm' string
 * representing the local time in the church's timezone (Asia/Kolkata)
 * suitable for <input type="datetime-local" />.
 */
export function toChurchDateTimeInput(
  isoDate?: string | Date | null,
): string {
  const d = parseServerDate(isoDate) ?? new Date()
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CHURCH_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d)

  const find = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? ""
  const yyyy = find("year")
  const mm = find("month")
  const dd = find("day")
  const hh = find("hour")
  const min = find("minute")

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`
}

/**
 * Converts a 'YYYY-MM-DDTHH:mm' string entered in the church's timezone
 * (Asia/Kolkata, UTC+05:30) into a normalized UTC ISO string.
 */
export function fromChurchDateTimeInput(
  dateTimeString: string,
): string {
  const trimmed = dateTimeString.trim()
  if (!trimmed) return new Date().toISOString()
  const dateWithOffset = new Date(`${trimmed}:00+05:30`)
  return Number.isNaN(dateWithOffset.getTime())
    ? new Date().toISOString()
    : dateWithOffset.toISOString()
}

/**
 * Formats a human-readable countdown string to the scheduled start.
 */
export function formatCountdown(
  targetDate: Date | string,
  now: Date = new Date(),
): string {
  const target = parseServerDate(targetDate)
  if (!target) return ""
  const diffMs = target.getTime() - now.getTime()
  if (diffMs <= 0) return "Starting now"

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (days > 0) {
    return `Starts in ${days}d ${hours}h`
  }
  if (hours > 0) {
    return `Starts in ${hours}h ${minutes}m`
  }
  if (minutes > 0) {
    return `Starts in ${minutes}m ${seconds}s`
  }
  return `Starts in ${seconds}s`
}
