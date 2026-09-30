import { api } from "@/lib/api"

import { adminMockData } from "./mock-admin.data"
import type { AdminEntityType, AdminRecord } from "./types"

function asArray(value: unknown, fallback: AdminRecord[]): AdminRecord[] {
  if (Array.isArray(value)) {
    return value as AdminRecord[]
  }
  if (value && typeof value === "object") {
    for (const key of ["data", "items", "results"] as const) {
      const inner = (value as Record<string, unknown>)[key]
      if (Array.isArray(inner)) {
        return inner as AdminRecord[]
      }
    }
  }
  return fallback
}

export async function getAdminCollection(
  type: AdminEntityType,
): Promise<AdminRecord[]> {
  const fallback = adminMockData[type] ?? []
  const collectionUrl =
    type === "mass-timings"
      ? "/api/v1/mass-timings"
      : type === "events"
        ? "/api/v1/events/upcoming?page=0&size=50"
      : type === "communities"
        ? "/api/v1/communities"
        : type === "cell-associations"
          ? "/api/v1/cell-associations"
        : type === "chronicle"
          ? "/api/v1/chronicles"
          : `/api/v1/admin/${type}`
  try {
    return asArray(await api.get<unknown>(collectionUrl), fallback)
  } catch {
    return fallback
  }
}

export async function getCommunityById(id: string): Promise<AdminRecord | null> {
  const response = await api.get<unknown>(`/api/v1/communities/${id}`)
  const records = asArray(response, [])
  return records[0] ?? null
}

export async function createAdminRecord(
  type: AdminEntityType,
  payload: Record<string, unknown>,
): Promise<AdminRecord> {
  return api.post<AdminRecord, typeof payload>(
    adminCollectionUrl(type),
    toApiPayload(type, payload),
  )
}

export async function updateAdminRecord(
  type: AdminEntityType,
  id: string,
  payload: Record<string, unknown>,
): Promise<AdminRecord> {
  return api.put<AdminRecord, typeof payload>(
    `${adminCollectionUrl(type)}/${id}`,
    toApiPayload(type, payload),
  )
}

export async function archiveAdminRecord(
  type: AdminEntityType,
  id: string,
): Promise<{ id: string }> {
  await api.post(`${adminCollectionUrl(type)}/${id}/archive`)
  return { id }
}

function toApiPayload(type: AdminEntityType, payload: Record<string, unknown>) {
  if (type === "chronicle") {
    return {
      title: String(payload.title ?? "").trim(),
      slug: String(payload.slug ?? "").trim(),
      body: String(payload.body ?? "").trim(),
      coverImageId: Number(payload.coverImageId),
      publishDate: String(payload.publishDate ?? "").trim(),
      expiryDate: String(payload.expiryDate ?? "").trim(),
      link: String(payload.link ?? "").trim(),
      status: String(payload.status ?? "DRAFT").trim().toUpperCase(),
    }
  }
  if (type === "communities") {
    return {
      name: String(payload.name ?? "").trim(),
      patronSaint: String(payload.patronSaint ?? "").trim(),
      zone: Number(payload.zone),
      description: String(payload.description ?? "").trim(),
      ppcPerson: String(payload.ppcPerson ?? "").trim(),
      minister: String(payload.minister ?? "").trim(),
      communityMembers: parseJsonObject(payload.communityMembers),
      zoneDetails: parseJsonObject(payload.zoneDetails),
    }
  }
  if (type === "cell-associations") {
    return {
      name: String(payload.name ?? "").trim(),
      description: String(payload.description ?? "").trim(),
      priestInCharge: String(payload.priestInCharge ?? "").trim(),
      coordinatorTitle: String(payload.coordinatorTitle ?? "").trim(),
      coordinatorName: String(payload.coordinatorName ?? "").trim(),
      meetingSchedule: String(payload.meetingSchedule ?? "").trim(),
      cellMembers: parseMemberList(payload.cellMembers),
    }
  }
  if (type === "events") {
    const eventDate = String(payload.eventDate ?? "").trim()
    return {
      eventDate,
      eventTime: String(payload.eventTime ?? "").trim(),
      occasion: String(payload.occasion ?? "").trim(),
      preacherOrPriest: String(payload.preacherOrPriest ?? "").trim(),
      coordinator: String(payload.coordinator ?? "").trim(),
      day: eventDate ? new Date(`${eventDate}T00:00:00`).toLocaleDateString("en-US", { weekday: "long" }) : "",
      month: eventDate ? new Date(`${eventDate}T00:00:00`).toLocaleDateString("en-US", { month: "long" }) : "",
      year: eventDate ? Number(eventDate.slice(0, 4)) : 0,
    }
  }
  if (type !== "mass-timings") return payload
  const timeSlot = String(payload.timeSlot ?? "").trim()
  return {
    dayOfWeek: String(payload.dayOfWeek ?? "").trim(),
    timeSlot: /^\d{2}:\d{2}$/.test(timeSlot) ? `${timeSlot}:00` : timeSlot,
    language: String(payload.language ?? "").trim(),
    venue: String(payload.venue ?? "").trim(),
    intention: String(payload.intention ?? "").trim(),
    isActive: String(payload.isActive ?? "true").toLowerCase() !== "false",
  }
}

function adminCollectionUrl(type: AdminEntityType) {
  const collection =
    type === "chronicle"
      ? "chronicles"
      : type === "events"
        ? "calendar-events"
        : type
  return `/api/v1/admin/${collection}`
}

function parseJsonObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object") return value as Record<string, unknown>
  if (typeof value !== "string" || !value.trim()) return {}

  const parsed: unknown = JSON.parse(value)
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Expected a JSON object")
  }
  return parsed as Record<string, unknown>
}

function parseMemberList(value: unknown): Array<{ name: string; phone: string }> {
  if (Array.isArray(value)) return value as Array<{ name: string; phone: string }>
  if (typeof value !== "string" || !value.trim()) return []
  const parsed: unknown = JSON.parse(value)
  if (!Array.isArray(parsed)) throw new Error("Expected a member list")
  return parsed.map((member) => ({
    name: String((member as Record<string, unknown>).name ?? "").trim(),
    phone: String((member as Record<string, unknown>).phone ?? "").trim(),
  }))
}

