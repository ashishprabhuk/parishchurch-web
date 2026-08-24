import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { useAppStore } from "@/stores/app.store"

describe("app store", () => {
  it("toggles sidebar collapsed state", () => {
    const { result } = renderHook(() => useAppStore())

    act(() => {
      result.current.toggleSidebarCollapsed()
    })

    expect(result.current.sidebarCollapsed).toBe(true)
  })
})
