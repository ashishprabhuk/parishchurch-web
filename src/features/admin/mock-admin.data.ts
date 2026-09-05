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

import type { AdminEntityType, AdminRecord } from "./types"

function named(values: string[], prefix: string): AdminRecord[] {
  return values.map((name, i) => ({ id: `${prefix}${i + 1}`, name }))
}

/** Normalizes every entity into AdminRecord[] (objects with an id). */
export const adminMockData: Record<AdminEntityType, AdminRecord[]> = {
  announcements: announcements as unknown as AdminRecord[],
  events: events as unknown as AdminRecord[],
  "mass-timings": massTimings as unknown as AdminRecord[],
  sacraments: sacraments as unknown as AdminRecord[],
  clergy: clergy as unknown as AdminRecord[],
  communities: named(
    ["SCC Communities", "Youth Fellowship", "Family Cell Groups"],
    "com",
  ),
  associations: named(
    ["Legion of Mary", "Choir Association", "St. Vincent de Paul"],
    "assoc",
  ),
  history: historyTimeline.map((h, i) => ({ id: `h${i + 1}`, ...h })),
  chronicle: chronicleIssues as unknown as AdminRecord[],
  outreach: outreach as unknown as AdminRecord[],
}
