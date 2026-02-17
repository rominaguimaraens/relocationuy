import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import { getClientByRef } from '../lib/trackingData';
import type { TrackedClient, TrackedStep } from '../lib/trackingTypes';

/* ───────── icons ───────── */
const CheckCircle = () => (
    <svg className="h-6 w-6 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const CurrentCircle = () => (
    <span className="relative flex h-6 w-6 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky/40" />
        <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky text-white text-xs font-bold">●</span>
    </span>
);
const LockedCircle = () => (
    <svg className="h-6 w-6 text-ink/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx={12} cy={12} r={9} strokeDasharray="4 3" />
    </svg>
);
const DocCheck = () => (
    <svg className="h-4 w-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);
const DocPending = () => (
    <svg className="h-4 w-4 text-ink/25 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx={12} cy={12} r={9} />
    </svg>
);
const ChevronDown = ({ open }: { open: boolean }) => (
    <svg
        className={`h-4 w-4 text-ink/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

/* ───────── step card component ───────── */
function StepCard({
    step,
    index,
    state,
    statusNote,
}: {
    step: TrackedStep;
    index: number;
    state: 'completed' | 'current' | 'upcoming';
    statusNote?: string;
}) {
    const [expanded, setExpanded] = useState(state === 'current');
    const applicableDocs = step.documents.filter((d) => d.applicable);
    const doneCount = applicableDocs.filter((d) => d.done).length;
    const hasDocs = applicableDocs.length > 0;

    return (
        <div className="relative flex gap-4">
            {/* timeline connector line */}
            <div className="flex flex-col items-center">
                {state === 'completed' && <CheckCircle />}
                {state === 'current' && <CurrentCircle />}
                {state === 'upcoming' && <LockedCircle />}
                <div className="mt-1 w-0.5 flex-1 bg-gradient-to-b from-ink/10 to-transparent" />
            </div>

            {/* card */}
            <div
                className={`mb-6 flex-1 rounded-2xl border p-5 transition-all duration-300 ${state === 'completed'
                    ? 'border-emerald-200/60 bg-emerald-50/30'
                    : state === 'current'
                        ? 'border-sky/30 bg-white shadow-lg shadow-sky/10'
                        : 'border-ink/8 bg-white/40'
                    }`}
            >
                {/* header */}
                <button
                    type="button"
                    onClick={() => hasDocs && setExpanded(!expanded)}
                    className={`flex w-full items-center justify-between text-left ${hasDocs ? 'cursor-pointer' : 'cursor-default'}`}
                >
                    <div className="flex-1">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${state === 'completed' ? 'text-emerald-600/70' : state === 'current' ? 'text-sky' : 'text-ink/30'
                            }`}>
                            Step {index + 1}
                        </span>
                        <h3 className={`mt-0.5 text-lg font-display leading-snug ${state === 'upcoming' ? 'text-ink/35' : 'text-ink'
                            }`}>
                            {step.title}
                        </h3>
                        {hasDocs && state !== 'upcoming' && (
                            <span className="mt-1 inline-block text-xs text-ink/45">
                                {doneCount}/{applicableDocs.length} completed
                            </span>
                        )}
                    </div>
                    {hasDocs && <ChevronDown open={expanded} />}
                </button>

                {/* status note on current step */}
                {state === 'current' && statusNote && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl bg-sky/8 px-4 py-3 text-sm text-ink/75">
                        <span className="shrink-0 text-base">📋</span>
                        <span>{statusNote}</span>
                    </div>
                )}

                {/* step note (e.g. "This step can happen before arriving...") */}
                {state === 'current' && step.note && (
                    <p className="mt-2 text-xs italic text-ink/45">{step.note}</p>
                )}

                {/* parallel tasks badge */}
                {state === 'current' && step.parallel && (
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-lavender/10 px-3 py-1 text-xs font-medium text-lavender">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                        </svg>
                        These tasks can be done in any order
                    </div>
                )}

                {/* document checklist — expandable */}
                {expanded && hasDocs && (
                    <ul className="mt-4 space-y-2.5 border-t border-ink/5 pt-4">
                        {applicableDocs.map((doc) => (
                            <li key={doc.name} className="flex items-start gap-2.5">
                                {doc.done ? <DocCheck /> : <DocPending />}
                                <span className={`text-sm leading-snug ${doc.done ? 'text-ink/70' : 'text-ink/45'}`}>
                                    {doc.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

/* ───────── main component ───────── */
export default function Tracking() {
    const [refInput, setRefInput] = useState('');
    const [searchedRef, setSearchedRef] = useState('');
    const [error, setError] = useState('');

    const client: TrackedClient | null = useMemo(() => {
        if (!searchedRef) return null;
        return getClientByRef(searchedRef);
    }, [searchedRef]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = refInput.trim();
        if (!trimmed) return;
        setError('');
        setSearchedRef(trimmed);
        const found = getClientByRef(trimmed);
        if (!found) {
            setError('No application found with that reference number. Please double-check and try again.');
        }
    };

    return (
        <>
            <Helmet>
                <title>Track Your Residency | Uruguay Relocation Companion</title>
                <meta name="description" content="Check the current status of your Uruguay residency application." />
                <meta name="robots" content="noindex" />
            </Helmet>

            {/* ── hero ── */}
            <div className="bg-gradient-to-b from-blush/60 to-base-100 pb-4 pt-20 text-center">
                <Section>
                    <p className="text-xs font-semibold uppercase tracking-widest text-sky">Application Tracker</p>
                    <h1 className="mt-2 text-3xl font-display text-ink sm:text-4xl">Track Your Residency</h1>
                    <p className="mx-auto mt-3 max-w-lg text-ink/60">
                        Enter the reference number we gave you to see your real-time residency progress.
                    </p>
                </Section>
            </div>

            <Section className="pb-20">
                {/* ── search form ── */}
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto mt-8 flex max-w-md items-center gap-3"
                >
                    <input
                        type="text"
                        value={refInput}
                        onChange={(e) => setRefInput(e.target.value)}
                        placeholder="e.g. URC-2025-001"
                        className="input input-bordered flex-1 border-ink/15 bg-white focus:border-sky focus:outline-none"
                    />
                    <button type="submit" className="btn bg-sky text-white hover:bg-sky/90 border-none">
                        Look up
                    </button>
                </form>

                {error && (
                    <p className="mx-auto mt-4 max-w-md text-center text-sm text-error">{error}</p>
                )}

                {/* ── timeline ── */}
                {client && (
                    <div className="mx-auto mt-12 max-w-2xl">
                        {/* client header */}
                        <div className="mb-8 rounded-2xl border border-sky/20 bg-white p-6 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-sky">Client</p>
                                    <h2 className="mt-0.5 text-xl font-display text-ink">{client.name}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-ink/40">Reference</p>
                                    <p className="font-mono text-sm text-ink/70">{client.refNumber}</p>
                                </div>
                            </div>
                            {/* progress bar */}
                            {(() => {
                                const completedCount = client.steps.filter((s) => {
                                    const applicable = s.documents.filter((d) => d.applicable);
                                    return applicable.length > 0 && applicable.every((d) => d.done);
                                }).length;
                                return (
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-xs text-ink/45">
                                            <span>Progress</span>
                                            <span>{completedCount} of {client.steps.length} steps complete</span>
                                        </div>
                                        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink/5">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-sky to-lavender transition-all duration-500"
                                                style={{ width: `${(completedCount / client.steps.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* steps */}
                        {client.steps.map((step, i) => {
                            const applicable = step.documents.filter((d) => d.applicable);
                            const doneCount = applicable.filter((d) => d.done).length;
                            const allDone = applicable.length > 0 && doneCount === applicable.length;
                            const anyDone = doneCount > 0;
                            let state: 'completed' | 'current' | 'upcoming' = 'upcoming';
                            if (allDone) state = 'completed';
                            else if (anyDone) state = 'current';
                            return (
                                <StepCard
                                    key={step.title}
                                    step={step}
                                    index={i}
                                    state={state}
                                    statusNote={i === client.currentStep ? client.statusNote : undefined}
                                />
                            );
                        })}

                        {/* completion message */}
                        {client.steps.every((s) => {
                            const applicable = s.documents.filter((d) => d.applicable);
                            return applicable.length > 0 && applicable.every((d) => d.done);
                        }) && (
                                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 text-center">
                                    <span className="text-3xl">🎉</span>
                                    <h3 className="mt-2 text-lg font-display text-emerald-700">Process Complete</h3>
                                    <p className="mt-1 text-sm text-emerald-600/70">
                                        Congratulations — your residency process is fully complete!
                                    </p>
                                </div>
                            )}
                    </div>
                )}
            </Section>
        </>
    );
}
