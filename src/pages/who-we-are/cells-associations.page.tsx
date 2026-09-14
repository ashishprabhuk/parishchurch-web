import { useState } from "react"
import { Calendar, Mail, Search, ShieldCheck, User, Users } from "lucide-react"

import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCellsAssociations, type ParishAssociation } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function CellsAssociationsPage() {
  useSeo({
    title: "Cells & Associations | St. Mary of Grace Parish",
    description: "Lay associations and active parish cells enriching our faith community.",
    canonicalPath: "/who-we-are/cells-associations",
  })

  const { data = [], isLoading } = useCellsAssociations()
  const [searchTerm, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Ensure items are normalized objects
  const normalizedData: ParishAssociation[] = data.map((item, index) => {
    if (typeof item === "string") {
      return { id: `assoc-${index}`, name: item }
    }
    return item
  })

  const categories = Array.from(
    new Set(
      normalizedData
        .map((item) => item.category)
        .filter((cat): cat is string => Boolean(cat)),
    ),
  )

  const filteredItems = normalizedData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.leader?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <>
      <ParishPageHeader
        title="Cells & Associations"
        subtitle="Active lay ministries, movements, and prayer associations enriching parish mission."
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1700&q=80"
      />

      <PageShell className="space-y-8 py-12 md:py-16">
        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              type="search"
              placeholder="Search cells & associations..."
              value={searchTerm}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-9"
            />
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                Category:
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All ({normalizedData.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="text-muted-foreground py-12 text-center">
            Loading associations...
          </div>
        ) : filteredItems.length === 0 ? (
          <Card className="border-dashed py-12 text-center">
            <CardContent className="space-y-3">
              <Users className="text-brass/60 mx-auto size-10" />
              <h3 className="font-heading text-walnut text-xl dark:text-parchment">
                No matching cells or associations found
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Try adjusting your search query or category filter.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="border-brass/40 bg-card transition-all hover:border-brass hover:shadow-md flex flex-col justify-between"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="border-brass/60 bg-antique-cream/40 grid size-10 shrink-0 place-items-center rounded-full border">
                        <ShieldCheck className="text-primary size-5" />
                      </span>
                      <div>
                        <h3 className="font-heading text-walnut text-xl dark:text-parchment">
                          {item.name}
                        </h3>
                        {item.category && (
                          <Badge variant="outline" className="mt-1 border-brass/60 text-brass text-[0.65rem] uppercase">
                            {item.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="border-border text-muted-foreground space-y-2 border-t pt-4 text-xs">
                    {item.leader && (
                      <div className="flex items-center gap-2">
                        <User className="text-brass size-3.5 shrink-0" />
                        <span>Leader: <strong className="text-foreground font-medium">{item.leader}</strong></span>
                      </div>
                    )}
                    {item.meetingTime && (
                      <div className="flex items-center gap-2">
                        <Calendar className="text-brass size-3.5 shrink-0" />
                        <span>Meeting: {item.meetingTime}</span>
                      </div>
                    )}
                    {item.contact && (
                      <div className="flex items-center gap-2">
                        <Mail className="text-brass size-3.5 shrink-0" />
                        <span>Contact: {item.contact}</span>
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
