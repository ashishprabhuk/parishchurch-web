import { describe, expect, it } from "vitest"

import {
  calculateMassStatus,
  formatChurchDateTime,
  formatCountdown,
  fromChurchDateTimeInput,
  parseServerDate,
  selectActiveAndUpcomingMass,
  toChurchDateTimeInput,
} from "./live-mass"
import type { LiveMassRecord } from "@/features/parish/types"

describe("calculateMassStatus", () => {
  const baseRecord = {
    startsAt: "2026-10-17T10:00:00.000Z",
    endsAt: "2026-10-17T11:00:00.000Z",
    durationMinutes: 60,
    status: "SCHEDULED",
    live: false,
    isCancelled: false,
  }

  it("returns CANCELLED if isCancelled is true", () => {
    const status = calculateMassStatus(
      { ...baseRecord, isCancelled: true },
      new Date("2026-10-17T10:30:00.000Z"),
    )
    expect(status).toBe("CANCELLED")
  })

  it("returns CANCELLED if status is CANCELLED", () => {
    const status = calculateMassStatus(
      { ...baseRecord, status: "CANCELLED" },
      new Date("2026-10-17T10:30:00.000Z"),
    )
    expect(status).toBe("CANCELLED")
  })

  it("returns UPCOMING when current time is before startsAt", () => {
    const status = calculateMassStatus(
      baseRecord,
      new Date("2026-10-17T09:59:59.000Z"),
    )
    expect(status).toBe("UPCOMING")
  })

  it("returns LIVE when current time is within the scheduled window", () => {
    const status = calculateMassStatus(
      baseRecord,
      new Date("2026-10-17T10:00:00.000Z"),
    )
    expect(status).toBe("LIVE")

    const midStatus = calculateMassStatus(
      baseRecord,
      new Date("2026-10-17T10:30:00.000Z"),
    )
    expect(midStatus).toBe("LIVE")
  })

  it("returns COMPLETED when current time is at or past endsAt", () => {
    const status = calculateMassStatus(
      baseRecord,
      new Date("2026-10-17T11:00:00.000Z"),
    )
    expect(status).toBe("COMPLETED")

    const afterStatus = calculateMassStatus(
      baseRecord,
      new Date("2026-10-17T11:05:00.000Z"),
    )
    expect(afterStatus).toBe("COMPLETED")
  })

  it("returns COMPLETED when status is ENDED", () => {
    const status = calculateMassStatus(
      { ...baseRecord, status: "ENDED" },
      new Date("2026-10-17T10:30:00.000Z"),
    )
    expect(status).toBe("COMPLETED")
  })

  it("calculates endsAt from durationMinutes if endsAt is missing", () => {
    const recordWithoutEndsAt = {
      startsAt: "2026-10-17T10:00:00.000Z",
      durationMinutes: 45,
      isCancelled: false,
    }

    expect(
      calculateMassStatus(
        recordWithoutEndsAt,
        new Date("2026-10-17T10:30:00.000Z"),
      ),
    ).toBe("LIVE")

    expect(
      calculateMassStatus(
        recordWithoutEndsAt,
        new Date("2026-10-17T10:46:00.000Z"),
      ),
    ).toBe("COMPLETED")
  })
})

