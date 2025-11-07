import { Helmet } from 'react-helmet-async';
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
import { sanitizeText } from '../utils/sanitize';

const NAV_ITEMS = [
  { href: '#before-you-move', label: 'Before You Move' },
  { href: '#residency', label: 'Residency & Immigration' },
  { href: '#documents', label: 'Documents & Apostilles' },
  { href: '#setup', label: 'Housing & Utilities' },
  { href: '#banking', label: 'Banking & Finance' },
  { href: '#healthcare', label: 'Healthcare & Education' },
  { href: '#logistics', label: 'Logistics (Shipping & Pets)' },
  { href: '#life', label: 'Life in Uruguay' },
  { href: '#contacts', label: 'Government Contacts' },
  { href: '#glossary', label: 'Glossary / FAQ' },
];

const PREMOVE_PLANNING = [
  'Build a realistic budget (USD 1,500-2,500 per person) plus a 3-6 month cushion so Uruguay\'s higher prices never stall your plan.',
  'Remember seasons are flipped: pack proper winter layers, a dehumidifier pack, and plan for breezy summers.',
  'Study neighborhoods, transport, and how stable tap water and infrastructure simplify daily life.',
];

const PAPERWORK_STEPS = [
  'Request apostilled birth, marriage, divorce, and name-change documents before you fly.',
  'Secure national police certificates for every country lived in during the last five years and note their short validity windows.',
  'Store digital and paper copies of every certificate so local translators and notaries can work quickly.',
];

const PACKING_AND_PETS = [
  'Bring 90 days of prescriptions plus specialty clothing or shoe sizes that are hard to find locally.',
  'Only move electronics that handle 220V or plan to buy appliances once you arrive.',
  'Pets need ISO microchips, rabies shots (21+ days old), parasite treatment, and a government health certificate timed to travel.',
];

const UTILITY_STEPS = [
  'Book UTE (electric), OSE (water), and Antel (internet) visits as soon as the lease is signed; technicians often schedule a week out.',
  'Have the lease, passport or cedula, and a phone number ready when crews arrive.',
  'Keep every utility receipt because banks, schools, and notaries accept them as proof of address.',
  'Uruguay\'s tap water is drinkable, so reusable bottles beat shipping bulky filters.',
];

const HEALTHCARE_POINTS = [
  'ASSE covers everyone, but lines can be long, so schedule non-urgent visits early in the day.',
  'Private mutualistas usually stay under USD 100 per adult monthly and include clinics, specialists, and emergency care.',
  'British Hospital, CASMU, and MUCAM have multilingual staff and onboarding teams comfortable with foreign paperwork.',
  'Carry vaccine records and current prescriptions; pharmacies accept most international scripts.',
];

const EDUCATION_POINTS = [
  'Public schools are free, compulsory, and secular, so expect formal attendance tracking once you hold a cédula.',
  'Homeschooling is not recognized; enroll in a registered school or accredited distance program.',
  'International campuses (American, British, Ivy Thomas) cluster in Carrasco and fill quickly, especially for lower grades.',
  'Bring apostilled transcripts plus translated immunization cards to speed up placement interviews.',
];

const FINANCE_TIPS = [
  'Keep remote or foreign income flowing-local wages average around USD 400 per month and seldom cover rent.',
  'Use dual-currency accounts so you can pay rent or school fees in USD while handling groceries and utilities in pesos.',
  'Document every deposit to choose between Uruguay\'s 11-year foreign-income holiday or the 7 percent flat tax on passive earnings.',
  'U.S. citizens must complete FATCA forms, file IRS returns on time, and keep Social Security letters handy for notaries.',
];

