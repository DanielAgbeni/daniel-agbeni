import { getProject, projects, type Project } from '@/lib/projects';
import { allSkills, certifications, education } from '@/lib/resume';
import { SITE_URL, site, socials } from '@/lib/site';
import portrait from '@/asset/danielagbeni.png';

/**
 * schema.org JSON-LD builders. Stable `@id`s let Google stitch the Person,
 * WebSite, ProfilePage and project nodes into one knowledge graph.
 */

type JsonLdNode = Record<string, unknown>;

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const portraitUrl = `${SITE_URL}${portrait.src}`;

const schoolNode = {
  '@type': 'CollegeOrUniversity',
  name: 'Federal Polytechnic Ado-Ekiti',
  address: { '@type': 'PostalAddress', addressLocality: 'Ado-Ekiti', addressRegion: 'Ekiti', addressCountry: 'NG' },
};

export function personNode(): JsonLdNode {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    alternateName: site.fullName,
    givenName: site.givenName,
    familyName: site.familyName,
    jobTitle: site.role,
    description: site.shortBio,
    url: SITE_URL,
    image: portraitUrl,
    email: `mailto:${site.email}`,
    telephone: site.phoneE164,
    address: { '@type': 'PostalAddress', addressCountry: 'NG' },
    alumniOf: schoolNode,
    knowsAbout: allSkills,
    hasCredential: [...education, ...certifications].map((item) => ({
      '@type': 'EducationalOccupationalCredential',
      name: item.title,
      credentialCategory: item.title.includes('Diploma') ? 'degree' : 'certification',
      recognizedBy: { '@type': 'Organization', name: item.institution },
    })),
    hasOccupation: {
      '@type': 'Occupation',
      name: site.role,
      occupationLocation: { '@type': 'Country', name: 'Nigeria' },
      skills: allSkills.join(', '),
    },
    knowsLanguage: ['en', 'English'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'recruitment and freelance inquiries',
      email: site.email,
      telephone: site.phoneE164,
      availableLanguage: ['English'],
    },
    sameAs: [...socials.map((social) => social.url), `${SITE_URL}/llms.txt`],
  };
}

function projectUrl(project: Project): string {
  return `${SITE_URL}/projects/${project.slug}`;
}

function projectNode(project: Project): JsonLdNode {
  const base: JsonLdNode = {
    '@id': `${projectUrl(project)}#work`,
    name: `${project.name}: ${project.tagline}`,
    description: project.summary,
    url: projectUrl(project),
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    keywords: [...project.stack, ...project.keywords].join(', '),
    genre: project.category,
    ...(project.image ? { image: `${SITE_URL}${project.image}` } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  };

  if (project.repoUrl) {
    return {
      ...base,
      '@type': 'SoftwareSourceCode',
      codeRepository: project.repoUrl,
      programmingLanguage: project.stack.filter((tech) => ['Python', 'TypeScript', 'JavaScript'].includes(tech)),
    };
  }
  if (project.liveUrl) {
    return {
      ...base,
      '@type': 'WebApplication',
      applicationCategory: project.category,
      operatingSystem: 'All',
    };
  }
  return { ...base, '@type': 'CreativeWork' };
}

/** Graph for the home page: who Daniel is, the site, and his work. */
export function homeGraph(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(),
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: `${site.name} | ${site.role}`,
        inLanguage: 'en',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: `${site.name}, ${site.role}`,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        about: { '@id': PERSON_ID },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#projects`,
        name: `Projects by ${site.name}`,
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: projectUrl(project),
          name: project.name,
        })),
      },
      ...projects.map(projectNode),
    ],
  };
}

export function projectGraph(slug: string): JsonLdNode | null {
  const project = getProject(slug);
  if (!project) return null;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...projectNode(project), isPartOf: { '@id': WEBSITE_ID } },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.name, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
          { '@type': 'ListItem', position: 3, name: project.name, item: projectUrl(project) },
        ],
      },
    ],
  };
}

export function resumeGraph(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(),
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/resume#page`,
        url: `${SITE_URL}/resume`,
        name: `${site.name} résumé`,
        mainEntity: { '@id': PERSON_ID },
      },
    ],
  };
}

/** Serialise safely for an inline <script>, escaping `<` to block tag injection. */
export function serializeJsonLd(data: JsonLdNode): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
