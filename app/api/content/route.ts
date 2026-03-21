import { convex } from '@/lib/convex';

export async function GET() {
  const [stackMatrix, registry, systemLogs] = await Promise.all([
    convex.query('stackMatrix:list', {}),
    convex.query('registry:list', {}),
    convex.query('systemLogs:list', {})
  ]);

  return Response.json({ stackMatrix, registry, systemLogs });
}
