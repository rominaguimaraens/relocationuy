import { packages } from './packages';

export const siteCopy = {
  site: {
    title: 'Uruguay Relocation Companion',
    tagline: 'Personalized bilingual support for a smooth, stress-free move to Uruguay.',
    email: 'contact@relocationuy.com',
    domain: 'relocationuy.com',
  },
  nav: {
    home: 'Home',
    about: 'About',
    pricing: 'Pricing & Services',
    scouting: 'Scouting Trips',
    resources: 'Resources',
    blog: 'Blog',
    contact: 'Contact',
  },
  cta: {
    primary: 'Book free consultation',
    floating: 'Book your free 30-min call',
    mini: "Let's plan your move together",
    pricing: 'Talk to us',
  },
  home: {
    heroEyebrowSegments: ['Relocation planning', 'Residency', 'Settling in'],
    heroTagline: `Moving to Uruguay shouldn't feel like solving a bureaucratic puzzle in a language you don't speak. We're Romina and Tomas — two Montevideo locals who handle the confusing parts (paperwork, appointments, translations, the "wait what document do they need?" moments) so you can actually breathe and start building your new life.
Whether you're fleeing, exploring, or just ready for something new — you deserve support that feels human, not transactional.`,
    heroSecondaryButton: 'Explore scouting trips',
    packagesTitle: 'Packages Overview',
    packagesIntro:
      'Choose the level of support that fits your relocation. Every package comes with bilingual guidance, clear timelines, and a calm, organized approach.',
    packagesNote: 'All prices shown in USD.',
    packages,
    whyTitle: 'Why work with Uruguay Relocation Companion?',
    whyBody: `**Because we're not just processing your paperwork — we're actually *with* you.**

Most relocation services send you a checklist and wish you luck.  
**We show up.**  
We go to your appointments.  
We translate in real-time so you understand what's being asked.  
We walk you through neighborhoods and tell you which caf?s have the best medialunas and which streets feel safest at night.

---

### ??? We're bilingual locals who speak *your* language

Fluent in English and Spanish, we translate not just words but culture ?  
the unspoken rules, the neighborhood personalities, and the  
*?why does it work this way??* questions Google will never answer.

---

### ?? We're born-and-raised Montevideanos with deep roots here

We're not expats who moved here recently.  
We grew up here.  
We know every shortcut, every government office quirk, every  
?this is how it actually works? insider detail.

---

### ?? We treat you like a person, not a transaction

You're not Client #247.  
You're someone making one of the biggest decisions of your life.  
We don't rush you. We don?t judge you.  
**We just help.**`,
    miniCtaCopy:
      "Share a few details about your move and we'll build a personalized relocation roadmap for you.",
  },
  pricing: {
    title: 'Packages & Services',
    note: 'All prices are in USD',
    packages,
    otherServicesTitle: 'Other services',
    otherServices: [
      { name: 'Hourly interpretation', price: '$80 base, $65 per extra hour' },
      { name: 'Rental search and accompaniment', price: 'half a month\'s rent (minimum $400)' },
      { name: 'Property search and accompaniment', price: '5% commission' },
      { name: 'School Placement Assistance', price: '$300' },
      { name: 'Pet Relocation Assistance', price: '$150' },
      { name: 'Banking Assistance', price: '$200' },
      { name: "Driver's License Conversion", price: '$125' },
    ],
  },
  resources: {
    heroTitle: 'Resources',
    intro:
      "Guides and bite-sized explainers to help you understand Uruguay's residency process and everyday logistics.",
    cards: [
      {
        title: 'Residency (DNM)',
        description:
          'Documentation, timelines, and what to expect at the Dirección Nacional de Migración.',
        to: '/resources/residency-basics',
      },
      {
        title: 'Carné de salud',
        description: 'Where to schedule, which exams are required, and how to prepare for the appointment.',
        to: '/resources/health-card',
      },
      {
        title: 'Obtaining your cédula',
        description: 'Step-by-step guide to securing your Uruguayan ID after residency approval.',
        to: '/resources/cedula-guide',
      },
      {
        title: 'Certified translations',
        description: 'When you need them, typical turnaround times, and trusted providers.',
        to: '/resources/certified-translations',
      },
      {
        title: 'Phone service & banks',
        description: 'Stay connected and open accounts quickly with our practical tips.',
        to: '/resources/sim-and-banks',
      },
      {
        title: 'Housing & rentals',
        description: 'Neighborhood insights, how contracts work, and common pitfalls to avoid.',
        to: '/resources/rentals',
      },
    ],
    note: 'We update these guides as regulations change.',
    placeholderTitle: 'Guide coming soon',
    placeholderBody:
      "We're expanding this resource right now. Need help sooner? Book a consultation and we'll walk you through the process personally.",
  },
  contact: {
    heroTitle: 'Contact',
    intro: "Ready to talk about your move? Share a few details and we'll reply with next steps.",
    responseNote: 'We respond within 24\u201348 hours in English or Spanish.',
    quickLinksTitle: 'Reach out directly',
    whatsappText: "Hello! I'm interested in relocating to Uruguay and would love to talk.",
    // Only shown when VITE_SCHEDULER_URL is set (see .env.example).
    scheduler: {
      title: 'Pick a time',
      body: 'Choose a slot for a free 30-minute call. No form needed.',
      button: 'See available times',
    },
    form: {
      name: 'Name',
      email: 'Email',
      whatsapp: 'WhatsApp number',
      detailsNote: 'A few quick details help us prepare. All optional.',
      timeline: 'When are you planning to move?',
      travelers: "Who's moving?",
      stage: 'Where are you in the process?',
      source: 'How did you find us?',
      message: 'Anything else you want us to know? (optional)',
      packageInterest: 'Package interest (optional)',
      selectPlaceholder: 'Select an option',
      submit: 'Send message',
      sending: 'Sending…',
      successTitle: 'Message sent!',
      successMessage:
        'Thank you for reaching out. We will contact you within 48 hours with next steps.',
      error: 'Something went wrong. Please try again or email us directly.',
    },
    packages: [
      ...packages.map((item) => ({ value: item.id, label: item.name })),
      { value: 'other', label: 'Other / Not sure yet' },
    ],
    timelineOptions: [
      'Within 3 months',
      '3 to 6 months',
      '6 to 12 months',
      'More than a year away',
      'I am already in Uruguay',
      'Not sure yet',
    ],
    travelersOptions: ['Just me', 'Me and a partner', 'A family with children', 'Something else'],
    stageOptions: [
      'Still researching',
      'Gathering documents',
      'Documents mostly ready',
      'Already in Uruguay',
      'Not sure',
    ],
  },
};

export type SiteCopy = typeof siteCopy;
