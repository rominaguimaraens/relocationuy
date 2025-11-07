import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import PackageCard from '../components/PackageCard';
import { siteCopy } from '../content/siteCopy';
import { sanitizeText } from '../utils/sanitize';

export default function Pricing() {
  const { site, pricing } = siteCopy;

  return (
    <>
      <Helmet>
        <title>{pricing.title}</title>
        <meta name="description" content={site.tagline} />
      </Helmet>

      <Section className="bg-beige-gradient">
        <h1 className="text-4xl font-display text-center mb-4">{pricing.title}</h1>
        <p className="text-center text-ink/80">{sanitizeText(pricing.note)}</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricing.packages.map((item, index) => (
            <PackageCard
              key={item.id}
              name={item.name}
              price={item.price}
              summary={item.summary}
              features={item.features}
              supportLength={item.supportLength}
              highlighted={index === 1}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-hero-muted">
        <h2 className="text-3xl font-display text-center mb-8">
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
    </>
  );
}
