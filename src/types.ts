export interface ProjectMedia {
  src: string;
  label: string;
  type: 'image' | 'video';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images: ProjectMedia[];
  tags: string[];
  demoUrl: string | null;
  codeUrl: string | null;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period?: string;
}

export interface CertificationItem {
  title: string;
  year: string;
  issuer?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Profile {
  text: string;
}