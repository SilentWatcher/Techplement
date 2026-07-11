import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#project' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vikas-vitekari/' },
  { label: 'Github', href: 'https://github.com/SilentWatcher' },
  { label: 'Instagram', href: 'https://www.instagram.com/vitekarivikas/' },
  { label: 'Twitter', href: 'https://twitter.com/VitekariVikas' },
]

export default function Navbar({ email = 'vitekarvikas55@gmail.com' }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { theme, toggle } = useTheme()

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50
          bg-white/80 dark:bg-[#070014]/80 backdrop-blur-xl
          border-b border-gray-200 dark:border-[#ff4655]/10
          transition-colors duration-300"
      >
        {/* V cutout decorative element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <div className="relative" style={{ width: 120, height: 64 }}>
            <div className="absolute inset-0" style={{
              background: '#ff4655',
              clipPath: 'polygon(0 10%, 70% 90%, 35% 90%, 0 50%)',
              filter: 'blur(20px)',
              opacity: 0.15,
              animation: 'v-glow-pulse 4s ease-in-out infinite',
            }} />
            <div className="absolute inset-0" style={{
              background: '#ff4655',
              clipPath: 'polygon(100% 10%, 100% 50%, 88% 65%, 55% 65%)',
              filter: 'blur(20px)',
              opacity: 0.15,
              animation: 'v-glow-pulse 4s ease-in-out infinite',
            }} />
            <div className="absolute inset-0" style={{
              background: '#ff4655',
              clipPath: 'polygon(0 10%, 70% 90%, 35% 90%, 0 50%)',
              opacity: 0.06,
            }} />
            <div className="absolute inset-0" style={{
              background: '#ff4655',
              clipPath: 'polygon(100% 10%, 100% 50%, 88% 65%, 55% 65%)',
              opacity: 0.06,
            }} />
          </div>
        </div>
        <nav className="flex justify-between items-center px-6 mx-auto max-w-7xl h-16">
          {/* Logo mark */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                <path d="M2 2 L16 30 L30 2" stroke="#ff4655" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity" />
                <path d="M8 8 L16 24 L24 8" stroke="#ff4655" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
              </svg>
            </div>
            <span className="font-sarpanch text-sm tracking-[4px] text-gray-700 dark:text-[#e5e7eb] uppercase hidden sm:block transition-colors duration-300">
              Vikas
            </span>
          </a>

          {/* Desktop nav */}
          <div className="flex items-center gap-1 max-md:hidden">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative px-4 py-2 text-xs font-sarpanch tracking-[3px] uppercase
                  text-gray-500 dark:text-[#e5e7eb]/60 hover:text-[#ff4655] transition-colors duration-300
                  border-animate"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side: toggle + hamburger */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-500 dark:text-[#e5e7eb]/60 hover:text-[#ff4655] dark:hover:text-[#ff4655] hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm11.394-5.834a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="p-2 text-gray-500 dark:text-[#e5e7eb]/60 hover:text-[#ff4655] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <div
            className="relative w-full max-w-sm bg-white dark:bg-[#0a0a18] border-l border-gray-200 dark:border-[#ff4655]/10 shadow-2xl overflow-y-auto transition-colors duration-300"
          >
            <div className="flex flex-col h-full py-8 px-8">
              <button onClick={close} className="absolute top-5 right-5 p-1.5 text-gray-500 dark:text-[#e5e7eb]/60 hover:text-[#ff4655] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              <span className="mt-12 text-xs font-sarpanch tracking-[4px] text-[#ff4655]/60 uppercase">Navigation</span>
              <div className="divider my-3" />

              <ul className="py-4 space-y-2">
                {navLinks.map((l) => (
                  <li key={l.label} className="list-none">
                    <a href={l.href} onClick={close}
                      className="block py-2 text-lg font-sarpanch tracking-[3px] uppercase text-gray-700 dark:text-[#e5e7eb]/70 hover:text-[#ff4655] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <span className="mt-8 text-xs font-sarpanch tracking-[4px] text-[#ff4655]/60 uppercase">Connect</span>
              <div className="divider my-3" />

              <ul className="py-4 space-y-2">
                {socialLinks.map((s) => (
                  <li key={s.label} className="list-none">
                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                      className="block py-2 text-base font-oxygen text-gray-500 dark:text-[#e5e7eb]/60 hover:text-[#ff4655] transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>

              <span className="mt-8 text-xs font-sarpanch tracking-[4px] text-[#ff4655]/60 uppercase">Contact</span>
              <div className="divider my-3" />
              <p className="mt-2 text-sm font-oxygen text-gray-400 dark:text-[#e5e7eb]/50">{email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
