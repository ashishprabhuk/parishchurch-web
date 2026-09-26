# Live Mass API Contract

This frontend expects the existing API service to provide the following live-stream endpoints. The Vite repository does not contain a backend or database migration layer, so this document is the handoff contract for the API implementation.

## Public endpoint

`GET /api/v1/live-stream`

When live:

```json
{
  "isLive": true,
  "id": "live_123",
  "youtubeVideoId": "ABC123XYZ00",
  "title": "Holy Mass",
  "startedAt": "2026-09-26T06:30:00Z",
  "endedAt": null,
  "createdAt": "2026-09-26T06:30:00Z",
  "updatedAt": "2026-09-26T06:30:00Z"
}
```

When offline:

```json
{ "isLive": false }
```

## Protected admin endpoints

Both endpoints must authenticate the request and verify the authenticated user's admin role on the server. Do not rely on a frontend role flag.

- `POST /api/v1/admin/live-stream` with `{ "youtubeVideoId": "...", "title": "..." }`
- `PATCH /api/v1/admin/live-stream` with `{ "isLive": false }`

Starting a stream must deactivate any existing active row before creating or updating the new active row. A database transaction or a partial unique index on active rows should enforce the single-active-stream rule.

## Suggested table

```sql
CREATE TABLE live_streams (
  id UUID PRIMARY KEY,
  youtube_video_id VARCHAR(11) NOT NULL,
  title VARCHAR(200) NOT NULL,
  is_live BOOLEAN NOT NULL DEFAULT FALSE,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX one_active_live_stream
  ON live_streams (is_live)
  WHERE is_live = TRUE;
```

The API should validate that `youtubeVideoId` is an 11-character YouTube ID, normalize the title, and return the active stream shape above. YouTube media is embedded directly in the browser; the API and deployment infrastructure must not proxy or stream the video bytes.

## Frontend fallback

When the API is unavailable during local development, the frontend stores one active demo stream in `localStorage` under `parish-live-stream`. This fallback is not a production persistence mechanism and should disappear automatically once the API responds successfully.
