export type ResidencyOption = {
  title: string;
  body: string;
};

export type ResidencyData = {
  options: ResidencyOption[];
  income: {
    title: string;
    bullets: string[];
  };
  presence: string;
  timeline: string;
};

export type ChecklistItem = {
  id: string;
  label: string;
};

export type DocsData = {
  before: ChecklistItem[];
  after: ChecklistItem[];
};

export type PracticalSetupData = {
  housing: {
    search: string[];
    notes: string[];
  };
  banking: {
    bank: string;
    bullets: string[];
  };
  comms: {
    bullets: string[];
  };
};

export type LogisticsData = {
  packing: string[];
  voltage: string;
  mail: string[];
  containers: string[];
  pets: string[];
};

export type LifeSection = string[];

export type LifeData = {
  language: LifeSection;
  jobs: LifeSection;
  culture: LifeSection;
  goods: LifeSection;
  community: LifeSection;
};

export type GovernmentContact = {
  office: string;
  purpose: string;
};

export type GlossaryItem = {
  term: string;
  def: string;
};

export type FAQItem = {
  q: string;
  a: string;
};

export const residency: ResidencyData = {
  options: [
    { title: 'Permanent Residency', body: 'Typical goal; grants PR status upon approval.' },
    { title: 'Temporary Residency', body: '6 months to 2 years; common for students or employees.' },
    {
      title: 'Digital Nomad Permit',
      body: 'Valid 180 days, renewable once; useful entry point.',
    },
  ],
  income: {
    title: 'Income Requirement (Rentista / Independent Means)',
    bullets: [
      'Prove legal, stable income generated outside Uruguay.',
      'Minimum USD 600/person/month (bare minimum).',
      'Recommended USD 1,200–1,500/person/month; ~USD 3,000 for a couple.',
      'Accepted: pensions, social security, rentals, dividends, stable remote/self-employment.',
      'Income must be certified by a Uruguayan Notary (Escribano).',
      'Show foreign bank statements, transfers to a Uruguayan account, and 90 days of use in Uruguay.',
    ],
  },
  presence: 'Plan 6–8 months per year in Uruguay during processing.',
  timeline: 'Processing generally 6–18 months (often 8–18). Book DNM 1–2 months ahead.',
};

export const docs: DocsData = {
  before: [
    { id: 'passport', label: 'Passport valid 6+ months' },
    { id: 'birth', label: 'Birth certificate (apostilled)' },
    {
      id: 'marriage',
      label: 'Marriage/Divorce certificate if applicable (apostilled)',
    },
    {
      id: 'police',
      label:
        'National police clearance (FBI/RCMP/etc.) for every country lived in >180 days over last 5 years (apostilled)',
    },
  ],
  after: [
    { id: 'health', label: 'Carné de Salud + vaccinations (2 measles, 3 tetanus)' },
    {
      id: 'translations',
      label: 'Official translations done in Uruguay by a certified translator',
    },
    { id: 'incomeCert', label: 'Income certificate from a Uruguayan Notary (Escribano)' },
    { id: 'registro', label: 'Register foreign birth/marriage in Registro Civil (8–12 month backlog)' },
  ],
};

export const setup: PracticalSetupData = {
  housing: {
    search: ['Mercado Libre (Alquiler)', 'InfoCasas'],
    notes: [
      'First year: consider Montevideo (Pocitos, Punta Carretas). Closer to La Rambla is generally safer.',
      'Garantía de Alquiler for 12+ month leases; landlords often prefer renter’s insurance (e.g., Aseguros).',
      'Income proof typically 3× rent.',
      'UTE & Antel require on-site visits; allow 1–2 weeks.',
    ],
  },
  banking: {
    bank: 'Itaú (example)',
    bullets: [
      'Non-resident accounts possible but complex.',
      'Docs: passport, proof of income, foreign bank statements, tax statements, Uruguayan utility bill (address).',
      'US citizens: FATCA forms (W-9/W-8BEN) and passport.',
      'Local bank reference letter required.',
      'Fees: ~USD 40/month (non-residents), ~USD 20 (residents).',
    ],
  },
  comms: {
    bullets: [
      'Get Antel SIM immediately; offices expect local number.',
      'Local number helps generate utility bill for proof of address.',
      'Keep US number via Google Voice for codes; keep an old physical phone for banks that reject GV.',
    ],
  },
};

