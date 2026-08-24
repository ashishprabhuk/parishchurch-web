import type { ProjectRow } from "@/types/table"

export type DashboardStats = {
  activeProjects: number
  releaseVelocity: string
  incidentRate: string
  customerNps: string
}

export type ActivityItem = {
  id: string
  title: string
  timestamp: string
}

export type DashboardPayload = {
  stats: DashboardStats
  projects: ProjectRow[]
  activity: ActivityItem[]
}
