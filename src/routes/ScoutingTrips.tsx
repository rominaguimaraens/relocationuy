import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PackageCard from '../components/PackageCard';
import { scoutingPayment } from '../content/packages';

const faqItems = [
  {
    question: 'How much do scouting trips cost?',
    answer:
      'The Uruguay 101 Day is $700, Settle & Explore (3 days) is $1,200, and Live Like a Local (7 days) is $1,800. Prices are in USD and are per group, not per person.',
  },
  {
    question: 'How do I pay for a scouting trip?',
    answer: scoutingPayment,
  },
  {
    question: 'Does the price include flights, a place to stay or airport pickup?',
    answer:
      "No. Flights, accommodation and airport pickup are not included. You book those yourself. The price covers our time and the plan for each trip, as listed above.",
  },
  {
    question: 'When is the best time to come for a scouting trip?',
    answer:
      'Spring, and November in particular, is the best time. Summer is high season and the city feels more like a holiday than it does the rest of the year, so try not to judge Uruguay by summer alone.',
  },
  {
    question: 'Can I see cities other than Montevideo?',
    answer:
      'Yes, on the 7-day trip. Live Like a Local covers Montevideo and up to 2 other cities of your choice.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function ScoutingTrips() {
  return (
    <>
      <Helmet>
        <title>Uruguay Scouting Trips in Montevideo | Uruguay Relocation Companion</title>
        <meta
          name="description"
          content="Visit Montevideo with a local guide before you decide to move. One-day, three-day and seven-day scouting trips from $700 cover neighborhoods, buses, markets and your questions."
        />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="flex flex-col gap-8 text-center md:text-left md:gap-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl">Scouting Trips in Montevideo</h1>
              <p className="mt-4 max-w-2xl text-ink/80">
                Spend one to seven days in Montevideo with a local guide before you decide to move. Trips start at $700.
              </p>
            </div>
            <span className="badge badge-lg rounded-full bg-base-100 px-4 py-4 text-sm text-ink/70">
              Prices are per group, in USD
            </span>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="card border border-sky/10 bg-base-100 shadow-xl">
            <div className="card-body space-y-4 text-left">
              <h2 className="text-3xl font-display text-ink md:text-4xl">
                Not sure Uruguay is right for you? Come see it first.
              </h2>
              <p className="text-ink/80">
                A scouting trip is a guided visit to Montevideo for people who haven&apos;t decided yet. You see how
                daily life works: the neighborhoods, the buses, the markets and the prices, and you ask us whatever you
                want.
              </p>
              <p className="text-ink/80">
                Most relocation services start once you&apos;ve decided to move. We also help you work out whether you
                should.
              </p>
              <p className="text-ink/80">
                Maybe you&apos;ve been reading expat Facebook groups for six months and you&apos;re 90% sure, but you
                want to see it before you commit.
              </p>
              <p className="text-ink/80">
                We show you the normal day-to-day, not the tourist version. You&apos;ll visit neighborhoods, ride the
                bus, shop at the ferias, meet locals, and get straight answers. If it turns out Uruguay isn&apos;t for
                you, we&apos;ll tell you that too.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <PackageCard
            name="Uruguay 101 Day"
            price="$700"
            summary="One day for people who are curious whether Uruguay could feel like home."
            features={[
              'WhatsApp chat before you arrive, so we can plan the day around your lifestyle and budget',
              'Morning coffee or mate to cover the cultural basics',
              'Walking tour of 2 to 3 Montevideo neighborhoods that fit your goals',
              'Where locals shop, how transport works, safety norms and social etiquette',
              'End-of-day Q&A about daily life, housing and costs',
            ]}
          />

          <PackageCard
            name="Settle & Explore — 3 Days"
            price="$1,200"
            summary="Three days for a realistic look at what living in Uruguay is like."
            features={[
              'Everything in the Uruguay 101 Day',
              'Three half-days of in-person guidance',
              'Places locals actually use: supermarkets, cafés, ferias, coastal walks',
              '4 to 5 neighborhoods across different lifestyles and budgets',
              'How to read rental listings and estimate living costs',
              'WhatsApp support during your stay',
            ]}
          />

          <PackageCard
            name="Live Like a Local — 7 Days"
            price="$1,800"
            summary="A week of guided time in Uruguay, built around how you'd actually live."
            features={[
              'Everything in Settle & Explore',
              'A week-long itinerary built around you (remote worker, retiree or family)',
              "Montevideo's neighborhoods plus up to 2 other cities of your choice",
              'Markets, bus rides and everyday routines',
              'Restaurant, café and activity recommendations',
              'WhatsApp access for one week after your trip',
            ]}
          />
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink/70">
          Flights, accommodation and airport pickup are not included.
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-ink/70">{scoutingPayment}</p>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-display">Questions about scouting trips</h2>
          <div className="rounded-2xl border border-sky/10 bg-base-100 p-6 shadow-xl md:p-10">
            {faqItems.map((item) => (
              <details key={item.question} className="border-b border-sky/10 py-4 last:border-b-0">
                <summary className="cursor-pointer text-lg font-semibold text-ink">{item.question}</summary>
                <p className="mt-3 leading-relaxed text-ink/80">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-16 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-display mb-4">Book a free 30-minute call</h2>
          <p className="text-lg text-ink/80 mb-6">
            Tell us when you&apos;re coming and what you want to see, and we&apos;ll help you plan the trip.
          </p>
          <Link to="/contact" className="btn btn-primary btn-soft btn-lg">
            Book Your Free 30-Min Call
          </Link>
        </div>
      </Section>
    </>
  );
}
