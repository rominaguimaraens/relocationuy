import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PackageCard from '../components/PackageCard';

export default function ScoutingTrips() {
  return (
    <>
      <Helmet>
        <title>Scouting Trips in Montevideo | Uruguay Relocation Companion</title>
        <meta
          name="description"
          content="Experience daily life in Uruguay before you commit. Guided scouting trips in Montevideo — visit neighborhoods, ride buses, shop at ferias, and get honest local insight."
        />
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="mx-auto max-w-4xl">
          <div className="card border border-sky/10 bg-base-100 shadow-xl">
            <div className="card-body space-y-4 text-left">
              <h2 className="text-3xl font-display text-ink md:text-4xl">
                Not sure if Uruguay is right for you? Come see for yourself.
              </h2>
              <p className="text-ink/80">
                Most relocation services start when you've already decided to move. We help you figure out if you{' '}
                <em>should</em> move here in the first place.
              </p>
              <p className="text-ink/80">
                Maybe you've been lurking in expat Facebook groups for six months. Maybe you've watched every “moving to
                Uruguay” YouTube video twice. Maybe you're 90% sure but you need to see it, feel it, walk the neighborhoods,
                and talk to real people before you commit.
              </p>
              <p className="text-ink/80">That's what our scouting trips are for.</p>
              <p className="text-ink/80">
                Think of them as a “test drive” for your future life in Uruguay. We show you the real day-to-day — not the
                glossy tourist version. You'll visit neighborhoods, ride the bus, shop at ferias, meet locals, and get honest
                answers to all your questions.
              </p>
              <p className="text-ink/80">No pressure. No sales pitch. Just real insight so you can make an informed decision.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-8 text-center md:text-left md:gap-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl">Scouting Trips</h1>
              <p className="mt-4 max-w-2xl text-ink/80">
                Come experience daily life in Uruguay before you commit — neighborhoods, buses, ferias, and real
                conversations with locals.
              </p>
            </div>
            <span className="badge badge-lg rounded-full bg-base-100 px-4 py-4 text-sm text-ink/70">
              All prices are in USD
            </span>
          </div>

        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <PackageCard
            name="Uruguay 101 Day"
            price="$700"
            summary="A one-day local experience designed for travelers curious about whether Uruguay could truly feel like home."
            features={[
              'Pre-arrival WhatsApp chat to tailor the day to your lifestyle and budget',
              'Morning meetup over coffee or mate to cover cultural basics',
              'Walking tour of 2–3 Montevideo neighborhoods that fit your goals',
              'Real-life orientation: where locals shop, how transportation works, safety norms, and social etiquette',
              'End-of-day sit-down Q&A about daily life, housing, and costs',
            ]}
            supportLength="Best for short-term visitors or digital nomads exploring Uruguay for the first time."
          />

          <PackageCard
            name="Settle & Explore — 3 Days"
            price="$1,200"
            summary="Three days of personalized guidance for a realistic look at what living in Uruguay is actually like."
            features={[
              'Everything from the Uruguay 101 Day',
              'Three half-days of tailored in-person guidance',
              'Visits to everyday places locals actually use — supermarkets, cafés, ferias, coastal walks',
              'Exploration of 4–5 neighborhoods across different lifestyles and budgets',
              'Tips on reading rental listings and estimating living expenses',
              'WhatsApp support during your stay',
            ]}
            supportLength="Perfect for those comparing neighborhoods and lifestyles before applying for residency."
          />

          <PackageCard
            name="Live Like a Local — 7 Days"
            price="$1,800"
            summary="A full week of hands-on guidance and cultural immersion to experience what life in Uruguay really feels like."
            features={[
              'Everything from Settle & Explore',
              'Week-long itinerary personalized to your interests (remote worker, retiree, or family-focused)',
              'Visits to multiple Montevideo and coastal neighborhoods',
              'Cultural immersion through markets, bus rides, and everyday routines',
              'Restaurant, café, and local activity recommendations',
              'One-week post-trip WhatsApp access for follow-up questions',
            ]}
            supportLength="Designed for people seriously considering relocation and wanting to “test-drive” life here before making the move."
          />
        </div>

        <div className="mt-16 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-display mb-4">Ready to See Uruguay for Yourself?</h2>
          <p className="text-lg text-ink/80 mb-6">
            Book a free 30-minute call to talk through your trip, ask questions, and start planning your scouting experience.
          </p>
          <Link to="/contact" className="btn btn-primary btn-soft btn-lg">
            Book Your Free 30-Min Call
          </Link>
        </div>
      </Section>
    </>
  );
}
