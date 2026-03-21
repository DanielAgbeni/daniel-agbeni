'use client';

import { motion } from 'framer-motion';

const lines = [
  '$ boot portfolio --prod',
  '> loading modules ... done',
  '> services online: web / mobile / cloud',
  '> health check: 100%'
];

export function TerminalPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-primary/20 bg-[#111222] p-5 text-sm text-slate-100 shadow-soft"
    >
      <div className="mb-4 flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      <div className="space-y-2 font-mono text-xs md:text-sm">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </motion.div>
  );
}