export const logistics: LogisticsData = {
  packing: [
    'Good shoes/boots (expensive locally).',
    'Quality kitchen knives.',
    'Buy laptops/phones before moving (high tariffs).',
    'Bring prescriptions; larger sizes of clothing/bras.',
    'Niche spices (e.g., Tajín, nutritional yeast).',
  ],
  voltage: 'Uruguay uses 220V; buy high-watt motorized appliances locally (blenders, dryers, consoles).',
  mail: [
    'No regular mail culture; Amazon not present.',
    'Limit: 3 international shipments/year, each under USD 200.',
    'Expect ~2-month delays for simple mail.',
  ],
  containers: [
    'USD 20,000–30,000; stressful.',
    'Must arrive within 6 months of your arrival or customs problems/fines (up to ~USD 30,000).',
    'Only worth it for high-value belongings.',
  ],
  pets: [
    'Dogs: microchip required; cats recommended/sometimes required for export.',
    'Rabies vaccine 21+ days before travel.',
    'International Vet Certificate within 30 days; deworming + hydatid cyst treatment for dogs.',
    'Airline coordination is usually the hardest part (esp. multiple pets).',
  ],
};

export const life: LifeData = {
  language: ['Spanish is necessary for local jobs; learn Uruguayan Spanish (vos, cadence).'],
  jobs: [
    'Small market (~3M people). Minimum salary ≈ USD 400/month.',
    'Recommend securing remote income in USD/EUR.',
    'English-teaching wage often low (~USD 10/hour, ~10h/week).',
  ],
  culture: [
    "Progressive, very 'tranqui'. Expect slower services; 'ask culture'. Cheek-kiss greetings common.",
  ],
  goods: ['Selection limited (Aldi-like). Imported goods ≈2× price. Food generally not spicy.'],
  community: [
    'Expat scene growing but small; balance expat/Uruguayan friends; keep learning Spanish.',
  ],
};

export const contacts: GovernmentContact[] = [
  { office: 'DNM — Dirección Nacional de Migración', purpose: 'Residency, Digital Nomad Permit' },
  { office: 'DNIC — National Civil Identification', purpose: 'Cédula (ID)' },
  { office: 'Registro Civil', purpose: 'Register foreign birth/marriage certificates' },
  { office: 'DGI — Tax Authority', purpose: 'Tax matters' },
  { office: 'BPS — Social Security', purpose: 'Social security matters' },
  { office: 'Interpol Montevideo', purpose: 'FBI/RCMP background processes' },
];

export const glossary: GlossaryItem[] = [
  { term: 'vos', def: "Rioplatense 2nd-person singular form (informal 'you')." },
  { term: 'tranqui', def: 'Chill/relaxed; describes the local pace.' },
  {
    term: 'garantía de alquiler',
    def: 'Rental guarantee required for long leases; often via insurer.',
  },
  { term: 'carné de salud', def: 'Health card needed for various procedures and work.' },
];

export const faqs: FAQItem[] = [
  {
    q: '¿Se puede tomar agua de la canilla?',
    a: 'Sí, generalmente es muy limpia; en edificios muy antiguos conviene testar plomo.',
  },
  {
    q: '¿Puedo abrir cuenta bancaria como no residente?',
    a: 'Sí, pero es complejo; ver requisitos de Itaú arriba.',
  },
  {
    q: '¿Cuánto tarda la residencia?',
    a: 'Entre 6 y 18 meses (comúnmente 8–18); agendar DNM con 1–2 meses de anticipación.',
  },
  {
    q: '¿Cuándo arranco con las apostillas?',
    a: 'Inmediatamente. Es difícil conseguir apostillas una vez que ya estás en Uruguay.',
  },
  {
    q: '¿Puedo usar mis electrodomésticos de EE.UU. o Canadá?',
    a: 'Uruguay usa 220V; los motores y aparatos de alto voltaje conviene comprarlos acá.',
  },
  {
    q: '¿Vale la pena traer un contenedor completo?',
    a: 'Sólo si tenés bienes muy valiosos; cuesta USD 20–30k y debe llegar dentro de los 6 meses.',
  },
];
