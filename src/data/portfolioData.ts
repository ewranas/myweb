import {
  PersonalInfo,
  TimelineMilestone,
  SkillItem,
  ProjectItem,
  EducationMilestone,
  InterestItem,
} from '../types/portfolio';

export interface HeroSlide {
  id: number;
  label: string;
  headline: string;
  subheadline: string;
  image: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    label: '01 / ANAS.X',
    headline: 'Anas.X',
    subheadline:
      'Portfolio of Anas Ahammed — 17-year-old software developer, web builder, and cyber security learner from Natore, Bangladesh.',
    image: '/assets/images/hero_moon_skyscraper_1793472035293.jpg',
  },
  {
    id: 2,
    label: '02 / MISSION',
    headline: 'Building With Purpose',
    subheadline:
      'Turning curious ideas into structured digital platforms, student tools, and fast modern web apps.',
    image: '/assets/images/about_abstract_tech_1793472036686.jpg',
  },
  {
    id: 3,
    label: '03 / SELECTED WORK',
    headline: 'FOLAFOL & MessBoi',
    subheadline:
      'Educational hubs and practical daily utilities engineered cleanly for real student workflows.',
    image: '/assets/images/projects_arch_scene_1793472037437.jpg',
  },
  {
    id: 4,
    label: '04 / SECURITY & CRAFT',
    headline: 'Always Learning',
    subheadline:
      'Google Cybersecurity Certified · Studying Class 11 Science at Shahid AHM Kamaruzzaman College.',
    image: '/assets/images/contact_nocturne_scene_1793472038223.jpg',
  },
];

export const initialPersonalInfo: PersonalInfo = {
  name: 'Anas Ahammed',
  tagline: 'Aspiring Software Developer & Cyber Security Learner',
  headline: 'Building thoughtful web experiences & practical student software.',
  subheading:
    'I am Anas Ahammed, a 17-year-old student and developer from Natore, Bangladesh — exploring programming, web architecture, and defensive cyber security.',
  age: 17,
  birthDate: '23 June 2009',
  education: 'Class 11, HSC Batch 2028',
  college: 'Shahid AHM Kamaruzzaman College',
  stream: 'Science Group',
  location: 'Natore, Bangladesh',
  careerGoal: 'Software Developer & Security Researcher',
  interests: [
    'Cyber Security',
    'Python & Scripting',
    'Web Development',
    'UI/UX Design',
    'Technology & Research',
  ],
  bioParagraphs: [
    'Born on June 23, 2009 in Natore, Bangladesh, I started with deep curiosity about how computers, operating systems, and the internet communicate behind the scenes.',
    'Currently studying in Class 11 (Science Group, HSC Batch 2028) at Shahid AHM Kamaruzzaman College while designing and coding real-world platforms like FOLAFOL and MessBoi.',
  ],
  familyNote:
    'Behind every dream is a family that inspires it. Grateful for the constant encouragement of my parents and older sister in Natore.',
  socials: {
    email: 'anasexp10@gmail.com',
    github: 'https://github.com/zerolap657-design',
    facebook: 'https://www.facebook.com/share/1KPsNUo1Rz/',
    instagram: 'https://www.instagram.com/_mr_solstice?rpxt=MTJqMnNqcnd1cXF2dQ==',
    linkedin: 'https://linkedin.com/in/anas-ahammed',
  },
  photoUrl: '/assets/images/anas_profile_real.jpg',
};

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 't1',
    period: '2022–2025',
    title: 'Curiosity',
    phase: 'Exploring computers, systems, and internet fundamentals.',
    description:
      'Deep curiosity into hardware, operating systems, how networks communicate, and how software works beneath the surface.',
    details:
      'Developing intuition for how digital applications communicate and serve users worldwide.',
    skillsAcquired: ['Computer Fundamentals', 'Internet Systems', 'Technical Curiosity'],
  },
  {
    id: 't2',
    period: 'Programming',
    title: 'Programming Foundations',
    phase: 'Started learning Python and programming fundamentals.',
    description:
      'Writing procedural scripts, mastering control flow, algorithmic problem solving, and backend logic.',
    details:
      'Data structures, clean syntax formatting, error handling, and terminal automation tools.',
    skillsAcquired: ['Python', 'Control Flow', 'Algorithms', 'Logic Design'],
  },
  {
    id: 't3',
    period: 'Security',
    title: 'Cyber Security & Defensive Research',
    phase: 'Completed Google Cybersecurity Professional Certificate (Oct 2025).',
    description:
      'Studied defensive cyber security, Linux, SQL, threat detection with SIEM/IDS tools, and digital privacy fundamentals.',
    details: 'Verified Coursera specialization across 9 foundational security courses.',
    skillsAcquired: ['Defensive Security', 'Linux', 'SIEM & IDS', 'Digital Privacy'],
  },
  {
    id: 't4',
    period: 'Present',
    title: 'Active Building',
    phase: 'Class 11 Science & building FOLAFOL, MessBoi, and experimental interfaces.',
    description:
      'Balancing Science coursework at Shahid AHM Kamaruzzaman College with creating real digital products and web experiments.',
    details: 'Class 11 Science (HSC Batch 2028). Engineering student-focused educational tools.',
    skillsAcquired: ['Web Development', 'UI/UX', 'Product Building'],
    isCurrent: true,
  },
];

