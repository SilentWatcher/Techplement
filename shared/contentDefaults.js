// Single source of truth for the initial content.
// Used by the server seed/migration and by the frontend when the API is unreachable.

const CDN = {
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  nestjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  prisma: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
  redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  redux: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg',
  websockets: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg',
  cloudinary: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudinary/cloudinary-original.svg',
  zustand: 'https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg',
  graphql: 'https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg',
  aws: 'https://www.logo.wine/a/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  reactnative: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  mern: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
}

export const SOCIAL_ICONS = {
  github: '/assets/homeIcons/socialIcons/github.svg',
  linkedin: '/assets/homeIcons/socialIcons/linkedin.svg',
  instagram: '/assets/homeIcons/socialIcons/instagram.svg',
  twitter: '/assets/homeIcons/socialIcons/twitter.svg',
}

export const defaultSiteSettings = {
  key: 'site',
  schemaVersion: 1,
  designId: 'project-1',
  seo: {
    title: 'Vikas Sr Vitekari',
    description:
      'UI designer and frontend developer building scalable, high-performance web experiences.',
    keywords: 'Vikas Vitekari, frontend developer, UI designer, React, portfolio',
    ogImage: '/assets/navbar/vikas.png',
    favicon: '/assets/navbar/vikas.png',
  },
  brand: {
    name: 'Vikas Sr Vitekari',
    logoText: 'Vikas',
    logoImage: '/assets/navbar/vikas.png',
  },
  nav: {
    links: [
      { label: 'Home', href: '#home', order: 0, visible: true },
      { label: 'About', href: '#about', order: 1, visible: true },
      { label: 'Projects', href: '#project', order: 2, visible: true },
      { label: 'Contact', href: '#contact', order: 3, visible: true },
    ],
  },
  hero: {
    statusLabels: ['SYSTEM ACTIVE', 'ACCESS GRANTED'],
    rotatingWords: ['BUILD', 'DESIGN', 'ENGINEER', 'SHIP'],
    role: 'FULL STACK DEVELOPER',
    headline: 'Building Digital Experiences.',
    headlineAccent: 'Experiences.',
    secondaryHeadline: 'Scalable Applications. Better Experiences.',
    description:
      'I build end-to-end web applications using React, Next.js, Node.js, and modern backend technologies. Focused on clean architecture, performance, and solving real-world problems.',
    subtitleItems: ['Frontend Architecture', 'UI Systems'],
    tagline: {
      text: 'I architect systems that scale | I craft interfaces that perform',
      redWords: ['architect', 'craft'],
      whiteWords: ['scale', 'perform'],
    },
    cornerLabels: { left: 'SYSTEM ACTIVE', right: 'ACCESS GRANTED' },
    primaryCta: { label: 'VIEW PROJECTS →', href: '#project' },
    secondaryCta: { label: 'VIEW RESUME', href: '' },
    resumeLabel: 'VIEW RESUME',
    socialLabel: 'Connect',
    scrollLabel: 'Scroll',
  },
  about: {
    badge: '// SECTION_01',
    title: 'About',
    hudLeft: 'IDENTITY',
    hudRight: 'ORIGIN',
    image: '/assets/aboutIcons/frontendGuy.png',
    status: 'ACTIVE',
    clearance: 'LEVEL_5',
    terminalPath: '~ /about/intro',
    prompts: ['cat introduction.txt', './what-i-do.sh'],
    commands: [
      { command: 'whoami', output: 'Vikas Sr Vitekari — Full Stack Developer' },
      { command: 'cat introduction.txt', output: '' },
      { command: 'cat focus.txt', output: 'Full-stack web applications, clean architecture, performance, and solving real-world problems.' },
    ],
    availability: 'Available for work',
    focusText: 'Full-stack web applications, clean architecture, performance, and solving real-world problems.',
  },
  tech: {
    systemLabel: 'System Online',
    title: 'Tech Stack',
    subtitle: 'Built with modern technologies for scalable & futuristic solutions',
    footerBar: 'SCROLL TO EXPLORE // STAY FOCUSED. KEEP BUILDING.',
    hudLeft: 'DEFY THE LIMITS',
    hudRight: 'FOCUS . BUILD . DEPLOY',
  },
  projects: {
    badge: '// DEPLOYMENTS',
    title: 'Projects',
    subtitleTemplate: 'ACTIVE_BUILD — {count} ENTRIES',
    emptyText: 'NO_DEPLOYMENTS_FOUND',
    liveLabel: 'LIVE',
    comingSoonLabel: 'PENDING',
    launchLabel: 'LAUNCH',
    codeLabel: 'CODE',
    techLabel: 'STACK',
    inspectLabel: 'INSPECT',
  },
  footer: {
    contactLabel: 'Contact',
    quoteLabel: 'Something in mind',
    heading: "Let's talk.",
    emailLabel: 'Drop a mail',
    followLabel: 'Follow',
    copyright: 'Copyright 2024 — All rights reserved.',
    credit: 'Designed in Figma · Developed in React + Tailwind',
  },
}

