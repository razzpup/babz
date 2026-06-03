# Lenis Smooth Scroll Integration

**Date:** 2026-05-15  
**Status:** Approved

## Overview

Install and initialize Lenis for site-wide smooth scrolling across the entire babzweb Next.js application.

## Scope

- Site-wide: applies to all pages via the root layout
- Standalone RAF loop (no GSAP ticker integration)
- Uses the official `lenis/react` wrapper (`ReactLenis`)

## Changes

### 1. Install `lenis`

```
npm install lenis
```

### 2. New file: `app/components/LenisProvider.tsx`

A `'use client'` component that renders `<ReactLenis root>` from `lenis/react` around its children.

- `root` prop targets the `<html>` element for site-wide scroll interception
- Options: `duration: 1.2`, `smoothWheel: true`
- No manual RAF management — the package handles it internally

### 3. Update `app/layout.tsx`

Wrap `{children}` inside `<body>` with `<LenisProvider>`. The layout remains a server component; only `LenisProvider` crosses the client boundary.

## Constraints

- React Compiler is enabled (`reactCompiler: true`) — no manual RAF code avoids potential conflicts
- Next.js 16 App Router — `'use client'` boundary is confined to the new provider component only
