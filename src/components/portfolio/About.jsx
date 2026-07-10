export default function About({ profile }) {
  const { aboutParagraph = '', aboutCards = [] } = profile || {}

  const icons = [
    '/assets/aboutIcons/Design.png',
    '/assets/aboutIcons/code.png',
    '/assets/aboutIcons/chess.png',
  ]

  return (
    <section id="about" className="py-24 px-6 bg-[#000000]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 opacity-0 animate-fade-in-up">
          <p className="text-xs font-sarpanch tracking-[4px] text-[#ff4655]/80 uppercase mb-2">About</p>
          <div className="divider max-w-xs" />
        </div>

        <div className="flex gap-12 max-lg:flex-col items-start">
          {/* Image panel */}
          <div className="w-[30vw] max-lg:w-full max-lg:max-w-sm opacity-0 animate-fade-in-up-delay-1">
            <div className="panel rounded-lg overflow-hidden">
              <img
                src="/assets/aboutIcons/frontendGuy.png"
                alt="frontend guy"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content panel */}
          <div className="flex-1 opacity-0 animate-fade-in-up-delay-2">
            <div className="panel rounded-lg p-8">
              <h2 className="font-sarpanch text-4xl lg:text-5xl font-bold tracking-[4px] text-white mb-4">
                A small <span className="text-[#ff4655]">Introduction</span>
              </h2>
              <p className="font-oxygen text-sm sm:text-base text-[#e5e7eb]/60 max-w-2xl mb-12 leading-relaxed">
                {aboutParagraph}
              </p>

              <h3 className="font-sarpanch text-sm tracking-[3px] uppercase text-[#ff4655]/80 mb-6">
                What I like to do
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {aboutCards.map((card, i) => (
                  <div
                    key={i}
                    className="panel rounded-lg p-5 card-tilt"
                  >
                    <img
                      src={card.icon || icons[i] || ''}
                      alt={card.title}
                      className="h-10 w-10 mb-4 opacity-80"
                    />
                    <h4 className="font-sarpanch text-sm tracking-[2px] uppercase text-white mb-2">
                      {card.title}
                    </h4>
                    <p className="font-oxygen text-xs text-[#e5e7eb]/50 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
