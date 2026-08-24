import { CalendarDays, ChevronRight, MapPin, PlayCircle } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import { useI18n } from "@/hooks/use-i18n"

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="bg-walnut text-parchment relative isolate min-h-[calc(100svh-7.25rem)] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=2400&q=88"
        alt="Sunlit historic church interior prepared for worship"
        className="image-cinematic absolute inset-0 h-full w-full scale-105 object-cover motion-safe:animate-[hero-breathe_14s_ease-in-out_infinite_alternate]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(43_33_28/0.91)_0%,rgb(43_33_28/0.72)_42%,rgb(43_33_28/0.25)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(43_33_28/0.62)_0%,transparent_42%)]" />
      <div className="border-brass/40 absolute top-10 right-[9%] hidden h-[54%] w-48 rounded-t-full border-x border-t xl:block" />
      <div className="border-brass/25 absolute top-16 right-[11%] hidden h-[44%] w-40 rounded-t-full border-x border-t xl:block" />

      <div className="relative mx-auto grid min-h-[calc(100svh-7.25rem)] max-w-7xl items-end gap-12 px-4 py-16 sm:px-6 md:items-center lg:grid-cols-[1fr_18rem] lg:px-8 lg:py-20">
        <div className="fade-up max-w-3xl">
          <p className="text-brass text-xs font-semibold tracking-[0.22em] uppercase">
            Welcome to {t("brand.name")}
          </p>
          <div className="ornament-divider text-brass mt-5" aria-hidden="true">
            <span className="font-heading text-lg leading-none">+</span>
          </div>
          <h1 className="font-heading text-parchment mt-5 max-w-2xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            A place to grow in{" "}
            <span className="text-antique-cream italic">faith</span> and
            community.
          </h1>
          <p className="text-parchment/85 mt-6 max-w-xl text-base leading-relaxed md:text-lg">
            Gather in worship, find a place to belong, and walk with a community
            shaped by hope, grace, and service.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              to="/contact#visit"
              className="bg-primary text-primary-foreground hover:bg-church-red/85 h-11 rounded-sm px-5 text-xs tracking-[0.12em] uppercase"
            >
              <MapPin className="size-4" /> Plan Your Visit
            </ButtonLink>
            <ButtonLink
              to="/who-we-are"
              variant="outline"
              className="border-parchment/70 text-parchment hover:bg-parchment hover:text-walnut h-11 rounded-sm bg-transparent px-5 text-xs tracking-[0.12em] uppercase"
            >
              Explore our church <ChevronRight className="size-4" />
            </ButtonLink>
          </div>
        </div>

        <aside className="border-brass/60 bg-walnut/72 text-parchment relative w-full border p-5 shadow-2xl backdrop-blur-sm lg:justify-self-end">
          <p className="text-brass text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
            Next worship
          </p>
          <h2 className="font-heading text-parchment mt-3 text-2xl leading-tight">
            Sunday Eucharist
          </h2>
          <p className="text-parchment/80 mt-2 flex items-center gap-2 text-sm">
            <CalendarDays className="text-brass size-4" /> 10:00 AM
          </p>
          <p className="text-parchment/66 mt-1 text-sm">
            Main sanctuary and online
          </p>
          <ButtonLink
            to="/prayer-liturgy/livestream"
            variant="link"
            className="text-brass hover:text-antique-cream mt-4 h-auto px-0 text-xs tracking-[0.1em] uppercase"
          >
            <PlayCircle className="size-4" /> Watch live
          </ButtonLink>
        </aside>
      </div>
    </section>
  )
}
