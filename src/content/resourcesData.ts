// Content for the Resources page (/resources). Every fact on that page lives here,
// so a number or a rule only ever has to be changed in one place.

export type ChecklistItem = {
  id: string;
  label: string;
};

export type InfoCard = {
  title: string;
  body: string;
};

export type GovernmentContact = {
  office: string;
  purpose: string;
  href: string;
  linkLabel: string;
};

export type GlossaryItem = {
  term: string;
  def: string;
};

export type FAQItem = {
  q: string;
  a: string;
};

// The national minimum wage is the income requirement for residency, per person.
// Source: Decreto 319/2025, 25,383 pesos from 1 July 2026. Update it when it changes.
export const MINIMUM_WAGE_PESOS = '25,383';
export const MINIMUM_WAGE_USD = 'roughly USD 600 to 690';

export const residencySteps: InfoCard[] = [
  {
    title: 'Gather your documents at home',
    body: 'Order your apostilled birth certificate, your marriage or divorce certificate if they apply, your police clearances, and the documents that prove your income. The Documents section below has the full list.',
  },
  {
    title: 'Book your DNM appointment',
    body: 'You pay a fee when you schedule it. The fee is not refunded if you miss the appointment. Good slots fill up months ahead, so book as early as you can.',
  },
  {
    title: 'Get your health card (carné de salud)',
    body: 'You do the medical check in Uruguay. You need your tetanus and measles vaccinations.',
  },
  {
    title: 'Go to your DNM appointment',
    body: 'It takes 30 to 40 minutes and it is a document check. The DNM will not go ahead if you cannot communicate in Spanish, so bring someone who can translate for you. When it is done you are "en trámite" (in process) and you receive a temporary cédula.',
  },
  {
    title: 'Wait in "en trámite"',
    body: 'Expect about 6 to 8 months. You can work legally while you wait, and you can leave Uruguay with a travel permit that costs about USD 30.',
  },
  {
    title: 'Your residency is finalized',
    body: 'The DNM approves your residency. This is the least predictable part of the whole process, because nobody can say exactly when approval will arrive.',
  },
  {
    title: 'Convert your birth certificate at the Registro Civil',
    body: 'Your foreign birth certificate, and your marriage certificate if you have one, is registered in Uruguay. New appointments are released at random times, so check often.',
  },
  {
    title: 'Receive your permanent resident cédula',
    body: 'This is your Uruguayan ID. Citizenship is available 5 years after the date you filed.',
  },
];

export const residencyPathways: InfoCard[] = [
  {
    title: 'Permanent residency',
    body: 'The route most of our clients take. You show regular income from abroad, and there is no yearly renewal.',
  },
  {
    title: 'Temporary residency',
    body: 'Granted for a limited period and renewed. It suits students, employees and people who want to start with a shorter commitment.',
  },
  {
    title: 'Mercosur residency',
    body: 'For nationals of Mercosur and associated countries. The requirements are different and simpler, so make sure you follow the right list.',
  },
  {
    title: 'Digital nomad permit',
    body: 'For remote workers. It is valid for 180 days and can be renewed once, which makes it a useful way to start.',
  },
  {
    title: 'Residency through a family link',
    body: 'For people with a close family link to a Uruguayan citizen, such as a spouse or a child.',
  },
];

export const incomeBullets: string[] = [
  `The income requirement is the national minimum wage, per person. In 2026 it is ${MINIMUM_WAGE_PESOS} pesos a month (from 1 July 2026), which is ${MINIMUM_WAGE_USD} depending on the exchange rate.`,
  'The income has to come from outside Uruguay and be regular. Pensions, social security, rental income, dividends and stable remote or self-employment all count.',
  'You prepare your income documents at home and have them notarized in Uruguay by an escribano (notary). If you are employed by a Uruguayan company, you do not need this.',
  'Foreign bank statements do not need an apostille or any special stamp.',
];

export const otherResidencyFacts: string[] = [
  'You do not need an immigration lawyer for a standard residency.',
  'A tourist visa is enough to start. Depending on your passport, you may need a visa just to enter Uruguay, so check that before you book flights.',
  'You can work legally with your in-process cédula.',
  'Asylum and refugee applications go through CONARE, a separate process from the DNM.',
  'You do not need residency to buy property.',
];

