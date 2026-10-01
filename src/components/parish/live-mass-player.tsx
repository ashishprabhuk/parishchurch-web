import { ExternalLink } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LiveMassStatus } from "@/components/parish/live-mass-status"
import { YouTubeEmbed } from "@/components/parish/youtube-embed"
import type { LiveStream } from "@/features/parish"

export function LiveMassPlayer({
  stream,
  showPageLink = true,
}: {
  stream: LiveStream
  showPageLink?: boolean
}) {
  return (
    <Card className="border-primary/25 bg-card/90 overflow-hidden">
      <CardHeader className="gap-3 p-5 sm:p-6">
        <LiveMassStatus />
        <CardTitle className="font-heading text-2xl sm:text-3xl">
          {stream.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-0">
        <div className="bg-ink aspect-video overflow-hidden">
          <YouTubeEmbed videoId={stream.youtubeVideoId} title={stream.title} />
        </div>
        <div className="flex flex-col gap-4 px-5 pb-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pb-6">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Watch the Holy Mass live with our parish community.
          </p>
          {showPageLink ? (
            <ButtonLink
              to="/prayer-liturgy/livestream"
              variant="outline"
              className="border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground w-fit shrink-0"
            >
              Full live page <ExternalLink className="size-4" />
            </ButtonLink>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
