import { addDays, formatISO } from "date-fns"

import { apiClient } from "@/lib/api/client"
import type { DashboardPayload } from "@/features/example/types/dashboard"

const fallbackData: DashboardPayload = {
  stats: {
    activeProjects: 18,
    releaseVelocity: "+12.4%",
    incidentRate: "0.12%",
    customerNps: "68",
  },
  activity: [
    { id: "1", title: "Design system tokens updated", timestamp: "2h ago" },
    { id: "2", title: "Analytics endpoint moved to v2", timestamp: "5h ago" },
    { id: "3", title: "Feature flags synced", timestamp: "1d ago" },
  ],
  projects: [
    {
      id: "p_001",
      name: "Starter Shell",
      owner: "Alex",
      status: "active",
      health: 95,
      updatedAt: formatISO(addDays(new Date(), -1)),
    },
    {
      id: "p_002",
      name: "Billing Console",
      owner: "Nia",
      status: "paused",
      health: 72,
      updatedAt: formatISO(addDays(new Date(), -3)),
    },
    {
      id: "p_003",
      name: "Growth Engine",
      owner: "Sam",
      status: "active",
      health: 88,
      updatedAt: formatISO(addDays(new Date(), -5)),
    },
    {
      id: "p_004",
      name: "Docs Revamp",
      owner: "Mina",
      status: "archived",
      health: 61,
      updatedAt: formatISO(addDays(new Date(), -12)),
    },
  ],
}

export async function getDashboardPayload(): Promise<DashboardPayload> {
  try {
    const response = await apiClient.get<DashboardPayload>("/dashboard")
    return response.data
  } catch {
    return fallbackData
  }
}
