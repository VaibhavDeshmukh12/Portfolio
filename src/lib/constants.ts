export const siteConfig = {
  name: 'Vaibhav Deshmukh',
  role: 'Associate Software Engineer',
  company: 'PTC Software',
  email: 'contact.dvaibhav@gmail.com',
  location: 'Pune, India',
  tagline: 'Building scalable enterprise systems, immersive user experiences, and intelligent software solutions.',
  resumeUrl: '/resume-placeholder.pdf',
  social: {
    github: 'https://github.com/VaibhavDeshmukh12',
    linkedin: 'https://linkedin.com/in/vaibhav-deshmukh-30428622a',
    leetcode: 'https://leetcode.com/u/vaibhav_64/',
    email: 'mailto:contact.dvaibhav@gmail.com',
  },
}

export const rotatingTitles = [
  'Software Engineer',
  'Full Stack Developer',
  'ThingWorx Composer Developer',
  'Frontend Specialist',
  'React Developer',
  'Enterprise Engineer',
  'Problem Solver',
]

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { label: 'UI Components Built', value: 20, suffix: '+' },
  { label: 'Issues Resolved', value: 25, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
  { label: 'Months Experience', value: 18, suffix: '+' },
]

export const experiences = [
  {
    id: 1,
    title: 'Associate Software Engineer',
    company: 'PTC Software India Pvt Ltd',
    role: 'Associate Software Engineer',
    period: 'July 2025 - Present',
    description: 'Contributing to enhancing existing modules and developing new features using ThingWorx Composer, improving product stability and expanding functionality based on evolving business needs.',
    highlights: [
      'Enhanced performance in grid and collection components, lowering rendering time by 50%',
      'Enabled dynamic layout scaling in complex UI containers, boosting engagement by 30%',
      'Streamlined data transformation patterns for high-volume datasets',
      'Expanded functionality based on evolving business needs',
    ],
    tech: ['ThingWorx Composer', 'JavaScript', 'Enterprise UI', 'Performance Optimization'],
  },
  {
    id: 2,
    title: 'SDE Intern',
    company: 'PTC Software India Pvt Ltd',
    role: 'SDE Intern',
    period: 'July 2024 - June 2025',
    description: 'Designed and implemented 20+ user interfaces using ThingWorx Mashup Builder with real-time analytics. Tracked and resolved 25+ customer-reported issues via JIRA with 98% resolution rate.',
    highlights: [
      'Designed and implemented 20+ user interfaces using ThingWorx Mashup Builder',
      'Achieved 15% improvement in workflow efficiency',
      'Resolved 25+ customer-reported issues via JIRA with 98% resolution rate',
      'Enhanced application functionality with real-time analytics',
      'Tested and debugged UI components for cross-browser compatibility',
    ],
    tech: ['ThingWorx Composer', 'JavaScript', 'JIRA', 'Real-time Analytics', 'Cross-browser Testing'],
  },
  {
    id: 3,
    title: 'Java Full Stack Intern',
    company: 'Linkcode Technologies Pvt Ltd',
    role: 'Java Full Stack Intern',
    period: 'July 2023 - Dec 2023',
    description: 'Built a Web-Based Student Management System improving data handling and user experience. Directed a team of 4 engineers to build a fully functional application.',
    highlights: [
      'Built Web-Based Student Management System increasing user satisfaction by 40%',
      'Directed a team of 4 engineers',
      'Optimized JDBC and Servlets enhancing database interaction speed by 25%',
      'Developed fully functional application with clean architecture',
    ],
    tech: ['Java', 'JDBC', 'Servlets', 'SQL', 'HTML', 'CSS', 'JavaScript'],
  },
]

export const education = [
  {
    id: 1,
    institution: 'University of Pune',
    location: 'Pune, Maharashtra',
    degree: 'Bachelor of Engineering in Computer Engineering',
    period: 'Nov 2021 - June 2025',
    type: 'Engineering',
    grade: 'CGPA: 8.99',
  },
  {
    id: 2,
    institution: 'MSBSHSE, 12th Boards',
    location: 'Chh. Sambhajinagar, Maharashtra',
    degree: 'Higher Secondary Education (HSC)',
    period: 'June 2020 - March 2021',
    type: 'Junior College',
    grade: '82.83%',
  },
]

