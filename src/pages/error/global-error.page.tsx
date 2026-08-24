import { isRouteErrorResponse, useRouteError } from "react-router-dom"

import { ErrorState } from "@/components/feedback/error-state"
import { PageContainer } from "@/components/layout/page-container"

export default function GlobalErrorPage() {
  const error = useRouteError()

  const description = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "A route-level error occurred."

  return (
    <PageContainer className="py-16">
      <ErrorState title="Route error" description={description} />
    </PageContainer>
  )
}
