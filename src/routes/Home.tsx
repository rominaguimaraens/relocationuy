import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PackageCard from '../components/PackageCard';
import { useI18n } from '../i18n';

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>{t.site.title}</title>
        <meta name="description" content={t.site.tagline} />
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center rounded-full bg-sky/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sky/80">
              {t.home.heroEyebrow}
            </span>
            <h1 className="mt-6 text-4xl leading-tight md:text-5xl">{t.site.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-ink/80 md:text-xl">{t.home.heroTagline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn btn-primary btn-soft btn-lg min-w-[200px]">
                {t.cta.primary}
              </Link>
              <Link
                to="/pricing"
                className="btn btn-soft btn-outline btn-lg min-w-[200px]"
              >
                {t.home.heroSecondaryButton}
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
            <h2 className="text-3xl md:text-4xl">{t.home.packagesTitle}</h2>
            <p className="mt-4 max-w-2xl text-ink/80">{t.home.packagesIntro}</p>
          </div>
          <span className="badge badge-lg rounded-full bg-base-100 px-4 py-4 text-sm text-ink/70">
            {t.home.packagesNote}
          </span>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.home.packages.map((item, index) => (
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
            <p className="text-lg leading-relaxed text-ink md:text-xl">{t.home.whyBody}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl">{t.home.whyTitle}</h2>
            <p className="text-ink/80">{t.site.tagline}</p>
            <Link to="/contact" className="btn btn-primary btn-soft">
              {t.cta.primary}
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-base-100 px-6 py-10 text-center shadow-xl shadow-sky/10 md:flex-row md:px-12 md:text-left">
          <div>
            <h3 className="text-2xl font-display text-ink md:text-3xl">{t.cta.mini}</h3>
            <p className="mt-2 max-w-2xl text-ink/80">{t.home.miniCtaCopy}</p>
          </div>
          <Link to="/contact" className="btn btn-primary btn-soft btn-lg">
            {t.cta.primary}
          </Link>
        </div>
      </Section>
    </>
  );
}
