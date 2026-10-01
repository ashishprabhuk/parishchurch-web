import { useState } from "react"
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  LogIn,
  Mail,
  Menu,
  Phone,
} from "lucide-react"
import { Link, NavLink } from "react-router-dom"

import { AuthDialog } from "@/components/parish/auth-dialog"
import { LanguageSwitcher } from "@/components/parish/language-switcher"
import { UserMenu } from "@/components/parish/user-menu"
import { Button, ButtonLink } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useI18n } from "@/hooks/use-i18n"
import type { TranslationKey } from "@/lib/i18n"
import { PARISH_ENTITY } from "@/lib/seo/meta"
import { useAuthStore } from "@/stores/auth.store"
import { useMassTimings } from "@/features/parish"

type NavChildLink = {
  to: string
  labelKey: TranslationKey
}

type NavLinkItem = {
  to: string
  labelKey: TranslationKey
  children?: NavChildLink[]
}

const links: NavLinkItem[] = [
  { to: "/", labelKey: "nav.home" },
  {
    to: "/prayer-liturgy",
    labelKey: "nav.prayer",
    children: [
      { to: "/prayer-liturgy/livestream", labelKey: "nav.massLivestream" },
      { to: "/prayer-liturgy/mass-schedule", labelKey: "nav.dailySchedule" },
      { to: "/prayer-liturgy/sacraments", labelKey: "nav.sacraments" },
    ],
  },
  {
    to: "/who-we-are",
    labelKey: "nav.who",
    children: [
      { to: "/who-we-are/clergy", labelKey: "nav.clergy" },
      { to: "/who-we-are/communities", labelKey: "nav.communities" },
      {
        to: "/who-we-are/cells-associations",
        labelKey: "nav.cellsAssociations",
      },
      { to: "/who-we-are/history", labelKey: "nav.history" },
    ],
  },
  {
    to: "/events",
    labelKey: "nav.events",
    children: [
      { to: "/events/calendar", labelKey: "nav.calendar" },
      { to: "/events/chronicle", labelKey: "nav.chronicle" },
      { to: "/events/reaching-out", labelKey: "nav.reachingOut" },
    ],
  },
  { to: "/announcements", labelKey: "nav.announcements" },
  { to: "/contact", labelKey: "nav.contact" },
]

export function SiteHeader() {
  const { t } = useI18n()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { data: massTimings = [] } = useMassTimings()
  const sundayTimes = massTimings
    .filter((timing) => timing.dayGroup === "sunday")
    .map((timing) => timing.time)
  const worshipTimes = sundayTimes.length
    ? `${t("header.worshipTimesPrefix")} ${sundayTimes.join(", ")}`
    : t("header.worshipTimes")

  const closeMenu = (to: string) =>
    setOpenMenu((current) => (current === to ? null : current))

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex min-h-9 max-w-[90rem] items-center justify-between gap-3 px-4 py-2 text-[0.66rem] tracking-[0.08em] sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 font-medium uppercase">
            <Clock3 className="size-3.5" />
            {worshipTimes}
          </p>
          <div className="text-primary-foreground/85 hidden items-center gap-4 md:flex">
            <a
              href={`tel:${PARISH_ENTITY.phone}`}
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Phone className="size-3" /> {PARISH_ENTITY.phone}
            </a>
            <a
              href={`mailto:${PARISH_ENTITY.email}`}
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="size-3" /> {PARISH_ENTITY.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-border/90 bg-background/96 border-b backdrop-blur-md">
        <div className="mx-auto flex min-h-24 max-w-[90rem] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3"
            aria-label={t("accessibility.home")}
          >
            <span className="grid size-14 shrink-0 place-items-center overflow-hidden">
              <img
                src="/assets/fatima_church_logo.png"
                alt=""
                className="size-16 object-contain"
              />
            </span>
            <div className="min-w-0">
              <p className="font-heading text-walnut truncate text-xl leading-none sm:text-2xl xl:overflow-visible xl:text-clip xl:whitespace-nowrap">
                {t("brand.name")}
              </p>
              <p className="text-muted-foreground mt-1 truncate text-[0.61rem] font-semibold tracking-[0.17em] xl:overflow-visible xl:text-clip xl:whitespace-nowrap">
                Chulne
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
                    {t(link.labelKey)}
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
                            {t(child.labelKey)}
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
                  {t(link.labelKey)}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <LanguageSwitcher />
            {/* <ButtonLink
              to="/contact#visit"
              variant="outline"
              className="border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent px-3 text-xs tracking-[0.08em] uppercase"
            >
              <MapPin className="size-3.5" /> Plan a Visit
            </ButtonLink> */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <AuthDialog
                trigger={
                  <Button className="bg-primary text-primary-foreground hover:bg-church-red/90 px-3 text-xs tracking-[0.08em] uppercase">
                    <LogIn className="size-3.5" /> {t("auth.login")}
                  </Button>
                }
              />
            )}
          </div>

          <Sheet
            open={Boolean(mobileMenuOpen)}
            onOpenChange={(open) => setMobileMenuOpen(Boolean(open))}
          >
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
              side="top"
              className="border-soft-stone bg-parchment top-0 max-h-[85vh] w-full max-w-none overflow-y-auto rounded-b-2xl p-0"
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
                        {t(link.labelKey)}
                        <ChevronDown className="text-brass size-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-2 grid gap-1 pl-3">
                        <NavLink
                          to={link.to}
                          onClick={closeMobileMenu}
                          className="text-primary py-1.5 text-xs font-semibold tracking-[0.08em] uppercase"
                        >
                          Overview
                        </NavLink>
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={closeMobileMenu}
                            className="text-muted-foreground hover:text-primary py-1.5 text-sm"
                          >
                            {t(child.labelKey)}
                          </NavLink>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={closeMobileMenu}
                      className="border-soft-stone text-walnut hover:text-primary border-b py-3 text-sm font-medium transition-colors"
                    >
                      {t(link.labelKey)}
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
                  onClick={closeMobileMenu}
                >
                  Plan a Visit
                </ButtonLink>
                {isAuthenticated ? (
                  <div className="mt-2 flex w-full items-center justify-between rounded-lg border px-3 py-2">
                    <span className="text-sm font-medium">Signed in</span>
                    <UserMenu />
                  </div>
                ) : (
                  <AuthDialog
                    trigger={
                        <Button className="bg-primary text-primary-foreground mt-2 w-full">
                          <LogIn className="size-4" /> Login
                        </Button>
                    }
                  />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
