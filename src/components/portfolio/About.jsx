import { useRef, useEffect, useState, useMemo } from 'react'

function TypeWriter({ text, speed = 18 }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!text) {
      setDisplayed('')
      setDone(true)
      return
    }
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

export default function About({ profile, section }) {
  const { aboutParagraph = '', aboutCards = [], name = '', title = '' } = profile || {}
  const about = section || {}
  const [activeCard, setActiveCard] = useState(null)
  const sectionRef = useRef(null)

  const cards = (aboutCards || [])
    .filter((card) => card.visible !== false && (card.title || card.description))
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  const techStack = useMemo(() => {
    const set = new Set()
    cards.forEach((card) => (card.tags || []).forEach((tag) => set.add(tag)))
    return Array.from(set).slice(0, 8)
  }, [cards])

  const commands = useMemo(() => {
    if (Array.isArray(about.commands) && about.commands.length) {
      return about.commands
        .filter((cmd) => cmd && (cmd.command || '').trim())
        .map((cmd) => ({
          command: cmd.command,
          output:
            cmd.output ||
            (cmd.command.includes('introduction')
              ? aboutParagraph
              : cmd.command.includes('focus')
              ? about.focusText || aboutParagraph
              : ''),
        }))
    }
    const prompts = about.prompts?.length ? about.prompts : ['whoami', 'cat introduction.txt', 'cat focus.txt']
    return prompts.map((prompt, index) => ({
      command: prompt,
      output:
        index === 0
          ? `${name || 'Vikas'} — ${title || 'Full Stack Developer'}`
          : index === 1
          ? aboutParagraph
          : about.focusText || aboutParagraph,
    }))
  }, [about.commands, about.prompts, about.focusText, aboutParagraph, name, title])

  const [activeIndex, setActiveIndex] = useState(0)
  const [typedCmd, setTypedCmd] = useState('')
  const [typedOut, setTypedOut] = useState('')
  const [typing, setTyping] = useState(false)

  const runCommand = (index) => {
    if (typing || !commands.length) return
    const safeIndex = Math.max(0, Math.min(index, commands.length - 1))
    const cmd = commands[safeIndex]?.command || ''
    const out = commands[safeIndex]?.output || ''
    setActiveIndex(safeIndex)
    setTypedCmd('')
    setTypedOut('')
    setTyping(true)

    let i = 0
    const cmdTimer = setInterval(() => {
      i++
      setTypedCmd(cmd.slice(0, i))
      if (i >= cmd.length) {
        clearInterval(cmdTimer)
        setTimeout(() => {
          let j = 0
          const outTimer = setInterval(() => {
            j++
            setTypedOut(out.slice(0, j))
            if (j >= out.length) {
              clearInterval(outTimer)
              setTyping(false)
            }
          }, 18)
        }, 380)
      }
    }, 42)
  }

  const hasRunRef = useRef(false)
  useEffect(() => {
    if (!commands.length || hasRunRef.current) return
    hasRunRef.current = true
    runCommand(0)
  }, [commands.length])

  return (
    <section id="about" ref={sectionRef} className="about-section">
      {/* SUBTLE GRID OVERLAY */}
      <div className="about-grid-overlay" />

      {/* HUD SIDE LABELS */}
      <div className="about-hud about-hud--left">
        <span className="about-hud-line" />
        <span className="about-hud-text">{about.hudLeft || 'IDENTITY'}</span>
        <span className="about-hud-line" />
      </div>
      <div className="about-hud about-hud--right">
        <span className="about-hud-line" />
        <span className="about-hud-text">{about.hudRight || 'ORIGIN'}</span>
        <span className="about-hud-line" />
      </div>

      <div className="about-container">
        {/* HEADER */}
        <div className="about-header">
          <div className="about-badge">
            <span className="about-badge-dot" />
            <span className="about-badge-text">{about.badge || '// SECTION_01'}</span>
          </div>
          <h2 className="about-title">
            <span className="about-title-bracket">[</span>
            <span className="about-title-main">{about.title || 'About'}</span>
            <span className="about-title-bracket">]</span>
          </h2>
          <div className="about-header-line" />
        </div>

        {/* MAIN LAYOUT */}
        <div className="about-layout">
          {/* LEFT — PROFILE CARD */}
          <div className="about-image-panel about-profile-panel">
            <div className="about-profile-card">
              <div className="about-image-frame">
                <div className="about-image-scanner" />
                {about.image && (
                  <img
                    src={about.image}
                    alt={profile?.name || 'about'}
                    className="about-image"
                    loading="lazy"
                  />
                )}
                <div className="about-image-corner about-image-corner--tl" />
                <div className="about-image-corner about-image-corner--tr" />
                <div className="about-image-corner about-image-corner--bl" />
                <div className="about-image-corner about-image-corner--br" />
              </div>
              <div className="about-profile-meta">
                <h3 className="about-profile-name">{name || 'Vikas Sr Vitekari'}</h3>
                <p className="about-profile-role">{title || 'Full Stack Developer'}</p>
                <div className="about-availability">
                  <span className="about-availability-dot" />
                  <span>{about.availability || 'Available for work'}</span>
                </div>
                {techStack.length > 0 && (
                  <div className="about-profile-tags">
                    {techStack.map((tag) => (
                      <span key={tag} className="about-card-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="about-image-meta">
                <span className="about-meta-key">STATUS</span>
                <span className="about-meta-val">{about.status || 'ACTIVE'}</span>
                <span className="about-meta-divider">|</span>
                <span className="about-meta-key">CLEARANCE</span>
                <span className="about-meta-val">{about.clearance || 'LEVEL_5'}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="about-content">
            <div className="about-terminal-bar">
              <span className="about-terminal-dot about-terminal-dot--r" />
              <span className="about-terminal-dot about-terminal-dot--y" />
              <span className="about-terminal-dot about-terminal-dot--g" />
              <span className="about-terminal-path">{about.terminalPath || '~ /about/intro'}</span>
            </div>

            <div className="about-terminal-body">
              {/* COMMAND LIST */}
              <div className="about-command-list">
                {commands.map((cmd, index) => (
                  <button
                    key={`${cmd.command}-${index}`}
                    type="button"
                    className={`about-cmd-btn ${activeIndex === index ? 'about-cmd-btn--active' : ''}`}
                    onClick={() => runCommand(index)}
                    disabled={typing}
                  >
                    <span className="about-cmd-prompt">❯</span>
                    <span>{cmd.command}</span>
                  </button>
                ))}
              </div>

              {/* TYPED COMMAND */}
              <div className="about-line about-line--prompt">
                <span className="about-prompt-symbol">❯</span>
                <span className="about-prompt-cmd">
                  {typedCmd}
                  {typing && typedCmd.length < (commands[activeIndex]?.command || '').length && (
                    <span className="about-typing-cursor" />
                  )}
                </span>
              </div>

              {/* TYPED OUTPUT */}
              <p className="about-paragraph">
                {typedOut}
                {typing && typedOut.length < (commands[activeIndex]?.output || '').length && (
                  <span className="about-typing-cursor" />
                )}
                {!typing && !typedOut && <span className="about-typing-cursor" />}
              </p>
            </div>
          </div>
        </div>

        {/* SKILL CARDS — FULL WIDTH */}
        {cards.length > 0 && (
          <div className="about-cards-grid">
            {cards.map((card, i) => (
              <div
                key={`${card.title}-${i}`}
                className={`about-card ${activeCard === i ? 'about-card--active' : ''}`}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="about-card-glint" />
                <div className="about-card-header">
                  {card.icon && (
                    <img src={card.icon} alt={card.title} className="about-card-icon" />
                  )}
                  <span className="about-card-number">0{i + 1}</span>
                </div>
                <h3 className="about-card-title">{card.title}</h3>
                <p className="about-card-desc">{card.description}</p>
                {card.tags?.length > 0 && (
                  <div className="about-card-tags">
                    {card.tags.map((tag, j) => (
                      <span key={`${tag}-${j}`} className="about-card-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="about-card-bar">
                  <div className="about-card-bar-fill" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
