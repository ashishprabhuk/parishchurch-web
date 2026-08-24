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

export async function getAnnouncements(): Promise<ParishAnnouncement[]> {
  try {
    return await api.get<ParishAnnouncement[]>("/api/v1/announcements")
  } catch {
    return announcements
  }
}

export async function getAnnouncementBySlug(
  slug: string,
): Promise<ParishAnnouncement | null> {
  try {
    return await api.get<ParishAnnouncement>(`/api/v1/announcements/${slug}`)
  } catch {
    return announcements.find((item) => item.slug === slug) ?? null
  }
}

export async function getEventsCalendar(): Promise<ParishEvent[]> {
  try {
    return await api.get<ParishEvent[]>("/api/v1/events/calendar")
  } catch {
    return events
  }
}

export async function getMassTimings(): Promise<MassTiming[]> {
  try {
    return await api.get<MassTiming[]>("/api/v1/mass-timings")
  } catch {
    return massTimings
  }
}

export async function getSacraments(): Promise<Sacrament[]> {
  try {
    return await api.get<Sacrament[]>("/api/v1/sacraments")
  } catch {
    return sacraments
  }
}

export async function getClergy(): Promise<ClergyMember[]> {
  try {
    return await api.get<ClergyMember[]>("/api/v1/clergy")
  } catch {
    return clergy
  }
}

export async function getCommunities() {
  try {
    return await api.get<string[]>("/api/v1/communities")
  } catch {
    return ["SCC Communities", "Youth Fellowship", "Family Cell Groups"]
  }
}

export async function getCellsAssociations() {
  try {
    return await api.get<string[]>("/api/v1/cells-associations")
  } catch {
    return ["Legion of Mary", "Choir Association", "St. Vincent de Paul"]
  }
}

export async function getHistoryTimeline() {
  try {
    return await api.get<{ year: string; text: string }[]>("/api/v1/history")
  } catch {
    return historyTimeline
  }
}

export async function getChronicle(): Promise<ChronicleIssue[]> {
  try {
    return await api.get<ChronicleIssue[]>("/api/v1/chronicle")
  } catch {
    return chronicleIssues
  }
}

export async function getOutreach() {
  try {
    return await api.get<typeof outreach>("/api/v1/outreach")
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
