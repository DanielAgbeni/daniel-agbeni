# Daniel Portfolio (Next.js + Convex)

Portfolio website inspired by the SYS_ARCHITECT design and backed by Convex.

## Features

- Public portfolio homepage matching the provided visual direction.
- Convex database schema for:
  - `stackMatrix`
  - `registry`
  - `systemLogs`
- Registry storage bucket support via Convex file uploads.
- `/admin` console with login protection (email-restricted to `danielagbeni12@gmail.com`) for dynamic updates.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env:
   ```bash
   cp .env.example .env.local
   ```
3. Fill values in `.env.local`.
4. Run Convex dev in another terminal:
   ```bash
   npx convex dev
   ```
5. Start Next app:
   ```bash
   npm run dev
   ```

## Admin Access

- Visit `/admin/login`.
- Authenticate using:
  - email: `danielagbeni12@gmail.com`
  - password: `ADMIN_PASSWORD`

## Convex notes

Convex functions are in `/convex`:

- `stackMatrix.js`
- `registry.js`
- `systemLogs.js`
- `schema.ts`
