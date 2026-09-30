import { ArrowLeft, ExternalLink } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { LoadingState } from "@/components/feedback/loading-state"
import { PageShell } from "@/components/parish/page-shell"
import { Button } from "@/components/ui/button"
import { useChronicleIssue } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"
import { formatDate } from "@/lib/format"

export default function ChronicleDetailPage() {
  const { slug = "" } = useParams()
  const { data: issue, isLoading } = useChronicleIssue(slug)

  useSeo({
    title: issue?.title ?? "Chronicle Issue | Church of Our Lady of Fatima",
    description: issue?.body ?? "Read the latest parish Chronicle issue.",
    canonicalPath: `/events/chronicle/${slug}`,
  })

  if (isLoading) return <LoadingState />

  if (!issue) {
    return (
      <PageShell className="space-y-5 py-14">
        <h1 className="font-heading text-3xl">Chronicle issue not found</h1>
        <Button render={<Link to="/events/chronicle" />}>
          <ArrowLeft className="size-4" /> Back to Chronicle
        </Button>
      </PageShell>
    )
  }

  return (
    <PageShell className="py-12 md:py-16">
      <article className="mx-auto max-w-3xl space-y-8">
        <Button variant="ghost" render={<Link to="/events/chronicle" />}>
          <ArrowLeft className="size-4" /> Back to Chronicle
        </Button>
        <header className="space-y-3">
          <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
            {formatDate(issue.publishDate ?? issue.issueDate, "dd MMM yyyy")}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl">{issue.title}</h1>
        </header>
        {issue.body && (
          <div className="text-foreground/85 whitespace-pre-wrap text-base leading-8">
            {issue.body}
          </div>
        )}
        {issue.link && (
          <Button render={<a href={issue.link} target="_blank" rel="noreferrer" />}>
            Read linked issue <ExternalLink className="size-4" />
          </Button>
        )}
      </article>
    </PageShell>
  )
}