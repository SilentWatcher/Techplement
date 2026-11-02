import { useEffect, useRef } from 'react'
import { getTechIconUrl } from '../../data/techIcons.js'
import { useMetrics } from '../../context/MetricsContext.jsx'
import StatButton from '../shared/StatButton.jsx'

export default function ProjectCard({ project, index = 0, section }) {
  const {
    _id,
    title,
    description,
    tag,
    image,
    imageAlt,
    links = [],
    comingSoon,
    status,
    bgColor,
    techStack,
  } = project
  const copy = section || {}
  const isComingSoon = status === 'coming-soon' || comingSoon
  const { projects: projectMetrics = {}, track, like } = useMetrics()
  const metrics = projectMetrics[_id] || { views: 0, likes: 0, liked: false }
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el || isComingSoon) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track(_id)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [_id, isComingSoon, track])

  const visibleLinks = links
    .filter((link) => link.visible !== false && link.url)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <div className="sc-card" ref={cardRef}>
      {/* Cutout corner decorations */}
      <div className="sc-corner sc-corner--tl" />
      <div className="sc-corner sc-corner--tr" />
      <div className="sc-corner sc-corner--bl" />
      <div className="sc-corner sc-corner--br" />

      {/* Top HUD bar */}
      <div className="sc-hud-bar">
        <span className="sc-hud-index">0{index + 1}</span>
        <span className="sc-hud-tag">{tag || 'Web App'}</span>
        <span className="sc-hud-status" data-live={!isComingSoon}>
          {isComingSoon ? copy.comingSoonLabel || 'PENDING' : copy.liveLabel || 'LIVE'}
        </span>
      </div>

      {/* Image area */}
      <div className="sc-image-wrap" style={{ backgroundColor: bgColor || '#0a0a1a' }}>
        {isComingSoon && (
          <div className="sc-coming-soon">
            <span>COMING</span>
            <span>SOON</span>
          </div>
        )}

        {image && (
          <img
            src={image}
            alt={imageAlt || title}
            className="sc-image"
          />
        )}

        {/* Scan line overlay */}
        <div className="sc-scan-overlay" />

        {/* Hover action overlay */}
        <div className="sc-action-overlay">
          <div className="sc-action-bracket" />
          {visibleLinks.map((link, linkIndex) => (
            <a
              key={`${link.label}-${link.url}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`sc-action-btn ${linkIndex > 0 ? 'sc-action-btn--outline' : ''}`}
            >
              {link.type === 'source' ? '<\/> ' : '◈ '}
              {link.label || 'Open'}
            </a>
          ))}
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
            <div className="sc-tech-label">{copy.techLabel || 'STACK'}</div>
            <div className="sc-tech-chips">
              {techStack.map((tech, j) => {
                const iconUrl = getTechIconUrl(tech)
                return (
                  <span key={`${tech}-${j}`} className="sc-tech-chip">
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

        <div className="sc-stats">
          <StatButton icon="eye" count={metrics.views} title={`${metrics.views} views`} />
          <StatButton
            icon="heart"
            count={metrics.likes}
            active={metrics.liked}
            onClick={() => like('project', _id)}
            title={metrics.liked ? 'Unlike this project' : 'Like this project'}
          />
        </div>

        <div className="sc-info-meta">
          <span className="sc-meta-arrow">▶</span>
          <span className="sc-meta-text">{copy.inspectLabel || 'INSPECT'}</span>
          <span className="sc-meta-bracket">//</span>
        </div>
      </div>
    </div>
  )
}
