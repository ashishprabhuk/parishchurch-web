import type { PropsWithChildren } from "react"

import { ThemeProvider } from "@/app/providers/theme-provider"
import { QueryProvider } from "@/app/providers/query-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <TooltipProvider delay={120}>
          {children}
          <Toaster richColors position="top-right" />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
