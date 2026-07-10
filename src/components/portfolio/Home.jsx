import { useMemo } from 'react'

function rand(min, max) { return Math.random() * (max - min) + min }
function randInt(min, max) { return Math.floor(rand(min, max + 1)) }

const MICRO_COLORS = ['#ff4655', '#ffffff', '#ff4655', '#7c3aed', '#e5e7eb']
const GLOW_COLORS = ['rgba(255,70,85,0.4)', 'rgba(255,70,85,0.35)', 'rgba(255,70,85,0.3)', 'rgba(124,58,237,0.2)']

export default function Home({ profile }) {
  const { name = 'Vikas', bio = '', socialLinks: social = {}, resumeUrl = '' } = profile || {}

  const socialIcons = [
    { key: 'github', url: social.github, icon: '/assets/homeIcons/socialIcons/github.svg' },
    { key: 'linkedin', url: social.linkedin, icon: '/assets/homeIcons/socialIcons/linkedin.svg' },
    { key: 'instagram', url: social.instagram, icon: '/assets/homeIcons/socialIcons/instagram.svg' },
    { key: 'twitter', url: social.twitter, icon: '/assets/homeIcons/socialIcons/twitter.svg' },
  ].filter((s) => s.url)

  /* ===== RANDOM TECH LINES ===== */
  const lines = useMemo(() => {
    const arr = []
    // horizontal lines (20–120px wide)
    for (let i = 0; i < 22; i++) {
      arr.push({
        id: `hl-${i}`,
        orientation: 'h',
        length: randInt(20, 120),
        top: rand(4, 96),
        left: rand(2, 92),
        dashed: Math.random() < 0.25,
        glow: Math.random() < 0.35,
        opacity: rand(0.35, 0.8),
        driftDelay: rand(0, 3),
        driftDur: rand(2, 4),
        fadeDelay: rand(0, 2),
        fadeDur: rand(1.5, 3),
      })
    }
    // vertical lines (10–80px tall)
    for (let i = 0; i < 16; i++) {
      arr.push({
        id: `vl-${i}`,
        orientation: 'v',
        length: randInt(10, 80),
        top: rand(4, 88),
        left: rand(4, 96),
        dashed: Math.random() < 0.25,
        glow: Math.random() < 0.35,
        opacity: rand(0.35, 0.8),
        driftDelay: rand(0, 3),
        driftDur: rand(2, 4),
        fadeDelay: rand(0, 2),
        fadeDur: rand(1.5, 3),
      })
    }
    return arr
  }, [])

  /* ===== MICRO ELEMENTS ===== */
  const micros = useMemo(() => {
    const arr = []
    for (let i = 0; i < 18; i++) {
      const type = Math.random() < 0.55 ? 'square' : 'triangle'
      arr.push({
        id: `m-${i}`,
        type,
        size: type === 'square' ? randInt(2, 4) : randInt(3, 6),
        top: rand(3, 97),
        left: rand(3, 97),
        color: MICRO_COLORS[randInt(0, MICRO_COLORS.length - 1)],
        delay: rand(0, 5),
        dur: rand(2, 5),
      })
    }
    return arr
  }, [])

  /* ===== KINETIC FLOATING PARTICLES ===== */
  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < 24; i++) {
      const dx = rand(-60, 60)
      const dy = rand(-60, 60)
      arr.push({
        id: `p-${i}`,
        size: randInt(2, 5),
        top: rand(10, 90),
        left: rand(10, 90),
        color: GLOW_COLORS[randInt(0, GLOW_COLORS.length - 1)],
        dx,
        dy,
        delay: rand(0, 6),
        dur: rand(6, 12),
      })
    }
    return arr
  }, [])

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* ===== LAYER 1: PURE BLACK BASE ===== */}
      <div className="absolute inset-0" style={{
        background: '#000000',
      }} />

      {/* ===== LAYER 2: DOT GRID (40px spacing) ===== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ===== LAYER 3: NOISE TEXTURE ===== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '256px 256px',
        }}
      />

      {/* ===== LAYER 4: RANDOM TECH LINES ===== */}
      {lines.map((l) => {
        const isH = l.orientation === 'h'
        return (
          <div
            key={l.id}
            className="absolute pointer-events-none"
            style={{
              top: `${l.top}%`,
              left: `${l.left}%`,
              [isH ? 'width' : 'height']: `${l.length}px`,
              [isH ? 'height' : 'width']: '1px',
              background: l.dashed ? 'transparent' : `rgba(255,70,85,${l.opacity})`,
              border: l.dashed ? `1px dashed rgba(255,70,85,${l.opacity})` : 'none',
              filter: l.glow ? 'blur(2px)' : 'none',
              animation: `
                line-${isH ? 'drift-h' : 'drift-v'} ${l.driftDur}s ease-in-out ${l.driftDelay}s infinite,
                line-fade ${l.fadeDur}s ease-in-out ${l.fadeDelay}s infinite
              `,
              zIndex: 1,
            }}
          />
        )
      })}

      {/* ===== LAYER 5: MICRO ELEMENTS ===== */}
      {micros.map((m) => (
        <div
          key={m.id}
          className="absolute pointer-events-none"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            zIndex: 1,
            animation: `flicker ${m.dur}s ease-in-out ${m.delay}s infinite`,
            ...(m.type === 'square'
              ? { width: `${m.size}px`, height: `${m.size}px`, background: m.color }
              : {
                  width: 0,
                  height: 0,
                  borderLeft: `${m.size / 2}px solid transparent`,
                  borderRight: `${m.size / 2}px solid transparent`,
                  borderBottom: `${m.size}px solid ${m.color}`,
                }
            ),
          }}
        />
      ))}

      {/* ===== LAYER 6: KINETIC FLOATING PARTICLES ===== */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.top}%`,
            left: `${p.left}%`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            animation: `particle-drift ${p.dur}s ease-in-out ${p.delay}s infinite`,
            zIndex: 1,
          }}
        />
      ))}

      {/* ===== LAYER 7: GOD-LEVEL V GLOW (behind the V) ===== */}
      {/* Wide ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] max-md:w-[600px] max-md:h-[600px] rounded-full pointer-events-none animate-bg-glow-pulse"
        style={{ zIndex: 2 }}
      />
      {/* Second intense inner glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-md:w-[400px] max-md:h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,70,85,0.3) 0%, rgba(255,70,85,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'v-glow-pulse 4s ease-in-out infinite',
          zIndex: 2,
        }}
      />

      {/* ===== LAYER 8: MASSIVE VALORANT V LOGO ===== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ zIndex: 3 }}>
        <div className="relative animate-v-intro" style={{ width: 500, height: 500 }}>
          {/* V shape glow bloom layer */}
          <div className="absolute inset-0" style={{
            background: '#ff4655',
            clipPath: 'polygon(0 10%, 70% 90%, 35% 90%, 0 50%)',
            filter: 'blur(40px)',
            opacity: 0.6,
            animation: 'v-glow-pulse 4s ease-in-out infinite',
          }} />
          <div className="absolute inset-0" style={{
            background: '#ff4655',
            clipPath: 'polygon(100% 10%, 100% 50%, 88% 65%, 55% 65%)',
            filter: 'blur(40px)',
            opacity: 0.6,
            animation: 'v-glow-pulse 4s ease-in-out infinite',
          }} />

          {/* V shape drop-shadow layer */}
          <div className="absolute inset-0" style={{
            background: '#ff4655',
            clipPath: 'polygon(0 10%, 70% 90%, 35% 90%, 0 50%)',
            filter: 'blur(20px) drop-shadow(0 0 80px rgba(255,70,85,0.8))',
            opacity: 0.8,
          }} />
          <div className="absolute inset-0" style={{
            background: '#ff4655',
            clipPath: 'polygon(100% 10%, 100% 50%, 88% 65%, 55% 65%)',
            filter: 'blur(20px) drop-shadow(0 0 80px rgba(255,70,85,0.8))',
            opacity: 0.8,
          }} />

          {/* V shape solid core */}
          <div className="absolute inset-0" style={{
            background: '#ff4655',
            clipPath: 'polygon(0 10%, 70% 90%, 35% 90%, 0 50%)',
            opacity: 0.95,
            boxShadow: 'inset -10px -10px 30px rgba(0,0,0,0.4), inset 10px 10px 30px rgba(255,255,255,0.1)',
          }} />
          <div className="absolute inset-0" style={{
            background: '#ff4655',
            clipPath: 'polygon(100% 10%, 100% 50%, 88% 65%, 55% 65%)',
            opacity: 0.95,
            boxShadow: 'inset -10px -10px 30px rgba(0,0,0,0.4), inset 10px 10px 30px rgba(255,255,255,0.1)',
          }} />

          {/* V shape highlight edge */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
            mixBlendMode: 'overlay',
            clipPath: 'polygon(0 10%, 70% 90%, 35% 90%, 0 50%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(225deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
            mixBlendMode: 'overlay',
            clipPath: 'polygon(100% 10%, 100% 50%, 88% 65%, 55% 65%)',
          }} />
        </div>
      </div>

      {/* ===== LAYER 9: CORNER MICRO LABELS ===== */}
      <div className="absolute top-24 left-6 z-10 max-md:hidden">
        <p className="text-[10px] font-sarpanch tracking-[4px] text-[#ff4655]/40 uppercase">System Active</p>
      </div>
      <div className="absolute top-24 right-6 z-10 max-md:hidden">
        <p className="text-[10px] font-sarpanch tracking-[4px] text-[#ff4655]/40 uppercase">Access Granted</p>
      </div>

      {/* ===== LAYER 10: FOREGROUND CONTENT ===== */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full pt-16">
        {/* Top accent label */}
        <div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-in-up">
          <div className="w-6 h-px bg-[#ff4655]/60" />
          <span className="text-[10px] font-sarpanch tracking-[4px] text-[#ff4655]/80 uppercase">Initialize UI</span>
          <div className="w-6 h-px bg-[#ff4655]/60" />
        </div>

        {/* Headline */}
        <h1 className="opacity-0 animate-fade-in-up-delay-1">
          <span
            className="block font-sarpanch text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-[12px] sm:tracking-[16px] md:tracking-[20px] leading-none text-white glitch relative inline-block"
            data-text="VIKAS"
          >
            VIKAS
          </span>
        </h1>

        {/* Divider */}
        <div className="divider max-w-md my-6 opacity-0 animate-fade-in-up-delay-2" />

        {/* Subtitle */}
        <p className="font-oxygen text-sm sm:text-base md:text-lg text-[#e5e7eb]/60 max-w-2xl mx-auto mb-4 opacity-0 animate-fade-in-up-delay-2">
          Frontend Engineer | Building High-Performance UI Systems
        </p>

        {/* Bio */}
        <p className="font-oxygen text-sm text-[#e5e7eb]/40 max-w-xl mx-auto mb-10 opacity-0 animate-fade-in-up-delay-2">
          {bio}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center opacity-0 animate-fade-in-up-delay-3">
          <a href="#project">
            <button
              className="group relative px-8 py-3.5 font-sarpanch text-sm tracking-[3px] uppercase font-semibold
                bg-[#ff4655] text-white overflow-hidden
                hover:scale-105 active:scale-100 transition-transform duration-300"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">View Projects</span>
            </button>
          </a>
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <button
                className="group relative px-8 py-3.5 font-sarpanch text-sm tracking-[3px] uppercase font-semibold
                  border border-[#ff4655]/40 text-[#e5e7eb] overflow-hidden
                  hover:border-[#ff4655] hover:scale-105 active:scale-100 transition-all duration-300"
              >
                <span className="absolute inset-0 bg-[#ff4655]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Resume</span>
              </button>
            </a>
          )}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-5 mt-16 opacity-0 animate-fade-in-up-delay-3">
          <span className="font-oxygen text-[10px] text-[#e5e7eb]/30 tracking-[4px] uppercase">Follow</span>
          <div className="w-12 h-px bg-[#ff4655]/20" />
          <div className="flex gap-4">
            {socialIcons.map((s) => (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-40 hover:opacity-100 hover:scale-110 transition-all duration-300"
              >
                <img src={s.icon} alt={s.key} className="h-4 w-4 brightness-0 invert" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0 animate-fade-in-up-delay-3">
        <span className="font-oxygen text-[10px] text-[#e5e7eb]/30 tracking-[4px] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#ff4655]/40 to-transparent" />
      </div>
    </section>
  )
}
