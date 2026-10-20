# Daniel Agbeni — Portfolio

Portfolio and printable CV for **Daniel Agbeni Oluwafemi** ([danielagbeni.algiz.tech](https://danielagbeni.algiz.tech)), Full-Stack Software Developer.

## Architecture

- **Framework:** Next.js 15 App Router + TypeScript (100% static generation, zero backend dependencies)
- **Styling:** Tailwind CSS with CSS custom-property design tokens and `next-themes` dark/light mode
- **Content:** Typed static data modules in [`lib/site.ts`](./lib/site.ts), [`lib/projects.ts`](./lib/projects.ts), and [`lib/resume.ts`](./lib/resume.ts)
- **SEO:** Rich `schema.org` JSON-LD knowledge graph (`Person`, `WebSite`, `ProfilePage`, `ItemList`, `SoftwareSourceCode`, `BreadcrumbList`), dynamic OpenGraph social cards (`next/og`), `sitemap.xml`, `robots.txt`, and individual project case-study routes (`/projects/[slug]`)
- **Printable CV:** Dedicated `/resume` route with `@media print` A4 stylesheet

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm start
```
