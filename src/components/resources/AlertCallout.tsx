import type { ReactNode } from 'react';

type AlertType = 'warning' | 'tip';

type AlertCalloutProps = {
  type: AlertType;
  title: string;
  children: ReactNode;
};

const typeStyles: Record<AlertType, string> = {
  warning: 'alert-warning border border-amber-300/60 bg-amber-50/90 text-amber-900',
  tip: 'alert-info border border-sky/30 bg-sky/10 text-ink',
};

const typeLabel: Record<AlertType, string> = {
  warning: 'Warning',
  tip: 'Pro Tip',
};

export default function AlertCallout({ type, title, children }: AlertCalloutProps) {
  return (
    <div className={`alert rounded-2xl ${typeStyles[type]}`}>
      <div>
        <p className="font-display text-base text-ink">{title}</p>
        <p className="mt-1 text-sm text-ink/80">{children}</p>
      </div>
      <span className="badge badge-outline text-xs uppercase tracking-wide text-ink/70">
        {typeLabel[type]}
      </span>
    </div>
  );
}
