import { describe, expect, it } from "vitest"

import { extractYouTubeVideoId, getYouTubeEmbedUrl } from "@/lib/youtube"

describe("extractYouTubeVideoId", () => {
  it.each([
    "https://www.youtube.com/watch?v=ABC123XYZ00",
    "https://youtu.be/ABC123XYZ00",
    "https://www.youtube.com/live/ABC123XYZ00",
    "https://www.youtube.com/embed/ABC123XYZ00",
  ])("extracts an ID from %s", (url) => {
    expect(extractYouTubeVideoId(url)).toBe("ABC123XYZ00")
  })

  it("accepts a raw video ID", () => {
    expect(extractYouTubeVideoId("ABC123XYZ00")).toBe("ABC123XYZ00")
  })

  it.each([
    "",
    "https://example.com/watch?v=ABC123XYZ00",
    "https://www.youtube.com/watch?v=too-short",
    "not a url",
  ])("rejects %s", (value) => {
    expect(extractYouTubeVideoId(value)).toBeNull()
  })
})

describe("getYouTubeEmbedUrl", () => {
  it("creates an embed URL from a video ID", () => {
    expect(getYouTubeEmbedUrl("ABC123XYZ00")).toBe(
      "https://www.youtube.com/embed/ABC123XYZ00",
    )
  })
})
