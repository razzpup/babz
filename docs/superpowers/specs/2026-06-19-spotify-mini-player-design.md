# Spotify Mini Player

**Date:** 2026-06-19
**Status:** Approved

## Overview

Embed a Spotify track as a small, branded "mini player" in two places: the homepage Featured section and the discography Releases section.

## Scope

- Single track: `0m5DrGT4mIgJJfbZN7lpAX` (from `https://open.spotify.com/track/0m5DrGT4mIgJJfbZN7lpAX`)
- Uses Spotify's official compact oEmbed iframe — no API keys, no Web Playback SDK/auth
- One shared component reused on both pages

## Changes

### 1. New file: `app/components/SpotifyMiniPlayer.tsx`

A `'use client'` component (iframe embeds need no client logic, but kept consistent with sibling components) accepting:

```ts
{ trackId: string; label?: string } // label defaults to "LISTEN NOW"
```

Renders:
- A small uppercase label (e.g. "LISTEN NOW") in the site's `#a00c30` accent, matching existing section/badge typography
- Below it, a card: `rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden`, containing
  `<iframe src="https://open.spotify.com/embed/track/{trackId}?utm_source=generator&theme=0" width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />`

No playback state, no custom controls — Spotify's widget handles play/pause/progress/volume itself.

### 2. `app/page.tsx` — Featured section

Insert `<SpotifyMiniPlayer trackId="0m5DrGT4mIgJJfbZN7lpAX" />` inside the `lg:col-span-4` side column, directly after the "FEELING SO LOST TEASER" thumbnail block and before the "VIEW ALL VIDEOS" link (which keeps its `mt-auto`).

### 3. `app/discography/page.tsx` — Releases section

Insert `<SpotifyMiniPlayer trackId="0m5DrGT4mIgJJfbZN7lpAX" />` inside the `RELEASES` section, above the `<CometCardDemo2 />` grid, within the existing `max-w-7xl` container.

## Constraints

- No new dependencies — plain `<iframe>`, matching the rest of the site's media patterns (`<video>` tags, no SDKs)
- Iframe is presentational only; no postMessage/SDK integration, no autoplay (browsers block unmuted iframe autoplay anyway)
- Visual language must match existing cards: `rounded-2xl`/`rounded-3xl`, `bg-zinc-900`, `border-white/5`, `#a00c30` accents — same as `CometCardDemo2` and the video gallery cards
