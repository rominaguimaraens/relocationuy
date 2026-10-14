import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Seo from '../components/Seo';
import PackageCard from '../components/PackageCard';
import { contactLink, getResult, visibleQuestions } from '../content/quiz';
import type { Answers, QuestionId } from '../content/quiz';
import { sanitizeText } from '../utils/sanitize';

// Your answers live in this page's memory only. Nothing is saved or sent anywhere
// until the visitor chooses to open the contact form.
export default function Quiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const questions = visibleQuestions(answers);
  const finished = step >= questions.length;
  const question = finished ? null : questions[step];

  // Move keyboard and screen reader focus to the new question or result.
  // Skipped on first load so the page doesn't scroll on arrival.
  useEffect(() => {
    if (!started.current) {
      started.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const choose = (qid: QuestionId, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: answerId }));
    setStep((s) => s + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const result = finished ? getResult(answers) : null;

  return (
    <>
      <Seo
        title="Which Package Fits You? | Uruguay Relocation Companion"
        description="Answer four quick questions and see which Uruguay Relocation Companion package, or a scouting trip, fits your move."
        path="/quiz"
      />

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl">Which package fits you?</h1>
          <p className="mt-5 text-lg text-ink/80 md:text-xl">
            Four quick questions. Nothing is saved or sent anywhere unless you choose to contact us.
          </p>
        </div>
      </Section>

      <Section className="bg-beige-gradient">
        <div className="mx-auto max-w-3xl">
          {question && (
            <div className="rounded-3xl border border-sky/15 bg-base-100 p-8 shadow-xl shadow-sky/10">
              <p className="text-sm uppercase tracking-widest text-ink/60">
                Question {step + 1} of {questions.length}
              </p>
              <progress
                className="progress progress-primary mt-3 w-full"
                value={step}
                max={questions.length}
                aria-hidden="true"
              />
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="mt-6 text-3xl outline-none md:text-4xl"
              >
                {sanitizeText(question.title)}
              </h2>
              <div className="mt-6 grid gap-3">
                {question.answers.map((answer) => (
                  <button
                    key={answer.id}
                    type="button"
                    onClick={() => choose(question.id, answer.id)}
                    className={`btn btn-lg h-auto justify-start whitespace-normal py-4 text-left font-medium ${
                      answers[question.id] === answer.id ? 'btn-primary btn-soft' : 'btn-outline'
                    }`}
                  >
                    {sanitizeText(answer.label)}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="btn btn-ghost mt-6"
                >
                  Back
                </button>
              )}
            </div>
          )}

          {result && (
            <div>
              <h2 ref={headingRef} tabIndex={-1} className="text-center text-3xl outline-none md:text-4xl">
                {result.kind === 'scouting'
                  ? 'A scouting trip sounds like your next step'
                  : 'This looks like your fit'}
              </h2>

              <div className="mx-auto mt-8 max-w-xl">
                {result.kind === 'package' && result.pkg ? (
                  <PackageCard
                    name={result.pkg.name}
                    price={result.pkg.price}
                    summary={result.pkg.summary}
                    features={result.pkg.features}
                    footer={result.pkg.footer ? sanitizeText(result.pkg.footer) : undefined}
                    highlighted
                  />
                ) : (
                  <PackageCard
                    name="Scouting trip"
                    price="From $700 per group"
                    summary="If you are still deciding, the best thing is to come and see it. We plan the days with you, show you the neighbourhoods and take care of the practical side, so you can judge Uruguay for yourself."
                    features={[
                      'Uruguay 101 Day: $700',
                      'Settle & Explore (3 days): $1,200',
                      'Live Like a Local (7 days): $1,800',
                      'Flights, a place to stay and airport pickup are not included',
                    ]}
                    footer={
                      <Link to="/scouting-trips" className="link link-primary">
                        See what each trip includes
                      </Link>
                    }
                  />
                )}
              </div>

              {result.notes.length > 0 && (
                <div className="mx-auto mt-6 max-w-xl space-y-2 text-center text-ink/80">
                  {result.notes.map((note) => (
                    <p key={note}>{sanitizeText(note)}</p>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-col items-center gap-3">
                <Link
                  to={contactLink(answers, result)}
                  className="btn btn-primary btn-lg text-white"
                >
                  Book a free 30-minute call
                </Link>
                <p className="max-w-md text-center text-sm text-ink/70">
                  We will fill in what you told us. On the call we can talk it through and change
                  the plan if something else fits better.
                </p>
                <button type="button" onClick={restart} className="btn btn-ghost btn-sm mt-2">
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
