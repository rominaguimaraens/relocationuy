import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import {
    ADMIN_PASSWORD,
    getClients,
    createClient,
    deleteClient,
} from '../lib/trackingData';
import type { TrackedClient } from '../lib/trackingTypes';

/* ───────── admin tracking: login gate + client list ───────── */
export default function AdminTracking() {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem('uy_admin') === '1');
    const [pw, setPw] = useState('');
    const [pwError, setPwError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pw === ADMIN_PASSWORD) {
            sessionStorage.setItem('uy_admin', '1');
            setAuthed(true);
        } else {
            setPwError('Incorrect password.');
        }
    };

    if (!authed) {
        return (
            <>
                <Helmet>
                    <title>Admin Login | Uruguay Relocation Companion</title>
                    <meta name="robots" content="noindex,nofollow" />
                </Helmet>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 shadow-lg">
                        <h1 className="text-2xl font-display text-ink">Admin Access</h1>
                        <p className="mt-1 text-sm text-ink/50">Enter the admin password to continue.</p>
                        <input
                            type="password"
                            value={pw}
                            onChange={(e) => { setPw(e.target.value); setPwError(''); }}
                            placeholder="Password"
                            className="input input-bordered mt-5 w-full border-ink/15 bg-white focus:border-sky focus:outline-none"
                            autoFocus
                        />
                        {pwError && <p className="mt-2 text-sm text-error">{pwError}</p>}
                        <button type="submit" className="btn mt-4 w-full bg-sky text-white hover:bg-sky/90 border-none">
                            Log in
                        </button>
                    </form>
                </div>
            </>
        );
    }

    return <ClientList />;
}

/* ───────── client list ───────── */
function ClientList() {
    const [clients, setClients] = useState<TrackedClient[]>(() => getClients());
    const [newRef, setNewRef] = useState('');
    const [newName, setNewName] = useState('');
    const [createError, setCreateError] = useState('');

    const refresh = useCallback(() => setClients(getClients()), []);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const ref = newRef.trim();
        const name = newName.trim();
        if (!ref || !name) { setCreateError('Both fields are required.'); return; }
        try {
            createClient(ref, name);
            setNewRef('');
            setNewName('');
            setCreateError('');
            refresh();
        } catch (err: unknown) {
            setCreateError(err instanceof Error ? err.message : 'Error creating client.');
        }
    };

    const handleDelete = (refNumber: string) => {
        if (!confirm(`Delete client ${refNumber}? This cannot be undone.`)) return;
        deleteClient(refNumber);
        refresh();
    };

    const handleLogout = () => {
        sessionStorage.removeItem('uy_admin');
        window.location.reload();
    };

    const stepLabel = (c: TrackedClient) =>
        `Step ${c.currentStep + 1}: ${c.steps[c.currentStep]?.title ?? '—'}`;

    return (
        <>
            <Helmet>
                <title>Admin — Client Tracking | Uruguay Relocation Companion</title>
                <meta name="robots" content="noindex,nofollow" />
            </Helmet>

            <div className="bg-gradient-to-b from-lavender/10 to-base-100 pb-4 pt-20">
                <Section>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-lavender">Admin Panel</p>
                            <h1 className="mt-1 text-3xl font-display text-ink">Client Tracking</h1>
                        </div>
                        <button onClick={handleLogout} className="btn btn-sm btn-ghost text-ink/50 hover:text-ink">
                            Log out
                        </button>
                    </div>
                </Section>
            </div>

            <Section className="pb-20">
                {/* ── create new client ── */}
                <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-ink/10 bg-white p-6">
                    <h2 className="text-lg font-display text-ink">Add New Client</h2>
                    <form onSubmit={handleCreate} className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <input
                            type="text"
                            value={newRef}
                            onChange={(e) => setNewRef(e.target.value)}
                            placeholder="Reference (e.g. URC-2025-001)"
                            className="input input-bordered flex-1 border-ink/15 bg-white text-sm focus:border-sky focus:outline-none"
                        />
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Client name"
                            className="input input-bordered flex-1 border-ink/15 bg-white text-sm focus:border-sky focus:outline-none"
                        />
                        <button type="submit" className="btn bg-lavender text-white hover:bg-lavender/90 border-none">
                            + Add
                        </button>
                    </form>
                    {createError && <p className="mt-2 text-sm text-error">{createError}</p>}
                </div>

                {/* ── client table ── */}
                <div className="mx-auto mt-8 max-w-2xl">
                    {clients.length === 0 ? (
                        <p className="text-center text-ink/40 py-12">No clients yet. Create one above.</p>
                    ) : (
                        <div className="space-y-3">
                            {clients.map((c) => (
                                <div
                                    key={c.refNumber}
                                    className="flex items-center gap-4 rounded-2xl border border-ink/8 bg-white p-4 transition-shadow hover:shadow-md"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-mono text-sm text-lavender">{c.refNumber}</span>
                                            <span className="text-sm font-semibold text-ink">{c.name}</span>
                                        </div>
                                        <p className="mt-0.5 truncate text-xs text-ink/45">{stepLabel(c)}</p>
                                    </div>
                                    <Link
                                        to={`/admin/tracking/${encodeURIComponent(c.refNumber)}`}
                                        className="btn btn-sm bg-sky/10 text-sky hover:bg-sky/20 border-none"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(c.refNumber)}
                                        className="btn btn-sm btn-ghost text-error/60 hover:text-error hover:bg-error/10"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Section>
        </>
    );
}
