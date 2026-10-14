import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Seo from '../components/Seo';
import PackageCard from '../components/PackageCard';
import { siteCopy } from '../content/siteCopy';
import { packagesNotIncluded, packagesPayment } from '../content/packages';
import { sanitizeText } from '../utils/sanitize';
import { BUSINESS_ID } from '../lib/site';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Relocation Companion Service',
  provider: {
    '@type': 'Organization',
    '@id': BUSINESS_ID,
    name: 'Uruguay Relocation Companion',
  },
  areaServed: {
    '@type': 'City',
    name: 'Montevideo',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Relocation Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Essential Residency Companion',
          description:
            'Step-by-step residency guidance, DNM appointment booking and in-person support, sworn translator contact, health card and ID guidance, Ongoing support throughout your process',
        },
        price: '850',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Full Relocation Support',
          description:
            'Everything in Essential plus in-person accompaniment for health card, SIM and utilities setup, health insurance setup, banking setup, rental search and accompaniment, orientation walk',
        },
        price: '1800',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Family Package',
          description:
            'Everything in Full Relocation Support for four people at a slightly lower price, plus school search and guidance on where to get help with pets and moving logistics, $950 per extra person',
        },
        price: '6500',
        priceCurrency: 'USD',
      },
    ],
  },
};

export default function Pricing() {
  const { pricing } = siteCopy;

  return (
    <>
      <Seo
        title="Relocation Packages & Pricing | Uruguay Relocation Companion"
        description="Three relocation packages for Americans moving to Uruguay, from Essential Residency support at $850 to full Family Relocation at $6,500. See what's included."
        path="/pricing"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <Section className="bg-beige-gradient">
        <h1 className="mb-4 text-center text-4xl font-display">Relocation Packages for Moving to Uruguay</h1>
        <p className="text-center text-ink/80">{sanitizeText(pricing.note)}</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricing.packages.map((item, index) => (
            <PackageCard
              key={item.id}
              name={item.name}
              price={item.price}
              summary={item.summary}
              features={item.features}
              footer={item.footer ? sanitizeText(item.footer) : undefined}
              highlighted={index === 1}
            />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink/70">
          {sanitizeText(packagesNotIncluded)}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink/70">{packagesPayment}</p>

        <div className="mt-12">
          <div className="card border border-sky/10 bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <p className="text-ink/80">
                Want to experience Uruguay in person before you commit?
              </p>
              <Link to="/scouting-trips" className="btn btn-soft btn-primary mt-3">
                Explore Scouting Trips
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-hero-muted">
        <h2 className="mb-8 text-center text-3xl font-display">
          {pricing.otherServicesTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricing.otherServices.map((service) => (
            <div
              key={service.name}
              className="card card-soft border border-sky/10 bg-base-100/95 shadow-sm text-center"
            >
              <div className="card-body">
                <h3 className="text-xl font-display text-ink">{service.name}</h3>
                <p className="mt-2 text-ink/70">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-display mb-4">Not Sure Which Package Is Right for You?</h2>
          <p className="text-lg text-ink/80 mb-6">
            Book a free 30-minute consultation and we'll help you figure out which level of support fits your move.
          </p>
          <Link to="/contact" className="btn btn-primary btn-soft btn-lg">
            Book Your Free 30-Min Call
          </Link>
        </div>
      </Section>
    </>
  );
}
