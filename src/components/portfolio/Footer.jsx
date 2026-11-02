import { useTheme } from '../../context/ThemeContext.jsx'
import MouseGlow from './MouseGlow.jsx'
import { getSocialLinks } from '../../data/socialIcons.js'

export default function Footer({ profile, section }) {
  const { theme } = useTheme()
  const { email = 'vitekarivikas55@gmail.com' } = profile || {}
  const copy = section || {}
  const socialIcons = getSocialLinks(profile)

  return (
    <footer id="site-footer" className="relative py-16 px-6 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <MouseGlow />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-6 border-t border-b border-gray-200 dark:border-[#ff4655]/15">
          <div className="flex items-center gap-3">
            <span className="font-sarpanch text-sm tracking-[4px] uppercase text-gray-900 dark:text-white">
              VIKAS
            </span>
            <span className="text-[10px] font-oxygen text-gray-400 dark:text-[#e5e7eb]/30 tracking-[2px] uppercase">
              {copy.copyright || 'Copyright 2026 — All rights reserved.'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socialIcons.map((social) => (
              <a
                key={`${social.platform}-${social.url}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity"
                title={social.label || social.platform}
              >
                {social.icon ? (
                  <img
                    src={social.icon}
                    alt={social.label || social.platform}
                    className={`h-4 w-4 ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
                  />
                ) : (
                  <span className="text-[10px] uppercase">{social.platform}</span>
                )}
              </a>
            ))}
            <a
              href={`mailto:${email}`}
              className="text-[10px] font-oxygen text-gray-400 dark:text-[#e5e7eb]/40 hover:text-[#ff4655] transition-colors tracking-[1px]"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4">
          <p className="font-oxygen text-[10px] text-gray-400 dark:text-[#e5e7eb]/25 tracking-[2px] uppercase">
            {copy.credit || 'Designed in Figma · Developed in React + Tailwind'}
          </p>
        </div>
      </div>
    </footer>
  )
}
