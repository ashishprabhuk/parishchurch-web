import { Link } from "react-router-dom"
import { CalendarDays, Clock3, Home, Mail, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/layout/page-container"
import { Card, CardContent } from "@/components/ui/card"
import { useSeo } from "@/hooks/use-seo"

export default function NotFoundPage() {
  useSeo({
    title: "Page Not Found | Church of Our Lady of Fatima, Chulne",
    description: "The page you requested could not be found on the official website of the Church of Our Lady of Fatima, Chulne.",
    canonicalPath: "/404",
    noindex: true,
  })

  return (
    <PageContainer className="grid min-h-[70vh] place-items-center py-16">
      <div className="mx-auto max-w-xl space-y-6 text-center">
        <div>
          <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            404 — Page Not Found
          </p>
          <h1 className="font-heading text-walnut mt-2 text-3xl font-semibold sm:text-4xl">
            Looking for something in Chulne?
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            The page you requested might have been moved or renamed. Explore our main sections below to find Mass timings, parish events, or contact information.
          </p>
        </div>

        <Card className="border-border/70 text-left">
          <CardContent className="grid gap-3 p-5 sm:grid-cols-2 text-xs">
            <Link
              to="/"
              className="hover:bg-muted flex items-center gap-2.5 rounded-md p-2.5 transition-colors font-medium"
            >
              <Home className="text-primary size-4" /> Home Page
            </Link>
            <Link
              to="/chulne"
              className="hover:bg-muted flex items-center gap-2.5 rounded-md p-2.5 transition-colors font-medium"
            >
              <MapPin className="text-primary size-4" /> Chulne Location
            </Link>
            <Link
              to="/prayer-liturgy/mass-schedule"
              className="hover:bg-muted flex items-center gap-2.5 rounded-md p-2.5 transition-colors font-medium"
            >
              <Clock3 className="text-primary size-4" /> Mass Timings
            </Link>
            <Link
              to="/events"
              className="hover:bg-muted flex items-center gap-2.5 rounded-md p-2.5 transition-colors font-medium"
            >
              <CalendarDays className="text-primary size-4" /> Parish Events
            </Link>
            <Link
              to="/contact"
              className="hover:bg-muted flex items-center gap-2.5 rounded-md p-2.5 transition-colors font-medium sm:col-span-2"
            >
              <Mail className="text-primary size-4" /> Contact & Office Hours
            </Link>
          </CardContent>
        </Card>

        <div>
          <Button render={<Link to="/" />}>Return to Home Page</Button>
        </div>
      </div>
    </PageContainer>
  )
}
