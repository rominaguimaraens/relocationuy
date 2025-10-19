import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import { useI18n } from '../i18n';

function encode(data: Record<string, FormDataEntryValue>) {
  return new URLSearchParams(data as Record<string, string>).toString();
}

export default function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);

  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(t.contact.whatsappText);
    return `https://wa.me/59896337408?text=${text}`;
  }, [t.contact.whatsappText]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus('idle');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(Object.fromEntries(formData.entries())),
      });

      setStatus('success');
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${t.contact.heroTitle} - ${t.site.title}`}</title>
        <meta name="description" content={t.contact.intro} />
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl">{t.contact.heroTitle}</h1>
          <p className="mt-5 text-lg text-ink/80 md:text-xl">{t.contact.intro}</p>
          <p className="mt-3 text-sm uppercase tracking-widest text-ink/60">{t.contact.responseNote}</p>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="space-y-6 rounded-3xl border border-sky/15 bg-base-100 p-8 shadow-xl shadow-sky/10">
            <h2 className="text-2xl font-display text-ink">{t.contact.quickLinksTitle}</h2>
            <div className="space-y-3 text-sm text-ink/80">
              <a
                href={`mailto:${t.site.email}`}
                className="flex items-center gap-3 rounded-xl border border-transparent bg-sky/10 px-4 py-3 font-medium text-sky transition hover:border-sky/30 hover:text-lavender"
              >
                <span aria-hidden="true" className="text-lg font-semibold">
                  Mail
                </span>
                {t.site.email}
              </a>
              <a
                href={whatsappHref}
                className="flex items-center gap-3 rounded-xl border border-transparent bg-sage/20 px-4 py-3 font-medium text-ink transition hover:border-sage/40 hover:text-sky"
              >
                <span aria-hidden="true" className="text-lg font-semibold">
                  Chat
                </span>
                WhatsApp
              </a>
            </div>
            <p className="text-xs text-ink/60">EN / ES - {t.contact.responseNote}</p>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="card space-y-6 rounded-2xl border border-sky/10 bg-white p-8 shadow-2xl shadow-sky/10"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            {status === 'success' && (
              <div role="status" className="alert alert-success">
                <span className="font-semibold">{t.contact.form.successTitle}</span>
                <span>{t.contact.form.successMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div role="alert" className="alert alert-error">
                <span>{t.contact.form.error}</span>
              </div>
            )}

            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-ink font-semibold">
                  {t.contact.form.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-ink font-semibold">
                  {t.contact.form.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* WhatsApp number */}
            <div className="flex flex-col">
              <label htmlFor="whatsapp" className="mb-1 text-ink font-semibold">
                {t.contact.form.whatsapp}
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Package interest */}
            <div className="flex flex-col">
              <label htmlFor="package" className="mb-1 text-ink font-semibold">
                {t.contact.form.packageInterest}
              </label>
              <select
                id="package"
                name="package"
                className="select select-bordered w-full"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  {t.contact.form.packagePlaceholder}
                </option>
                {t.contact.packages.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-1 text-ink font-semibold">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="textarea textarea-bordered w-full"
                placeholder="Tell us a little about your move..."
                required
              />
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-8 text-white"
                disabled={submitting}
              >
                {submitting ? t.contact.form.sending : t.contact.form.submit}
              </button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}
