import { DonationBanner } from "@/components/parish/donation-banner"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { useSeo } from "@/hooks/use-seo"

export default function DonatePage() {
  useSeo({
    title: "Donate | St. Mary of Grace Parish",
    description: "Support liturgy, social outreach, and pastoral initiatives.",
    canonicalPath: "/donate",
  })

  return (
    <>
      <ParishPageHeader
        title="Donate"
        subtitle="Support the mission of our parish community."
        image="https://images.unsplash.com/photo-1509099863731-ef4bff19e808?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <DonationBanner />
        <Card className="border-border/70 bg-card/85 mt-8">
          <CardContent className="text-muted-foreground p-6 text-sm">
            Secure donation gateway integration will be connected to this page
            in the backend phase.
          </CardContent>
        </Card>
      </PageShell>
    </>
  )
}
