import { getTechIconUrl } from '../../data/techIcons.js'

export default function ProjectCard({ project, index = 0 }) {
  const { title, description, tag, image, liveUrl, sourceCodeUrl, comingSoon, bgColor, techStack } = project

  return (
    <div className="sc-card">
      {/* Cutout corner decorations */}
      <div className="sc-corner sc-corner--tl" />
      <div className="sc-corner sc-corner--tr" />
      <div className="sc-corner sc-corner--bl" />
      <div className="sc-corner sc-corner--br" />

      {/* Top HUD bar */}
      <div className="sc-hud-bar">
        <span className="sc-hud-index">0{index + 1}</span>
        <span className="sc-hud-tag">{tag || 'Web App'}</span>
        <span className="sc-hud-status" data-live={!comingSoon}>
          {comingSoon ? 'PENDING' : 'LIVE'}
        </span>
      </div>

      {/* Image area */}
      <div className="sc-image-wrap" style={{ backgroundColor: bgColor || '#0a0a1a' }}>
        {comingSoon && (
          <div className="sc-coming-soon">
            <span>COMING</span>
            <span>SOON</span>
          </div>
        )}

        {image && (
          <img
            src={image}
            alt={title}
            className="sc-image"
          />
        )}

        {/* Scan line overlay */}
        <div className="sc-scan-overlay" />

        {/* Hover action overlay */}
        <div className="sc-action-overlay">
          <div className="sc-action-bracket" />
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sc-action-btn"
            >
              ◈ LAUNCH
            </a>
          )}
          {sourceCodeUrl && (
            <a
              href={sourceCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sc-action-btn sc-action-btn--outline"
            >
              &lt;/&gt; CODE
            </a>
          )}
        </div>
      </div>

      {/* Info area */}
      <div className="sc-info">
        <div className="sc-info-divider" />
        <h3 className="sc-info-title">{title}</h3>
        {description && (
          <p className="sc-info-desc" title={description}>{description}</p>
        )}

        {/* TECH STACK WITH ICONS */}
        {techStack && techStack.length > 0 && (
          <div className="sc-tech">
            <div className="sc-tech-label">STACK</div>
            <div className="sc-tech-chips">
              {techStack.map((tech, j) => {
                const iconUrl = getTechIconUrl(tech)
                return (
                  <span key={j} className="sc-tech-chip">
                    {iconUrl && (
                      <img src={iconUrl} alt={tech} className="sc-tech-icon" />
                    )}
                    {tech}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        <div className="sc-info-meta">
          <span className="sc-meta-arrow">▶</span>
          <span className="sc-meta-text">INSPECT</span>
          <span className="sc-meta-bracket">//</span>
        </div>
      </div>
    </div>
  )
}
