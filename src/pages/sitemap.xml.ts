import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Keep in sync with the top-level pages in src/pages; drafts and /drafts/ are deliberately left out.
const STATIC_PATHS = ['/', '/playbook/', '/projects/', '/musings/', '/recipes/', '/resume/'];

const published = ({ data }: { data: { draft?: boolean } }) => !data.draft;

export const GET: APIRoute = async ({ site }) => {
  const paths = [
    ...STATIC_PATHS,
    ...(await getCollection('playbook', published)).map((e) => `/playbook/${e.id}/`),
    ...(await getCollection('musings', published)).map((e) => `/musings/${e.id}/`),
    ...(await getCollection('recipes', published)).map((e) => `/recipes/${e.id}/`),
  ];
  const urls = paths.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
