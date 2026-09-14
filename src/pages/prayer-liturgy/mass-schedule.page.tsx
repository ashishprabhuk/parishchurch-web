import { useState } from "react"
import { CalendarDays, Church, Clock3, Globe2, Sparkles } from "lucide-react"

import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useMassTimings, type MassTiming } from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"

export default function MassSchedulePage() {
  useSeo({
    title: "Mass Schedule | St. Mary of Grace Parish",
    description: "Daily, weekday, Sunday, and special occasion Mass timings.",
    canonicalPath: "/prayer-liturgy/mass-schedule",
  })

  const { data = [], isLoading } = useMassTimings()
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")

  // Filter general vs special occasion timings
  const generalTimings = data.filter(
    (item) => !item.intention || item.intention === "GENERAL",
  )

  const specialTimings = data.filter(
    (item) => item.intention && item.intention !== "GENERAL",
  )

  // Extract unique languages for filter pill
  const availableLanguages = Array.from(
    new Set(
      data
        .map((item) => item.language)
        .filter((lang): lang is string => Boolean(lang)),
    ),
  )

  // Filter by selected language
  const filterByLang = (items: MassTiming[]) => {
    if (selectedLanguage === "all") return items
    return items.filter((item) => item.language === selectedLanguage)
  }

  // Daily Mass (weekday/today) vs Sunday Mass
  const dailyMass = filterByLang(
    generalTimings.filter(
      (item) => item.dayGroup === "weekday" || item.dayGroup === "today",
    ),
  )

  const sundayMass = filterByLang(
    generalTimings.filter((item) => item.dayGroup === "sunday"),
  )

  // Group timings by language
  const groupByLanguage = (items: MassTiming[]) => {
    const map = new Map<string, MassTiming[]>()
    for (const item of items) {
      const lang = item.language || "General"
      if (!map.has(lang)) {
        map.set(lang, [])
      }
      map.get(lang)!.push(item)
    }
    return Array.from(map.entries())
  }

  return (
    <>
      <ParishPageHeader
        title="Mass Schedule"
        subtitle="Plan your week around prayer, Eucharistic celebration, and special parish intentions."
        image="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80"
      />

      <PageShell className="space-y-12 py-12 md:py-16">
        {/* Language Filter Bar */}
        {availableLanguages.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Globe2 className="size-4 text-brass" />
              <span>Filter by Language:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={selectedLanguage === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage("all")}
                className="text-xs uppercase tracking-wider"
              >
                All Languages
              </Button>
              {availableLanguages.map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang)}
                  className="text-xs uppercase tracking-wider"
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Special Occasion Section */}
        {specialTimings.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 text-brass" />
              <h2 className="font-heading text-walnut text-2xl md:text-3xl dark:text-parchment">
                Special Occasions & Intentions
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {specialTimings.map((item) => (
                <Card
                  key={item.id}
                  className="border-brass/50 bg-card overflow-hidden shadow-md transition-all hover:border-brass"
                >
                  <div className="grid gap-0 sm:grid-cols-[12rem_1fr]">
                    {item.image ? (
                      <div className="bg-walnut/10 relative h-48 w-full overflow-hidden sm:h-full">
                        <img
                          src={item.image}
                          alt={item.label}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="from-black/60 absolute inset-0 bg-gradient-to-t to-transparent sm:hidden" />
                      </div>
                    ) : (
                      <div className="bg-primary/10 text-primary flex h-48 w-full items-center justify-center sm:h-full">
                        <Church className="size-12 opacity-40" />
                      </div>
                    )}

                    <CardContent className="flex flex-col justify-between p-6">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="bg-brass text-walnut text-[0.65rem] font-semibold tracking-widest uppercase">
                            {item.intention}
                          </Badge>
                          {item.language && (
                            <Badge
                              variant="outline"
                              className="border-primary/40 text-primary text-[0.65rem] uppercase"
                            >
                              {item.language}
                            </Badge>
                          )}
                        </div>

                        <h3 className="font-heading text-walnut text-xl dark:text-parchment">
                          {item.label}
                        </h3>

                        {item.description && (
                          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="border-border text-muted-foreground mt-4 flex items-center justify-between border-t pt-4 text-xs">
                        <span className="flex items-center gap-1.5 font-medium">
                          <CalendarDays className="text-brass size-3.5" />
                          {item.date || "Special Liturgy"}
                        </span>
                        <span className="text-primary flex items-center gap-1 text-base font-bold">
                          <Clock3 className="size-4" />
                          {item.time}
                        </span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* General Mass Schedule — Desktop Two-Column Layout */}
        <section className="space-y-8">
          <div className="mx-auto max-w-2xl text-center space-y-2">
            <h2 className="font-heading text-walnut text-3xl sm:text-4xl dark:text-parchment">
              MASS TIMINGS
            </h2>
            <div
              className="ornament-divider text-brass mx-auto w-24"
              aria-hidden="true"
            />
            <p className="text-muted-foreground text-sm">
              General weekly liturgical timetable at St. Mary of Grace Parish
            </p>
          </div>

          {isLoading ? (
            <div className="text-muted-foreground py-12 text-center">
              Loading Mass schedule...
            </div>
          ) : (
            <Card className="border-brass/40 bg-card overflow-hidden shadow-lg">
              <CardContent className="p-6 md:p-10">
                <div className="grid gap-10 md:grid-cols-2 md:divide-x md:divide-brass/30">
                  {/* Column 1: Daily Mass */}
                  <div className="space-y-6">
                    <div className="border-brass/30 border-b pb-4">
                      <h3 className="font-heading text-primary text-2xl font-bold tracking-tight">
                        DAILY MASS
                      </h3>
                      <p className="text-brass mt-1 text-xs font-semibold tracking-widest uppercase">
                        (Monday – Saturday)
                      </p>
                    </div>

                    {dailyMass.length === 0 ? (
                      <p className="text-muted-foreground text-sm italic">
                        No weekday Mass timings listed for this selection.
                      </p>
                    ) : (
                      <div className="space-y-6">
                        {groupByLanguage(dailyMass).map(([lang, items]) => (
                          <div key={lang} className="space-y-3">
                            <h4 className="text-walnut border-brass border-l-2 pl-2.5 text-xs font-bold uppercase tracking-wider dark:text-parchment">
                              {lang}
                            </h4>
                            <ul className="space-y-2">
                              {items.map((item) => (
                                <li
                                  key={item.id}
                                  className="bg-muted/40 hover:bg-muted/70 flex items-center justify-between rounded-md px-3.5 py-2 text-sm transition-colors"
                                >
                                  <span className="text-foreground font-medium">
                                    {item.label}
                                  </span>
                                  <span className="text-primary font-mono font-bold">
                                    {item.time}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Column 2: Sunday Mass */}
                  <div className="space-y-6 md:pl-10">
                    <div className="border-brass/30 border-b pb-4">
                      <h3 className="font-heading text-primary text-2xl font-bold tracking-tight">
                        SUNDAY MASS
                      </h3>
                      <p className="text-brass mt-1 text-xs font-semibold tracking-widest uppercase">
                        (Eucharistic Day of Obligation)
                      </p>
                    </div>

                    {sundayMass.length === 0 ? (
                      <p className="text-muted-foreground text-sm italic">
                        No Sunday Mass timings listed for this selection.
                      </p>
                    ) : (
                      <div className="space-y-6">
                        {groupByLanguage(sundayMass).map(([lang, items]) => (
                          <div key={lang} className="space-y-3">
                            <h4 className="text-walnut border-brass border-l-2 pl-2.5 text-xs font-bold uppercase tracking-wider dark:text-parchment">
                              {lang}
                            </h4>
                            <ul className="space-y-2">
                              {items.map((item) => (
                                <li
                                  key={item.id}
                                  className="bg-muted/40 hover:bg-muted/70 flex items-center justify-between rounded-md px-3.5 py-2 text-sm transition-colors"
                                >
                                  <span className="text-foreground font-medium">
                                    {item.label}
                                  </span>
                                  <span className="text-primary font-mono font-bold">
                                    {item.time}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </PageShell>
    </>
  )
}
