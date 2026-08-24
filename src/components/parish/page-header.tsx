import { PageShell } from "@/components/parish/page-shell"

export function ParishPageHeader({
  title,
  subtitle,
  image,
}: {
  title: string
  subtitle?: string
  image: string
}) {
  return (
    <section className="relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/35" />
      <PageShell className="text-ivory-100 relative py-20">
        <h1 className="font-heading text-4xl md:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="text-ivory-100/85 mt-3 max-w-2xl text-sm md:text-base">
            {subtitle}
          </p>
        ) : null}
      </PageShell>
    </section>
  )
}
