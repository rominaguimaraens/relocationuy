import { FIREBASE_PROJECT_ID, FIREBASE_API_KEY } from './firebase';
import type { TrackedClient, TrackedStep } from './trackingTypes';

/* ─────────── default 8-step template ─────────── */

export const DEFAULT_STEPS: TrackedStep[] = [
    {
        title: 'Document Preparation (Pre-Arrival)',
        documents: [
            { name: 'Passport (valid 6+ months)', done: false, applicable: true },
            { name: 'FBI background check ordered', done: false, applicable: true },
            { name: 'Birth certificate obtained', done: false, applicable: true },
            { name: 'Marriage certificate obtained (if applicable)', done: false, applicable: true },
            { name: 'Proof of income gathered (employment contract / pension / bank statements)', done: false, applicable: true },
            { name: 'Vaccine records obtained from home country', done: false, applicable: true },
        ],
    },
    {
        title: 'Apostilles (Pre-Arrival)',
        documents: [
            { name: 'FBI background check apostilled', done: false, applicable: true },
            { name: 'Birth certificate apostilled', done: false, applicable: true },
            { name: 'Marriage certificate apostilled (if applicable)', done: false, applicable: true },
        ],
    },
    {
        title: 'DNM Appointment Booked',
        documents: [
            { name: 'DNM account created on gub.uy', done: false, applicable: true },
            { name: 'Residency pathway confirmed', done: false, applicable: true },
            { name: 'Application fee paid', done: false, applicable: true },
            { name: 'Arrival date confirmed', done: false, applicable: true },
            { name: 'Appointment date confirmed', done: false, applicable: true },
        ],
    },
    {
        title: 'In-Country Parallel Tasks',
        note: 'These tasks must all be completed before appointment day — order between them does not matter.',
        documents: [
            { name: 'Certified translations completed (traductor público)', done: false, applicable: true },
            { name: 'Carné de salud completed', done: false, applicable: true },
            { name: 'Vaccine records validated in Uruguay OR new vaccines obtained', done: false, applicable: true },
        ],
    },
    {
        title: 'DNM Appointment Day',
        documents: [
            { name: 'Appointment attended', done: false, applicable: true },
            { name: 'Application accepted / en trámite status confirmed', done: false, applicable: true },
        ],
    },
    {
        title: 'En Trámite',
        documents: [
            { name: 'Provisional cédula obtained', done: false, applicable: true },
            { name: 'Remaining documents gathered and submitted (if incomplete)', done: false, applicable: true },
            { name: 'Waiting for residency approval', done: false, applicable: true },
        ],
    },
    {
        title: 'Residency Approved',
        documents: [
            { name: 'Approval notification received', done: false, applicable: true },
            { name: 'DNIC cédula appointment booked', done: false, applicable: true },
            { name: 'Cédula appointment attended', done: false, applicable: true },
            { name: 'Cédula received', done: false, applicable: true },
        ],
    },
    {
        title: 'Post-Residency: Registro Civil',
        documents: [
            { name: 'Registro Civil appointment booked', done: false, applicable: true },
            { name: 'Birth certificate registered with Registro Civil', done: false, applicable: true },
            { name: 'Permanent cédula issued', done: false, applicable: true },
        ],
    },
];

/* ─────────── Firestore REST API helpers ─────────── */

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

/** Normalise refNumber into a safe Firestore document ID */
function toDocId(refNumber: string): string {
    return refNumber.trim().toLowerCase();
}

function deepCloneSteps(): TrackedStep[] {
    return JSON.parse(JSON.stringify(DEFAULT_STEPS));
}

/* ── Firestore REST value converters ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toFirestoreValue(val: any): any {
    if (val === null || val === undefined) return { nullValue: null };
    if (typeof val === 'string') return { stringValue: val };
    if (typeof val === 'number') return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val };
    if (typeof val === 'boolean') return { booleanValue: val };
    if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestoreValue) } };
    if (typeof val === 'object') {
        const fields: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(val)) {
            fields[k] = toFirestoreValue(v);
        }
        return { mapValue: { fields } };
    }
    return { stringValue: String(val) };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromFirestoreValue(val: any): any {
    if ('stringValue' in val) return val.stringValue;
    if ('integerValue' in val) return Number(val.integerValue);
    if ('doubleValue' in val) return val.doubleValue;
    if ('booleanValue' in val) return val.booleanValue;
    if ('nullValue' in val) return null;
    if ('arrayValue' in val) return (val.arrayValue.values || []).map(fromFirestoreValue);
    if ('mapValue' in val) {
        const obj: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(val.mapValue.fields || {})) {
            obj[k] = fromFirestoreValue(v);
        }
        return obj;
    }
    return null;
}

function clientToFields(client: TrackedClient): Record<string, unknown> {
    const fields: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(client)) {
        fields[k] = toFirestoreValue(v);
    }
    return fields;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fieldsToClient(fields: Record<string, any>): TrackedClient {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(fields)) {
        obj[k] = fromFirestoreValue(v);
    }
    return obj as unknown as TrackedClient;
}

/* ─────────── Firestore REST CRUD ─────────── */

export async function getClients(): Promise<TrackedClient[]> {
    const res = await fetch(`${BASE_URL}/clients?key=${FIREBASE_API_KEY}`);
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Failed to fetch clients: ${err}`);
    }
    const data = await res.json();
    if (!data.documents) return []; // empty collection
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.documents.map((doc: any) => fieldsToClient(doc.fields));
}

export async function getClientByRef(refNumber: string): Promise<TrackedClient | null> {
    const id = toDocId(refNumber);
    const res = await fetch(`${BASE_URL}/clients/${encodeURIComponent(id)}?key=${FIREBASE_API_KEY}`);
    if (res.status === 404) return null;
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Failed to fetch client: ${err}`);
    }
    const data = await res.json();
    return fieldsToClient(data.fields);
}

export async function createClient(refNumber: string, name: string): Promise<TrackedClient> {
    const id = toDocId(refNumber);
    const newClient: TrackedClient = {
        refNumber,
        name,
        currentStep: 0,
        statusNote: '',
        steps: deepCloneSteps(),
    };
    const res = await fetch(
        `${BASE_URL}/clients?documentId=${encodeURIComponent(id)}&key=${FIREBASE_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: clientToFields(newClient) }),
        },
    );
    if (!res.ok) {
        const err = await res.text();
        if (err.includes('ALREADY_EXISTS')) {
            throw new Error(`Client with reference "${refNumber}" already exists.`);
        }
        throw new Error(`Failed to create client: ${err}`);
    }
    return newClient;
}

export async function updateClient(updated: TrackedClient): Promise<void> {
    const id = toDocId(updated.refNumber);
    const res = await fetch(
        `${BASE_URL}/clients/${encodeURIComponent(id)}?key=${FIREBASE_API_KEY}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: clientToFields(updated) }),
        },
    );
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Failed to update client: ${err}`);
    }
}

export async function deleteClient(refNumber: string): Promise<void> {
    const id = toDocId(refNumber);
    const res = await fetch(
        `${BASE_URL}/clients/${encodeURIComponent(id)}?key=${FIREBASE_API_KEY}`,
        { method: 'DELETE' },
    );
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Failed to delete client: ${err}`);
    }
}

/* ─────────── admin password ─────────── */
export const ADMIN_PASSWORD = 'uyrelocate2025';
