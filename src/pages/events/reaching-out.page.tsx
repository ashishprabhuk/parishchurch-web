import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useOutreach } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function ReachingOutPage() {
  useSeo({
    title: "Reaching Out | St. Mary of Grace Parish",
    description:
      "How our parish serves families and neighborhoods through outreach.",
    canonicalPath: "/events/reaching-out",
  })

  const { data = [] } = useOutreach()

  return (
    <>
      <ParishPageHeader
        title="Reaching Out"
        subtitle="Faith becomes meaningful when it becomes service."
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        {data.map((item) => (
          <article
            key={item.id}
            className="grid gap-5 lg:grid-cols-[1.2fr_1fr]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full min-h-80 w-full rounded-2xl object-cover"
            />
            <div>
              <h2 className="font-heading text-4xl">{item.title}</h2>
              <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed md:text-base">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </PageShell>
    </>
  )
}
