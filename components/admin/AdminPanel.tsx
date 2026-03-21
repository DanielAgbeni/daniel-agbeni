'use client';

import { signOut } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
import type { Experience, PortfolioContent, Project, Service, Skill, SkillCategory } from '@/lib/types';

const initialState: PortfolioContent = { projects: [], services: [], experience: [], skills: [] };

export default function AdminPanel() {
  const [content, setContent] = useState<PortfolioContent>(initialState);

  const load = async () => {
    const res = await fetch('/api/content', { cache: 'no-store' });
    setContent(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (collection: string, payload: unknown) => {
    await fetch(`/api/admin/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    await load();
  };

  const remove = async (collection: string, id: string) => {
    await fetch(`/api/admin/${collection}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    await load();
  };

  const uploadImage = async (file: File) => {
    const uploadRes = await fetch('/api/admin/upload', { method: 'POST' });
    const { uploadUrl } = await uploadRes.json();
    const storageRes = await fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': file.type },
      body: file
    });
    return storageRes.json() as Promise<{ storageId: string }>;
  };

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
        <button className="rounded-xl border border-primary/20 px-4 py-2 text-sm" onClick={() => signOut({ callbackUrl: '/admin/login' })}>Sign out</button>
      </div>

      <AdminCard title="Projects">
        <ProjectForm onSave={(payload) => save('projects', payload)} onUpload={uploadImage} />
        <List items={content.projects} render={(item) => `${item.title} ${item.featured ? '• featured' : ''}`} onEdit={(item) => save('projects', item)} onDelete={(id) => remove('projects', id)} />
      </AdminCard>

      <AdminCard title="Services">
        <ServiceForm onSave={(payload) => save('services', payload)} />
        <List items={content.services} render={(item) => item.title} onEdit={(item) => save('services', item)} onDelete={(id) => remove('services', id)} />
      </AdminCard>

      <AdminCard title="Experience">
        <ExperienceForm onSave={(payload) => save('experience', payload)} />
        <List items={content.experience} render={(item) => `${item.year} • ${item.title}`} onEdit={(item) => save('experience', item)} onDelete={(id) => remove('experience', id)} />
      </AdminCard>

      <AdminCard title="Skills">
        <SkillForm onSave={(payload) => save('skills', payload)} />
        <List items={content.skills} render={(item) => `${item.category} • ${item.name}`} onEdit={(item) => save('skills', item)} onDelete={(id) => remove('skills', id)} />
      </AdminCard>
    </main>
  );
}

function AdminCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="space-y-4 rounded-2xl border border-primary/10 bg-white p-6 shadow-soft"><h2 className="font-heading text-xl">{title}</h2>{children}</section>;
}

function List<T extends { _id: string }>({ items, render, onDelete, onEdit }: { items: T[]; render: (item: T) => string; onDelete: (id: string) => Promise<void>; onEdit: (item: T) => Promise<void>; }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item._id} className="flex items-center justify-between rounded-xl border border-primary/10 p-3 text-sm">
          <span>{render(item)}</span>
          <div className="flex gap-2">
            <button className="rounded-lg border px-3 py-1" onClick={() => onEdit(item)}>Quick Save</button>
            <button className="rounded-lg border px-3 py-1" onClick={() => onDelete(item._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectForm({ onSave, onUpload }: { onSave: (payload: Partial<Project>) => Promise<void>; onUpload: (file: File) => Promise<{ storageId: string }>; }) {
  const [uploading, setUploading] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = form.get('image') as File;
    let imageId = String(form.get('imageId') ?? '');
    if (file?.size) {
      setUploading(true);
      const upload = await onUpload(file);
      imageId = upload.storageId;
      setUploading(false);
    }

    await onSave({
      id: String(form.get('id') || '') || undefined,
      title: String(form.get('title')),
      description: String(form.get('description')),
      techStack: String(form.get('techStack')).split(',').map((s) => s.trim()).filter(Boolean),
      imageId,
      liveUrl: String(form.get('liveUrl') || '') || undefined,
      githubUrl: String(form.get('githubUrl') || '') || undefined,
      featured: form.get('featured') === 'on'
    });
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={submit} className="grid gap-2">
      <input name="id" placeholder="Project ID (for edit)" className="rounded-xl border border-primary/20 px-3 py-2" />
      <input name="title" required placeholder="Title" className="rounded-xl border border-primary/20 px-3 py-2" />
      <textarea name="description" required placeholder="Description" className="rounded-xl border border-primary/20 px-3 py-2" />
      <input name="techStack" required placeholder="Next.js, Convex, Tailwind" className="rounded-xl border border-primary/20 px-3 py-2" />
      <input name="imageId" placeholder="Existing imageId (optional if uploading)" className="rounded-xl border border-primary/20 px-3 py-2" />
      <input name="image" type="file" accept="image/*" className="rounded-xl border border-primary/20 px-3 py-2" />
      <input name="liveUrl" placeholder="Live URL" className="rounded-xl border border-primary/20 px-3 py-2" />
      <input name="githubUrl" placeholder="GitHub URL" className="rounded-xl border border-primary/20 px-3 py-2" />
      <label className="text-sm"><input name="featured" type="checkbox" className="mr-2" />Featured</label>
      <button disabled={uploading} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">{uploading ? 'Uploading...' : 'Save Project'}</button>
    </form>
  );
}

function ServiceForm({ onSave }: { onSave: (payload: Partial<Service>) => Promise<void> }) {
  return <SimpleForm fields={['id', 'title', 'description', 'icon']} onSave={onSave} buttonLabel="Save Service" />;
}

function ExperienceForm({ onSave }: { onSave: (payload: Partial<Experience>) => Promise<void> }) {
  return <SimpleForm fields={['id', 'year', 'title', 'description', 'order']} onSave={(payload) => onSave({ ...payload, order: Number(payload.order ?? 0) })} buttonLabel="Save Experience" />;
}

function SkillForm({ onSave }: { onSave: (payload: Partial<Skill>) => Promise<void> }) {
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await onSave({
      id: String(form.get('id') || '') || undefined,
      category: form.get('category') as SkillCategory,
      name: String(form.get('name'))
    });
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={submit} className="grid gap-2">
      <input name="id" placeholder="Skill ID (for edit)" className="rounded-xl border border-primary/20 px-3 py-2" />
      <select name="category" className="rounded-xl border border-primary/20 px-3 py-2">
        <option value="frontend">frontend</option>
        <option value="backend">backend</option>
        <option value="mobile">mobile</option>
        <option value="cloud">cloud</option>
      </select>
      <input name="name" required placeholder="Skill name" className="rounded-xl border border-primary/20 px-3 py-2" />
      <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">Save Skill</button>
    </form>
  );
}

function SimpleForm({ fields, onSave, buttonLabel }: { fields: string[]; onSave: (payload: any) => Promise<void>; buttonLabel: string; }) {
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(fields.map((field) => [field, form.get(field)]));
    await onSave(payload);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={submit} className="grid gap-2">
      {fields.map((field) => (
        <input key={field} name={field} placeholder={field} className="rounded-xl border border-primary/20 px-3 py-2" required={field !== 'id'} />
      ))}
      <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">{buttonLabel}</button>
    </form>
  );
}