export const docs: { before: ChecklistItem[]; after: ChecklistItem[] } = {
  before: [
    { id: 'passport', label: 'Valid passport' },
    { id: 'birth', label: 'Birth certificate (apostilled)' },
    {
      id: 'marriage',
      label: 'Marriage or divorce certificate, if it applies (apostilled)',
    },
    {
      id: 'police',
      label:
        'Police clearance from every country you have lived in over the last 5 years (apostilled, valid for 6 months)',
    },
    {
      id: 'income',
      label: 'Documents that prove your income, ready to take to a Uruguayan notary',
    },
  ],
  after: [
    { id: 'health', label: 'Carné de salud, with your tetanus and measles vaccinations' },
    {
      id: 'translations',
      label: 'Translations of your apostilled documents, done in Uruguay by a sworn translator',
    },
    { id: 'incomeCert', label: 'Income certificate from a Uruguayan notary (escribano)' },
    {
      id: 'registro',
      label: 'Birth (and marriage) certificate converted at the Registro Civil, after your residency is finalized',
    },
  ],
};

export const policeClearanceExamples =
  'Which police clearance you need depends on your country. Americans use the FBI check, Canadians the RCMP check, and South Africans a South African police clearance.';

export const housing = {
  portals: ['InfoCasas', 'MercadoLibre'],
  notes: [
    'Most of our clients look in Pocitos, Punta Carretas, Buceo, Malvín and Carrasco.',
    'A decent one-bedroom in Pocitos costs about 20,000 to 30,000 pesos a month.',
    'The garantía de alquiler (rental guarantee) is an insurance policy if you are employed by a Uruguayan company. Otherwise landlords usually ask for a deposit of three to six times the rent, and the deposit is fully refundable.',
  ],
  utilities: [
    'UTE (electricity), OSE (water) and Antel (internet) connect almost immediately, because it is a name change from the landlord to you.',
    'Have your lease, your passport or cédula and a phone number ready.',
    'Keep every utility receipt. Banks, schools and notaries accept them as proof of address.',
    'Tap water is safe to drink, so you do not need to ship a filter.',
  ],
  comms: [
    'Get an Antel SIM as soon as you arrive. You can walk in and buy one, with no setup cost.',
    'A local number helps you get your first utility bill, which you can use as proof of address.',
    'Keep your home number for verification codes. Some banks reject Google Voice, so keep an old phone with your real SIM.',
  ],
};

export const banking = {
  intro:
    'Uruguayan banks want tidy paperwork, so bring original documents and expect more than one visit.',
  bank: 'Banking: we recommend Itaú',
  bullets: [
    'We recommend Itaú because it does not ask for a large balance to open an account.',
    'Opening an account as a non-resident is possible, with more paperwork.',
    'Bring your passport, proof of income, foreign bank statements, tax statements and a Uruguayan utility bill as proof of address.',
    'A local bank reference letter is required.',
    'Most foreigners pay about USD 40 a month as non-residents and about USD 20 as residents.',
    'Americans pay more: about USD 200 to open the account and about USD 80 a month. Americans also fill in FATCA forms (W-9 or W-8BEN).',
    'Wise and Prex are alternatives. Prex is a prepaid debit card linked to PayPal, with an annual limit of USD 16,000.',
  ],
  finance: [
    `Keep your foreign or remote income coming in. The national minimum wage is ${MINIMUM_WAGE_PESOS} pesos a month, so most newcomers do not rely on a local salary.`,
    'Dollars and pesos are both used day to day. The exchange rate has been steady at roughly 37 to 42 pesos per dollar, and property is always bought in dollars.',
    'Foreign income is tax-free for the first 11 years of residency. A flat 7% option also exists, and an accountant can tell you which one fits your situation.',
    'US citizens still file US tax returns and should keep their Social Security letters handy for notaries.',
  ],
};

export const healthcare: string[] = [
  'Public care goes through ASSE. Most newcomers choose a private mutualista (health plan) for everyday care.',
  'We usually recommend CASMU and COSEM. A healthy young adult pays roughly USD 80 to 100 a month. The price goes up with age and with any previous health conditions.',
  'Mutualistas are open to residents of every age, though the monthly price rises as you get older.',
  'The British Hospital has English-speaking staff throughout, but it is a lot more expensive. You can find English-speaking doctors at CASMU and COSEM, and you can hire us for hourly interpretation.',
  'Carry your vaccine records and current prescriptions.',
];

