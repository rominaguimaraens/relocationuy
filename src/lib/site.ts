import { siteCopy } from '../content/siteCopy';

// The address search engines and link previews should use. It comes from
// siteCopy.site.domain, so changing the domain there changes it everywhere.
export const SITE_URL = `https://${siteCopy.site.domain}`;
export const SHARE_IMAGE = `${SITE_URL}/share.jpg`;

// Pages are served with a trailing slash (Netlify redirects /about to /about/),
// so that is the address we declare.
export function pageUrl(path: string) {
  const withSlash = path.endsWith('/') ? path : `${path}/`;
  return `${SITE_URL}${withSlash}`;
}
