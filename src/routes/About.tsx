import { useState } from "react";
import Section from "../components/Section";
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
       name: "Tyler (USA)",
    text: sanitizeText(
      "We had a great experience and much easier transition from the US to Uruguay—especially thanks to Ro and Tomas! They’re both kind and welcoming souls who will work at your own pace. Their interpretation help and knowledge in local processes were invaluable, especially when it came to opening a bank account. We highly recommend working with Ro and Tomas to ensure your journey to Uruguay is smooth!"
    ),
       name: "Teddy (USA)",
    text: sanitizeText(
      "Tomas and Ro’s services were vital to setting up our new life in Uruguay.  When you need to open a bank account or other complicated process as a new immigrant to Uruguay, it can be very stressful without knowing the language well enough.  Tomas and Ro made it feel easy, and their prices for their assistance were very reasonable."
    ),
  },
];

const introParagraphs = [
  "Moving to Uruguay can be exciting — the fresh start, the slower pace, the ocean breeze, the mate in the mornings, the promise of finally breathing.",
  "But we also know the other side: the 3am Google spiral trying to understand what documents you need. The anxiety walking into a government office where no one speaks English. The loneliness of being new in a place where you don't know who to ask for help. The weight of \"I just spent my life savings on this move — what if I mess something up?\"",
  "That's exactly why we started Uruguay Relocation Companion.",
  "We're Romina and Tomas — and we bridge both worlds.",
  "Romina was born and raised in Montevideo. She's fluent in English and Spanish, knows every neighborhood inside and out, and has spent years helping foreign friends navigate residency, translations, and the million small details that make settling here either smooth or stressful. She's the one who'll translate in real-time at your DNM appointment, walk you through apartment buildings and tell you which streets flood when it rains, and answer your panicked 9pm WhatsApp messages about document deadlines. She's calm, detail-oriented, and will not let you miss a step.",
  "Tomas is Uruguayan but moved to the US at 19, lived there for 6 years, went through the entire immigration process, and became a US citizen. He knows what it's like to be the immigrant — the confusion, the fear, the cultural adjustment, the bureaucratic maze. He's been where you are. And now he uses that firsthand experience to make sure your integration into Uruguay is as smooth as possible.",
  "Together, we're not just consultants — we're the support system we watched people desperately need.",
  "What started as helping friends with paperwork turned into a full relocation service built around one belief: nobody should have to figure this out alone.",
  "We're not a corporate team. We're not a law firm. We're the people who literally sit with you at appointments, translate everything so you actually understand what's happening, walk neighborhoods with you, connect you with trusted translators and landlords, and text you back when you're stressed.",
  "Our goal is simple: take the bureaucratic nightmare out of the process, so you can focus on building your new life instead of drowning in confusion.",
  "Because relocation isn't just about paperwork — it's about people, comfort, and feeling like you actually belong here. 🌿",
  "Whether you're moving alone, as a couple, with kids, with pets, fleeing something, or just ready for something new — we're here to make sure you always feel supported, understood, and at home.",
];

const valuesParagraphs = [
  'We started this business because we believe everyone deserves a safe, welcoming place to call home — and nobody should have to navigate foreign bureaucracy alone just to get there.',
  'We know why people are moving to Uruguay right now.',
  "Some of you are chasing adventure — the beach, the slower pace, the mate culture. And that's beautiful.",
  "But some of you are fleeing. You're LGBTQ+ and your home country is criminalizing your existence. You're a woman who's lost access to reproductive healthcare. You're a person of color facing increased violence. You're a parent terrified about what your kids are growing up in.",
  "We see you. And we're here for you.",
  "That's why our Essential Residency Companion package ($850) is priced with accessibility in mind. It's designed to support people who need reliable, compassionate guidance without financial barriers.",
  'Our other packages are priced to reflect the comprehensive, hands-on nature of the work — and to allow us to keep offering accessible options to the people who need them most.',
  "If you're relocating due to safety concerns, political instability, or financial hardship, please tell us during your free consultation. We offer need-based discounts and flexible payment plans on a case-by-case basis.",
  "Because at the end of the day, we're not here to get rich off people's suffering. We're here because we believe Uruguay should be accessible to anyone who needs it.",
];

