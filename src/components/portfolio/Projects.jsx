import ProjectCard from './ProjectCard.jsx'

export default function Projects({ projects = [] }) {
  return (
    <section id="project" className="py-24 px-6 bg-[#000000]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 opacity-0 animate-fade-in-up">
          <p className="text-xs font-sarpanch tracking-[4px] text-[#ff4655]/80 uppercase mb-2">Projects</p>
          <div className="divider max-w-xs" />
        </div>

        <h2 className="font-sarpanch text-4xl lg:text-5xl font-bold tracking-[4px] text-white mb-8 opacity-0 animate-fade-in-up-delay-1">
          My <span className="text-[#ff4655]">Latest</span> Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <div
              key={p._id}
              className="opacity-0"
              style={{ animation: `fade-in-up 0.5s ease-out ${0.2 + i * 0.1}s forwards` }}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
