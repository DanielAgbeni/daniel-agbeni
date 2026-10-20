/**
 * Single source of truth for identity, contact details and social profiles.
 * Everything on the site (UI, metadata, JSON-LD, sitemap) reads from here,
 * so updating a link or email only ever happens in one place.
 */

export interface SocialProfile {
  /** Stable key used for icon lookup. */
  id: 'github' | 'linkedin' | 'x' | 'instagram' | 'youtube' | 'threads' | 'tiktok';
  label: string;
  handle: string;
  url: string;
  /** Professional profiles are surfaced prominently (hero, nav, contact). */
  primary: boolean;
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://danielagbeni.algiz.tech').replace(/\/$/, '');

export const site = {
  name: 'Daniel Agbeni',
  fullName: 'Daniel Agbeni Oluwafemi',
  givenName: 'Daniel',
  familyName: 'Agbeni',
  role: 'Full-Stack Software Developer',
  shortBio:
    'Full-stack software developer building production web and mobile apps with TypeScript, Next.js, React Native and Node.js.',
  summary:
    'I build production web and cross-platform mobile applications end to end: typed React and React Native frontends, Node.js APIs, real-time sync, background job queues and the cloud infrastructure that runs them. I also research ML-driven network routing with graph neural networks and reinforcement learning.',
  location: 'Nigeria',
  availability: 'Open to remote roles & relocation',
  email: 'danielagbeni12@gmail.com',
  phoneDisplay: '+234 904 199 5875',
  phoneE164: '+2349041995875',
  whatsappNumber: '2349041995875',
  twitterHandle: '@Agbeni_Daniel',
  url: SITE_URL,
} as const;

export const socials: readonly SocialProfile[] = [
  { id: 'github', label: 'GitHub', handle: 'DanielAgbeni', url: 'https://github.com/DanielAgbeni', primary: true },
  { id: 'linkedin', label: 'LinkedIn', handle: 'danielagbeni', url: 'https://www.linkedin.com/in/danielagbeni', primary: true },
  { id: 'x', label: 'X', handle: '@Agbeni_Daniel', url: 'https://x.com/Agbeni_Daniel', primary: true },
  { id: 'youtube', label: 'YouTube', handle: '@daniel_agbeni', url: 'https://www.youtube.com/@daniel_agbeni', primary: false },
  { id: 'instagram', label: 'Instagram', handle: '@daniel_agbeni', url: 'https://www.instagram.com/daniel_agbeni', primary: false },
  { id: 'threads', label: 'Threads', handle: '@daniel_agbeni', url: 'https://www.threads.com/@daniel_agbeni', primary: false },
  { id: 'tiktok', label: 'TikTok', handle: '@daniel_agbeni', url: 'https://www.tiktok.com/@daniel_agbeni', primary: false },
];

export const github = socials[0];
export const linkedin = socials[1];

export const mailtoHref = `mailto:${site.email}`;
export const whatsappHref = `https://wa.me/${site.whatsappNumber}`;