const rominaParagraphs = [
  "Hi! I'm Romina, one of the co-founders of Uruguay Relocation Companion.",
  "I was born and raised in Uruguay, and over the years I've met many people who came here hoping to build a new chapter of their lives — often full of excitement, but also a bit overwhelmed by the process. Seeing that inspired me to start helping others make their move easier and less stressful.",
  "I began by assisting foreign friends with their residency paperwork, appointments, and translations — and quickly realized how much of a difference it makes to have someone local who can explain things clearly, go along to in-person visits, and handle the little details that make life smoother here.",
  "I'm fluent in English and Spanish, detail-oriented, and genuinely enjoy helping people feel cared for, informed, and supported as they settle into their new life in Uruguay. My approach is calm, organized, and personal — because moving to a new country should feel like a fresh start, not a mountain of paperwork.",
];

const tomasParagraphs = [
  "Hello my name is Tomas.",
  "I'm an Uruguayan who at the age of 19 moved to the US. Throughout my 6 years in the US I was able to make friends, integrate, find employment, and ultimately become a citizen.",
  "I have first hand experience of the immigration process, and I understand what a daunting experience it can be. It's full of surprises and challenges, but with the right support it can be the best experience of your life.",
  "With my help I can assure your integration into Uruguay will be as smooth as possible.",
];

export default function About() {
  const [current, setCurrent] = useState(0);

  const nextReview = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFDCE3] to-[#F7C6D7]">
      <main className="space-y-24">
        <Section>
          <div className="mx-auto max-w-4xl px-4">
            <div className="rounded-xl bg-white bg-opacity-95 p-10 shadow-lg">
              <h1 className="mb-10 text-center text-4xl font-display">About Us</h1>
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
              <h2 className="mb-8 text-center text-3xl font-display">Our Values</h2>
              <div className="space-y-5 text-lg leading-relaxed text-ink">
                {valuesParagraphs.map((paragraph) => {
                  const sanitized = sanitizeText(paragraph);
                  const emphasize = sanitized.startsWith(
                    "If you're relocating due to safety concerns, political instability, or financial hardship",
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
              {sanitizeText("We're locals who love guiding newcomers as they settle into Uruguayan life.")}
            </p>

            <div className="grid gap-12 md:grid-cols-2">
              <div className="card flex flex-col items-center gap-4 rounded-2xl bg-base-100 p-8 text-center shadow-lg">
                <img
                  src="/romina.jpg"
                  alt="Romina Guimaraens headshot"
                  className="h-40 w-40 rounded-full object-cover shadow-md sm:h-32 sm:w-32"
                />
                <h3 className="text-2xl font-display">Romina Guimaraens</h3>
                <div className="space-y-4 text-left text-lg leading-relaxed text-ink">
                  {rominaParagraphs.map((paragraph) => (
                    <p key={paragraph}>{sanitizeText(paragraph)}</p>
                  ))}
                </div>
              </div>

              <div className="card flex flex-col items-center gap-4 rounded-2xl bg-base-100 p-8 text-center shadow-lg">
                <img
                  src="/tomas.jpg"
                  alt="Tomas Echenique headshot"
                  className="h-40 w-40 rounded-full object-cover shadow-md sm:h-32 sm:w-32"
                />
                <h3 className="text-2xl font-display">Tomas Echenique</h3>
                <div className="space-y-4 text-left text-lg leading-relaxed text-ink">
                  {tomasParagraphs.map((paragraph) => (
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
              {sanitizeText("A few words from people we've helped make Uruguay home 🌿")}
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
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      i === current ? "bg-lavender" : "bg-sage/50"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}




