import { useMemo, useEffect, useRef } from 'react'
import { getTechIconUrl } from '../../data/techIcons.js'

export default function ToolsTech({ tech = [], section }) {
  const stack = section || {}

  const enriched = useMemo(
    () =>
      tech
        .filter((item) => item.visible !== false && item.name)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((item, i) => ({
          ...item,
          iconSrc: item.iconUrl || getTechIconUrl(item.name) || getTechIconUrl(item.iconKey) || '',
          num: String(i + 1).padStart(3, '0'),
        })),
    [tech]
  )

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
      <div className="stack-hud-label-left">{stack.hudLeft || 'DEFY THE LIMITS'}</div>
      <div className="stack-hud-label-right">{stack.hudRight || 'FOCUS . BUILD . DEPLOY'}</div>

      <div className="stack-header">
        <div className="stack-system">{stack.systemLabel || 'System Online'}</div>
        <h1 className="stack-title">{stack.title || 'Tech Stack'}</h1>
        <p className="stack-subtitle">
          {stack.subtitle || 'Built with modern technologies for scalable & futuristic solutions'}
        </p>
      </div>

      <div className="stack-grid">
        {enriched.map((item, i) => (
          <div key={item._id || `${item.name}-${i}`} className="stack-card">
            <div className="stack-card-hover-fill" />
            <div className="stack-card-inner">
              <div className="stack-card-header">
                <span>// {(item.category || 'Tech').toUpperCase()}</span>
                <span>{item.num}</span>
              </div>
              <div className={`stack-card-icon glow-${item.glow || 'white'}`}>
                {item.iconSrc ? (
                  <img src={item.iconSrc} alt={item.name} />
                ) : (
                  <span className="text-xs">{item.name.slice(0, 2)}</span>
                )}
              </div>
              <div className="stack-card-footer">
                <div className="stack-tech-name">{item.name}</div>
                <div className="stack-tech-type">{item.type || 'Tool'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="stack-bar">{stack.footerBar || 'SCROLL TO EXPLORE // STAY FOCUSED. KEEP BUILDING.'}</div>
    </section>
  )
}
