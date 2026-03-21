'use client';

import { FormEvent, useState } from 'react';
import { Section } from '@/components/ui/Section';

export function Contact() {
  const [status, setStatus] = useState<string>('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? '')
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setStatus(response.ok ? 'Message sent.' : 'Unable to send message.');
    if (response.ok) event.currentTarget.reset();
  };

  return (
    <Section id="contact" title="Contact">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft text-sm text-text/80">
          <p>Email: <a href="mailto:danielagbeni12@gmail.com" className="text-primary">danielagbeni12@gmail.com</a></p>
          <p className="mt-2">GitHub: <a href="https://github.com" className="text-primary">github.com/daniel</a></p>
          <p className="mt-2">LinkedIn: <a href="https://linkedin.com" className="text-primary">linkedin.com/in/daniel</a></p>
        </div>
        <form onSubmit={submit} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft space-y-3">
          <input name="name" required placeholder="Name" className="w-full rounded-xl border border-primary/20 px-3 py-2" />
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-primary/20 px-3 py-2" />
          <textarea name="message" required placeholder="Message" rows={4} className="w-full rounded-xl border border-primary/20 px-3 py-2" />
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white" type="submit">Send</button>
          {status ? <p className="text-xs text-text/70">{status}</p> : null}
        </form>
      </div>
    </Section>
  );
}
