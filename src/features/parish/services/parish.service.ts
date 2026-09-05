import { api } from "@/lib/api"
import {
  announcements,
  chronicleIssues,
  clergy,
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
  ParishAnnouncement,
  ParishEvent,
  Sacrament,
} from "@/features/parish/types"

function asArray<T>(value: unknown, fallback: T[]): T[] {
  if (Array.isArray(value)) {
    return value as T[]
  }
  // Unwrap common API envelopes such as `{ data: [...] }` or `{ items: [...] }`.
  if (value && typeof value === "object") {
    for (const key of ["data", "items", "results"] as const) {
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

export async function getEventsCalendar(): Promise<ParishEvent[]> {
  try {
    return asArray(await api.get<ParishEvent[]>("/api/v1/events/calendar"), events)
  } catch {
    return events
  }
}

export async function getMassTimings(): Promise<MassTiming[]> {
  try {
    return asArray(await api.get<MassTiming[]>("/api/v1/mass-timings"), massTimings)
  } catch {
    return massTimings
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

export async function getCommunities() {
  try {
    return asArray(await api.get<string[]>("/api/v1/communities"), [
      "SCC Communities",
      "Youth Fellowship",
      "Family Cell Groups",
    ])
  } catch {
    return ["SCC Communities", "Youth Fellowship", "Family Cell Groups"]
  }
}

export async function getCellsAssociations() {
  try {
    return asArray(await api.get<string[]>("/api/v1/cells-associations"), [
      "Legion of Mary",
      "Choir Association",
      "St. Vincent de Paul",
    ])
  } catch {
    return ["Legion of Mary", "Choir Association", "St. Vincent de Paul"]
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
    return asArray(await api.get<ChronicleIssue[]>("/api/v1/chronicle"), chronicleIssues)
  } catch {
    return chronicleIssues
  }
}

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
