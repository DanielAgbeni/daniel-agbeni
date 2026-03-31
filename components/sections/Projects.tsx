'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import type { Project } from '@/lib/types';

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.length ? projects.map((project) => (
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            key={project._id}
            className="overflow-hidden rounded-2xl border border-border-line bg-surface p-4 shadow-card"
          >
            {project.imageUrl ? (
              <Image src={project.imageUrl} alt={project.title} width={640} height={360} className="h-52 w-full rounded-xl object-cover" />
            ) : (
              <div className="h-52 w-full rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20" />
            )}
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="font-heading text-xl">{project.title}</h3>
                {project.featured ? <span className="rounded-full bg-accent px-2 py-1 text-xs font-semibold text-text">Featured</span> : null}
              </div>
              <p className="text-sm text-text/70">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-primary/20 px-2.5 py-1 text-xs">{tech}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-3 text-sm">
                {project.liveUrl ? <a href={project.liveUrl} target="_blank" className="text-primary">Live</a> : null}
                {project.githubUrl ? <a href={project.githubUrl} target="_blank" className="text-primary">GitHub</a> : null}
              </div>
            </div>
          </motion.article>
        )) : <p className="text-text/60">No projects yet. Add from admin.</p>}
      </div>
    </Section>
  );
}
