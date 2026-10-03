import {
  CalendarDays,
  Clock3,
  Compass,
  ExternalLink,
} from "lucide-react"

import { ContactInfo } from "@/components/parish/contact-info"
import { MapEmbed } from "@/components/parish/map-embed"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { SectionHeading } from "@/components/parish/section-heading"
import { ButtonLink } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSeo } from "@/hooks/use-seo"
import { PARISH_ENTITY } from "@/lib/seo/meta"

export default function ChulneLocationPage() {
  useSeo({
    title: "Church of Our Lady of Fatima, Chulne | Location & Contact",
    description:
      "Find location details, directions, contact information, office hours, and Mass timings for the Church of Our Lady of Fatima in Chulne (Chulna), Vasai West.",
    canonicalPath: "/chulne",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Chulne Location", item: "/chulne" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": PARISH_ENTITY.officialName,
      "alternateName": PARISH_ENTITY.alternateNames,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": PARISH_ENTITY.addressStreet,
        "addressLocality": PARISH_ENTITY.locality,
        "addressRegion": PARISH_ENTITY.region,
        "postalCode": PARISH_ENTITY.postalCode,
        "addressCountry": PARISH_ENTITY.country,
      },
    },
  })

  return (
    <>
      <ParishPageHeader
        title="Church of Our Lady of Fatima, Chulne"
        subtitle="Serving the faithful community in Chulne and Vasai West"
        image="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div>
              <SectionHeading
                eyebrow="Local Entity & Community"
                title="Located in Chulne (Chulna), Vasai West"
                description="Our Lady of Fatima Church is an established Catholic parish serving families, youth, and elders across Chulne and neighboring localities in Vasai West."
              />
              <div className="prose text-muted-foreground space-y-4 text-sm leading-relaxed">
                <p>
                  The <strong className="text-foreground">Church of Our Lady of Fatima, Chulne</strong> (also locally referred to as <em>Chulna Fatima Church</em>) stands as a focal point of prayer, liturgical life, and Christian service. Rooted in the Diocese of Vasai, the parish provides daily Mass, sacramental instruction, Small Christian Communities (SCCs), and charitable outreach.
                </p>
                <p>
                  Whether you are seeking Sunday Mass timings, planning a sacramental celebration, or visiting the church in Chulne / Vasai West, our parish doors and pastoral team are open to welcome you.
                </p>
              </div>
            </div>

            <Card className="border-border/70 bg-card/85">
              <CardContent className="space-y-5 p-6">
                <h3 className="font-heading text-walnut text-2xl">
                  Official Parish Address & Contacts
                </h3>
                <ContactInfo />
                <div className="pt-2">
                  <a
                    href={PARISH_ENTITY.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Open in Google Maps <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-heading text-walnut text-2xl">
                Quick Navigation for Visitors
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-border/60">
                  <CardContent className="space-y-2 p-5">
                    <div className="text-primary flex items-center gap-2 font-semibold">
                      <Clock3 className="size-4" /> Mass Schedule
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      View daily, Sunday, and feast day Holy Mass timings in Marathi, English, and Tamil.
                    </p>
                    <ButtonLink
                      to="/prayer-liturgy/mass-schedule"
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs"
                    >
                      View Mass Timings
                    </ButtonLink>
                  </CardContent>
                </Card>

                <Card className="border-border/60">
                  <CardContent className="space-y-2 p-5">
                    <div className="text-primary flex items-center gap-2 font-semibold">
                      <CalendarDays className="size-4" /> Parish Events
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Stay updated with feast day novenas, youth retreats, and parish council activities.
                    </p>
                    <ButtonLink
                      to="/events"
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs"
                    >
                      Explore Events
                    </ButtonLink>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-border/70 overflow-hidden">
              <CardContent className="space-y-4 p-6">
                <h3 className="font-heading text-walnut flex items-center gap-2 text-xl">
                  <Compass className="text-primary size-5" /> Interactive Map & Directions
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Located along Chulne Road, easily accessible from Vasai West railway station and nearby bus routes.
                </p>
                <MapEmbed />
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-muted/40">
              <CardContent className="space-y-3 p-6 text-xs text-muted-foreground leading-relaxed">
                <h4 className="font-heading text-walnut text-base font-semibold">
                  Serving Local Neighborhoods
                </h4>
                <p>
                  Our parish actively serves the surrounding communities of Chulne, Chulna, and broader Vasai West in the State of Maharashtra, India.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageShell>
    </>
  )
}
