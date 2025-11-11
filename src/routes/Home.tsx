import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PackageCard from '../components/PackageCard';
import Separator from '../components/Separator';
import { siteCopy } from '../content/siteCopy';
import { sanitizeText } from '../utils/sanitize';

export default function Home() {
  const { site, home, cta } = siteCopy;
  const heroEyebrowSegments = home.heroEyebrowSegments ?? [];

  return (
    <>
      <Helmet>
        <title>{site.title}</title>
        <meta name="description" content={site.tagline} />
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center rounded-full bg-sky/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sky/80">
              {heroEyebrowSegments.map((segment, index) => (
                <span key={segment} className="inline-flex items-center">
                  {index > 0 && <Separator />}
                  {segment}
                </span>
              ))}
            </span>
            <h1 className="mt-6 text-4xl leading-tight md:text-5xl">{site.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-ink/80 md:text-xl">
              {sanitizeText(home.heroTagline)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn btn-primary btn-soft btn-lg min-w-[200px]">
                {cta.primary}
              </Link>
              <Link
                to="/pricing"
                className="btn btn-soft btn-outline btn-lg min-w-[200px]"
              >
                {home.heroSecondaryButton}
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 -rotate-6 rounded-3xl bg-lavender/20 blur-3xl" />
            <img
              src="/logo.png"
              alt="Uruguay Relocation Companion brandmark"
              className="relative w-full rounded-3xl border border-blush/40 bg-base-100 shadow-2xl shadow-sky/10"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div className="flex flex-col gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl">{home.packagesTitle}</h2>
            <p className="mt-4 max-w-2xl text-ink/80">{sanitizeText(home.packagesIntro)}</p>
          </div>
          <span className="badge badge-lg rounded-full bg-base-100 px-4 py-4 text-sm text-ink/70">
            {home.packagesNote}
          </span>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {home.packages.map((item, index) => (
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
        <div className="grid gap-10 md:grid-cols-[0.65fr_1fr] md:items-center">
          <div className="rounded-3xl bg-sage/15 p-8 shadow-lg shadow-sky/5">
            <p className="text-lg leading-relaxed text-ink md:text-xl">
              {sanitizeText(home.whyBody)}
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl">{home.whyTitle}</h2>
            <p className="text-ink/80">{sanitizeText(site.tagline)}</p>
            <Link to="/contact" className="btn btn-primary btn-soft">
              {cta.primary}
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-base-100 px-6 py-10 text-center shadow-xl shadow-sky/10 md:flex-row md:px-12 md:text-left">
          <div>
            <h3 className="text-2xl font-display text-ink md:text-3xl">{cta.mini}</h3>
            <p className="mt-2 max-w-2xl text-ink/80">{sanitizeText(home.miniCtaCopy)}</p>
          </div>
          <Link to="/contact" className="btn btn-primary btn-soft btn-lg">
            {cta.primary}
          </Link>
        </div>
      </Section>

      <Section className="bg-hero-muted">
        <div className="flex flex-col gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-display">💬 “Is Uruguay Right for Me?” Consultation — $85</h2>
            <p className="mt-4 max-w-2xl text-ink/80">
              A one-hour video call to help you decide if life in Uruguay truly fits your goals, values, and lifestyle.
            </p>
          </div>
          <span className="badge badge-lg rounded-full bg-base-100 px-4 py-4 text-sm text-ink/70">
            All prices are in USD
          </span>
        </div>

        {/* Card layout for consultation details */}
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          <div className="card bg-base-100 shadow-xl border border-sky/10">
            <div className="card-body">
              <p className="text-ink/80">
                If you’ve been thinking about moving abroad but aren’t sure whether Uruguay is the right destination, this consultation gives you a clear, honest overview before taking the leap.
                We’ll talk through what daily life here really looks like — not the polished version you see in travel blogs — so you can make an informed, confident decision.
              </p>

              <h4 className="mt-6 text-lg font-semibold text-ink">Includes:</h4>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-ink/80">
                <li>1-hour video call (Zoom or Google Meet)</li>
                <li>Personalized discussion tailored to your priorities — lifestyle, budget, work, safety, healthcare, community, etc.</li>
                <li>Honest breakdown of pros and cons from a local perspective</li>
                <li>Guidance on what kind of person thrives here (and who usually doesn’t)</li>
              </ul>

              <h4 className="mt-6 text-lg font-semibold text-ink">Who It’s For:</h4>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-ink/80">
                <li>People comparing Uruguay with other destinations (like Portugal, Costa Rica, or Mexico)</li>
                <li>Those wanting clarity before investing time or money into the residency process</li>
                <li>Anyone curious about Uruguay’s culture, pace of life, and long-term potential</li>
              </ul>

              <p className="mt-6 text-ink/80">
                If you decide to move forward with our relocation services afterward, your consultation fee is credited toward your chosen package.
              </p>

              <div className="mt-8 flex justify-center">
                <Link to="/contact" className="btn btn-primary btn-soft btn-lg">
                  Book Your Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
