import { useEffect, useMemo, useState } from 'react';
import type { ChecklistItem } from '../../content/resourcesData';

type ChecklistProps = {
  title: string;
  items: ChecklistItem[];
  storageKey: string;
};

type ChecklistState = Record<string, boolean>;

const readFromStorage = (storageKey: string, items: ChecklistItem[]): ChecklistState => {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ChecklistState;
    // Ensure only known keys persist
    const allowedIds = new Set(items.map((item) => item.id));
    return Object.fromEntries(
      Object.entries(parsed).filter(([key]) => allowedIds.has(key)),
    );
  } catch {
    return {};
  }
};

export default function Checklist({ title, items, storageKey }: ChecklistProps) {
  const [state, setState] = useState<ChecklistState>(() => readFromStorage(storageKey, items));

  const isComplete = useMemo(() => items.every((item) => state[item.id]), [items, state]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (Object.keys(state).length === 0) {
      window.localStorage.removeItem(storageKey);
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const toggle = (id: string) => {
    setState((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!next[id]) {
        delete next[id];
      }
      return next;
    });
  };

  const reset = () => {
    setState({});
  };

  return (
    <div className="card card-soft border border-sky/15 bg-base-100/95 shadow-lg shadow-sky/10">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-ink">{title}</h3>
          {isComplete && (
            <span className="badge badge-success badge-outline text-xs uppercase tracking-wide">
              Complete
            </span>
          )}
        </div>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <input
                id={`${storageKey}-${item.id}`}
                type="checkbox"
                checked={!!state[item.id]}
                onChange={() => toggle(item.id)}
                className="checkbox checkbox-sm mt-0.5 border-sky/40 text-sky focus:ring-2 focus:ring-sky/40"
              />
              <label
                htmlFor={`${storageKey}-${item.id}`}
                className="cursor-pointer text-sm text-ink/80"
              >
                {item.label}
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={reset}
            className="btn btn-ghost btn-sm text-sky hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
          >
            Reset list
          </button>
        </div>
      </div>
    </div>
  );
}
