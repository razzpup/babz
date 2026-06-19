# Spotify Mini Player Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Embed the Spotify track `0m5DrGT4mIgJJfbZN7lpAX` as a small branded "mini player" in the homepage Featured section and the discography Releases section.

**Architecture:** One shared presentational component (`SpotifyMiniPlayer`) wraps Spotify's official compact oEmbed `<iframe>`. No state, no SDK, no API keys — Spotify's widget owns all playback UI. The component is dropped into two existing layouts at fixed insertion points.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4. No new dependencies.

## Global Constraints

- No new npm dependencies — plain `<iframe>`, matching the rest of the site's media patterns (raw `<video>` tags, no SDKs).
- Visual language must match existing cards: `rounded-2xl`, `bg-zinc-900`, `border-white/5`, `#a00c30` accent text — same as `CometCardDemo2` and the video gallery cards (see `app/components/comet-card-demo2.tsx`).
- This codebase has **no test framework configured** (no Jest/Vitest/Playwright, no `test` script in `package.json`). Verification for every task is: dev server compiles with no errors/warnings, and a manual check (browser or headless-Chrome screenshot at both desktop and mobile widths) confirms the rendered result matches the design.
- `next.config` lints with `eslint-config-next/core-web-vitals`, which includes `jsx-a11y/iframe-has-title` — every `<iframe>` needs a `title` attribute.

---

### Task 1: Create the `SpotifyMiniPlayer` component

**Files:**
- Create: `app/components/SpotifyMiniPlayer.tsx`

**Interfaces:**
- Produces: `export default function SpotifyMiniPlayer({ trackId, label }: { trackId: string; label?: string })` — a JSX element, no return value consumed beyond rendering. `label` defaults to `"LISTEN NOW"`.

- [ ] **Step 1: Write the component**

```tsx
interface SpotifyMiniPlayerProps {
  trackId: string;
  label?: string;
}

export default function SpotifyMiniPlayer({ trackId, label = "LISTEN NOW" }: SpotifyMiniPlayerProps) {
  return (
    <div>
      <p className="text-xs font-bold tracking-widest text-[#a00c30] mb-3">{label}</p>
      <div className="rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden">
        <iframe
          title={`Spotify player: ${label}`}
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
  );
}
```

No `'use client'` directive — the component has no hooks, state, or event handlers, so it doesn't need one. (Both call sites in Tasks 2 and 3 are already inside files marked `'use client'` at the top, so this has no effect on the client/server boundary either way.)

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `SpotifyMiniPlayer.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/components/SpotifyMiniPlayer.tsx
git commit -m "Add SpotifyMiniPlayer component"
```

---

### Task 2: Add the player to the homepage Featured section

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `SpotifyMiniPlayer` from `./components/SpotifyMiniPlayer` (Task 1) — props `{ trackId: string }`.

- [ ] **Step 1: Add the import**

In `app/page.tsx`, the existing imports include:

```tsx
import VideoPlayer from './components/VideoPlayer';
import CoolButton from './components/CoolButton';
```

Add directly below them:

```tsx
import SpotifyMiniPlayer from './components/SpotifyMiniPlayer';
```

- [ ] **Step 2: Insert the player into the side-video column**

Find this block (the side column in the Featured/Video Gallery section):

```tsx
                  <h4 className={`font-black text-lg group-hover:text-[#c71940] transition-colors ${lato.className}`}>{video.title}</h4>
                  <p className="text-white/40 text-sm font-bold mt-1">{video.views}</p>
                </div>
              ))}
              
              <a
                href="/videos"
```

Replace it with (adding the player between the `))}` closing the `.map()` and the `<a href="/videos"` button):

```tsx
                  <h4 className={`font-black text-lg group-hover:text-[#c71940] transition-colors ${lato.className}`}>{video.title}</h4>
                  <p className="text-white/40 text-sm font-bold mt-1">{video.views}</p>
                </div>
              ))}

              <SpotifyMiniPlayer trackId="0m5DrGT4mIgJJfbZN7lpAX" />

              <a
                href="/videos"
