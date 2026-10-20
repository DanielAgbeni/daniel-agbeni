import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-[background-color,border-color,color,transform,box-shadow] duration-200 active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-bg shadow-card hover:bg-accent hover:text-accent-fg',
  secondary: 'border border-line bg-surface text-fg shadow-card hover:border-fg/40',
  ghost: 'text-muted hover:bg-surface-2 hover:text-fg',
};

export function buttonClasses(variant: Variant = 'primary', className = ''): string {
  return `${base} ${variants[variant]} ${className}`;
}

export function ButtonLink({ href, children, variant = 'primary', external = false, className = '', ariaLabel }: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);

  if (external || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
