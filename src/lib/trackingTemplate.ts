import type { TrackedClient, TrackedStep, DocStatus } from './trackingTypes';

/*
 * Shared, browser-free logic for the client progress page.
 * It runs inside the Netlify function (netlify/functions/tracking.ts), NOT in the browser,
 * so the sheet and the people in it never reach a visitor's device.
 */

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
export const TOTAL_DOC_COLS = STEP_TEMPLATE.reduce((sum, s) => sum + s.documents.length, 0);

/** The exact headers for columns D onwards, for setting up the sheet. */
export function getDocumentHeaders(): string[] {
    return STEP_TEMPLATE.flatMap((s) => s.documents);
}

/* ─────────── CSV parsing ─────────── */

/** Parses a whole CSV file. Handles quoted fields, commas and new lines inside quotes, and \r\n. */
export function parseCsv(text: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (inQuotes) {
            if (ch === '"' && text[i + 1] === '"') {
                field += '"';
                i++;
            } else if (ch === '"') {
                inQuotes = false;
            } else {
                field += ch;
            }
        } else if (ch === '"') {
            inQuotes = true;
        } else if (ch === ',') {
            row.push(field.trim());
            field = '';
        } else if (ch === '\n' || ch === '\r') {
            if (ch === '\r' && text[i + 1] === '\n') i++;
            row.push(field.trim());
            rows.push(row);
            row = [];
            field = '';
        } else {
            field += ch;
        }
    }
    row.push(field.trim());
    rows.push(row);

    // drop blank rows and the header row
    return rows.filter((r) => r.some((c) => c !== '')).slice(1);
}

function normaliseStatus(raw: string): DocStatus {
    const v = raw.toLowerCase().trim();
    if (v === 'done') return 'done';
    if (v === 'in-process' || v === 'in process') return 'in-process';
    if (v === 'n/a' || v === 'na' || v === "doesn't apply") return 'n/a';
    return 'not started';
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

/** Finds one client by reference code. Returns only that client, never the other rows. */
export function findClient(csvText: string, refNumber: string): TrackedClient | null {
    const wanted = refNumber.trim().toLowerCase();
    if (!wanted) return null;
    let found: string[] | null = null;
    for (const row of parseCsv(csvText)) {
        if (row[0]?.trim().toLowerCase() === wanted) found = row;
    }
    return found ? rowToClient(found) : null;
}

/*
 * Turns the link saved in Netlify into the address the function reads.
 * A normal sheet link (the one in the browser's address bar, shared as "Anyone with the link
 * can view") becomes Google's live CSV address, which shows edits within seconds. A "Publish
 * to web" link, or a live CSV address, is used exactly as given.
 */
export function sheetCsvUrl(link: string): string {
    if (link.includes('/spreadsheets/d/e/') || link.includes('/gviz/')) return link;
    const id = link.match(/\/spreadsheets\/d\/([A-Za-z0-9_-]+)/)?.[1];
    if (!id) return link;
    const gid = link.match(/[#?&]gid=(\d+)/)?.[1];
    return (
        `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&headers=1` +
        (gid ? `&gid=${gid}` : '')
    );
}
