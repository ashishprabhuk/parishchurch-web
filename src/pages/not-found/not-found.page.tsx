import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/layout/page-container"

export default function NotFoundPage() {
  return (
    <PageContainer className="grid min-h-screen place-items-center py-20">
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground text-sm font-medium tracking-[0.16em] uppercase">
          404
        </p>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground">
          The page you requested does not exist.
        </p>
        <Button render={<Link to="/" />}>Back home</Button>
      </div>
    </PageContainer>
  )
}