export const skillItems: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    levelStatus: 'Core Language',
    proficiencyPct: 75,
    description: 'Primary language for scripting, algorithms, automation, and security tooling.',
    keyTopics: ['Functions & Modules', 'Data Structures', 'Automation'],
    icon: 'Terminal',
    color: 'from-neutral-200 to-neutral-400',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'web',
    levelStatus: 'Semantic Markup',
    proficiencyPct: 88,
    description: 'Clean, accessible document architecture for modern web applications.',
    keyTopics: ['Semantic HTML5', 'Accessibility', 'Clean DOM'],
    icon: 'FileCode2',
    color: 'from-neutral-300 to-neutral-500',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'web',
    levelStatus: 'Modern Layouts',
    proficiencyPct: 82,
    description: 'Responsive systems with Grid, Flexbox, custom properties, and motion.',
    keyTopics: ['Flexbox & Grid', 'Responsive UI', 'Tailwind CSS'],
    icon: 'Palette',
    color: 'from-neutral-200 to-neutral-400',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'web',
    levelStatus: 'Client Logic',
    proficiencyPct: 65,
    description: 'Interactive web interfaces, asynchronous data fetching, and React UI.',
    keyTopics: ['ES6+', 'React', 'TypeScript'],
    icon: 'Code2',
    color: 'from-neutral-300 to-neutral-500',
  },
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'folafol',
    title: 'FOLAFOL',
    badge: 'Educational Technology',
    category: 'Flagship Web & Mobile Application',
    description:
      'An educational application designed to bring examination results, admission information, college resources, and student services together in one convenient platform.',
    technologies: ['Python', 'Modern Web UI', 'REST APIs', 'Education Data Hub'],
    githubUrl: 'https://github.com/zerolap657-design',
    liveDemoUrl: 'https://folafol-web.vercel.app/',
    image: '/assets/images/folafol_project_mockup_1793470981810.jpg',
    videoUrl:
      'https://res.cloudinary.com/fcsclifx/video/upload/v1793473651/WhatsApp_Video_2026-10-31_at_12.06.45_PM.mp4',
    featured: true,
    highlights: [
      'Examination Results: Centralized examination lookup across educational boards.',
      'Admission Information: College admission timelines, criteria, and requirements.',
      'College Resources: Academic lecture notes, syllabi, and reference repositories.',
      'Student Services: One-stop educational inquiry and student verification services.',
    ],
    isEditablePlaceholder: false,
  },
  {
    id: 'messboi',
    title: 'MessBoi',
    badge: 'Web Application',
    category: 'Mess & Daily Expense Management',
    description:
      'A practical digital solution for shared mess and hostel meal management — automating daily meal toggles, bazaar entries, meal rates, and member balances without paper ledgers.',
    technologies: ['React', 'Web App', 'Real-Time Sync', 'Automated Calculator'],
    githubUrl: 'https://github.com/zerolap657-design',
    liveDemoUrl: 'https://messboi1.netlify.app/',
    image: '/assets/images/dev_workspace_code_1793470982568.jpg',
    embedUrl: '/assets/aistudio/Messboi___Advertisement__16_9__d8a28287.html',
    highlights: [
      'One-tap daily lunch and dinner meal tracking with instant balance updates.',
      'Transparent bazaar expense entries, deposits, and per-member logs.',
      'Automatic monthly meal rate calculation accessible across mobile and desktop.',
    ],
    isEditablePlaceholder: false,
  },
  {
    id: 'my-introduction',
    title: 'My Introduction',
    badge: 'Portfolio Showreel',
    category: 'Interactive Audio-Visual Showreel',
    description:
      'An interactive portfolio showreel introducing Anas Ahamed — exploring software craft, digital experiences, system tools, and development vision.',
    technologies: ['Interactive Canvas', 'Audio Synthesis', 'CSS Keyframes', 'Showreel'],
    githubUrl: 'https://github.com/zerolap657-design',
    liveDemoUrl: '/assets/aistudio/ANAS_AHAMED___Portfolio_Showreel_1a936da6.html',
    image: '/assets/images/projects_arch_scene_1793472037437.jpg',
    embedUrl: '/assets/aistudio/ANAS_AHAMED___Portfolio_Showreel_1a936da6.html',
    highlights: [
      'Browser-native interactive presentation with ambient synthesized audio.',
      'Dynamic typographic scenes showcasing personal milestones and digital craft.',
      'Responsive viewport-aware layout with GPU-composited transitions.',
    ],
    isEditablePlaceholder: false,
  },
];

export const educationMilestones: EducationMilestone[] = [
  {
    id: 'kamaruzzaman-college',
    level: 'Higher Secondary Certificate (HSC)',
    institution: 'Shahid AHM Kamaruzzaman College',
    period: '2026 – 2028 (Batch 2028)',
    status: 'In Progress',
    stream: 'Science Group',
    description:
      'Class 11 Science Group student in Bangladesh, focused on Mathematics, Physics, Chemistry, and Information & Communication Technology (ICT).',
    keyFocus: [
      'Higher Mathematics',
      'Physics',
      'Information & Communication Technology (ICT)',
      'Chemistry',
      'Biology',
    ],
  },
];

export const personalInterests: InterestItem[] = [
  {
    id: 'programming',
    title: 'Cyber Security',
    description: 'Ethical security research, defensive systems, and digital privacy.',
    icon: 'Terminal',
    tags: ['Security Research', 'Privacy', 'Linux'],
  },
];
