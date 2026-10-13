// Used only at build time by scripts/prerender.mjs. It renders each page to HTML
// so the site is readable without JavaScript (search engines, link previews).
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { getAllPosts } from './lib/blog';
import { BLOG_CATEGORIES, categoryLabelToSlug } from './lib/blogCategories';
import { siteCopy } from './content/siteCopy';

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
// it only works in the browser.
export function routes(): string[] {
  return [
    '/',
    '/about',
    '/pricing',
    '/scouting-trips',
    '/resources',
    ...siteCopy.resources.cards.map((card) => card.to),
    '/blog',
    ...BLOG_CATEGORIES.slice(1).map((label) => `/blog/categories/${categoryLabelToSlug(label)}`),
    ...getAllPosts().map((post) => `/blog/${post.slug}`),
    '/contact',
    '/privacy',
  ];
}
