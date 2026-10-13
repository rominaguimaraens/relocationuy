import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Section from '../components/Section';
import PackageCard from '../components/PackageCard';
import Separator from '../components/Separator';
import { siteCopy } from '../content/siteCopy';
import { packagesNotIncluded } from '../content/packages';
import { sanitizeText } from '../utils/sanitize';

const faqItems = [
  {
    question: 'What does a relocation companion do in Uruguay?',
    answer:
      'A relocation companion goes with you to your appointments and translates on the spot. For us that means your immigration (DNM) appointment, the health card exam, opening a bank account and apartment viewings. We also tell you which documents to get and when.',
  },
  {
    question: 'How much does your service cost?',
    answer:
      'Essential is $850, Full is $1,800, and the Family Package is $6,500 for four people, plus $950 for each extra person. Essential covers residency. Full adds the health card, SIM and utilities, health insurance, banking and rental search. Family adds school or childcare, pet relocation and title revalidation.',
  },
  {
    question: 'What happens at the DNM appointment?',
    answer:
      'You hand in your residency application and your documents. It takes 30 to 90 minutes. We book it, go with you, and translate.',
  },
  {
    question: 'How long does Uruguay residency take?',
    answer:
      'Most people get residency 4 to 8 months after the DNM appointment. It depends on how complete your documents are and how busy DNM is.',
  },
  {
    question: 'What documents do Americans need to move to Uruguay?',
    answer:
      'You need a passport, an apostilled birth certificate, an apostilled criminal background check (FBI or state), proof of income or funds, and passport-style photos. Foreign documents need a sworn translation in Uruguay. Adult birth certificates and marriage certificates don\u2019t expire. A minor\u2019s birth certificate expires after a year, and the background check expires after 6 months, so get it close to your appointment. You can request the background check in Uruguay too, but it takes a long time, so most people do it in the US first.',
  },
  {
    question: 'Do I need to speak Spanish?',
    answer:
      'No. We translate at every appointment we go to with you. You\u2019ll want to learn some over time, because daily life happens in Spanish, but you don\u2019t need it to get your residency done.',
  },
  {
    question: 'Do you pick me up at the airport?',
    answer:
      'Yes. Mechi arranges your airport pickup and gets you to wherever you\u2019re staying. It\u2019s included in our packages.',
  },
  {
    question: 'Do I need a lawyer to get Uruguay residency?',
    answer:
      'No. You can apply without a lawyer. We handle the guidance, the appointments and the translator, so you\u2019re not doing it alone.',
  },
  {
    question: 'What is the carn\u00e9 de salud?',
    answer:
      'It\u2019s Uruguay\u2019s health card, a basic health check that\u2019s part of the residency process. It\u2019s a short exam at a health center and costs around $15 to $20.',
  },
  {
    question: 'Which neighborhoods do you recommend in Montevideo?',
    answer:
      'Most Americans we work with look at Pocitos, Punta Carretas, Buceo, Carrasco and Malv\u00edn. Pocitos is walkable and by the beach. Punta Carretas is quieter and good for families. Buceo has a more local feel and good value. Carrasco is suburban and premium. Malv\u00edn is relaxed and beachside. We help you choose based on your budget and how you live.',
  },
  {
    question: 'Can you help families with kids or pets?',
    answer:
      'Yes. The Family Package covers up to four people and includes school or childcare support, pet relocation guidance and title revalidation. Extra people are $950 each.',
  },
];

/* FAQ JSON-LD schema */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sky/10 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-ink transition-colors hover:text-sky"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 text-ink/80 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { home, cta } = siteCopy;
  const heroEyebrowSegments = home.heroEyebrowSegments ?? [];

  return (
    <>
      <Helmet>
        <title>Uruguay Relocation Help in Montevideo | Uruguay Relocation Companion</title>
        <meta
          name="description"
          content="Romina and Mechi go with you to your Uruguay residency appointment, translate, and help you settle in Montevideo. Packages from $850. Book a free 30-minute call."
        />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
            <h1 className="mt-6 text-4xl leading-tight md:text-5xl">Moving to Uruguay? We go with you to every appointment.</h1>
            <p className="mt-5 max-w-xl text-lg font-medium text-ink/90 leading-relaxed">
              Uruguay Relocation Companion is a residency and relocation service in Montevideo, run by Romina.
              We go with you to your immigration appointment, the health card exam, the bank and apartment viewings, and
              we translate as it happens. We also pick you up at the airport. Packages start at $850.
            </p>
            <p className="mt-3 max-w-xl text-ink/80">
              Most of our clients are Americans. Some move for the lifestyle, some because home stopped feeling safe. We
              help either way.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn btn-primary btn-soft btn-lg min-w-[200px]">
                Book Your Free 30-Min Call
              </Link>
              <Link
                to="/scouting-trips"
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
              alt="Uruguay Relocation Companion logo"
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
              footer={item.footer ? sanitizeText(item.footer) : undefined}
              highlighted={index === 1}
            />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink/70">
          {sanitizeText(packagesNotIncluded)}
        </p>
        <p className="mt-2 text-center text-xs text-ink/50">Prices last updated October 2026.</p>
      </Section>

      <Section className="bg-hero-muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl">{home.whyTitle}</h2>
          <div className="mt-12 space-y-8 text-left">
            <p className="text-ink/80 text-lg leading-relaxed">
              Most relocation services send you a checklist. We come to the appointment, sit next to you, and translate
              while it&apos;s happening, so you know what you&apos;re agreeing to.
            </p>

            <hr className="opacity-30" />

            <div>
              <h3 className="text-2xl md:text-3xl font-display text-ink mb-3">We&apos;re bilingual and we live here</h3>
              <p className="text-ink/80 leading-relaxed">
                We speak English and Spanish, and we explain how things work here. Why an office closes for lunch, why one
                official says yes and the next says no, what to bring so you don&apos;t have to go back.
              </p>
            </div>

            <hr className="opacity-30" />

            <div>
              <h3 className="text-2xl md:text-3xl font-display text-ink mb-3">
                One of us grew up here, one of us moved here
              </h3>
              <p className="text-ink/80 leading-relaxed">
                Romina was raised in Montevideo and knows how the offices, the paperwork and the neighborhoods really
                work. Mechi came from Argentina, so she knows what the first months feel like. Between us you get both.
              </p>
            </div>

            <hr className="opacity-30" />

            <div>
              <h3 className="text-2xl md:text-3xl font-display text-ink mb-3">You get a person, not a ticket number</h3>
              <p className="text-ink/80 leading-relaxed">
                You message us on WhatsApp and one of us answers. We don&apos;t rush you, and we don&apos;t judge your
                reasons for moving.
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link to="/contact" className="btn btn-primary btn-soft">
              Book a Free Consultation
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
            Book Your Free 30-Min Call
          </Link>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-hero-muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-display md:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="rounded-2xl border border-sky/10 bg-base-100 p-6 shadow-xl md:p-10">
            {faqItems.map((item) => (
              <FAQItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-ink/70 mb-4">Still have questions? We're happy to help.</p>
            <Link to="/contact" className="btn btn-primary btn-soft">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
