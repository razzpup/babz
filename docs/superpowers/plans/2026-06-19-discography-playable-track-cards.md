# Discography Playable Track Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the discography page's decorative album cards and standalone Spotify mini-player with real, playable Spotify embeds presented through the site's existing "glare card" (`CometCard`) UI — in the Releases grid and on the Eternal album cover.

**Architecture:** One new presentational component (`PlayableTrackCard`) wraps the existing `CometCard` 3D-tilt/glare effect around album art and an always-visible Spotify compact-embed play bar. It replaces the current `comet-card-demo2.tsx` cards (rewritten to use 3 real tracks) and the Eternal section's static image (`app/discography/page.tsx`), and removes the now-redundant standalone mini-player block added by the prior Spotify-mini-player plan.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Framer Motion (`motion/react`). No new dependencies.

## Global Constraints

- No new npm dependencies, no `next.config.ts` changes — card art stays local; Spotify's iframe shows its own authoritative art/title.
- Visual language matches the rest of the site: `rounded-2xl`/`rounded-xl`, `bg-zinc-900`, `border-white/5`, `#a00c30` accents.
- This codebase has **no test framework configured** (no Jest/Vitest/Playwright, no `test` script in `package.json`). Verification for every task is: `npx tsc --noEmit` compiles cleanly, and a manual check (browser or headless-Chrome screenshot at desktop and mobile widths) confirms the rendered result.
- ESLint uses `eslint-config-next/core-web-vitals`, which includes `jsx-a11y/iframe-has-title` — every `<iframe>` needs a `title` attribute.
- **Sizing rule for the new component:** its art `<img>` has no `width`/`height` attributes (needed so the 3D tilt transform in `CometCard` works the same way it already does for the existing grid cards), so it has zero intrinsic size and is sized entirely by its CSS parent via `aspect-square`. Any `sizeClassName` passed into the component must resolve to a concrete width at every breakpoint — **never `w-auto`**, which has nothing to size against here and collapses to 0 width.
- Real track data (from Spotify's public oEmbed endpoint, already resolved — no need to re-fetch):

  | Track ID | Real title | Used for |
  |---|---|---|
  | `0m5DrGT4mIgJJfbZN7lpAX` | Feeling So Lost | Releases grid card (replaces "Vortex") |
  | `0a7dgof68YTmk0kxxwB6mf` | Malice | Releases grid card (replaces "Malice") |
  | `4SmvO2gyjg6pt6SWY8XOPr` | Psychedelic Stare | Releases grid card (replaces "Janus") |
  | `6FoQlSQzZCXJDafspwHsN0` | Eternal Life | Eternal album cover |

---

### Task 1: Create the `PlayableTrackCard` component

**Files:**
- Create: `app/components/PlayableTrackCard.tsx`

**Interfaces:**
- Produces: `export default function PlayableTrackCard({ title, image, trackId, color, sizeClassName, delay }: { title: string; image: string; trackId: string; color?: string; sizeClassName?: string; delay?: number })`. `sizeClassName` defaults to `"w-80"`. `delay` defaults to `0`.

- [ ] **Step 1: Write the component**

```tsx
import { CometCard } from "@/components/ui/comet-card";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PlayableTrackCardProps {
  title: string;
  image: string;
  trackId: string;
  color?: string;
  sizeClassName?: string;
  delay?: number;
}

export default function PlayableTrackCard({
  title,
  image,
  trackId,
  color,
  sizeClassName = "w-80",
  delay = 0,
}: PlayableTrackCardProps) {
  return (
    <CometCard>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -10 }}
        className={cn("group relative", sizeClassName)}
      >
        {/* Art */}
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-zinc-900">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 opacity-80 group-hover:opacity-100"
          />
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-t opacity-60 transition-opacity group-hover:opacity-80",
              color
            )}
          />
        </div>

        {/* Title + Player */}
        <div className="mt-8">
          <h3 className="text-3xl font-black group-hover:text-[#a00c30] transition-colors">
            {title}
          </h3>
          <div className="mt-4 rounded-xl bg-zinc-900 border border-white/5 overflow-hidden">
            <iframe
              title={`Spotify player: ${title}`}
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              style={{ display: "block" }}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </CometCard>
  );
}
```

No `'use client'` directive needed at the top of this file in isolation, but note `CometCard` (`components/ui/comet-card.tsx`) and `motion/react` both require a client boundary — this file will always be imported from files that are already `'use client'` (`comet-card-demo2.tsx`, `app/discography/page.tsx`), so this is fine without adding the directive here too.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `PlayableTrackCard.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/components/PlayableTrackCard.tsx
git commit -m "Add PlayableTrackCard component"
```

---

### Task 2: Rewrite `comet-card-demo2.tsx` to use real tracks

**Files:**
- Modify: `app/components/comet-card-demo2.tsx` (full-file rewrite)

**Interfaces:**
- Consumes: `PlayableTrackCard` from `@/app/components/PlayableTrackCard` (Task 1) — props `{ title, image, trackId, color?, sizeClassName?, delay? }`.

- [ ] **Step 1: Replace the entire file contents**

Current file (`app/components/comet-card-demo2.tsx`) is the `albums` array + inline `CometCard` JSX with a `useRouter` import that's already unused (pre-existing lint warning). Replace its *entire contents* with:

```tsx
import PlayableTrackCard from "@/app/components/PlayableTrackCard";

const tracks = [
  {
    title: "Feeling So Lost",
    image: "/feelingsolostthumbnail.jpg",
    trackId: "0m5DrGT4mIgJJfbZN7lpAX",
    color: "from-purple-600/20 to-blue-600/20",
  },
  {
    title: "Malice",
    image: "/pic1.webp",
    trackId: "0a7dgof68YTmk0kxxwB6mf",
    color: "from-red-600/20 to-purple-600/20",
  },
  {
    title: "Psychedelic Stare",
    image: "/professional3.webp",
    trackId: "4SmvO2gyjg6pt6SWY8XOPr",
    color: "from-purple-600/20 to-pink-600/20",
  },
];

export default function CometCardDemo2() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-12 w-full px-6">
      {tracks.map((track, index) => (
        <PlayableTrackCard key={track.title} {...track} delay={index * 0.2} />
      ))}
    </div>
  );
}
```

This drops the `CometCard`, `motion`, `useRouter`, `Play`/`Disc`/`Music`, and `cn` imports entirely — none of that markup survives the rewrite; `PlayableTrackCard` (Task 1) owns all of it internally now.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `comet-card-demo2.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/components/comet-card-demo2.tsx
git commit -m "Rewrite comet-card-demo2 to use real playable tracks"
```

---

### Task 3: Update the discography page — remove the old mini-player, wire up the Eternal cover

**Files:**
- Modify: `app/discography/page.tsx`

**Interfaces:**
- Consumes: `PlayableTrackCard` from `@/app/components/PlayableTrackCard` (Task 1) — props `{ title, image, trackId, sizeClassName? }`.

- [ ] **Step 1: Swap the import**

Find:

```tsx
import SpotifyMiniPlayer from '@/app/components/SpotifyMiniPlayer';
```

Replace with:

```tsx
import PlayableTrackCard from '@/app/components/PlayableTrackCard';
```

(This file no longer uses `SpotifyMiniPlayer` after Step 2 below — `app/page.tsx`'s import of it for the homepage is untouched and out of scope for this task.)

- [ ] **Step 2: Replace the Eternal Album cover**

Find this block in the Eternal Album Section:

```tsx
              {/* Album Cover */}
              <div className="flex-1 shrink-0 w-full lg:w-auto max-w-xs lg:max-w-none">
                <Image
                  src="/eternal.webp" 
                  alt="ETERNAL Album Cover"
                  width={480}
                  height={480}
                  loading='eager'
                  className="w-full lg:w-auto object-cover rounded-3xl shadow-2xl"
                />
              </div>
```

Replace with:

```tsx
              {/* Album Cover */}
              <div className="flex-1 shrink-0">
                <PlayableTrackCard
                  title="Eternal Life"
                  image="/eternal.webp"
                  trackId="6FoQlSQzZCXJDafspwHsN0"
                  sizeClassName="w-full max-w-xs lg:max-w-[480px]"
                />
              </div>
```

Note the wrapper `<div>` drops `w-full lg:w-auto max-w-xs lg:max-w-none` — those classes existed to size the old `next/image` `Image` (which has an intrinsic 480×480 size baked into its HTML attributes). `PlayableTrackCard`'s `sizeClassName` now owns all of that responsive sizing instead (see the Global Constraints sizing rule — this is exactly the `w-auto`-collapse case it warns about, so the old class doesn't carry over).

- [ ] **Step 3: Remove the standalone "FEATURED SINGLE" block**

Find this block in the Releases/Singles Section:

```tsx
            <div className="max-w-md mb-16">
              <SpotifyMiniPlayer trackId="0m5DrGT4mIgJJfbZN7lpAX" label="FEATURED SINGLE" />
            </div>

            <div>
              <CometCardDemo2 />
            </div>
```

Replace with:

```tsx
            <div>
              <CometCardDemo2 />
            </div>
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `app/discography/page.tsx`.

- [ ] **Step 5: Commit**

```bash
git add app/discography/page.tsx
git commit -m "Wire PlayableTrackCard into discography page, drop standalone mini-player"
```

---

### Task 4: Full-flow verification

**Files:** none (verification only)

- [ ] **Step 1: Lint check**

Run: `npm run lint`
Expected: no new errors/warnings referencing `PlayableTrackCard.tsx`, `comet-card-demo2.tsx`, or `app/discography/page.tsx`. (The pre-existing unused-`router` warning in `comet-card-demo2.tsx` should be gone now, since that file no longer imports `useRouter` at all.)

- [ ] **Step 2: Visual check on the discography page, both breakpoints**

With the dev server running, open `/discography` at desktop width and at mobile width (≤390px):
- Eternal Album section: the cover art still has the tilt/glare hover effect (desktop only, since hover doesn't apply on touch), and underneath it a working Spotify play bar for "Eternal Life" — no horizontal overflow at either width.
- Releases section: the "FEATURED SINGLE" block is gone. The grid shows exactly 3 cards — "Feeling So Lost", "Malice", "Psychedelic Stare" — each with art, a title, and a working Spotify play bar underneath. No leftover year badges or "X Tracks" text.
- Click play on at least one embedded player and confirm Spotify's widget responds (button reflects play/pause state) — the embedded iframe's own controls must remain clickable through the `CometCard` wrapper (its glare overlay is `pointer-events-none`, so this should work, but confirm rather than assume).

- [ ] **Step 3: Confirm the homepage is unaffected**

Open `/` and confirm the "LISTEN NOW" / Feeling So Lost mini-player added by the prior plan (under the Feeling So Lost teaser in the Featured section) is still present and unchanged — this task only touched the discography page and `comet-card-demo2.tsx`.

- [ ] **Step 4: Confirm no regressions to earlier session work**

Check that the homepage hero's icon sidebar remains removed, and that the discography artist photo (`professional2.webp`) is still horizontally centered on mobile width.
