/* ── Tracking system types ── */

export type DocStatus = 'not started' | 'in-process' | 'done' | 'n/a';

export interface TrackedDocument {
    name: string;
    status: DocStatus;
}

export interface TrackedStep {
    title: string;
    documents: TrackedDocument[];
}

export interface TrackedClient {
    refNumber: string;
    name: string;
    statusNote: string;
    steps: TrackedStep[];
}
