import { siteCopy } from '../content/siteCopy';

// The address search engines and link previews should use. It comes from
// siteCopy.site.domain, so changing the domain there changes it everywhere.
export const SITE_URL = `https://${siteCopy.site.domain}`;
export const SHARE_IMAGE = `${SITE_URL}/share.jpg`;

// Netlify serves these pages without a trailing slash (/about, not /about/), so that
// is the address we declare. The homepage is just the domain with a slash.
export function pageUrl(path: string) {
  const trimmed = path.replace(/\/+$/, '');
  return `${SITE_URL}${trimmed || '/'}`;
}
