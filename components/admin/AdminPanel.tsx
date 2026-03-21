'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
        <button className="rounded-xl border border-primary/20 px-4 py-2 text-sm transition hover:bg-primary/10 font-medium" onClick={() => signOut({ callbackUrl: '/admin/login' })}>Sign out</button>
      </div>

      <AdminCard title="Projects">
        <ProjectForm onSave={(payload) => save('projects', payload)} onUpload={uploadImage} />
        <List items={content.projects} render={(item) => `${item.title} ${item.featured ? '• featured' : ''}`} onDelete={(id) => remove('projects', id)} />
      </AdminCard>

      <AdminCard title="Services">
        <ServiceForm onSave={(payload) => save('services', payload)} />
        <List items={content.services} render={(item) => item.title} onDelete={(id) => remove('services', id)} />
      </AdminCard>

      <AdminCard title="Experience">
        <ExperienceForm onSave={(payload) => save('experience', payload)} />
        <List items={content.experience} render={(item) => `${item.year} • ${item.title}`} onDelete={(id) => remove('experience', id)} />
      </AdminCard>

      <AdminCard title="Skills">
        <SkillForm onSave={(payload) => save('skills', payload)} />
        <List items={content.skills} render={(item) => `${item.category} • ${item.name}`} onDelete={(id) => remove('skills', id)} />
      </AdminCard>
    </main>
  );
}

function AdminCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
      <h2 className="font-heading text-2xl font-bold text-primary">{title}</h2>
      {children}
    </section>
  );
}

