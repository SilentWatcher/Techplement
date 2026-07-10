export default function Footer({ profile }) {
  const { quote = '', email = 'vitekarvikas55@gmail.com', socialLinks: social = {} } = profile || {}

  const socialIcons = [
    { key: 'github', url: social.github, icon: '/assets/homeIcons/socialIcons/github.svg' },
    { key: 'linkedin', url: social.linkedin, icon: '/assets/homeIcons/socialIcons/linkedin.svg' },
    { key: 'instagram', url: social.instagram, icon: '/assets/homeIcons/socialIcons/instagram.svg' },
    { key: 'twitter', url: social.twitter, icon: '/assets/homeIcons/socialIcons/twitter.svg' },
  ].filter((s) => s.url)

  return (
    <footer id="contact" className="py-24 px-6 bg-[#000000]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 opacity-0 animate-fade-in-up">
          <p className="text-xs font-sarpanch tracking-[4px] text-[#ff4655]/80 uppercase mb-2">Contact</p>
          <div className="divider max-w-xs" />
        </div>

        {/* Quote panel */}
        <div className="panel rounded-lg p-8 md:p-12 mb-12 max-w-3xl opacity-0 animate-fade-in-up-delay-1">
          <h1 className="font-pinyon text-2xl md:text-3xl text-[#e5e7eb]/70 leading-relaxed">
            {quote}
          </h1>
        </div>

        {/* Contact bar */}
        <div className="panel rounded-lg p-8 opacity-0 animate-fade-in-up-delay-2">
          <div className="flex justify-between items-start flex-wrap gap-8 max-md:flex-col">
            <div>
              <p className="text-[10px] font-sarpanch tracking-[4px] text-[#ff4655]/60 uppercase mb-2">Something in mind</p>
              <h2 className="font-sarpanch text-3xl tracking-[4px] uppercase text-white">Let&rsquo;s talk.</h2>
            </div>
            <div>
              <p className="text-[10px] font-sarpanch tracking-[4px] text-[#ff4655]/60 uppercase mb-2">Drop a mail</p>
              <p className="font-oxygen text-sm text-[#e5e7eb]/70">{email}</p>
            </div>
            <div>
              <p className="text-[10px] font-sarpanch tracking-[4px] text-[#ff4655]/60 uppercase mb-2">Follow</p>
              <div className="flex gap-4">
                {socialIcons.map((s) => (
                  <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <img src={s.icon} alt={s.key} className="h-5 w-5 brightness-0 invert" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="divider mt-8 mb-4" />

          <div className="flex justify-between items-center flex-wrap gap-2 max-md:flex-col max-md:items-start">
            <p className="font-oxygen text-[10px] text-[#e5e7eb]/30 tracking-[2px] uppercase">
              Copyright 2024 — All rights reserved.
            </p>
            <p className="font-oxygen text-[10px] text-[#e5e7eb]/30 tracking-[2px] uppercase">
              Designed in Figma · Developed in React + Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
