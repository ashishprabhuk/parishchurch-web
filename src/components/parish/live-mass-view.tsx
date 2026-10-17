import { CalendarDays, Clock, ExternalLink, PlayCircle, Radio } from "lucide-react"

import { EmptyState } from "@/components/feedback/empty-state"
import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { LiveMassPlayer } from "@/components/parish/live-mass-player"
import { PageShell } from "@/components/parish/page-shell"
import { Badge } from "@/components/ui/badge"
import { Button, ButtonLink } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatChurchDateTime, useLiveStream } from "@/features/parish"

const youtubeChannelUrl =
  "https://youtube.com/@ourladyoffatimachurch1544?si=Wk4vjX68G45wjNSu"

export function LiveMassView({ compact = false }: { compact?: boolean }) {
  const {
    data: stream,
    upcomingMass,
    countdown,
    isLoading,
    isError,
    refetch,
  } = useLiveStream()

  return (
    <PageShell className={compact ? "py-12" : "py-14 md:py-20"}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="editorial-label">Live Mass</p>
          <h1 className="font-heading text-walnut mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">
            Pray with us online.
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-relaxed">
            Join the parish community for Holy Mass when a live broadcast is active.
          </p>
        </div>

        {isLoading ? <LoadingState label="Checking live Mass status..." /> : null}

        {isError ? (
          <ErrorState
            title="Live Mass is unavailable"
            description="We could not check the current broadcast status."
            onRetry={() => void refetch()}
          />
        ) : null}

        {!isLoading && !isError && stream?.isLive ? (
          <LiveMassPlayer stream={stream} showPageLink={false} />
        ) : null}

        {!isLoading && !isError && !stream?.isLive && upcomingMass ? (
          <Card className="border-brass/50 bg-card/90 shadow-md">
            <CardHeader className="gap-3 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="outline" className="border-brass/70 text-brass gap-1.5 uppercase tracking-wider">
                  <Radio className="size-3 text-amber-600 animate-pulse" />
                  Upcoming Broadcast
                </Badge>
                {countdown ? (
                  <Badge variant="secondary" className="font-semibold">
                    {countdown}
                  </Badge>
                ) : null}
              </div>
              <CardTitle className="font-heading text-2xl sm:text-3xl text-walnut mt-1">
                {upcomingMass.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-6 pb-6 sm:px-8 sm:pb-8">
              <div className="grid gap-3 sm:grid-cols-2 rounded-lg border border-border/70 bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="size-4 text-primary shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-xs block">Scheduled Time</span>
                    <span className="font-medium">{formatChurchDateTime(upcomingMass.startsAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="size-4 text-primary shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-xs block">Duration</span>
                    <span className="font-medium">{upcomingMass.durationMinutes} minutes</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  This page will automatically switch to the live player when the broadcast begins.
                </p>
                {upcomingMass.youtubeUrl ? (
                  <Button
                    variant="outline"
                    className="w-fit shrink-0 gap-1.5"
                    onClick={() => window.open(upcomingMass.youtubeUrl, "_blank", "noopener,noreferrer")}
                  >
                    Watch on YouTube <ExternalLink className="size-3.5" />
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {!isLoading && !isError && !stream?.isLive && !upcomingMass ? (
          <div className="mx-auto max-w-2xl">
            <EmptyState
              title="There is currently no live Mass"
              description="Please check back during the scheduled Mass time or visit our YouTube channel for recent broadcasts."
              actionLabel="View YouTube channel"
              onAction={() => window.open(youtubeChannelUrl, "_blank", "noopener,noreferrer")}
            />
          </div>
        ) : null}

        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <ButtonLink to="/prayer-liturgy/mass-schedule" variant="outline">
            View Mass timings
          </ButtonLink>
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary inline-flex h-10 items-center gap-2 px-1 text-xs font-semibold uppercase"
          >
            <PlayCircle className="size-4" /> YouTube channel
          </a>
        </div>
      </div>
    </PageShell>
  )
}
