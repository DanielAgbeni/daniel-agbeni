'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('danielagbeni12@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="mx-auto mt-20 grid w-full max-w-md gap-3 rounded-2xl border border-primary/10 bg-white p-6 shadow-soft"
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });
        if (result?.error) {
          setError('Invalid credentials');
        } else if (result?.ok) {
          window.location.href = '/admin';
        }
      }}
    >
      <h1 className="font-heading text-2xl font-bold">Admin Login</h1>
      <p className="text-sm text-text/70">Only danielagbeni12@gmail.com can access this area.</p>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="rounded-xl border border-primary/20 px-3 py-2" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Admin password" className="rounded-xl border border-primary/20 px-3 py-2" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white" type="submit">Sign in</button>
    </form>
  );
}
