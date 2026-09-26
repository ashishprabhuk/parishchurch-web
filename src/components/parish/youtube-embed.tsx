import { useState } from "react"

import { getYouTubeEmbedUrl } from "@/lib/youtube"

export function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string
  title: string
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="bg-muted text-muted-foreground grid aspect-video place-items-center p-6 text-center text-sm">
        This YouTube video is currently unavailable. Please try again shortly.
      </div>
    )
  }

  return (
    <iframe
      className="aspect-video h-full w-full"
      src={getYouTubeEmbedUrl(videoId)}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      onError={() => setHasError(true)}
    />
  )
}
