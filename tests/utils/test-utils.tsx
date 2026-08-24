import type { PropsWithChildren } from "react"
import { render } from "@testing-library/react"

import { AppProviders } from "@/app/providers/app-providers"

function Wrapper({ children }: PropsWithChildren) {
  return <AppProviders>{children}</AppProviders>
}

export function renderWithProviders(ui: React.ReactElement) {
  return render(ui, { wrapper: Wrapper })
}
