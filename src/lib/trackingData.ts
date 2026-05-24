import type { TrackedClient, TrackedStep, DocStatus } from './trackingTypes';

/* ─────────── Google Sheets CSV fetcher ─────────── */

const SHEET_CSV_URL = import.meta.env.VITE_SHEET_CSV_URL as string;

/*
 * The step & document structure is fixed.
 * Each document maps to one column in the sheet (columns D onwards).
 * Column order in the sheet MUST match this list exactly.
 *
 * Sheet columns:
 *   A: ref
 *   B: name
 *   C: status_note
 *   D…: one column per document below, in order
 */

interface StepTemplate {
    title: string;
    documents: string[];
}

const STEP_TEMPLATE: StepTemplate[] = [
    {
        title: 'Document Preparation (Pre-Arrival)',
        documents: [
            'Passport (valid 6+ months)',
            'FBI background check ordered',
            'Birth certificate obtained',
            'Marriage certificate obtained',
            'Proof of income gathered',
            'Vaccine records obtained from home country',
        ],
    },
    {
        title: 'Apostilles (Pre-Arrival)',
        documents: [
            'FBI background check apostilled',
            'Birth certificate apostilled',
            'Marriage certificate apostilled',
        ],
    },
    {
        title: 'DNM Appointment Booked',
        documents: [
            'DNM account created on gub.uy',
            'Residency pathway confirmed',
            'Application fee paid',
            'Arrival date confirmed',
            'Appointment date confirmed',
        ],
    },
    {
        title: 'In-Country Parallel Tasks',
        documents: [
            'Certified translations completed',
            'Carné de salud completed',
            'Vaccine records validated / new vaccines obtained',
        ],
    },
    {
        title: 'DNM Appointment Day',
        documents: [
            'Appointment attended',
            'Application accepted / en trámite confirmed',
        ],
    },
    {
        title: 'En Trámite',
        documents: [
            'Provisional cédula obtained',
            'Remaining documents submitted',
            'Waiting for residency approval',
        ],
    },
    {
        title: 'Residency Approved',
        documents: [
            'Approval notification received',
            'DNIC cédula appointment booked',
            'Cédula appointment attended',
            'Cédula received',
        ],
    },
    {
        title: 'Post-Residency: Registro Civil',
        documents: [
            'Registro Civil appointment booked',
            'Birth certificate registered',
            'Permanent cédula issued',
        ],
    },
];

/** Total number of document columns (D onwards) */
const TOTAL_DOC_COLS = STEP_TEMPLATE.reduce((sum, s) => sum + s.documents.length, 0);

/* ─────────── CSV parsing ─────────── */

function parseCSVLine(line: string): string[] {
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
            if (ch === '"' && line[i + 1] === '"') {
                current += '"';
                i++;
            } else if (ch === '"') {
                inQuotes = false;
            } else {
                current += ch;
            }
        } else {
            if (ch === '"') {
                inQuotes = true;
            } else if (ch === ',') {
                fields.push(current.trim());
                current = '';
            } else {
                current += ch;
            }
        }
    }
    fields.push(current.trim());
    return fields;
}

function normaliseStatus(raw: string): DocStatus {
    const v = raw.toLowerCase().trim();
    if (v === 'done') return 'done';
    if (v === 'in-process' || v === 'in process') return 'in-process';
    if (v === 'n/a' || v === 'na' || v === "doesn't apply") return 'n/a';
    return 'not started';
}

async function fetchRows(): Promise<string[][]> {
    const res = await fetch(SHEET_CSV_URL);
    if (!res.ok) throw new Error('Failed to fetch tracking data.');
    const text = await res.text();
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    // skip header row
    return lines.slice(1).map(parseCSVLine);
}

/*
 * Turn a single CSV row into a TrackedClient.
 *
 * Row layout:
 *   [0] ref
 *   [1] name
 *   [2] status_note
 *   [3 … 3+TOTAL_DOC_COLS-1] document statuses
 */
function rowToClient(cols: string[]): TrackedClient | null {
    const ref = cols[0]?.trim();
    if (!ref) return null;

    const name = cols[1]?.trim() || ref;
    const statusNote = cols[2]?.trim() || '';

    let colIdx = 3; // first document column
    const steps: TrackedStep[] = STEP_TEMPLATE.map((tpl) => ({
        title: tpl.title,
        documents: tpl.documents.map((docName) => {
            const status = normaliseStatus(cols[colIdx] || '');
            colIdx++;
            return { name: docName, status };
        }),
    }));

    return { refNumber: ref, name, statusNote, steps };
}

/* ─────────── public API ─────────── */

export async function getClientByRef(refNumber: string): Promise<TrackedClient | null> {
    const rows = await fetchRows();
    const normalised = refNumber.trim().toLowerCase();
    for (const row of rows) {
        if (row[0]?.trim().toLowerCase() === normalised) {
            return rowToClient(row);
        }
    }
    return null;
}

/**
 * Returns the document column headers for setting up the sheet.
 * Useful for reference — these are the exact headers for columns D onwards.
 */
export function getDocumentHeaders(): string[] {
    return STEP_TEMPLATE.flatMap((s) => s.documents);
}

export { TOTAL_DOC_COLS };
