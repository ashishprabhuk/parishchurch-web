import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useSeo } from "@/hooks/use-seo"

export default function TermsPage() {
  useSeo({
    title: "Terms | St. Mary of Grace Parish",
    description: "Terms of use for parish website and services.",
    canonicalPath: "/terms",
  })

  return (
    <>
      <ParishPageHeader
        title="Terms"
        subtitle="Website terms and conditions."
        image="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="text-muted-foreground py-14 text-sm">
        <p>
          By using this website, you agree to our parish website terms and
          community standards.
        </p>
      </PageShell>
    </>
  )
}
