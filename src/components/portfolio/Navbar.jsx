import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'
import { getSocialLinks } from '../../data/socialIcons.js'

export default function Navbar({ settings, profile }) {
  const [open, setOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')
  const close = () => setOpen(false)
  const { theme, toggle } = useTheme()

  const brand = settings?.brand || {}
  const navLinks = (settings?.nav?.links || [])
    .filter((link) => link.visible !== false && link.label)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
  const socialLinks = getSocialLinks(profile)
  const navKey = navLinks.map((link) => link.href).join('|')

  useEffect(() => {
    const links = navLinks.filter((link) => link.href?.startsWith('#'))
    if (!links.length) return

    const update = () => {
      const offset = window.scrollY + 160
      let current = links[0].href

      for (const link of links) {
        const el = document.querySelector(link.href)
        if (el && el.offsetTop <= offset) current = link.href
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = links[links.length - 1].href

      setActiveHref(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navKey])

  return (
    <>
      <header className="pf-nav">
        <nav className="pf-nav__inner">
          {/* Logo mark */}
          <a href="#home" className="pf-nav__brand">
            <span className="pf-nav__logo">
              {brand.logoImage ? (
                <img src={brand.logoImage} alt={brand.name || 'Logo'} className="h-8 w-8 object-contain" />
              ) : (
                <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
                  <path d="M2 2 L16 30 L30 2" stroke="#FF0755" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 8 L16 24 L24 8" stroke="#FF0755" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
                </svg>
              )}
            </span>
            <span className="pf-nav__brand-text">{brand.logoText || brand.name || ''}</span>
          </a>

          {/* Desktop nav */}
          <div className="pf-nav__links">
            {navLinks.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                className={`pf-nav__link ${activeHref === link.href ? 'is-active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: toggle + hamburger */}
          <div className="pf-nav__actions">
            <button
              onClick={toggle}
              className="pf-nav__icon-btn"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm11.394-5.834a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setOpen(true)}
              className="pf-nav__icon-btn"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 17.25z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <div className="relative w-full max-w-sm bg-white dark:bg-[#0a0a18] border-l border-gray-200 dark:border-[#ff0755]/12 shadow-2xl overflow-y-auto transition-colors duration-300">
            <div className="flex flex-col h-full py-8 px-8">
              <button onClick={close} className="absolute top-5 right-5 p-1.5 text-gray-500 dark:text-[#e5e7eb]/60 hover:text-[#ff0755] transition-colors" aria-label="Close menu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              <span className="mt-12 text-xs font-sarpanch tracking-[4px] text-[#ff0755]/70 uppercase">Navigation</span>
              <div className="divider my-3" />

              <ul className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={`${link.label}-${link.href}`} className="list-none">
                    <a href={link.href} onClick={close}
                      className="block py-2 text-lg font-sarpanch tracking-[3px] uppercase text-gray-700 dark:text-[#e5e7eb]/70 hover:text-[#ff0755] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <span className="mt-8 text-xs font-sarpanch tracking-[4px] text-[#ff0755]/70 uppercase">Connect</span>
              <div className="divider my-3" />

              <ul className="py-4 space-y-2">
                {socialLinks.map((link) => (
                  <li key={`${link.platform}-${link.url}`} className="list-none">
                    <a href={link.url} target="_blank" rel="noopener noreferrer"
                      className="block py-2 text-base font-oxygen text-gray-500 dark:text-[#e5e7eb]/60 hover:text-[#ff0755] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <span className="mt-8 text-xs font-sarpanch tracking-[4px] text-[#ff0755]/70 uppercase">Contact</span>
              <div className="divider my-3" />
              <p className="mt-2 text-sm font-oxygen text-gray-400 dark:text-[#e5e7eb]/50">{profile?.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
