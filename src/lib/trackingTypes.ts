/* ── Tracking system types ── */

export interface TrackedDocument {
    name: string;
    done: boolean;
    /** If false the document row is hidden (e.g. marriage cert when client is single) */
    applicable: boolean;
}

export interface TrackedStep {
    title: string;
    note?: string; // per-step note only shown on the step UI
    documents: TrackedDocument[];
    /** If true, the step's documents are parallel tasks (no strict order) */
    parallel?: boolean;
}

export interface TrackedClient {
    refNumber: string;
    name: string;
    /** 0-based index into steps[] */
    currentStep: number;
    /** Free-text note admins set — shown to the client on the current step */
    statusNote: string;
    steps: TrackedStep[];
}
