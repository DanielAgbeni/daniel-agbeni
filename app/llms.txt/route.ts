import { projects } from '@/lib/projects';
import { certifications, education, experience, skillGroups } from '@/lib/resume';
import { github, linkedin, site, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export async function GET() {
  const skillsText = skillGroups
    .map((group) => `- **${group.title}**: ${group.items.join(', ')}`)
    .join('\n');

  const projectsText = projects
    .map(
      (p) =>
        `- [${p.name}](${SITE_URL}/projects/${p.slug}): ${p.tagline}. Tech stack: ${p.stack.join(', ')}. ${p.liveUrl ? `Live: ${p.liveUrl}` : ''}${p.repoUrl ? ` Code: ${p.repoUrl}` : ''}`.trim()
    )
    .join('\n');

  const experienceText = experience
    .map(
      (e) =>
        `### ${e.role} — ${e.company} (${e.period})\n${e.points.map((pt) => `- ${pt}`).join('\n')}`
    )
    .join('\n\n');

  const eduText = [
    ...education.map((ed) => `- **${ed.title}**, ${ed.institution} (${ed.period})`),
    ...certifications.map(
      (c) => `- **${c.title}**, ${c.institution} (${c.detail ?? c.period})`
    ),
  ].join('\n');

  const body = `# ${site.fullName} — ${site.role}

> ${site.summary}

- **Name**: ${site.fullName}
- **Role**: ${site.role}
- **Location**: ${site.location} (${site.availability})
- **Email**: ${site.email}
- **Phone / WhatsApp**: ${site.phoneDisplay} (${site.phoneE164})
- **GitHub**: ${github.url}
- **LinkedIn**: ${linkedin.url}
- **Portfolio Website**: ${SITE_URL}

---

## Machine-Readable Resources & Deep Context
- [Complete Context for LLMs & AI Agents](${SITE_URL}/llms-full.txt): Comprehensive technical dossier, benchmark verification data, detailed architecture breakdowns, and full CV points.
- [Curriculum Vitae / Resume](${SITE_URL}/resume): Structured CV view with print/PDF layout.
- [Sitemap](${SITE_URL}/sitemap.xml): Full site index including individual project case-study URLs.

---

## Technical Competencies
${skillsText}

---

## Selected Projects
${projectsText}

---

## Work Experience
${experienceText}

---

## Education & Certifications
${eduText}

---

## Contact Information
- Direct Email: ${site.email}
- WhatsApp / Phone: ${site.phoneDisplay}
- LinkedIn: ${linkedin.url}
- GitHub: ${github.url}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