export default function Resources() {
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
            {sanitizeText(
              'Your personalized roadmap to navigate residency, paperwork, and everyday logistics with confidence. Follow each block to stay on top of legal requirements while building your new life in Uruguay.'
            )}
          </p>
          <p className="mt-4 text-lg text-ink/70 md:text-xl">
            {sanitizeText(
              'Keep this page handy during your move - each section links to checklists, provider tips, and the agencies you will work with.'
            )}
          </p>
        </div>
      </Section>

      <AnchorNav items={NAV_ITEMS} />

      <Section className="bg-base-100">
        <div id="before-you-move" className="scroll-mt-32 space-y-8">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Before You Move</p>
          <div className="max-w-3xl space-y-4">
            <h2 className="font-display text-3xl text-ink md:text-4xl">Lay the groundwork from home</h2>
            <p className="text-base text-ink/80">
              {sanitizeText(
                'Uruguay\'s small population, steady democracy, and reliable utilities make settling in predictable, but success still hinges on the preparation you do while abroad.'
              )}
            </p>
            <p className="text-base text-ink/80">
              {sanitizeText(
                'Treat this stage as your safety net: confirm budgets, line up paperwork, and understand that the culture values calm, respectful interactions-especially when you need help from officials.'
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Plan & budget</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">Stability first</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {PREMOVE_PLANNING.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Paperwork runway</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">Before you fly</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {PAPERWORK_STEPS.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Packing & pets</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">Logistics</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {PACKING_AND_PETS.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <AlertCallout type="tip" title="Line up support">
            {sanitizeText(
              'Book exploratory calls, speak with expat groups, and consider hired help for complex steps like shipments or school placement-it keeps surprises to a minimum once you land.'
            )}
          </AlertCallout>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="residency" className="scroll-mt-32 space-y-8">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Residency</p>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Legal Residency & Immigration
            </h2>
            <p className="mt-4 text-base text-ink/80">
              {sanitizeText(
                'Most visitors arrive visa-free, file their residency in-country, and remain at least half the year while the case moves forward. Map out the route that matches your passport, income source, and desired timeline before you book appointments.'
              )}
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
              <div className="collapse-content text-sm text-ink/80 space-y-4">
                <p>
                  {sanitizeText(
                    'Permanent residency is the standard finish line, but there are stepping stones: mercosur filings for regional nationals, family-based cases for spouses or children of Uruguayans, and a digital nomad permit that grants 180 days (renewable once) before transitioning into a full file.'
                  )}
                </p>
                <p>
                  {sanitizeText(
                    'Every applicant receives a provisional ID card while they wait, so keep it handy for banking, healthcare, and travel inside the region.'
                  )}
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
                  {sanitizeText(
                    'A trusted notary (Escribano) will certify your income letter, pull foreign statements, and document 90 days of local fund usage-the backbone of every Rentista-style case.'
                  )}
                </AlertCallout>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-sky/15 bg-base-100/95">
              <input type="checkbox" />
              <div className="collapse-title font-display text-lg text-ink">Physical Presence</div>
              <div className="collapse-content space-y-4 text-sm text-ink/80">
                <p>{residency.presence}</p>
                <AlertCallout type="warning" title="Avoid long absences">
                  {sanitizeText(
                    'Travel breaks are fine, but prolonged time outside Uruguay can reset momentum. Track entries and exits so you can show six or more months on the ground each year.'
                  )}
                </AlertCallout>
              </div>
            </div>

            <div className="collapse collapse-arrow border border-sky/15 bg-base-100/95">
              <input type="checkbox" />
              <div className="collapse-title font-display text-lg text-ink">Timeline</div>
              <div className="collapse-content space-y-4 text-sm text-ink/80">
                <p>{residency.timeline}</p>
                <AlertCallout type="tip" title="Secure appointments ahead of time">
                  {sanitizeText(
                    'Dirección Nacional de Migración slots disappear fast-reserve one to two months ahead, especially around holidays, and carry printed confirmations to every visit.'
                  )}
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
              {sanitizeText(
                'Tackle the "before" list while you are still abroad, then use the "after" list once you land. Each checklist remembers your progress on this device so nothing slips through the cracks.'
              )}
            </p>
          </div>

          <AlertCallout type="warning" title="Start apostilles immediately">
            {sanitizeText(
              'Foreign ministries can take weeks to issue apostilles, and replacing a missing document from Uruguay often means courier delays or even a return trip. Start now.'
            )}
          </AlertCallout>

          <div className="grid gap-6 md:grid-cols-2">
            <Checklist title="Do this before you arrive" items={docs.before} storageKey="docs-before-v1" />
            <Checklist title="Do this after you arrive" items={docs.after} storageKey="docs-after-v1" />
          </div>

          <AlertCallout type="warning" title="Translate locally in Uruguay">
            {sanitizeText(
              'Uruguayan authorities expect translations from a locally licensed traductor público. Save time by translating everything once you arrive.'
            )}
          </AlertCallout>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="setup" className="scroll-mt-32 space-y-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Housing & Utilities</p>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Secure your base and switch everything on
            </h2>
            <p className="mt-4 text-base text-ink/80">
              {sanitizeText(
                'Plan to spend your first weeks in Montevideo while you hunt for a 12-month lease, line up a garantía (renter insurance), and schedule utilities. A short-term Airbnb gives you breathing room while you compare neighborhoods and commute times.'
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Housing & rentals</h3>
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
                  <h3 className="font-display text-xl text-ink">Utilities & services</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">Switch on</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {UTILITY_STEPS.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Communication</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">Day-one task</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {setup.comms.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <AlertCallout type="tip" title="Proof of address shortcut">
                  {sanitizeText(
                    'Once your Antel SIM and utilities are active, use the receipts as proof of address for banks, schools, and health plans.'
                  )}
                </AlertCallout>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div id="banking" className="scroll-mt-32 space-y-8">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Banking & Finance</p>
          <div className="max-w-3xl space-y-4">
            <h2 className="font-display text-3xl text-ink md:text-4xl">Open accounts & prove income</h2>
            <p className="text-base text-ink/80">
              {sanitizeText(
                'Uruguay\'s banking system is conservative, bilingual at the branch level, and expects tidy paperwork. Bring originals, notarized translations, and patience for multi-visit onboarding.'
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Banking ({setup.banking.bank})</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">Expect return visits</p>
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
                  <h3 className="font-display text-xl text-ink">Finance strategy</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">Think long game</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {FINANCE_TIPS.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <AlertCallout type="warning" title="Carry originals">
            {sanitizeText(
              'Banks rarely accept scans. Bring physical statements, tax letters, leases, and proof of income every time-you may be asked to show them more than once.'
            )}
          </AlertCallout>
        </div>
      </Section>

      <Section className="bg-base-100">
        <div id="healthcare" className="scroll-mt-32 space-y-8">
          <p className="text-sm uppercase tracking-[0.35em] text-sky/70">Healthcare & Education</p>
          <div className="max-w-3xl space-y-4">
            <h2 className="font-display text-3xl text-ink md:text-4xl">Keep your family covered</h2>
            <p className="text-base text-ink/80">
              {sanitizeText(
                'Blend public guarantees with private speed: enroll in a mutualista for everyday care, keep ASSE for backstop services, and file school paperwork early so the academic calendar stays on track.'
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Healthcare</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">ASSE + mutualistas</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {HEALTHCARE_POINTS.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card h-full border border-sky/15 bg-base-100/95 shadow-md shadow-sky/10">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Education</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-sky/60">Primary to Bachillerato</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-ink/80">
                  {EDUCATION_POINTS.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <AlertCallout type="tip" title="Keep records handy">
            {sanitizeText(
              'Carry paper and digital copies of medical histories, immunization cards, and school transcripts-officials often ask for originals plus a spare set.'
            )}
          </AlertCallout>
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
              {sanitizeText(
                'Containers can cost USD 20,000-30,000, parcels crawl through customs, and airlines cap pet slots-so plan every shipment with Uruguay\'s timelines and limits in mind.'
              )}
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
              {sanitizeText(
                'Uruguay pairs low crime rates with progressive laws and a live-and-let-live vibe. Accept the tranquilo pace, invest in Spanish, and you\'ll plug into community faster.'
              )}
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
              Save this roster of agencies you\'ll encounter throughout the residency process. Bring
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
              Brush up on common terms you\'ll hear from notaries, brokers, and new Uruguayan
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
