const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

export function extractYouTubeVideoId(value: string): string | null {
  const input = value.trim()
  if (!input) return null

  if (YOUTUBE_VIDEO_ID_PATTERN.test(input)) {
    return input
  }

  try {
    const url = new URL(input)
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "")

    if (hostname === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0]
      return id && YOUTUBE_VIDEO_ID_PATTERN.test(id) ? id : null
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const watchId = url.searchParams.get("v")
      if (watchId && YOUTUBE_VIDEO_ID_PATTERN.test(watchId)) {
        return watchId
      }

      const pathParts = url.pathname.split("/").filter(Boolean)
      const pathId =
        pathParts[0] === "live" ||
        pathParts[0] === "embed" ||
        pathParts[0] === "shorts"
          ? pathParts[1]
          : undefined
      return pathId && YOUTUBE_VIDEO_ID_PATTERN.test(pathId) ? pathId : null
    }
  } catch {
    return null
  }

  return null
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`
}