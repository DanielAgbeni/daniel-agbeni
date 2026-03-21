import { auth } from '@/lib/auth';
import { convex } from '@/lib/convex';

export async function POST() {
  const session = await auth();
  if (session?.user?.email !== 'danielagbeni12@gmail.com') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const uploadUrl = await convex.mutation('projects:generateUploadUrl' as any, {});
  return Response.json({ uploadUrl });
}
