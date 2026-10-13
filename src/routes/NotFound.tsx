import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/Section';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | Uruguay Relocation Companion</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Section className="bg-hero-muted pt-24 md:pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl">We couldn&apos;t find that page</h1>
          <p className="mt-4 text-lg text-ink/80">
            The link may be old or mistyped. These pages should help.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn btn-primary btn-soft btn-lg">
              Go to the homepage
            </Link>
            <Link to="/pricing" className="btn btn-soft btn-outline btn-lg">
              See packages and prices
            </Link>
            <Link to="/contact" className="btn btn-soft btn-outline btn-lg">
              Contact us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
