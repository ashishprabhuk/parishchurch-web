import {
  Camera,
  Church,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"

import { useI18n } from "@/hooks/use-i18n"

export function SiteFooter() {
  const { t } = useI18n()

  return (
    <footer className="bg-footer text-footer-foreground relative mt-20 overflow-hidden">
      <div className="bg-brass/80 absolute inset-x-0 top-0 h-px" />
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_.8fr_.9fr_1.1fr] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="border-brass/70 grid size-11 place-items-center rounded-full border">
              <Church className="text-brass size-5" />
            </span>
            <div>
              <p className="font-heading text-2xl leading-none">
                {t("brand.name")}
              </p>
              <p className="text-footer-foreground/60 mt-1 text-[0.61rem] font-semibold tracking-[0.16em] uppercase">
                Est. in faith and service
              </p>
            </div>
          </Link>
          <p className="text-footer-foreground/72 mt-5 max-w-sm text-sm leading-relaxed">
            A home for worship, a table for fellowship, and a community that
            carries Christ's hope into the world.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="#community"
              aria-label="Parish community"
              title="Parish community"
              className="border-footer-foreground/25 hover:border-brass hover:text-brass grid size-9 place-items-center border transition-colors"
            >
              <Users className="size-4" />
            </a>
            <a
              href="#gallery"
              aria-label="Parish photo gallery"
              title="Parish photo gallery"
              className="border-footer-foreground/25 hover:border-brass hover:text-brass grid size-9 place-items-center border transition-colors"
            >
              <Camera className="size-4" />
            </a>
            <a
              href="/prayer-liturgy/livestream"
              aria-label="Watch parish videos"
              title="Watch parish videos"
              className="border-footer-foreground/25 hover:border-brass hover:text-brass grid size-9 place-items-center border transition-colors"
            >
              <PlayCircle className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-brass text-xs font-semibold tracking-[0.18em] uppercase">
            Explore
          </h4>
          <ul className="text-footer-foreground/76 mt-5 space-y-3 text-sm">
            <li>
              <Link className="hover:text-brass" to="/who-we-are">
                About our parish
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/#sermons">
                Sermons
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/#ministries">
                Ministries
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/events">
                Events
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/#stories">
                Stories of faith
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-brass text-xs font-semibold tracking-[0.18em] uppercase">
            Worship
          </h4>
          <ul className="text-footer-foreground/76 mt-5 space-y-3 text-sm">
            <li>
              <Link
                className="hover:text-brass"
                to="/prayer-liturgy/mass-schedule"
              >
                Service times
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/contact#visit">
                Plan a visit
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/prayer-liturgy">
                Prayer & liturgy
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-brass"
                to="/prayer-liturgy/sacraments"
              >
                Sacraments
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/donate">
                Give today
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-brass text-xs font-semibold tracking-[0.18em] uppercase">
            Find us
          </h4>
          <ul className="text-footer-foreground/76 mt-5 space-y-4 text-sm leading-relaxed">
            <li className="flex gap-2.5">
              <MapPin className="text-brass mt-0.5 size-4 shrink-0" /> St. Mary
              of Grace Parish
              <br />
              Hill Road, Bandra West
              <br />
              Mumbai 400050
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="text-brass size-4 shrink-0" />
              <a className="hover:text-brass" href="tel:+912240001234">
                +91 22 4000 1234
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="text-brass size-4 shrink-0" />
              <a
                className="hover:text-brass"
                href="mailto:office@stmaryparish.org"
              >
                office@stmaryparish.org
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-footer-foreground/15 border-t">
        <div className="text-footer-foreground/58 mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © 2026 {t("brand.name")}. {t("footer.rights")}
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link className="hover:text-brass" to="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-brass" to="/terms">
              Terms of Use
            </Link>
            <Link className="hover:text-brass" to="/refund-policy">
              Refund Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
