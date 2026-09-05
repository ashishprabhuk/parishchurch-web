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

function generateId() {
  return `rec-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export async function getAdminCollection(
  type: AdminEntityType,
): Promise<AdminRecord[]> {
  const fallback = adminMockData[type] ?? []
  try {
    return asArray(await api.get<unknown>(`/api/v1/admin/${type}`), fallback)
  } catch {
    return fallback
  }
}

export async function createAdminRecord(
  type: AdminEntityType,
  payload: Record<string, unknown>,
): Promise<AdminRecord> {
  const record = { id: generateId(), ...payload }
  try {
    return await api.post<AdminRecord, typeof payload>(
      `/api/v1/admin/${type}`,
      payload,
    )
  } catch {
    return record
  }
}

export async function updateAdminRecord(
  type: AdminEntityType,
  id: string,
  payload: Record<string, unknown>,
): Promise<AdminRecord> {
  try {
    return await api.put<AdminRecord, typeof payload>(
      `/api/v1/admin/${type}/${id}`,
      payload,
    )
  } catch {
    return { id, ...payload }
  }
}

export async function deleteAdminRecord(
  type: AdminEntityType,
  id: string,
): Promise<{ id: string }> {
  try {
    await api.delete(`/api/v1/admin/${type}/${id}`)
  } catch {
    // Fall through to optimistic removal against mock data.
  }
  return { id }
}
