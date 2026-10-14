import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Seo from '../components/Seo';
import AlertCallout from '../components/resources/AlertCallout';
import AnchorNav from '../components/resources/AnchorNav';
import Checklist from '../components/resources/Checklist';
import {
  banking,
  contacts,
  docs,
  education,
  faqs,
  glossary,
  healthcare,
  housing,
  incomeBullets,
  life,
  logistics,
  otherResidencyFacts,
  policeClearanceExamples,
  residencyPathways,
  residencySteps,
} from '../content/resourcesData';

const NAV_ITEMS = [
  { href: '#before-you-move', label: 'Before You Move' },
  { href: '#residency', label: 'Residency' },
  { href: '#documents', label: 'Documents' },
  { href: '#setup', label: 'Housing & Utilities' },
  { href: '#banking', label: 'Banking & Money' },
  { href: '#healthcare', label: 'Healthcare & Schools' },
  { href: '#logistics', label: 'Shipping & Pets' },
  { href: '#life', label: 'Life in Uruguay' },
  { href: '#contacts', label: 'Government Offices' },
  { href: '#glossary', label: 'Glossary & FAQ' },
];

const PLAN_AND_BUDGET = [
  'A realistic starting budget for one person in Montevideo is around USD 1,550 a month: about 750 for rent and about 800 for everything else. Keep a cushion of a few months on top.',
  'The seasons are reversed. Winter is damp and runs about 5 to 15°C, so bring real layers. Summer is 21 to 28°C, with the occasional heatwave.',
  'Choose a neighborhood by how you want to live. Most of our clients look at Pocitos, Punta Carretas, Buceo, Malvín and Carrasco.',
];

const PAPERWORK_RUNWAY = [
  'Order your apostilled birth certificate and, if they apply, your marriage or divorce certificate.',
  'Time your police clearance well, because it is only valid for 6 months.',
  'Do not translate anything at home. Translations are done in Uruguay by a sworn translator.',
  'Scan everything, and keep the originals with you in your carry-on.',
];

const PACKING_AND_PETS = [
  'Bring your prescriptions, and clothing and shoes in sizes that are hard to find locally.',
  'Buy laptops and phones before you move. Electronics cost a lot more in Uruguay.',
  'Moving with a pet? Start early. The Shipping & Pets section below lists what your vet and the ministry require.',
];

