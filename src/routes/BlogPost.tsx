import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Section from '../components/Section';
import { categoryLabelToSlug, getCategorizedPost } from '../lib/blogCategories';

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getCategorizedPost(slug) : null;

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

  return (
    <>
      <Helmet>
        <title>{post.title} | Uruguay Relocation Companion</title>
        <meta name="description" content={post.summary || post.title} />
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <article className="mx-auto max-w-3xl">
          <header className="text-center">
            <Link
              to={`/blog/categories/${categoryLabelToSlug(post.category)}`}
              className="badge rounded-full border-none bg-sky/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-sky"
            >
              {post.category}
            </Link>
            <h1 className="mt-4 text-4xl md:text-5xl">{post.title}</h1>
            <p className="mt-3 text-xs uppercase tracking-wide text-ink/60">
              {post.date} · {post.readingTime}
            </p>
          </header>

          <div className="card mt-10 border border-sky/10 bg-base-100 shadow-xl">
            <div className="card-body prose prose-ink max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/blog" className="btn btn-soft">
              ← Back to blog
            </Link>
          </div>
        </article>
      </Section>
    </>
  );
}
