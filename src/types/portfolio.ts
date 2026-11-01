export interface SocialLinks {
  email: string;
  github: string;
  facebook: string;
  instagram: string;
  linkedin?: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  headline: string;
  subheading: string;
  age: number;
  birthDate: string; // "June 23, 2009"
  education: string; // "Class 11 (HSC Batch 2028)"
  college: string; // "Shahid AHM Kamaruzzaman College, Bangladesh"
  stream: string; // "Science Group"
  location: string; // "Natore, Bangladesh"
  careerGoal: string; // "Software Developer"
  interests: string[];
  bioParagraphs: string[];
  familyNote: string;
  socials: SocialLinks;
  photoUrl: string;
}

export interface TimelineMilestone {
  id: string;
  period: string;
  title: string;
  phase: string;
  description: string;
  details: string;
  skillsAcquired: string[];
  isCurrent?: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'languages' | 'web' | 'fundamentals' | 'exploration';
  levelStatus: string; // e.g. "Learning & Practicing", "Foundational", "Exploring"
  proficiencyPct: number; // visual representation of learning progress, e.g. 65%
  description: string;
  keyTopics: string[];
  icon: string;
  color: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  category: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  image: string;
  videoUrl?: string;
  embedUrl?: string;
  featured?: boolean;
  highlights: string[];
  isEditablePlaceholder?: boolean;
}

export interface EducationMilestone {
  id: string;
  level: string;
  institution: string;
  period: string;
  status: 'In Progress' | 'Completed' | 'Upcoming';
  stream: string;
  description: string;
  keyFocus: string[];
}

export interface InterestItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}
