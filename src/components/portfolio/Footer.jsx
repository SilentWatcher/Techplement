import { useTheme } from '../../context/ThemeContext.jsx'
import MouseGlow from './MouseGlow.jsx'
import { getSocialLinks } from '../../data/socialIcons.js'

export default function Footer({ profile, section }) {
  const { theme } = useTheme()
  const { quote = '', email = 'vitekarvikas55@gmail.com' } = profile || {}
  const copy = section || {}
  const socialIcons = getSocialLinks(profile)

  return (
    <footer id="contact" className="relative py-24 px-6 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      {/* Mouse-following glow background */}
      <MouseGlow />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 opacity-0 animate-fade-in-up text-center">
          <p className="text-xs font-sarpanch tracking-[4px] text-[#ff4655]/80 uppercase mb-2">{copy.contactLabel || 'Contact'}</p>
          <div className="divider max-w-xs mx-auto" />
        </div>

        {/* Quote panel */}
        {quote && (
          <div className="contact-card rounded-lg p-8 md:p-12 mb-12 max-w-3xl mx-auto opacity-0 animate-fade-in-up-delay-1">
            <h1 className="font-pinyon text-2xl md:text-3xl text-gray-500 dark:text-[#e5e7eb]/70 leading-relaxed transition-colors duration-300">
              {quote}
            </h1>
          </div>
        )}

        {/* Contact bar */}
        <div className="contact-card rounded-lg p-8 opacity-0 animate-fade-in-up-delay-2">
          <div className="flex justify-between items-start flex-wrap gap-8 max-md:flex-col">
            <div>
              <p className="text-[10px] font-sarpanch tracking-[4px] text-[#ff4655]/60 uppercase mb-2">{copy.quoteLabel || 'Something in mind'}</p>
              <h2 className="font-sarpanch text-3xl tracking-[4px] uppercase text-gray-900 dark:text-white transition-colors duration-300">{copy.heading || "Let's talk."}</h2>
            </div>
            <div>
              <p className="text-[10px] font-sarpanch tracking-[4px] text-[#ff4655]/60 uppercase mb-2">{copy.emailLabel || 'Drop a mail'}</p>
              <p className="font-oxygen text-sm text-gray-500 dark:text-[#e5e7eb]/70 transition-colors duration-300">{email}</p>
            </div>
            <div>
              <p className="text-[10px] font-sarpanch tracking-[4px] text-[#ff4655]/60 uppercase mb-2">{copy.followLabel || 'Follow'}</p>
              <div className="flex gap-4">
                {socialIcons.map((social) => (
                  <a key={`${social.platform}-${social.url}`} href={social.url} target="_blank" rel="noopener noreferrer"
                    className="opacity-50 hover:opacity-100 transition-opacity" title={social.label || social.platform}
                  >
                    {social.icon ? (
                      <img src={social.icon} alt={social.label || social.platform} className={`h-5 w-5 ${theme === 'dark' ? 'brightness-0 invert' : ''}`} />
                    ) : (
                      <span className="text-[10px] uppercase">{social.platform}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="divider mt-8 mb-4" />

          <div className="flex justify-between items-center flex-wrap gap-2 max-md:flex-col max-md:items-start">
            <p className="font-oxygen text-[10px] text-gray-400 dark:text-[#e5e7eb]/30 tracking-[2px] uppercase transition-colors duration-300">
              {copy.copyright || 'Copyright 2024 — All rights reserved.'}
            </p>
            <p className="font-oxygen text-[10px] text-gray-400 dark:text-[#e5e7eb]/30 tracking-[2px] uppercase transition-colors duration-300">
              {copy.credit || 'Designed in Figma · Developed in React + Tailwind'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
