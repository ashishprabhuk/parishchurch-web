import { isRouteErrorResponse, useRouteError } from "react-router-dom"

import { ErrorState } from "@/components/feedback/error-state"

export default function RouteErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorState
        title={`Error ${error.status}`}
        description={error.statusText || "Something went wrong."}
      />
    )
  }

  return (
    <ErrorState
      title="Unexpected route error"
      description="An unknown routing error occurred."
    />
  )
}
