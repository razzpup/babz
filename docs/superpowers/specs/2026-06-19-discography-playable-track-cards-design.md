# Discography Playable Track Cards

**Date:** 2026-06-19
**Status:** Approved

## Overview

Replace the discography page's decorative "album cards" and standalone Spotify mini-player with real, playable Spotify embeds presented through the site's existing "glare card" (`CometCard`) UI — both in the Releases grid and on the Eternal album cover itself. Supersedes the discography-page portion of the 2026-06-19 Spotify Mini Player work (the homepage placement from that spec is unaffected and stays as-is).

## Real Track Data

Resolved via Spotify's public oEmbed endpoint (`https://open.spotify.com/oembed?url=...`), no auth required:

| Track ID | Real title | Replaces |
|---|---|---|
| `0m5DrGT4mIgJJfbZN7lpAX` | Feeling So Lost | Vortex |
| `0a7dgof68YTmk0kxxwB6mf` | Malice | Malice (name unchanged, becomes real) |
| `4SmvO2gyjg6pt6SWY8XOPr` | Psychedelic Stare | Janus |
| `6FoQlSQzZCXJDafspwHsN0` | Eternal Life | the Eternal album cover (`app/discography/page.tsx` Eternal section) |

## Changes

### 1. New file: `app/components/PlayableTrackCard.tsx`

A presentational component wrapping the existing `CometCard` (`components/ui/comet-card.tsx` — 3D tilt + glare-on-hover) around album art and a title, with Spotify's official compact embed iframe as an always-visible footer (play/pause/progress/volume — no extra click to reveal it).

```ts
interface PlayableTrackCardProps {
  title: string;
  image: string;
  trackId: string;
  color?: string; // gradient overlay classes over the art, e.g. "from-purple-600/20 to-blue-600/20"; omit for no tint (cn() drops falsy classes, so an undefined color renders the overlay div with no gradient classes — a harmless no-op tint, not a broken className)
  sizeClassName?: string; // wrapper + art sizing; defaults to "w-80" (grid usage)
}
```

Renders (adapted from the current `comet-card-demo2.tsx` card markup):
- `CometCard` > `motion.div` (same `initial`/`whileInView`/`whileHover` entrance as today, `className` includes `sizeClassName` in place of today's hardcoded `w-80`) > art container (`w-full aspect-square rounded-2xl bg-zinc-900 overflow-hidden` — always square, sized from the wrapper's width rather than a second hardcoded dimension) with the `<img>` (`object-cover`, hover scale/rotate) and the gradient overlay (`color`)

  **Sizing note:** the art is a plain `<img>` with no `width`/`height` attributes (matching the existing grid-card pattern, needed for the 3D tilt transform), so it has no intrinsic size of its own — it is sized entirely by its `aspect-square` parent. That parent in turn is sized by the outer wrapper's `sizeClassName`. This means `sizeClassName` must always resolve to a concrete width at every breakpoint — never `w-auto` (which has nothing to size against here and would collapse to 0). Grid usage: `"w-80"`. Eternal-cover usage: `"w-full max-w-xs lg:max-w-[480px]"` (full-width capped at `max-w-xs` on mobile, capped at `480px` — matching the image's original `next/image` dimensions — on desktop instead of unbounded growth).
- Drops the decorative hover play-button overlay and the year badge — both become misleading once the card plays a real track (no real "year" data, and a fake play button next to a real one is confusing)
- Below the art: `<h3>` title (same styling as today), then a `rounded-xl bg-zinc-900 border border-white/5 overflow-hidden` wrapper containing the Spotify iframe: `src="https://open.spotify.com/embed/track/{trackId}?utm_source=generator&theme=0"`, `width="100%"`, `height="80"`, `title={\`Spotify player: ${title}\`}` (satisfies `jsx-a11y/iframe-has-title`), `allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"`, `loading="lazy"`
- No `'use client'` directive (no hooks/state) — same rationale as `SpotifyMiniPlayer`

### 2. Rewrite `app/components/comet-card-demo2.tsx`

Replace the `albums` array (Vortex/Malice/Janus, fake years/track-counts) with a `tracks` array of the 3 real tracks above, keeping the existing local art files (no new assets, no `next.config.ts` changes):

```ts
const tracks = [
  { title: "Feeling So Lost", image: "/feelingsolostthumbnail.jpg", trackId: "0m5DrGT4mIgJJfbZN7lpAX", color: "from-purple-600/20 to-blue-600/20" },
  { title: "Malice", image: "/pic1.webp", trackId: "0a7dgof68YTmk0kxxwB6mf", color: "from-red-600/20 to-purple-600/20" },
  { title: "Psychedelic Stare", image: "/professional3.webp", trackId: "4SmvO2gyjg6pt6SWY8XOPr", color: "from-purple-600/20 to-pink-600/20" },
];
```

The component body becomes a thin map over `tracks` rendering `<PlayableTrackCard key={track.title} {...track} />` inside the same `flex flex-wrap justify-center items-center gap-12 w-full px-6` container. Drops the unused `useRouter` (pre-existing unused-var lint warning, naturally resolved since the rewritten component has no use for it), `Play`, `Disc`, and `Music` imports — none of that markup survives the rewrite.

### 3. `app/discography/page.tsx` — remove the Task 3 standalone player, replace the Eternal cover

Remove the `<div className="max-w-md mb-16"><SpotifyMiniPlayer ... /></div>` block added for "FEATURED SINGLE" (now redundant — Feeling So Lost plays from the grid) and its now-unused `SpotifyMiniPlayer` import from this file (the import in `app/page.tsx` for the homepage placement is untouched).

Replace the Eternal Album section's static cover:

```tsx
<Image
  src="/eternal.webp"
  alt="ETERNAL Album Cover"
  width={480}
  height={480}
  loading='eager'
  className="w-full lg:w-auto object-cover rounded-3xl shadow-2xl"
/>
```

with:

```tsx
<PlayableTrackCard
  title="Eternal Life"
  image="/eternal.webp"
  trackId="6FoQlSQzZCXJDafspwHsN0"
  sizeClassName="w-full max-w-xs lg:max-w-[480px]"
/>
```

matching the section's original responsive sizing intent (full-width capped at `max-w-xs` on mobile, capped at the image's original 480px dimension on desktop). Import `PlayableTrackCard` from `@/app/components/PlayableTrackCard`. The `Image` import in this file stays (still used by the Artist Picture and footer social icons).

## Constraints

- No new npm dependencies, no `next.config.ts` changes (no external image hosts added) — card art stays local; Spotify's iframe shows its own authoritative art/title.
- Visual language stays consistent with the rest of the site: `rounded-2xl`/`rounded-xl`, `bg-zinc-900`, `border-white/5`, `#a00c30` accents.
- `CometCard`'s glare overlay div has `pointer-events-none`, so it won't block clicks on the embedded iframe's controls.
- This supersedes the discography-page changes from `2026-06-19-spotify-mini-player-design.md` (Task 3); the homepage changes from that spec (Tasks 1-2) are unaffected and remain in place.
