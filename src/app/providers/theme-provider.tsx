import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { PropsWithChildren } from "react"

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      forcedTheme="light"
      disableTransitionOnChange
      storageKey="starter-theme"
    >
      {children}
    </NextThemesProvider>
  )
}
