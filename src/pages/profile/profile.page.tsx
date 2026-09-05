import { CalendarDays, LogOut, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"
import { Link, Navigate, useNavigate } from "react-router-dom"

import { initialsFromName } from "@/components/common/user-avatar"
import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSeo } from "@/hooks/use-seo"
import { notify } from "@/lib/toast"
import { useAuthStore } from "@/stores/auth.store"

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  useSeo({
    title: "My Profile | St. Mary of Grace Parish",
    description: "Your parish member profile.",
    canonicalPath: "/profile",
  })

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />
  }

  const isAdmin = user.role === "admin"

  const onLogout = () => {
    logout()
    notify.success("You have been signed out.")
    navigate("/")
  }

  const details = [
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Phone", value: user.phone ?? "Not provided" },
    { icon: MapPin, label: "Address", value: user.address ?? "Not provided" },
    {
      icon: CalendarDays,
      label: "Member since",
      value: user.memberSince ?? "—",
    },
  ]

  return (
    <>
      <ParishPageHeader
        title="My Profile"
        subtitle="Your parish account and membership details."
        image="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card className="border-border/70 bg-card/85">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
              <Avatar className="ring-brass/40 size-20 ring-2">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : null}
                <AvatarFallback className="text-xl">
                  {initialsFromName(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <span className="font-heading text-walnut text-3xl">
                    {user.name}
                  </span>
                  <Badge
                    variant={isAdmin ? "default" : "secondary"}
                    className="text-[0.6rem] tracking-[0.08em] uppercase"
                  >
                    <ShieldCheck className="mr-1 size-3" />
                    {isAdmin ? "Admin" : "Member"}
                  </Badge>
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {user.email}
                </p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="size-4" /> Sign out
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/85">
            <CardContent className="p-6 sm:p-8">
              <h2 className="font-heading text-walnut text-2xl">
                Contact details
              </h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="border-border/60 flex items-start gap-3 rounded-lg border p-4"
                  >
                    <item.icon className="text-primary mt-0.5 size-4 shrink-0" />
                    <div className="min-w-0">
                      <dt className="text-muted-foreground text-xs font-semibold tracking-[0.12em] uppercase">
                        {item.label}
                      </dt>
                      <dd className="mt-1 truncate text-sm font-medium">
                        {item.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          {isAdmin ? (
            <Card className="border-primary/40 bg-card/85">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-6">
                <div>
                  <h2 className="font-heading text-walnut text-xl">
                    Parish administration
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Manage announcements, events, clergy, and more.
                  </p>
                </div>
                <Button render={<Link to="/admin" />}>
                  Open admin dashboard
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </PageShell>
    </>
  )
}
