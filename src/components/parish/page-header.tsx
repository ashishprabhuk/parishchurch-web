import { PageShell } from "@/components/parish/page-shell"

export function ParishPageHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
  image?: string
}) {
  const image =
    "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1700&q=80"

  return (
    <section className="relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-walnut/80 via-walnut/60 to-walnut/45" />
      <PageShell className="text-parchment relative py-20">
        <h1 className="font-heading text-parchment text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-parchment/90 mt-3 max-w-2xl text-sm md:text-base">
            {subtitle}
          </p>
        ) : null}
      </PageShell>
    </section>
  )
}
