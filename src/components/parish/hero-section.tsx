import { CalendarDays, MapPin, Users, ChevronRight, PlayCircle, Church } from "lucide-react"
import { Link } from "react-router-dom"
import { ButtonLink } from "@/components/ui/button"

export function WorshipInfoItem() {
  return (
    <Link
      to="/prayer-liturgy/mass-schedule"
      className="group flex items-center justify-between gap-4 p-4 lg:p-5 rounded-2xl transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E7B63F]"
      aria-label="Sunday Worship service times"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-[#E7B63F] shadow-inner transition-transform duration-200 group-hover:scale-105">
          <CalendarDays className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-bold tracking-[0.16em] text-white uppercase">
            SUNDAY WORSHIP
          </p>
          <p className="mt-0.5 text-xs lg:text-sm font-medium text-white/80 group-hover:text-amber-100 transition-colors truncate">
            8:00 AM, 10:00 AM & 6:00 PM
          </p>
        </div>
      </div>
      <ChevronRight className="size-4 text-[#E7B63F] group-hover:translate-x-1 transition-transform shrink-0" />
    </Link>
  )
}

export function VisitChurchItem() {
  return (
    <Link
      to="/contact#visit"
      className="group flex items-center justify-between gap-4 p-4 lg:p-5 rounded-2xl transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E7B63F]"
      aria-label="Plan a visit to Our Lady of Fatima Church"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-[#E7B63F] shadow-inner transition-transform duration-200 group-hover:scale-105">
          <MapPin className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-bold tracking-[0.16em] text-white uppercase">
            VISIT OUR CHURCH
          </p>
          <p className="mt-0.5 text-xs lg:text-sm font-medium text-white/80 group-hover:text-white transition-colors truncate">
            Get directions & details
          </p>
        </div>
      </div>
      <ChevronRight className="size-4 text-[#E7B63F] group-hover:translate-x-1 transition-transform shrink-0" />
    </Link>
  )
}

export function CommunityItem() {
  return (
    <Link
      to="/who-we-are/communities"
      className="group flex items-center justify-between gap-4 p-4 lg:p-5 rounded-2xl transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E7B63F]"
      aria-label="Be part of our parish community"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-[#E7B63F] shadow-inner transition-transform duration-200 group-hover:scale-105">
          <Users className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-bold tracking-[0.16em] text-white uppercase">
            BE PART OF OUR COMMUNITY
          </p>
          <p className="mt-0.5 text-xs lg:text-sm font-medium text-white/80 group-hover:text-white transition-colors truncate">
            Faith &nbsp;|&nbsp; Fellowship &nbsp;|&nbsp; Service
          </p>
        </div>
      </div>
      <ChevronRight className="size-4 text-[#E7B63F] group-hover:translate-x-1 transition-transform shrink-0" />
    </Link>
  )
}

export function BottomGlassBar() {
  return (
    <div className="w-full">
      {/* Desktop / Tablet Horizontal Bar */}
      <div className="hidden md:block w-full max-w-[1380px] mx-auto liquid-glass-bottom-bar p-2 transition-all duration-300 hover:-translate-y-0.5">
        <div className="grid grid-cols-3 divide-x divide-white/20 items-center">
          <WorshipInfoItem />
          <VisitChurchItem />
          <CommunityItem />
        </div>
      </div>

      {/* Mobile Stacked Glass Cards */}
      <div className="block md:hidden w-full space-y-2.5">
        <div className="liquid-glass-mobile-card transition-transform duration-200 active:scale-[0.99]">
          <WorshipInfoItem />
        </div>
        <div className="liquid-glass-mobile-card transition-transform duration-200 active:scale-[0.99]">
          <VisitChurchItem />
        </div>
        <div className="liquid-glass-mobile-card transition-transform duration-200 active:scale-[0.99]">
          <CommunityItem />
        </div>
      </div>
    </div>
  )
}

export function PrimaryHeroCard() {
  return (
    <div className="fade-up liquid-glass-card w-full max-w-[620px] p-7 sm:p-9 lg:p-11 text-left relative overflow-hidden transition-transform duration-300">
      {/* Subtle top edge specular highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Eyebrow */}
      <p className="text-[#E7B63F] text-xs font-bold tracking-[0.2em] uppercase">
        WELCOME TO
      </p>

      {/* Main Heading */}
      <h1 className="mt-3.5 font-[family-name:var(--font-display)] text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] leading-[0.98] font-semibold text-white tracking-tight drop-shadow-sm">
        Church of Our{" "}
        <span className="block text-[#E7B63F] mt-1 sm:mt-2">
          Lady of Fatima
        </span>
      </h1>

      {/* Parish Tagline */}
      <div className="mt-4 flex items-center gap-2.5">
        <span className="h-px w-6 bg-[#E7B63F] shrink-0" aria-hidden="true" />
        <p className="text-[#FFFFFF] text-xs sm:text-[14px] font-semibold tracking-[0.18em] uppercase">
          A PARISH OF FAITH AND WELCOME
        </p>
      </div>

      {/* Description */}
      <p className="mt-4 max-w-[430px] text-white/88 text-sm sm:text-base lg:text-[17px] leading-[1.6]">
        A community united in Christ, growing in faith, serving with love, and welcoming all.
      </p>

      {/* CTA Buttons */}
      <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 w-full">
        {/* Primary CTA */}
        <ButtonLink
          to="/prayer-liturgy/mass-schedule"
          className="group inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#F2C14E] px-6 py-4 text-xs font-bold tracking-[0.12em] text-[#10215F] uppercase shadow-lg transition-transform duration-200 hover:-translate-y-[2px] active:translate-y-0 w-full sm:w-auto"
        >
          <Church className="size-4 shrink-0" />
          <span>JOIN US FOR MASS</span>
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
        </ButtonLink>

        {/* Secondary CTA */}
        <ButtonLink
          to="/live"
          variant="outline"
          className="group inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/35 bg-white/8 px-6 py-4 text-xs font-bold tracking-[0.12em] text-white uppercase backdrop-blur-[12px] transition-transform duration-200 hover:-translate-y-[2px] active:translate-y-0 w-full sm:w-auto"
        >
          <PlayCircle className="size-4 text-white/90 transition-transform group-hover:scale-110" />
          <span>WATCH LIVE MASS</span>
        </ButtonLink>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[720px] lg:h-[760px] xl:h-[780px] w-full overflow-hidden bg-[#0A1435] text-white flex flex-col justify-between py-6 sm:py-8 lg:py-10">
      {/* Primary Church Facade Photograph (Full Bleed Background) */}
      <img
        src="/assets/fatima_mata.JPG"
        alt="Church of Our Lady of Fatima building facade with statue and cross"
        className="absolute inset-0 h-full w-full object-cover object-center lg:object-[center_30%] transition-transform duration-1000 ease-out pointer-events-none"
      />

      {/* Subtle Cinematic Overlays - Keeps photo bright and natural while ensuring glass panel contrast */}
      {/* Left side darkening tint behind the Liquid Glass card */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1435]/90 via-[#10215F]/40 via-50% to-transparent pointer-events-none lg:w-[65%]" />

      {/* Bottom darkening tint behind the bottom Liquid Glass bar */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1435]/85 via-[#0a1435]/20 to-transparent pointer-events-none" />

      {/* Main Responsive Content Layout */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between h-full min-h-[660px] lg:min-h-[700px]">
        {/* Upper Portion: Floating Primary Liquid Glass Card on the Left */}
        <div className="flex-1 flex items-center pt-2 sm:pt-4">
          <PrimaryHeroCard />
        </div>

        {/* Lower Portion: Floating Liquid Glass Information Bar */}
        <div className="pt-6 sm:pt-8 pb-1">
          <BottomGlassBar />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
