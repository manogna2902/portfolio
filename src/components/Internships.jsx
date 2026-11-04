import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Internships() {
  const { internships } = usePortfolio();

  return (
    <section id="experience" className="py-24 bg-[#F3F3F3] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">06 / Practical Experience</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">Internships</h2>
          <div className="w-12 h-1 bg-[#111111] mt-3" />
        </div>

        {/* Internships Grid */}
        <div className="space-y-8">
          {(internships || []).map((intern, idx) => (
            <div
              key={intern.id || idx}
              className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E5E5E5] hover:border-[#111111] transition-all shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-2">
                    <span>{intern.duration || '6 Weeks'}</span>
                    <span>•</span>
                    <span>{intern.period || '2026'}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] tracking-tight">
                    {intern.role}
                  </h3>
                  <p className="text-sm font-semibold text-[#666666] mt-0.5">
                    {intern.company}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-100 text-[#111111] text-xs font-semibold">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Completed Internship
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#444444] leading-relaxed mb-6">
                {intern.description}
              </p>

              {/* Key Highlights */}
              {intern.highlights && intern.highlights.length > 0 && (
                <div className="pt-6 border-t border-[#E5E5E5]">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#111111] mb-3">
                    Core Technical Deliverables & Learnings
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {intern.highlights.map((item, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs text-[#555555] bg-[#F9F9F9] p-3 rounded-lg border border-[#E5E5E5]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
