import clsx from 'clsx';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { siteCopy } from '../content/siteCopy';

const NAV_LINKS = [
  { to: '/', label: siteCopy.nav.home },
  { to: '/about', label: siteCopy.nav.about },
  { to: '/pricing', label: siteCopy.nav.pricing },
  { to: '/scouting-trips', label: siteCopy.nav.scouting },
  { to: '/resources', label: siteCopy.nav.resources },
  { to: '/blog', label: siteCopy.nav.blog },
  { to: '/contact', label: siteCopy.nav.contact },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { site } = siteCopy;

  return (
    <header className="sticky top-0 z-40 border-b border-sky/15 bg-[#ffdce3]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            src="/logo.png"
            alt="Uruguay Relocation Companion logo"
            className="h-12 w-auto rounded-full border border-blush/40 bg-base-100 object-contain p-1 shadow-sm"
          />
          <div className="hidden flex-col leading-tight text-sm text-ink md:flex">
            <span className="font-display text-lg">{site.title}</span>
            <span className="text-ink/70">{site.tagline}</span>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'transition-colors hover:text-lavender',
                  isActive ? 'text-ink' : 'text-ink/70',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            className="btn btn-sm btn-ghost md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-sky/15 bg-base-100 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  clsx(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-sky/10 text-ink' : 'text-ink/80 hover:bg-sky/10',
                  )
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteHeader;