export const skillCategories = [
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      { name: 'Java', level: 88 },
      { name: 'JavaScript', level: 92 },
      { name: 'C++', level: 75 },
      { name: 'SQL', level: 82 },
      { name: 'TypeScript', level: 80 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React.js', level: 88 },
      { name: 'Next.js', level: 82 },
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Servlets', level: 78 },
      { name: 'JDBC', level: 78 },
      { name: 'MongoDB', level: 75 },
    ],
  },
  {
    id: 'enterprise',
    label: 'Enterprise & IoT',
    skills: [
      { name: 'ThingWorx Composer', level: 90 },
      { name: 'ThingWorx Mashup Builder', level: 88 },
      { name: 'Enterprise UI', level: 85 },
      { name: 'Real-time Analytics', level: 80 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 88 },
      { name: 'GitHub', level: 88 },
      { name: 'JIRA', level: 85 },
      { name: 'Postman', level: 82 },
      { name: 'VS Code', level: 90 },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    skills: [
      { name: 'Data Structures', level: 85 },
      { name: 'Performance Optimization', level: 82 },
      { name: 'Full Stack Development', level: 85 },
      { name: 'Cross-browser Testing', level: 80 },
    ],
  },
]

export const projects = [
  {
    id: 1,
    title: 'CareerSync',
    subtitle: 'Job-Seeking Application',
    description: 'Developed a responsive job-seeking application with user authentication, job listing CRUD operations, user profiles, and messaging functionality.',
    features: [
      'JWT-based authentication',
      'Role-based authorization',
      'Job listing CRUD operations',
      'User profiles & messaging',
      'Mobile-first responsive design',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'JWT', 'REST API', 'Tailwind CSS'],
    category: 'Full Stack',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentColor: '#60a5fa',
  },
  {
    id: 2,
    title: 'MentorLink',
    subtitle: 'Mentor-Mentee Management System',
    description: 'Led a team of 4 developers to design and develop a mentor-mentee management system enabling seamless interaction and secure data handling.',
    features: [
      'Session-based authentication',
      'CRUD operations',
      'Optimized database queries',
      'Reduced update time by 30%',
      '99.9% uptime',
    ],
    tech: ['Java', 'JDBC', 'Servlets', 'SQL', 'HTML', 'CSS', 'JavaScript'],
    category: 'Full Stack',
    gradient: 'from-purple-500/20 to-pink-500/20',
    accentColor: '#a78bfa',
  },
  {
    id: 3,
    title: 'ThingWorx Enterprise Dashboards',
    subtitle: 'Industrial IoT Platform',
    description: 'Built 20+ enterprise mashups and dashboards using ThingWorx Composer with real-time analytics, dynamic grids, and data binding for industrial IoT use cases.',
    features: [
      'Real-time analytics dashboards',
      'Dynamic layout scaling',
      'Grid & collection components',
      'Cross-browser compatibility',
      'Performance optimization',
    ],
    tech: ['ThingWorx Composer', 'JavaScript', 'Enterprise UI', 'Real-time Data'],
    category: 'Enterprise',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    accentColor: '#22d3ee',
  },
  {
    id: 4,
    title: 'Premium Portfolio Website',
    subtitle: 'Modern Animated Portfolio',
    description: 'Modern animated developer portfolio with immersive 3D scenes, advanced motion design, and premium dark futuristic theme.',
    features: [
      'Immersive 3D Three.js scene',
      'Framer Motion animations',
      'Smooth scroll with Lenis',
      'Responsive dark theme',
      'Interactive cursor effects',
    ],
    tech: ['Next.js', 'TypeScript', 'Three.js', 'Framer Motion', 'GSAP', 'Tailwind CSS'],
    category: 'Frontend',
    gradient: 'from-electric-blue/20 to-electric-purple/20',
    accentColor: '#3b82f6',
  },
]
