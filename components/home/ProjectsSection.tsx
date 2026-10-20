import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { ProjectVisual } from '@/components/projects/ProjectVisual';
import { Section } from '@/components/ui/Section';
import { projects, type Project } from '@/lib/projects';

const featured = projects.filter((project) => project.featured);
const more = projects.filter((project) => !project.featured);

function ExternalLinks({ project }: { project: Project }) {
  return (
    <div className="relative z-10 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit the ${project.name} live site (opens in new tab)`}
          className="inline-flex min-h-6 items-center gap-1 text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
        >
          Live site
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      ) : null}
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View the ${project.name} source code on GitHub (opens in new tab)`}
          className="inline-flex min-h-6 items-center gap-1.5 text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
        >
          <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
          Source code
        </a>
      ) : null}
    </div>
  );
}

function StackList({ stack, limit }: { stack: string[]; limit: number }) {
  const shown = stack.slice(0, limit);
  const remaining = stack.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {shown.map((tech) => (
        <li key={tech} className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted">
          {tech}
        </li>
      ))}
      {remaining > 0 ? <li className="px-1 py-1 font-mono text-[11px] text-subtle">+{remaining} more</li> : null}
    </ul>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const href = `/projects/${project.slug}`;
  return (
    <article className="reveal group relative grid overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-shadow duration-300 hover:shadow-lift md:grid-cols-2">
      <ProjectVisual
        project={project}
        sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
        className={`min-h-64 border-b border-line md:border-b-0 ${index % 2 === 1 ? 'md:order-2 md:border-l' : 'md:border-r'}`}
      />
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <p className="text-xs font-medium text-accent">{project.category}</p>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-fg">
            <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {project.name}
            </Link>
          </h3>
          <p className="mt-1 text-base text-fg/80">{project.tagline}</p>
        </div>
        <p className="leading-relaxed text-muted">{project.summary}</p>

        {project.metrics ? (
          <dl className="grid grid-cols-3 gap-3 border-y border-line py-4">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs leading-snug text-muted">{metric.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-fg [font-variant-numeric:tabular-nums]">{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <StackList stack={project.stack} limit={6} />

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
          <ExternalLinks project={project} />
          <span aria-hidden="true" className="inline-flex items-center gap-1 text-sm font-semibold text-fg transition-transform group-hover:translate-x-0.5">
            Case study
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      {/* Visible focus ring for the stretched link. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-accent ring-offset-2 ring-offset-bg opacity-0 transition-opacity group-has-[a:focus-visible]:opacity-100" />
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;
  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-shadow duration-300 hover:shadow-lift">
      <ProjectVisual project={project} sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] border-b border-line" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="text-xs font-medium text-accent">{project.category}</p>
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-fg">
            <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {project.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-fg/80">{project.tagline}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
        <StackList stack={project.stack} limit={4} />
        <div className="mt-auto pt-2">
          <ExternalLinks project={project} />
        </div>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-accent ring-offset-2 ring-offset-bg opacity-0 transition-opacity group-has-[a:focus-visible]:opacity-100" />
    </article>
  );
}

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Selected work"
      lead="Production platforms, mobile apps, backend infrastructure and machine-learning research. Each project links to a short case study."
    >
      <div className="space-y-6">
        {featured.map((project, index) => (
          <FeaturedProject key={project.slug} project={project} index={index} />
        ))}
      </div>
      {more.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}
