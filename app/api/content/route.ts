import { getPortfolioContent } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
  const content = await getPortfolioContent();
  return Response.json(content);
}
