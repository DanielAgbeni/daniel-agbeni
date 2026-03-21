# Daniel Agbeni Portfolio (Next.js + Convex)

Production-ready one-page portfolio with a tech-focused UI and Convex-backed CMS.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS + Framer Motion
- Convex (data tables, file storage, and mutations)
- NextAuth protected `/admin`

## Convex Tables

- `projects`
- `services`
- `experience`
- `skills`
- `contacts`

## Run locally

```bash
npm install
npx convex dev
npm run dev
```

Set `NEXT_PUBLIC_CONVEX_URL`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `.env.local`.
