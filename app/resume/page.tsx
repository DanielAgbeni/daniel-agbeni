import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PrintButton } from '@/components/resume/PrintButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { projects, projectUrlLabel } from '@/lib/projects';
import { certifications, education, experience, skillGroups } from '@/lib/resume';
import { github, linkedin, mailtoHref, site } from '@/lib/site';
import { resumeGraph } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Résumé / CV',
  description:
    'Curriculum Vitae of Daniel Agbeni Oluwafemi — Full-Stack Software Developer experienced in TypeScript, Next.js, React Native, Node.js, PostgreSQL, MongoDB, Redis and PyTorch Geometric.',
  alternates: {
    canonical: '/resume',
  },
};

export default function ResumePage() {
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-5 py-12 sm:px-8 md:py-16">
      <JsonLd data={resumeGraph()} />

      <div className="print-hidden mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to portfolio
        </Link>
        <PrintButton />
      </div>

      <article className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-10 print:rounded-none print:border-0 print:p-0 print:shadow-none">
        {/* Header */}
        <header className="border-b border-line pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl" translate="no">
            {site.fullName}
          </h1>
          <p className="mt-1 text-lg font-medium text-accent">{site.role}</p>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
            <li>
              <a href={`tel:${site.phoneE164}`} className="hover:text-fg">
                {site.phoneDisplay}
              </a>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <a href={mailtoHref} className="hover:text-fg">
                {site.email}
              </a>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              {site.location} ({site.availability})
            </li>
          </ul>

          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-xs text-muted">
            <li>
              <a href={github.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-fg">
                github.com/DanielAgbeni
              </a>
            </li>
            <li>
              <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-fg">
                linkedin.com/in/danielagbeni
              </a>
            </li>
            <li>
              <a href={site.url} className="underline decoration-line underline-offset-4 hover:text-fg">
                danielagbeni.algiz.tech
              </a>
            </li>
          </ul>
        </header>

        {/* Technical Skills */}
        <section aria-labelledby="cv-skills" className="mt-6 border-b border-line pb-6">
          <h2 id="cv-skills" className="text-xs font-bold uppercase tracking-wider text-fg">
            Technical Skills
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            {skillGroups.map((group) => (
              <div key={group.title} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-4">
                <dt className="font-semibold text-fg">{group.title}:</dt>
                <dd className="text-muted">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Work Experience */}
        <section aria-labelledby="cv-experience" className="mt-6 border-b border-line pb-6">
          <h2 id="cv-experience" className="text-xs font-bold uppercase tracking-wider text-fg">
            Work Experience
          </h2>
          <div className="mt-4 space-y-5">
            {experience.map((job) => (
              <div key={`${job.company}-${job.start}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-fg">
                    {job.role}
                    <span className="font-normal text-muted">
                      {' '}
                      | {job.location ? job.location : job.company}
                    </span>
                  </h3>
                  <span className="font-mono text-xs text-subtle [font-variant-numeric:tabular-nums]">{job.period}</span>
                </div>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Key Projects */}
        <section aria-labelledby="cv-projects" className="mt-6 border-b border-line pb-6">
          <h2 id="cv-projects" className="text-xs font-bold uppercase tracking-wider text-fg">
            Key Projects
          </h2>
          <div className="mt-4 space-y-5">
            {projects.map((project) => {
              const externalUrl = project.liveUrl ?? project.repoUrl;
              return (
                <div key={project.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-fg">
                      <Link href={`/projects/${project.slug}`} className="hover:underline">
                        {project.name} — {project.tagline}
                      </Link>
                    </h3>
                    {externalUrl ? (
                      <a
                        href={externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-accent underline decoration-line underline-offset-4"
                      >
                        {projectUrlLabel(externalUrl)}
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-subtle">
                    <span className="font-semibold text-muted">Tech stack:</span> {project.stack.join(', ')}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Education & Certifications */}
        <section aria-labelledby="cv-education" className="mt-6">
          <h2 id="cv-education" className="text-xs font-bold uppercase tracking-wider text-fg">
            Education &amp; Certifications
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm">
            {education.map((item) => (
              <li key={item.title} className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="font-semibold text-fg">{item.title}</span>
                  <span className="text-muted"> | {item.institution}</span>
                </div>
                <span className="font-mono text-xs text-subtle">{item.period}</span>
              </li>
            ))}
            {certifications.map((item) => (
              <li key={item.title} className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="font-semibold text-fg">{item.title}</span>
                  <span className="text-muted"> | {item.institution}</span>
                </div>
                <span className="font-mono text-xs text-subtle">{item.detail ?? item.period}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
