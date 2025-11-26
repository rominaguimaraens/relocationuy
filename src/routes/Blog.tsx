import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import { getAllPosts } from '../lib/blog';
import { sanitizeText } from '../utils/sanitize';

export default function Blog() {
  const posts = getAllPosts();

  return (
    <>
      <Helmet>
        <title>Blog | Uruguay Relocation Companion</title>
        <meta
          name="description"
          content="Guides, tips, and on-the-ground insights for moving to Uruguay."
        />
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl">Blog</h1>
          <p className="mt-3 text-ink/80">
            Clear, human, and practical insights for your move to Uruguay.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-10 text-center text-ink/70">No posts published yet. Check back soon.</p>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="card bg-base-100 border border-sky/10 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                {post.cover && (
                  <figure className="overflow-hidden">
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="max-h-48 w-full object-cover"
                    />
                  </figure>
                )}
                <div className="card-body">
                  <h2 className="text-2xl font-display">{post.title}</h2>
                  <p className="text-sm text-ink/60">
                    {format(new Date(post.date), 'MMM d, yyyy')} &middot; {post.author}
                  </p>
                  {post.excerpt && <p className="mt-3 text-ink/80">{sanitizeText(post.excerpt)}</p>}
                  <div className="card-actions mt-4">
                    <Link to={`/blog/${post.slug}`} className="btn btn-soft btn-primary">
                      Read
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
