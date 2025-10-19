import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section';
import { useI18n } from '../i18n';

export default function Resources() {
  const { t } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasAccess = window.localStorage.getItem('resourcesAccess');
    if (!hasAccess) {
      navigate('/resources-login', { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-display md:text-5xl">{t.resources.heroTitle}</h1>
          <p className="mt-4 text-lg text-ink/80 md:text-xl">{t.resources.intro}</p>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.resources.cards.map((card) => (
            <a
              key={card.title}
              href={card.to}
              className="card card-soft group h-full border border-sky/15 bg-base-100/95 p-6 transition hover:-translate-y-1 hover:border-lavender/50 hover:shadow-2xl hover:shadow-lavender/20 focus:outline-none focus-visible:-translate-y-1 focus-visible:border-lavender/50"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-display text-ink">{card.title}</h3>
                <span className="text-sky" aria-hidden="true">
                  →
                </span>
              </div>
              <p className="mt-3 text-sm text-ink/70">{card.description}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section className="bg-sage/15">
        <div className="mx-auto max-w-3xl rounded-3xl bg-base-100 p-8 text-center shadow-xl shadow-sky/10">
          <h2 className="text-2xl font-display text-ink">{t.resources.placeholderTitle}</h2>
          <p className="mt-4 text-ink/80">{t.resources.placeholderBody}</p>
          <p className="mt-6 text-sm text-ink/60">{t.resources.note}</p>
        </div>
      </Section>
    </>
  );
}
