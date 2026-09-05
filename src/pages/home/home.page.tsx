import { useState } from "react"
import { differenceInCalendarDays, format } from "date-fns"
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  Church,
  Clock3,
  Cross,
  HandHeart,
  Link2,
  Mail,
  MapPin,
  PlayCircle,
  Phone,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"

import { CountdownRing } from "@/components/parish/countdown-ring"
import { HeroSection } from "@/components/parish/hero-section"
import { MapEmbed } from "@/components/parish/map-embed"
import { PageShell } from "@/components/parish/page-shell"
import { ButtonLink } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useClergy, useEventsCalendar, useOutreach } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

const ministries = [
  {
    title: "Children's Ministry",
    description: "Wonder, friendship, and a first language for faith.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Youth Ministry",
    description: "A place for courageous questions and lasting friendships.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Women's Ministry",
    description: "Prayerful companionship through every season of life.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Men's Ministry",
    description: "Growing in character, service, and shared purpose.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Education Ministry",
    description: "Scripture, tradition, and formation for all ages.",
    image:
      "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Worship Ministry",
    description: "Making room for reverence, music, and joyful praise.",
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Outreach Ministry",
    description: "Faith made visible through practical care and presence.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Community Ministry",
    description:
      "Shared tables, open doors, and a parish that knows your name.",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=82",
  },
]

const sermons = [
  {
    category: "Sunday Homily",
    title: "Finding Strength in God's Promises",
    speaker: "Fr. Anthony D'Souza",
    scripture: "Isaiah 41:10",
    date: "18 August 2026",
    duration: "36 min",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=82",
  },
  {
    category: "Reflection",
    title: "A Table Prepared in Grace",
    speaker: "Fr. Michael Fernandes",
    scripture: "Psalm 23:5",
    date: "11 August 2026",
    duration: "31 min",
    image:
      "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=900&q=82",
  },
  {
    category: "Sunday Homily",
    title: "The Courage to Begin Again",
    speaker: "Fr. Anthony D'Souza",
    scripture: "Lamentations 3:22-23",
    date: "04 August 2026",
    duration: "28 min",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=82",
  },
]

const featureBandItems = [
  {
    title: "Community & Support",
    description: "A parish family ready to walk with you in every season.",
    icon: Users,
  },
  {
    title: "Strengthening Faith",
    description:
      "Worship and formation that deepen a living relationship with Christ.",
    icon: Cross,
  },
  {
    title: "Education & Guidance",
    description: "Catechesis and mentorship for every age and stage of life.",
    icon: BookOpen,
  },
  {
    title: "Opportunities for Service",
    description: "Practical, hands-on ways to serve our neighbours with love.",
    icon: HandHeart,
  },
]

const faithStories = [
  {
    name: "Maria Fernandes",
    role: "Parishioner since 2003",
    quote:
      "I came looking for a church. I found a family that prayed with me, celebrated with me, and made room for my whole life.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=82",
  },
  {
    name: "Thomas D'Mello",
    role: "Outreach volunteer",
    quote:
      "Serving a meal together reminds me that worship does not end at the sanctuary doors. It becomes the way we meet our neighbours.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=82",
  },
  {
    name: "Asha and Neil Pereira",
    role: "Young family group",
    quote:
      "Our children see that faith can be joyful, thoughtful, and generous. That is a gift we carry home every Sunday.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=82",
  },
]

const galleryItems = [
  {
    title: "The sanctuary in morning light",
    image:
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1400&q=84",
    className: "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto",
  },
  {
    title: "A quiet chapel detail",
    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=900&q=84",
    className: "aspect-square",
  },
  {
    title: "Gathered in worship",
    image:
      "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=900&q=84",
    className: "aspect-square",
  },
  {
    title: "A word of welcome",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=900&q=84",
    className: "aspect-square",
  },
  {
    title: "Hands ready to serve",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=84",
    className: "aspect-square",
  },
  {
    title: "The joy of parish life",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=84",
    className: "col-span-2 aspect-[4/3] md:aspect-auto",
  },
]

type GalleryItem = (typeof galleryItems)[number]

