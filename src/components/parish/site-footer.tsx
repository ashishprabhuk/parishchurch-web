import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import { Link } from "react-router-dom"

import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/common/social-icons"
import { PARISH_ENTITY } from "@/lib/seo/meta"

export function SiteFooter() {

  return (
    <footer className="bg-footer text-footer-foreground relative mt-20 overflow-hidden">
      <div className="bg-brass/80 absolute inset-x-0 top-0 h-px" />
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_.8fr_.9fr_1.1fr] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="border-brass/70 grid size-11 place-items-center overflow-hidden rounded-full border">
              <img
                src="/assets/fatima_church_logo.png"
                alt="Church of Our Lady of Fatima Logo"
                className="size-9 object-contain"
              />
            </span>
            <div>
              <p className="font-heading text-2xl leading-none">
                {PARISH_ENTITY.name}
              </p>
              <p className="text-footer-foreground/60 mt-1 text-[0.61rem] font-semibold tracking-[0.16em] uppercase">
                {PARISH_ENTITY.locality}, {PARISH_ENTITY.city}
              </p>
            </div>
          </Link>
          <p className="text-footer-foreground/72 mt-5 max-w-sm text-sm leading-relaxed">
            Welcome to the official website of the Church of Our Lady of Fatima, Chulne. A Catholic parish community in Chulne, Vasai West rooted in Eucharistic celebration, prayer, and local service.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={PARISH_ENTITY.socialProfiles[0]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              title="Facebook Page"
              className="border-footer-foreground/25 hover:border-brass hover:text-brass text-footer-foreground/80 grid size-9 place-items-center border transition-colors"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={PARISH_ENTITY.socialProfiles[1]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Page"
              title="Instagram Page"
              className="border-footer-foreground/25 hover:border-brass hover:text-brass text-footer-foreground/80 grid size-9 place-items-center border transition-colors"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={PARISH_ENTITY.socialProfiles[2]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              title="YouTube Channel"
              className="border-footer-foreground/25 hover:border-brass hover:text-brass text-footer-foreground/80 grid size-9 place-items-center border transition-colors"
            >
              <YoutubeIcon className="size-4" />
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
              <Link className="hover:text-brass" to="/chulne">
                Chulne location & details
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/who-we-are/history">
                Parish history
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/events">
                Church events
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/announcements">
                Announcements
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-brass text-xs font-semibold tracking-[0.18em] uppercase">
            Worship & Sacraments
          </h4>
          <ul className="text-footer-foreground/76 mt-5 space-y-3 text-sm">
            <li>
              <Link
                className="hover:text-brass"
                to="/prayer-liturgy/mass-schedule"
              >
                Mass timings
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/prayer-liturgy/sacraments">
                Sacraments
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/prayer-liturgy/livestream">
                Mass livestream
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/who-we-are/communities">
                SCC Communities
              </Link>
            </li>
            <li>
              <Link className="hover:text-brass" to="/donate">
                Parish support & donate
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
              <MapPin className="text-brass mt-0.5 size-4 shrink-0" />
              <span>
                {PARISH_ENTITY.officialName}
                <br />
                {PARISH_ENTITY.addressStreet}
                <br />
                {PARISH_ENTITY.region} {PARISH_ENTITY.postalCode}, India
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="text-brass size-4 shrink-0" />
              <a className="hover:text-brass" href={`tel:${PARISH_ENTITY.phone}`}>
                {PARISH_ENTITY.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="text-brass size-4 shrink-0" />
              <a
                className="hover:text-brass"
                href={`mailto:${PARISH_ENTITY.email}`}
              >
                {PARISH_ENTITY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-footer-foreground/15 border-t">
        <div className="text-footer-foreground/58 mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © 2026 {PARISH_ENTITY.officialName}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link className="hover:text-brass" to="/chulne">
              Chulne Page
            </Link>
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
