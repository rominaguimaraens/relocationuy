import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type LocaleKey = 'en' | 'es';

const STORAGE_KEY = 'relocationuy:locale';

const en = {
  site: {
    title: 'Uruguay Relocation Companion',
    tagline: 'Personalized bilingual support for a smooth, stress-free move to Uruguay.',
    email: 'hello@relocationuy.com',
    domain: 'relocationuy.com',
  },
  nav: {
    home: 'Home',
    about: 'About',
    pricing: 'Pricing & Services',
    resources: 'Resources',
    contact: 'Contact',
  },
  languageToggle: {
    ariaLabel: 'Switch language',
    next: 'ES',
  },
  cta: {
    primary: 'Book free consultation',
    floating: 'Book your free consultation',
    mini: 'Let\'s plan your move together',
    pricing: 'Talk to us',
  },
  home: {
    heroEyebrow: 'Relocation planning • Residency • Settling in',
    heroTagline:
      'We handle the paperwork, appointments, and translation so you can focus on enjoying Uruguay.',
    heroSecondaryButton: 'See packages & pricing',
    packagesTitle: 'Packages Overview',
    packagesIntro:
      'Choose the level of support that fits your relocation. Every package comes with bilingual guidance, clear timelines, and a calm, organized approach.',
    packagesNote: 'All prices shown in USD.',
    packages: [
      {
        id: "essential",
        name: "Essential Residency Companion",
        price: "$850",
        summary: "Step-by-step residency guidance with in-person support and translations.",
        features: [
          "Step-by-step residency guidance",
          "DNM (residency appointment) booking + in-person support",
          "2 certified translations",
          "Health card & ID guidance",
          "3-month WhatsApp/email support"
        ],
        supportLength: "3-month support"
      },
      {
        id: "full",
        name: "Full Relocation Support",
        price: "$1,400",
        summary: "Everything in Essential plus setup and orientation.",
        features: [
          "Includes everything in Essential plus",
          "In-person accompaniment for health card & ID",
          "SIM, utilities, banking setup",
          "Rental search",
          "Orientation walk",
          "6-month support"
        ],
        supportLength: "6-month support"
      },
      {
        id: "family",
        name: "Family / Premium Package",
        price: "$3,500 (up to 4 people)",
        summary: "Everything in Full plus family, pet, and logistics support.",
        features: [
          "Includes everything in Full plus",
          "Certified translations (2 per person)",
          "School or childcare support",
          "Pet relocation guidance",
          "Title revalidation",
          "Shipping/import guidance",
          "9-month support",
          "Extra person for $500"
        ],
        supportLength: "9-month support"
      }
    ],
    whyTitle: 'Why work with Uruguay Relocation Companion?',
    whyBody:
      'We are locals who have guided dozens of newcomers through the exact same process. From documents and DNM visits to choosing a neighborhood, we keep the experience calm, clear, and human.',
    miniCtaCopy:
      'Share a few details about your move and we\'ll build a personalized relocation roadmap for you.',
  },
  pricing: {
    title: "Packages & Services",
    note: "All prices are in USD",
    packages: [
      {
        id: "essential",
        name: "Essential Residency Companion",
        price: "$850",
        summary: "Step-by-step residency guidance with in-person support and translations.",
        features: [
          "Step-by-step residency guidance",
          "DNM (residency appointment) booking + in-person support",
          "2 certified translations",
          "Health card & ID guidance",
          "3-month WhatsApp/email support"
        ],
        supportLength: "3-month support"
      },
      {
        id: "full",
        name: "Full Relocation Support",
        price: "$1,400",
        summary: "Everything in Essential plus setup and orientation.",
        features: [
          "Includes everything in Essential plus",
          "In-person accompaniment for health card & ID",
          "SIM, utilities, banking setup",
          "Rental search",
          "Orientation walk",
          "6-month support"
        ],
        supportLength: "6-month support"
      },
      {
        id: "family",
        name: "Family / Premium Package",
        price: "$3,500 (up to 4 people)",
        summary: "Everything in Full plus family, pet, and logistics support.",
        features: [
          "Includes everything in Full plus",
          "Certified translations (2 per person)",
          "School or childcare support",
          "Pet relocation guidance",
          "Title revalidation",
          "Shipping/import guidance",
          "9-month support",
          "Extra person for $500"
        ],
        supportLength: "9-month support"
      }
    ],
    otherServicesTitle: "Other services",
    otherServices: [
      { name: "Hourly Interpretation", price: "$40/hr" },
      { name: "Housing / Lease Support Only", price: "$400" },
      { name: "School Placement Assistance", price: "$300" },
      { name: "Pet Relocation Assistance", price: "$300" },
      { name: "Shipping / Import Assistance", price: "$300" },
      { name: "Driver’s License Conversion", price: "$100" }
    ]
  },
  resources: {
    heroTitle: 'Resources',
    intro:
      'Guides and bite-sized explainers to help you understand Uruguay\'s residency process and everyday logistics.',
    cards: [
      {
        title: 'Residency (DNM)',
        description: 'Documentation, timelines, and what to expect at the Dirección Nacional de Migración.',
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
      'We\'re expanding this resource right now. Need help sooner? Book a consultation and we\'ll walk you through the process personally.',
  },
  contact: {
    heroTitle: 'Contact',
    intro: 'Ready to talk about your move? Share a few details and we\'ll reply with next steps.',
    responseNote: 'We respond within 24–48 hours in English or Spanish.',
    quickLinksTitle: 'Reach out directly',
    whatsappText: 'Hello! I\'m interested in relocating to Uruguay and would love to talk.',
    form: {
      name: 'Name',
      email: 'Email',
      whatsapp: 'WhatsApp number',
      message: 'How can we help?',
      packageInterest: 'Package interest',
      packagePlaceholder: 'Select an option',
      submit: 'Send message',
      sending: 'Sending…',
      successTitle: 'Message sent!',
      successMessage:
        'Thank you for reaching out. We will contact you within 48 hours with next steps.',
      error: 'Something went wrong. Please try again or email us directly.',
    },
    packages: [
      { value: 'essential', label: 'Essential Residency Companion' },
      { value: 'full', label: 'Full Relocation Support' },
      { value: 'family', label: 'Family / Premium Package' },
      { value: 'other', label: 'Other / Not sure yet' },
    ],
  },
};

const es: typeof en = {
  site: {
    title: 'Uruguay Relocation Companion',
    tagline: 'Acompañamiento bilingüe para que tu mudanza a Uruguay sea fluida y sin estrés.',
    email: 'hola@relocationuy.com',
    domain: 'relocationuy.com',
  },
  nav: {
    home: 'Inicio',
    about: 'Nosotros',
    pricing: 'Servicios y precios',
    resources: 'Recursos',
    contact: 'Contacto',
  },
  languageToggle: {
    ariaLabel: 'Cambiar idioma',
    next: 'EN',
  },
  cta: {
    primary: 'Reservar consulta gratuita',
    floating: 'Reserva tu consulta gratuita',
    mini: 'Planifiquemos tu mudanza',
    pricing: 'Hablemos',
  },
  home: {
    heroEyebrow: 'Planeamiento • Residencia • Asentamiento',
    heroTagline:
      'Nos encargamos de los trámites, turnos y traducciones para que disfrutes Uruguay desde el primer día.',
    heroSecondaryButton: 'Ver paquetes y precios',
    packagesTitle: 'Nuestros paquetes',
    packagesIntro:
      'Elegí el nivel de acompañamiento que mejor se ajusta a tu mudanza. Todos incluyen seguimiento bilingüe, cronograma claro y un enfoque humano.',
    packagesNote: 'Todos los precios están expresados en USD.',
    packages: [
      {
        id: "essential",
        name: "Acompañamiento de Residencia Esencial",
        price: "USD 850",
        summary: "Guía paso a paso con acompañamiento presencial y traducciones.",
        features: [
          "Guía paso a paso para la residencia",
          "Agendamos y acompañamos a tu cita en Migración (DNM)",
          "2 traducciones certificadas",
          "Asesoramiento para carné de salud y cédula",
          "Soporte por WhatsApp y correo durante 3 meses"
        ],
        supportLength: "Soporte por 3 meses"
      },
      {
        id: "full",
        name: "Acompañamiento de Reubicación Completa",
        price: "USD 1.400",
        summary: "Todo lo del Esencial más instalación y orientación.",
        features: [
          "Incluye todo lo del paquete Esencial",
          "Acompañamiento presencial para carné de salud y cédula",
          "Configuración de SIM, servicios y cuenta bancaria",
          "Búsqueda de alquiler",
          "Caminata de orientación",
          "Soporte por 6 meses"
        ],
        supportLength: "Soporte por 6 meses"
      },
      {
        id: "family",
        name: "Paquete Familiar / Premium",
        price: "USD 3.500 (hasta 4 personas)",
        summary: "Todo lo del Completo más apoyo familiar, mascotas y logística.",
        features: [
          "Incluye todo lo del paquete Completo",
          "Traducciones certificadas (2 por persona)",
          "Apoyo para escuela o cuidado infantil",
          "Asistencia para traslado de mascotas",
          "Revalidación de títulos",
          "Orientación para envío e importación",
          "Soporte por 9 meses",
          "Persona adicional +USD 500"
        ],
        supportLength: "Soporte por 9 meses"
      }
    ],
    whyTitle: '¿Por qué elegir Uruguay Relocation Companion?',
    whyBody:
      'Somos locales y hemos acompañado a decenas de personas en exactamente este proceso. Desde los documentos hasta elegir barrio, mantenemos todo organizado, claro y humano.',
    miniCtaCopy:
      'Contanos tus planes y diseñamos un roadmap personalizado para tu mudanza a Uruguay.',
  },
  pricing: {
    title: "Paquetes y Servicios",
    note: "Todos los precios están en USD",
    packages: [
      {
        id: "essential",
        name: "Acompañamiento de Residencia Esencial",
        price: "USD 850",
        summary: "Guía paso a paso con acompañamiento presencial y traducciones.",
        features: [
          "Guía paso a paso para la residencia",
          "Agendamos y acompañamos a tu cita en Migración (DNM)",
          "2 traducciones certificadas",
          "Asesoramiento para carné de salud y cédula",
          "Soporte por WhatsApp y correo durante 3 meses"
        ],
        supportLength: "Soporte por 3 meses"
      },
      {
        id: "full",
        name: "Acompañamiento de Reubicación Completa",
        price: "USD 1.400",
        summary: "Todo lo del Esencial más instalación y orientación.",
        features: [
          "Incluye todo lo del paquete Esencial",
          "Acompañamiento presencial para carné de salud y cédula",
          "Configuración de SIM, servicios y cuenta bancaria",
          "Búsqueda de alquiler",
          "Caminata de orientación",
          "Soporte por 6 meses"
        ],
        supportLength: "Soporte por 6 meses"
      },
      {
        id: "family",
        name: "Paquete Familiar / Premium",
        price: "USD 3.500 (hasta 4 personas)",
        summary: "Todo lo del Completo más apoyo familiar, mascotas y logística.",
        features: [
          "Incluye todo lo del paquete Completo",
          "Traducciones certificadas (2 por persona)",
          "Apoyo para escuela o cuidado infantil",
          "Asistencia para traslado de mascotas",
          "Revalidación de títulos",
          "Orientación para envío e importación",
          "Soporte por 9 meses",
          "Persona adicional +USD 500"
        ],
        supportLength: "Soporte por 9 meses"
      }
    ],
    otherServicesTitle: "Otros servicios",
    otherServices: [
      { name: "Interpretación por hora", price: "USD 40/h" },
      { name: "Asistencia sólo Vivienda/Contrato", price: "USD 400" },
      { name: "Asistencia para Búsqueda de Escuela", price: "USD 300" },
      { name: "Asistencia para Traslado de Mascotas", price: "USD 300" },
      { name: "Asesoramiento de Envíos / Importación", price: "USD 300" },
      { name: "Conversión de Licencia de Conducir", price: "USD 100" }
    ]
  },
  resources: {
    heroTitle: 'Recursos',
    intro:
      'Guías y resúmenes para entender el proceso de residencia en Uruguay y la logística diaria.',
    cards: [
      {
        title: 'Residencia (DNM)',
        description: 'Documentación, plazos y qué esperar en la Dirección Nacional de Migración.',
        to: '/resources/residency-basics',
      },
      {
        title: 'Carné de salud',
        description: 'Dónde agendar, qué exámenes piden y cómo prepararte.',
        to: '/resources/health-card',
      },
      {
        title: 'Obtención de la cédula',
        description: 'Guía paso a paso para conseguir tu cédula uruguaya.',
        to: '/resources/cedula-guide',
      },
      {
        title: 'Traducciones certificadas',
        description: 'Cuándo las necesitás, tiempos habituales y proveedores recomendados.',
        to: '/resources/certified-translations',
      },
      {
        title: 'Telefonía y bancos',
        description: 'Cómo mantenerte conectado y abrir cuentas desde el primer día.',
        to: '/resources/sim-and-banks',
      },
      {
        title: 'Vivienda y alquileres',
        description: 'Barrios, contratos y cómo evitar errores comunes.',
        to: '/resources/rentals',
      },
    ],
    note: 'Actualizamos estas guías a medida que cambian las normativas.',
    placeholderTitle: 'Guía disponible pronto',
    placeholderBody:
      'Estamos completando esta guía. Necesitás ayuda ahora? Reservá una consulta y te acompañamos personalmente.',
  },
  contact: {
    heroTitle: 'Contacto',
    intro: '¿Listo para conversar sobre tu mudanza? Contanos algunos detalles y te respondemos.',
    responseNote: 'Respondemos dentro de las 24–48 horas en español o inglés.',
    quickLinksTitle: 'Contactanos directo',
    whatsappText: 'Hola! Estoy interesado en mudarme a Uruguay y me gustaría conversar.',
    form: {
      name: 'Nombre',
      email: 'Correo electrónico',
      whatsapp: 'Número de WhatsApp',
      message: '¿Cómo podemos ayudarte?',
      packageInterest: 'Paquete de interés',
      packagePlaceholder: 'Elegí una opción',
      submit: 'Enviar mensaje',
      sending: 'Enviando…',
      successTitle: '¡Mensaje enviado!',
      successMessage:
        'Gracias por escribirnos. Te responderemos dentro de las próximas 48 horas con los pasos a seguir.',
      error: 'Ocurrió un error. Intentá nuevamente o escribinos por correo.',
    },
    packages: [
      { value: 'essential', label: 'Residencia Esencial' },
      { value: 'full', label: 'Soporte Integral' },
      { value: 'family', label: 'Familiar / Premium' },
      { value: 'other', label: 'Otro / No estoy seguro' },
    ],
  },
};

type Dictionaries = typeof en;

interface I18nValue {
  t: Dictionaries;
  locale: LocaleKey;
  setLocale: (locale: LocaleKey) => void;
  toggleLanguage: () => void;
}

export const I18nContext = createContext<I18nValue | null>(null);

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function I18nProvider({
  children,
  initialLocale = 'en',
}: {
  children: ReactNode;
  initialLocale?: LocaleKey;
}) {
  const [locale, setLocale] = useState<LocaleKey>(() => {
    if (typeof window === 'undefined') return initialLocale;
    const stored = window.localStorage.getItem(STORAGE_KEY) as LocaleKey | null;
    return stored === 'es' || stored === 'en' ? stored : initialLocale;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => (prev === 'en' ? 'es' : 'en'));
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      t: locale === 'es' ? es : en,
      locale,
      setLocale,
      toggleLanguage,
    }),
    [locale, toggleLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
