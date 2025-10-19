type AnchorNavItem = {
  href: string;
  label: string;
};

type AnchorNavProps = {
  items: AnchorNavItem[];
};

export default function AnchorNav({ items }: AnchorNavProps) {
  return (
    <nav
      aria-label="Move to Uruguay guide navigation"
      className="sticky top-24 z-30 border-b border-sky/10 bg-base-100/80 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 px-4 py-3 md:justify-center">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="btn btn-sm btn-ghost rounded-full border border-transparent text-sm text-ink/70 hover:border-sky/30 hover:bg-sky/10 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
