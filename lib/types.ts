export type SkillCategory = 'frontend' | 'backend' | 'mobile' | 'cloud';

export type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  imageId: string;
  imageUrl?: string | null;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: number;
};

export type Service = {
  _id: string;
  title: string;
  description: string;
  icon: string;
};

export type Experience = {
  _id: string;
  year: string;
  title: string;
  description: string;
  order: number;
};

export type Skill = {
  _id: string;
  category: SkillCategory;
  name: string;
};

export type PortfolioContent = {
  projects: Project[];
  services: Service[];
  experience: Experience[];
  skills: Skill[];
};
