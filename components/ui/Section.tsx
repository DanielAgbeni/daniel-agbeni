import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Page section with a stacked heading + optional lead (no split headers, no eyebrows). */
export function Section({ id, title, lead, children, className = '' }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`border-t border-line py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <header className="reveal mb-12 max-w-2xl">
          <h2 id={headingId} className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            {title}
          </h2>
          {lead ? <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{lead}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
