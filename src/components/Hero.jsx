import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { downloadResumePdf } from '../utils/downloadHelper.js';

export default function Hero({ onShowToast }) {
  const { profile } = usePortfolio();

  const handleResumeDownload = (e) => {
    e.preventDefault();
    const resumeSource = profile.resumeUrl || 'Pittala_Manogna_Resume.pdf';
    const resumeName = profile.resumeFileName || 'Pittala_Manogna_Resume.pdf';
    downloadResumePdf(resumeSource, resumeName, onShowToast);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white border-b border-[#E5E5E5]">
      {/* Minimalist Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-dots opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] border border-[#E5E5E5] text-xs font-medium text-[#333333] mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Data Analyst Internships & Roles</span>
            </div>

            {/* Main Headings */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.15] mb-4">
              Hi, I'm <span className="underline decoration-neutral-300 underline-offset-8">{profile.name || 'Pittala Manogna'}</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#111111] mb-2 tracking-tight">
              {profile.title || 'Data Science Student | Aspiring Data Analyst'}
            </p>

            <p className="text-base sm:text-lg font-light text-[#666666] italic mb-6">
              "{profile.tagline || 'Turning Data into Meaningful Insights'}"
            </p>

            {/* Short Introduction */}
            <p className="text-sm sm:text-base text-[#444444] leading-relaxed max-w-2xl mb-8">
              B.Tech Data Science student at KITSW, Warangal. Passionate about uncovering actionable patterns from complex datasets, designing intuitive Tableau dashboards, and building algorithmic data solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-all shadow-sm"
              >
                <span>View Projects</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              <a
                href={profile.resumeUrl || 'Pittala_Manogna_Resume.pdf'}
                download={profile.resumeFileName || 'Pittala_Manogna_Resume.pdf'}
                onClick={handleResumeDownload}
                role="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#111111] bg-white border border-[#E5E5E5] rounded-lg hover:border-[#111111] hover:bg-[#F3F3F3] transition-all cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Resume</span>
              </a>

              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#666666] hover:text-[#111111] rounded-lg transition-colors"
              >
                <span>Contact Me</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Social Icons & Location */}
            <div className="flex items-center gap-6 pt-4 border-t border-[#E5E5E5] w-full max-w-xl">
              <span className="text-xs text-[#666666] font-medium flex items-center gap-1.5">
                <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profile.location || 'Warangal, Telangana, India'}
              </span>

              <div className="h-4 w-[1px] bg-[#E5E5E5]" />

              <div className="flex items-center gap-3">
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-[#666666] hover:text-[#111111] hover:bg-[#F3F3F3] transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}

                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-[#666666] hover:text-[#111111] hover:bg-[#F3F3F3] transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Profile Picture Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Subtle back decorative frame */}
              <div className="absolute -inset-2.5 rounded-2xl bg-neutral-100 border border-[#E5E5E5] -rotate-2 group-hover:rotate-0 transition-transform duration-300" />
              
              {/* Picture Container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-[#F3F3F3] border-2 border-[#111111] shadow-lg flex items-center justify-center">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 text-[#111111]">
                    <div className="w-24 h-24 rounded-full bg-[#111111] text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-inner">
                      PM
                    </div>
                    <span className="text-base font-semibold">{profile.name}</span>
                    <span className="text-xs text-[#666666] mt-1">Data Science • KITSW</span>
                  </div>
                )}
              </div>

              {/* Minimal floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white border border-[#E5E5E5] rounded-xl px-4 py-2.5 shadow-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#666666] font-medium">B.Tech CGPA</p>
                  <p className="text-sm font-bold text-[#111111]">8.8 / 10</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
