import { Github, Linkedin, Mail, Instagram, MessageCircle, ExternalLink, LucideIcon } from 'lucide-react'

export interface NavLink {
  name: string
  href: string
}

export interface Project {
  id: number
  title: string
  category: string
  year: string
  description: string
  tech: string[]
  image: string
  link: string
}

export interface Experience {
  year: string
  role: string
  company: string
  description: string[]
  tech: string[]
}

export interface SkillCategory {
  title: string
  skills: string[]
}

export interface Stat {
  value: string
  label: string
}

export interface Blog {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  views: string
  tags: string[]
  image: string
  link: string
}

export interface SocialLink {
  icon: LucideIcon
  href: string
  label: string
}

export const personalInfo = {
  name: 'Mithun Thomas',
  firstName: 'MITHUN',
  lastName: 'THOMAS',
  role: 'Full Stack Developer',
  email: 'mithunthomas003@gmail.com',
  phone: '+91 9895493897',
  whatsapp: 'https://wa.me/919895493897',
  location: 'Kerala, India',
  availability: 'AVAILABLE FOR WORK',
  workType: 'REMOTE · WORLDWIDE',
  bio: 'Full Stack Developer specializing in building high-performance web applications and AI-integrated solutions.',
  aboutDetailed: 'Based in Kerala, India, I specialize in building end-to-end applications with a focus on modern web technologies like React, FastAPI, and Node.js. My journey in tech is driven by a passion for solving complex problems and creating seamless user experiences. Currently pursuing my B.Tech in Computer Science at the College of Engineering, Kottarakkara, I have already worked on diverse projects ranging from FinTech solutions to AI-powered image processing.',
  github: 'https://github.com/mithun2003',
  linkedin: 'https://www.linkedin.com/in/mithunthomas3897/',
  medium: 'https://mithun003.medium.com/',
  instagram: 'https://www.instagram.com/_mithun_thomas____/',
}

export const navLinks: NavLink[] = [
  { name: 'WORK', href: '#work' },
  { name: 'ABOUT', href: '#about' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'GIT', href: '#github' },
  { name: 'CONTACT', href: '#contact' },
]

export const techStack = ['PYTHON', 'FASTAPI', 'REACT', 'NEXT.JS', 'TYPESCRIPT', 'AWS', 'DOCKER']

