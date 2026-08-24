import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useSeo } from "@/hooks/use-seo"

export default function RefundPolicyPage() {
  useSeo({
    title: "Refund Policy | St. Mary of Grace Parish",
    description: "Donation and refund guidance for parish support.",
    canonicalPath: "/refund-policy",
  })

  return (
    <>
      <ParishPageHeader
        title="Refund Policy"
        subtitle="Guidance for donation-related concerns."
        image="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="text-muted-foreground py-14 text-sm">
        <p>
          Please contact the parish office for any donation-related
          clarification or support request.
        </p>
      </PageShell>
    </>
  )
}
