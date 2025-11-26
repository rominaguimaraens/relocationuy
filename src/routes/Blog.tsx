import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/Section';

const blogPosts = [
  {
    id: 1,
    slug: 'is-uruguay-right-for-me',
    title: 'Is Uruguay Right for Me?',
    date: '2025-01-01',
    readingTime: '6 min read',
    category: 'Planning your move',
    summary:
      'A grounded look at who tends to thrive in Uruguay, who struggles, and what to consider before starting the residency process.',
  },
  {
    id: 2,
    slug: 'cost-of-living-uruguay',
    title: 'What Moving to Uruguay Really Costs (Beyond the Visa Fees)',
    date: '2025-01-10',
    readingTime: '8 min read',
    category: 'Cost of living & money',
    summary:
      'From rentals and utilities to health plans and everyday groceries — a realistic breakdown of monthly life costs.',
  },
  {
    id: 3,
    slug: 'residency-uruguay-guide',
    title: 'Residency in Uruguay: What the Official Sites Don’t Tell You',
    date: '2025-01-20',
    readingTime: '7 min read',
    category: 'Residency & paperwork',
    summary:
      'We walk through the residency process step by step, highlighting the quiet details that make things smoother (or more stressful) in real life.',
  },
];

const categories = ['All', 'Planning your move', 'Cost of living & money', 'Residency & paperwork'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const visiblePosts =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Blog | Uruguay Relocation Companion</title>
        <meta
          name="description"
          content="Articles and guides about moving to and living in Uruguay — written by locals who guide you through the real process."
        />
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl">Blog</h1>
          <p className="mt-4 text-lg text-ink/80">
            Deep dives, honest guides, and practical advice about moving to Uruguay — from people who actually live here.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
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

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              className="card h-full rounded-3xl border border-sky/10 bg-base-100/95 shadow-xl shadow-sky/10 transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="card-body flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="badge rounded-full border-none bg-sage/20 px-3 py-1 text-xs font-semibold text-sage">
                    {post.category}
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-ink/50">
                    {post.date} · {post.readingTime}
                  </span>
                </div>

                <h2 className="text-2xl font-display text-ink leading-snug">{post.title}</h2>

                <p className="text-sm leading-relaxed text-ink/80">{post.summary}</p>

                <div className="mt-4 flex items-center justify-between border-t border-blush/30 pt-2">
                  <span className="text-xs text-ink/60">Full article</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="btn btn-soft btn-primary btn-sm rounded-full px-5"
                  >
                    Read article
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
