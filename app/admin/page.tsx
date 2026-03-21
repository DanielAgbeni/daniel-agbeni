import AdminPanel from '@/components/admin/AdminPanel';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();

  if (session?.user?.email !== 'danielagbeni12@gmail.com') {
    redirect('/admin/login');
  }

  return <AdminPanel />;
}