function BulletCard({
  title,
  eyebrow,
  items,
  children,
  className = '',
}: {
  title: string;
  eyebrow?: string;
  items?: string[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10 ${className}`}
    >
      <div className="card-body space-y-4">
        <div>
          <h3 className="font-display text-xl text-ink">{title}</h3>
          {eyebrow && <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">{eyebrow}</p>}
        </div>
        {items && (
          <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  );
}

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <>
      <p className="text-sm uppercase tracking-[0.35em] text-sky/70">{eyebrow}</p>
      <div className="max-w-3xl space-y-4">
        <h2 className="font-display text-3xl text-ink md:text-4xl">{title}</h2>
        {children}
      </div>
    </>
  );
}

// A short note that points to the call first and the quiz second.
function HelpNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-lavender/40 bg-base-100 p-8 text-center shadow-xl shadow-lavender/10">
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-2xl text-ink/80">{body}</p>
      <div className="mt-6 flex flex-col items-center gap-3">
        <Link to="/contact" className="btn btn-primary text-white">
          Book a free 30-minute call
        </Link>
        <Link to="/quiz" className="link link-primary text-sm font-medium">
          Not sure which package fits you? Take the 4-question quiz.
        </Link>
      </div>
    </div>
  );
}

export default function Resources() {
  return (
    <>
      <Seo
        title="Move to Uruguay Guide | Uruguay Relocation Companion"
        description="Residency step by step, the documents you need, housing, banking, healthcare, shipping and pets, from a relocation service based in Montevideo."
        path="/resources"
      />

      <Section className="bg-hero-muted pb-12 pt-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-display text-ink md:text-5xl">Move to Uruguay Guide</h1>
          <p className="mt-5 text-lg text-ink/80 md:text-xl">
            Everything we tell clients about moving to Uruguay, in one place: the residency steps in
            order, the documents you need, and what setting up a life in Montevideo involves.
          </p>
          <p className="mt-4 text-lg text-ink/70 md:text-xl">
            Come back to it as you go. The checklists remember your ticks on this device.
          </p>
        </div>
      </Section>

      <AnchorNav items={NAV_ITEMS} />

      <Section className="bg-base-100">
        <div id="before-you-move" className="scroll-mt-32 space-y-8">
          <SectionIntro eyebrow="Before You Move" title="Get the groundwork done at home">
            <p className="text-base text-ink/80">
              Most of the work happens before you land. Sort out your budget, your documents and your
              timeline at home, and your first months in Montevideo go much more smoothly.
            </p>
          </SectionIntro>

          <div className="grid gap-6 md:grid-cols-3">
            <BulletCard title="Plan and budget" eyebrow="Money and weather" items={PLAN_AND_BUDGET} />
            <BulletCard title="Paperwork" eyebrow="Before you fly" items={PAPERWORK_RUNWAY} />
            <BulletCard title="Packing and pets" eyebrow="Logistics" items={PACKING_AND_PETS} />
          </div>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="residency" className="scroll-mt-32 space-y-8">
          <SectionIntro eyebrow="Residency" title="Residency, step by step">
            <p className="text-base text-ink/80">
              You apply for residency in Uruguay, at the DNM (Dirección Nacional de Migración), the
              immigration office. You do not need an immigration lawyer, and a tourist visa is enough
              to start. Here is the order things happen in.
            </p>
          </SectionIntro>

          <ol className="grid gap-4 md:grid-cols-2">
            {residencySteps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border border-sky/15 bg-base-100/95 p-5 shadow-sm shadow-sky/10"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky/20 font-display text-ink"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm text-ink/80">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <AlertCallout type="tip" title="Book early">
            Good DNM appointment slots fill up months ahead. The most avoidable delay in the whole
            process is not having your documents ready, so most of the work is done before you book.
          </AlertCallout>

          <div className="space-y-4">
            <div className="collapse collapse-arrow border border-sky/15 bg-base-100/95">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title font-display text-lg text-ink">Which residency fits you</div>
              <div className="collapse-content space-y-4 text-sm text-ink/80">
                <div className="grid gap-4 md:grid-cols-2">
                  {residencyPathways.map((option) => (
                    <div key={option.title} className="rounded-2xl border border-sky/10 bg-base-100 p-4">
                      <h3 className="font-display text-base text-ink">{option.title}</h3>
                      <p className="mt-2">{option.body}</p>
                    </div>
                  ))}
                </div>
                <p>We help with all of these.</p>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-sky/15 bg-base-100/95">
              <input type="checkbox" />
              <div className="collapse-title font-display text-lg text-ink">Income requirement</div>
              <div className="collapse-content space-y-4 text-sm text-ink/80">
                <ul className="list-disc space-y-2 pl-5">
                  {incomeBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <AlertCallout type="tip" title="Book your notary early">
                  An escribano is a public notary who certifies your income documents. We send our
                  clients the contact of a notary we trust.
                </AlertCallout>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-sky/15 bg-base-100/95">
              <input type="checkbox" />
              <div className="collapse-title font-display text-lg text-ink">Time in Uruguay</div>
              <div className="collapse-content space-y-4 text-sm text-ink/80">
                <p>
                  Permanent residency needs roughly 6 months a year in Uruguay. While your application
                  is being processed you can leave the country with a travel permit, which costs about
                  USD 30. Citizenship is available 5 years after the date you filed.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-sky/15 bg-base-100/95">
              <input type="checkbox" />
              <div className="collapse-title font-display text-lg text-ink">Other things clients ask</div>
              <div className="collapse-content text-sm text-ink/80">
                <ul className="list-disc space-y-2 pl-5">
                  {otherResidencyFacts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <HelpNote
            title="Want someone with you at the DNM?"
            body="We book your appointment, go with you, translate on the spot, and tell you which document you need and when. You can also do everything on this page yourself."
          />
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div id="documents" className="scroll-mt-32 space-y-8">
          <SectionIntro eyebrow="Documents" title="Your document checklist">
            <p className="text-base text-ink/80">
              Do the "before" list while you are still at home, and the "after" list once you land.
              Each checklist remembers your ticks on this device.
            </p>
          </SectionIntro>

          <AlertCallout type="warning" title="Start your apostilles early">
            Your home country's apostille office can take weeks, and fixing a missing one from Uruguay
            means courier delays or even a trip back. {policeClearanceExamples}
          </AlertCallout>

          <div className="grid gap-6 md:grid-cols-2">
            <Checklist title="Do this before you arrive" items={docs.before} storageKey="docs-before-v1" />
            <Checklist title="Do this after you arrive" items={docs.after} storageKey="docs-after-v1" />
          </div>

          <AlertCallout type="warning" title="Translate in Uruguay">
            The DNM only accepts translations done in Uruguay by a Uruguayan sworn translator
            (traductor público). A translation done in your home country will not be accepted, however
            good it is.
          </AlertCallout>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="setup" className="scroll-mt-32 space-y-10">
          <SectionIntro eyebrow="Housing & Utilities" title="Find a home and switch everything on">
            <p className="text-base text-ink/80">
              Most people spend their first weeks in a short-term rental while they look for a 12-month
              lease. That gives you time to compare neighborhoods and to see how long your commute
              would really be.
            </p>
          </SectionIntro>

          <div className="grid gap-6 md:grid-cols-3">
            <BulletCard title="Housing and rentals" eyebrow="Start here" items={housing.notes}>
              <div>
                <h4 className="text-sm font-semibold text-ink">Where to search</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/80">
                  {housing.portals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </BulletCard>
            <BulletCard title="Utilities" eyebrow="Switch on" items={housing.utilities} />
            <BulletCard title="Phone and internet" eyebrow="Day one" items={housing.comms}>
              <AlertCallout type="tip" title="Proof of address">
                Once your SIM and utilities are active, use the receipts as proof of address for banks,
                schools and health plans.
              </AlertCallout>
            </BulletCard>
          </div>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div id="banking" className="scroll-mt-32 space-y-8">
          <SectionIntro eyebrow="Banking & Money" title="Open an account and sort out your money">
            <p className="text-base text-ink/80">{banking.intro}</p>
          </SectionIntro>

          <div className="grid gap-6 md:grid-cols-2">
            <BulletCard title={banking.bank} eyebrow="Expect return visits" items={banking.bullets} />
            <BulletCard title="Money and tax" eyebrow="The long game" items={banking.finance} />
          </div>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="healthcare" className="scroll-mt-32 space-y-8">
          <SectionIntro eyebrow="Healthcare & Schools" title="Health plans and schools">
            <p className="text-base text-ink/80">
              Choose a private health plan for everyday care, and start your school search early if you
              have children.
            </p>
          </SectionIntro>

          <div className="grid gap-6 md:grid-cols-2">
            <BulletCard title="Healthcare" eyebrow="ASSE and mutualistas" items={healthcare} />
            <BulletCard title="Schools" eyebrow="Public and international" items={education} />
          </div>

          <HelpNote
            title="Need an interpreter at the clinic?"
            body="We offer hourly interpretation for doctor visits, and in the Full package we come with you for your health card."
          />
        </div>
      </Section>

      <Section className="bg-sage/15">
        <div id="logistics" className="scroll-mt-32 space-y-10">
          <SectionIntro eyebrow="Shipping & Pets" title="Packing, shipping and pets">
            <p className="text-base text-ink/80">
              Shipping rules changed in 2026, containers are expensive, and moving a pet comes with a
              list of vet requirements. Plan each one before you buy a ticket.
            </p>
          </SectionIntro>

          <div className="grid gap-6 md:grid-cols-3">
            <BulletCard title="Packing essentials" eyebrow="Prep" items={logistics.packing}>
              <AlertCallout type="warning" title="Mind the voltage">
                {logistics.voltage}
              </AlertCallout>
            </BulletCard>
            <BulletCard title="Shipping and imports" eyebrow="Rules from 2026" items={logistics.mail}>
              <AlertCallout type="warning" title="Containers are costly">
                {logistics.containers}
              </AlertCallout>
            </BulletCard>
            <BulletCard title="Moving with pets" eyebrow="Dogs and cats" items={logistics.pets}>
              <p className="text-sm text-ink/70">{logistics.petsNote}</p>
              <a
                href={logistics.petsLink}
                target="_blank"
                rel="noreferrer"
                className="link link-primary text-sm font-medium"
              >
                Official MGAP page
              </a>
              <AlertCallout type="tip" title="Talk to your airline early">
                Reserve cargo or in-cabin space as soon as you book tickets. Airlines limit the number of
                pets on each flight.
              </AlertCallout>
            </BulletCard>
          </div>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="life" className="scroll-mt-32 space-y-10">
          <SectionIntro eyebrow="Life in Uruguay" title="Culture and daily life">
            <p className="text-base text-ink/80">{life.intro}</p>
          </SectionIntro>

          <div className="grid gap-6 md:grid-cols-2">
            <BulletCard title="Language" items={life.language} />
            <BulletCard title="Work and wages" items={life.jobs} />
            <BulletCard title="Pace and culture" items={life.culture} />
            <BulletCard title="Goods and safety" items={life.goods} />
            <BulletCard title="Community" items={life.community} className="md:col-span-2" />
          </div>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div id="contacts" className="scroll-mt-32 space-y-10">
          <SectionIntro eyebrow="Government Offices" title="The offices you will deal with">
            <p className="text-base text-ink/80">
              Save this list. Bring your original ID and your documents to every visit.
            </p>
          </SectionIntro>

          <div className="rounded-3xl border border-sky/15 bg-base-100/95 shadow-lg shadow-sky/10">
            <div className="grid gap-4 p-6 md:grid-cols-2">
              {contacts.map((contact) => (
                <div
                  key={contact.office}
                  className="flex flex-col gap-2 rounded-2xl border border-sky/10 bg-base-100 p-4"
                >
                  <div>
                    <h3 className="font-display text-lg text-ink">{contact.office}</h3>
                    <p className="text-sm text-ink/70">{contact.purpose}</p>
                  </div>
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost btn-sm self-start border border-transparent text-sky hover:border-sky/40 hover:bg-sky/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
                  >
                    {contact.linkLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="glossary" className="scroll-mt-32 space-y-10">
          <SectionIntro eyebrow="Glossary & FAQ" title="Words you will hear, and answers to common questions" />

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              {glossary.map((entry) => (
                <div
                  key={entry.term}
                  className="rounded-2xl border border-sky/15 bg-base-100/95 p-4 shadow-sm shadow-sky/10"
                >
                  <p className="font-display text-lg text-ink">{entry.term}</p>
                  <p className="mt-2 text-sm text-ink/80">{entry.def}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="collapse collapse-plus border border-sky/15 bg-base-100/95 shadow-sm shadow-sky/10"
                >
                  <input type="checkbox" />
                  <div className="collapse-title font-display text-base text-ink">{item.q}</div>
                  <div className="collapse-content text-sm text-ink/80">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <HelpNote
            title="Questions about your own move?"
            body="Book a free 30-minute call and we will go through your situation, step by step."
          />
        </div>
      </Section>
    </>
  );
}
