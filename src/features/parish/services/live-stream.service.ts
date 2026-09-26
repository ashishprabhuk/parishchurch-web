import { isAxiosError } from "axios"

import { api } from "@/lib/api"
import type { LiveStream, LiveStreamStatus } from "@/features/parish/types"

const LIVE_STREAM_STORAGE_KEY = "parish-live-stream"

type LiveStreamPayload = {
  youtubeVideoId: string
  title: string
}

function unwrap(value: unknown): unknown {
  if (value && typeof value === "object" && "data" in value) {
    return (value as Record<string, unknown>).data
  }
  return value
}

function isLiveStream(value: unknown): value is LiveStream {
  return (
    !!value &&
    typeof value === "object" &&
    (value as LiveStream).isLive === true &&
    typeof (value as LiveStream).youtubeVideoId === "string" &&
    typeof (value as LiveStream).title === "string" &&
    typeof (value as LiveStream).startedAt === "string"
  )
}

function isLiveStreamStatus(value: unknown): value is LiveStreamStatus {
  return isLiveStream(value) || (value !== null && typeof value === "object" && (value as { isLive?: unknown }).isLive === false)
}

function readLocalLiveStream(): LiveStreamStatus {
  if (typeof window === "undefined") return { isLive: false }

  try {
    const stored = JSON.parse(
      window.localStorage.getItem(LIVE_STREAM_STORAGE_KEY) ?? "null",
    )
    return isLiveStream(stored) ? stored : { isLive: false }
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

function rethrowAuthorizationError(error: unknown): void {
  if (isAxiosError(error) && [401, 403].includes(error.response?.status ?? 0)) {
    throw error
  }
}

export async function getLiveStream(): Promise<LiveStreamStatus> {
  try {
    const response = unwrap(await api.get<unknown>("/api/v1/live-stream"))
    return isLiveStreamStatus(response) ? response : readLocalLiveStream()
  } catch {
    return readLocalLiveStream()
  }
}

export async function publishLiveStream(
  payload: LiveStreamPayload,
): Promise<LiveStream> {
  try {
    const response = unwrap(
      await api.post<unknown, LiveStreamPayload>(
        "/api/v1/admin/live-stream",
        payload,
      ),
    )
    if (isLiveStream(response)) return response
  } catch (error) {
    rethrowAuthorizationError(error)
  }

  const now = new Date().toISOString()
  const stream: LiveStream = {
    id: `live-${Date.now().toString(36)}`,
    ...payload,
    isLive: true,
    startedAt: now,
    createdAt: now,
    updatedAt: now,
  }
  writeLocalLiveStream(stream)
  return stream
}

export async function endLiveStream(): Promise<LiveStreamStatus> {
  try {
    const response = unwrap(
      await api.patch<unknown, { isLive: false }>(
        "/api/v1/admin/live-stream",
        { isLive: false },
      ),
    )
    if (response && typeof response === "object" && "isLive" in response) {
      return response as LiveStreamStatus
    }
  } catch (error) {
    rethrowAuthorizationError(error)
  }

  writeLocalLiveStream({ isLive: false })
  return { isLive: false }
}