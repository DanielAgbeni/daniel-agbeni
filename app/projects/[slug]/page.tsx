import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { BenchmarkChart } from '@/components/projects/BenchmarkChart';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { getProject, projects, projectUrlLabel } from '@/lib/projects';
import { SITE_URL, site } from '@/lib/site';
import { projectGraph } from '@/lib/structured-data';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  const title = `${project.name} — ${project.tagline}`;
  const url = `${SITE_URL}/projects/${project.slug}`;

  return {
    title,
    description: project.summary,
    keywords: [project.name, ...project.stack, ...project.keywords, site.name],
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: 'article',
      url,
      title: `${title} | ${site.name}`,
      description: project.summary,
      ...(project.image
        ? {
            images: [
              {
                url: project.image,
                width: 1440,
                height: 900,
                alt: `${project.name} screenshot`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description: project.summary,
      ...(project.image ? { images: [project.image] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) {
    notFound();
  }

  const project = projects[index];
  const prevProject = projects[(index - 1 + projects.length) % projects.length];
  const nextProject = projects[(index + 1) % projects.length];
  const graph = projectGraph(project.slug);

  return (
    <main id="main-content" className="mx-auto max-w-page px-5 py-12 sm:px-8 md:py-20">
      {graph ? <JsonLd data={graph} /> : null}

      <nav aria-label="Breadcrumb">
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All projects
        </Link>
      </nav>

      <article className="mt-6">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-accent">{project.category}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-5xl">{project.name}</h1>
          <p className="mt-3 text-xl text-muted sm:text-2xl">{project.tagline}</p>

          <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-5 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs text-subtle">Role</dt>
              <dd className="mt-1 font-medium text-fg">{project.role}</dd>
            </div>
            <div>
              <dt className="text-xs text-subtle">Category</dt>
              <dd className="mt-1 font-medium text-fg">{project.category}</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs text-subtle">Links</dt>
              <dd className="mt-1 flex flex-wrap gap-4 font-medium">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
                  >
                    {projectUrlLabel(project.liveUrl)}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
                  >
                    <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
                    GitHub repo
                  </a>
                ) : null}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <ButtonLink href={project.liveUrl} external>
                Visit live site
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            ) : null}
            {project.repoUrl ? (
              <ButtonLink href={project.repoUrl} external variant={project.liveUrl ? 'secondary' : 'primary'}>
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                View source on GitHub
              </ButtonLink>
            ) : null}
          </div>
        </header>

        {project.metrics ? (
          <dl className="mt-12 grid gap-4 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse gap-1 rounded-2xl border border-line bg-surface p-6 shadow-card">
                <dt className="text-sm text-muted">{metric.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-fg [font-variant-numeric:tabular-nums] sm:text-4xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {project.image ? (
          <figure className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-lift">
            <Image
              src={project.image}
              alt={`Screenshot of ${project.name}`}
              width={1440}
              height={900}
              priority
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="h-auto w-full"
            />
          </figure>
        ) : null}

        {project.benchmark ? (
          <section aria-labelledby="benchmark-heading" className="mt-12 rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
            <h2 id="benchmark-heading" className="mb-6 text-xl font-semibold tracking-tight text-fg">
              Verified benchmark results
            </h2>
            <BenchmarkChart benchmark={project.benchmark} variant="full" />
          </section>
        ) : null}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-2xl font-semibold tracking-tight text-fg">
              Overview
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-semibold tracking-tight text-fg">What I built</h2>
            <ul className="mt-4 space-y-3 text-base leading-relaxed text-muted">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          <aside aria-labelledby="stack-heading" className="self-start rounded-2xl border border-line bg-surface p-6 shadow-card">
            <h2 id="stack-heading" className="text-base font-semibold text-fg">
              Technology stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs text-fg">
                  {tech}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>

      <nav aria-label="More projects" className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-fg/40"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-subtle">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Previous project
          </span>
          <span className="mt-2 text-lg font-semibold text-fg">{prevProject.name}</span>
          <span className="mt-0.5 text-sm text-muted">{prevProject.tagline}</span>
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 text-right transition-colors hover:border-fg/40"
        >
          <span className="inline-flex items-center justify-end gap-1.5 text-xs font-medium text-subtle">
            Next project
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          <span className="mt-2 text-lg font-semibold text-fg">{nextProject.name}</span>
          <span className="mt-0.5 text-sm text-muted">{nextProject.tagline}</span>
        </Link>
      </nav>
    </main>
  );
}
