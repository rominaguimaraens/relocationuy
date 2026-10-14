// One source of truth for the three packages.
// Home, Pricing and the contact form dropdown all read from this list,
// so a price or feature only ever needs to change here.

export interface PackageInfo {
  id: 'essential' | 'full' | 'family';
  name: string;
  price: string;
  summary: string;
  features: string[];
  footer?: string;
}

export const packages: PackageInfo[] = [
  {
    id: 'essential',
    name: 'Essential Residency Companion',
    price: '$850 per person',
    summary: 'Step-by-step residency guidance with in-person support and translations.',
    features: [
      'Step-by-step residency guidance',
      'DNM (residency appointment) booking + in-person support',
      'Direct contact with sworn translator',
      'Health card & ID guidance',
      'Ongoing support throughout your process',
    ],
    footer:
      "This package is priced with accessibility in mind. If you're relocating due to safety concerns or financial hardship, please mention this during your free consultation. We offer flexible options and payment plans.",
  },
  {
    id: 'full',
    name: 'Full Relocation Support',
    price: '$1,800 per person',
    summary:
      'For people who want comprehensive support without the stress of coordinating everything themselves. Everything in Essential plus setup and orientation.',
    features: [
      'Includes everything in Essential plus',
      'In-person accompaniment for health card',
      'SIM and utilities setup',
      'Health insurance setup',
      'Banking setup',
      'Rental search and accompaniment',
      'Orientation walk',
      'One-week and one-month check-ins after arrival',
    ],
  },
  {
    id: 'family',
    name: 'Family Package',
    price: '$6,500 (for 4 people)',
    summary:
      'For families of four who want the full package at a slightly lower price. Everything in Full, plus help with school search.',
    features: [
      'Includes everything in Full plus',
      'School search',
      'Guidance on where to get help with pets and moving logistics',
      'Extra person for $950',
    ],
  },
];

// How payment works. Shown under the package cards on Home and Pricing, and on Scouting Trips.
export const packagesPayment =
  'You pay 50% when you book and the other 50% at your first appointment. We accept Wise, Western Union and bank transfer.';
export const scoutingPayment =
  'You pay 50% when you book and the other 50% on the first day of the trip. We accept Wise, Western Union and bank transfer.';

// Shown under the package cards on Home and Pricing.
export const packagesNotIncluded =
  'Apostilles and document preparation in your home country are not included. We tell you what you need and when, and you order it yourself.';
