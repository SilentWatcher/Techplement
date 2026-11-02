import { useState, useEffect, useMemo } from 'react'
import { useMetrics } from '../../context/MetricsContext.jsx'
import { getSocialLinks } from '../../data/socialIcons.js'
import StatButton from '../shared/StatButton.jsx'

const DEFAULT_WORDS = ['BUILD', 'DESIGN', 'ENGINEER', 'SHIP']
const PARTICLE_COLORS = [
  'rgba(255,7,85,0.85)',
  'rgba(255,255,255,0.55)',
  'rgba(168,85,247,0.6)',
]

function rand(min, max) { return Math.random() * (max - min) + min }
function randInt(min, max) { return Math.floor(rand(min, max + 1)) }

function HeroHeadline({ text = '', accent = '' }) {
  if (!accent || !text.includes(accent)) return <>{text}</>

  const index = text.indexOf(accent)
  return (
    <>
      {text.slice(0, index)}
      <span className="hero-headline-accent">{accent}</span>
      {text.slice(index + accent.length)}
    </>
  )
}

export default function Home({ profile, section }) {
  const { bio = '', resumeUrl = '' } = profile || {}
  const hero = section || {}
  const words = hero.rotatingWords?.length ? hero.rotatingWords : DEFAULT_WORDS
  const statusLabels = hero.statusLabels?.length
    ? hero.statusLabels
    : ['SYSTEM ACTIVE', 'ACCESS GRANTED']
  const role = hero.role || 'FULL STACK DEVELOPER'
  const headline = hero.headline || 'Building Digital Experiences.'
  const headlineAccent = hero.headlineAccent || 'Experiences.'
  const secondaryHeadline = hero.secondaryHeadline || 'Scalable Applications. Better Experiences.'
  const description = hero.description || bio
  const primaryLabel = hero.primaryCta?.label || 'VIEW PROJECTS →'
  const primaryHref = hero.primaryCta?.href || '#project'
  const secondaryLabel = hero.secondaryCta?.label || hero.resumeLabel || 'VIEW RESUME'
  const secondaryHref = hero.secondaryCta?.href || resumeUrl
  const socialIcons = getSocialLinks(profile)
  const { site, like } = useMetrics()

  const [wordIdx, setWordIdx] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!showContent) return
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2800)
    return () => clearInterval(t)
  }, [showContent, words.length])

  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < 18; i++) {
      const size = randInt(1, 3)
      arr.push({
        id: `p-${i}`,
        size,
        top: rand(12, 88),
        left: rand(8, 92),
        color: PARTICLE_COLORS[randInt(0, PARTICLE_COLORS.length - 1)],
        dx: `${rand(-48, 48)}px`,
        dy: `${rand(-48, 48)}px`,
        delay: rand(0, 6),
        dur: rand(7, 13),
      })
    }
    return arr
  }, [])

  return (
    <section
      id="home"
      className="hero-section relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Layer 1 — deep black base */}
      <div className="hero-base" aria-hidden="true" />

      {/* Layer 2 — dark red / purple radial atmosphere */}
      <div className="hero-aurora" aria-hidden="true" />

      {/* Layer 3 — technical grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Layer 4 — original animated V backdrop (restored) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 3 }}
        aria-hidden="true"
      >
        <div className="animate-v-intro" style={{ width: 420, height: 420, marginTop: '-80px' }}>
          <div className="absolute inset-0" style={{ background: '#ff4655', clipPath: 'polygon(0 10%, 70% 90%, 35% 90%, 0 50%)', filter: 'blur(50px)', opacity: 0.35, animation: 'v-glow-pulse 4s ease-in-out infinite' }} />
          <div className="absolute inset-0" style={{ background: '#ff4655', clipPath: 'polygon(100% 10%, 100% 50%, 88% 65%, 55% 65%)', filter: 'blur(50px)', opacity: 0.35, animation: 'v-glow-pulse 4s ease-in-out infinite' }} />
          <div className="absolute inset-0" style={{ background: '#ff4655', clipPath: 'polygon(0 10%, 70% 90%, 35% 90%, 0 50%)', filter: 'blur(20px) drop-shadow(0 0 60px rgba(255,70,85,0.6))', opacity: 0.5 }} />
          <div className="absolute inset-0" style={{ background: '#ff4655', clipPath: 'polygon(100% 10%, 100% 50%, 88% 65%, 55% 65%)', filter: 'blur(20px) drop-shadow(0 0 60px rgba(255,70,85,0.6))', opacity: 0.5 }} />
          <div className="absolute inset-0" style={{ background: '#ff4655', clipPath: 'polygon(0 10%, 70% 90%, 35% 90%, 0 50%)', opacity: 0.6, boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.3), inset 8px 8px 20px rgba(255,255,255,0.08)' }} />
          <div className="absolute inset-0" style={{ background: '#ff4655', clipPath: 'polygon(100% 10%, 100% 50%, 88% 65%, 55% 65%)', opacity: 0.6, boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.3), inset 8px 8px 20px rgba(255,255,255,0.08)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)', mixBlendMode: 'overlay', clipPath: 'polygon(0 10%, 70% 90%, 35% 90%, 0 50%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(225deg, rgba(255,255,255,0.12) 0%, transparent 50%)', mixBlendMode: 'overlay', clipPath: 'polygon(100% 10%, 100% 50%, 88% 65%, 55% 65%)' }} />
        </div>
      </div>

      {/* Layer 6 — floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="hero-particle absolute rounded-full"
          aria-hidden="true"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.top}%`,
            left: `${p.left}%`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 6}px ${p.color}`,
            '--dx': p.dx,
            '--dy': p.dy,
            animation: `particle-drift ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Layer 7 — scanlines + moving beam */}
      <div className="hero-scanlines" aria-hidden="true" />

      {/* Layer 8 — grain */}
      <div className="hero-noise" aria-hidden="true" />

      {/* Layer 8b — edge vignette */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* Layer 9 — HUD frame + side telemetry */}
      <div className="hero-hud-frame" aria-hidden="true">
        <span className="hero-hud-corner hero-hud-corner--tl" />
        <span className="hero-hud-corner hero-hud-corner--tr" />
        <span className="hero-hud-corner hero-hud-corner--bl" />
        <span className="hero-hud-corner hero-hud-corner--br" />
      </div>
      <span className="hero-side-code hero-side-code--left" aria-hidden="true">
        SYSTEM // ONLINE
      </span>
      <span className="hero-side-code hero-side-code--right" aria-hidden="true">
        PORTFOLIO // 2026
      </span>

      {/* Layer 5 — text scrim (appears with content for readability) */}
      <div className={`hero-scrim ${showContent ? 'visible' : ''}`} aria-hidden="true" />

      {/* Foreground content */}
      <div className="hero-content relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        {/* Status indicators */}
        <div className={`hero-status-bar ${showContent ? 'visible' : ''}`}>
          <span className="status-dot" />
          <span className="status-text">{statusLabels[0]}</span>
          <span className="status-sep">/</span>
          <span className="status-text status-text--muted">{statusLabels[1] || ''}</span>
          <span className="status-dot" />
        </div>

        {/* Giant cycling headline — animation preserved */}
        <h1
          className={`hero-word-wrapper ${showContent ? 'visible' : ''}`}
          aria-label={`${words[wordIdx]} — ${role}`}
        >
          <span className="hero-word-accent" aria-hidden="true" />
          <span className="hero-word-stack">
            {showContent && (
              <span className="hero-word" key={wordIdx}>
                {words[wordIdx]}
              </span>
            )}
          </span>
          <span className="hero-word-accent" aria-hidden="true" />
        </h1>

        {/* Developer role */}
        <p className={`hero-role ${showContent ? 'visible' : ''}`}>{role}</p>

        {/* Primary headline */}
        <h2 className={`hero-headline ${showContent ? 'visible' : ''}`}>
          <HeroHeadline text={headline} accent={headlineAccent} />
        </h2>

        {/* Secondary headline */}
        <p className={`hero-secondary ${showContent ? 'visible' : ''}`}>{secondaryHeadline}</p>

        {/* Description */}
        {description && (
          <p className={`hero-description ${showContent ? 'visible' : ''}`}>{description}</p>
        )}

        {/* Calls to action */}
        <div className={`hero-buttons ${showContent ? 'visible' : ''}`}>
          <a href={primaryHref} className="hero-btn hero-btn--primary">
            {primaryLabel}
          </a>
          {secondaryHref && (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn--ghost"
            >
              {secondaryLabel}
            </a>
          )}
        </div>

        {/* Socials + live metrics */}
        <div className={`hero-meta ${showContent ? 'visible' : ''}`}>
          <div className="hero-social">
            <span className="hero-social-label">{hero.socialLabel || 'Connect'}</span>
            <span className="hero-social-line" aria-hidden="true" />
            <div className="flex items-center gap-3">
              {socialIcons.map((s) => (
                <a
                  key={`${s.platform}-${s.url}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-icon"
                  title={s.label || s.platform}
                >
                  {s.icon ? (
                    <img src={s.icon} alt={s.label || s.platform} className="h-4 w-4 brightness-0 invert" />
                  ) : (
                    <span className="text-[10px] uppercase">{s.platform}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
          <span className="hero-meta-divider" aria-hidden="true" />
          <div className="hero-metrics visible">
            <StatButton icon="eye" count={site.views} title="Site views" />
            <StatButton
              icon="heart"
              count={site.likes}
              active={site.liked}
              onClick={() => like('site')}
              title={site.liked ? 'Unlike this site' : 'Like this site'}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`hero-scroll ${showContent ? 'visible' : ''}`}>
        <span className="hero-scroll-text">{hero.scrollLabel || 'Scroll'}</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </div>
    </section>
  )
}
