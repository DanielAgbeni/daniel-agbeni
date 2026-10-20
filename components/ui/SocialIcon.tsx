import type { IconType } from 'react-icons';
import { FaGithub, FaInstagram, FaLinkedin, FaThreads, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import type { SocialProfile } from '@/lib/site';

const icons: Record<SocialProfile['id'], IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  threads: FaThreads,
  tiktok: FaTiktok,
};

export function SocialIcon({ id, className }: { id: SocialProfile['id']; className?: string }) {
  const Icon = icons[id];
  return <Icon className={className} aria-hidden="true" focusable="false" />;
}
