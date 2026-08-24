import { describe, expect, it } from "vitest"

import { formatCompactNumber } from "@/lib/format"

describe("formatCompactNumber", () => {
  it("formats large numbers to compact notation", () => {
    expect(formatCompactNumber(12500)).toMatch(/12(\.|,)5K/i)
  })
})
