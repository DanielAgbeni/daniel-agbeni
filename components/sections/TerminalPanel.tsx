'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  '$ boot portfolio --prod',
  '> loading modules ... done',
  '> services online: web / mobile / cloud',
  '> health check: 100%',
];

const CHAR_DELAY = 38;   // ms per character
const LINE_GAP   = 180;  // ms pause between lines

function useTypewriter(_active: boolean) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [cursorLine, setCursorLine]         = useState(-1);

  const runAnimation = useCallback(() => {
    setDisplayedLines([]);
    setCursorLine(-1);

    let lineIndex = 0;
    let charIndex = 0;
    let currentLines: string[] = [];
    let rafId: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (lineIndex >= LINES.length) {
        setCursorLine(LINES.length - 1); // keep cursor on last line
        return;
      }

      const fullLine = LINES[lineIndex];

      if (charIndex === 0) {
        // Start new line
        setCursorLine(lineIndex);
        currentLines = [...currentLines, ''];
        setDisplayedLines([...currentLines]);
      }

      if (charIndex < fullLine.length) {
        charIndex++;
        currentLines[lineIndex] = fullLine.slice(0, charIndex);
        setDisplayedLines([...currentLines]);
        rafId = setTimeout(typeNext, CHAR_DELAY);
      } else {
        // Line finished, move to next after a pause
        lineIndex++;
        charIndex = 0;
        rafId = setTimeout(typeNext, LINE_GAP);
      }
    };

    rafId = setTimeout(typeNext, 300); // initial delay

    return () => clearTimeout(rafId);
  }, []);

  return { displayedLines, cursorLine, runAnimation };
}

export function TerminalPanel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { displayedLines, cursorLine, runAnimation } = useTypewriter(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [runAnimation]);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-2xl border border-border-line bg-[#0d0f1a] p-5 text-sm text-slate-100 shadow-soft"
    >
      {/* Traffic-light dots */}
      <div className="mb-4 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-300" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-auto font-mono text-[10px] text-slate-500">terminal</span>
      </div>

      {/* Lines */}
      <div className="space-y-2 font-mono text-xs md:text-sm min-h-[96px]">
        <AnimatePresence initial={false}>
          {displayedLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className={
                line.startsWith('$')
                  ? 'text-emerald-400'
                  : line.includes('100%')
                  ? 'text-cyan-300'
                  : 'text-slate-300'
              }
            >
              {line}
              {/* Blinking cursor on the active line */}
              {i === cursorLine && (
                <span className="ml-0.5 inline-block w-[7px] h-[13px] bg-emerald-400 align-middle terminal-cursor" />
              )}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
