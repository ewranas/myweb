import {
  PersonalInfo,
  TimelineMilestone,
  SkillItem,
  ProjectItem,
  EducationMilestone,
  InterestItem,
} from '../types/portfolio';

export const initialPersonalInfo: PersonalInfo = {
  name: 'ANAS AHAMMED',
  tagline: 'DEVELOPER & DIGITAL CREATOR',
  headline: 'Developer & Digital Creator.',
  subheading:
    "I'm a young developer from Bangladesh, exploring technology and building meaningful digital experiences.",
  age: 17,
  birthDate: '23 June 2009',
  education: 'Class 11, HSC Batch 2028',
  college: 'Shahid AHM Kamaruzzaman College',
  stream: 'Science Group',
  location: 'Natore, Bangladesh',
  careerGoal: 'Software Developer',
  interests: [
    'Programming',
    'Software Development',
    'Exploring Technology',
    'Learning New Skills',
    'Building Digital Products',
    'Computers and the Internet',
  ],
  bioParagraphs: [
    "Hi, I'm Anas Ahammed.",
    'I\'m a 17-year-old student currently studying in Class 11 at Shahid AHM Kamaruzzaman College in Bangladesh.',
    'My curiosity about computers and the internet gradually developed into a passion for programming and software development.',
    'I enjoy exploring new technologies, learning programming, and creating useful digital experiences.',
    'My goal is to become a skilled software developer and build products that make a meaningful difference.',
  ],
  familyNote:
    'Behind every dream is a family that inspires it.\n\nI am grateful to have a family of four — my father, mother, older sister, and me. Their support motivates me to keep learning, growing, and working toward my dreams.',
  socials: {
    email: 'anasexp10@gmail.com',
    github: 'https://github.com/zerolap657-design',
    facebook: 'https://www.facebook.com/share/1KPsNUo1Rz/',
    instagram: 'https://www.instagram.com/_mr_solstice?rpxt=MTJqMnNqcnd1cXF2dQ==',
    linkedin: 'https://linkedin.com/in/anas-ahammed',
  },
  photoUrl: '/assets/images/anas_profile_real.jpg',
};

export interface HeroSlide {
  id: number;
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  actionText: string;
  actionTarget: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    tagline: '01 / CREATIVE DEVELOPER',
    title: 'ANAS AHAMMED',
    subtitle: 'Developer & Digital Creator.',
    description:
      "I'm a young developer from Bangladesh, exploring technology and building meaningful digital experiences.",
    backgroundImage: '/assets/images/hero_moon_skyscraper_1793472035293.jpg',
    actionText: 'Explore My Work',
    actionTarget: '#projects',
  },
  {
    id: 2,
    tagline: '02 / PHILOSOPHY',
    title: 'A Curious Mind.',
    subtitle: 'Driven by Code & Exploration.',
    description:
      "I'm a 17-year-old student passionate about programming, technology, and building meaningful digital experiences.",
    backgroundImage: '/assets/images/about_abstract_tech_1793472036686.jpg',
    actionText: 'Read My Story',
    actionTarget: '#about',
  },
  {
    id: 3,
    tagline: '03 / FLAGSHIP CREATION',
    title: 'Selected Work.',
    subtitle: 'FOLAFOL Educational Platform.',
    description:
      'Exploring ideas. Building digital experiences for students across Bangladesh.',
    backgroundImage: '/assets/images/projects_arch_scene_1793472037437.jpg',
    actionText: 'View Projects',
    actionTarget: '#projects',
  },
  {
    id: 4,
    tagline: '04 / DIALOGUE',
    title: "Let's Connect.",
    subtitle: 'Collaborate & Build.',
    description:
      "Have an idea? Let's create something meaningful together.",
    backgroundImage: '/assets/images/contact_nocturne_scene_1793472038223.jpg',
    actionText: 'Get in Touch',
    actionTarget: '#contact-modal',
  },
];

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 't1',
    period: '2022–2025',
    title: 'Curiosity',
    phase: 'Exploring computers and technology.',
    description:
      'Deep exploration into hardware, operating systems, internet protocols, and software fundamentals.',
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
    period: 'Development',
    title: 'Web & Software Engineering',
    phase: 'Exploring software development and web technologies.',
    description:
      'Bridging computational thinking with intuitive user interfaces using modern web standards.',
    details:
      'HTML5 semantic markup, modern CSS styling systems, JavaScript, and modular web architecture.',
    skillsAcquired: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
  },
  {
    id: 't4',
    period: 'Present',
    title: 'Active Development',
    phase: 'Studying in Class 11 and continuing my development journey.',
    description:
      'Balancing Science coursework at Shahid AHM Kamaruzzaman College with creating FOLAFOL.',
    details:
      'Class 11 Science (HSC Batch 2028). Engineering student-focused educational tools.',
    skillsAcquired: ['Full-stack Foundations', 'App Prototyping', 'Product Design'],
    isCurrent: true,
  },
  {
    id: 't5',
    period: 'Future',
    title: 'Horizon',
    phase: 'Aspiring to become a professional software developer.',
    description:
      'Pursuing university Computer Science & Engineering and engineering impactful digital products.',
    details:
      'Targeting scalable system architecture, open-source innovations, and meaningful tech ventures.',
    skillsAcquired: ['Software Engineering', 'System Architecture', 'Impactful Innovation'],
  },
];

