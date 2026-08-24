import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useSeo } from "@/hooks/use-seo"

export default function PrivacyPage() {
  useSeo({
    title: "Privacy Policy | St. Mary of Grace Parish",
    description: "How parish website data is used and protected.",
    canonicalPath: "/privacy",
  })

  return (
    <>
      <ParishPageHeader
        title="Privacy Policy"
        subtitle="How we handle your information."
        image="https://images.unsplash.com/photo-1518156677180-95a2893f3499?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="text-muted-foreground py-14 text-sm">
        <p>
          We collect only necessary information to respond to parish inquiries
          and requests.
        </p>
      </PageShell>
    </>
  )
}
