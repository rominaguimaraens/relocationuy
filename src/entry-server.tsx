// Used only at build time by scripts/prerender.mjs. It renders each page to HTML
// so the site is readable without JavaScript (search engines, link previews).
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { getAllPosts } from './lib/blog';
import { BLOG_CATEGORIES, categoryLabelToSlug } from './lib/blogCategories';
import { pageUrl } from './lib/site';

export function render(url: string) {
  const html = renderToString(
    <HelmetProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );

  return { html };
}

// Every page that gets its own static HTML file. /tracking is left out on purpose:
// it only works in the browser. The unfinished resource guides are left out too.
export function routes(): string[] {
  return [
    '/',
    '/about',
    '/pricing',
    '/scouting-trips',
    '/resources',
    '/blog',
    ...BLOG_CATEGORIES.slice(1).map((label) => `/blog/categories/${categoryLabelToSlug(label)}`),
    ...getAllPosts().map((post) => `/blog/${post.slug}`),
    '/contact',
    '/privacy',
  ];
}

// The pages listed in sitemap.xml. Category pages point to /blog/ as their main
// address, so they are not listed.
export function sitemapEntries(): { url: string; lastmod?: string }[] {
  const posts = getAllPosts();
  return [
    { url: pageUrl('/') },
    { url: pageUrl('/about') },
    { url: pageUrl('/pricing') },
    { url: pageUrl('/scouting-trips') },
    { url: pageUrl('/resources') },
    { url: pageUrl('/blog') },
    ...posts.map((post) => ({ url: pageUrl(`/blog/${post.slug}`), lastmod: post.date.slice(0, 10) })),
    { url: pageUrl('/contact') },
    { url: pageUrl('/privacy') },
  ];
}
