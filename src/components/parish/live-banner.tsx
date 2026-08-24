import { PlayCircle } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useI18n } from "@/hooks/use-i18n"

export function LiveBanner({ isLive = true }: { isLive?: boolean }) {
  const { t } = useI18n()

  return (
    <section className="border-border/80 bg-card/80 border-y">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div>
          <p className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            {isLive ? t("live.now") : t("live.next")}
          </p>
          <h2 className="font-heading mt-2 text-2xl">
            {isLive ? "Holy Mass" : "Sunday · 8:00 AM"}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            {isLive
              ? "Watch today's celebration with our parish community."
              : "Join us in person or online for the next Eucharistic celebration."}
          </p>
        </div>
        <Button
          render={
            <Link
              to={
                isLive
                  ? "/prayer-liturgy/livestream"
                  : "/prayer-liturgy/mass-schedule"
              }
            />
          }
          className="md:justify-self-end"
        >
          <PlayCircle className="mr-2 size-4" />
          {isLive ? "Watch Live" : "View Mass Schedule"}
        </Button>
      </div>
    </section>
  )
}
