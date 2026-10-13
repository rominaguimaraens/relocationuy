import { Link } from 'react-router-dom';
import { siteCopy } from '../content/siteCopy';

export function Footer() {
  const { site } = siteCopy;

  return (
    <footer className="border-t border-sky/10 bg-[#ffdce3] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-sm text-ink/70 md:flex-row md:justify-between">
        <span className="font-medium text-ink/80">{site.domain}</span>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="transition hover:text-lavender">
            Privacy
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-sky transition hover:text-lavender"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
