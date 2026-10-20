/**
 * Static project catalogue. Each entry renders a card on the home page and
 * a statically generated case-study page at /projects/[slug].
 */

export type ProjectCategory = 'Machine Learning & Networking' | 'Full-Stack Web & Mobile' | 'Frontend' | 'Backend & DevOps' | 'E-Commerce';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface BenchmarkRow {
  name: string;
  latencyMs: number;
  packetLossPct: number;
  highlight?: boolean;
}

export interface Benchmark {
  caption: string;
  source: string;
  rows: BenchmarkRow[];
}

export interface Project {
  slug: string;
  name: string;
  /** One-line positioning statement, used in cards and meta titles. */
  tagline: string;
  /** ~155 character summary, used for meta descriptions. */
  summary: string;
  /** Longer narrative for the case-study page. */
  overview: string[];
  category: ProjectCategory;
  role: string;
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Path under /public. Optional: a styled cover renders when absent. */
  image?: string;
  featured: boolean;
  /** Extra search terms for this project's page. */
  keywords: string[];
  /** Headline results, only when backed by real measurements. */
  metrics?: ProjectMetric[];
  benchmark?: Benchmark;
}

export const projects: readonly Project[] = [
  {
    slug: 'garro',
    name: 'GARRO',
    tagline: 'Graph Attention Routing with Reinforcement Learning',
    summary:
      'A Graph Attention Network and PPO agent that optimises network path selection for latency, throughput and packet loss on live Mininet emulation.',
    overview: [
      'Classic routing protocols such as OSPF and ECMP rely on static metrics like hop count, so they struggle with microbursts and uneven traffic. GARRO is an end-to-end deep reinforcement learning routing framework for software-defined networks that replaces those static heuristics with a topology-aware agent.',
      'A Graph Attention Network encodes the live network state (node load, link utilisation and delay), and a Proximal Policy Optimization (PPO) agent learns how to distribute traffic over the K shortest paths while balancing latency, throughput, packet loss and queue variance.',
      'Training happens in a fast digital twin built on an M/M/1/K queueing model with Poisson microburst traffic across NSFNET, GEANT2 and Fat-Tree topologies. The trained policy is then deployed in closed loop on a live Mininet network through a custom OS-Ken OpenFlow 1.3 controller with a real-time web dashboard.',
      'An LLM intent orchestrator translates operator requests such as “prioritise low latency for video calls” into reward weights in real time, without retraining the network.',
    ],
    category: 'Machine Learning & Networking',
    role: 'Researcher & sole engineer',
    stack: ['Python', 'PyTorch Geometric', 'Reinforcement Learning (PPO)', 'Mininet', 'OS-Ken', 'OpenFlow 1.3', 'Flask', 'LLM orchestration'],
    highlights: [
      'Built a Graph Attention Network and PPO agent that optimises path selection for latency, throughput and packet loss on live Mininet emulation.',
      'Engineered an OpenFlow 1.3 SDN controller on OS-Ken that applies the agent’s routing decisions to the live network.',
      'Built an LLM orchestrator that turns natural-language intent into reward weights for the agent.',
      'Benchmarked against OSPF and ECMP over 500 episodes.',
    ],
    repoUrl: 'https://github.com/DanielAgbeni/GARRO',
    featured: true,
    keywords: ['graph attention network', 'reinforcement learning routing', 'PPO', 'software-defined networking', 'SDN', 'OpenFlow', 'Mininet', 'PyTorch Geometric', 'GNN routing'],
    metrics: [
      { value: '55%', label: 'lower path latency than OSPF' },
      { value: '45%', label: 'lower path latency than ECMP' },
      { value: '14.6×', label: 'lower packet loss than OSPF' },
    ],
    benchmark: {
      caption: 'Fat-Tree data-centre network (k=4, 20 switches, 32 links)',
      source: 'Evaluation of the 20k-episode checkpoint, from the GARRO repository README.',
      rows: [
        { name: 'GARRO', latencyMs: 35.73, packetLossPct: 0.063, highlight: true },
        { name: 'Hedera', latencyMs: 36.15, packetLossPct: 0.129 },
        { name: 'ECMP (hash)', latencyMs: 64.6, packetLossPct: 0.732 },
        { name: 'OSPF', latencyMs: 80.5, packetLossPct: 0.921 },
        { name: 'ECMP-Detour', latencyMs: 118.77, packetLossPct: 1.474 },
        { name: 'Random', latencyMs: 123.35, packetLossPct: 1.652 },
      ],
    },
  },
  {
    slug: 'uploaddoc',
    name: 'UploadDoc',
    tagline: 'Document management platform & companion mobile app',
    summary:
      'An end-to-end document submission platform with role-based access, JWT auth, secure PDF uploads to Cloudflare R2 and a real-time React Native companion app.',
    overview: [
      'UploadDoc is a document submission and management platform used by three roles: administrators, users and vendors. Users submit documents, vendors process them and administrators oversee the whole pipeline.',
      'The web platform is built with Next.js and a Node.js API backed by MongoDB. Access is enforced with role-based access control and JWT authentication, and PDFs are uploaded securely to Cloudflare R2 object storage.',
      'The React Native (Expo) companion app keeps users in sync in real time over Socket.io, stores data offline with MMKV and renders long document lists smoothly with FlashList.',
    ],
    category: 'Full-Stack Web & Mobile',
    role: 'Full-stack & mobile developer',
    stack: ['Next.js', 'React Native', 'Expo', 'TypeScript', 'Node.js', 'MongoDB', 'Cloudflare R2', 'Socket.io', 'MMKV', 'FlashList', 'JWT'],
    highlights: [
      'Built the end-to-end submission platform with RBAC for Admin, User and Vendor roles and JWT authentication.',
      'Implemented secure PDF uploads to Cloudflare R2 object storage.',
      'Developed the React Native companion app with real-time Socket.io sync.',
      'Added MMKV offline storage and FlashList list virtualisation for fast, resilient mobile UX.',
    ],
    liveUrl: 'https://uploaddoc.space',
    image: '/projects/uploaddoc.png',
    featured: true,
    keywords: ['document management platform', 'RBAC', 'JWT authentication', 'Cloudflare R2', 'React Native app', 'Socket.io', 'Expo'],
  },
  {
    slug: 'jlance',
    name: 'JLance',
    tagline: 'Managed project delivery platform',
    summary:
      'Frontend for a freelance project delivery platform that turns client ideas into AI-structured briefs and fixed-price proposals.',
    overview: [
      'JLance is a managed project delivery platform. Instead of browsing freelancer profiles, clients describe an idea and the platform turns it into an AI-structured project brief and a fixed-price proposal.',
      'I built the frontend: the client-facing flows that capture an idea, present the structured brief and walk the client through the proposal.',
    ],
    category: 'Frontend',
    role: 'Frontend developer',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    highlights: [
      'Built the frontend of a freelance project delivery platform.',
      'Implemented the flows that turn client ideas into AI-structured briefs and fixed-price proposals.',
    ],
    liveUrl: 'https://jlance.app',
    image: '/projects/jlance.png',
    featured: false,
    keywords: ['freelance platform', 'AI project brief', 'managed project delivery', 'Next.js frontend'],
  },
  {
    slug: 'expo-custom-build-server',
    name: 'Expo Custom Build Server',
    tagline: 'Self-hosted build pipeline for Expo apps',
    summary:
      'A self-hosted build server that accepts Expo project uploads and queues native builds with BullMQ and Redis behind JWT-protected REST endpoints.',
    overview: [
      'Expo Custom Build Server is a self-hosted alternative to a managed build service. Developers upload an Expo project, and the server queues and runs the native build.',
      'Builds are processed asynchronously by BullMQ workers backed by Redis, so the API stays responsive while long-running jobs execute. Uploads are handled with Multer, build metadata is stored in MongoDB via Mongoose, and every REST endpoint is protected with JWT authentication.',
      'The service is written in TypeScript on Express 5 and ships with PM2 process configuration, an Nginx reverse-proxy config and a deploy script for running on a VPS.',
    ],
    category: 'Backend & DevOps',
    role: 'Backend developer',
    stack: ['Node.js', 'TypeScript', 'Express.js', 'BullMQ', 'Redis', 'MongoDB', 'Mongoose', 'JWT', 'PM2', 'Nginx'],
    highlights: [
      'Built a self-hosted server that accepts Expo uploads and queues builds.',
      'Processed builds asynchronously with BullMQ workers and Redis.',
      'Protected all REST endpoints with JWT authentication.',
      'Packaged for VPS deployment with PM2 and an Nginx reverse proxy.',
    ],
    repoUrl: 'https://github.com/DanielAgbeni/expo-custom-build-server',
    featured: false,
    keywords: ['Expo build server', 'self-hosted CI', 'BullMQ', 'Redis job queue', 'Express API'],
  },
  {
    slug: 'buabed-banafa-perfumes',
    name: 'Buabed Banafa Perfumes',
    tagline: 'SEO-first e-commerce storefront',
    summary:
      'A server-rendered Next.js storefront built for SEO and fast loads, with Zustand cart state, TanStack Query data sync and a PostgreSQL backend.',
    overview: [
      'Buabed Banafa Perfumes is an online storefront for a fragrance brand. Search visibility and page speed were the priorities, so product and catalogue pages are rendered with SSR and SSG.',
      'Cart state lives in Zustand and server data is synchronised with TanStack Query, keeping the shopping experience responsive while the catalogue stays fresh.',
    ],
    category: 'E-Commerce',
    role: 'Full-stack developer',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Zustand', 'TanStack Query'],
    highlights: [
      'Built an SSR/SSG storefront for strong SEO and fast page loads.',
      'Managed cart state with Zustand.',
      'Synchronised product data with TanStack Query.',
    ],
    liveUrl: 'https://new.buabedbanafa.com',
    image: '/projects/buabed-banafa.png',
    featured: false,
    keywords: ['Next.js e-commerce', 'perfume store', 'SSR SSG storefront', 'Zustand cart', 'TanStack Query'],
  },
];

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

export function getProject(slug: string): Project | undefined {
  return projectsBySlug.get(slug);
}

export function projectUrlLabel(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
