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

/* ─────────── localStorage CRUD ─────────── */

const STORAGE_KEY = 'uy_tracking_clients';

function deepCloneSteps(): TrackedStep[] {
    return JSON.parse(JSON.stringify(DEFAULT_STEPS));
}

export function getClients(): TrackedClient[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as TrackedClient[];
    } catch {
        return [];
    }
}

export function saveClients(clients: TrackedClient[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

export function getClientByRef(refNumber: string): TrackedClient | null {
    const clients = getClients();
    return clients.find((c) => c.refNumber.toLowerCase() === refNumber.toLowerCase()) ?? null;
}

export function createClient(refNumber: string, name: string): TrackedClient {
    const clients = getClients();
    if (clients.some((c) => c.refNumber.toLowerCase() === refNumber.toLowerCase())) {
        throw new Error(`Client with reference "${refNumber}" already exists.`);
    }
    const newClient: TrackedClient = {
        refNumber,
        name,
        currentStep: 0,
        statusNote: '',
        steps: deepCloneSteps(),
    };
    clients.push(newClient);
    saveClients(clients);
    return newClient;
}

export function updateClient(updated: TrackedClient): void {
    const clients = getClients();
    const idx = clients.findIndex(
        (c) => c.refNumber.toLowerCase() === updated.refNumber.toLowerCase(),
    );
    if (idx === -1) throw new Error(`Client "${updated.refNumber}" not found.`);
    clients[idx] = updated;
    saveClients(clients);
}

export function deleteClient(refNumber: string): void {
    const clients = getClients().filter(
        (c) => c.refNumber.toLowerCase() !== refNumber.toLowerCase(),
    );
    saveClients(clients);
}

/* ─────────── admin password ─────────── */
export const ADMIN_PASSWORD = 'uyrelocate2025';