export const projects: Project[] = [
  {
    id: 1,
    title: 'ArtistKashi',
    category: 'E-COMMERCE / ART',
    year: '2024',
    description: 'A premium platform for artists to showcase and sell their work. Features include high-resolution image galleries, secure payments, and personalized artist profiles.',
    tech: ['REACT', 'NODE.JS', 'MONGODB', 'STRIPE'],
    image: '/artistkashi-hero.png' ,
    link: 'https://github.com/mithun2003/artistkashi',
  },
  {
    id: 2,
    title: 'SignSync',
    category: 'AI / ACCESSIBILITY',
    year: '2024',
    description: 'Full-stack Angular 21 application bridging communication gaps between sign language users and others. Uses MediaPipe for real-time ASL gesture detection (A-Z) with 90%+ confidence, text-to-sign translation, and voice feedback.',
    tech: ['ANGULAR', 'MEDIAPIPE', 'TAILWIND V4', 'NODE.JS'],
    image: '/signsync-hero.png',
    link: 'https://github.com/mithun2003/SignSyn'
  },
  {
    id: 3,
    title: 'Gamma AI Watermark Remover',
    category: 'AI / IMAGE PROCESSING',
    year: '2024',
    description: 'Advanced AI tool powered by deep learning models to intelligently identify and remove watermarks from images while preserving quality.',
    tech: ['PYTHON', 'PYTORCH', 'FASTAPI', 'OPENCV'],
    image: '/watermark-hero.png',
    link: 'https://github.com/mithun2003/gamma-ai-watermark-remover',
  },
  {
    id: 4,
    title: 'AI Tuberculosis Detector',
    category: 'AI / HEALTHCARE',
    year: '2024',
    description: 'Deep learning model using CNNs to detect tuberculosis from chest X-ray images with high precision. Featured as a CS50x final project.',
    tech: ['PYTHON', 'FASTAPI', 'PYTORCH', 'REACT'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop',
    link: 'https://github.com/mithun2003/ai-tuberculosis-detection',
  },
]
 
export const stats: Stat[] = [
  { value: '3+', label: 'YEARS OF DEV' },
  { value: '25+', label: 'PROJECTS DONE' },
  { value: '12+', label: 'TECH STACKS' },
  { value: '800+', label: 'GITHUB COMMITS' },
]

export const experiences: Experience[] = [
  {
    year: '2024 - 2028',
    role: 'B.Tech Student',
    company: 'College of Engineering, Kottarakkara',
    description: [
      'Pursuing Computer Science and Engineering.',
      'Focusing on Data Structures, Algorithms, and System Design.',
      'Active participant in technical labs and open-source projects.',
    ],
    tech: ['C', 'PYTHON', 'DSA', 'SYSTEM DESIGN'],
  },
  {
    year: '2022 - PRESENT',
    role: 'Freelance Developer',
    company: 'Self-Employed',
    description: [
      'Architected and delivered custom web solutions for diverse clients.',
      'Developed AI-integrated applications like Gamma AI Watermark Remover.',
      'Creating scalable SaaS products and e-commerce platforms.',
    ],
    tech: ['PYTHON', 'NODE.JS', 'TYPESCRIPT', 'REACT'],
  },
  {
    year: '2023 - 2024',
    role: 'Software Developer',
    company: 'Zil Money',
    description: [
      'Developed and optimized FinTech payment and payroll solutions.',
      'Built scalable backend architectures using Python and FastAPI.',
      'Implemented responsive frontend interfaces with React and Tailwind CSS.',
    ],
    tech: ['FASTAPI', 'REACT', 'POSTGRESQL', 'AWS'],
  },
]

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C', 'HTML', 'CSS/SASS'],
  },
  {
    title: 'Backend & AI',
    skills: ['FastAPI', 'Django', 'Node.js', 'PyTorch', 'REST APIs', 'SQLAlchemy'],
  },
  {
    title: 'Frontend & UI',
    skills: ['React', 'Angular', 'Tailwind CSS', 'Redux', 'Framer Motion', 'Bootstrap'],
  },
  {
    title: 'DevOps & Tools',
    skills: ['AWS', 'Docker', 'Git', 'Bitbucket', 'CI/CD', 'Nginx'],
  },
]

export const certifications = [
  {
    num: '01',
    title: 'CS50x: Introduction to Computer Science',
    issuer: 'Harvard University',
    year: '2023',
    file: '#',
  },
  {
    num: '02',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    year: '2024',
    file: '#',
  },
  {
    num: '03',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2024',
    file: '#',
  },
];

export const marqueeItems = [
  'Python', 'FastAPI', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 
  'AWS', 'Docker', 'Django', 'PyTorch', 'Angular', 'Tailwind CSS'
]

export const blogs: Blog[] = [
  {
    id: 1,
    title: 'AI in Healthcare: Detecting Tuberculosis with Deep Learning',
    excerpt: 'Exploring the challenges and successes of building a TB detection system using CNNs and medical datasets.',
    date: 'March 10, 2024',
    readTime: '12 min read',
    views: '4.2K',
    tags: ['AI', 'Healthcare', 'Python'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    link: 'https://mithun003.medium.com/',
  },
  {
    id: 2,
    title: 'Building Scalable APIs with FastAPI 2.0',
    excerpt: 'Deep dive into asynchronous patterns, database migrations, and performance optimization in modern Python web development.',
    date: 'Feb 15, 2024',
    readTime: '8 min read',
    views: '2.8K',
    tags: ['FastAPI', 'Python', 'Backend'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    link: 'https://mithun003.medium.com/',
  },
  {
    id: 3,
    title: 'Intelligent Image Processing with Gamma AI',
    excerpt: 'How we used deep learning to create a precise watermark removal tool that maintains image integrity.',
    date: 'Jan 20, 2024',
    readTime: '6 min read',
    views: '1.5K',
    tags: ['AI', 'Python', 'Image Processing'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop',
    link: 'https://mithun003.medium.com/',
  },
]

export const socialLinks: SocialLink[] = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: personalInfo.instagram, label: 'Instagram' },
  { icon: MessageCircle, href: personalInfo.whatsapp, label: 'WhatsApp' },
]

export const footerLinks: NavLink[] = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#work' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'GIT STATS', href: '#github' },
  { name: 'CONTACT', href: '#contact' },
]