export const defaultProfile = {
  name: 'Vikas Sr Vitekari',
  title: 'UI Designer and Frontend Developer',
  bio: 'Full Stack Developer with 2+ years of experience building scalable SaaS and mobile applications. Proven track record of improving performance, reducing manual effort, and delivering production-ready systems using React, Node.js, and AWS. Focused on clean architecture, system design, and real-world impact.',
  aboutParagraph:
    "This is Vikas Shankar Vitekari, 2023 pass out hold Computer science Engineering from Bharati Vidyapeeth's Engineering College, Kolhapur, India. Also I am a self taught UI designer and Frontend developer.",
  resumeUrl:
    'https://drive.google.com/file/d/1RJnp6a9lYDaeESuzf-SW-1-OwYUfjpfg/view?usp=sharing',
  resumeLabel: 'Resume',
  email: 'vitekarvikas55@gmail.com',
  phone: '',
  location: 'Kolhapur, India',
  quote:
    '"As a coder, I create and learn, each line of code a move on the chessboard of challenges. It\'s not just about a job but mastering the dance of problem-solving—every algorithm a step closer to victory, every puzzle an opportunity to craft solutions."',
  socialLinks: [
    { platform: 'github', label: 'GitHub', url: 'https://github.com/SilentWatcher', icon: SOCIAL_ICONS.github, order: 0, visible: true },
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/vikas-vitekari/', icon: SOCIAL_ICONS.linkedin, order: 1, visible: true },
    { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/vitekarivikas/', icon: SOCIAL_ICONS.instagram, order: 2, visible: true },
    { platform: 'twitter', label: 'Twitter', url: 'https://twitter.com/VitekariVikas', icon: SOCIAL_ICONS.twitter, order: 3, visible: true },
  ],
  aboutCards: [
    {
      title: 'Design',
      description: 'Crafting pixel-perfect interfaces with obsessive attention to detail, color theory, and motion design.',
      icon: '/assets/aboutIcons/Design.png',
      tags: ['UI/UX', 'Figma', 'Prototype'],
      order: 0,
      visible: true,
    },
    {
      title: 'Develop',
      description: 'Architecting scalable frontend systems with React, clean code, and performance-first thinking.',
      icon: '/assets/aboutIcons/code.png',
      tags: ['React', 'Next.js', 'TypeScript'],
      order: 1,
      visible: true,
    },
    {
      title: 'Strategize',
      description: 'Thinking multiple moves ahead — every component, every state, every edge case planned.',
      icon: '/assets/aboutIcons/chess.png',
      tags: ['System Design', 'Optimization', 'Logic'],
      order: 2,
      visible: true,
    },
  ],
}

export const defaultTech = [
  { name: 'React.js', iconKey: 'react', iconUrl: CDN.react, category: 'Frontend', type: 'Library', glow: 'cyan', tier: 'primary', order: 0, visible: true },
  { name: 'Next.js', iconKey: 'nextjs', iconUrl: CDN.nextjs, category: 'Framework', type: 'Framework', glow: 'white', tier: 'primary', order: 1, visible: true },
  { name: 'JavaScript', iconKey: 'javascript', iconUrl: CDN.javascript, category: 'Language', type: 'Language', glow: 'yellow', tier: 'primary', order: 2, visible: true },
  { name: 'HTML5', iconKey: 'html5', iconUrl: CDN.html5, category: 'Markup', type: 'Language', glow: 'red', tier: 'primary', order: 3, visible: true },
  { name: 'CSS3', iconKey: 'css3', iconUrl: CDN.css3, category: 'Styling', type: 'Language', glow: 'cyan', tier: 'primary', order: 4, visible: true },
  { name: 'Tailwind', iconKey: 'tailwind', iconUrl: CDN.tailwind, category: 'Framework', type: 'CSS Framework', glow: 'cyan', tier: 'primary', order: 5, visible: true },
  { name: 'Node.js', iconKey: 'nodejs', iconUrl: CDN.nodejs, category: 'Runtime', type: 'Runtime', glow: 'green', tier: 'primary', order: 6, visible: true },
  { name: 'NestJS', iconKey: 'nestjs', iconUrl: CDN.nestjs, category: 'Backend', type: 'Framework', glow: 'red', tier: 'primary', order: 7, visible: true },
  { name: 'Express', iconKey: 'express', iconUrl: CDN.express, category: 'Backend', type: 'Framework', glow: 'white', tier: 'primary', order: 8, visible: true },
  { name: 'WebSockets', iconKey: 'websockets', iconUrl: CDN.websockets, category: 'Realtime', type: 'Protocol', glow: 'purple', tier: 'secondary', order: 9, visible: true },
  { name: 'MongoDB', iconKey: 'mongodb', iconUrl: CDN.mongodb, category: 'Database', type: 'NoSQL', glow: 'green', tier: 'primary', order: 10, visible: true },
  { name: 'PostgreSQL', iconKey: 'postgresql', iconUrl: CDN.postgresql, category: 'Database', type: 'SQL', glow: 'cyan', tier: 'secondary', order: 11, visible: true },
  { name: 'MySQL', iconKey: 'mysql', iconUrl: CDN.mysql, category: 'Database', type: 'SQL', glow: 'yellow', tier: 'secondary', order: 12, visible: true },
  { name: 'Prisma', iconKey: 'prisma', iconUrl: CDN.prisma, category: 'ORM', type: 'ORM', glow: 'purple', tier: 'secondary', order: 13, visible: true },
  { name: 'Redis', iconKey: 'redis', iconUrl: CDN.redis, category: 'Cache', type: 'Database', glow: 'red', tier: 'secondary', order: 14, visible: true },
  { name: 'Redux', iconKey: 'redux', iconUrl: CDN.redux, category: 'State', type: 'Management', glow: 'purple', tier: 'secondary', order: 15, visible: true },
  { name: 'Zustand', iconKey: 'zustand', iconUrl: CDN.zustand, category: 'State', type: 'Management', glow: 'white', tier: 'other', order: 16, visible: true },
  { name: 'GraphQL', iconKey: 'graphql', iconUrl: CDN.graphql, category: 'API', type: 'Query Language', glow: 'purple', tier: 'secondary', order: 17, visible: true },
  { name: 'AWS', iconKey: 'aws', iconUrl: CDN.aws, category: 'Cloud', type: 'Platform', glow: 'yellow', tier: 'secondary', order: 18, visible: true },
  { name: 'Docker', iconKey: 'docker', iconUrl: CDN.docker, category: 'DevOps', type: 'Container', glow: 'cyan', tier: 'secondary', order: 19, visible: true },
  { name: 'S3', iconKey: 's3', iconUrl: '', category: 'Storage', type: 'Object Storage', glow: 'green', tier: 'other', order: 20, visible: false },
  { name: 'Cloudinary', iconKey: 'cloudinary', iconUrl: CDN.cloudinary, category: 'Media', type: 'CDN', glow: 'cyan', tier: 'other', order: 21, visible: false },
  { name: 'Git', iconKey: 'git', iconUrl: CDN.git, category: 'Tools', type: 'VCS', glow: 'red', tier: 'secondary', order: 22, visible: true },
  { name: 'GitHub', iconKey: 'github', iconUrl: CDN.github, category: 'Platform', type: 'Git Hosting', glow: 'white', tier: 'secondary', order: 23, visible: true },
  { name: 'React Native', iconKey: 'reactnative', iconUrl: CDN.reactnative, category: 'Mobile', type: 'Framework', glow: 'cyan', tier: 'secondary', order: 24, visible: true },
  { name: 'MERN', iconKey: 'mern', iconUrl: CDN.mern, category: 'Stack', type: 'Full-Stack', glow: 'purple', tier: 'primary', order: 25, visible: false },
]

const projectSeed = [
  { title: 'Currency Converter', description: 'A lightweight tool for swift currency conversions.', tag: 'API integration', image: '/assets/projectPreview/currency_converter.png', liveUrl: 'https://silentwatcher-currency-convetor.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/Currency_Convetor', bgColor: '#E4A87F', ispublished: false, order: 1, techStack: ['JavaScript', 'HTML5', 'CSS3', 'API'] },
  { title: 'Upskill', description: 'Simplified educational site, intuitive UI for effective learning', tag: 'Ui Design', image: '/assets/projectPreview/upskill_edu.png', liveUrl: 'https://upskill-edu.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/SilentWatcher-upskill-edu', bgColor: '#B2B6FE', ispublished: true, order: 2, techStack: ['React', 'CSS3', 'Figma'] },
  { title: 'Weather App', description: 'OpenWeatherMap Global weather with current, 5-day, hourly, feels like', tag: 'API integration and Development', image: '/assets/projectPreview/weather_app.png', liveUrl: 'https://silentwatcher.github.io/Real-Time-Weather-App/', sourceCodeUrl: 'https://github.com/SilentWatcher/Real-Time-Weather-App', bgColor: '#C1E1FF', ispublished: false, order: 3, techStack: ['JavaScript', 'HTML5', 'CSS3', 'API', 'Responsive'] },
  { title: 'Password Generator', description: 'Generate alphanumeric password', tag: 'Development', image: '/assets/projectPreview/password_generator.png', liveUrl: 'https://silentwatcher-password-generator.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/Password_Generator', bgColor: '#96ABE4', ispublished: false, order: 4, techStack: ['JavaScript', 'HTML5', 'CSS3'] },
  { title: 'Fountain Force', description: 'E-schools for learners', tag: 'Ui Design', image: '/assets/projectPreview/fountain_force.png', liveUrl: 'https://fountain-force.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/FountainForce', bgColor: '#AA978A', ispublished: true, order: 5, techStack: ['React', 'CSS3', 'Tailwind', 'Figma'] },
  { title: 'Simon Says', description: 'Memory game. Test your memory', tag: 'Game', image: '/assets/projectPreview/simon_says.png', liveUrl: 'https://silentwatcher.github.io/simon-says/', sourceCodeUrl: 'https://github.com/SilentWatcher/simon-says', bgColor: '#DCC776', ispublished: false, order: 6, techStack: ['JavaScript', 'HTML5', 'CSS3'] },
  { title: 'KartFlip', description: 'Online shopping', tag: 'E-Commerce', image: '/assets/projectPreview/ecommerce.jpg', liveUrl: 'https://e-commerce-app-with-auth.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/e-commerce-with-auth-and-procted-route', bgColor: '#C5DBE4', comingSoon: true, ispublished: false, order: 7, techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'] },
  { title: 'Flip Card', description: 'As the fan of Avengers', tag: 'Game', image: '/assets/projectPreview/avenger.png', liveUrl: 'https://silentwatcher.github.io/AVENGER-flip-card-game/', sourceCodeUrl: 'https://github.com/SilentWatcher/AVENGER-flip-card-game', bgColor: '#ED809B', ispublished: false, order: 8, techStack: ['JavaScript', 'HTML5', 'CSS3'] },
  { title: 'Business Card', description: 'Distilled professionalism, expertise, and contact details in a glance.', tag: 'Ui Design', image: '/assets/projectPreview/business_card.png', sourceCodeUrl: 'https://github.com/SilentWatcher/portfolio', bgColor: '#9AC8C8', ispublished: false, order: 9, techStack: ['React', 'CSS3', 'Design'] },
  { title: 'Background Changer', description: 'React project', tag: 'Ui Design', image: '/assets/projectPreview/background_changer.png', liveUrl: 'https://background-changer-btn-react.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/Background_Changer', bgColor: '#aeecf7', ispublished: false, order: 10, techStack: ['React', 'CSS3'] },
  { title: 'Surypura Grampanchayat', description: 'Official website for Surypura Grampanchayat with civic info, services, and public notices', tag: 'Web Development', image: '/assets/projectPreview/surypura-grampanchayt.png', liveUrl: 'https://surypura-grampanchayt.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/surypura-grampanchayt-website', bgColor: '#4A90D9', ispublished: true, order: 11, techStack: ['HTML5', 'CSS3', 'JavaScript'] },
  { title: 'Project Pilot', description: 'Full-stack project management tool with frontend and backend', tag: 'Full Stack', image: '/assets/projectPreview/project-pilot.png', liveUrl: 'https://project-pilot-fe.onrender.com', sourceCodeUrl: 'https://github.com/SilentWatcher/project_pilot_fe', bgColor: '#6C5CE7', ispublished: true, order: 12, techStack: ['React', 'Tailwind', 'MongoDB'] },
]

export function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const defaultProjects = projectSeed.map((project) => {
  const links = []
  if (project.liveUrl) {
    links.push({ label: 'Live', url: project.liveUrl, type: 'live', order: 0, visible: true })
  }
  if (project.sourceCodeUrl) {
    links.push({ label: 'Code', url: project.sourceCodeUrl, type: 'source', order: 1, visible: true })
  }
  return {
    ...project,
    slug: slugify(project.title),
    imageAlt: project.title,
    links,
    status: project.comingSoon ? 'coming-soon' : 'live',
    featured: false,
  }
})
