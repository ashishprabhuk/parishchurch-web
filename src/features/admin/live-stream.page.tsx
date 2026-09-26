import { Clock3, Link2, Radio, Square } from "lucide-react"
import { useState } from "react"

import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSeo } from "@/hooks/use-seo"
import { extractYouTubeVideoId } from "@/lib/youtube"
import { notify } from "@/lib/toast"
import {
  useEndLiveStream,
  useLiveStream,
  usePublishLiveStream,
} from "@/features/parish"
import type { LiveStream } from "@/features/parish"

function LiveStreamForm({ current }: { current?: LiveStream }) {
  const [youtubeUrl, setYouTubeUrl] = useState(
    current ? `https://www.youtube.com/watch?v=${current.youtubeVideoId}` : "",
  )
  const [title, setTitle] = useState(current?.title ?? "Holy Mass")
  const publishMutation = usePublishLiveStream()
  const videoId = extractYouTubeVideoId(youtubeUrl)
  const hasInvalidUrl = youtubeUrl.trim().length > 0 && !videoId

  const onSubmit = async () => {
    if (!videoId) {
      notify.error("Please enter a valid YouTube video or live-stream URL.")
      return
    }
    if (!title.trim()) {
      notify.error("Mass title is required.")
      return
    }

    try {
      await publishMutation.mutateAsync({
        youtubeVideoId: videoId,
        title: title.trim(),
      })
      notify.success(current ? "Live Mass updated." : "Live Mass started.")
    } catch {
      notify.error("Could not publish the live Mass.")
    }
  }

  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="font-heading text-xl">
          {current ? "Update live broadcast" : "Start a live broadcast"}
        </CardTitle>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Paste a YouTube watch, youtu.be, or live URL. Only the video ID is
          stored; YouTube handles the video stream.
        </p>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="live-youtube-url">YouTube Live URL</Label>
          <Input
            id="live-youtube-url"
            value={youtubeUrl}
            placeholder="https://www.youtube.com/watch?v=ABC123XYZ"
            onChange={(event) => setYouTubeUrl(event.target.value)}
            aria-invalid={hasInvalidUrl}
          />
          {hasInvalidUrl ? (
            <p className="text-destructive text-sm">
              Please enter a valid YouTube video or live-stream URL.
            </p>
          ) : null}
          {videoId ? (
            <p className="text-muted-foreground flex items-center gap-2 text-xs">
              <Link2 className="size-3.5" /> Video ID: {videoId}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="live-mass-title">Mass title</Label>
          <Input
            id="live-mass-title"
            value={title}
            placeholder="Holy Mass"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <Button
          className="w-fit"
          disabled={publishMutation.isPending || hasInvalidUrl}
          onClick={() => void onSubmit()}
        >
          <Radio className="size-4" />
          {publishMutation.isPending
            ? "Publishing..."
            : current
              ? "Update Live"
              : "Start Live"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function LiveStreamAdminPage() {
  useSeo({
    title: "Live Mass | Parish Admin",
    description: "Publish and manage the parish YouTube Live Mass.",
    canonicalPath: "/admin/live",
  })

  const { data: stream, isLoading, isError, refetch } = useLiveStream()
  const endMutation = useEndLiveStream()

  const onEnd = async () => {
    try {
      await endMutation.mutateAsync()
      notify.success("Live Mass ended.")
    } catch {
      notify.error("Could not end the live Mass.")
    }
  }

  if (isLoading) return <LoadingState label="Loading live Mass settings..." />
  if (isError) {
    return (
      <ErrorState
        title="Live Mass settings are unavailable"
        description="We could not load the current broadcast status."
        onRetry={() => void refetch()}
      />
    )
  }

  const activeStream = stream?.isLive ? stream : undefined

  return (
    <div className="space-y-6">
      <div>
        <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
          Broadcast control
        </p>
        <h1 className="font-heading mt-2 text-2xl sm:text-3xl">Live Mass</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl text-sm leading-relaxed">
          Publish the current YouTube Live Mass for visitors on the homepage and
          the public Live Mass page.
        </p>
      </div>

      {activeStream ? (
        <Card className="border-rose-300/70 bg-rose-50/50 dark:bg-rose-950/20">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-300">
                <span className="size-2.5 rounded-full bg-rose-600" /> LIVE NOW
              </div>
              <h2 className="font-heading mt-2 text-2xl">{activeStream.title}</h2>
              <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                <Clock3 className="size-4" /> Started {new Date(activeStream.startedAt).toLocaleString()}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                YouTube video ID: {activeStream.youtubeVideoId}
              </p>
            </div>
            <ConfirmDialog
              trigger={
                <Button variant="destructive" disabled={endMutation.isPending}>
                  <Square className="size-4" /> End Live
                </Button>
              }
              title="End the current live stream?"
              description="Visitors will immediately see the offline state instead of the YouTube player."
              onConfirm={() => void onEnd()}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="border-border/70 bg-muted/30 flex items-center gap-3 border p-4 text-sm">
          <span className="size-2.5 rounded-full bg-muted-foreground/50" />
          No live broadcast is currently published.
        </div>
      )}

      <LiveStreamForm key={activeStream?.id ?? "offline"} current={activeStream} />
    </div>
  )
}
