import { PlayCircle } from "lucide-react"

import { EmptyState } from "@/components/feedback/empty-state"
import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { LiveMassPlayer } from "@/components/parish/live-mass-player"
import { PageShell } from "@/components/parish/page-shell"
import { ButtonLink } from "@/components/ui/button"
import { useLiveStream } from "@/features/parish"

const youtubeChannelUrl = "https://youtube.com/"

export function LiveMassView({
  compact = false,
}: {
  compact?: boolean
}) {
  const { data: stream, isLoading, isError, refetch } = useLiveStream()

  return (
    <PageShell className={compact ? "py-12" : "py-14 md:py-20"}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="editorial-label">Live Mass</p>
          <h1 className="font-heading text-walnut mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">
            Pray with us online.
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-relaxed">
            Join the parish community for Holy Mass when a live broadcast is
            active.
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
        {!isLoading && !isError && !stream?.isLive ? (
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
          <ButtonLink
            to="/prayer-liturgy/mass-schedule"
            variant="outline"
            className="border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View Mass timings
          </ButtonLink>
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:text-brass inline-flex h-10 items-center gap-2 px-1 text-xs font-semibold tracking-[0.1em] uppercase"
          >
            <PlayCircle className="size-4" /> YouTube channel
          </a>
        </div>
      </div>
    </PageShell>
  )
}