export const skillItems: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    levelStatus: 'Core Language · Active Practice',
    proficiencyPct: 75,
    description:
      'Primary language for foundational algorithms, backend automation, scripts, and computational logic.',
    keyTopics: ['Functions & Modules', 'Data Structures', 'File Handling', 'Logic Building'],
    icon: 'Terminal',
    color: 'from-neutral-200 to-neutral-400',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'web',
    levelStatus: 'Semantic Structure · Solid Foundations',
    proficiencyPct: 88,
    description:
      'Crafting clean, accessible, and standards-compliant document structures for modern web applications.',
    keyTopics: ['Semantic HTML5', 'Accessibility (a11y)', 'Forms & Media', 'Clean DOM Tree'],
    icon: 'FileCode2',
    color: 'from-neutral-300 to-neutral-500',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'web',
    levelStatus: 'Modern Layouts · Precision Styling',
    proficiencyPct: 82,
    description:
      'Building responsive, pixel-precise interfaces with Flexbox, CSS Grid, and fluid typography.',
    keyTopics: ['Flexbox & Grid', 'Fluid Typography', 'Transitions & Blur', 'Responsive Design'],
    icon: 'Palette',
    color: 'from-neutral-200 to-neutral-400',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'web',
    levelStatus: 'Client Logic · Learning & Exploring',
    proficiencyPct: 65,
    description:
      'Exploring modern ECMAScript features, DOM event pipelines, asynchronous requests, and stateful UIs.',
    keyTopics: ['ES6+ Syntax', 'DOM Manipulation', 'Async & Fetch', 'Interactive Components'],
    icon: 'Code2',
    color: 'from-neutral-300 to-neutral-500',
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    category: 'fundamentals',
    levelStatus: 'Holistic Web Building · Exploring',
    proficiencyPct: 72,
    description:
      'Bringing together design, markup, and client logic into responsive web experiences with high performance.',
    keyTopics: ['Component Design', 'Cross-Device UX', 'Performance', 'Developer Tools'],
    icon: 'Globe',
    color: 'from-neutral-200 to-neutral-400',
  },
  {
    id: 'software-dev',
    name: 'Software Development',
    category: 'fundamentals',
    levelStatus: 'Engineering Discipline · Learning',
    proficiencyPct: 65,
    description:
      'Understanding clean code practices, modular decomposition, version control workflows, and maintainability.',
    keyTopics: ['Modular Design', 'Git Version Control', 'Debugging', 'Requirement Analysis'],
    icon: 'Cpu',
    color: 'from-neutral-300 to-neutral-500',
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'fundamentals',
    levelStatus: 'Analytical Mindset · Daily Habit',
    proficiencyPct: 78,
    description:
      'Deconstructing complex problems into discrete, verifiable logical steps with rigorous mathematical reasoning.',
    keyTopics: ['Algorithmic Thinking', 'Edge Case Analysis', 'Analytical Math', 'Stepwise Logic'],
    icon: 'Lightbulb',
    color: 'from-neutral-200 to-neutral-400',
  },
  {
    id: 'tech-exploration',
    name: 'Technology Exploration',
    category: 'exploration',
    levelStatus: 'Insatiable Curiosity · Continuous',
    proficiencyPct: 92,
    description:
      'Exploring emerging developer tooling, open-source innovations, artificial intelligence, and operating systems.',
    keyTopics: ['Emerging Tech', 'Open Source', 'System Tools', 'Future Trends'],
    icon: 'Compass',
    color: 'from-neutral-300 to-neutral-500',
  },
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'folafol',
    title: 'FOLAFOL',
    badge: 'Educational Technology',
    category: 'Flagship Mobile & Web Application',
    description:
      'An educational application designed to bring examination results, admission information, college resources, and student services together in one convenient platform.',
    technologies: ['Python', 'Modern Web UI', 'REST APIs', 'Education Data Hub'],
    githubUrl: 'https://github.com/zerolap657-design',
    liveDemoUrl: '#',
    image: 'https://res.cloudinary.com/fcsclifx/image/upload/v1793473773/WhatsApp_Image_2026-10-31_at_12.04.26_PM.jpg',
    videoUrl: 'https://res.cloudinary.com/fcsclifx/video/upload/v1793473651/WhatsApp_Video_2026-10-31_at_12.06.45_PM.mp4',
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
    id: 'dev-workspace-suite',
    title: 'PyDesk Scripting Suite',
    badge: 'Developer Tooling',
    category: 'Automation & Scripting',
    description:
      'Minimalist Python automation scripts created to organize academic files, batch-process study materials, and automate indexing.',
    technologies: ['Python 3', 'File I/O', 'OS Module', 'Command Line'],
    githubUrl: 'https://github.com/zerolap657-design',
    liveDemoUrl: '#',
    image: '/assets/images/dev_workspace_code_1793470982568.jpg',
    highlights: [
      'Automated folder sorting for Class 11 science textbooks and test papers',
      'Zero-dependency command-line interface with instantaneous performance',
    ],
    isEditablePlaceholder: true,
  },
  {
    id: 'hsc-science-reference',
    title: 'HSC Science Reference Hub',
    badge: 'Academic Project',
    category: 'Web Application',
    description:
      'An interactive web dashboard concept cataloging formulas, chapter summaries, and practical guides for Science stream students.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Minimalist UI'],
    githubUrl: 'https://github.com/zerolap657-design',
    liveDemoUrl: '#',
    image: '/assets/images/bangladesh_natore_tech_1793470982439.jpg',
    highlights: [
      'Concise mathematical and physical science formula cheatsheets',
      'Ultra-fast load time on Android smartphones and low bandwidth',
    ],
    isEditablePlaceholder: true,
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
      'Class 11 Science Group student located in Natore, Bangladesh. Focused on analytical rigor in mathematics and physical sciences.',
    keyFocus: [
      'Higher Mathematics',
      'Physics',
      'Information & Communication Technology (ICT)',
      'Chemistry',
      'Biology',
      'Bengali & English',
    ],
  },
];

