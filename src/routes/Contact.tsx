import type { FormEvent } from 'react';
import { useEffect, useRef, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Section from '../components/Section';
import Seo from '../components/Seo';
import { siteCopy } from '../content/siteCopy';
import { sanitizeText } from '../utils/sanitize';

const EMAILJS_SERVICE_ID = 'service_mzixmzh';
const EMAILJS_TEMPLATE_ID = 'template_z393tcp';
const EMAILJS_PUBLIC_KEY = 'UDBd2t1E1Lk6OOSiG';

// Link to your booking page (Cal.com, Calendly, a Google appointment schedule...).
// Set VITE_SCHEDULER_URL in Netlify and the "Pick a time" card appears; leave it
// empty and the card stays hidden. It is read at build time, so redeploy after changing it.
const SCHEDULER_URL = (import.meta.env.VITE_SCHEDULER_URL as string | undefined)?.trim();

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder: string;
  options: readonly string[];
}

function SelectField({ id, label, placeholder, options }: SelectFieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-ink font-semibold">
        {sanitizeText(label)}
      </label>
      <select id={id} name={id} className="select select-bordered w-full" defaultValue="">
        <option value="">{sanitizeText(placeholder)}</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {sanitizeText(option)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Contact() {
  const { contact, site } = siteCopy;
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();

  // The quiz sends people here with their answers in the address. Fill the matching
  // dropdowns, but only with values the form actually offers. Done in an effect so
  // the first render matches the prerendered page.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    for (const field of ['package', 'timeline', 'travelers', 'stage']) {
      const value = searchParams.get(field);
      const select = form.elements.namedItem(field);
      if (value && select instanceof HTMLSelectElement) {
        if (Array.from(select.options).some((option) => option.value === value)) {
          select.value = value;
        }
      }
    }
  }, [searchParams]);

  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(contact.whatsappText);
    return `https://wa.me/59896337408?text=${text}`;
  }, [contact.whatsappText]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = formRef.current!;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? '').trim();

    // Spam trap: real visitors never see or fill this field. If it has a value,
    // pretend it worked and send nothing.
    if (get('bot_field')) {
      setStatus('success');
      form.reset();
      return;
    }

    setSubmitting(true);
    setStatus('idle');

    const message = get('message') || '(No message left)';

    const packageLabel =
      contact.packages.find((option) => option.value === get('package'))?.label ?? 'Not specified';

    const templateParams = {
      name: get('name'),
      email: get('email'),
      whatsapp: get('whatsapp'),
      package: packageLabel,
      timeline: get('timeline'),
      travelers: get('travelers'),
      stage: get('stage'),
      source: get('source'),
      message,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      setStatus('success');
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Book a Free 30-Minute Call | Uruguay Relocation Companion"
        description="Tell us about your move to Uruguay and book a free 30-minute call with Uruguay Relocation Companion. We reply within 48 hours."
        path="/contact"
      />

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl">Book Your Free 30-Minute Consultation</h1>
          <p className="mt-5 text-lg text-ink/80 md:text-xl">{sanitizeText(contact.intro)}</p>
          <p className="mt-3 text-sm uppercase tracking-widest text-ink/60">
            {sanitizeText(contact.responseNote)}
          </p>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="space-y-6">
            {SCHEDULER_URL && (
              <div className="space-y-4 rounded-3xl border border-lavender/30 bg-base-100 p-8 shadow-xl shadow-sky/10">
                <h2 className="text-2xl font-display text-ink">
                  {sanitizeText(contact.scheduler.title)}
                </h2>
                <p className="text-sm text-ink/80">{sanitizeText(contact.scheduler.body)}</p>
                <a
                  href={SCHEDULER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full text-white"
                >
                  {sanitizeText(contact.scheduler.button)}
                </a>
              </div>
            )}

            <div className="space-y-6 rounded-3xl border border-sky/15 bg-base-100 p-8 shadow-xl shadow-sky/10">
              <h2 className="text-2xl font-display text-ink">{sanitizeText(contact.quickLinksTitle)}</h2>
              <div className="space-y-3 text-sm text-ink/80">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 rounded-xl border border-transparent bg-sky/10 px-4 py-3 font-medium text-sky transition hover:border-sky/30 hover:text-lavender"
                >
                  <span aria-hidden="true" className="text-lg font-semibold">
                    Mail
                  </span>
                  {site.email}
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
              <p className="text-xs text-ink/60">EN / ES - {sanitizeText(contact.responseNote)}</p>
            </div>
          </div>

          <form
            ref={formRef}
            className="card space-y-6 rounded-2xl border border-sky/10 bg-white p-8 shadow-2xl shadow-sky/10"
            onSubmit={onSubmit}
          >
            {status === 'success' && (
              <div role="status" className="alert alert-success">
                <span className="font-semibold">{sanitizeText(contact.form.successTitle)}</span>
                <span>{sanitizeText(contact.form.successMessage)}</span>
              </div>
            )}

            {status === 'error' && (
              <div role="alert" className="alert alert-error">
                <span>{sanitizeText(contact.form.error)}</span>
              </div>
            )}

            {/* Spam trap, hidden from real visitors */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="bot_field">Leave this field empty</label>
              <input id="bot_field" name="bot_field" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-ink font-semibold">
                  {sanitizeText(contact.form.name)}
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
                  {sanitizeText(contact.form.email)}
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
                {sanitizeText(contact.form.whatsapp)}
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                className="input input-bordered w-full"
              />
            </div>

            {/* Optional details that help prepare for the call */}
            <p className="text-sm text-ink/60">{sanitizeText(contact.form.detailsNote)}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                id="timeline"
                label={contact.form.timeline}
                placeholder={contact.form.selectPlaceholder}
                options={contact.timelineOptions}
              />
              <SelectField
                id="travelers"
                label={contact.form.travelers}
                placeholder={contact.form.selectPlaceholder}
                options={contact.travelersOptions}
              />
              <SelectField
                id="stage"
                label={contact.form.stage}
                placeholder={contact.form.selectPlaceholder}
                options={contact.stageOptions}
              />
              <div className="flex flex-col">
                <label htmlFor="source" className="mb-1 text-ink font-semibold">
                  {sanitizeText(contact.form.source)}
                </label>
                <input
                  id="source"
                  name="source"
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Package interest (optional) */}
            <div className="flex flex-col">
              <label htmlFor="package" className="mb-1 text-ink font-semibold">
                {sanitizeText(contact.form.packageInterest)}
              </label>
              <select
                id="package"
                name="package"
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="">{sanitizeText(contact.form.selectPlaceholder)}</option>
                {contact.packages.map((option) => (
                  <option value={option.value} key={option.value}>
                    {sanitizeText(option.label)}
                  </option>
                ))}
              </select>
            </div>

            {/* Message (optional) */}
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-1 text-ink font-semibold">
                {sanitizeText(contact.form.message)}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="textarea textarea-bordered w-full"
                placeholder="Tell us a little about your move..."
              />
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-8 text-white"
                disabled={submitting}
              >
                {submitting ? sanitizeText(contact.form.sending) : sanitizeText(contact.form.submit)}
              </button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}
