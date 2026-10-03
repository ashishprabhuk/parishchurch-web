import { PageShell } from "@/components/parish/page-shell"

export function ParishPageHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
  image?: string
}) {
  const image = "/assets/gallery images/banner-image.jpeg"
  const subtitleWords = subtitle?.trim().split(/\s+/) ?? []
  const subtitleFirstLine = subtitleWords.slice(0, 5).join(" ")
  const subtitleRemaining = subtitleWords.slice(5).join(" ")

  return (
    <section className="relative overflow-hidden">
      <img
        src={image}
        alt="Our Lady of Fatima statue at the parish"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-walnut/80 via-walnut/60 to-walnut/45" />
      <PageShell className="text-parchment relative py-20">
        <h1 className="font-heading text-parchment text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-parchment/90 mt-3 max-w-md text-sm leading-relaxed md:text-base">
            <span className="block">{subtitleFirstLine}</span>
            {subtitleRemaining ? (
              <span className="block">{subtitleRemaining}</span>
            ) : null}
          </p>
        ) : null}
      </PageShell>
    </section>
  )
}
