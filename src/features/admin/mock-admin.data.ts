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

import type { AdminEntityType, AdminRecord } from "./types"

/** Normalizes every entity into AdminRecord[] (objects with an id). */
export const adminMockData: Record<AdminEntityType, AdminRecord[]> = {
  announcements: announcements as unknown as AdminRecord[],
  events: events as unknown as AdminRecord[],
  "mass-timings": massTimings as unknown as AdminRecord[],
  sacraments: sacraments as unknown as AdminRecord[],
  clergy: clergy as unknown as AdminRecord[],
  communities: communitiesData as unknown as AdminRecord[],
  associations: associationsData as unknown as AdminRecord[],
  history: historyTimeline.map((h, i) => ({ id: `h${i + 1}`, ...h })),
  chronicle: chronicleIssues as unknown as AdminRecord[],
  outreach: outreach as unknown as AdminRecord[],
}
