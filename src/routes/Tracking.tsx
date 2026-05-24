import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import { getClientByRef } from '../lib/trackingData';
import type { TrackedClient, TrackedStep, DocStatus } from '../lib/trackingTypes';

/* ───────── doc status icons ───────── */
function DocIcon({ status }: { status: DocStatus }) {
    if (status === 'done') {
        return (
            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-sage/60">
                <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7.5l2.5 2.5L11 4" stroke="#3d7a3d" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        );
    }
    if (status === 'in-process') {
        return (
            <span className="relative flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-sky/15">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-md bg-sky/10" />
                <svg className="relative h-3.5 w-3.5 text-sky" viewBox="0 0 14 14" fill="none">
                    <circle cx={7} cy={7} r={3} fill="currentColor" />
                </svg>
            </span>
        );
    }
    if (status === 'n/a') {
        return (
            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-ink/5">
                <svg className="h-3 w-3 text-ink/25" viewBox="0 0 12 12" fill="none">
                    <path d="M3 9L9 3M3 3l6 6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
                </svg>
            </span>
        );
    }
    // not started
    return (
        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border-2 border-dashed border-ink/12" />
    );
}

function statusLabel(status: DocStatus): string {
    switch (status) {
        case 'done': return 'Done';
        case 'in-process': return 'In Process';
        case 'n/a': return 'N/A';
        default: return 'Not Started';
    }
}

function statusPill(status: DocStatus) {
    const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide';
    switch (status) {
        case 'done':
            return <span className={`${base} bg-sage/40 text-emerald-700`}>{statusLabel(status)}</span>;
        case 'in-process':
            return <span className={`${base} bg-sky/15 text-sky`}>{statusLabel(status)}</span>;
        case 'n/a':
            return <span className={`${base} bg-ink/5 text-ink/30`}>{statusLabel(status)}</span>;
        default:
            return null;
    }
}

/* ───────── step timeline icons ───────── */
const StepDone = () => (
    <svg className="h-7 w-7 shrink-0 drop-shadow-sm" viewBox="0 0 28 28" fill="none">
        <circle cx={14} cy={14} r={14} className="fill-sage" />
        <path d="M9 14.5l3.5 3.5L19 11" stroke="#3d7a3d" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StepActive = () => (
    <span className="relative flex h-7 w-7 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky/30" />
        <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky to-lavender shadow-md shadow-sky/25">
            <span className="h-2 w-2 rounded-full bg-white" />
        </span>
    </span>
);

const StepLocked = () => (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-ink/15">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
    </span>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg
        className={`h-5 w-5 text-ink/30 transition-transform duration-300 ease-out ${open ? 'rotate-180' : ''}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

/* ───────── determine step state ───────── */
type StepState = 'completed' | 'current' | 'upcoming';

function getStepState(step: TrackedStep, index: number, allSteps: TrackedStep[]): StepState {
    const applicable = step.documents.filter((d) => d.status !== 'n/a');
    const allDone = applicable.length > 0 && applicable.every((d) => d.status === 'done');
    const anyActive = applicable.some((d) => d.status === 'in-process' || d.status === 'done');

    if (allDone) return 'completed';
    if (anyActive) return 'current';

    // First non-completed step is current
    const prevAllDone = allSteps.slice(0, index).every((s) => {
        const app = s.documents.filter((d) => d.status !== 'n/a');
        return app.length > 0 && app.every((d) => d.status === 'done');
    });
    return prevAllDone ? 'current' : 'upcoming';
}

/* ───────── step card ───────── */
function StepCard({
    step,
    index,
    totalSteps,
    state,
    statusNote,
}: {
    step: TrackedStep;
    index: number;
    totalSteps: number;
    state: StepState;
    statusNote?: string;
}) {
    const [expanded, setExpanded] = useState(state === 'current');
    const applicable = step.documents.filter((d) => d.status !== 'n/a');
    const doneCount = applicable.filter((d) => d.status === 'done').length;
    const totalApplicable = applicable.length;
    const isLast = index === totalSteps - 1;

    return (
        <div className="relative flex gap-5">
            {/* vertical timeline rail */}
            <div className="flex flex-col items-center">
                {state === 'completed' && <StepDone />}
                {state === 'current' && <StepActive />}
                {state === 'upcoming' && <StepLocked />}
                {!isLast && (
                    <div
                        className={`mt-1 w-[2px] flex-1 rounded-full ${state === 'completed'
                            ? 'bg-gradient-to-b from-sage/80 to-sage/30'
                            : state === 'current'
                                ? 'bg-gradient-to-b from-sky/40 to-ink/5'
                                : 'bg-ink/8'
                            }`}
                    />
                )}
            </div>

            {/* card */}
            <div
                className={`mb-5 flex-1 rounded-2xl border p-5 transition-all duration-300 ${state === 'completed'
                    ? 'border-sage/40 bg-gradient-to-br from-sage/10 to-sage/5'
                    : state === 'current'
                        ? 'border-sky/25 bg-white shadow-lg shadow-sky/8'
                        : 'border-ink/6 bg-white/50'
                    }`}
            >
                {/* header */}
                <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="flex w-full items-center justify-between text-left group cursor-pointer"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-[11px] font-bold uppercase tracking-widest ${state === 'completed'
                                    ? 'text-emerald-600/60'
                                    : state === 'current'
                                        ? 'text-sky'
                                        : 'text-ink/25'
                                    }`}
                            >
                                Step {index + 1}
                            </span>
                            {state === 'completed' && (
                                <span className="rounded-full bg-sage/40 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                                    Complete
                                </span>
                            )}
                            {state === 'current' && (
                                <span className="rounded-full bg-sky/12 px-2 py-0.5 text-[10px] font-bold uppercase text-sky">
                                    In Progress
                                </span>
                            )}
                        </div>
                        <h3
                            className={`mt-1 text-lg font-display leading-snug ${state === 'upcoming' ? 'text-ink/30' : 'text-ink'
                                }`}
                        >
                            {step.title}
                        </h3>

                        {/* mini progress bar */}
                        {state !== 'upcoming' && totalApplicable > 0 && (
                            <div className="mt-2.5 flex items-center gap-2.5">
                                <div className="h-1.5 w-28 overflow-hidden rounded-full bg-ink/5">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${state === 'completed'
                                            ? 'bg-sage'
                                            : 'bg-gradient-to-r from-sky to-lavender'
                                            }`}
                                        style={{ width: `${(doneCount / totalApplicable) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-ink/40">
                                    {doneCount}/{totalApplicable}
                                </span>
                            </div>
                        )}
                    </div>
                    <ChevronIcon open={expanded} />
                </button>

                {/* status note */}
                {state === 'current' && statusNote && (
                    <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-sky/10 bg-gradient-to-r from-sky/5 to-lavender/5 px-4 py-3">
                        <span className="mt-0.5 shrink-0 text-base">📋</span>
                        <p className="text-sm leading-relaxed text-ink/70">{statusNote}</p>
                    </div>
                )}

                {/* document list — animated expand */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${expanded ? 'mt-4 max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <ul className="space-y-2 border-t border-ink/5 pt-4">
                        {step.documents.map((doc) => (
                            <li
                                key={doc.name}
                                className={`flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors ${doc.status === 'n/a' ? 'opacity-40' : ''
                                    }`}
                            >
                                <DocIcon status={doc.status} />
                                <span
                                    className={`flex-1 text-sm leading-snug ${doc.status === 'done'
                                        ? 'text-ink/50 line-through decoration-ink/15'
                                        : doc.status === 'n/a'
                                            ? 'text-ink/30 line-through decoration-ink/10'
                                            : doc.status === 'in-process'
                                                ? 'text-ink font-medium'
                                                : 'text-ink/65'
                                        }`}
                                >
                                    {doc.name}
                                </span>
                                {statusPill(doc.status)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

/* ───────── main component ───────── */
export default function Tracking() {
    const [refInput, setRefInput] = useState('');
    const [client, setClient] = useState<TrackedClient | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = refInput.trim();
        if (!trimmed) return;
        setError('');
        setClient(null);
        setLoading(true);
        setSearched(true);
        try {
            const found = await getClientByRef(trimmed);
            if (!found) {
                setError('No application found with that reference number. Please double-check and try again.');
            } else {
                setClient(found);
            }
        } catch {
            setError('Something went wrong. Please try again in a moment.');
        } finally {
            setLoading(false);
        }
    };

    /* compute overall progress (ignoring n/a docs) */
    const allApplicable = client
        ? client.steps.flatMap((s) => s.documents).filter((d) => d.status !== 'n/a')
        : [];
    const totalDone = allApplicable.filter((d) => d.status === 'done').length;
    const totalApplicable = allApplicable.length;

    const completedSteps = client
        ? client.steps.filter((s) => {
            const app = s.documents.filter((d) => d.status !== 'n/a');
            return app.length > 0 && app.every((d) => d.status === 'done');
        }).length
        : 0;
    const totalSteps = client?.steps.length ?? 0;
    const allDone = totalSteps > 0 && completedSteps === totalSteps;

    return (
        <>
            <Helmet>
                <title>Track Your Residency | Uruguay Relocation Companion</title>
                <meta name="description" content="Check the current status of your Uruguay residency application." />
                <meta name="robots" content="noindex" />
            </Helmet>

            {/* hero */}
            <div className="bg-gradient-to-b from-blush/60 via-base-100 to-base-100 pb-2 pt-24 text-center md:pt-28">
                <Section>
                    <div className="mx-auto max-w-xl">
                        <span className="inline-block rounded-full bg-sky/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky">
                            Application Tracker
                        </span>
                        <h1 className="mt-4 text-4xl font-display text-ink sm:text-5xl">
                            Track Your Residency
                        </h1>
                        <p className="mx-auto mt-4 max-w-md text-ink/55 leading-relaxed">
                            Enter the reference number we gave you to see your real-time residency progress.
                        </p>
                    </div>
                </Section>
            </div>

            <Section className="pb-24">
                {/* search bar */}
                <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
                    <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-2 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-sky/30">
                        <input
                            type="text"
                            value={refInput}
                            onChange={(e) => setRefInput(e.target.value)}
                            placeholder="e.g. URC-2025-001"
                            className="flex-1 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="btn btn-sm rounded-xl border-none bg-gradient-to-r from-sky to-lavender px-5 text-white shadow-sm hover:shadow-md transition-all"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                'Look up'
                            )}
                        </button>
                    </div>
                </form>

                {/* error */}
                {error && (
                    <div className="mx-auto mt-5 max-w-md rounded-xl border border-error/20 bg-error/5 px-5 py-3 text-center">
                        <p className="text-sm text-error">{error}</p>
                    </div>
                )}

                {/* empty searched state */}
                {searched && !loading && !client && !error && (
                    <p className="mx-auto mt-8 max-w-md text-center text-sm text-ink/40">
                        No results found. Check your reference number and try again.
                    </p>
                )}

                {/* client dashboard */}
                {client && (
                    <div className="mx-auto mt-12 max-w-2xl animate-[fadeIn_0.4s_ease-out]">
                        {/* header card */}
                        <div className="rounded-2xl border border-sky/15 bg-white p-6 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-sky">Client</p>
                                    <h2 className="mt-1 text-2xl font-display text-ink">{client.name}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-ink/30">Reference</p>
                                    <p className="mt-1 font-mono text-sm text-ink/60">{client.refNumber}</p>
                                </div>
                            </div>

                            {/* status note */}
                            {client.statusNote && (
                                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-lavender/15 bg-lavender/5 px-4 py-3">
                                    <span className="mt-0.5 shrink-0 text-base">📋</span>
                                    <p className="text-sm leading-relaxed text-ink/70">{client.statusNote}</p>
                                </div>
                            )}

                            {/* overall progress */}
                            <div className="mt-5">
                                <div className="flex items-center justify-between text-xs text-ink/40">
                                    <span>Overall Progress</span>
                                    <span className="font-semibold">
                                        {totalDone} of {totalApplicable} documents &middot; {completedSteps}/{totalSteps} steps
                                    </span>
                                </div>
                                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-ink/5">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-sky via-lavender to-sage transition-all duration-700 ease-out"
                                        style={{ width: `${totalApplicable > 0 ? (totalDone / totalApplicable) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>

                            {/* legend */}
                            <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-ink/40">
                                <span className="flex items-center gap-1.5"><DocIcon status="done" /> Done</span>
                                <span className="flex items-center gap-1.5"><DocIcon status="in-process" /> In Process</span>
                                <span className="flex items-center gap-1.5"><DocIcon status="not started" /> Not Started</span>
                                <span className="flex items-center gap-1.5"><DocIcon status="n/a" /> N/A</span>
                            </div>
                        </div>

                        {/* timeline */}
                        <div className="mt-10">
                            {client.steps.map((step, i) => {
                                const state = getStepState(step, i, client.steps);
                                return (
                                    <StepCard
                                        key={step.title}
                                        step={step}
                                        index={i}
                                        totalSteps={totalSteps}
                                        state={state}
                                        statusNote={state === 'current' ? client.statusNote : undefined}
                                    />
                                );
                            })}
                        </div>

                        {/* celebration */}
                        {allDone && (
                            <div className="mt-6 rounded-2xl border border-sage/40 bg-gradient-to-br from-sage/15 to-sage/5 p-8 text-center">
                                <span className="text-4xl">🎉</span>
                                <h3 className="mt-3 text-xl font-display text-emerald-700">
                                    Process Complete!
                                </h3>
                                <p className="mt-2 text-sm text-emerald-600/70 leading-relaxed">
                                    Congratulations — your residency process is fully complete!
                                    <br />
                                    Welcome to Uruguay 🇺🇾
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </Section>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
