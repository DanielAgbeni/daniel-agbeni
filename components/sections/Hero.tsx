'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';

const TerminalPanel = dynamic(() => import('./TerminalPanel').then((mod) => mod.TerminalPanel));

export function Hero() {
  return (
    <section id="hero" aria-label="Introduction" className="grid gap-8 py-16 md:grid-cols-2 md:items-center">
      <div>
        <p className="mb-3 inline-flex rounded-full border border-border-line bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          STATUS: BUILDING RELIABLE SYSTEMS
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight text-text md:text-6xl">
          Daniel Agbeni
        </h1>
        <ul className="mt-4 space-y-1 text-text/80">
          <li>Full-Stack Developer</li>
          <li>Mobile Engineer</li>
          <li>Cloud Engineer (in progress)</li>
          <li>Network Engineer (in progress)</li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#projects">View Projects</Button>
          <Button href="#contact" variant="ghost">Contact</Button>
        </div>
      </div>
      <TerminalPanel />
    </section>
  );
}
