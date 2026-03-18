# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React component library for rendering ASCII text art using figlet. Provides a type-safe `<Ascii>` component with 3 bundled fonts (ansiShadow, deltaCorpsPriest1, alpha) and accessibility support. Published to npm as `better-ascii`.

## Commands

- `npm run build` — Build library (tsup, outputs ESM + CJS to `dist/`)
- `npm run dev` — Build in watch mode
- `npm test` — Run Jest tests

## Architecture

**Entry point:** `src/index.tsx` exports `Ascii` component, `fonts` namespace, and types.

**Core flow:** The `<Ascii>` component (`src/components/ascii.tsx`) takes children text, converts it to ASCII art via figlet (`src/utils/figlet.ts`), and renders it in a `<pre>` element. The component includes `"use client"` for Next.js App Router compatibility (injected via tsup banner in `tsup.config.ts`).

**Font system:** `src/fonts/` contains font modules exporting raw figlet font data as strings. Only 3 fonts are currently exported via `src/fonts/index.ts`; additional font files exist for future rollout. Default font is deltaCorpsPriest1.

**Key patterns:**
- Figlet fonts are cached by first 50 characters of font data to avoid re-parsing
- Default styles enforce monospace font and `white-space: pre` to preserve ASCII art formatting
- useEffect cleanup prevents state updates on unmounted components

## Build Configuration

- **tsup** bundles to both ESM (`dist/index.mjs`) and CJS (`dist/index.js`) with TypeScript declarations
- `"use client"` directive is prepended to built output via `onSuccess` hook in tsup config
- **TypeScript** strict mode with `noUnusedLocals` and `noUnusedParameters` enabled
- React is a peer dependency (>=17.0.0), marked external in the build
- `prepublishOnly` hook runs build automatically before `npm publish`
