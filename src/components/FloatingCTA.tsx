import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { siteCopy } from '../content/siteCopy';

export function FloatingCTA() {
  const { cta } = siteCopy;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 md:inset-x-auto md:right-8 md:bottom-8 md:px-0"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)' }}
    >
      <Link
        to="/contact"
        aria-label={cta.floating}
        className={clsx(
          'btn btn-primary pointer-events-auto flex h-auto w-full max-w-md items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide shadow-xl transition-transform duration-200 ease-out md:max-w-xs md:text-base',
          'hover:-translate-y-1 focus-visible:-translate-y-1',
        )}
      >
        <span role="img" aria-hidden="true">
          🌸
        </span>
        {cta.floating}
      </Link>
    </div>
  );
}

export default FloatingCTA;