```

This keeps the `<a>` tag's `mt-auto` intact, so "VIEW ALL VIDEOS" still pins to the bottom of the column and the player sits directly under the Feeling So Lost teaser.

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev` (skip if already running), then open `http://localhost:3000` (or whatever port it printed).

Expected: scroll to the Featured section — under the "FEELING SO LOST TEASER" thumbnail, a "LISTEN NOW" label and a dark rounded card with the Spotify play bar appear, above the "VIEW ALL VIDEOS" button. Check both desktop width (≥1024px, where the side column is a single right-hand strip) and mobile width (<1024px, where it stacks below the main video) — the iframe should stay full-width and not overflow its rounded card at either size.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "Add Spotify mini player to homepage Featured section"
```

---

### Task 3: Add the player to the discography Releases section

**Files:**
- Modify: `app/discography/page.tsx`

**Interfaces:**
- Consumes: `SpotifyMiniPlayer` from `../components/SpotifyMiniPlayer` (Task 1) — props `{ trackId: string }`.

- [ ] **Step 1: Add the import**

In `app/discography/page.tsx`, the existing imports include:

```tsx
import CometCardDemo2 from '@/app/components/comet-card-demo2';
import Link from 'next/link';
```

Add directly below them:

```tsx
import SpotifyMiniPlayer from '@/app/components/SpotifyMiniPlayer';
```

- [ ] **Step 2: Insert the player above the album-card grid**

Find this block in the Releases/Singles section:

```tsx
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
                  <span className="text-[#a00c30]">RELEASES</span>
                </h2>
              </div>
            </div>

            <div>
              <CometCardDemo2 />
            </div>
```

Replace it with (adding the player between the heading row and the album grid, capped to a readable width so it doesn't stretch full-bleed across the `max-w-7xl` container):

```tsx
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
                  <span className="text-[#a00c30]">RELEASES</span>
                </h2>
              </div>
            </div>

            <div className="max-w-md mb-16">
              <SpotifyMiniPlayer trackId="0m5DrGT4mIgJJfbZN7lpAX" label="FEATURED SINGLE" />
            </div>

            <div>
              <CometCardDemo2 />
            </div>
```

Note the `label="FEATURED SINGLE"` override here (vs. the default `"LISTEN NOW"` used on the homepage) — same component, contextual label since it's presented alongside the other release cards.

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev` (skip if already running), then open `http://localhost:3000/discography` (or whatever port it printed).

Expected: in the RELEASES section, directly below the heading and above the Vortex/Malice/Janus album-card row, a "FEATURED SINGLE" label and the same dark rounded Spotify card appear, capped at a moderate width rather than stretching full-width. Check both desktop and mobile widths — no horizontal overflow.

- [ ] **Step 4: Commit**

```bash
git add app/discography/page.tsx
git commit -m "Add Spotify mini player to discography Releases section"
```

---

### Task 4: Full-flow verification

**Files:** none (verification only)

- [ ] **Step 1: Lint check**

Run: `npm run lint`
Expected: no new errors/warnings referencing `SpotifyMiniPlayer.tsx`, `app/page.tsx`, or `app/discography/page.tsx` (in particular, no `jsx-a11y/iframe-has-title` warning — the `title` prop from Task 1 should satisfy it).

- [ ] **Step 2: Visual check on both pages, both breakpoints**

With the dev server running, check:
- `/` (homepage) at desktop width and at mobile width (≤390px) — player visible under the teaser, no overflow.
- `/discography` at desktop width and at mobile width (≤390px) — player visible above the album grid, no overflow.

Expected: in all four checks, the Spotify embed renders its play button, track art thumbnail, and progress bar inside the rounded dark card, with no layout shift or horizontal scrollbar introduced.

- [ ] **Step 3: Confirm no regressions to the elements removed/changed earlier this session**

Check that the homepage hero's icon sidebar remains removed (no Share/Message/Link icon column reappears) and that the discography artist photo (`app/discography/page.tsx`, `professional2.webp`) is still horizontally centered on mobile width.
