'use client';

import { motion } from 'framer-motion';
import type { Experience } from '@/lib/types';

export function Journey({ entries }: { entries: Experience[] }) {
  // Sort entries by year descending (newest first)
  const sorted = [...entries].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <motion.section
      id="journey"
      className="py-16"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25 }}
    >
      {/* Section header */}
      <p className="mb-12 text-center font-mono text-xs uppercase tracking-[0.3em] text-primary">
        System Logs // Chronology
      </p>

      {/* Timeline */}
      <div className="relative mx-auto max-w-4xl">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-primary/15 md:block" />

        {sorted.length ? (
          sorted.map((entry, index) => {
            const isEven = index % 2 === 0; // even = right card, odd = left card

            return (
              <motion.div
                key={entry._id}
                className="relative mb-16 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Desktop layout */}
                <div className="hidden items-center md:flex">
                  {/* Left side */}
                  <div className="flex w-1/2 justify-end pr-10">
                    {isEven ? (
                      <span className="font-heading text-4xl font-bold tracking-tight text-text/80">
                        {entry.year}
                      </span>
                    ) : (
                      <div className="w-full max-w-sm rounded-2xl border border-border-line bg-surface p-6 shadow-card transition-shadow duration-300 hover:shadow-soft">
                        <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-text">
                          {entry.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-text/60">
                          {entry.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
                    <span className="absolute h-4 w-4 rounded-full bg-primary/20" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-primary" />
                  </div>

                  {/* Right side */}
                  <div className="flex w-1/2 pl-10">
                    {isEven ? (
                      <div className="w-full max-w-sm rounded-2xl border border-border-line bg-surface p-6 shadow-card transition-shadow duration-300 hover:shadow-soft">
                        <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-text">
                          {entry.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-text/60">
                          {entry.description}
                        </p>
                      </div>
                    ) : (
                      <span className="font-heading text-4xl font-bold tracking-tight text-text/80">
                        {entry.year}
                      </span>
                    )}
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="flex items-start md:hidden">
                  {/* Mobile line + dot */}
                  <div className="relative mr-5 flex flex-col items-center">
                    <div className="relative z-10 flex h-4 w-4 items-center justify-center">
                      <span className="absolute h-4 w-4 rounded-full bg-primary/20" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-primary" />
                    </div>
                    <div className="mt-1 h-full w-px bg-primary/15" />
                  </div>

                  {/* Mobile card */}
                  <div className="flex-1 pb-2">
                    <span className="mb-2 block font-heading text-2xl font-bold tracking-tight text-text/80">
                      {entry.year}
                    </span>
                    <div className="rounded-2xl border border-border-line bg-surface p-5 shadow-card">
                      <h3 className="mb-1.5 font-heading text-sm font-bold uppercase tracking-wider text-text">
                        {entry.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text/60">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="text-center text-text/60">No experience entries yet.</p>
        )}
      </div>
    </motion.section>
  );
}
