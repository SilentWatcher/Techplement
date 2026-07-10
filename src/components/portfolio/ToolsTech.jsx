import { useMemo, useEffect, useRef } from 'react'

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
  graphql: 'https://avatars.githubusercontent.com/u/12972006?s=200&v=4',
  aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  reactnative: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  websockets: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg',
  s3: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg',
  cloudinary: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudinary/cloudinary-original.svg',
  zustand: 'https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg',
  mern: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
}

const TECH_META = {
  react:        { category: 'Frontend',   type: 'Library',           glow: 'cyan' },
  nextjs:       { category: 'Framework',  type: 'Framework',         glow: 'white' },
  javascript:   { category: 'Language',   type: 'Language',          glow: 'yellow' },
  html5:        { category: 'Markup',     type: 'Language',          glow: 'red' },
  css3:         { category: 'Styling',    type: 'Language',          glow: 'cyan' },
  tailwind:     { category: 'Framework',  type: 'CSS Framework',     glow: 'cyan' },
  typescript:   { category: 'Language',   type: 'Language',          glow: 'blue' },
  nodejs:       { category: 'Runtime',    type: 'Runtime',           glow: 'green' },
  nestjs:       { category: 'Backend',    type: 'Framework',         glow: 'red' },
  express:      { category: 'Backend',    type: 'Framework',         glow: 'white' },
  websockets:   { category: 'Realtime',   type: 'Protocol',          glow: 'purple' },
  mongodb:      { category: 'Database',   type: 'NoSQL',             glow: 'green' },
  postgresql:   { category: 'Database',   type: 'SQL',               glow: 'cyan' },
  mysql:        { category: 'Database',   type: 'SQL',               glow: 'yellow' },
  prisma:       { category: 'ORM',        type: 'ORM',               glow: 'purple' },
  redis:        { category: 'Cache',      type: 'Database',          glow: 'red' },
  redux:        { category: 'State',      type: 'Management',        glow: 'purple' },
  zustand:      { category: 'State',      type: 'Management',        glow: 'white' },
  graphql:      { category: 'API',        type: 'Query Language',    glow: 'purple' },
  aws:          { category: 'Cloud',      type: 'Platform',          glow: 'yellow' },
  s3:           { category: 'Storage',    type: 'Object Storage',    glow: 'green' },
  cloudinary:   { category: 'Media',      type: 'CDN',               glow: 'cyan' },
  docker:       { category: 'DevOps',     type: 'Container',         glow: 'cyan' },
  git:          { category: 'Tools',      type: 'VCS',               glow: 'red' },
  github:       { category: 'Platform',   type: 'Git Hosting',       glow: 'white' },
  reactnative:  { category: 'Mobile',     type: 'Framework',         glow: 'cyan' },
  mern:         { category: 'Stack',      type: 'Full-Stack',        glow: 'purple' },
}

export default function ToolsTech({ profile }) {
  const { techStacks = [] } = profile || {}

  const enriched = useMemo(() => {
    const EXCLUDE = new Set(['mern', 's3', 'cloudinary'])
    return techStacks
      .filter((t) => !EXCLUDE.has(t.icon))
      .map((t, i) => {
        const meta = TECH_META[t.icon] || { category: 'Tech', type: 'Tool', glow: 'white' }
        return { ...t, ...meta, num: String(i + 1).padStart(3, '0') }
      })
  }, [techStacks])

  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('stack-card-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    el.querySelectorAll('.stack-card').forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [enriched.length])

  if (!enriched.length) return null

  return (
    <section id="toolsAndTech" ref={ref} className="stack-section">
      <div className="stack-hud-left" />
      <div className="stack-hud-right" />
      <div className="stack-hud-label-left">DEFY THE LIMITS</div>
      <div className="stack-hud-label-right">FOCUS . BUILD . DEPLOY</div>

      <div className="stack-header">
        <div className="stack-system">System Online</div>
        <h1 className="stack-title">Tech Stack</h1>
        <p className="stack-subtitle">
          Built with modern technologies for <span>scalable &amp; futuristic</span> solutions
        </p>
      </div>

      <div className="stack-grid">
        {enriched.map((tech, i) => (
          <div key={i} className="stack-card">
            <div className="stack-card-hover-fill" />
            <div className="stack-card-inner">
              <div className="stack-card-header">
                <span>// {tech.category.toUpperCase()}</span>
                <span>{tech.num}</span>
              </div>
              <div className={`stack-card-icon glow-${tech.glow}`}>
                <img src={CDN[tech.icon] || CDN.react} alt={tech.title} />
              </div>
              <div className="stack-card-footer">
                <div className="stack-tech-name">{tech.title}</div>
                <div className="stack-tech-type">{tech.type}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="stack-bar">SCROLL TO EXPLORE // STAY FOCUSED. KEEP BUILDING.</div>
    </section>
  )
}
