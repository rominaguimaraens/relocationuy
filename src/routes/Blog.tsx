import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import {
  BLOG_CATEGORIES,
  categoryLabelToSlug,
  getCategorizedPosts,
} from '../lib/blogCategories';

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

  return (
    <>
      <Helmet>
        <title>Blog | Uruguay Relocation Companion</title>
        <meta
          name="description"
          content="Articles and guides about moving to and living in Uruguay — written by locals who guide you through the real process."
        />
      </Helmet>

      <Section className="bg-beige-gradient pt-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl">Blog</h1>
          <p className="mt-4 text-lg text-ink/80">
            Deep dives, honest guides, and practical advice about moving to Uruguay — from people who actually live here.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  activeCategory === category
                    ? 'bg-sky text-white shadow-md shadow-sky/30'
                    : 'bg-base-100/80 text-ink/70 border border-sky/10 hover:bg-base-100',
                ].join(' ')}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <article
              key={post.slug}
              className="card flex h-full flex-col rounded-3xl border border-blush/30 bg-base-100 p-8 shadow-xl shadow-sky/10 transition duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky/20"
            >
              <div className="flex items-start justify-between gap-3">
                <Link
                  to={`/blog/categories/${categoryLabelToSlug(post.category)}`}
                  className="badge rounded-full border-none bg-sky/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-sky"
                >
                  {post.category}
                </Link>
                <span className="text-xs uppercase tracking-wide text-ink/50">
                  {post.date} · {post.readingTime}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-display leading-snug text-ink">{post.title}</h2>

              <p className="mt-3 text-sm leading-relaxed text-ink/70">{post.summary}</p>

              <div className="mt-6 flex items-center justify-between border-t border-blush/30 pt-3">
                <span className="text-xs text-ink/60">Full article</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="btn btn-soft btn-primary btn-sm rounded-full px-5"
                >
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
