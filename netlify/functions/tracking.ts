import { findClient } from '../../src/lib/trackingTemplate';

/*
 * Client progress lookup. The tracking sheet's link lives only in the TRACKING_SHEET_CSV_URL
 * environment variable on Netlify. It is never sent to the browser. A visitor gives a
 * reference code and gets back that one client's progress, nothing else.
 */

// Why a lookup failed, for the Netlify function log and the browser's Network tab. These never
// include a reference code, a name or anything from the sheet.
const fail = (reason: string, detail: string, status: number) => {
    console.error(`tracking: ${reason} - ${detail}`);
    return json({ error: 'unavailable', reason }, status);
};

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

    // Tolerate stray spaces or quotes from pasting the link into Netlify.
    const sheetUrl = (process.env.TRACKING_SHEET_CSV_URL ?? '').trim().replace(/^["']|["']$/g, '');
    if (!sheetUrl) {
        return fail(
            'not_configured',
            'TRACKING_SHEET_CSV_URL is empty. Add it in Netlify, then redeploy so this deploy picks it up.',
            503,
        );
    }

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
        // A throwaway query value and no-store make sure we ask Google for the current copy
        // of the sheet instead of one kept by a cache along the way.
        const freshUrl = `${sheetUrl}${sheetUrl.includes('?') ? '&' : '?'}_=${Date.now()}`;
        const res = await fetch(freshUrl, {
            cache: 'no-store',
            headers: { 'cache-control': 'no-cache' },
            signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) {
            return fail(
                'sheet_error',
                `Google answered ${res.status}. The published link may have been stopped or changed.`,
                502,
            );
        }
        if ((res.headers.get('content-type') ?? '').includes('text/html')) {
            return fail(
                'sheet_not_csv',
                'The link returned a web page, not a CSV. In Publish to web, choose the sheet tab and "Comma-separated values (.csv)".',
                502,
            );
        }
        csv = await res.text();
    } catch (err) {
        return fail('sheet_unreachable', err instanceof Error ? err.message : 'request failed', 502);
    }

    const client = findClient(csv, ref);
    if (!client) {
        await sleep(400);
        return json({ error: 'not_found' }, 404);
    }
    return json({ client });
};
