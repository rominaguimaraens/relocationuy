import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import PackageCard from '../components/PackageCard';
import { siteCopy } from '../content/siteCopy';
import { sanitizeText } from '../utils/sanitize';

export default function Pricing() {
  const { site, pricing } = siteCopy;

  return (
    <>
      <Helmet>
        <title>{pricing.title}</title>
        <meta name="description" content={site.tagline} />
      </Helmet>

      <Section className="bg-beige-gradient">
        <h1 className="text-4xl font-display text-center mb-4">{pricing.title}</h1>
        <p className="text-center text-ink/80">{sanitizeText(pricing.note)}</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricing.packages.map((item, index) => (
            <PackageCard
              key={item.id}
              name={item.name}
              price={item.price}
              summary={item.summary}
              features={item.features}
              supportLength={item.supportLength}
              highlighted={index === 1}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-hero-muted">
        <h2 className="text-3xl font-display text-center mb-8">
          {pricing.otherServicesTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricing.otherServices.map((service) => (
            <div
              key={service.name}
              className="card card-soft border border-sky/10 bg-base-100/95 shadow-sm text-center"
            >
              <div className="card-body">
                <h3 className="text-xl font-display text-ink">{service.name}</h3>
                <p className="mt-2 text-ink/70">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-hero-muted">
        <div className="flex flex-col gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-display">🧭 Scouting Trip Packages</h2>
            <p className="mt-4 max-w-2xl text-ink/80">
              See what living in Uruguay really feels like — from one-day immersions to week-long guidance experiences.
            </p>
          </div>
          <span className="badge badge-lg rounded-full bg-base-100 px-4 py-4 text-sm text-ink/70">
            All prices are in USD
          </span>
        </div>

        {/* Packages Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <PackageCard
            name="Uruguay 101 Day"
            price="$200"
            summary="A one-day local experience designed for travelers curious about whether Uruguay could truly feel like home."
            features={[
              "Pre-arrival WhatsApp chat to tailor the day to your lifestyle and budget",
              "Morning meetup over coffee or mate to cover cultural basics",
              "Walking tour of 2–3 Montevideo neighborhoods that fit your goals",
              "Real-life orientation: where locals shop, how transportation works, safety norms, and social etiquette",
              "End-of-day sit-down Q&A about daily life, housing, and costs",
            ]}
            supportLength="Best for short-term visitors or digital nomads exploring Uruguay for the first time."
          />

          <PackageCard
            name="Settle & Explore — 3 Days"
            price="$450"
            summary="Three days of personalized guidance for a realistic look at what living in Uruguay is actually like."
            features={[
              "Everything from the Uruguay 101 Day",
              "Three half-days of tailored in-person guidance",
              "Visits to everyday places locals actually use — supermarkets, cafés, ferias, coastal walks",
              "Exploration of 4–5 neighborhoods across different lifestyles and budgets",
              "Tips on reading rental listings and estimating living expenses",
              "WhatsApp support during your stay",
            ]}
            supportLength="Perfect for those comparing neighborhoods and lifestyles before applying for residency."
          />

          <PackageCard
            name="Live Like a Local — 5–7 Days"
            price="$750–$900"
            summary="A full week of hands-on guidance and cultural immersion to experience what life in Uruguay really feels like."
            features={[
              "Everything from Settle & Explore",
              "Week-long itinerary personalized to your interests (remote worker, retiree, or family-focused)",
              "Visits to multiple Montevideo and coastal neighborhoods",
              "Cultural immersion through markets, bus rides, and everyday routines",
              "Restaurant, café, and local activity recommendations",
              "One-week post-trip WhatsApp access for follow-up questions",
            ]}
            supportLength="Designed for people seriously considering relocation and wanting to 'test-drive' life here before making the move."
          />
        </div>

        {/* Add-Ons Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-100 shadow-xl border border-sky/10">
            <div className="card-body">
              <h3 className="text-2xl font-display text-ink">💡 Add-Ons</h3>
              <ul className="mt-4 space-y-2 text-ink/80">
                <li>• Extra hours — +$30/hour</li>
                <li>• ☕ Coffee with Maddie — $80 · Honest chat with an Australian expat about real life in Uruguay (all proceeds go to Maddie)</li>
                <li>• ✈️ Virtual Chat with Miles — $60 · Open, genuine conversation with an American who’s experienced Uruguay through real connections (all proceeds go to Miles)</li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-sky/10">
            <div className="card-body">
              <h3 className="text-2xl font-display text-ink">☕ Coffee with Maddie — $80</h3>
              <p className="mt-2 text-ink/80">Optional experience — limited availability</p>
              <p className="mt-3 text-ink/80">
                Meet Maddie Luca, an Australian expat and content creator who’s been living in Montevideo for over five years. She’s built a life, a marriage, and a business here — and she loves sharing what life in Uruguay is really like beyond the headlines.
              </p>
              <h4 className="mt-4 font-semibold text-ink">Includes:</h4>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-ink/80">
                <li>1–2 hour casual chat over coffee or dinner</li>
                <li>Real, firsthand insight into the expat experience — the good, the challenging, and the genuinely wonderful</li>
                <li>Friendly, honest conversation about integrating into local culture, finding community, and building a life here</li>
                <li>Personalized answers to your questions about moving, living, or working in Uruguay</li>
              </ul>
              <p className="mt-3 text-ink/80">
                All proceeds go directly to Maddie. Limited availability — booking in advance is recommended.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-sky/10">
            <div className="card-body">
              <h3 className="text-2xl font-display text-ink">✈️ Chat with Miles — $60</h3>
              <p className="mt-2 text-ink/80">Optional experience — available virtually</p>
              <p className="mt-3 text-ink/80">
                Talk with Miles, an American who’s spent significant time in Uruguay and built deep personal connections here. He offers a grounded, first-hand perspective on what it’s really like to adapt from U.S. life to Uruguay’s culture and rhythm — both the emotional and the practical sides of the move.
              </p>
              <h4 className="mt-4 font-semibold text-ink">Includes:</h4>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-ink/80">
                <li>Virtual video call (Zoom or Meet)</li>
                <li>Honest, relatable conversation about adjusting expectations and mindset</li>
                <li>Insight into cultural differences, daily life, and finding your footing as an expat</li>
                <li>A safe space to ask questions freely and get perspective from someone who truly gets it</li>
              </ul>
              <p className="mt-3 text-ink/80">
                All proceeds go directly to Miles. Available by appointment only.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
