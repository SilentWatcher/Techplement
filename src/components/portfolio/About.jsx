import { useRef, useEffect, useState } from 'react'

const cards = [
  {
    icon: '/assets/aboutIcons/Design.png',
    title: 'Design',
    desc: 'Crafting pixel-perfect interfaces with obsessive attention to detail, color theory, and motion design.',
    stats: ['UI/UX', 'Figma', 'Prototype'],
  },
  {
    icon: '/assets/aboutIcons/code.png',
    title: 'Develop',
    desc: 'Architecting scalable frontend systems with React, clean code, and performance-first thinking.',
    stats: ['React', 'Next.js', 'TypeScript'],
  },
  {
    icon: '/assets/aboutIcons/chess.png',
    title: 'Strategize',
    desc: 'Thinking multiple moves ahead — every component, every state, every edge case planned.',
    stats: ['System Design', 'Optimization', 'Logic'],
  },
]

function TypeWriter({ text, speed = 40 }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!text) return
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(id)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <span>
      {displayed}
      {!done && <span className="about-typing-cursor" />}
    </span>
  )
}

export default function About({ profile }) {
  const { aboutParagraph = '' } = profile || {}
  const [activeCard, setActiveCard] = useState(null)
  const sectionRef = useRef(null)

  return (
    <section id="about" ref={sectionRef} className="about-section">
      {/* SUBTLE GRID OVERLAY */}
      <div className="about-grid-overlay" />

      {/* HUD SIDE LABELS */}
      <div className="about-hud about-hud--left">
        <span className="about-hud-line" />
        <span className="about-hud-text">IDENTITY</span>
        <span className="about-hud-line" />
      </div>
      <div className="about-hud about-hud--right">
        <span className="about-hud-line" />
        <span className="about-hud-text">ORIGIN</span>
        <span className="about-hud-line" />
      </div>

      <div className="about-container">
        {/* HEADER */}
        <div className="about-header">
          <div className="about-badge">
            <span className="about-badge-dot" />
            <span className="about-badge-text">// SECTION_01</span>
          </div>
          <h2 className="about-title">
            <span className="about-title-bracket">[</span>
            <span className="about-title-main">About</span>
            <span className="about-title-bracket">]</span>
          </h2>
          <div className="about-header-line" />
        </div>

        {/* MAIN LAYOUT */}
        <div className="about-layout">
          {/* LEFT — IMAGE PANEL */}
          <div className="about-image-panel">
            <div className="about-image-frame">
              <div className="about-image-scanner" />
              <img
                src="/assets/aboutIcons/frontendGuy.png"
                alt="frontend guy"
                className="about-image"
              />
              <div className="about-image-corner about-image-corner--tl" />
              <div className="about-image-corner about-image-corner--tr" />
              <div className="about-image-corner about-image-corner--bl" />
              <div className="about-image-corner about-image-corner--br" />
            </div>
            <div className="about-image-meta">
              <span className="about-meta-key">STATUS</span>
              <span className="about-meta-val">ACTIVE</span>
              <span className="about-meta-divider">|</span>
              <span className="about-meta-key">CLEARANCE</span>
              <span className="about-meta-val">LEVEL_5</span>
            </div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="about-content">
            <div className="about-terminal-bar">
              <span className="about-terminal-dot about-terminal-dot--r" />
              <span className="about-terminal-dot about-terminal-dot--y" />
              <span className="about-terminal-dot about-terminal-dot--g" />
              <span className="about-terminal-path">~ /about/intro</span>
            </div>

            <div className="about-terminal-body">
              <div className="about-line about-line--prompt">
                <span className="about-prompt-symbol">❯</span>
                <span className="about-prompt-cmd">cat introduction.txt</span>
              </div>

              <p className="about-paragraph">
                <TypeWriter text={aboutParagraph} />
              </p>

              <div className="about-line about-line--prompt about-line--second">
                <span className="about-prompt-symbol">❯</span>
                <span className="about-prompt-cmd">./what-i-do.sh</span>
              </div>
            </div>

            {/* SKILL CARDS */}
            <div className="about-cards-grid">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className={`about-card ${activeCard === i ? 'about-card--active' : ''}`}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="about-card-glint" />
                  <div className="about-card-header">
                    <img src={card.icon} alt={card.title} className="about-card-icon" />
                    <span className="about-card-number">0{i + 1}</span>
                  </div>
                  <h3 className="about-card-title">{card.title}</h3>
                  <p className="about-card-desc">{card.desc}</p>
                  <div className="about-card-tags">
                    {card.stats.map((tag, j) => (
                      <span key={j} className="about-card-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="about-card-bar">
                    <div className="about-card-bar-fill" style={{ width: `${60 + i * 20}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
