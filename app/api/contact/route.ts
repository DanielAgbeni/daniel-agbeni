import { convex } from '@/lib/convex';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.message) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await convex.mutation('contact:create' as any, {
    name: body.name,
    email: body.email,
    message: body.message
  });

  return Response.json({ ok: true });
}
