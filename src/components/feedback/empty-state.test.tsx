import { screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { EmptyState } from "@/components/feedback/empty-state"
import { renderWithProviders } from "../../../tests/utils/test-utils"

describe("EmptyState", () => {
  it("renders title and action", () => {
    const onAction = vi.fn()

    renderWithProviders(
      <EmptyState
        title="No items"
        description="Create your first item"
        actionLabel="Create"
        onAction={onAction}
      />,
    )

    expect(screen.getByText("No items")).toBeTruthy()
    expect(screen.getByRole("button", { name: "Create" })).toBeTruthy()
  })
})
