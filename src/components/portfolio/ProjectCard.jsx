export default function ProjectCard({ project }) {
  const { title, description, tag, image, liveUrl, sourceCodeUrl, comingSoon, bgColor } = project

  return (
    <div
      className="panel rounded-lg overflow-hidden group card-tilt"
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden" style={{ backgroundColor: bgColor || '#1a1a2e' }}>
        {comingSoon && (
          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[10px] font-sarpanch tracking-[2px] uppercase bg-[#ff4655] text-white">
            Coming Soon
          </span>
        )}
        <span className="absolute top-3 right-3 z-10 px-2 py-0.5 text-[10px] font-sarpanch tracking-[2px] uppercase bg-black/60 text-[#e5e7eb]/80 backdrop-blur-sm">
          {tag}
        </span>

        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-[10px] font-sarpanch tracking-[3px] uppercase bg-[#ff4655] text-white hover:bg-[#ff4655]/80 transition-colors"
            >
              Live Demo
            </a>
          )}
          {sourceCodeUrl && (
            <a
              href={sourceCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-[10px] font-sarpanch tracking-[3px] uppercase border border-white/40 text-white hover:bg-white/10 transition-colors"
            >
              Source Code
            </a>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-sarpanch text-base tracking-[2px] uppercase text-white mb-2">
          {title}
        </h3>
        <p className="font-oxygen text-xs text-[#e5e7eb]/50 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
