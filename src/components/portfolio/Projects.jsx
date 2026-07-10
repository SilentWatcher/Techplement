import ProjectCard from './ProjectCard.jsx'

export default function Projects({ projects = [] }) {
  return (
    <section id="project" className="projects-section">
      <div className="projects-grid-bg" />

      {/* Red blobs */}
      <div className="projects-blob projects-blob--1" />
      <div className="projects-blob projects-blob--2" />
      <div className="projects-blob projects-blob--3" />

      <div className="projects-container">
        {/* HEADER */}
        <div className="projects-header">
          <div className="projects-badge">
            <span className="projects-badge-dot" />
            <span className="projects-badge-text">// DEPLOYMENTS</span>
          </div>
          <h2 className="projects-title">
            <span className="projects-title-bracket">[</span>
            <span className="projects-title-main">Projects</span>
            <span className="projects-title-bracket">]</span>
          </h2>
          <div className="projects-header-line" />
          <p className="projects-subtitle">
            ACTIVE_BUILD &mdash; {projects.length} ENTRIES
          </p>
        </div>

        {/* GRID */}
        {projects.length === 0 ? (
          <div className="projects-empty">
            <span className="projects-empty-icon">◈</span>
            <span className="projects-empty-text">NO_DEPLOYMENTS_FOUND</span>
            <span className="projects-empty-cursor" />
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div
                key={p._id}
                className="projects-grid-item"
                style={{ '--i': i }}
              >
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
