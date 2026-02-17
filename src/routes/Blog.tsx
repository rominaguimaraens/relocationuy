import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import {
  BLOG_CATEGORIES,
  categoryLabelToSlug,
  getCategorizedPosts,
} from '../lib/blogCategories';
import type { CategorizedPost } from '../lib/blogCategories';

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

/* ───────── featured hero card ───────── */
function FeaturedPost({ post }: { post: CategorizedPost }) {
  const cover = coverFor(post.slug);
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-blush/20 bg-base-100 shadow-2xl shadow-sky/10 transition duration-300 hover:shadow-2xl hover:shadow-sky/20">
      <Link to={`/blog/${post.slug}`} className="block md:flex">
        {/* Cover image */}
        <div className="relative h-64 w-full shrink-0 overflow-hidden md:h-auto md:w-1/2">
          {cover ? (
            <img
              src={cover}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blush/40 via-sky/20 to-lavender/30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-sky/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-sky">
              {post.category}
            </span>
            <span className="rounded-full bg-lavender/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-lavender">
              Featured
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-display leading-snug text-ink md:text-3xl lg:text-4xl">
            {post.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/70 md:text-base">
            {post.summary}
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs text-ink/50">
            <span className="font-medium text-ink/70">{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5734a0] to-[#7a55d8] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-lavender/20 transition group-hover:shadow-xl group-hover:shadow-lavender/30">
              Read article
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ───────── post card ───────── */
function PostCard({ post }: { post: CategorizedPost }) {
  const cover = coverFor(post.slug);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-blush/20 bg-base-100 shadow-xl shadow-sky/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky/15">
      {/* Cover */}
      <Link to={`/blog/${post.slug}`} className="relative block h-48 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blush/40 via-sky/20 to-lavender/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <Link
          to={`/blog/categories/${categoryLabelToSlug(post.category)}`}
          className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky shadow-sm backdrop-blur-sm"
        >
          {post.category}
        </Link>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-ink/50">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h2 className="mt-3 text-xl font-display leading-snug text-ink transition-colors group-hover:text-lavender">
            {post.title}
          </h2>
        </Link>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">
          {post.summary}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-blush/15 pt-4">
          <span className="text-xs font-medium text-ink/60">
            {post.author}
          </span>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky transition-colors hover:text-lavender"
          >
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ───────── main Blog page ───────── */
interface BlogProps {
  initialCategory?: string;
}

export default function Blog({ initialCategory = 'All' }: BlogProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const posts = useMemo(() => getCategorizedPosts(), []);

  const visiblePosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const [featured, ...rest] = visiblePosts;

  return (
    <>
      <Helmet>
        <title>Blog | Uruguay Relocation Companion</title>
        <meta
          name="description"
          content="Articles and guides about moving to and living in Uruguay — written by locals who guide you through the real process."
        />
        {/* Open Graph */}
        <meta property="og:type" content="blog" />
        <meta property="og:title" content="Blog — Uruguay Relocation Companion" />
        <meta
          property="og:description"
          content="Deep dives, honest guides, and practical advice about moving to Uruguay — from people who actually live here."
        />
        <meta property="og:url" content="https://relocationuy.com/blog" />
        <meta property="og:site_name" content="Uruguay Relocation Companion" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Blog — Uruguay Relocation Companion" />
        <meta
          name="twitter:description"
          content="Deep dives, honest guides, and practical advice about moving to Uruguay."
        />
        <link rel="canonical" href="https://relocationuy.com/blog" />
      </Helmet>

      <Section className="bg-beige-gradient pt-24 md:pt-28">
        {/* ── Header ── */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky">
            Our Blog
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl">
            Guides & Insights
          </h1>
          <p className="mt-4 text-lg text-ink/70">
            Deep dives, honest guides, and practical advice about moving to
            Uruguay — from people who actually live here.
          </p>

          {/* Category pills */}
          <nav aria-label="Blog categories" className="mt-8 flex flex-wrap justify-center gap-3">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  'rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200',
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#5734a0] to-[#7a55d8] text-white shadow-md shadow-lavender/25'
                    : 'bg-base-100/80 text-ink/70 border border-sky/10 hover:bg-base-100 hover:border-sky/20 hover:text-ink',
                ].join(' ')}
              >
                {category}
              </button>
            ))}
          </nav>
        </header>

        {/* ── Featured post ── */}
        {featured && (
          <div className="mx-auto mt-14 max-w-6xl">
            <FeaturedPost post={featured} />
          </div>
        )}

        {/* ── Post grid ── */}
        {rest.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-2">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {visiblePosts.length === 0 && (
          <div className="mx-auto mt-16 max-w-md text-center">
            <p className="text-lg text-ink/60">
              No articles in this category yet. Check back soon!
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
