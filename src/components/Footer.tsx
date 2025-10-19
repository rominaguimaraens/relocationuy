import { useI18n } from '../i18n';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-sky/10 bg-[#ffdce3] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-sm text-ink/70 md:flex-row md:justify-between">
        <span className="font-medium text-ink/80">{t.site.domain}</span>
        <a
          href={`mailto:${t.site.email}`}
          className="font-medium text-sky transition hover:text-lavender"
        >
          {t.site.email}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
