import clsx from 'clsx';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../i18n';

const NAV_LINKS = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/pricing', key: 'pricing' },
  { to: '/resources', key: 'resources' },
  { to: '/contact', key: 'contact' },
] as const;

export function SiteHeader() {
  const { t, toggleLanguage } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleLanguage = () => {
    toggleLanguage();
    setMenuOpen(false);
  };

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
            <span className="font-display text-lg">{t.site.title}</span>
            <span className="text-ink/70">{t.site.tagline}</span>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map(({ to, key }) => (
            <NavLink
              key={key}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'transition-colors hover:text-lavender',
                  isActive ? 'text-ink' : 'text-ink/70',
                )
              }
            >
              {t.nav[key]}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="btn btn-primary btn-soft btn-sm hidden uppercase tracking-wide md:inline-flex"
            aria-label={t.languageToggle.ariaLabel}
          >
            {t.languageToggle.next}
          </button>
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
            {NAV_LINKS.map(({ to, key }) => (
              <NavLink
                key={key}
                to={to}
                className={({ isActive }) =>
                  clsx(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-sky/10 text-ink' : 'text-ink/80 hover:bg-sky/10',
                  )
                }
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[key]}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleToggleLanguage}
              className="btn btn-primary btn-soft w-full justify-center uppercase tracking-wide"
              aria-label={t.languageToggle.ariaLabel}
            >
              {t.languageToggle.next}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteHeader;
