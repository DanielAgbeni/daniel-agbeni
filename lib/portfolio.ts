import { convex } from '@/lib/convex';
import type { PortfolioContent } from '@/lib/types';

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const [projects, services, experience, skills] = await Promise.all([
      convex.query('projects:list', {}),
      convex.query('services:list', {}),
      convex.query('experience:list', {}),
      convex.query('skills:list', {})
    ]);

    return { projects, services, experience, skills };
  } catch {
    return { projects: [], services: [], experience: [], skills: [] };
  }
}
