import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { github, linkedin, site } from '@/lib/site';
import { enterDelay } from '@/lib/style';
import portrait from '@/asset/danielagbeni.png';

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-page items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:grid-cols-[1.25fr_1fr] md:pb-28 md:pt-20">
        <div>
          <p className="enter inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted shadow-card">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {site.availability}
          </p>

          <h1 id="hero-heading" className="enter mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" style={enterDelay(80)}>
            <span className="block text-fg" translate="no">
              {site.name}
            </span>
            <span className="block text-muted">Full-stack software developer.</span>
          </h1>

          <p className="enter mt-6 max-w-xl text-lg leading-relaxed text-muted" style={enterDelay(160)}>
            I build production web and mobile apps with TypeScript, Next.js, React Native and Node.js, from interface to infrastructure.
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={enterDelay(240)}>
            <ButtonLink href="/#projects">
              View projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/#contact" variant="secondary">
              Get in touch
            </ButtonLink>
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
            {[github, linkedin].map((profile) => (
              <a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${profile.label} profile (opens in new tab)`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold text-fg shadow-card transition-colors hover:border-fg/40"
              >
                <SocialIcon id={profile.id} className="h-4 w-4" />
                <span>{profile.label}</span>
              </a>
            ))}
          </div>
        </div>

        <figure className="enter relative mx-auto w-full max-w-sm md:max-w-none" style={enterDelay(120)}>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-lift">
            <Image
              src={portrait}
              alt={`Portrait of ${site.name}`}
              priority
              placeholder="blur"
              sizes="(min-width: 1152px) 440px, (min-width: 768px) 40vw, 384px"
              className="aspect-[4/5] w-full object-cover object-[55%_center]"
            />
          </div>
          <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {site.location} · Remote / Relocation
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
