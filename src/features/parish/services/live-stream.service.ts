import { isAxiosError } from "axios"

import { api } from "@/lib/api"
import type {
  LiveMassRecord,
  LiveStream,
  LiveStreamStatus,
} from "@/features/parish/types"
import {
  parseApiLiveMass,
  selectActiveAndUpcomingMass,
} from "@/features/parish/utils/live-mass"

const LIVE_STREAM_STORAGE_KEY = "parish-live-stream"

export type CreateLiveMassPayload = {
  youtubeUrl: string
  title: string
  startsAt: string
  durationMinutes: number
  isCancelled?: boolean
}

export type UpdateLiveMassPayload = {
  youtubeUrl: string
  title: string
  startsAt: string
  durationMinutes: number
  isCancelled: boolean
}

type AdminLiveMassPayload = {
  youtubeUrl: string
  title: string
  startsAt: string
  durationMinutes: number
  isCancelled: boolean
}

type LiveMassResponse = {
  id: number
  youtubeUrl: string
  title: string
  status: string
  startsAt: string
  endsAt: string
  live: boolean
}

type ApiResponseLiveMassResponse = {
  data: LiveMassResponse[]
  message?: string
  pagination?: unknown
  meta?: unknown
}

function unwrap(value: unknown): unknown {
  if (value && typeof value === "object" && "data" in value) {
    return (value as Record<string, unknown>).data
  }
  return value
}

function rethrowAuthorizationError(error: unknown): void {
  if (isAxiosError(error) && [401, 403].includes(error.response?.status ?? 0)) {
    throw error
  }
}

function readLocalLiveStream(): LiveStreamStatus {
  if (typeof window === "undefined") return { isLive: false }

  try {
    const stored = JSON.parse(
      window.localStorage.getItem(LIVE_STREAM_STORAGE_KEY) ?? "null",
    )
    if (
      stored &&
      typeof stored === "object" &&
      stored.isLive === true &&
      typeof stored.youtubeVideoId === "string"
    ) {
      return stored as LiveStream
    }
    return { isLive: false }
  } catch {
    return { isLive: false }
  }
}

function writeLocalLiveStream(stream: LiveStreamStatus) {
  if (typeof window === "undefined") return

  if (stream.isLive) {
    window.localStorage.setItem(
      LIVE_STREAM_STORAGE_KEY,
      JSON.stringify(stream),
    )
  } else {
    window.localStorage.removeItem(LIVE_STREAM_STORAGE_KEY)
  }
}

function toLiveMassRecords(value: unknown): LiveMassRecord[] {
  const unwrapped = unwrap(value)
  if (!Array.isArray(unwrapped)) return []
  return unwrapped
    .map((item) => parseApiLiveMass(item))
    .filter((item): item is LiveMassRecord => item !== null)
}

export async function getLiveMasses(): Promise<LiveMassRecord[]> {
  try {
    const response = await api.get<ApiResponseLiveMassResponse | LiveMassResponse[]>(
      "/api/v1/live-masses",
    )
    const records = toLiveMassRecords(response)
    if (records.length > 0) return records
    return getAdminLiveMasses()
  } catch {
    try {
      return await getAdminLiveMasses()
    } catch {
      return []
    }
  }
}

export async function getAdminLiveMasses(): Promise<LiveMassRecord[]> {
  const response = await api.get<ApiResponseLiveMassResponse | LiveMassResponse[]>(
    "/api/v1/admin/live-masses",
  )
  return toLiveMassRecords(response)
}

export async function getLiveStream(): Promise<LiveStreamStatus> {
  try {
    const masses = await getLiveMasses()
    const { activeMass } = selectActiveAndUpcomingMass(masses)
    if (activeMass) {
      return {
        id: activeMass.id,
        youtubeVideoId: activeMass.youtubeVideoId,
        title: activeMass.title,
        isLive: true,
        startedAt: activeMass.startsAt,
        endedAt: activeMass.endsAt,
        createdAt: activeMass.startsAt,
        updatedAt: activeMass.startsAt,
      }
    }
    return { isLive: false }
  } catch {
    return readLocalLiveStream()
  }
}

