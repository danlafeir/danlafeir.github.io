# Non-functional requirements

Checked by `/pre-push-review` (via `nfr-review-agent`) on every push that
changes deployed code. Edit this file to revise the list.

## URL stability

- **Why it matters here:** The site is public and its pages are shared and indexed. GitHub Pages has no server-side redirects, so a moved page simply 404s.
- **Target:** none declared
- **How to check a diff:** URLs come from file paths under `src/pages/` and content IDs under `src/content/{playbook,musings,recipes}/` (the file path minus `.md`). Look for renamed or deleted content files or page routes, and changes to `trailingSlash` or `site` in `astro.config.mjs`. Compare the route list with `npm run build` output, or diff `dist/sitemap.xml` before and after.
- **Out of scope:** URLs of draft pages (`draft: true`), `/drafts/`, and hashed asset URLs under `/_astro/`.

## SEO

- **Why it matters here:** The site is a personal profile meant to be found in traditional and AI search. It relies on per-page meta, canonical URLs, JSON-LD and a sitemap.
- **Target:** Drafts are never in the sitemap. Every page with `draft: true`, and `/drafts/`, stays out of `dist/sitemap.xml` and keeps its `noindex` robots tag.
- **How to check a diff:**
  - In `src/layouts/Layout.astro`, check the title, description, canonical-or-noindex logic, the JSON-LD script, and the Open Graph and Twitter card tags (`og:title`, `og:description`, `og:url`, `og:image` with width, height and alt, and `twitter:card`).
  - In `src/pages/sitemap.xml.ts`, check the draft filter and that `STATIC_PATHS` matches the top-level pages.
  - In `public/robots.txt`, check that AI crawlers are still allowed on purpose.
  - Check that each page still passes `description`, `noindex` and `structuredData` to `Layout`.
  - Check structured data against `src/lib/structured-data.ts`.
  - Look for new pages that fall back to the generic default description.
- **Out of scope:** Off-site SEO (backlinks, Search Console setup) and copywriting choices in descriptions.

## Security and privacy

- **Why it matters here:** The repo and site are public. Drafts are published but unlisted, and pages carry personal details (location, profile links, resume).
- **Target:** none declared
- **How to check a diff:**
  - Look for new third-party scripts, fonts or embeds; fonts are self-hosted through Fontsource in `Layout.astro`.
  - Look for new outbound domains and analytics or trackers.
  - Look for personal details beyond what `src/content/pages/resume.md` already publishes, and for anything that links to `/drafts/` from listed pages or navigation (`navLinks` in `Layout.astro`).
  - Check `set:html` usage for unescaped content; JSON-LD goes through `toJsonLd`.
  - Check `.github/workflows/` permissions.
- **Out of scope:** The fact that drafts are reachable by URL, which is accepted as unlisted-not-private.

## Accessibility

- **Why it matters here:** This is a reading-focused site used on desktop, mobile and in print (the resume).
- **Target:** none declared
- **How to check a diff:**
  - Images through `astro:assets` need meaningful `alt` text, unless the image is decorative and its meaning is already in nearby text. Then use `alt=""`. Example: the sidebar avatar in `src/layouts/Layout.astro`, with the name printed below it.
  - Decorative inline SVG icons next to a text label need `aria-hidden="true"`.
  - Buttons such as `#menu-toggle` and `#download-pdf`, and the recipe batch-size control in `src/pages/recipes/[...slug].astro`, need accessible names and states (for example `aria-pressed`).
  - `#menu-toggle` keeps `aria-expanded` and `aria-controls="sidebar-menu"`, and `id="sidebar-menu"` stays on the collapsible sidebar container in `src/layouts/Layout.astro`.
  - The `.skip-link` anchor stays the first element in `<body>` in `src/layouts/Layout.astro` and points to `#main`. `<main>` keeps `id="main"` and `tabindex="-1"`.
  - At 768px wide or narrower, `.skip-link` in `src/styles/style.css` keeps a `z-index` above the sticky mobile sidebar (currently 200 vs 100), and `#main` keeps a `scroll-margin-top` at least as tall as the mobile header. Otherwise the link, or the content it jumps to, ends up hidden under that header.
  - Nav links set `aria-current="page"` only on an exact path match, and `aria-current="true"` when the current page is inside that link's section.
  - The global `:focus-visible` outline in `src/styles/style.css` must not be removed or overridden with `outline: none`, except on `main:focus`.
  - The `prefers-reduced-motion: reduce` rule in `src/styles/style.css` keeps `--transition` at `0s`. New animations should use `var(--transition)` so the rule covers them.
  - Each page needs one `<h1>` and a logical heading order.
  - Colours should go through the CSS variables in `src/styles/style.css` so contrast holds in both themes.
- **Out of scope:** Content inside third-party linked sites.
