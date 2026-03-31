'use client';

import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Journey', '#journey'],
  ['Contact', '#contact'],
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-line bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-heading text-sm font-bold text-primary">daniel.dev/control</span>
        <nav className="hidden items-center gap-6 text-sm text-text/70 md:flex">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-primary">
              {label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
