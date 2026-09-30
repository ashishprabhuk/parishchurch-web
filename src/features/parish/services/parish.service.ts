import { api } from "@/lib/api"
import {
  announcements,
  associationsData,
  chronicleIssues,
  clergy,
  communitiesData,
  events,
  historyTimeline,
  massTimings,
  outreach,
  sacraments,
} from "@/features/parish/data/mock-parish.data"
import type {
  ChronicleIssue,
  ClergyMember,
  MassTiming,
  MassTimingApiRecord,
  ParishAnnouncement,
  ParishAssociation,
  ParishAssociationApiRecord,
  ParishCommunity,
  ParishEvent,
  ParishEventApiRecord,
  Sacrament,
} from "@/features/parish/types"

function getDayGroup(dayOfWeek: string): MassTiming["dayGroup"] {
  return dayOfWeek.toLowerCase() === "sunday" ? "sunday" : "weekday"
}

function formatMassTime(timeSlot: string): string {
  const [hours, minutes] = timeSlot.split(":").map(Number)
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return timeSlot

  const period = hours >= 12 ? "PM" : "AM"
  const displayHours = hours % 12 || 12
  return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`
}

function normalizeMassTiming(item: MassTimingApiRecord): MassTiming {
  const intention = item.intention.trim().toUpperCase()
  const dayName = item.dayOfWeek.trim()

  return {
    id: String(item.id),
    dayOfWeek: dayName,
    dayGroup: getDayGroup(dayName),
    label: `${item.language} Mass`,
    time: formatMassTime(item.timeSlot),
    intention,
    language: item.language,
    description: item.venue,
  }
}

function asArray<T>(value: unknown, fallback: T[]): T[] {
  if (Array.isArray(value)) {
    return value as T[]
  }
  // Unwrap common API envelopes such as `{ data: [...] }` or `{ items: [...] }`.
  if (value && typeof value === "object") {
    for (const key of ["data", "items", "results", "content"] as const) {
      const inner = (value as Record<string, unknown>)[key]
      if (Array.isArray(inner)) {
        return inner as T[]
      }
    }
  }
  return fallback
}

export async function getAnnouncements(): Promise<ParishAnnouncement[]> {
  try {
    return asArray(await api.get<ParishAnnouncement[]>("/api/v1/announcements"), announcements)
  } catch {
    return announcements
  }
}

export async function getAnnouncementBySlug(
  slug: string,
): Promise<ParishAnnouncement | null> {
  const isAnnouncement = (value: unknown): value is ParishAnnouncement =>
    !!value && typeof value === "object" && "slug" in value && "title" in value

  try {
    const response = await api.get<unknown>(`/api/v1/announcements/${slug}`)
    const unwrapped =
      response && typeof response === "object" && "data" in response
        ? (response as Record<string, unknown>).data
        : response
    return isAnnouncement(unwrapped) ? unwrapped : null
  } catch {
    return announcements.find((item) => item.slug === slug) ?? null
  }
}

export async function getEventsCalendar(
  from?: string,
  to?: string,
): Promise<ParishEvent[]> {
  try {
    const response = asArray<ParishEventApiRecord>(
      await api.get<ParishEventApiRecord[]>("/api/v1/calendar", {
        params: from && to ? { from, to } : undefined,
      }),
      [],
    )
    return response.map(normalizeCalendarEvent)
  } catch {
    return events
  }
}

export async function getUpcomingEvents(): Promise<ParishEvent[]> {
  try {
    const response = asArray<ParishEventApiRecord>(
      await api.get<ParishEventApiRecord[]>("/api/v1/events/upcoming", {
        params: { page: 0, size: 10 },
      }),
      [],
    )
    return response.map(normalizeCalendarEvent)
  } catch {
    return events
  }
}

function normalizeCalendarEvent(item: ParishEventApiRecord): ParishEvent {
  return {
    id: String(item.id),
    title: item.occasion,
    category: "Parish event",
    location: item.coordinator || "Parish",
    date: item.eventDate,
    time: item.eventTime,
    description: [item.preacherOrPriest, item.coordinator]
      .filter(Boolean)
      .join(" | "),
  }
}

export async function getMassTimings(): Promise<MassTiming[]> {
  try {
    const response = asArray<MassTimingApiRecord>(
      await api.get<MassTimingApiRecord[]>("/api/v1/mass-timings"),
      [],
    )
    return response.filter((item) => item.isActive !== false).map(normalizeMassTiming)
  } catch {
    return massTimings
  }
}

export async function getMassTimingById(id: string): Promise<MassTiming | null> {
  try {
    const response = asArray<MassTimingApiRecord>(
      await api.get<MassTimingApiRecord[]>(`/api/v1/mass-timings/${id}`),
      [],
    )
    const item = response[0]
    return item && item.isActive !== false ? normalizeMassTiming(item) : null
  } catch {
    return massTimings.find((item) => item.id === id) ?? null
  }
}

export async function getSacraments(): Promise<Sacrament[]> {
  try {
    return asArray(await api.get<Sacrament[]>("/api/v1/sacraments"), sacraments)
  } catch {
    return sacraments
  }
}

export async function getClergy(): Promise<ClergyMember[]> {
  try {
    return asArray(await api.get<ClergyMember[]>("/api/v1/clergy"), clergy)
  } catch {
    return clergy
  }
}

export async function getCommunities(): Promise<ParishCommunity[]> {
  try {
    return asArray(await api.get<ParishCommunity[]>("/api/v1/communities"), communitiesData)
  } catch {
    return communitiesData
  }
}

export async function getCellsAssociations(): Promise<ParishAssociation[]> {
  try {
    const response = asArray<ParishAssociationApiRecord>(
      await api.get<ParishAssociationApiRecord[]>("/api/v1/cell-associations"),
      [],
    )

    return response.map((item) => ({
      id: String(item.id),
      name: item.name,
      description: item.description ?? undefined,
      leader: item.priestInCharge ?? undefined,
      meetingTime: item.meetingSchedule ?? undefined,
      category: item.coordinatorTitle ?? undefined,
      contact: item.coordinatorName ?? undefined,
    }))
  } catch {
    return associationsData
  }
}

export async function getCellsAssociationById(
  id: string,
): Promise<ParishAssociation | null> {
  try {
    const response = await api.get<unknown>(`/api/v1/cell-associations/${id}`)
    const records = asArray<ParishAssociationApiRecord>(response, [])
    const item = records[0] ?? response

    if (!item || typeof item !== "object" || !("id" in item) || !("name" in item)) {
      return null
    }

    const association = item as ParishAssociationApiRecord
    return {
      id: String(association.id),
      name: association.name,
      description: association.description ?? undefined,
      leader: association.priestInCharge ?? undefined,
      meetingTime: association.meetingSchedule ?? undefined,
      category: association.coordinatorTitle ?? undefined,
      contact: association.coordinatorName ?? undefined,
    }
  } catch {
    return associationsData.find((item) => item.id === id) ?? null
  }
}

export async function getHistoryTimeline() {
  try {
    return asArray(
      await api.get<{ year: string; text: string }[]>("/api/v1/history"),
      historyTimeline,
    )
  } catch {
    return historyTimeline
  }
}

export async function getChronicle(): Promise<ChronicleIssue[]> {
  try {
    return asArray(
      await api.get<ChronicleIssue[]>(
        "/api/v1/chronicles?page=0&size=50",
      ),
      chronicleIssues,
    )
  } catch {
    return chronicleIssues
  }
}

export async function getChronicleBySlug(slug: string): Promise<ChronicleIssue | null> {
  try {
    return await api.get<ChronicleIssue>(
      `/api/v1/chronicles/${encodeURIComponent(slug)}`,
    )
  } catch {
    return chronicleIssues.find((issue) => issue.slug === slug || issue.id === slug) ?? null
  }
}

export const getChronicleById = getChronicleBySlug

export async function getOutreach() {
  try {
    return asArray(await api.get<typeof outreach>("/api/v1/outreach"), outreach)
  } catch {
    return outreach
  }
}

export async function postFeedback(payload: {
  name?: string
  email?: string
  phone?: string
  category: string
  message: string
  anonymous: boolean
}) {
  try {
    return await api.post<{ success: true }, typeof payload>(
      "/api/v1/feedback",
      payload,
    )
  } catch {
    return { success: true as const }
  }
}
