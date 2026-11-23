# daniellafeir.com

Personal site built with Astro and deployed to GitHub Pages at https://daniellafeir.com on every push to `main`.

## Local development

```sh
npm install
npm run dev
```

```sh
npm run build
```

- Build output goes to `dist/`.
- Content lives under `src/content/{playbook,musings,recipes}/` as Markdown with front matter, validated by `src/content.config.ts`.
- A content file's URL is its path under the collection directory minus `.md`, e.g. `src/content/musings/foo.md` becomes `/musings/foo/`.

## Drafts

- Mark any playbook, musing, or recipe entry as a draft with `draft: true` in its front matter.
- Drafts are left out of every section listing and out of `/sitemap.xml`.
- Drafts are still built and published at their final URL, so a review link keeps working after the draft is published.
- Drafts are unlisted, not private: anyone with the URL can read them.
- Every draft page gets `<meta name="robots" content="noindex">` and no canonical link.
- `/drafts/` lists all current drafts for review. It is also `noindex`, and nothing in the site navigation links to it.
- To publish, remove `draft: true` (or set it to `false`).

## Adding a top-level page

- Add the page under `src/pages/`.
- Add its path to `STATIC_PATHS` in `src/pages/sitemap.xml.ts`. Top-level pages are listed by hand, and a page missing from that list is left out of the sitemap.
- Pass a page-specific `description` to `Layout` in `src/layouts/Layout.astro`. Otherwise the page falls back to the generic site description.
- Pass `noindex` to `Layout` for any page that should stay out of search results. Indexable pages get a canonical URL automatically.
- Optionally pass `structuredData` to `Layout`, built with the helpers in `src/lib/structured-data.ts`.

## Crawlers

- `public/robots.txt` deliberately allows every crawler, AI crawlers included, and points to `https://daniellafeir.com/sitemap.xml`.
- Drafts are kept out of indexes by their `noindex` tag, not by `Disallow`, because a blocked crawler never sees a page's `noindex`.

## Pushing

Pushes that change deployed code go through `/pre-push-review`, which checks them against `docs/nfrs.md`.
