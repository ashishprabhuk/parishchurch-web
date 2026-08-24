import { Link } from "react-router-dom"
import { ArrowRight, LayoutDashboard } from "lucide-react"

import { APP_CONFIG } from "@/config/app.config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/layout/page-container"

export default function HomePage() {
  return (
    <PageContainer className="py-16">
      <div className="mx-auto max-w-4xl space-y-10 text-center">
        <div className="space-y-4">
          <p className="border-border bg-card text-muted-foreground inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
            Reusable Starter Foundation
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            {APP_CONFIG.name}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-balance md:text-lg">
            A production-ready React + Vite architecture with modern UI, strict
            typing, feature-first organization, and practical defaults.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" render={<Link to="/dashboard" />}>
            Open Starter Dashboard
            <ArrowRight className="ml-2 size-4" />
          </Button>
          <Button variant="outline" size="lg" render={<Link to="/login" />}>
            Auth Screens
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glass-panel text-left">
            <CardHeader>
              <CardTitle className="text-base">
                Feature-first architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Keep domain logic inside features while sharing only what is
              reusable.
            </CardContent>
          </Card>
          <Card className="glass-panel text-left">
            <CardHeader>
              <CardTitle className="text-base">Scales cleanly</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Routing, providers, API, forms, and state are structured for large
              projects.
            </CardContent>
          </Card>
          <Card className="glass-panel text-left">
            <CardHeader>
              <CardTitle className="text-base">Developer-friendly</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              TypeScript strict mode, tests, linting, and consistent UI
              primitives by default.
            </CardContent>
          </Card>
        </div>

        <div className="border-border bg-card text-muted-foreground mx-auto inline-flex items-center rounded-lg border px-3 py-2 text-sm">
          <LayoutDashboard className="mr-2 size-4" />
          Visit dashboard to see chart, table, dialogs, form, loading, empty,
          and toast patterns.
        </div>
      </div>
    </PageContainer>
  )
}
