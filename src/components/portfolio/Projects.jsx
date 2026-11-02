import ProjectCard from './ProjectCard.jsx'

export default function Projects({ projects = [], section }) {
  const copy = section || {}
  const visibleProjects = projects.filter(
    (project) => project.ispublished !== false && project.status !== 'archived'
  )
  const subtitle = (copy.subtitleTemplate || 'ACTIVE_BUILD — {count} ENTRIES').replace(
    '{count}',
    String(visibleProjects.length)
  )

  return (
    <section id="project" className="projects-section">
      {/* Layer 1: Gradient base */}
      <div className="projects-gradient-base" />

      {/* Layer 2: Tech grid */}
      <div className="projects-grid-bg" />

      {/* Layer 3: Diagonal scan lines */}
      <div className="projects-scanlines" />

      {/* Layer 4: Corner HUD brackets */}
      <div className="projects-hud projects-hud--tl" />
      <div className="projects-hud projects-hud--tr" />
      <div className="projects-hud projects-hud--bl" />
      <div className="projects-hud projects-hud--br" />

      {/* Layer 5: Animated blobs */}
      <div className="projects-blob projects-blob--1" />
      <div className="projects-blob projects-blob--2" />
      <div className="projects-blob projects-blob--3" />
      <div className="projects-blob projects-blob--4" />

      {/* Layer 6: Floating particles */}
      <div className="projects-particle projects-particle--1" />
      <div className="projects-particle projects-particle--2" />
      <div className="projects-particle projects-particle--3" />
      <div className="projects-particle projects-particle--4" />
      <div className="projects-particle projects-particle--5" />
      <div className="projects-particle projects-particle--6" />

      {/* Layer 7: Horizontal accent lines */}
      <div className="projects-accent-line projects-accent-line--1" />
      <div className="projects-accent-line projects-accent-line--2" />
      <div className="projects-accent-line projects-accent-line--3" />

      <div className="projects-container">
        {/* HEADER */}
        <div className="projects-header">
          <div className="projects-badge">
            <span className="projects-badge-dot" />
            <span className="projects-badge-text">{copy.badge || '// DEPLOYMENTS'}</span>
          </div>
          <h2 className="projects-title">
            <span className="projects-title-bracket">[</span>
            <span className="projects-title-main">{copy.title || 'Projects'}</span>
            <span className="projects-title-bracket">]</span>
          </h2>
          <div className="projects-header-line" />
          <p className="projects-subtitle">{subtitle}</p>
        </div>

        {/* GRID */}
        {visibleProjects.length === 0 ? (
          <div className="projects-empty">
            <span className="projects-empty-icon">◈</span>
            <span className="projects-empty-text">{copy.emptyText || 'NO_DEPLOYMENTS_FOUND'}</span>
            <span className="projects-empty-cursor" />
          </div>
        ) : (
          <div className="projects-grid">
            {visibleProjects.map((project, i) => (
              <div
                key={project._id}
                className="projects-grid-item"
                style={{ '--i': i }}
              >
                <ProjectCard project={project} index={i} section={copy} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
