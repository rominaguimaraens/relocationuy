import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section';
import AlertCallout from '../components/resources/AlertCallout';
import AnchorNav from '../components/resources/AnchorNav';
import Checklist from '../components/resources/Checklist';
import {
  contacts,
  docs,
  faqs,
  glossary,
  life,
  logistics,
  residency,
  setup,
} from '../content/resourcesData';

const NAV_ITEMS = [
  { href: '#residency', label: 'Residency' },
  { href: '#documents', label: 'Documents & Apostilles' },
  { href: '#setup', label: 'Practical Setup' },
  { href: '#logistics', label: 'Logistics (Shipping & Pets)' },
  { href: '#life', label: 'Life in Uruguay' },
  { href: '#contacts', label: 'Government Contacts' },
  { href: '#glossary', label: 'Glossary / FAQ' },
];

export default function Resources() {
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
      <Helmet>
        <title>Move to Uruguay Guide | Uruguay Relocation Companion</title>
        <meta
          name="description"
          content="Comprehensive move-to-Uruguay roadmap covering residency, documents, practical setup, logistics, and life on the ground."
        />
      </Helmet>

      <Section className="bg-hero-muted pb-12 pt-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-display text-ink md:text-5xl">Move to Uruguay Guide</h1>
          <p className="mt-5 text-lg text-ink/80 md:text-xl">
            Your personalized roadmap to navigate residency, paperwork, and everyday logistics with
            confidence. Follow each block to stay on top of legal requirements while building your
            new life in Uruguay.
          </p>
          <p className="mt-4 text-lg text-ink/70 md:text-xl">
            Keep this page handy during your move - each section links to checklists, provider tips,
            and the agencies you will work with.
          </p>
        </div>
      </Section>

      <AnchorNav items={NAV_ITEMS} />

      <Section className="bg-base-100">
        <div id="residency" className="scroll-mt-32 space-y-8">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Residency</p>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Legal Residency & Immigration
            </h2>
            <p className="mt-4 text-base text-ink/80">
              Uruguay offers multiple entry points into residency. Begin by understanding which path
              fits your profile, then coordinate income certification, presence requirements, and
              the DNM timeline.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {residency.options.map((option) => (
              <div
                key={option.title}
                className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10"
              >
                <div className="card-body">
                  <h3 className="font-display text-xl text-ink">{option.title}</h3>
                  <p className="mt-3 text-sm text-ink/75">{option.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="collapse collapse-arrow border border-sky/15 bg-base-100/95">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title font-display text-lg text-ink">
                Residency Options
              </div>
              <div className="collapse-content text-sm text-ink/80">
                <p>
                  Choose the route that best matches your current status. Permanent Residency is the
                  typical goal and grants PR status as soon as it is approved. Temporary Residency
                  covers students or employees for six months to two years, while the Digital Nomad
                  Permit gives you 180 days (renewable once) to get started.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-sky/15 bg-base-100/95">
              <input type="checkbox" />
              <div className="collapse-title font-display text-lg text-ink">
                {residency.income.title}
              </div>
              <div className="collapse-content space-y-4 text-sm text-ink/80">
                <ul className="list-disc space-y-2 pl-5">
                  {residency.income.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <AlertCallout type="tip" title="Work with an Escribano early">
                  Coordinate with a trusted notary to compile statements, certify income, and prove
                  90 days of fund usage inside Uruguay. This is the backbone of your Rentista
                  application.
                </AlertCallout>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-sky/15 bg-base-100/95">
              <input type="checkbox" />
              <div className="collapse-title font-display text-lg text-ink">Physical Presence</div>
              <div className="collapse-content space-y-4 text-sm text-ink/80">
                <p>{residency.presence}</p>
                <AlertCallout type="warning" title="Avoid long absences">
                  Travel is fine, but prolonged time outside Uruguay during processing can raise red
                  flags and delay approvals. Keep detailed travel records.
                </AlertCallout>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-sky/15 bg-base-100/95">
              <input type="checkbox" />
              <div className="collapse-title font-display text-lg text-ink">Timeline</div>
              <div className="collapse-content space-y-4 text-sm text-ink/80">
                <p>{residency.timeline}</p>
                <AlertCallout type="tip" title="Secure appointments ahead of time">
                  Book Dirección Nacional de Migración appointments at least one to two months in
                  advance - prime slots disappear quickly, especially around holidays.
                </AlertCallout>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div id="documents" className="scroll-mt-32 space-y-8">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Documents & Apostilles</p>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Document Checklist & Apostilles
            </h2>
            <p className="mt-4 text-base text-ink/80">
              Capture these documents before you leave home and finish the remaining items once you
              land. Each checklist remembers your progress on this device.
            </p>
          </div>

          <AlertCallout type="warning" title="Start apostilles immediately">
            Apostilles are easiest to secure while you are still abroad. Once in Uruguay, replacing
            them can take months and may require flying back.
          </AlertCallout>

          <div className="grid gap-6 md:grid-cols-2">
            <Checklist title="Do this before you arrive" items={docs.before} storageKey="docs-before-v1" />
            <Checklist title="Do this after you arrive" items={docs.after} storageKey="docs-after-v1" />
          </div>

          <AlertCallout type="warning" title="Translate locally in Uruguay">
            Certified translations completed abroad are frequently rejected. Plan to translate every
            foreign document with an accredited translator in Uruguay.
          </AlertCallout>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="setup" className="scroll-mt-32 space-y-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Practical Setup</p>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Arrival to Settlement Essentials
            </h2>
            <p className="mt-4 text-base text-ink/80">
              Secure housing, banking, and communications in your first weeks. These three tracks
              run in parallel and unlock everything else - from school enrollment to residency
              updates.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Housing & Rentals</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">Start first</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">Search portals</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/80">
                    {setup.housing.search.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {setup.housing.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Banking ({setup.banking.bank})</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">
                    Expect multiple visits
                  </p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {setup.banking.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Communication</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">Day 1 task</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {setup.comms.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <AlertCallout type="tip" title="Proof of address shortcut">
                  Once your Antel SIM is active, use the first utility receipt to unlock banking,
                  residency, and school registrations faster.
                </AlertCallout>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-sage/15">
        <div id="logistics" className="scroll-mt-32 space-y-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Logistics</p>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Packing, Shipping & Pets
            </h2>
            <p className="mt-4 text-base text-ink/80">
              Plan your shipments with Uruguay's import limits in mind. Use the warnings below to
              avoid costly surprises at customs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sage/20">
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl text-ink">Packing Essentials</h3>
                  <span className="badge badge-outline text-xs uppercase">Prep</span>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {logistics.packing.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <AlertCallout type="warning" title="Mind the voltage">
                  {logistics.voltage}
                </AlertCallout>
              </div>
            </div>

            <div className="card h-full border border-amber-200/60 bg-base-100/95 shadow-md shadow-amber-100">
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl text-ink">Shipping & Imports</h3>
                  <span className="badge badge-warning text-xs uppercase">Warning</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">Small parcels</h4>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-ink/80">
                    {logistics.mail.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <AlertCallout type="warning" title="Containers are costly">
                  {logistics.containers.join(' ')}
                </AlertCallout>
              </div>
            </div>

            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sage/20">
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl text-ink">Moving with Pets</h3>
                  <span className="badge badge-warning text-xs uppercase">Warning</span>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {logistics.pets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <AlertCallout type="tip" title="Talk to your airline early">
                  Reserve cargo or in-cabin space as soon as tickets are booked - airlines limit the
                  number of pets per flight.
                </AlertCallout>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="life" className="scroll-mt-32 space-y-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Life in Uruguay</p>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-ink md:text-4xl">Culture & Integration</h2>
            <p className="mt-4 text-base text-ink/80">
              Uruguay rewards patience and connection. Use these notes to set realistic expectations
              around language, income, and everyday rhythms.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <LifeColumn title="Language" items={life.language} />
            <LifeColumn title="Job Market" items={life.jobs} />
            <LifeColumn title="Pace & Culture" items={life.culture} />
            <LifeColumn title="Food & Goods" items={life.goods} />
            <LifeColumn title="Community" items={life.community} className="md:col-span-2" />
          </div>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div id="contacts" className="scroll-mt-32 space-y-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Government Contacts</p>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Key Offices & What They Handle
            </h2>
            <p className="mt-4 text-base text-ink/80">
              Save this roster of agencies you'll encounter throughout the residency process. Bring
              original IDs and certified copies to every visit.
            </p>
          </div>

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
                    href="https://www.gub.uy"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost btn-sm self-start border border-transparent text-sky hover:border-sky/40 hover:bg-sky/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
                  >
                    Open on gub.uy
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="glossary" className="scroll-mt-32 space-y-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Glossary / FAQ</p>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Quick Definitions & Mini-FAQ
            </h2>
            <p className="mt-4 text-base text-ink/80">
              Brush up on common terms you'll hear from notaries, brokers, and new Uruguayan
              friends, then skim the answers to questions we hear most often.
            </p>
          </div>

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
                  <div className="collapse-title font-display text-base text-ink">
                    {item.q}
                  </div>
                  <div className="collapse-content text-sm text-ink/80">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

type LifeColumnProps = {
  title: string;
  items: string[];
  className?: string;
};

function LifeColumn({ title, items, className }: LifeColumnProps) {
  return (
    <div
      className={`space-y-3 rounded-3xl border border-sky/15 bg-base-100/95 p-6 shadow-md shadow-sky/10 ${className ?? ''}`}
    >
      <h3 className="font-display text-xl text-ink">{title}</h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
