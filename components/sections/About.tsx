'use client';

import { motion } from 'framer-motion';
import { Layers, MessageSquareQuote, Workflow, Smartphone } from 'lucide-react';

const highlights = [
  {
    icon: Layers,
    label: 'Production Apps',
    value: '3+',
    color: 'text-primary',
  },
  {
    icon: MessageSquareQuote,
    label: 'Real-Time Systems',
    value: null,
    color: 'text-primary',
  },
  {
    icon: Workflow,
    label: 'API Design & Scaling',
    value: null,
    color: 'text-primary',
  },
  {
    icon: Smartphone,
    label: 'Mobile + Web',
    value: null,
    color: 'text-accent',
  },
];

export function About() {
  return (
    <motion.section
      id="about"
      className="py-16"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25 }}
    >
      <div className="grid items-start gap-10 md:grid-cols-2">
        {/* Left – label + statement */}
        <div>
          <p className="mb-4 font-mono text-xs italic tracking-widest text-primary/70">
            // BRIEFING_02
          </p>
          <h2 className="font-heading text-3xl font-bold leading-snug tracking-tight text-text md:text-4xl">
            Engineering digital experiences that bridge the gap between design
            and scalable systems. Focus on performance and reliability.
          </h2>
        </div>

        {/* Right – 2×2 feature grid */}
        <div className="grid grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              className="rounded-2xl border border-primary/5 bg-white p-5 shadow-[0_2px_20px_rgba(72,40,230,0.04)] transition-shadow duration-300 hover:shadow-[0_4px_30px_rgba(72,40,230,0.1)]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              {item.value ? (
                <span className={`mb-3 block font-heading text-3xl font-bold ${item.color}`}>
                  {item.value}
                </span>
              ) : (
                <item.icon className={`mb-3 h-7 w-7 ${item.color}`} strokeWidth={2.2} />
              )}
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-text/60">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
