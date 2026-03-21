import { auth } from '@/lib/auth';
import { convex } from '@/lib/convex';

export async function POST() {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const uploadUrl = await convex.mutation('registry:generateUploadUrl', {});
  return Response.json({ uploadUrl });
}
