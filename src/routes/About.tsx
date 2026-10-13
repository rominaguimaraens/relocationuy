import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import Seo from "../components/Seo";
import { sanitizeText } from "../utils/sanitize";

const reviews = [
  {
    name: "Aubree & Mike (USA)",
    text: sanitizeText(
      "My wife and I were running desperately low on essential medications while here in Uruguay. Our Spanish language skills and understanding of the local systems are pretty subpar. Romi quickly and efficiently identified solutions and without hesitation took action to ensure my wife's health was a priority. She not only facilitated a local doctor visit for us but came with us to see that office visit and subsequent medication pickup at a local pharmacy went smoothly. Her ability to anticipate things that we needed and work behind the scenes coordinating her local contacts and using her extensive knowledge of the Uruguayan practices was comforting and reassuring. We knew we were being taken care of. When we do come back to Uruguay, Romi will be the first one we contact to coordinate our return. Thank you again for all that you did for us."
    ),
  },
  {
    name: "Bryn & Tyger Pliska Girard (USA)",
    text: sanitizeText(
      "We recently had the pleasure of working with Ro, and we couldn't be more impressed with her professionalism and skill. She communicated fluently and naturally in both English and Spanish, switching effortlessly between the two languages to ensure clear understanding for everyone involved. Beyond her linguistic ability, she provided thoughtful guidance and cultural context that helped the conversation flow smoothly and appropriately. She also had an easy, personable manner that helped put everyone at ease and built genuine rapport with the interviewers. Her calm confidence and adaptability made what could have been a stressful experience feel comfortable and collaborative. We're deeply grateful for her support and would enthusiastically recommend her to anyone seeking a capable translator."
    ),
  },
  {
    name: "Tyler (USA)",
    text: sanitizeText(
      "We had a great experience and much easier transition from the US to Uruguay—especially thanks to Ro and Tomas! They're both kind and welcoming souls who will work at your own pace. Their interpretation help and knowledge in local processes were invaluable, especially when it came to opening a bank account. We highly recommend working with Ro and Tomas to ensure your journey to Uruguay is smooth!"
    ),
  },
  {
    name: "Teddy (USA)",
    text: sanitizeText(
      "Tomas and Ro's services were vital to setting up our new life in Uruguay.  When you need to open a bank account or other complicated process as a new immigrant to Uruguay, it can be very stressful without knowing the language well enough.  Tomas and Ro made it feel easy, and their prices for their assistance were very reasonable."
    ),
  },
];

const introParagraphs = [
  'Uruguay Relocation Companion is run by Romina Guimaraens in Montevideo, with help from her assistant, Mechi. We help foreigners get Uruguayan residency and settle in, mostly Americans and also people from all over the world. We go to your appointments with you, translate, and tell you what to do next.',
  "Moving is exciting, and it's a lot. You have to work out which documents you need, which office to go to, and what happens if you get something wrong after you've already spent your savings on the move.",
  "We're not a law firm. We sit next to you at appointments, translate what's being said, walk neighborhoods with you, put you in touch with trusted sworn translators and notaries, and answer when you're stressed.",
  'We work with people moving alone, as couples, and with kids or pets. Some are moving for the lifestyle, and some are leaving something behind.',
];

const valuesParagraphs = [
  'We started this because everyone should be able to find a safe place to live, and nobody should have to deal with foreign bureaucracy alone to get there.',
  'Some of our clients move for the beach and the slower pace. Others are leaving because home is no longer safe for them. They might be LGBTQ+, or a woman who lost access to reproductive healthcare, or a person of color facing more violence, or a parent worried about what their kids are growing up in. We take those reasons seriously.',
  "That's why Essential is $850. It's priced so more people can afford it. The other packages cost more because they involve more hands-on work, and that helps us keep Essential low.",
  "If you're moving because of safety or financial hardship, tell us on your free call. We offer need-based discounts and payment plans, case by case.",
];

const rominaParagraphs = [
  'I was born in Artigas and raised in Montevideo. I speak English and Spanish.',
  'This started when friends from abroad needed help with their residency. I went with them to appointments, translated, and helped with forms and paperwork. It turned out to be the part that mattered most. Having someone local next to you makes everything less stressful.',
  "Now I do that for my clients. I book your appointments early, because the good slots fill up for months ahead. I come with you and translate. I tell you which documents to get and when to get them. And I'm around on WhatsApp whenever you have a question.",
];


const mechiParagraphs = [
  'Mechi was born in Mendoza, Argentina, and now lives in Uruguay, so she knows what it is like to arrive here as a newcomer.',
  "She arranges airport pickups and gets clients to wherever they're staying. She comes along to appointments with me. When a client needs someone to go with them and translate and I'm with someone else, Mechi goes.",
];

const MECHI_PHOTO: string | null = '/mechi.jpg';

