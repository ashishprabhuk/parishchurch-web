import { Link, useParams } from "react-router-dom"

import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { Button } from "@/components/ui/button"
import { sacraments as staticSacraments } from "@/features/parish/data/mock-parish.data"
import { useSacraments } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function SacramentDetailPage() {
  const { slug } = useParams()
  const { data = [] } = useSacraments()
  const apiSacrament = data.find(
    (item) => item.name.toLowerCase().replaceAll(" ", "-") === slug,
  )
  const staticSacrament = staticSacraments.find(
    (item) => item.name.toLowerCase().replaceAll(" ", "-") === slug,
  )
  const sacrament = staticSacrament
    ? {
        ...staticSacrament,
        ...apiSacrament,
        image: apiSacrament?.image ?? staticSacrament.image,
        pdfUrl: apiSacrament?.pdfUrl ?? staticSacrament.pdfUrl,
        sections: apiSacrament?.sections ?? staticSacrament.sections,
        generalRules: apiSacrament?.generalRules ?? staticSacrament.generalRules,
      }
    : apiSacrament

  useSeo({
    title: sacrament
      ? `${sacrament.name} | Church of Our Lady of Fatima`
      : "Sacrament | Church of Our Lady of Fatima",
    description: sacrament?.description ?? "Explore the sacraments of the Church.",
    canonicalPath: `/prayer-liturgy/sacraments/${slug ?? ""}`,
  })

  if (!sacrament) {
    return (
      <PageShell className="py-20">
        <h1 className="font-heading text-walnut text-4xl">Sacrament not found</h1>
        <Button render={<Link to="/prayer-liturgy/sacraments" />} className="mt-6">
          Back to Sacraments
        </Button>
      </PageShell>
    )
  }

  return (
    <>
      <ParishPageHeader title={sacrament.name} subtitle={sacrament.description} image="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1700&q=80" />
      <PageShell className="py-14">
        <article className="mx-auto max-w-3xl space-y-10">
          <Button render={<Link to="/prayer-liturgy/sacraments" />} variant="outline">
            Back to Sacraments
          </Button>
          {sacrament.sections.map((section, sectionIndex) => (
            <section key={`${section.title ?? "section"}-${sectionIndex}`}>
              {section.title ? <h2 className="font-heading text-primary mb-4 text-3xl">{section.title}</h2> : null}
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.items?.length ? <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5">{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              {sectionIndex === 0 && sacrament.generalRules.length ? (
                <section className="mt-10">
                  <h2 className="font-heading text-primary mb-4 text-3xl">General rules for all seven sacraments</h2>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">{sacrament.generalRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
                </section>
              ) : null}
            </section>
          ))}
          {sacrament.pdfUrl ? (
            <a
              href={sacrament.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:text-brass inline-flex font-medium underline underline-offset-4 transition-colors"
            >
              View {sacrament.name} PDF
            </a>
          ) : null}
        </article>
      </PageShell>
    </>
  )
}