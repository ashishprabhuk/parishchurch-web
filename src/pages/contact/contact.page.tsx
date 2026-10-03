import { ContactInfo } from "@/components/parish/contact-info"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { SectionHeading } from "@/components/parish/section-heading"
import { useSeo } from "@/hooks/use-seo"

export default function ContactPage() {
  useSeo({
    title: "Contact & Location | Church of Our Lady of Fatima, Chulne",
    description:
      "Contact details, parish office hours, phone numbers, email, and Google map location for Church of Our Lady of Fatima in Chulne (Chulna), Vasai West.",
    canonicalPath: "/contact",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Contact Us", item: "/contact" },
    ],
  })

  return (
    <>
      <ParishPageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you."
        image="https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="mx-auto max-w-xl text-center">
            <SectionHeading
              eyebrow="Contact"
              title="Visit, call, or write to us"
              description="Parish office and pastoral team are here to help."
            />
            <div className="mt-8 text-left">
              <ContactInfo />
            </div>
        </div>
      </PageShell>
    </>
  )
}
