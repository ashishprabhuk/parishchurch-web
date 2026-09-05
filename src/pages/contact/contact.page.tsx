import { MessageSquareHeart } from "lucide-react"

import { ContactInfo } from "@/components/parish/contact-info"
import { FeedbackForm } from "@/components/parish/feedback-form"
import { MapEmbed } from "@/components/parish/map-embed"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { SectionHeading } from "@/components/parish/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { useSeo } from "@/hooks/use-seo"

export default function ContactPage() {
  useSeo({
    title: "Contact | St. Mary of Grace Parish",
    description: "Parish office details, map, and contact form.",
    canonicalPath: "/contact",
  })

  return (
    <>
      <ParishPageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you."
        image="https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="grid gap-7 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Visit, call, or write to us"
              description="Parish office and pastoral team are here to help."
            />
            <ContactInfo />
            <div className="mt-6">
              <MapEmbed />
            </div>
          </div>
          <Card className="border-border/70 bg-card/85" id="feedback">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6">
                <p className="text-brass flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase">
                  <MessageSquareHeart className="size-4" /> Feedback
                </p>
                <h2 className="font-heading text-walnut mt-2 text-3xl leading-tight">
                  Share your thoughts
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Prayer requests, suggestions, or a word of thanks — every
                  message is read with care.
                </p>
              </div>
              <FeedbackForm />
            </CardContent>
          </Card>
        </div>
      </PageShell>
    </>
  )
}
