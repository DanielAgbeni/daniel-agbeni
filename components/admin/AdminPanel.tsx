'use client';

import { signOut } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';

type Content = {
  stackMatrix: any[];
  registry: any[];
  systemLogs: any[];
};

const initialContent: Content = { stackMatrix: [], registry: [], systemLogs: [] };

export default function AdminPanel() {
  const [content, setContent] = useState<Content>(initialContent);

  const load = async () => {
    const res = await fetch('/api/content');
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
    return storageRes.json();
  };

  return (
    <main className="admin-wrap form-grid">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Console</h1>
        <button className="btn ghost" onClick={() => signOut({ callbackUrl: '/admin/login' })}>Sign out</button>
      </div>

      <section className="card form-grid">
        <h2>Stack_Matrix</h2>
        <StackForm onSave={(payload) => save('stackMatrix', payload)} />
        {content.stackMatrix.map((item) => (
          <div key={item._id}>
            {item.category} - {item.name}
            <button className="btn ghost" onClick={() => remove('stackMatrix', item._id)}>Delete</button>
          </div>
        ))}
      </section>

      <section className="card form-grid">
        <h2>Registry</h2>
        <RegistryForm
          onSave={(payload) => save('registry', payload)}
          onUpload={uploadImage}
        />
        {content.registry.map((item) => (
          <div key={item._id}>
            {item.title}
            <button className="btn ghost" onClick={() => remove('registry', item._id)}>Delete</button>
          </div>
        ))}
      </section>

      <section className="card form-grid">
        <h2>System Logs</h2>
        <LogForm onSave={(payload) => save('systemLogs', payload)} />
        {content.systemLogs.map((item) => (
          <div key={item._id}>
            {item.year} - {item.title}
            <button className="btn ghost" onClick={() => remove('systemLogs', item._id)}>Delete</button>
          </div>
        ))}
      </section>
    </main>
  );
}

function StackForm({ onSave }: { onSave: (payload: unknown) => Promise<void> }) {
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await onSave({
      category: form.get('category'),
      name: form.get('name'),
      level: form.get('level') || undefined,
      order: Number(form.get('order') || 0)
    });
    e.currentTarget.reset();
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <input name="category" placeholder="Frontend" required />
      <input name="name" placeholder="Next.js" required />
      <input name="level" placeholder="Advanced" />
      <input name="order" type="number" placeholder="0" />
      <button className="btn primary" type="submit">Add Stack Item</button>
    </form>
  );
}

function LogForm({ onSave }: { onSave: (payload: unknown) => Promise<void> }) {
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await onSave({
      year: Number(form.get('year')),
      title: form.get('title'),
      details: form.get('details'),
      order: Number(form.get('order') || 0)
    });
    e.currentTarget.reset();
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <input name="year" type="number" placeholder="2026" required />
      <input name="title" placeholder="Built portfolio v2" required />
      <textarea name="details" placeholder="System update details" required />
      <input name="order" type="number" placeholder="0" />
      <button className="btn primary" type="submit">Add Log</button>
    </form>
  );
}

function RegistryForm({
  onSave,
  onUpload
}: {
  onSave: (payload: unknown) => Promise<void>;
  onUpload: (file: File) => Promise<{ storageId: string }>; 
}) {
  const [uploading, setUploading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    let storageId: string | undefined;
    const file = form.get('image') as File;

    if (file?.size) {
      setUploading(true);
      const result = await onUpload(file);
      storageId = result.storageId;
      setUploading(false);
    }

    await onSave({
      title: form.get('title'),
      summary: form.get('summary'),
      tags: String(form.get('tags') ?? '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      liveUrl: form.get('liveUrl') || undefined,
      sourceUrl: form.get('sourceUrl') || undefined,
      imageStorageId: storageId,
      imageUrl: form.get('imageUrl') || undefined,
      featured: form.get('featured') === 'on',
      order: Number(form.get('order') || 0)
    });
    e.currentTarget.reset();
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <input name="title" placeholder="Project name" required />
      <textarea name="summary" placeholder="Project summary" required />
      <input name="tags" placeholder="Next.js, Convex, Tailwind" required />
      <input name="liveUrl" placeholder="https://project.live" />
      <input name="sourceUrl" placeholder="https://github.com/..." />
      <input name="imageUrl" placeholder="Optional direct image URL" />
      <input name="image" type="file" accept="image/*" />
      <label><input name="featured" type="checkbox" /> Featured</label>
      <input name="order" type="number" placeholder="0" />
      <button className="btn primary" type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Add Registry Item'}</button>
    </form>
  );
}
