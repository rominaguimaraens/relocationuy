import { useState } from "react";
import Section from "../components/Section";

const reviews = [
  {
    name: "Aubree & Mike (USA)",
    text: "My wife and I were running desperately low on essential medications while here in Uruguay. Our Spanish language skills and understanding of the local systems are pretty subpar. Romi quickly and efficiently identified solutions and without hesitation took action to ensure my wife’s health was a priority.  She not only facilitated a local doctor visit for us but came with us to see that office visit and subsequent medication pickup at a local pharmacy went smoothly. Her ability to anticipate things that we needed and work behind the scenes coordinating her local contacts and using her extensive knowledge of the Uruguayan  practices was comforting and reassuring. We knew we were being taken care of. When we do come back to Uruguay, Romi will be the first one we contact to coordinate our return.  Thank you again for all that you did for us.",
  },
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
              <p>
                Moving to Uruguay can be exciting — the fresh start, the slower pace, the ocean breeze, the mate in the mornings. But we also know that figuring out the practical side — residency, translations, DNM appointments, where to go, who to ask — can feel like a maze when you’re new here.
              </p>
              <p>That’s exactly why we started Uruguay Relocation Companion.</p>
              <p>
                We’re Romina and Tomas, two locals who’ve spent years helping newcomers find their footing here in Uruguay. What began as simply helping friends with paperwork and appointments turned into something bigger — a full relocation support service built around real human connection.
              </p>
              <p>
                Our goal is to take the stress and confusion out of the process, so you can focus on enjoying your new life instead of getting lost in bureaucracy. We’ll help you with all the essentials — from your residency application and carné de salud to opening a bank account, setting up a SIM card, or finding a long-term rental.
              </p>
              <p>
                Everything we do is bilingual (English + Spanish) and personalized to your situation — no cookie-cutter packages, no cold legal language. Just honest, caring guidance from people who live here and know how things really work.
              </p>
              <p>
                Whether you’re moving alone, as a couple, or with family (and pets!), we’re here to make sure you always feel supported, understood, and at home.
              </p>
              <p>
                Because relocation isn’t just about paperwork — it’s about people, comfort, and feeling that you truly belong 🌿
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-display">Meet the Team</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-ink">
            We’re locals who love guiding newcomers as they settle into Uruguayan life.
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
                <p>Hi! I’m Romina, one of the co-founders of Uruguay Relocation Companion.</p>
                <p>
                  I was born and raised in Uruguay, and over the years I’ve met many people who came here hoping to build a new chapter of their lives — often full of excitement, but also a bit overwhelmed by the process. Seeing that inspired me to start helping others make their move easier and less stressful.
                </p>
                <p>
                  I began by assisting foreign friends with their residency paperwork, appointments, and translations — and quickly realized how much of a difference it makes to have someone local who can explain things clearly, go along to in-person visits, and handle the little details that make life smoother here.
                </p>
                <p>
                  I’m fluent in English and Spanish, detail-oriented, and genuinely enjoy helping people feel cared for, informed, and supported as they settle into their new life in Uruguay. My approach is calm, organized, and personal — because moving to a new country should feel like a fresh start, not a mountain of paperwork.
                </p>
              </div>
            </div>

            <div className="card flex flex-col items-center gap-4 rounded-2xl bg-base-100 p-8 text-center shadow-lg">
              <img
                src="/tomas.jpg"
                alt="Tomas Echenique headshot"
                className="h-40 w-40 rounded-full object-cover shadow-md sm:h-32 sm:w-32"
              />
              <h3 className="text-2xl font-display">Tomas Echenique</h3>
              <div className="text-lg leading-relaxed text-ink space-y-4 text-left">
                <p>Hello my name is Tomas.</p>
                <p>
                  I’m an Uruguayan who at the age of 19 moved to the US. Throughout my 6 years in the US I was able to make friends, integrate, find employment, and ultimately become a citizen.
                </p>
                <p>
                  I have first hand experience of the immigration process, and I understand what a daunting experience it can be. It’s full of surprises and challenges, but with the right support it can be the best experience of your life.
                </p>
                <p>
                  With my help I can assure your integration into Uruguay will be as smooth as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-3xl font-display">Client Experiences</h2>
          <p className="mb-10 text-center text-lg text-ink">
            A few words from people we’ve helped make Uruguay home 🌿
          </p>

          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full">
              <div className="card rounded-2xl bg-base-100 p-8 text-center shadow-lg transition-all duration-500 ease-in-out">
                <p className="mb-6 text-lg italic leading-relaxed text-ink">{reviews[current].text}</p>
                <h4 className="text-xl font-display text-lavender">— {reviews[current].name}</h4>
              </div>

              <button
                onClick={prevReview}
                className="btn btn-ghost absolute left-0 top-1/2 -translate-y-1/2"
                aria-label="Previous review"
              >
                ❮
              </button>
              <button
                onClick={nextReview}
                className="btn btn-ghost absolute right-0 top-1/2 -translate-y-1/2"
                aria-label="Next review"
              >
                ❯
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
