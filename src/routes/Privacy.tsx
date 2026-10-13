import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import { siteCopy } from '../content/siteCopy';

// All the text for this page lives here so it is easy to edit.
const LAST_UPDATED = 'October 2026';

const sections: { title: string; body: string[] }[] = [
  {
    title: 'What we collect',
    body: [
      'If you fill in the contact form, we get what you type into it: your name, email address, WhatsApp number if you add one, the package you are interested in, when you plan to move, who is moving, where you are in the process, how you found us, and your message. Everything except your name and email is optional.',
      'If you message us on WhatsApp or email us directly, we get whatever you send.',
      'If you become a client, we will also ask for the documents and details your residency process needs. We ask for those separately, not through this website.',
    ],
  },
  {
    title: 'How we use it',
    body: [
      'We use it to reply to you and to prepare for our call. If you become a client, we use it to do the work you hired us for. We do not sell your information and we do not send marketing emails you did not ask for.',
    ],
  },
  {
    title: 'Who else handles it',
    body: [
      'The contact form is sent through EmailJS, which passes it to our email inbox. Our website is hosted on Netlify, which keeps standard server logs such as IP addresses. The site loads its fonts from Google Fonts, so your browser contacts Google when a page opens. WhatsApp is run by Meta and has its own privacy policy.',
      'If you book a call through our scheduling page, Google handles that booking.',
    ],
  },
  {
    title: 'Cookies and tracking',
    body: [
      'We do not use analytics or advertising cookies. The checklist on our Resources page saves your ticked items in your own browser so they are still there when you come back. That information stays on your device and never reaches us.',
    ],
  },
  {
    title: 'Client progress page',
    body: [
      'Clients get a private link to a page that shows where their process stands. It only works with the reference code we give you.',
    ],
  },
  {
    title: 'How long we keep it',
    body: [
      'We keep your messages for as long as we need them to help you. You can ask us to delete them at any time.',
    ],
  },
  {
    title: 'Your choices',
    body: [
      'You can ask us what we have about you, ask us to correct it, or ask us to delete it. Email us and we will take care of it.',
    ],
  },
];

export default function Privacy() {
  const { site } = siteCopy;

  return (
    <>
      <Helmet>
        <title>Privacy | Uruguay Relocation Companion</title>
        <meta
          name="description"
          content="What information Uruguay Relocation Companion collects through this website, what we do with it, and how to ask us to delete it."
        />
        <link rel="canonical" href={`https://${site.domain}/privacy`} />
      </Helmet>

      <Section className="bg-beige-gradient">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-display">Privacy</h1>
          <p className="mt-2 text-sm text-ink/60">Last updated {LAST_UPDATED}</p>
          <p className="mt-6 text-ink/80 leading-relaxed">
            This page explains what we collect through this website and what happens to it.
          </p>

          {sections.map((section) => (
            <div key={section.title} className="mt-10">
              <h2 className="text-2xl font-display">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-ink/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-10">
            <h2 className="text-2xl font-display">Contact</h2>
            <p className="mt-3 text-ink/80 leading-relaxed">
              Questions about any of this: {' '}
              <a className="font-medium text-sky hover:text-lavender" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
