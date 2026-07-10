import { useState } from 'react'

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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50
          bg-[#070014]/80 backdrop-blur-xl
          border-b border-[#ff4655]/10"
      >
        <nav className="flex justify-between items-center px-6 mx-auto max-w-7xl h-16">
          {/* Logo mark */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                <path d="M2 2 L16 30 L30 2" stroke="#ff4655" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity" />
                <path d="M8 8 L16 24 L24 8" stroke="#ff4655" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
              </svg>
            </div>
            <span className="font-sarpanch text-sm tracking-[4px] text-[#e5e7eb] uppercase hidden sm:block">
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
                  text-[#e5e7eb]/60 hover:text-[#ff4655] transition-colors duration-300
                  border-animate"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 text-[#e5e7eb]/60 hover:text-[#ff4655] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <div
            className="relative w-full max-w-sm bg-[#0a0a18] border-l border-[#ff4655]/10 shadow-2xl overflow-y-auto"
          >
            <div className="flex flex-col h-full py-8 px-8">
              <button onClick={close} className="absolute top-5 right-5 p-1.5 text-[#e5e7eb]/60 hover:text-[#ff4655] transition-colors">
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
                      className="block py-2 text-lg font-sarpanch tracking-[3px] uppercase text-[#e5e7eb]/70 hover:text-[#ff4655] transition-colors"
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
                      className="block py-2 text-base font-oxygen text-[#e5e7eb]/60 hover:text-[#ff4655] transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>

              <span className="mt-8 text-xs font-sarpanch tracking-[4px] text-[#ff4655]/60 uppercase">Contact</span>
              <div className="divider my-3" />
              <p className="mt-2 text-sm font-oxygen text-[#e5e7eb]/50">{email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
