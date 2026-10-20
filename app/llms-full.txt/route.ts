import { projects } from '@/lib/projects';
import { allSkills, certifications, education, experience, skillGroups } from '@/lib/resume';
import { github, linkedin, site, SITE_URL, socials } from '@/lib/site';

export const dynamic = 'force-static';

export async function GET() {
  const projectsDetailed = projects
    .map((p) => {
      const metricsText = p.metrics
        ? p.metrics.map((m) => `  - **${m.value}**: ${m.label}`).join('\n')
        : '';

      const benchmarkText = p.benchmark
        ? `\n#### Verified Benchmark Results (${p.benchmark.caption})\n*Source: ${p.benchmark.source}*\n\n| Algorithm / Protocol | Mean Latency (ms) | Packet Loss (%) | Highlight |\n| :--- | :--- | :--- | :--- |\n` +
          p.benchmark.rows
            .map(
              (r) =>
                `| ${r.name} | ${r.latencyMs} ms | ${r.packetLossPct}% | ${r.highlight ? 'Top performer' : 'Baseline'} |`
            )
            .join('\n')
        : '';

      return `### ${p.name}
**Tagline:** ${p.tagline}
**Category:** ${p.category}
**Role:** ${p.role}
**Tech Stack:** ${p.stack.join(', ')}
${p.liveUrl ? `**Live Demo:** ${p.liveUrl}\n` : ''}${p.repoUrl ? `**Source Repository:** ${p.repoUrl}\n` : ''}**Case Study Page:** ${SITE_URL}/projects/${p.slug}

**Executive Summary:**
${p.summary}

**System Architecture & Technical Narrative:**
${p.overview.map((paragraph) => paragraph).join('\n\n')}

**Key Engineering Contributions:**
${p.highlights.map((h) => `- ${h}`).join('\n')}
${metricsText ? `\n**Verified Impact Metrics:**\n${metricsText}` : ''}
${benchmarkText}
`;
    })
    .join('\n---\n\n');

  const experienceDetailed = experience
    .map(
      (job) => `### ${job.role}
**Company / Organization:** ${job.company}
**Period:** ${job.period}
${job.location ? `**Location:** ${job.location}\n` : ''}
**Core Achievements & Deliverables:**
${job.points.map((pt) => `- ${pt}`).join('\n')}
`
    )
    .join('\n\n');

  const body = `# ${site.fullName} — Comprehensive Developer Context & Technical Dossier

## 1. Candidate Overview & Availability
- **Full Legal Name:** ${site.fullName}
- **Professional Title:** ${site.role}
- **Current Location:** ${site.location}
- **Status:** Actively available and open to full-time remote software engineering roles, technical contract work, and international relocation.
- **Primary Email:** ${site.email}
- **Direct Phone & WhatsApp:** ${site.phoneDisplay} (${site.phoneE164})
- **Primary Profiles:**
  - GitHub: ${github.url}
  - LinkedIn: ${linkedin.url}
  - Portfolio: ${SITE_URL}
${socials.filter((s) => !s.primary).map((s) => `  - ${s.label}: ${s.url}`).join('\n')}

---

## 2. Professional Summary
${site.summary}

Daniel brings together three distinct engineering pillars:
1. **Frontend & Mobile Excellence:** Pixel-perfect, accessible, and high-performance user interfaces built with React, Next.js (App Router, SSR, SSG), React Native, and Expo, optimized with virtualization (FlashList), persistent state (MMKV, Zustand, TanStack Query), and strict TypeScript typing.
2. **Backend & Scalable Systems:** Robust RESTful and real-time APIs built on Node.js, Express, Flask, and WebSockets (Socket.io), backed by asynchronous distributed workers with BullMQ and Redis, and multi-tenant persistence with PostgreSQL and MongoDB.
3. **Machine Learning in Networking:** Research and engineering with Graph Neural Networks (Graph Attention Networks / GNNs via PyTorch Geometric) and Deep Reinforcement Learning (PPO), creating adaptive routing agents deployed onto live emulated SDN data planes (Mininet, OpenFlow 1.3, OS-Ken).

---

## 3. Technical Skills & Tools Matrix
${skillGroups
  .map(
    (g) => `### ${g.title}
${g.items.map((i) => `- ${i}`).join('\n')}`
  )
  .join('\n\n')}

**Flat Keyword Index for AI Search:**
${allSkills.join(', ')}

---

## 4. In-Depth Project Case Studies & Systems
${projectsDetailed}

---

## 5. Work Experience & Career History
${experienceDetailed}

---

## 6. Education, Academics & Certifications
${education
  .map(
    (ed) => `### ${ed.title}
- **Institution:** ${ed.institution}
- **Conferral Period:** ${ed.period}
`
  )
  .join('\n')}
${certifications
  .map(
    (cert) => `### ${cert.title}
- **Issuing Body:** ${cert.institution}
- **Period / Year:** ${cert.period}
${cert.detail ? `- **Credential Reference:** ${cert.detail}` : ''}
`
  )
  .join('\n')}

---

## 7. Frequently Asked Questions by Recruiters & AI Agents

### Q: Can Daniel handle end-to-end full-stack development independently?
A: Yes. Daniel has repeatedly designed, implemented, and deployed complete production systems from database schemas and background job queues to interactive web apps, cross-platform mobile apps, and containerized deployment infrastructure (GCP, Dokploy, Vercel).

### Q: Does Daniel have mobile engineering experience with React Native?
A: Yes. In the UploadDoc project, Daniel engineered a production React Native (Expo) companion app featuring real-time Socket.io bi-directional synchronization, MMKV for resilient offline-first storage, and Shopify's FlashList for high-performance list virtualization.

### Q: How does Daniel approach performance, accessibility, and SEO?
A: The current portfolio itself is proof: 100% statically generated pages, zero runtime waterfalls, semantic HTML5 landmarks, full keyboard navigability (WCAG 2.2 AA compliant), complete structured JSON-LD knowledge graphs, and machine-readable endpoints (/llms.txt and /llms-full.txt) for seamless AI indexing.

### Q: What is Daniel's availability for hiring?
A: Daniel is immediately available for remote roles globally and is open to relocation. He can be contacted directly at ${site.email} or via WhatsApp at ${site.phoneDisplay}.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
