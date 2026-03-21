import { auth } from '@/lib/auth';
import { convex } from '@/lib/convex';

type Collection = 'stackMatrix' | 'registry' | 'systemLogs';

const collectionMap: Record<Collection, { upsert: string; remove: string }> = {
  stackMatrix: { upsert: 'stackMatrix:upsert', remove: 'stackMatrix:remove' },
  registry: { upsert: 'registry:upsert', remove: 'registry:remove' },
  systemLogs: { upsert: 'systemLogs:upsert', remove: 'systemLogs:remove' }
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: Collection }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { collection } = await params;
  const body = await request.json();
  const fn = collectionMap[collection];

  if (!fn) {
    return Response.json({ error: 'Unknown collection' }, { status: 404 });
  }

  const result = await convex.mutation(fn.upsert, body);
  return Response.json({ ok: true, result });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ collection: Collection }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { collection } = await params;
  const fn = collectionMap[collection];
  if (!fn) {
    return Response.json({ error: 'Unknown collection' }, { status: 404 });
  }

  const { id } = await request.json();
  const result = await convex.mutation(fn.remove, { id });

  return Response.json({ ok: true, result });
}
