import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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
        <h1 className="mb-4 text-center text-4xl font-display">{pricing.title}</h1>
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
              footer={item.footer ? sanitizeText(item.footer) : undefined}
              highlighted={index === 1}
            />
          ))}
        </div>

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
    </>
  );
}
