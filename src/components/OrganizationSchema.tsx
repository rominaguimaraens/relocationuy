import { Helmet } from 'react-helmet-async';
import { siteCopy } from '../content/siteCopy';
import { packages } from '../content/packages';
import { BUSINESS_ID, SITE_URL } from '../lib/site';

// Describes the business once, for search engines and AI answers. It renders on every page,
// and other schemas (blog posts, pricing) point at it with the same @id.
// Everything here comes from siteCopy / packages, so it follows when those change.

const firstNumber = (price: string) => price.replace(/,/g, '').match(/\d+/)?.[0] ?? '';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': BUSINESS_ID,
  name: siteCopy.site.title,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/share.jpg`,
  description:
    'Bilingual, in-person residency and relocation help in Montevideo, Uruguay. We book your appointments, go with you, translate, and tell you what to do next. Mostly American clients, and people from all over the world.',
  email: siteCopy.site.email,
  telephone: '+59896337408',
  address: { '@type': 'PostalAddress', addressLocality: 'Montevideo', addressCountry: 'UY' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: siteCopy.site.email,
    telephone: '+59896337408',
    availableLanguage: ['English', 'Spanish'],
  },
  areaServed: [
    { '@type': 'Country', name: 'Uruguay' },
    { '@type': 'City', name: 'Montevideo' },
  ],
  knowsLanguage: ['en', 'es'],
  priceRange: '$850 - $6,500',
  founder: { '@type': 'Person', name: 'Romina Guimaraens', jobTitle: 'Founder' },
  employee: { '@type': 'Person', name: 'Mechi', jobTitle: 'Assistant' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Relocation packages',
    itemListElement: packages.map((p) => ({
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: firstNumber(p.price),
      itemOffered: { '@type': 'Service', name: p.name, description: p.summary },
    })),
  },
};

export default function OrganizationSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
