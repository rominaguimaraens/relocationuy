import { Helmet } from 'react-helmet-async';
import { siteCopy } from '../content/siteCopy';
import { SHARE_IMAGE, pageUrl } from '../lib/site';

// Every page's title, description, canonical address and share-preview tags come
// through here, so they stay consistent.

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

export default function Seo({ title, description, path, image = SHARE_IMAGE, type = 'website' }: SeoProps) {
  const url = pageUrl(path);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteCopy.site.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
