import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section';
import { useI18n } from '../i18n';

export default function ResourceArticle() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { t } = useI18n();
  const card = t.resources.cards.find((item) => item.to.split('/').pop() === slug);
  const pageTitle = card?.title ?? t.resources.heroTitle;

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} · ${t.site.title}`}</title>
        <meta name="description" content={t.resources.placeholderBody} />
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl">{pageTitle}</h1>
          {card && <p className="mt-4 text-ink/70">{card.description}</p>}
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="rounded-3xl border border-lavender/40 bg-base-100 px-6 py-12 shadow-xl shadow-lavender/10">
            <h2 className="text-2xl font-display text-ink">{t.resources.placeholderTitle}</h2>
            <p className="mt-4 text-ink/80">{t.resources.placeholderBody}</p>
            <Link to="/contact" className="btn btn-primary btn-soft mt-6">
              {t.cta.primary}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
