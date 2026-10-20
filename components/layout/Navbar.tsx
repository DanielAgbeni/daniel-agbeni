'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { FileText, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { buttonClasses } from '@/components/ui/ButtonLink';
import { github, linkedin, site } from '@/lib/site';

const navItems = [
  { label: 'Work', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
] as const;

const professionalProfiles = [github, linkedin];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="print-hidden sticky top-0 z-40 border-b border-line/80 bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5 font-semibold tracking-tight text-fg" onClick={close}>
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-full bg-fg font-mono text-xs font-bold text-bg transition-colors group-hover:bg-accent group-hover:text-accent-fg"
          >
            DA
          </span>
          <span translate="no">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {professionalProfiles.map((profile) => (
            <a
              key={profile.id}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on ${profile.label} (opens in new tab)`}
              className="hidden h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg sm:inline-flex"
            >
              <SocialIcon id={profile.id} className="h-[18px] w-[18px]" />
            </a>
          ))}
          <ThemeToggle />
          <Link href="/resume" className={buttonClasses('primary', 'ml-1 hidden !min-h-10 !px-4 md:inline-flex')}>
            <FileText className="h-4 w-4" aria-hidden="true" />
            Résumé
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2 md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id={panelId} hidden={!open} className="border-t border-line bg-bg md:hidden">
        <nav aria-label="Mobile" className="mx-auto flex max-w-page flex-col px-5 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-xl px-3 py-3 text-base font-medium text-fg transition-colors hover:bg-surface-2"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-4">
            {professionalProfiles.map((profile) => (
              <a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses('secondary')}
              >
                <SocialIcon id={profile.id} className="h-4 w-4" />
                {profile.label}
              </a>
            ))}
            <Link href="/resume" onClick={close} className={buttonClasses('primary', 'col-span-2')}>
              <FileText className="h-4 w-4" aria-hidden="true" />
              Résumé
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