// We dropped the Quick Save for now because triggering save with a partial object bypasses Form Validation and causes ID issues if mis-copied
function List<T extends { _id: string }>({ items, render, onDelete }: { items: T[]; render: (item: T) => string; onDelete: (id: string) => Promise<void>; }) {
  return (
    <div className="space-y-3 mt-6 border-t border-primary/10 pt-6">
      <h3 className="font-semibold text-lg text-text/80 mb-2">Existing Items</h3>
      {items.length === 0 && <p className="text-sm text-text/50">No items found.</p>}
      {items.map((item) => (
        <div key={item._id} className="flex flex-wrap gap-2 items-center justify-between rounded-xl border border-primary/10 bg-background/50 p-4 text-sm transition hover:border-primary/30">
          <div className="flex flex-col gap-1">
            <span className="font-medium">{render(item)}</span>
            <span className="text-xs text-text/50 font-mono">ID: {item._id}</span>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 transition whitespace-nowrap" onClick={() => onDelete(item._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Zod schemas with empty string transforming to undefined for optional Convex IDs
// This handles the error where passing `id: "1"` or `""` violates Convex v.id()
const transformId = (val: string) => val.trim() === '' ? undefined : val;
const convexIdSchema = z.string().transform(transformId).pipe(z.string().min(20, "Invalid Convex ID. Leave completely blank to create new.").optional());

const projectSchema = z.object({
  id: convexIdSchema,
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  techStack: z.string().min(1, "Tech stack is required. Separate by comma."),
  imageId: z.string().optional(),
  liveUrl: z.string().transform(transformId).optional(),
  githubUrl: z.string().transform(transformId).optional(),
  featured: z.boolean()
});

type ProjectFormData = z.infer<typeof projectSchema>;

function ProjectForm({ onSave, onUpload }: { onSave: (payload: any) => Promise<void>; onUpload: (file: File) => Promise<{ storageId: string }>; }) {
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { featured: false }
  });

  const onSubmit = async (data: ProjectFormData, event?: any) => {
    let finalImageId = data.imageId;
    const file = event.target?.image?.files?.[0];
    if (file?.size) {
      setUploading(true);
      const upload = await onUpload(file);
      finalImageId = upload.storageId;
      setUploading(false);
    }

    await onSave({
      id: data.id,
      title: data.title,
      description: data.description,
      techStack: data.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      imageId: finalImageId,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      featured: data.featured
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="col-span-full sm:col-span-1">
        <input {...register('id')} placeholder="Project ID (for edit - leave blank for new)" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
        {errors.id && <p className="text-xs text-red-500 mt-1">{errors.id.message}</p>}
      </div>
      
      <div className="col-span-full sm:col-span-1">
        <input {...register('title')} placeholder="Title *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      <div className="col-span-full">
        <textarea {...register('description')} placeholder="Description *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary min-h-[100px] placeholder:text-text/40" />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
      </div>

      <div className="col-span-full sm:col-span-1">
        <input {...register('techStack')} placeholder="Next.js, Tailwind, Convex *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
        {errors.techStack && <p className="text-xs text-red-500 mt-1">{errors.techStack.message}</p>}
      </div>

      <div className="col-span-full sm:col-span-1">
        <input {...register('imageId')} placeholder="Existing imageId (optional)" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
      </div>

      <div className="col-span-full sm:col-span-1">
        <label className="text-xs font-semibold text-text/60 mb-1 block">Upload New Image (Optional)</label>
        <input name="image" type="file" accept="image/*" className="w-full rounded-xl border border-primary/20 px-4 py-2 outline-none focus:border-primary text-sm bg-white" />
      </div>

      <div className="col-span-full sm:col-span-1 pt-0 sm:pt-4">
        <input {...register('liveUrl')} placeholder="Live URL (https://...)" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
        {errors.liveUrl && <p className="text-xs text-red-500 mt-1">{errors.liveUrl.message}</p>}
      </div>

      <div className="col-span-full sm:col-span-1">
        <input {...register('githubUrl')} placeholder="GitHub URL (https://...)" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
        {errors.githubUrl && <p className="text-xs text-red-500 mt-1">{errors.githubUrl.message}</p>}
      </div>

      <div className="col-span-full flex items-center justify-between mt-2 flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
          <input {...register('featured')} type="checkbox" className="w-4 h-4 rounded border-primary/20 text-primary focus:ring-primary" />
          Featured Project
        </label>
        
        <button disabled={uploading} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}

const serviceSchema = z.object({
  id: convexIdSchema,
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon name/identifier is required")
});
type ServiceFormData = z.infer<typeof serviceSchema>;

function ServiceForm({ onSave }: { onSave: (payload: any) => Promise<void> }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData>({ resolver: zodResolver(serviceSchema) });

  const onSubmit = async (data: ServiceFormData) => {
    await onSave(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="col-span-full sm:col-span-1">
        <input {...register('id')} placeholder="Service ID (for edit - optional)" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
      </div>
      <div className="col-span-full sm:col-span-1">
        <input {...register('title')} placeholder="Title *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
      </div>
      <div className="col-span-full">
        <textarea {...register('description')} placeholder="Description *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary min-h-[80px] placeholder:text-text/40" />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
      </div>
      <div className="col-span-full sm:col-span-1">
        <input {...register('icon')} placeholder="Icon name (e.g., Code, Server) *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
        {errors.icon && <p className="text-xs text-red-500 mt-1">{errors.icon.message}</p>}
      </div>
      <div className="col-span-full flex justify-end">
        <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90">Save Service</button>
      </div>
    </form>
  );
}

const expSchema = z.object({
  id: convexIdSchema,
  year: z.string().min(1, "Year is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  order: z.string().min(1, "Order is required")
});
type ExpFormData = z.infer<typeof expSchema>;

function ExperienceForm({ onSave }: { onSave: (payload: any) => Promise<void> }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpFormData>({ 
    resolver: zodResolver(expSchema),
    defaultValues: { order: "0" }
  });

  const onSubmit = async (data: ExpFormData) => {
    await onSave({ ...data, order: Number(data.order) });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="col-span-full sm:col-span-1">
        <input {...register('id')} placeholder="Experience ID (for edit - optional)" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
      </div>
      <div className="col-span-full sm:col-span-1">
        <input {...register('year')} placeholder="Year (e.g. 2026) *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
        {errors.year && <p className="text-xs text-red-500 mt-1">{errors.year.message}</p>}
      </div>
      <div className="col-span-full">
        <input {...register('title')} placeholder="Job Title / Milestone *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
      </div>
      <div className="col-span-full">
        <textarea {...register('description')} placeholder="Description *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary min-h-[80px] placeholder:text-text/40" />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
      </div>
      <div className="col-span-full sm:col-span-1">
        <input {...register('order')} type="number" placeholder="Order (0) *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
      </div>
      <div className="col-span-full flex justify-end">
        <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90">Save Experience</button>
      </div>
    </form>
  );
}

const skillSchema = z.object({
  id: z.string().transform(transformId).optional(),
  category: z.enum(['frontend', 'backend', 'mobile', 'cloud']),
  name: z.string().min(1, "Skill Name is required")
});
type SkillFormData = z.infer<typeof skillSchema>;

function SkillForm({ onSave }: { onSave: (payload: any) => Promise<void> }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SkillFormData>({ resolver: zodResolver(skillSchema) });

  const onSubmit = async (data: SkillFormData) => {
    await onSave(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="col-span-full sm:col-span-1">
        <input {...register('id')} placeholder="Skill ID (for edit - optional)" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
      </div>
      <div className="col-span-full sm:col-span-1">
        <select {...register('category')} className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary bg-white">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="mobile">Mobile</option>
          <option value="cloud">Cloud</option>
        </select>
        {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
      </div>
      <div className="col-span-full">
        <input {...register('name')} placeholder="Skill Name *" className="w-full rounded-xl border border-primary/20 px-4 py-2.5 outline-none focus:border-primary placeholder:text-text/40" />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
      </div>
      <div className="col-span-full flex justify-end">
        <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90">Save Skill</button>
      </div>
    </form>
  );
}
