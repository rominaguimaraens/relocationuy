import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Section from '../components/Section';
import { getClientByRef, updateClient } from '../lib/trackingData';
import type { TrackedClient } from '../lib/trackingTypes';

export default function AdminClientEditor() {
    const { refNumber } = useParams<{ refNumber: string }>();
    const navigate = useNavigate();

    /* redirect if not authed */
    useEffect(() => {
        if (sessionStorage.getItem('uy_admin') !== '1') navigate('/admin/tracking');
    }, [navigate]);

    const [client, setClient] = useState<TrackedClient | null>(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!refNumber) return;
        (async () => {
            setLoading(true);
            const c = await getClientByRef(decodeURIComponent(refNumber));
            if (!c) { navigate('/admin/tracking'); return; }
            setClient(c);
            setLoading(false);
        })();
    }, [refNumber, navigate]);

    if (loading || !client) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-lavender" />
            </div>
        );
    }

    /* ── helpers ── */
    const toggleDoc = (stepIdx: number, docIdx: number) => {
        setClient((prev) => {
            if (!prev) return prev;
            const copy = structuredClone(prev);
            copy.steps[stepIdx].documents[docIdx].done = !copy.steps[stepIdx].documents[docIdx].done;
            return copy;
        });
        setSaved(false);
    };

    const toggleApplicable = (stepIdx: number, docIdx: number) => {
        setClient((prev) => {
            if (!prev) return prev;
            const copy = structuredClone(prev);
            const doc = copy.steps[stepIdx].documents[docIdx];
            doc.applicable = !doc.applicable;
            if (!doc.applicable) doc.done = false;
            return copy;
        });
        setSaved(false);
    };

    const setCurrentStep = (stepIdx: number) => {
        setClient((prev) => {
            if (!prev) return prev;
            return { ...prev, currentStep: stepIdx };
        });
        setSaved(false);
    };

    const setStatusNote = (note: string) => {
        setClient((prev) => {
            if (!prev) return prev;
            return { ...prev, statusNote: note };
        });
        setSaved(false);
    };

    const handleSave = async () => {
        if (!client || saving) return;
        setSaving(true);
        try {
            await updateClient(client);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch {
            alert('Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Edit {client.name} | Admin | Uruguay Relocation Companion</title>
                <meta name="robots" content="noindex,nofollow" />
            </Helmet>

            <div className="bg-gradient-to-b from-lavender/10 to-base-100 pb-4 pt-20">
                <Section>
                    <Link to="/admin/tracking" className="text-sm text-lavender hover:underline">← Back to all clients</Link>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="font-mono text-sm text-lavender">{client.refNumber}</p>
                            <h1 className="mt-0.5 text-3xl font-display text-ink">{client.name}</h1>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`btn border-none text-white transition-colors ${saved ? 'bg-emerald-500' : 'bg-lavender hover:bg-lavender/90'}`}
                        >
                            {saving ? <span className="loading loading-spinner loading-sm" /> : saved ? '✓ Saved' : 'Save Changes'}
                        </button>
                    </div>
                </Section>
            </div>

            <Section className="pb-20">
                {/* ── status note ── */}
                <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-ink/10 bg-white p-5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                        Status note (visible to client — pin it to a step below)
                    </label>
                    <input
                        type="text"
                        value={client.statusNote}
                        onChange={(e) => setStatusNote(e.target.value)}
                        placeholder="e.g. Waiting for DNM appointment — estimated 3 weeks"
                        className="input input-bordered mt-2 w-full border-ink/15 bg-white text-sm focus:border-lavender focus:outline-none"
                    />
                </div>

                {/* ── steps ── */}
                <div className="mx-auto mt-6 max-w-3xl space-y-4">
                    {client.steps.map((step, stepIdx) => {
                        const applicable = step.documents.filter((d) => d.applicable);
                        const doneCount = applicable.filter((d) => d.done).length;
                        const allDone = applicable.length > 0 && doneCount === applicable.length;
                        const anyDone = doneCount > 0;
                        const isCompleted = allDone;
                        const isInProgress = !allDone && anyDone;
                        const hasNote = stepIdx === client.currentStep;
                        return (
                            <div
                                key={step.title}
                                className={`rounded-2xl border p-5 transition-all ${isCompleted
                                    ? 'border-emerald-200/60 bg-emerald-50/20'
                                    : isInProgress
                                        ? 'border-sky/30 bg-white shadow-lg shadow-sky/10'
                                        : 'border-ink/8 bg-white/60'
                                    }`}
                            >
                                {/* step header */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`text-xs font-semibold uppercase tracking-wider ${isCompleted ? 'text-emerald-600/70' : isInProgress ? 'text-sky' : 'text-ink/30'
                                                }`}>
                                                Step {stepIdx + 1}
                                            </span>
                                            {isCompleted && (
                                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-600">
                                                    Complete
                                                </span>
                                            )}
                                            {isInProgress && (
                                                <span className="rounded-full bg-sky/15 px-2 py-0.5 text-[10px] font-bold uppercase text-sky">
                                                    In Progress
                                                </span>
                                            )}
                                            {step.parallel && (
                                                <span className="rounded-full bg-lavender/10 px-2 py-0.5 text-[10px] font-bold uppercase text-lavender">
                                                    Parallel
                                                </span>
                                            )}
                                            {hasNote && client.statusNote && (
                                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-600">
                                                    📋 Note pinned
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="mt-1 text-lg font-display text-ink">{step.title}</h3>
                                        <p className="mt-0.5 text-xs text-ink/40">{doneCount}/{applicable.length} documents completed</p>
                                        {step.note && (
                                            <p className="mt-1 text-xs italic text-ink/40">{step.note}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setCurrentStep(stepIdx)}
                                        className={`btn btn-sm border-none text-xs ${hasNote
                                            ? 'bg-amber-100 text-amber-700 cursor-default'
                                            : 'bg-ink/5 text-ink/50 hover:bg-amber-50 hover:text-amber-600'
                                            }`}
                                        disabled={hasNote}
                                    >
                                        {hasNote ? '📋 Note here' : '📌 Pin note'}
                                    </button>
                                </div>

                                {/* document checklist */}
                                <ul className="mt-4 space-y-2 border-t border-ink/5 pt-4">
                                    {step.documents.map((doc, docIdx) => (
                                        <li key={doc.name} className="flex items-center gap-3">
                                            {/* done checkbox */}
                                            <label className="flex cursor-pointer items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={doc.done}
                                                    onChange={() => toggleDoc(stepIdx, docIdx)}
                                                    disabled={!doc.applicable}
                                                    className="checkbox checkbox-sm border-ink/20 checked:border-emerald-500 [--chkbg:theme(colors.emerald.500)] [--chkfg:white]"
                                                />
                                            </label>
                                            <span className={`flex-1 text-sm ${!doc.applicable ? 'text-ink/25 line-through' : doc.done ? 'text-ink/60' : 'text-ink'}`}>
                                                {doc.name}
                                            </span>
                                            {/* N/A toggle */}
                                            <button
                                                onClick={() => toggleApplicable(stepIdx, docIdx)}
                                                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase transition-colors ${doc.applicable
                                                    ? 'bg-ink/5 text-ink/40 hover:bg-ink/10'
                                                    : 'bg-warning/15 text-warning hover:bg-warning/25'
                                                    }`}
                                            >
                                                {doc.applicable ? 'N/A' : 'Not applicable'}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* floating save button for long pages */}
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`btn btn-lg rounded-full shadow-xl border-none text-white transition-colors ${saved ? 'bg-emerald-500' : 'bg-lavender hover:bg-lavender/90'
                            }`}
                    >
                        {saving ? <span className="loading loading-spinner loading-sm" /> : saved ? '✓ Saved' : '💾 Save'}
                    </button>
                </div>
            </Section>
        </>
    );
}
