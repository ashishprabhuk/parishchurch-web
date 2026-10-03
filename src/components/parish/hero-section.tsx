import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    image: "/assets/fatima_mata.JPG",
    alt: "Sunlit historic church interior prepared for worship",
  },
  {
    image: "/assets/church_altar_new.JPG",
    alt: "Decorated church altar prepared for celebration",
  },
]

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length)
    }, 7000)

    return () => window.clearInterval(interval)
  }, [isPaused])

  const showPreviousSlide = () => {
    setActiveSlide(
      (currentSlide) =>
        (currentSlide - 1 + heroSlides.length) % heroSlides.length,
    )
  }

  const showNextSlide = () => {
    setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length)
  }

  return (
    <section
      className="bg-walnut text-parchment relative isolate min-h-[calc(100svh-7.25rem)] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Church highlights"
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false)
        }
      }}
    >
      {heroSlides.map((slide, index) => (
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          aria-hidden={index !== activeSlide}
          className={`image-cinematic absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-1000 motion-safe:animate-[hero-breathe_14s_ease-in-out_infinite_alternate] ${index === 1 ? "object-top" : "object-center"} ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {/* <div className="absolute inset-0 " />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(11_21_84/0.65)_0%,transparent_42%)]" />
      <div className="border-brass/40 absolute top-10 right-[9%] hidden h-[54%] w-48 rounded-t-full border-x border-t xl:block" />
      <div className="border-brass/25 absolute top-16 right-[11%] hidden h-[44%] w-40 rounded-t-full border-x border-t xl:block" /> */}

      <div className="relative mx-auto grid min-h-[calc(100svh-7.25rem)] max-w-7xl items-end gap-12 px-4 py-16 sm:px-6 md:items-center lg:grid-cols-[1fr_18rem] lg:px-8 lg:py-20">
        {/* <div className="fade-up max-w-3xl">
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
        </div> */}

        {/* <aside className="border-brass/60 bg-walnut/72 text-parchment relative w-full border p-5 shadow-2xl backdrop-blur-sm lg:justify-self-end">
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
        </aside> */}
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        <button
          type="button"
          onClick={showPreviousSlide}
          className="border-parchment/60 bg-walnut/45 text-parchment hover:bg-walnut/75 grid size-9 place-items-center rounded-full border backdrop-blur-sm"
          aria-label="Previous hero image"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex items-center gap-2 px-2" role="tablist" aria-label="Hero images">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              role="tab"
              aria-selected={index === activeSlide}
              aria-label={`Show hero image ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all ${index === activeSlide ? "bg-brass w-8" : "bg-parchment/60 w-1.5"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={showNextSlide}
          className="border-parchment/60 bg-walnut/45 text-parchment hover:bg-walnut/75 grid size-9 place-items-center rounded-full border backdrop-blur-sm"
          aria-label="Next hero image"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  )
}