describe("selectActiveAndUpcomingMass", () => {
  const now = new Date("2026-10-17T10:30:00.000Z")

  const masses: LiveMassRecord[] = [
    {
      id: "1",
      title: "Active Mass",
      youtubeUrl: "https://www.youtube.com/watch?v=ABC123XYZ00",
      youtubeVideoId: "ABC123XYZ00",
      startsAt: "2026-10-17T10:00:00.000Z",
      endsAt: "2026-10-17T11:00:00.000Z",
      durationMinutes: 60,
      status: "SCHEDULED",
      computedStatus: "LIVE",
      live: false,
      isCancelled: false,
    },
    {
      id: "2",
      title: "Upcoming Mass",
      youtubeUrl: "https://www.youtube.com/watch?v=DEF456UVW11",
      youtubeVideoId: "DEF456UVW11",
      startsAt: "2026-10-17T14:00:00.000Z",
      endsAt: "2026-10-17T15:00:00.000Z",
      durationMinutes: 60,
      status: "SCHEDULED",
      computedStatus: "UPCOMING",
      live: false,
      isCancelled: false,
    },
    {
      id: "3",
      title: "Cancelled Mass",
      youtubeUrl: "https://www.youtube.com/watch?v=GHI789RST22",
      youtubeVideoId: "GHI789RST22",
      startsAt: "2026-10-17T10:15:00.000Z",
      endsAt: "2026-10-17T11:15:00.000Z",
      durationMinutes: 60,
      status: "CANCELLED",
      computedStatus: "CANCELLED",
      live: false,
      isCancelled: true,
    },
    {
      id: "4",
      title: "Expired Mass",
      youtubeUrl: "https://www.youtube.com/watch?v=JKL012OPQ33",
      youtubeVideoId: "JKL012OPQ33",
      startsAt: "2026-10-17T08:00:00.000Z",
      endsAt: "2026-10-17T09:00:00.000Z",
      durationMinutes: 60,
      status: "ENDED",
      computedStatus: "COMPLETED",
      live: false,
      isCancelled: false,
    },
  ]

  it("selects active mass and next upcoming mass correctly", () => {
    const { activeMass, upcomingMass } = selectActiveAndUpcomingMass(masses, now)
    expect(activeMass?.id).toBe("1")
    expect(upcomingMass?.id).toBe("2")
  })

  it("does not select cancelled or completed mass as active", () => {
    const pastTime = new Date("2026-10-17T11:30:00.000Z")
    const { activeMass, upcomingMass } = selectActiveAndUpcomingMass(
      masses,
      pastTime,
    )
    expect(activeMass).toBeNull()
    expect(upcomingMass?.id).toBe("2")
  })
})

describe("parseServerDate", () => {
  it("treats ISO timestamps without Z as UTC", () => {
    const date = parseServerDate("2026-10-17T10:00:00")
    expect(date?.toISOString()).toBe("2026-10-17T10:00:00.000Z")
  })

  it("preserves timestamps with explicit Z", () => {
    const date = parseServerDate("2026-10-17T10:00:00.000Z")
    expect(date?.toISOString()).toBe("2026-10-17T10:00:00.000Z")
  })
})

describe("formatChurchDateTime", () => {
  it("formats time in Asia/Kolkata (IST)", () => {
    // 10:00 UTC = 15:30 IST (+5:30)
    const formatted = formatChurchDateTime("2026-10-17T10:00:00.000Z")
    expect(formatted).toContain("IST")
    expect(formatted).toContain("17")
    expect(formatted).toContain("Oct")
  })
})

describe("church timezone datetime-local conversions", () => {
  it("converts UTC ISO to church local datetime input string", () => {
    // 01:00 UTC = 06:30 IST
    const input = toChurchDateTimeInput("2026-10-17T01:00:00.000Z")
    expect(input).toBe("2026-10-17T06:30")
  })

  it("converts church local datetime input string back to UTC ISO", () => {
    // 06:30 IST = 01:00 UTC
    const utcIso = fromChurchDateTimeInput("2026-10-17T06:30")
    expect(utcIso).toBe("2026-10-17T01:00:00.000Z")
  })
})

describe("formatCountdown", () => {
  it("formats hours and minutes", () => {
    const now = new Date("2026-10-17T10:00:00.000Z")
    const target = new Date("2026-10-17T12:15:00.000Z")
    expect(formatCountdown(target, now)).toBe("Starts in 2h 15m")
  })

  it("returns Starting now if target is past or current", () => {
    const now = new Date("2026-10-17T10:00:00.000Z")
    expect(formatCountdown(now, now)).toBe("Starting now")
  })
})
