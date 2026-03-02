import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Section from '../components/Section';
import PackageCard from '../components/PackageCard';
import Separator from '../components/Separator';
import { siteCopy } from '../content/siteCopy';
import { sanitizeText } from '../utils/sanitize';

const faqItems = [
  {
    question: 'What does a Uruguay relocation companion actually do?',
    answer:
      'A relocation companion physically accompanies you to every appointment — DNM residency, carné de salud, banking, housing viewings, and more. We provide in-person translation, document guidance, and step-by-step support so you\u2019re never navigating Uruguay\u2019s bureaucracy alone.',
  },
  {
    question: 'What happens at a DNM appointment in Uruguay?',
    answer:
      'The DNM (Dirección Nacional de Migración) appointment is where you submit your residency application and present your documents. The process takes 30\u201390 minutes. Most applicants receive residency within 4\u20138 months of this appointment.',
  },
  {
    question: 'How long does Uruguay residency take?',
    answer:
      'Most applicants receive residency within 4\u20138 months of their DNM appointment. Timelines vary depending on document completeness and DNM processing volumes at the time of application.',
  },
  {
    question: 'What documents do Americans need to move to Uruguay?',
    answer:
      'The core documents for Uruguay residency include a valid passport, apostilled birth certificate, apostilled criminal background check (FBI or state-level), proof of income or funds, and passport-style photos. All foreign documents must be officially translated by a sworn translator in Uruguay.',
  },
  {
    question: 'Which Montevideo neighborhoods do you recommend for expats?',
    answer:
      'The most popular neighborhoods for American expats are Pocitos (walkable, coastal, vibrant), Punta Carretas (quieter, upscale, family-friendly), Buceo (more local feel, good value), Carrasco (suburban, premium), and Malvín (underrated, relaxed, beachside). We help you assess each based on your lifestyle and budget.',
  },
  {
    question: 'Do I need a lawyer to get Uruguay residency?',
    answer:
      'No. Uruguay residency does not require a lawyer. A relocation companion service handles the guidance, appointment support, and translator coordination at a fraction of legal fees.',
  },
  {
    question: 'What is the carné de salud and do I need one?',
    answer:
      'The carné de salud is Uruguay\u2019s health card — a basic health check required as part of the residency process. It involves a short medical exam at a health center and costs around $15\u2013$20 USD.',
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
        <title>Uruguay Relocation Companion | In-Person Expat Relocation Service in Montevideo</title>
        <meta
          name="description"
          content="Moving to Uruguay? We accompany you in person to every appointment, translate, and handle the details so you don't have to. Book your free 30-min call."
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
            <h1 className="mt-6 text-4xl leading-tight md:text-5xl">Your In-Person Guide to Moving to Uruguay</h1>
            <p className="mt-5 max-w-xl text-lg font-medium text-ink/90 leading-relaxed">
              Uruguay Relocation Companion is a bilingual, in-person relocation service based in Montevideo, Uruguay. We physically accompany American expats to DNM residency appointments, carné de salud, banking setup, housing viewings, and every step of the settlement process — providing real-time translation and local expertise from someone born and raised here.
            </p>
            <p className="mt-3 max-w-xl text-ink/80">
              Whether you're fleeing, exploring, or just ready for something new — you deserve support that feels human, not transactional.
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
              supportLength={item.supportLength}
              footer={item.footer ? sanitizeText(item.footer) : undefined}
              highlighted={index === 1}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-hero-muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl">{home.whyTitle}</h2>
          <div className="mt-12 space-y-8 text-left">
            <p className="text-ink/80 text-lg leading-relaxed font-medium">
              <strong>
                Because we're not just processing your paperwork — we're actually <em>with</em> you.
              </strong>
            </p>

            <p className="text-ink/80 leading-relaxed">
              Most relocation services send you a checklist and wish you luck.
              <br />
              <strong>We show up.</strong>
              <br />
              We go to your appointments. We translate in real-time so you understand what's being asked. We walk you
              through neighborhoods and tell you which cafés have the best medialunas and which streets feel safest at
              night.
            </p>

            <hr className="opacity-30" />

            <div>
              <h3 className="text-2xl md:text-3xl font-display text-ink mb-3">
                🗣️ We're bilingual locals who speak <em>your</em> language
              </h3>
              <p className="text-ink/80 leading-relaxed">
                Fluent in English and Spanish, we translate not just words but culture — the unspoken rules, the
                neighborhood personalities, and the <em>"why does it work this way?"</em> questions Google can't answer.
              </p>
            </div>

            <hr className="opacity-30" />

            <div>
              <h3 className="text-2xl md:text-3xl font-display text-ink mb-3">
                🏠 We're born-and-raised Montevideanos with deep roots here
              </h3>
              <p className="text-ink/80 leading-relaxed">
                We're not expats who moved here recently. We grew up here. We know every shortcut, every government
                office quirk, every <em>"this is how it actually works"</em> insider detail.
              </p>
            </div>

            <hr className="opacity-30" />

            <div>
              <h3 className="text-2xl md:text-3xl font-display text-ink mb-3">
                💙 We treat you like a person, not a transaction
              </h3>
              <p className="text-ink/80 leading-relaxed">
                You're not Client #247. You're someone making one of the biggest decisions of your life. We don't rush
                you. We don't judge you. <strong>We just help.</strong>
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

      <Section className="bg-hero-muted">
        <div className="flex flex-col gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-display">💬 "Is Uruguay Right for Me?" Consultation — $100</h2>
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
                If you've been thinking about moving abroad but aren't sure whether Uruguay is the right destination, this consultation gives you a clear, honest overview before taking the leap.
                We'll talk through what daily life here really looks like — not the polished version you see in travel blogs — so you can make an informed, confident decision.
              </p>

              <h4 className="mt-6 text-lg font-semibold text-ink">Includes:</h4>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-ink/80">
                <li>1-hour video call (Zoom or Google Meet)</li>
                <li>Personalized discussion tailored to your priorities — lifestyle, budget, work, safety, healthcare, community, etc.</li>
                <li>Honest breakdown of pros and cons from a local perspective</li>
                <li>Guidance on what kind of person thrives here (and who usually doesn't)</li>
              </ul>

              <h4 className="mt-6 text-lg font-semibold text-ink">Who It's For:</h4>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-ink/80">
                <li>People comparing Uruguay with other destinations (like Portugal, Costa Rica, or Mexico)</li>
                <li>Those wanting clarity before investing time or money into the residency process</li>
                <li>Anyone curious about Uruguay's culture, pace of life, and long-term potential</li>
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

      {/* FAQ Section */}
      <Section className="bg-beige-gradient">
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
