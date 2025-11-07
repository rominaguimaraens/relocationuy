import type { ReactNode } from 'react';
import clsx from 'clsx';

interface PackageCardProps {
  name: string;
  price: string;
  summary: string;
  features: string[];
  supportLength: string;
  footer?: ReactNode;
  highlighted?: boolean;
}

export function PackageCard({
  name,
  price,
  summary,
  features,
  supportLength,
  footer,
  highlighted,
}: PackageCardProps) {
  return (
    <div
      className={clsx(
        'card card-soft h-full border border-sky/10 bg-base-100/95',
        highlighted && 'border-lavender/60 shadow-2xl shadow-lavender/10',
      )}
    >
      <div className="card-body gap-6 p-8">
        <div>
          <span className="badge badge-lg mb-3 rounded-full border-none bg-sky/20 text-sky">
            {price}
          </span>
          <h3 className="text-2xl font-display text-ink">{name}</h3>
          <p className="mt-3 text-ink/80">{summary}</p>
        </div>

        <ul className="space-y-2 text-sm text-ink/80">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span role="img" aria-hidden="true">
                &#x2728;
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-xl bg-sage/20 px-4 py-3 text-sm font-semibold text-ink">
          {supportLength}
        </div>

        {footer && <div className="pt-4 text-sm text-ink/70">{footer}</div>}
      </div>
    </div>
  );
}

export default PackageCard;
