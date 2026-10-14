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
    mini: 'Tell us about your move',
    pricing: 'Talk to us',
  },
  home: {
    heroEyebrowSegments: ['Relocation planning', 'Residency', 'Settling in'],
    heroSecondaryButton: 'Explore scouting trips',
    packagesTitle: 'Packages and prices',
    packagesIntro:
      'Three packages. Pick the one that matches how much you want handled for you.',
    packagesNote: 'All prices shown in USD.',
    packages,
    whyTitle: 'Why work with us',
    miniCtaCopy:
      "Tell us when you're moving and who's coming. We'll reply within 48 hours with what to do first.",
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
      'Decided, but not started yet',
      'Gathering documents',
      'Documents mostly ready',
      'Already in Uruguay',
      'Not sure',
    ],
  },
};

export type SiteCopy = typeof siteCopy;
