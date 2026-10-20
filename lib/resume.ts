/**
 * CV content: experience, skills, education and credentials.
 * Mirrors the PDF résumé so the site, the /resume page and structured data
 * never drift apart.
 */

export interface ExperienceEntry {
  role: string;
  company: string;
  location?: string;
  /** ISO-ish dates for <time dateTime>. */
  start: string;
  end?: string;
  /** Human-readable period, e.g. "Sep 2024 – Jan 2025". */
  period: string;
  points: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface EducationEntry {
  title: string;
  institution: string;
  period: string;
  detail?: string;
}

export const experience: readonly ExperienceEntry[] = [
  {
    role: 'Independent Full-Stack Developer',
    company: 'Self-employed',
    location: 'Remote',
    start: '2023',
    period: '2023 – Present',
    points: [
      'Shipped production web and cross-platform mobile apps using Next.js, React Native, Node.js and PostgreSQL/MongoDB.',
      'Implemented role-based access control (RBAC), JWT authentication and real-time synchronisation via WebSockets.',
      'Built asynchronous background workers with BullMQ and Redis; deployed with Dokploy on GCP and on Vercel.',
    ],
  },
  {
    role: 'Frontend Developer & Technical Instructor',
    company: 'Barry Tech',
    start: '2024-09',
    end: '2025-01',
    period: 'Sep 2024 – Jan 2025',
    points: [
      'Designed and delivered a full web development curriculum, improving student project quality by 60% in 4 months.',
      'Mentored 30+ students on production React patterns, state management, Git workflows and code review.',
    ],
  },
  {
    role: 'JavaScript & React Instructor',
    company: 'Swebs Coding Institute',
    start: '2024-03',
    end: '2024-08',
    period: 'Mar 2024 – Aug 2024',
    points: [
      'Taught modern JavaScript through advanced React, achieving a 90% project completion rate.',
      'Restructured onboarding and curriculum, reducing student ramp-up time by 30%.',
    ],
  },
];

export const skillGroups: readonly SkillGroup[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'SQL (PostgreSQL)', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend & Mobile',
    items: ['React.js', 'Next.js', 'React Native', 'Expo', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'Redux Toolkit', 'React Hook Form', 'Zod'],
  },
  {
    title: 'Backend & Systems',
    items: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets (Socket.io)', 'BullMQ', 'Redis', 'Flask'],
  },
  {
    title: 'Databases & Cloud',
    items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Cloudflare R2', 'AWS', 'GCP', 'Dokploy', 'Vercel', 'Git & GitHub', 'CI/CD'],
  },
  {
    title: 'Core Concepts',
    items: ['RBAC', 'JWT Authentication', 'Job Queues', 'SSR / SSG', 'Graph Neural Networks (PyTorch Geometric)', 'Reinforcement Learning'],
  },
];

export const education: readonly EducationEntry[] = [
  {
    title: 'Higher National Diploma (HND), Networking & Cloud Computing',
    institution: 'Federal Polytechnic Ado-Ekiti',
    period: 'Graduated 2026',
  },
  {
    title: 'National Diploma (ND), Computer Science',
    institution: 'Federal Polytechnic Ado-Ekiti',
    period: '2021 – 2023',
  },
];

export const certifications: readonly EducationEntry[] = [
  {
    title: 'Graduate Member (GMCPN)',
    institution: 'Computer Professionals Registration Council of Nigeria',
    period: '2026',
    detail: 'Certificate No. GM/0014969/2026',
  },
];

/** Flat, de-duplicated skill list for structured data (`knowsAbout`). */
export const allSkills: readonly string[] = [...new Set(skillGroups.flatMap((group) => group.items))];