export async function createLiveMass(
  payload: CreateLiveMassPayload,
): Promise<LiveMassRecord> {
  const adminPayload: AdminLiveMassPayload = {
    youtubeUrl: payload.youtubeUrl,
    title: payload.title,
    startsAt: payload.startsAt,
    durationMinutes: payload.durationMinutes,
    isCancelled: payload.isCancelled ?? false,
  }

  try {
    const response = await api.post<unknown, AdminLiveMassPayload>(
      "/api/v1/admin/live-masses",
      adminPayload,
    )
    const record = parseApiLiveMass(unwrap(response))
    if (record) return record

    return {
      id: `live-${Date.now()}`,
      title: payload.title,
      youtubeUrl: payload.youtubeUrl,
      youtubeVideoId: "",
      startsAt: payload.startsAt,
      endsAt: new Date(
        new Date(payload.startsAt).getTime() + payload.durationMinutes * 60 * 1000,
      ).toISOString(),
      durationMinutes: payload.durationMinutes,
      status: "SCHEDULED",
      computedStatus: "UPCOMING",
      live: false,
      isCancelled: payload.isCancelled ?? false,
    }
  } catch (error) {
    rethrowAuthorizationError(error)
    throw error
  }
}

export async function updateLiveMass(
  id: string,
  payload: UpdateLiveMassPayload,
): Promise<LiveMassRecord> {
  const adminPayload: AdminLiveMassPayload = {
    youtubeUrl: payload.youtubeUrl,
    title: payload.title,
    startsAt: payload.startsAt,
    durationMinutes: payload.durationMinutes,
    isCancelled: payload.isCancelled,
  }

  try {
    const response = await api.put<unknown, AdminLiveMassPayload>(
      `/api/v1/admin/live-masses/${id}`,
      adminPayload,
    )
    const record = parseApiLiveMass(unwrap(response))
    if (record) return record

    return {
      id,
      title: payload.title,
      youtubeUrl: payload.youtubeUrl,
      youtubeVideoId: "",
      startsAt: payload.startsAt,
      endsAt: new Date(
        new Date(payload.startsAt).getTime() + payload.durationMinutes * 60 * 1000,
      ).toISOString(),
      durationMinutes: payload.durationMinutes,
      status: payload.isCancelled ? "CANCELLED" : "SCHEDULED",
      computedStatus: payload.isCancelled ? "CANCELLED" : "UPCOMING",
      live: false,
      isCancelled: payload.isCancelled,
    }
  } catch (error) {
    rethrowAuthorizationError(error)
    throw error
  }
}

export async function deleteLiveMass(id: string): Promise<{ id: string }> {
  try {
    await api.delete(`/api/v1/admin/live-masses/${id}`)
    return { id }
  } catch (error) {
    rethrowAuthorizationError(error)
    throw error
  }
}

export async function publishLiveStream(
  payload: {
    youtubeVideoId: string
    title: string
    startsAt?: string
    durationMinutes?: number
  },
  current?: LiveStream,
): Promise<LiveStreamStatus> {
  const youtubeUrl = `https://www.youtube.com/watch?v=${payload.youtubeVideoId}`
  const startsAt = payload.startsAt ?? current?.startedAt ?? new Date().toISOString()
  const durationMinutes = payload.durationMinutes ?? 120

  if (current?.id) {
    await updateLiveMass(current.id, {
      youtubeUrl,
      title: payload.title,
      startsAt,
      durationMinutes,
      isCancelled: false,
    })
  } else {
    await createLiveMass({
      youtubeUrl,
      title: payload.title,
      startsAt,
      durationMinutes,
      isCancelled: false,
    })
  }

  return getLiveStream()
}

export async function endLiveStream(): Promise<LiveStreamStatus> {
  writeLocalLiveStream({ isLive: false })
  return { isLive: false }
}

export async function getAdminLiveStream(): Promise<LiveStreamStatus> {
  return getLiveStream()
}

export type AdminLiveMass = LiveMassRecord
