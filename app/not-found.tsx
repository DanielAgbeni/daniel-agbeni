import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '@/components/ui/ButtonLink';

export default function NotFoundPage() {
  return (
    <main id="main-content" className="mx-auto flex max-w-page flex-col items-start justify-center px-5 py-24 sm:px-8 md:py-36">
      <p className="font-mono text-xs text-accent">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
        The page you requested doesn’t exist or may have moved. Head back to the portfolio or view my résumé.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to portfolio
        </ButtonLink>
        <ButtonLink href="/resume" variant="secondary">
          View résumé
        </ButtonLink>
      </div>
    </main>
  );
}
