import type { ErrorInfo, ReactNode } from "react"
import { Component } from "react"

import { ErrorState } from "@/components/feedback/error-state"

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled app error", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4">
          <ErrorState
            title="Application error"
            description="The app encountered an unexpected issue. Refresh and try again."
          />
        </div>
      )
    }

    return this.props.children
  }
}