export default function About() {
  const [current, setCurrent] = useState(0);

  const nextReview = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <>
      <Seo
        title="About Romina and Mechi | Uruguay Relocation Companion"
        description="Romina and Mechi guide American expats through Uruguay's residency process in person, from the airport to the last appointment."
        path="/about"
      />

      <div className="min-h-screen bg-gradient-to-b from-[#FFDCE3] to-[#F7C6D7]">
        <main className="space-y-24">
          <Section>
            <div className="mx-auto max-w-4xl px-4">
              <div className="rounded-xl bg-white bg-opacity-95 p-10 shadow-lg">
                <h1 className="mb-10 text-center text-4xl font-display">Here to Walk You Through Every Step.</h1>
                <div className="space-y-6 text-center text-lg leading-relaxed text-ink">
                  {introParagraphs.map((paragraph) => (
                    <p key={paragraph}>{sanitizeText(paragraph)}</p>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section>
            <div className="mx-auto max-w-4xl px-4">
              <div className="rounded-xl bg-white bg-opacity-95 p-10 shadow-lg">
                <h2 className="mb-8 text-center text-3xl font-display">Who we help and why</h2>
                <div className="space-y-5 text-lg leading-relaxed text-ink">
                  {valuesParagraphs.map((paragraph) => {
                    const sanitized = sanitizeText(paragraph);
                    const emphasize = sanitized.startsWith(
                      "If you're moving because of safety or financial hardship",
                    );
                    return (
                      <p key={paragraph}>{emphasize ? <strong>{sanitized}</strong> : sanitized}</p>
                    );
                  })}
                </div>
              </div>
            </div>
          </Section>

          <Section>
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="mb-12 text-center text-3xl font-display">Meet the Team</h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-ink">
                {sanitizeText("Two people who live here and help newcomers settle in.")}
              </p>

              <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                <div className="card flex flex-col items-center gap-2 rounded-2xl bg-base-100 p-8 text-center shadow-lg">
                  <img
                    src="/romina.jpg"
                    alt="Romina Guimaraens, founder of Uruguay Relocation Companion"
                    className="h-40 w-40 rounded-full object-cover shadow-md sm:h-32 sm:w-32"
                  />
                  <h3 className="mt-2 text-2xl font-display">Romina Guimaraens</h3>
                  <p className="text-sm font-semibold uppercase tracking-widest text-ink/60">Founder</p>
                  <div className="mt-4 space-y-4 text-left text-lg leading-relaxed text-ink">
                    {rominaParagraphs.map((paragraph) => (
                      <p key={paragraph}>{sanitizeText(paragraph)}</p>
                    ))}
                  </div>
                </div>
                <div className="card flex flex-col items-center gap-2 rounded-2xl bg-base-100 p-8 text-center shadow-lg">
                  {MECHI_PHOTO ? (
                    <img
                      src={MECHI_PHOTO}
                      alt="Mechi, assistant at Uruguay Relocation Companion"
                      className="h-40 w-40 rounded-full object-cover shadow-md sm:h-32 sm:w-32"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-40 w-40 items-center justify-center rounded-full bg-sky/10 font-display text-5xl text-sky shadow-md sm:h-32 sm:w-32"
                    >
                      M
                    </div>
                  )}
                  <h3 className="mt-2 text-2xl font-display">Mechi</h3>
                  <p className="text-sm font-semibold uppercase tracking-widest text-ink/60">Assistant</p>
                  <div className="mt-4 space-y-4 text-left text-lg leading-relaxed text-ink">
                    {mechiParagraphs.map((paragraph) => (
                      <p key={paragraph}>{sanitizeText(paragraph)}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section>
            <div className="mx-auto max-w-3xl px-4">
              <h2 className="mb-10 text-center text-3xl font-display">Client Experiences</h2>
              <p className="mb-10 text-center text-lg text-ink">
                {sanitizeText("What clients say")}
              </p>

              <div className="flex flex-col items-center justify-center">
                <div className="relative w-full">
                  <div className="card rounded-2xl bg-base-100 p-8 text-center shadow-lg transition-all duration-500 ease-in-out">
                    <p className="mb-6 text-lg italic leading-relaxed text-ink">{reviews[current].text}</p>
                    <h4 className="text-xl font-display text-lavender">&mdash; {reviews[current].name}</h4>
                  </div>

                  <button
                    onClick={prevReview}
                    className="btn btn-ghost absolute left-0 top-1/2 -translate-y-1/2"
                    aria-label="Previous review"
                  >
                    &lsaquo;
                  </button>
                  <button
                    onClick={nextReview}
                    className="btn btn-ghost absolute right-0 top-1/2 -translate-y-1/2"
                    aria-label="Next review"
                  >
                    &rsaquo;
                  </button>
                </div>

                <div className="mt-6 flex gap-2">
                  {reviews.map((_, i) => (
                    <span
                      key={i}
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${i === current ? "bg-lavender" : "bg-sage/50"
                        }`}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* CTA Section */}
          <Section>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-display mb-4">Book a free 30-minute call</h2>
              <p className="text-lg text-ink/80 mb-6">
                Tell us about your move, ask us anything, and see if we're a good fit.
              </p>
              <Link to="/contact" className="btn btn-primary btn-soft btn-lg">
                Book Your Free 30-Min Call
              </Link>
            </div>
          </Section>
        </main>
      </div>
    </>
  );
}
