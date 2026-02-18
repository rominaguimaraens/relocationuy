import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
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

/* ─────────── Firestore helpers ─────────── */

const CLIENTS_COLLECTION = 'clients';

/** Normalise refNumber into a safe Firestore document ID */
function toDocId(refNumber: string): string {
    return refNumber.trim().toLowerCase();
}

function deepCloneSteps(): TrackedStep[] {
    return JSON.parse(JSON.stringify(DEFAULT_STEPS));
}

/* ─────────── Firestore CRUD ─────────── */

export async function getClients(): Promise<TrackedClient[]> {
    const snap = await getDocs(collection(db, CLIENTS_COLLECTION));
    return snap.docs.map((d) => d.data() as TrackedClient);
}

export async function getClientByRef(refNumber: string): Promise<TrackedClient | null> {
    const docRef = doc(db, CLIENTS_COLLECTION, toDocId(refNumber));
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return snap.data() as TrackedClient;
}

export async function createClient(refNumber: string, name: string): Promise<TrackedClient> {
    const id = toDocId(refNumber);
    const existing = await getDoc(doc(db, CLIENTS_COLLECTION, id));
    if (existing.exists()) {
        throw new Error(`Client with reference "${refNumber}" already exists.`);
    }
    const newClient: TrackedClient = {
        refNumber,
        name,
        currentStep: 0,
        statusNote: '',
        steps: deepCloneSteps(),
    };
    await setDoc(doc(db, CLIENTS_COLLECTION, id), newClient);
    return newClient;
}

export async function updateClient(updated: TrackedClient): Promise<void> {
    const id = toDocId(updated.refNumber);
    await updateDoc(doc(db, CLIENTS_COLLECTION, id), { ...updated });
}

export async function deleteClient(refNumber: string): Promise<void> {
    const id = toDocId(refNumber);
    await deleteDoc(doc(db, CLIENTS_COLLECTION, id));
}

/* ─────────── admin password ─────────── */
export const ADMIN_PASSWORD = 'uyrelocate2025';

/* ─────────── one-time localStorage → Firestore migration ─────────── */

const LEGACY_KEY = 'uy_tracking_clients';
const MIGRATED_KEY = 'uy_tracking_migrated';

/**
 * Call once on app boot. If old localStorage data exists and hasn't been
 * migrated yet, push every client into Firestore, then mark as done.
 */
export async function migrateFromLocalStorage(): Promise<number> {
    if (localStorage.getItem(MIGRATED_KEY)) return 0;

    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) {
        localStorage.setItem(MIGRATED_KEY, '1');
        return 0;
    }

    let clients: TrackedClient[];
    try {
        clients = JSON.parse(raw) as TrackedClient[];
    } catch {
        localStorage.setItem(MIGRATED_KEY, '1');
        return 0;
    }

    let migrated = 0;
    for (const c of clients) {
        const id = toDocId(c.refNumber);
        const existing = await getDoc(doc(db, CLIENTS_COLLECTION, id));
        if (!existing.exists()) {
            await setDoc(doc(db, CLIENTS_COLLECTION, id), c);
            migrated++;
        }
    }

    localStorage.setItem(MIGRATED_KEY, '1');
    return migrated;
}
