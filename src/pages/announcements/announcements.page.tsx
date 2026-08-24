import { AnnouncementCard } from "@/components/parish/announcement-card"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useAnnouncements } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function AnnouncementsPage() {
  useSeo({
    title: "Announcements | St. Mary of Grace Parish",
    description: "Latest notices, celebrations, and updates from the parish.",
    canonicalPath: "/announcements",
  })

  const { data = [] } = useAnnouncements()

  return (
    <>
      <ParishPageHeader
        title="Announcements"
        subtitle="Latest from our parish community."
        image="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {data.map((item, idx) => (
            <AnnouncementCard key={item.id} item={item} featured={idx === 0} />
          ))}
        </div>
      </PageShell>
    </>
  )
}