export default function HomePage() {
  useSeo({
    title: "St. Mary of Grace Parish | Faith, Heritage, Community",
    description:
      "A historic parish community for worship, spiritual formation, and faithful service in Mumbai.",
    canonicalPath: "/",
  })

  const [selectedGalleryItem, setSelectedGalleryItem] =
    useState<GalleryItem | null>(null)
  const { data: eventList = [] } = useEventsCalendar()
  const { data: clergy = [] } = useClergy()
  const { data: outreach = [] } = useOutreach()

  const nextEvent = eventList[0]
  const nextEventDate = nextEvent ? new Date(nextEvent.date) : null
  const hasValidNextEventDate =
    nextEventDate !== null && !Number.isNaN(nextEventDate.getTime())
  const daysUntilNextEvent = hasValidNextEventDate
    ? Math.max(
        0,
        differenceInCalendarDays(nextEventDate, new Date()),
      )
    : 3
  const pastor = clergy[0]
  const mission = outreach[0]

  return (
    <>
      <HeroSection />

      <section className="border-soft-stone bg-antique-cream/55 border-b">
        <PageShell className="divide-soft-stone grid divide-y py-0 md:grid-cols-3 md:divide-x md:divide-y-0">
          <Link
            to="/contact#visit"
            className="group flex items-center gap-3 py-4 pr-4 md:py-5 md:pr-8"
          >
            <MapPin className="text-primary size-4 shrink-0" />
            <p className="text-walnut text-sm leading-tight">
              <span className="font-semibold">New here?</span> Plan your first
              visit
            </p>
            <ChevronRight className="text-brass ml-auto size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/prayer-liturgy"
            className="group flex items-center gap-3 py-4 md:px-8 md:py-5"
          >
            <Church className="text-primary size-4 shrink-0" />
            <p className="text-walnut text-sm leading-tight">
              <span className="font-semibold">Need prayer?</span> We would be
              honoured to pray with you
            </p>
            <ChevronRight className="text-brass ml-auto size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/prayer-liturgy/mass-schedule"
            className="group flex items-center gap-3 py-4 pl-0 md:py-5 md:pl-8"
          >
            <Clock3 className="text-primary size-4 shrink-0" />
            <p className="text-walnut text-sm leading-tight">
              <span className="font-semibold">Worship with us.</span> View all
              service times
            </p>
            <ChevronRight className="text-brass ml-auto size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </PageShell>
      </section>

      <section id="our-story" className="scroll-mt-32 py-20 md:py-28">
        <PageShell>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20">
            <div className="relative mx-auto w-full max-w-2xl pb-12 lg:pb-0">
              <div className="border-brass/70 bg-antique-cream/70 max-w-[82%] border p-3 sm:p-4">
                <img
                  src="https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1400&q=84"
                  alt="An open Bible and a candle in a quiet church setting"
                  className="image-cinematic cathedral-arch h-[26rem] w-full object-cover sm:h-[32rem]"
                />
              </div>
              <div className="border-parchment absolute right-0 bottom-0 w-[46%] border-[7px] shadow-[0_22px_35px_rgb(43_33_28/0.18)] sm:w-[44%]">
                <img
                  src="https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=900&q=84"
                  alt="Parish community gathered together"
                  className="image-cinematic aspect-[3/4] w-full object-cover"
                />
              </div>
              <p className="font-heading text-brass absolute bottom-4 left-[48%] text-4xl leading-none sm:bottom-5 sm:text-6xl">
                1996
              </p>
            </div>

            <div>
              <p className="editorial-label">Our story</p>
              <div className="ornament-divider mt-4" aria-hidden="true">
                <span className="font-heading text-lg leading-none">+</span>
              </div>
              <h2 className="font-heading text-walnut mt-5 max-w-xl text-4xl leading-[1.05] sm:text-5xl">
                A church built on faith, love, and community.
              </h2>
              <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed">
                St. Mary of Grace began with a handful of families gathering in
                a borrowed room. Today, our parish remains rooted in that same
                simple conviction: every person deserves a place to encounter
                Christ and be known by name.
              </p>
              <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed">
                We are a historic parish with our eyes open to the present,
                worshipping with reverence and serving our neighbours with
                practical, enduring love.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <ButtonLink
                  to="/who-we-are/history"
                  variant="outline"
                  className="border-primary/65 text-primary hover:bg-primary hover:text-primary-foreground h-10 rounded-sm px-4 text-xs tracking-[0.1em] uppercase"
                >
                  Discover our history <ChevronRight className="size-4" />
                </ButtonLink>
                <p className="font-heading text-walnut text-xl">
                  <span className="text-brass">Since</span> 1996
                </p>
              </div>
            </div>
          </div>
        </PageShell>
      </section>

      <section className="bg-primary paper-texture text-parchment relative isolate overflow-hidden py-20 md:py-28">
        <div
          className="border-brass/35 absolute inset-5 border sm:inset-8"
          aria-hidden="true"
        />
        <PageShell className="relative text-center">
          <p className="text-brass text-xs font-semibold tracking-[0.21em] uppercase">
            A word to carry with you
          </p>
          <div
            className="ornament-divider text-brass mx-auto mt-5 w-fit"
            aria-hidden="true"
          >
            <span className="font-heading text-lg leading-none">+</span>
          </div>
          <blockquote className="font-heading text-parchment mx-auto mt-6 max-w-4xl text-4xl leading-tight sm:text-5xl md:text-6xl">
            "Walk by faith, not by sight."
          </blockquote>
          <cite className="text-parchment/75 mt-6 block text-xs font-semibold tracking-[0.18em] uppercase not-italic">
            2 Corinthians 5:7
          </cite>
        </PageShell>
      </section>

      <section id="ministries" className="scroll-mt-32 py-20 md:py-28">
        <PageShell>
          <div className="grid gap-8 md:grid-cols-[1fr_.7fr] md:items-end">
            <div>
              <p className="editorial-label">Our ministries</p>
              <h2 className="font-heading text-walnut mt-4 text-4xl leading-tight sm:text-5xl">
                A place for every generation to belong.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-lg text-base leading-relaxed md:justify-self-end">
              From first prayers to lifelong service, our ministries make room
              for people to grow, serve, and build friendships that last.
            </p>
          </div>
          <div className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {ministries.map((ministry, index) => (
              <article
                key={ministry.title}
                className="group heritage-card overflow-hidden"
              >
                <div className="overflow-hidden">
                  <img
                    src={ministry.image}
                    alt=""
                    className="image-cinematic gallery-image aspect-[5/4] w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="border-brass/55 text-primary grid size-7 place-items-center rounded-full border text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-heading text-walnut mt-4 text-2xl leading-tight">
                    {ministry.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {ministry.description}
                  </p>
                  <Link
                    to="/who-we-are/communities"
                    className="text-primary hover:text-brass mt-5 inline-flex items-center gap-1 text-xs font-semibold tracking-[0.1em] uppercase"
                  >
                    Discover more <ChevronRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </PageShell>
      </section>

      <section
        id="sermons"
        className="bg-antique-cream/65 scroll-mt-32 py-20 md:py-28"
      >
        <PageShell>
          <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
            <div className="bg-walnut relative min-h-[28rem] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1400&q=84"
                alt="Historic church nave illuminated by warm natural light"
                className="image-cinematic absolute inset-0 h-full w-full object-cover"
              />
              <div className="bg-walnut/65 absolute inset-0" />
              <div className="text-parchment relative flex h-full min-h-[28rem] flex-col justify-end p-7 sm:p-9">
                <p className="text-brass text-xs font-semibold tracking-[0.2em] uppercase">
                  The sermon archive
                </p>
                <h2 className="font-heading mt-4 max-w-sm text-4xl leading-tight">
                  Words for the journey.
                </h2>
                <p className="text-parchment/80 mt-4 max-w-sm text-sm leading-relaxed">
                  Listen again to messages rooted in scripture and offered for
                  the life we are living now.
                </p>
                <ButtonLink
                  to="/prayer-liturgy/livestream"
                  variant="outline"
                  className="border-parchment/70 text-parchment hover:bg-parchment hover:text-walnut mt-7 w-fit rounded-sm bg-transparent text-xs tracking-[0.1em] uppercase"
                >
                  <PlayCircle className="size-4" /> Listen to a sermon
                </ButtonLink>
              </div>
            </div>
            <div className="self-center">
              <p className="editorial-label">Latest sermons</p>
              <div className="mt-4 grid gap-4">
                {sermons.map((sermon) => (
                  <Link
                    key={sermon.title}
                    to="/prayer-liturgy/livestream"
                    className="heritage-card group hover:bg-antique-cream/40 flex items-center gap-5 p-4 transition-colors"
                    aria-label={`Play sermon: ${sermon.title}`}
                  >
                    <span className="relative block size-20 shrink-0 sm:size-24">
                      <img
                        src={sermon.image}
                        alt=""
                        className="image-cinematic size-full rounded-full object-cover"
                      />
                      <span className="border-parchment bg-primary/95 text-primary-foreground absolute inset-0 m-auto grid size-9 place-items-center rounded-full border-2 shadow-lg transition-transform group-hover:scale-110">
                        <PlayCircle className="size-5" />
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="border-brass/50 text-brass inline-block rounded-full border px-2.5 py-0.5 text-[0.6rem] font-semibold tracking-[0.12em] uppercase">
                        {sermon.category}
                      </span>
                      <span className="font-heading text-walnut mt-2 block text-xl leading-tight sm:text-2xl">
                        {sermon.title}
                      </span>
                      <span className="text-muted-foreground mt-2 block text-xs">
                        {sermon.speaker}
                        <span className="text-brass px-1">|</span>
                        {sermon.scripture}
                        <span className="text-brass px-1">|</span>
                        {sermon.date} · {sermon.duration}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <ButtonLink
                to="/prayer-liturgy/livestream"
                variant="link"
                className="text-primary hover:text-brass mt-6 h-auto px-0 text-xs tracking-[0.1em] uppercase"
              >
                View all sermons <ChevronRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </PageShell>
      </section>

      <section className="py-20 md:py-28">
        <PageShell>
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div>
              <p className="editorial-label">Gather together</p>
              <h2 className="font-heading text-walnut mt-4 text-4xl leading-tight sm:text-5xl">
                The rhythm of parish life.
              </h2>
              <p className="text-muted-foreground mt-5 max-w-md text-base leading-relaxed">
                There is always a place to enter the life of the church, whether
                you come for worship, a conversation, or the work of serving
                together.
              </p>
              <div className="mt-7 flex items-center gap-6">
                <CountdownRing
                  value={daysUntilNextEvent}
                  label={`${daysUntilNextEvent} days until our next parish gathering`}
                />
                <div className="border-brass border-l-2 pl-4">
                  <p className="text-brass text-xs font-semibold tracking-[0.16em] uppercase">
                    Next gathering
                  </p>
                  <p className="font-heading text-walnut mt-1 text-2xl leading-snug">
                    Join us for{" "}
                    {nextEvent?.title ?? "our next community gathering"}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-soft-stone border-y">
              <article className="grid gap-6 py-7 sm:grid-cols-[7rem_1fr_auto] sm:items-center">
                <div className="border-brass/60 bg-parchment grid aspect-square place-items-center border text-center">
                  <p className="text-brass text-xs font-semibold tracking-[0.16em] uppercase">
                    {hasValidNextEventDate ? format(nextEventDate, "MMM") : "May"}
                  </p>
                  <p className="font-heading text-walnut mt-1 text-5xl leading-none">
                    {hasValidNextEventDate ? format(nextEventDate, "dd") : "29"}
                  </p>
                </div>
                <div>
                  <p className="text-brass text-xs font-semibold tracking-[0.15em] uppercase">
                    {nextEvent?.category ?? "Community"}
                  </p>
                  <h3 className="font-heading text-walnut mt-2 text-3xl leading-tight">
                    {nextEvent?.title ?? "A celebration of community"}
                  </h3>
                  <p className="text-muted-foreground mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="text-primary size-3.5" />
                      {nextEvent?.time ?? "6:30 PM"}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="text-primary size-3.5" />
                      {nextEvent?.location ?? "Parish courtyard"}
                    </span>
                  </p>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {nextEvent?.description ??
                      "An evening of welcome, music, and fellowship for our parish family and neighbours."}
                  </p>
                </div>
                <ButtonLink
                  to="/events"
                  variant="outline"
                  className="border-primary/65 text-primary hover:bg-primary hover:text-primary-foreground h-10 w-fit rounded-sm px-4 text-xs tracking-[0.1em] uppercase"
                >
                  View event <ChevronRight className="size-4" />
                </ButtonLink>
              </article>
              <div className="divide-soft-stone border-soft-stone grid divide-x border-t sm:grid-cols-2">
                {eventList.slice(1, 3).map((event) => (
                  <Link
                    key={event.id}
                    to="/events/calendar"
                    className="group flex gap-3 px-0 py-5 first:pr-5 last:pl-5"
                  >
                    <CalendarDays className="text-primary mt-0.5 size-4 shrink-0" />
                    <p className="text-walnut text-sm leading-snug">
                      <span className="group-hover:text-primary block font-semibold">
                        {event.title}
                      </span>
                      <span className="text-muted-foreground mt-1 block text-xs">
                        {format(new Date(event.date), "d MMMM")} | {event.time}
                      </span>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </PageShell>
      </section>

      <section
        id="leadership"
        className="bg-antique-cream/55 scroll-mt-32 py-20 md:py-28"
      >
        <PageShell>
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-20">
            <div className="border-brass/65 bg-parchment relative mx-auto w-full max-w-md border p-3">
              <div className="cathedral-arch relative">
                <img
                  src={
                    pastor?.image ??
                    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=84"
                  }
                  alt={pastor?.name ?? "Parish priest"}
                  className="image-cinematic aspect-[4/5] w-full object-cover"
                />
                <div className="from-walnut/60 absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
              </div>
              <span className="border-brass bg-parchment text-primary absolute -right-4 bottom-8 grid size-14 place-items-center rounded-full border shadow-lg">
                <Church className="size-6" />
              </span>
            </div>
            <div>
              <p className="editorial-label">Our shepherd</p>
              <h2 className="font-heading text-walnut mt-4 text-4xl leading-tight sm:text-5xl">
                Meet our pastor.
              </h2>
              <h3 className="font-heading text-primary mt-6 text-3xl">
                {pastor?.name ?? "Fr. Anthony D'Souza"}
              </h3>
              <p className="text-brass mt-1 text-sm font-semibold tracking-[0.12em] uppercase">
                {pastor?.role ?? "Parish Priest"}
              </p>
              <div className="mt-4 flex gap-2" aria-label="Contact our pastor">
                <a
                  href="mailto:office@stmaryparish.org"
                  aria-label="Email the parish office"
                  title="Email the parish office"
                  className="border-brass/50 text-primary hover:bg-primary hover:text-primary-foreground grid size-9 place-items-center rounded-full border transition-colors"
                >
                  <Mail className="size-4" />
                </a>
                <a
                  href="tel:+912240001234"
                  aria-label="Call the parish office"
                  title="Call the parish office"
                  className="border-brass/50 text-primary hover:bg-primary hover:text-primary-foreground grid size-9 place-items-center rounded-full border transition-colors"
                >
                  <Phone className="size-4" />
                </a>
                <Link
                  to="/who-we-are/clergy"
                  aria-label="Meet the rest of our clergy"
                  title="Meet the rest of our clergy"
                  className="border-brass/50 text-primary hover:bg-primary hover:text-primary-foreground grid size-9 place-items-center rounded-full border transition-colors"
                >
                  <Link2 className="size-4" />
                </Link>
              </div>
              <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed">
                {pastor?.bio ??
                  "Guiding the parish in liturgy, pastoral care, and outreach ministries."}{" "}
                His ministry is centred on a simple invitation: come as you are,
                meet Christ in worship, and find your place in a community that
                walks together.
              </p>
              <blockquote className="font-heading border-brass text-walnut mt-7 max-w-xl border-l-2 pl-5 text-2xl leading-snug italic">
                "The church is most beautiful when every person knows they are
                welcome at the table."
              </blockquote>
              <ButtonLink
                to="/who-we-are/clergy"
                variant="link"
                className="text-primary hover:text-brass mt-6 h-auto px-0 text-xs tracking-[0.1em] uppercase"
              >
                Meet our leadership <ChevronRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </PageShell>
      </section>

      <section
        id="community"
        className="bg-primary text-parchment relative isolate scroll-mt-32 overflow-hidden py-20 md:py-28"
      >
        <img
          src={
            mission?.image ??
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=84"
          }
          alt="Parish volunteers serving their community"
          className="image-cinematic absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="bg-primary/75 absolute inset-0" />
        <PageShell className="relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="text-brass text-xs font-semibold tracking-[0.2em] uppercase">
                Faith that serves
              </p>
              <h2 className="font-heading text-parchment mt-4 max-w-2xl text-5xl leading-[1.02] sm:text-6xl">
                Worship that carries into the world.
              </h2>
              <p className="text-parchment/84 mt-6 max-w-xl text-base leading-relaxed">
                {mission?.description ??
                  "Medical camps, meals, and dignity support for vulnerable families."}{" "}
                We partner with our neighbours to make care tangible, one
                encounter at a time.
              </p>
            </div>
            <div className="border-brass/55 border-l py-2 pl-6 lg:justify-self-end">
              <p className="font-heading text-antique-cream max-w-sm text-3xl leading-tight">
                "Love is not only spoken. It is prepared, carried, and shared."
              </p>
              <ButtonLink
                to="/events/reaching-out"
                variant="outline"
                className="border-parchment/70 text-parchment hover:bg-parchment hover:text-walnut mt-7 rounded-sm bg-transparent text-xs tracking-[0.1em] uppercase"
              >
                Our mission <ChevronRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </PageShell>
      </section>

      <section id="stories" className="scroll-mt-32 py-20 md:py-28">
        <PageShell>
          <div className="max-w-2xl">
            <p className="editorial-label">Stories of faith</p>
            <h2 className="font-heading text-walnut mt-4 text-4xl leading-tight sm:text-5xl">
              The people are the parish.
            </h2>
            <p className="text-muted-foreground mt-5 text-base leading-relaxed">
              Faith becomes most convincing in ordinary lives: in shared
              prayers, open doors, laughter at a long table, and the decision to
              keep showing up for one another.
            </p>
          </div>
          <div className="mt-11 grid gap-8 md:grid-cols-3">
            {faithStories.map((story) => (
              <article
                key={story.name}
                className="border-soft-stone border-t pt-5"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="image-cinematic size-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-heading text-walnut text-2xl">
                      {story.name}
                    </h3>
                    <p className="text-brass mt-1 text-[0.65rem] font-semibold tracking-[0.13em] uppercase">
                      {story.role}
                    </p>
                  </div>
                </div>
                <p className="font-heading text-walnut/88 mt-5 text-xl leading-relaxed italic">
                  "{story.quote}"
                </p>
                <Link
                  to="/events/chronicle"
                  className="text-primary hover:text-brass mt-5 inline-flex items-center gap-1 text-xs font-semibold tracking-[0.1em] uppercase"
                >
                  Read story <ChevronRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </PageShell>
      </section>

      <section
        id="gallery"
        className="bg-antique-cream/62 scroll-mt-32 py-20 md:py-28"
      >
        <PageShell>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-label">Parish gallery</p>
              <h2 className="font-heading text-walnut mt-4 text-4xl leading-tight sm:text-5xl">
                A life shared in light.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              A glimpse of the sacred spaces, familiar faces, and small moments
              that make up our life together.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:auto-rows-[12rem] md:grid-cols-4 md:gap-4">
            {galleryItems.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setSelectedGalleryItem(item)}
                className={`group focus-visible:outline-primary relative overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${item.className}`}
                aria-label={`Open image: ${item.title}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="image-cinematic gallery-image h-full w-full object-cover"
                />
                <span className="bg-walnut/0 group-hover:bg-walnut/35 absolute inset-0 transition-colors" />
                <span className="border-parchment/70 bg-walnut/75 text-parchment absolute right-3 bottom-3 translate-y-2 border px-2 py-1 text-[0.62rem] font-semibold tracking-[0.1em] uppercase opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  View
                </span>
              </button>
            ))}
          </div>
        </PageShell>
        <Dialog
          open={selectedGalleryItem !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedGalleryItem(null)
          }}
        >
          <DialogContent
            className="border-brass/55 bg-walnut text-parchment max-w-5xl gap-0 overflow-hidden rounded-none border p-0"
            showCloseButton
          >
            {selectedGalleryItem ? (
              <>
                <DialogTitle className="sr-only">
                  {selectedGalleryItem.title}
                </DialogTitle>
                <img
                  src={selectedGalleryItem.image}
                  alt={selectedGalleryItem.title}
                  className="image-cinematic max-h-[78vh] w-full object-contain"
                />
                <p className="border-brass/35 text-parchment/82 border-t px-5 py-4 text-sm">
                  {selectedGalleryItem.title}
                </p>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      </section>

      <section id="visit" className="scroll-mt-32 py-20 md:py-28">
        <PageShell>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="editorial-label">Plan your visit</p>
              <h2 className="font-heading text-walnut mt-4 text-4xl leading-tight sm:text-5xl">
                Come worship with us.
              </h2>
              <p className="text-muted-foreground mt-5 max-w-lg text-base leading-relaxed">
                Whether you are exploring faith, returning after a long time, or
                looking for a parish home, there is a place prepared for you
                here.
              </p>
              <div className="border-soft-stone mt-8 grid gap-5 border-y py-6 sm:grid-cols-2">
                <div>
                  <p className="text-brass text-xs font-semibold tracking-[0.15em] uppercase">
                    Sunday services
                  </p>
                  <p className="font-heading text-walnut mt-2 text-2xl">
                    8:00 AM
                    <br />
                    10:00 AM
                    <br />
                    6:00 PM
                  </p>
                </div>
                <div>
                  <p className="text-brass text-xs font-semibold tracking-[0.15em] uppercase">
                    Find us
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Hill Road, Bandra West
                    <br />
                    Mumbai 400050
                    <br />
                    Accessible parking available
                  </p>
                </div>
              </div>
              <ButtonLink
                to="/contact#visit"
                className="bg-primary text-primary-foreground hover:bg-church-red/85 mt-7 h-11 rounded-sm px-5 text-xs tracking-[0.1em] uppercase"
              >
                <MapPin className="size-4" /> Get directions
              </ButtonLink>
            </div>
            <div className="border-brass/50 bg-parchment border p-2 sm:p-3">
              <MapEmbed />
            </div>
          </div>
        </PageShell>
      </section>

      <section className="bg-walnut text-parchment relative isolate overflow-hidden py-20 md:py-28">
        <img
          src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=1800&q=84"
          alt="Parish gathering in a warm community setting"
          className="image-cinematic absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="bg-walnut/72 absolute inset-0" />
        <PageShell className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-brass text-xs font-semibold tracking-[0.2em] uppercase">
              Giving with gratitude
            </p>
            <h2 className="font-heading text-parchment mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
              Your giving helps us serve.
            </h2>
            <p className="text-parchment/78 mt-5 max-w-2xl text-base leading-relaxed">
              Your generosity supports worship, children and youth formation,
              parish care, community outreach, and the daily work of keeping our
              doors open.
            </p>
          </div>
          <ButtonLink
            to="/donate"
            className="bg-primary text-primary-foreground hover:bg-church-red/85 h-11 rounded-sm px-5 text-xs tracking-[0.1em] uppercase"
          >
            <HandHeart className="size-4" /> Give today
          </ButtonLink>
        </PageShell>
      </section>

      <section className="bg-ink text-parchment relative overflow-hidden py-14">
        <div
          className="from-forest/0 via-forest/70 to-forest/0 absolute inset-x-0 top-0 h-px bg-gradient-to-r"
          aria-hidden="true"
        />
        <PageShell>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featureBandItems.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="bg-forest/25 border-forest/60 text-antique-cream grid size-12 shrink-0 place-items-center rounded-full border">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-parchment text-lg leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-parchment/68 mt-1.5 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PageShell>
      </section>
    </>
  )
}
