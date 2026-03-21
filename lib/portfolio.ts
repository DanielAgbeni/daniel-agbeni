import { convex } from '@/lib/convex';
import type { PortfolioContent } from '@/lib/types';

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const [projects, services, experience, skills] = await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      convex.query('projects:list' as any, {}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      convex.query('services:list' as any, {}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      convex.query('experience:list' as any, {}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      convex.query('skills:list' as any, {})
    ]);

    return { projects, services, experience, skills };
  } catch {
    return { projects: [], services: [], experience: [], skills: [] };
  }
}
