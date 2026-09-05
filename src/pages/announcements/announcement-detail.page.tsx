import { Link as LinkIcon, MessageCircle, Share2 } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { AnnouncementCard } from "@/components/parish/announcement-card"
import { PageShell } from "@/components/parish/page-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAnnouncement, useAnnouncements } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"
import { formatDate } from "@/lib/format"
import { notify } from "@/lib/toast"

export default function AnnouncementDetailPage() {
  const { slug = "" } = useParams()
  const { data: item } = useAnnouncement(slug)
  const { data: all = [] } = useAnnouncements()

  useSeo({
    title: item
      ? `${item.title} | St. Mary of Grace Parish`
      : "Announcement | St. Mary of Grace Parish",
    description: item?.excerpt ?? "Parish announcement details.",
    canonicalPath: `/announcements/${slug}`,
    ogImage: item?.image,
  })

  if (!item) {
    return (
      <PageShell className="py-20">
        <p>Announcement not found.</p>
      </PageShell>
    )
  }

  const related = all.filter((entry) => entry.slug !== item.slug).slice(0, 2)
  const paragraphs = Array.isArray(item.content) ? item.content : []

  return (
    <PageShell className="py-12">
      <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
        <Link to="/announcements">Announcements</Link>
      </p>
      <article className="mx-auto mt-4 max-w-4xl">
        <p className="text-accent text-xs tracking-[0.14em] uppercase">
          {item.category}
        </p>
        <h1 className="font-heading mt-3 text-4xl leading-tight md:text-5xl">
          {item.title}
        </h1>
        <p className="text-muted-foreground mt-3 text-sm">
          {formatDate(item.date, "dd MMMM yyyy")}
        </p>
        <img
          src={item.image}
          alt={item.title}
          className="mt-6 h-[420px] w-full rounded-2xl object-cover"
        />
        <div className="prose prose-neutral text-foreground mt-8 max-w-none">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-muted-foreground mb-4 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              notify.success("Link copied")
            }}
          >
            <LinkIcon className="mr-2 size-4" /> Copy Link
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 size-4" /> Share
          </Button>
          <Button variant="outline">
            <MessageCircle className="mr-2 size-4" /> Share with Parish Group
          </Button>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-heading mb-4 text-3xl">Related announcements</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((entry) => (
              <AnnouncementCard key={entry.id} item={entry} />
            ))}
          </div>
        </section>
      ) : null}

      <Card className="border-border/70 bg-card/80 mt-12">
        <CardContent className="p-6">
          <p className="text-muted-foreground text-sm">
            Need help or clarification? Reach us via the contact form.
          </p>
          <Button render={<Link to="/contact" />} className="mt-4">
            Contact Parish Office
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  )
}
