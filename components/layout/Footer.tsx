import Link from 'next/link';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { mailtoHref, site, socials } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="print-hidden border-t border-line">
      <div className="mx-auto grid max-w-page gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-lg font-semibold tracking-tight text-fg" translate="no">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-muted">
            {site.role} · {site.location} · {site.availability}
          </p>
          <p className="mt-4 text-sm">
            <a href={mailtoHref} className="font-medium text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent">
              {site.email}
            </a>
          </p>
        </div>

        <nav aria-label="Social profiles">
          <ul className="flex flex-wrap gap-1 md:justify-end">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`${social.label} (opens in new tab)`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  <SocialIcon id={social.id} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-5 py-6 text-xs text-subtle sm:flex-row sm:justify-between sm:px-8">
          <p>
            © {year} {site.fullName}
          </p>
          <p>
            <Link href="/resume" className="transition-colors hover:text-fg">
              Résumé
            </Link>
            <span aria-hidden="true"> · </span>
            <Link href="/#projects" className="transition-colors hover:text-fg">
              Projects
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
