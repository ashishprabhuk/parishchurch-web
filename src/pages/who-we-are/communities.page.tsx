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
    title: "Communities | St. Mary of Grace Parish",
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
      item.zone?.toLowerCase().includes(query) ||
      item.patron?.toLowerCase().includes(query) ||
      item.leader?.toLowerCase().includes(query)
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
                className="border-brass/40 bg-card transition-all hover:border-brass hover:shadow-md flex flex-col justify-between"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="border-brass/60 bg-antique-cream/40 grid size-10 shrink-0 place-items-center rounded-full border">
                        <Church className="text-primary size-5" />
                      </span>
                      {item.zone && (
                        <Badge variant="outline" className="border-brass/60 text-brass text-[0.65rem] uppercase">
                          {item.zone}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-heading text-walnut text-xl dark:text-parchment">
                      {item.name}
                    </h3>
                  </div>

                  {item.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="border-border text-muted-foreground space-y-2 border-t pt-4 text-xs">
                    {item.patron && (
                      <div className="flex items-center gap-2">
                        <MapPin className="text-brass size-3.5 shrink-0" />
                        <span>Patron Saint: <strong className="text-foreground font-medium">{item.patron}</strong></span>
                      </div>
                    )}
                    {item.leader && (
                      <div className="flex items-center gap-2">
                        <User className="text-brass size-3.5 shrink-0" />
                        <span>Coordinator: <strong className="text-foreground font-medium">{item.leader}</strong></span>
                      </div>
                    )}
                    {item.meetingTime && (
                      <div className="text-muted-foreground mt-1 text-[0.7rem]">
                        Schedule: {item.meetingTime}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </PageShell>
    </>
  )
}
