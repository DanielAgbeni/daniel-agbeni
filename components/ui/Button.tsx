'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
};

export function Button({ href, children, variant = 'primary' }: Props) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className={`inline-flex rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
          variant === 'primary'
            ? 'bg-primary text-white shadow-soft hover:-translate-y-0.5 hover:opacity-95'
            : 'border border-border-line bg-surface text-text hover:-translate-y-0.5 hover:border-primary/60'
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
