import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Skills() {
  const { skills } = usePortfolio();

  // Helper for crisp minimalist icons
  const renderIcon = (name, iconType) => {
    switch (iconType || name.toLowerCase()) {
      case 'code':
      case 'python':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'bar-chart-2':
      case 'bar-chart-3':
      case 'tableau':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'pie-chart':
      case 'data visualization':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        );
      case 'cpu':
      case 'java':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'brain':
      case 'problem solving':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <section id="skills" className="py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">03 / Technical Proficiency</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">Technical Skills</h2>
          <div className="w-12 h-1 bg-[#111111] mt-3" />
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(skills || []).map((skill, idx) => (
            <div
              key={skill.id || idx}
              className="minimal-card p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center shadow-sm">
                    {renderIcon(skill.name, skill.icon)}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#666666] bg-[#F3F3F3] px-2.5 py-1 rounded-md">
                    {skill.category || 'Competency'}
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-xl font-bold text-[#111111] mb-2 tracking-tight">
                  {skill.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Minimal Bottom Bar */}
              <div className="pt-6 mt-6 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#666666]">
                <span className="font-medium">Applied in coursework & projects</span>
                <span className="text-neutral-400">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
