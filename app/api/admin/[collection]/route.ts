import { auth } from '@/lib/auth';
import { convex } from '@/lib/convex';

type Collection = 'projects' | 'services' | 'experience' | 'skills';

const collectionMap: Record<Collection, { upsert: string; remove: string }> = {
  projects: { upsert: 'projects:upsert', remove: 'projects:remove' },
  services: { upsert: 'services:upsert', remove: 'services:remove' },
  experience: { upsert: 'experience:upsert', remove: 'experience:remove' },
  skills: { upsert: 'skills:upsert', remove: 'skills:remove' }
};

async function isAuthorized() {
  const session = await auth();
  return session?.user?.email === 'danielagbeni12@gmail.com';
}

export async function POST(request: Request, { params }: { params: Promise<{ collection: string }> }) {
  if (!(await isAuthorized())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { collection } = await params;
  const collectionName = collection as Collection;
  const body = await request.json();
  const fn = collectionMap[collectionName];

  if (!fn) {
    return Response.json({ error: 'Unknown collection' }, { status: 404 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await convex.mutation(fn.upsert as any, body);
    return Response.json({ ok: true, result });
  } catch (err: unknown) {
    return Response.json({ error: (err as Error).message || 'Mutation failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ collection: string }> }) {
  if (!(await isAuthorized())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { collection } = await params;
  const collectionName = collection as Collection;
  const fn = collectionMap[collectionName];
  if (!fn) {
    return Response.json({ error: 'Unknown collection' }, { status: 404 });
  }

  const { id } = await request.json();
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await convex.mutation(fn.remove as any, { id });
    return Response.json({ ok: true, result });
  } catch (err: unknown) {
    return Response.json({ error: (err as Error).message || 'Deletion failed' }, { status: 500 });
  }
}
