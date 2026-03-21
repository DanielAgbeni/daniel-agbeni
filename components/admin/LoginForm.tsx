'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('danielagbeni12@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="card form-grid"
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
          email,
          password,
          redirect: true,
          callbackUrl: '/admin'
        });
        if (result?.error) setError('Invalid credentials');
      }}
    >
      <h1>Admin Login</h1>
      <p className="muted">Only {`danielagbeni12@gmail.com`} can access.</p>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Admin password" />
      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}
      <button className="btn primary" type="submit">Sign in</button>
    </form>
  );
}
