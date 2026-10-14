import { findClient } from '../../src/lib/trackingTemplate';

/*
 * Client progress lookup. The tracking sheet's link lives only in the TRACKING_SHEET_CSV_URL
 * environment variable on Netlify. It is never sent to the browser. A visitor gives a
 * reference code and gets back that one client's progress, nothing else.
 */

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: {
            'content-type': 'application/json',
            'cache-control': 'no-store',
        },
    });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Letters, numbers and dashes only, a sensible length.
const REF_PATTERN = /^[A-Za-z0-9-]{4,40}$/;

export default async (req: Request): Promise<Response> => {
    if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

    const sheetUrl = process.env.TRACKING_SHEET_CSV_URL;
    if (!sheetUrl) return json({ error: 'unavailable' }, 503);

    let ref = '';
    try {
        const raw = await req.text();
        if (raw.length > 500) return json({ error: 'not_found' }, 404);
        const body = JSON.parse(raw) as { ref?: unknown };
        ref = typeof body.ref === 'string' ? body.ref.trim() : '';
    } catch {
        return json({ error: 'not_found' }, 404);
    }

    // Wrong guesses are rejected after a short pause, which makes guessing codes slow.
    if (!REF_PATTERN.test(ref)) {
        await sleep(400);
        return json({ error: 'not_found' }, 404);
    }

    let csv: string;
    try {
        const res = await fetch(sheetUrl, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) return json({ error: 'unavailable' }, 502);
        csv = await res.text();
    } catch {
        return json({ error: 'unavailable' }, 502);
    }

    const client = findClient(csv, ref);
    if (!client) {
        await sleep(400);
        return json({ error: 'not_found' }, 404);
    }
    return json({ client });
};
