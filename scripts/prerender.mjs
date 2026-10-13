// Runs after the two Vite builds (see "build" in package.json).
// Writes one HTML file per page into dist/, with the page already rendered.
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find the empty #root div in dist/index.html');
}

const { render, routes, sitemapEntries } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

// Pages that are not prerendered (like /tracking and unknown URLs) are served this
// empty shell, and the browser renders them. Netlify points to it in netlify.toml.
await writeFile(path.join(dist, 'spa.html'), template);

// React 19 puts a page's <title>, <meta> and <link> tags at the start of the rendered
// output. Pull them out so they can go in <head>, where they belong.
const PRELUDE = /^(?:<link\b[^>]*\/>|<title>[\s\S]*?<\/title>|<meta\b[^>]*\/>)+/;

function metaKey(tag) {
  const name = tag.match(/\b(?:name|property)="([^"]+)"/);
  if (name) return `meta:${name[1]}`;
  if (/^<title/.test(tag)) return 'title';
  const rel = tag.match(/\brel="([^"]+)"/);
  if (rel && rel[1] === 'canonical') return 'canonical';
  return null;
}

let count = 0;
for (const route of routes()) {
  const page = render(route);

  const prelude = page.html.match(PRELUDE)?.[0] ?? '';
  const body = page.html.slice(prelude.length);
  const tags = prelude.match(/<title>[\s\S]*?<\/title>|<(?:link|meta)\b[^>]*\/>/g) ?? [];

  // The page's own tags replace the homepage defaults from index.html.
  let out = template;
  for (const key of new Set(tags.map(metaKey).filter(Boolean))) {
    if (key === 'title') out = out.replace(/<title>[\s\S]*?<\/title>\s*/, '');
    else if (key === 'canonical') out = out.replace(/<link\s+rel="canonical"[^>]*\/>\s*/, '');
    else {
      const name = key.slice('meta:'.length);
      out = out.replace(new RegExp(`<meta\\s+(?:name|property)="${name}"[\\s\\S]*?/>\\s*`), '');
    }
  }

  // If a page's title or description is still inside the body, something is rendering
  // them in the wrong place and search engines may miss them.
  if (/<title|<meta name="description"/.test(body)) {
    throw new Error(`prerender: ${route} has head tags left in the page body`);
  }

  out = out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  out = out.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`);

  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, out);
  count += 1;
}

// The "page not found" page. Netlify shows it, with a 404 status, for any address
// that doesn't exist (see public/_redirects for the pages that are exceptions).
{
  const page = render('/page-not-found');
  const prelude = page.html.match(PRELUDE)?.[0] ?? '';
  const body = page.html.slice(prelude.length);
  const tags = prelude.match(/<title>[\s\S]*?<\/title>|<(?:link|meta)\b[^>]*\/>/g) ?? [];
  let out = template
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<link\s+rel="canonical"[^>]*\/>\s*/, '')
    .replace(/<meta\s+property="og:url"[\s\S]*?\/>\s*/, '');
  out = out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  out = out.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`);
  await writeFile(path.join(dist, '404.html'), out);
}

const urls = sitemapEntries()
  .map(({ url, lastmod }) => `  <url><loc>${url}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
  .join('\n');
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${count} pages`);
