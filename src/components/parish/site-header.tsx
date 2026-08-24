import {
  CalendarDays,
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

const links = [
  { to: "/", label: "Home" },
  { to: "/who-we-are", label: "About" },
  { to: "/#sermons", label: "Sermons" },
  { to: "/#ministries", label: "Ministries" },
  { to: "/events", label: "Events" },
  { to: "/#stories", label: "Stories" },
  { to: "/#gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const

export function SiteHeader() {
  const { t } = useI18n()

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
            className="hidden items-center gap-4 xl:flex"
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-underline hover:text-primary text-[0.72rem] font-semibold tracking-[0.08em] uppercase transition-colors ${isActive ? "text-primary" : "text-foreground/80"}`
                }
                data-active={link.to === "/" ? undefined : undefined}
              >
                {link.label}
              </NavLink>
            ))}
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
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="border-soft-stone text-walnut hover:text-primary border-b py-3 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </NavLink>
                ))}
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
