import type { TrackedClient } from './trackingTypes';

/*
 * The browser never sees the tracking sheet. It sends the reference code to a small
 * server function (netlify/functions/tracking.ts), which reads the sheet privately and
 * sends back only that one client's row.
 */

const ENDPOINT = '/.netlify/functions/tracking';

export async function getClientByRef(refNumber: string): Promise<TrackedClient | null> {
    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ref: refNumber }),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to load tracking data.');
    const data = (await res.json()) as { client?: TrackedClient };
    return data.client ?? null;
}
