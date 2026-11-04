import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Projects() {
  const { projects } = usePortfolio();

  // Filter out any unwanted projects just in case
  const sanitizedProjects = (projects || []).filter(
    p => !p.title.toLowerCase().includes('student data quality repair system')
  );

  return (
    <section id="projects" className="py-24 bg-[#F3F3F3] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">04 / Featured Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">Key Projects</h2>
            <div className="w-12 h-1 bg-[#111111] mt-3" />
          </div>

          <a
            href="https://github.com/manogna2902"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-black group self-start md:self-auto"
          >
            <span>Explore All GitHub Repositories</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sanitizedProjects.map((project, idx) => (
            <div
              key={project.id || idx}
              className="bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#111111] transition-all duration-300 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              {/* Project Top Graphic / Header */}
              <div className="p-8 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                    <span>Project 0{idx + 1}</span>
                  </div>
                  {project.featured && (
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-[#111111] tracking-tight mb-3">
                  {project.title}
                </h3>

                <p className="text-sm text-[#444444] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.technologies || []).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-xs font-medium text-[#333333] bg-[#F3F3F3] rounded-md border border-[#E5E5E5]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-8 py-5 bg-[#FAFAFA] border-t border-[#E5E5E5] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>View GitHub</span>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] rounded-lg hover:border-[#111111] hover:bg-[#F3F3F3] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                <span className="text-[11px] text-[#666666] font-mono">
                  github.com/manogna2902
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