export const education: string[] = [
  'Public schools are free, and they are the best way for children to truly integrate, in language and in culture.',
  'International schools exist and some follow the American curriculum. We do not recommend them if you want your children to truly integrate, because they keep children apart from Uruguayan language and culture.',
  'We help families with school search, as part of the Family Package or as a separate service.',
  'Keep paper and digital copies of medical histories, immunization cards and school transcripts.',
];

export const logistics = {
  packing: [
    'Good shoes and boots, which are expensive locally.',
    'Quality kitchen knives.',
    'Prescriptions, and clothing in sizes that are hard to find locally.',
    'Niche spices such as Tajín and nutritional yeast.',
    'Buy laptops and phones before you move, because electronics cost a lot more in Uruguay.',
  ],
  voltage:
    'Uruguay uses 220V. Check the label on each appliance, and buy high-power motorized appliances such as blenders and dryers locally.',
  mail: [
    'You can receive up to USD 800 a year in personal purchases tax-free by post or courier, in a maximum of 3 shipments a year. The goods have to be for personal use, not for resale.',
    'You register once with the Dirección Nacional de Aduanas to use the exemption. The person who pays has to be the person who receives the package, paying by card or an international payment platform.',
    'Packages can weigh up to 20 kg and be worth up to USD 800. Above the exemption, the courier regime charges a single 60% tax on the purchase value, and VAT can apply on top depending on the product.',
    'These rules changed in 2026, so check the current rules with Aduanas before you place a large order.',
  ],
  containers:
    'A shipping container costs about USD 20,000 to 30,000. It has to arrive within 6 months of your own arrival, or you face customs problems and fines of up to about USD 30,000. It is only worth it for high-value belongings.',
  pets: [
    'Pets that travel with you do not need an MGAP authorization. You present the paperwork at the border when you arrive.',
    'Dogs must be microchipped.',
    'The rabies vaccine has to be current. For a first vaccination, it has to be given at least 21 days before you enter.',
    'A licensed vet examines your pet within 10 days before the international health certificate is issued.',
    'Your pet needs internal and external deworming within 15 days before the certificate is issued. For dogs, the internal dewormer has to contain praziquantel.',
    'Dogs from countries not declared free of leishmaniasis need a negative test taken within 60 days before entry.',
    'Pets that arrive as cargo at Carrasco Airport need MGAP to be notified at least 72 working hours before arrival.',
    'There is no fee for dogs and cats.',
  ],
  petsNote:
    'These rules come from the Ministerio de Ganadería, Agricultura y Pesca (MGAP), last updated in January 2026. Check the official page before you book anything.',
  petsLink: 'https://www.gub.uy/tramites/solicitud-ingreso-mascotas-uruguay',
};

export const life = {
  intro:
    'Uruguay is one of the most stable democracies in the world, with progressive laws and a relaxed pace. Montevideo is walkable, the bus system is excellent, and fiber internet covers the whole city.',
  language: [
    'You need Spanish for local jobs and for most official business. Learn Uruguayan Spanish, which uses "vos" and has its own rhythm.',
  ],
  jobs: [
    `The market is small, with about 3 million people. The national minimum wage is ${MINIMUM_WAGE_PESOS} pesos a month.`,
    'Most newcomers keep remote income in USD or EUR.',
    'English teaching pays little, about USD 10 an hour for around 10 hours a week.',
  ],
  culture: [
    'The pace is relaxed ("tranqui"). Services can be slower than you are used to, and people ask for what they need directly. A kiss on the cheek is a normal greeting.',
  ],
  goods: [
    'Imported goods cost about twice what they do abroad. Food is generally not spicy.',
    'Day-to-day crime is mostly petty theft, such as phone and bag snatching, usually without weapons.',
  ],
  community: [
    'The expat scene is growing but small. Mix expat and Uruguayan friends, and keep learning Spanish.',
  ],
};

