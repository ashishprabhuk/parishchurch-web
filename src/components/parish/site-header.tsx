import { useState } from "react"
import {
  CalendarDays,
  ChevronDown,
  Church,
  Clock3,
  HandHeart,
  Mail,
  MapPin,
  Menu,
  Phone,
} from "lucide-react"
import { Link, NavLink } from "react-router-dom"

import { LanguageSwitcher } from "@/components/parish/language-switcher"
import { Button, ButtonLink } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useI18n } from "@/hooks/use-i18n"

type NavChildLink = {
  to: string
  label: string
}

type NavLinkItem = {
  to: string
  label: string
  children?: NavChildLink[]
}

const links: NavLinkItem[] = [
  { to: "/", label: "Home" },
  {
    to: "/prayer-liturgy",
    label: "Prayer & Liturgy",
    children: [
      { to: "/prayer-liturgy/livestream", label: "Mass Livestream" },
      { to: "/prayer-liturgy/mass-schedule", label: "Daily Schedule" },
      { to: "/prayer-liturgy/sacraments", label: "Sacraments" },
    ],
  },
  {
    to: "/who-we-are",
    label: "Who We Are",
    children: [
      { to: "/who-we-are/clergy", label: "Clergy" },
      { to: "/who-we-are/communities", label: "Communities" },
      {
        to: "/who-we-are/cells-associations",
        label: "Cells & Associations",
      },
      { to: "/who-we-are/history", label: "Parish History" },
    ],
  },
  {
    to: "/events",
    label: "Events",
    children: [
      { to: "/events/calendar", label: "Calendar" },
      { to: "/events/chronicle", label: "The Chronicle" },
      { to: "/events/reaching-out", label: "Reaching Out" },
    ],
  },
  {
    to: "/announcements",
    label: "Announcements",
    children: [
      { to: "/announcements/calendar", label: "Calendar" },
      { to: "/announcements/chronicle", label: "The Chronicle" },
      { to: "/announcements/reaching-out", label: "Reaching Out" },
    ],
  },
  { to: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const { t } = useI18n()
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const closeMenu = (to: string) =>
    setOpenMenu((current) => (current === to ? null : current))

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex min-h-9 max-w-[90rem] items-center justify-between gap-3 px-4 py-2 text-[0.66rem] tracking-[0.08em] sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 font-medium uppercase">
            <Clock3 className="size-3.5" />
            Sunday worship at 8:00 AM, 10:00 AM & 6:00 PM
          </p>
          <div className="text-primary-foreground/85 hidden items-center gap-4 md:flex">
            <a
              href="tel:+912240001234"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Phone className="size-3" /> +91 22 4000 1234
            </a>
            <a
              href="mailto:office@stmaryparish.org"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="size-3" /> office@stmaryparish.org
            </a>
          </div>
        </div>
      </div>

      <div className="border-border/90 bg-background/96 border-b backdrop-blur-md">
        <div className="mx-auto flex min-h-20 max-w-[90rem] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3"
            aria-label="St. Mary of Grace Parish home"
          >
            <span className="border-brass/70 bg-antique-cream grid size-11 shrink-0 place-items-center rounded-full border shadow-[inset_0_0_0_3px_rgb(245_240_231)]">
              <Church className="text-primary size-5" />
            </span>
            <div className="min-w-0">
              <p className="font-heading text-walnut truncate text-xl leading-none sm:text-2xl xl:overflow-visible xl:text-clip xl:whitespace-nowrap">
                {t("brand.name")}
              </p>
              <p className="text-muted-foreground mt-1 truncate text-[0.61rem] font-semibold tracking-[0.17em] uppercase xl:overflow-visible xl:text-clip xl:whitespace-nowrap">
                A parish of faith and welcome
              </p>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-6 xl:flex"
            aria-label="Main navigation"
          >
            {links.map((link) =>
              link.children ? (
                <div
                  key={link.to}
                  className="relative shrink-0"
                  onMouseEnter={() => setOpenMenu(link.to)}
                  onMouseLeave={() => closeMenu(link.to)}
                  onFocus={() => setOpenMenu(link.to)}
                  onBlur={() => closeMenu(link.to)}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `nav-underline hover:text-primary flex items-center gap-1 text-[0.72rem] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${isActive ? "text-primary" : "text-foreground/80"}`
                    }
                  >
                    {link.label}
                    <ChevronDown
                      className={`size-3 shrink-0 transition-transform ${openMenu === link.to ? "rotate-180" : ""}`}
                    />
                  </NavLink>
                  {openMenu === link.to ? (
                    <div className="fade-up absolute top-full left-0 z-50 w-60 pt-3">
                      <div className="border-brass/45 bg-parchment divide-soft-stone/70 divide-y overflow-hidden rounded-lg border shadow-xl">
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={() => setOpenMenu(null)}
                            className="text-walnut hover:bg-antique-cream/70 hover:text-primary block px-5 py-3.5 text-[0.7rem] font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-colors"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-underline hover:text-primary shrink-0 text-[0.72rem] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${isActive ? "text-primary" : "text-foreground/80"}`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <LanguageSwitcher />
            <ButtonLink
              to="/contact#visit"
              variant="outline"
              className="border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent px-3 text-xs tracking-[0.08em] uppercase"
            >
              <MapPin className="size-3.5" /> Plan a Visit
            </ButtonLink>
            <ButtonLink
              to="/donate"
              className="bg-primary text-primary-foreground hover:bg-church-red/90 px-3 text-xs tracking-[0.08em] uppercase"
            >
              <HandHeart className="size-3.5" /> Donate
            </ButtonLink>
          </div>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="border-brass/60 text-primary xl:hidden"
                  aria-label="Open navigation"
                />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-soft-stone bg-parchment w-[88vw] max-w-sm p-0"
            >
              <SheetHeader className="border-soft-stone border-b px-6 py-6 text-left">
                <SheetTitle className="font-heading text-walnut text-2xl">
                  {t("brand.name")}
                </SheetTitle>
                <p className="editorial-label mt-2">Faith, heritage, welcome</p>
              </SheetHeader>
              <nav className="grid px-6 py-6" aria-label="Mobile navigation">
                {links.map((link) =>
                  link.children ? (
                    <details
                      key={link.to}
                      className="border-soft-stone group border-b py-3"
                    >
                      <summary className="text-walnut flex list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                        {link.label}
                        <ChevronDown className="text-brass size-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-2 grid gap-1 pl-3">
                        <NavLink
                          to={link.to}
                          className="text-primary py-1.5 text-xs font-semibold tracking-[0.08em] uppercase"
                        >
                          Overview
                        </NavLink>
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className="text-muted-foreground hover:text-primary py-1.5 text-sm"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className="border-soft-stone text-walnut hover:text-primary border-b py-3 text-sm font-medium transition-colors"
                    >
                      {link.label}
                    </NavLink>
                  ),
                )}
              </nav>
              <div className="px-6 pb-8">
                <div className="mb-4 flex items-center justify-between">
                  <LanguageSwitcher />
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <CalendarDays className="size-3.5" /> Sunday worship
                  </span>
                </div>
                <ButtonLink
                  to="/contact#visit"
                  variant="outline"
                  className="border-primary/60 text-primary w-full"
                >
                  Plan a Visit
                </ButtonLink>
                <ButtonLink
                  to="/donate"
                  className="bg-primary text-primary-foreground mt-2 w-full"
                >
                  <HandHeart className="size-4" /> Give Today
                </ButtonLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
