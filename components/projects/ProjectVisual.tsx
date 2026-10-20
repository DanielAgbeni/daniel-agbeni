import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { BenchmarkChart } from '@/components/projects/BenchmarkChart';

interface ProjectVisualProps {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Picks the most truthful visual for a project:
 * real benchmark data > real screenshot > typographic cover.
 */
export function ProjectVisual({ project, sizes, priority = false, className = '' }: ProjectVisualProps) {
  if (project.benchmark) {
    return (
      <div className={`flex items-center bg-surface-2 p-6 sm:p-8 ${className}`}>
        <BenchmarkChart benchmark={project.benchmark} />
      </div>
    );
  }

  if (project.image) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
        <Image
          src={project.image}
          alt={`Screenshot of the ${project.name} website`}
          width={1440}
          height={900}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col justify-between overflow-hidden bg-fg p-6 text-bg sm:p-8 ${className}`}>
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl"
      />
      <p className="relative font-mono text-xs opacity-70">{project.category}</p>
      <div className="relative">
        <p className="text-2xl font-semibold tracking-tight">{project.name}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Key technologies">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech} className="rounded-full border border-bg/20 px-2.5 py-1 font-mono text-[11px] opacity-90">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