export const contacts: GovernmentContact[] = [
  {
    office: 'DNM (Dirección Nacional de Migración)',
    purpose: 'Residency applications and the digital nomad permit.',
    href: 'https://www.gub.uy/tramites/residencia-legal',
    linkLabel: 'Residency procedures on gub.uy',
  },
  {
    office: 'DNIC (Dirección Nacional de Identificación Civil)',
    purpose: 'Your cédula (ID).',
    href: 'https://www.gub.uy/tramites',
    linkLabel: 'Search procedures on gub.uy',
  },
  {
    office: 'Registro Civil',
    purpose: 'Converting your foreign birth and marriage certificates.',
    href: 'https://www.gub.uy/tramites',
    linkLabel: 'Search procedures on gub.uy',
  },
  {
    office: 'Interpol Montevideo',
    purpose: 'An alternative for your police clearance if you did not get one at home, or if yours has expired.',
    href: 'https://www.gub.uy/tramites',
    linkLabel: 'Search procedures on gub.uy',
  },
  {
    office: 'DGI (tax authority)',
    purpose: 'Tax matters.',
    href: 'https://www.gub.uy/direccion-general-impositiva/',
    linkLabel: 'Open the DGI site',
  },
  {
    office: 'BPS (social security)',
    purpose: 'Social security matters.',
    href: 'https://www.bps.gub.uy/',
    linkLabel: 'Open the BPS site',
  },
  {
    office: 'MGAP (agriculture ministry)',
    purpose: 'Bringing pets into Uruguay.',
    href: 'https://www.gub.uy/tramites/solicitud-ingreso-mascotas-uruguay',
    linkLabel: 'Pet import rules',
  },
];

export const glossary: GlossaryItem[] = [
  { term: 'apostille', def: 'A stamp that makes a document issued in one country valid in another. You get it in your home country.' },
  { term: 'escribano', def: 'A public notary. They certify your income documents and work with the sworn translator.' },
  { term: 'traductor público', def: 'A Uruguayan sworn translator. The DNM only accepts translations they do in Uruguay.' },
  { term: 'DNM', def: 'Dirección Nacional de Migración, the immigration office where you apply for residency.' },
  { term: 'en trámite', def: 'In process. Your status from your DNM appointment until your residency is finalized.' },
  { term: 'cédula', def: 'Your Uruguayan ID card. You get a temporary one when you are en trámite and a permanent one when your residency is finished.' },
  { term: 'carné de salud', def: 'The health card you need for your residency, and for many other procedures.' },
  { term: 'mutualista', def: 'A private health plan, such as CASMU or COSEM.' },
  { term: 'ASSE', def: 'The public health service.' },
  { term: 'garantía de alquiler', def: 'The rental guarantee a landlord asks for. It is an insurance policy or a refundable deposit.' },
  { term: 'vos', def: 'The informal "you" used in Uruguayan Spanish.' },
  { term: 'tranqui', def: 'Relaxed. It describes the local pace.' },
];

export const faqs: FAQItem[] = [
  {
    q: 'Do I need a lawyer for residency?',
    a: 'No. A standard residency does not need an immigration lawyer. You do need a notary for your income documents and a sworn translator for your translations.',
  },
  {
    q: 'How long does residency take?',
    a: 'Once you are en trámite, expect about 6 to 8 months until your residency is finalized. The most avoidable delay is not having your documents ready.',
  },
  {
    q: 'Do I need to speak Spanish at my DNM appointment?',
    a: 'You need to be able to communicate in Spanish. The DNM will not go ahead with an appointment otherwise, so bring someone who can translate for you.',
  },
  {
    q: 'Can I work while my residency is processing?',
    a: 'Yes. You can work legally with your in-process cédula.',
  },
  {
    q: 'When should I start the apostille process?',
    a: 'Immediately. It is difficult to get apostilles once you are already in Uruguay.',
  },
  {
    q: 'Can I open a bank account as a non-resident?',
    a: 'Yes, with more paperwork. See the banking section above for what to bring and what it costs.',
  },
  {
    q: 'Can I drink the tap water?',
    a: 'Yes, it is safe. In very old buildings you may want to test for lead.',
  },
  {
    q: 'Can I use my appliances from the US or Canada?',
    a: 'Uruguay uses 220V. Check the label on each appliance, and buy high-power motorized appliances locally.',
  },
  {
    q: 'Is it worth shipping a full container?',
    a: 'Only if you have very valuable belongings. It costs USD 20,000 to 30,000 and has to arrive within 6 months of your own arrival.',
  },
];
