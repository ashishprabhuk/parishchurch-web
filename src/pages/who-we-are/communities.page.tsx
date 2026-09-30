import { useState } from "react"
import { Church, MapPin, Search, User, Users } from "lucide-react"

import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCommunities, type ParishCommunity } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function CommunitiesPage() {
  useSeo({
    title: "Communities | Church of Our Lady of Fatima",
    description: "Small Christian Communities (SCCs) and parish family clusters growing in faith together.",
    canonicalPath: "/who-we-are/communities",
  })

  const { data = [], isLoading } = useCommunities()
  const [searchTerm, setSearchText] = useState("")

  // Normalize items to objects
  const normalizedData: ParishCommunity[] = data.map((item, index) => {
    if (typeof item === "string") {
      return { id: `com-${index}`, name: item }
    }
    return item
  })

  const filteredItems = normalizedData.filter((item) => {
    const query = searchTerm.toLowerCase()
    return (
      item.name.toLowerCase().includes(query) ||
      String(item.zone ?? "").toLowerCase().includes(query) ||
      (item.patronSaint ?? item.patron ?? "").toLowerCase().includes(query) ||
      (item.ppcPerson ?? item.leader ?? "").toLowerCase().includes(query) ||
      (item.minister ?? "").toLowerCase().includes(query) ||
      (item.description ?? "").toLowerCase().includes(query)
    )
  })

  return (
    <>
      <ParishPageHeader
        title="Parish Communities"
        subtitle="Small Christian Communities (SCCs) and neighborhood prayer clusters strengthening parish bonds."
        image="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1700&q=80"
      />

      <PageShell className="space-y-8 py-12 md:py-16">
        {/* Search Bar */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              type="search"
              placeholder="Search communities by name, zone, or patron..."
              value={searchTerm}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="text-muted-foreground py-12 text-center">
            Loading communities data...
          </div>
        ) : filteredItems.length === 0 ? (
          <Card className="border-dashed py-12 text-center">
            <CardContent className="space-y-3">
              <Users className="text-brass/60 mx-auto size-12" />
              <h3 className="font-heading text-walnut text-xl dark:text-parchment">
                No community records available
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Community profiles and SCC zone allocations are being updated. Check back soon or contact the parish office for details.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group border-border/70 bg-card/85 flex h-full flex-col overflow-hidden rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-brass/60 hover:shadow-md"
              >
                <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="border-brass/60 bg-antique-cream/45 text-primary grid size-12 shrink-0 place-items-center rounded-full border transition-colors group-hover:bg-antique-cream">
                      <Church className="size-5" />
                    </span>
                    {item.zone && (
                      <Badge
                        variant="outline"
                        className="border-brass/60 text-brass max-w-[12rem] text-right text-[0.65rem] tracking-[0.08em] uppercase"
                      >
                        {item.zone}
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-heading text-walnut mt-5 text-2xl leading-tight dark:text-parchment">
                    {item.name}
                  </h3>

                  {item.description && (
                    <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="border-border mt-5 space-y-3 border-t pt-5 text-sm">
                    {(item.patronSaint ?? item.patron) && (
                      <div className="flex items-start gap-3">
                        <MapPin className="text-brass mt-0.5 size-4 shrink-0" />
                        <p className="text-muted-foreground leading-snug">
                          Patron Saint: <strong className="text-foreground font-medium">{item.patronSaint ?? item.patron}</strong>
                        </p>
                      </div>
                    )}
                    {(item.ppcPerson ?? item.leader) && (
                      <div className="flex items-start gap-3">
                        <User className="text-brass mt-0.5 size-4 shrink-0" />
                        <p className="text-muted-foreground leading-snug">
                          PPC Person: <strong className="text-foreground font-medium">{item.ppcPerson ?? item.leader}</strong>
                        </p>
                      </div>
                    )}
                    {item.minister && (
                      <div className="flex items-start gap-3">
                        <User className="text-brass mt-0.5 size-4 shrink-0" />
                        <p className="text-muted-foreground leading-snug">
                          Minister: <strong className="text-foreground font-medium">{item.minister}</strong>
                        </p>
                      </div>
                    )}
                  </div>

                  {(item.meetingTime || item.communityMembers || item.zoneDetails) && (
                    <div className="bg-muted/35 mt-5 space-y-4 rounded-md p-4 text-xs leading-relaxed">
                      {item.meetingTime && (
                        <p className="text-muted-foreground">
                          <span className="text-foreground font-semibold">Schedule:</span> {item.meetingTime}
                        </p>
                      )}
                      {item.communityMembers && Object.keys(item.communityMembers).length > 0 && (
                        <div>
                          <p className="text-foreground mb-1 font-semibold">Community members</p>
                          <p className="text-muted-foreground break-words">
                            {Object.entries(item.communityMembers).map(([role, member]) => `${role}: ${member}`).join(" · ")}
                          </p>
                        </div>
                      )}
                      {item.zoneDetails && Object.keys(item.zoneDetails).length > 0 && (
                        <div>
                          <p className="text-foreground mb-1 font-semibold">Zone details</p>
                          <p className="text-muted-foreground break-words">
                            {Object.entries(item.zoneDetails).map(([label, detail]) => `${label}: ${detail}`).join(" · ")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </PageShell>
    </>
  )
}
