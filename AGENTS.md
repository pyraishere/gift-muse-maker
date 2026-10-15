# Project rules

- Framework is TanStack Start (SSR) with file-based routes in `src/routes/`; page components live in `src/pages/`. Why: pages are server-rendered so search engines and AI crawlers see full content.
- Per-page SEO (title, description, canonical, og/twitter, JSON-LD) is set in each route's `head()` via `pageHead()` in `src/lib/seo.ts` — never via react-helmet or `document.title`. Why: only `head()` output is server-rendered.
- Gift generation runs as a TanStack server function in `src/lib/generate-gifts.functions.ts`, not a Supabase edge function. Why: same deploy, type-safe calls.
- Legacy react-router call sites import from `@/lib/router-compat`. Why: keeps old calling conventions working over TanStack Router.