export const personalInterests: InterestItem[] = [
  {
    id: 'programming',
    title: 'Programming',
    description:
      'Translating logical problems into clean, executable code that runs reliably.',
    icon: 'Terminal',
    tags: ['Python', 'Logic', 'Algorithms'],
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    description:
      'Architecting intuitive, helpful tools that solve everyday problems for people.',
    icon: 'Code2',
    tags: ['Architecture', 'App Design', 'Engineering'],
  },
  {
    id: 'exploring-tech',
    title: 'Exploring Technology',
    description:
      'Fascinated by hardware advancements, operating systems, and developer ecosystems.',
    icon: 'Compass',
    tags: ['Hardware', 'Open Source', 'Ecosystems'],
  },
  {
    id: 'learning-skills',
    title: 'Learning New Skills',
    description:
      'Continuous daily exploration of programming documentation and computer science.',
    icon: 'BookOpen',
    tags: ['Daily Practice', 'Documentation', 'Curiosity'],
  },
  {
    id: 'building-products',
    title: 'Building Digital Products',
    description:
      'Translating creative thoughts into practical tools like FOLAFOL for students.',
    icon: 'Rocket',
    tags: ['FOLAFOL', 'Product Design', 'Impact'],
  },
  {
    id: 'internet-computers',
    title: 'Computers & The Internet',
    description:
      'Exploring the global networks, protocols, servers, and engines connecting humanity.',
    icon: 'Globe',
    tags: ['Networking', 'Internet Protocols', 'Systems'],
  },
];
