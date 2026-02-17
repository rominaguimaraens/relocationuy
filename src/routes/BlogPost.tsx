import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Section from '../components/Section';
import {
  categoryLabelToSlug,
  getCategorizedPost,
  getCategorizedPosts,
} from '../lib/blogCategories';

/* ───────── cover image map ───────── */
const COVER_IMAGES: Record<string, string> = {
  'is-uruguay-right-for-me': '/blog-cover-is-uruguay-right-for-me.png',
  'cost-of-living-uruguay': '/blog-cover-cost-of-living-uruguay.png',
  'residency-uruguay-guide': '/blog-cover-residency-uruguay-guide.png',
};

function coverFor(slug: string) {
  return COVER_IMAGES[slug] ?? '';
}

/* ───────── format date ───────── */
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ───────── extract headings for TOC ───────── */
interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+\**(.+?)\**\s*$/gm;
  const items: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    items.push({ id, text, level: match[1].length });
  }
  return items;
}

/* ───────── TOC sidebar component ───────── */
function TableOfContents({ items }: { items: TocItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="mb-6 flex w-full items-center justify-between rounded-2xl border border-blush/20 bg-base-100/80 px-5 py-3.5 text-sm font-semibold text-ink/80 shadow-md backdrop-blur-sm"
        >
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Table of Contents
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <nav className="mb-8 rounded-2xl border border-blush/20 bg-base-100/80 p-5 shadow-md backdrop-blur-sm">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-sky/10 hover:text-sky ${item.level === 3 ? 'ml-4 text-ink/55' : 'font-medium text-ink/75'
                      }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-28 hidden h-fit max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
        <div className="rounded-2xl border border-blush/20 bg-base-100/80 p-6 shadow-lg backdrop-blur-sm">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            In this article
          </h3>
          <nav>
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block rounded-lg px-3 py-1.5 text-sm leading-snug transition-colors hover:bg-sky/10 hover:text-sky ${item.level === 3 ? 'ml-3 text-ink/50' : 'font-medium text-ink/70'
                      }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

/* ───────── related posts ───────── */
function RelatedPosts({
  currentSlug,
}: {
  currentSlug: string;
  category?: string;
}) {
  const related = useMemo(
    () =>
      getCategorizedPosts()
        .filter((p) => p.slug !== currentSlug)
        .slice(0, 2),
    [currentSlug],
  );

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h3 className="mb-8 text-center text-2xl font-display text-ink">
        Keep Reading
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-blush/20 bg-base-100 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky/15"
          >
            {/* Cover */}
            <div className="relative h-36 overflow-hidden">
              {coverFor(post.slug) ? (
                <img
                  src={coverFor(post.slug)}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-blush/40 via-sky/20 to-lavender/30" />
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-sky">
                {post.category}
              </span>
              <h4 className="mt-1 text-lg font-display leading-snug text-ink transition-colors group-hover:text-lavender">
                {post.title}
              </h4>
              <p className="mt-1.5 text-xs text-ink/50">
                {post.readingTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ───────── heading renderer with IDs for TOC ───────── */
function headingWithId(
  level: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
) {
  const text =
    typeof props.children === 'string'
      ? props.children
      : Array.isArray(props.children)
        ? props.children
          .map((c: unknown) => (typeof c === 'string' ? c : ''))
          .join('')
        : '';
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <Tag id={id} className="scroll-mt-24" {...props}>
      {props.children}
    </Tag>
  );
}

/* ───────── BlogPost page ───────── */
export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getCategorizedPost(slug) : null;

  const tocItems = useMemo(
    () => (post ? extractToc(post.content) : []),
    [post],
  );

  if (!post) {
    return (
      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="text-center">
          <h1 className="text-3xl font-display">Post not found</h1>
          <Link to="/blog" className="btn btn-soft mt-6">
            Back to blog
          </Link>
        </div>
      </Section>
    );
  }

  const cover = coverFor(post.slug);

  /* JSON-LD structured data */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Uruguay Relocation Companion',
      url: 'https://relocationuy.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://relocationuy.com/blog/${post.slug}`,
    },
    ...(cover ? { image: `https://relocationuy.com${cover}` } : {}),
    wordCount: post.content.split(/\s+/).length,
    articleSection: post.category,
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Uruguay Relocation Companion</title>
        <meta name="description" content={post.summary || post.title} />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta
          property="og:url"
          content={`https://relocationuy.com/blog/${post.slug}`}
        />
        <meta property="og:site_name" content="Uruguay Relocation Companion" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        {cover && (
          <meta
            property="og:image"
            content={`https://relocationuy.com${cover}`}
          />
        )}
        {/* Twitter */}
        <meta
          name="twitter:card"
          content={cover ? 'summary_large_image' : 'summary'}
        />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary} />
        {cover && (
          <meta
            name="twitter:image"
            content={`https://relocationuy.com${cover}`}
          />
        )}
        {/* Canonical */}
        <link
          rel="canonical"
          href={`https://relocationuy.com/blog/${post.slug}`}
        />
        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── Hero header ── */}
      <div className="relative overflow-hidden bg-beige-gradient pt-24 pb-12 md:pt-28 md:pb-16">
        {/* Decorative gradient blobs */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky/10 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-lavender/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs text-ink/50">
            <Link to="/" className="transition-colors hover:text-sky">
              Home
            </Link>
            <span>/</span>
            <Link to="/blog" className="transition-colors hover:text-sky">
              Blog
            </Link>
            <span>/</span>
            <Link
              to={`/blog/categories/${categoryLabelToSlug(post.category)}`}
              className="transition-colors hover:text-sky"
            >
              {post.category}
            </Link>
          </nav>

          <Link
            to={`/blog/categories/${categoryLabelToSlug(post.category)}`}
            className="inline-block rounded-full bg-sky/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-sky transition-colors hover:bg-sky/20"
          >
            {post.category}
          </Link>

          <h1 className="mt-5 text-3xl font-display leading-tight text-ink sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-ink/65 md:text-lg">
            {post.summary}
          </p>

          {/* Author & meta */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink/55">
            <span className="font-semibold text-ink/75">{post.author}</span>
            <span className="hidden sm:inline">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="hidden sm:inline">·</span>
            <span>{post.readingTime}</span>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-lavender/20 bg-lavender/5 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-lavender/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>



      {/* ── Article body with TOC ── */}
      <Section className="bg-hero-muted pt-10 md:pt-14">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
          {/* Main content */}
          <div>
            {/* Mobile TOC */}
            <div className="lg:hidden">
              <TableOfContents items={tocItems} />
            </div>

            <article className="rounded-3xl border border-sky/10 bg-base-100 p-6 shadow-xl sm:p-8 md:p-10">
              <div className="prose prose-ink prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-sky prose-a:no-underline hover:prose-a:text-lavender prose-strong:text-ink prose-blockquote:border-sky/30 prose-blockquote:text-ink/70">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: (props) => headingWithId(2, props),
                    h3: (props) => headingWithId(3, props),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>

            {/* Post footer with tags & navigation */}
            <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-blush/25 bg-base-100/90 px-6 py-2.5 text-sm font-semibold text-ink/70 shadow-md transition hover:border-sky/30 hover:text-sky"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                All articles
              </Link>
              <Link
                to={`/blog/categories/${categoryLabelToSlug(post.category)}`}
                className="inline-flex items-center gap-2 rounded-full border border-blush/25 bg-base-100/90 px-6 py-2.5 text-sm font-semibold text-ink/70 shadow-md transition hover:border-sky/30 hover:text-sky"
              >
                More in {post.category}
              </Link>
            </div>

            {/* Related posts */}
            <RelatedPosts
              currentSlug={post.slug}
              category={post.category}
            />
          </div>

          {/* Desktop TOC sidebar */}
          <div className="hidden lg:block">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </Section>
    </>
  );
}
