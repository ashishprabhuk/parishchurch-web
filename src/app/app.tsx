import { AppProviders } from "@/app/providers/app-providers"
import { AppRouter } from "@/app/router"
import { ErrorBoundary } from "@/components/feedback/error-boundary"
import "@/lib/api/interceptors"

export function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  )
}
