import { Clock3, Mail, MapPin, Phone } from "lucide-react"

import { PARISH_ENTITY } from "@/lib/seo/meta"

export function ContactInfo() {
  return (
    <div className="space-y-5 text-sm">
      <div className="flex items-start gap-3">
        <MapPin className="text-accent mt-0.5 size-4 shrink-0" />
        <p>{PARISH_ENTITY.fullAddress}</p>
      </div>
      <div className="flex items-start gap-3">
        <Clock3 className="text-accent mt-0.5 size-4 shrink-0" />
        <p>Parish Office Hours: All Days - 8:30 AM - 10:30 AM</p>
      </div>
      <div className="flex items-start gap-3">
        <Phone className="text-accent mt-0.5 size-4 shrink-0" />
        <a href={`tel:${PARISH_ENTITY.phone}`} className="hover:underline">
          {PARISH_ENTITY.phone}
        </a>
      </div>
      <div className="flex items-start gap-3">
        <Mail className="text-accent mt-0.5 size-4 shrink-0" />
        <a href={`mailto:${PARISH_ENTITY.email}`} className="hover:underline">
          {PARISH_ENTITY.email}
        </a>
      </div>
    </div>
  )
}
