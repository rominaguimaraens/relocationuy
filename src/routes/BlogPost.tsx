import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Section from '../components/Section';
import { getPostBySlug } from '../lib/blog';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');

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
        <meta name="description" content={post.excerpt || post.title} />
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <article className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl">{post.title}</h1>
            <p className="mt-3 text-ink/60">
              {format(new Date(post.date), 'MMM d, yyyy')} &middot; {post.author}
            </p>
          </header>

          <div className="card bg-base-100 border border-sky/10 shadow-xl mt-10">
            {post.cover && (
              <img src={post.cover} alt="" className="max-h-96 w-full rounded-t-2xl object-cover" />
            )}
            <div className="card-body prose prose-ink max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
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
