import { Clock3, Mail, MapPin, Phone } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-5 text-sm">
      <div className="flex items-start gap-3">
        <MapPin className="text-accent mt-0.5 size-4" />
        <p>St. Mary of Grace Parish, Hill Road, Bandra West, Mumbai 400050</p>
      </div>
      <div className="flex items-start gap-3">
        <Clock3 className="text-accent mt-0.5 size-4" />
        <p>Office Hours: Mon-Sat, 9:00 AM - 6:00 PM</p>
      </div>
      <div className="flex items-start gap-3">
        <Phone className="text-accent mt-0.5 size-4" />
        <p>+91 22 4000 1234</p>
      </div>
      <div className="flex items-start gap-3">
        <Mail className="text-accent mt-0.5 size-4" />
        <p>office@stmaryparish.org</p>
      </div>
    </div>
  )
}
