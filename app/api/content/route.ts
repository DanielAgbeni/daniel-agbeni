import { getPortfolioContent } from '@/lib/portfolio';

export async function GET() {
  const content = await getPortfolioContent();
  return Response.json(content);
}
