'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <motion.section
      id={id}
      className="py-16"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25 }}
    >
      <h2 className="mb-6 font-heading text-2xl font-semibold tracking-tight text-text">{title}</h2>
      {children}
    </motion.section>
  );
}
