import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Education() {
  const { education } = usePortfolio();

  // Sort education items
  const sortedEdu = [...(education || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="education" className="py-24 bg-[#F3F3F3] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">02 / Academic Journey</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">Education</h2>
          <div className="w-12 h-1 bg-[#111111] mt-3" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#111111] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {sortedEdu.map((item, idx) => (
            <div key={item.id || idx} className="relative group">
              
              {/* Timeline Bullet Marker */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-[#111111] group-hover:scale-125 transition-transform" />

              {/* Timeline Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E5E5] hover:border-[#111111] transition-all shadow-sm">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#F3F3F3] text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-2">
                      {item.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-medium text-[#666666] mt-1">
                      {item.institution}
                    </p>
                  </div>

                  {/* Score Pill */}
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] text-white text-xs sm:text-sm font-bold tracking-tight shadow-sm">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      {item.score}
                    </span>
                  </div>
                </div>

                {item.description && (
                  <p className="text-sm text-[#444444] leading-relaxed pt-2 border-t border-neutral-100">
                    {item.description}
                  </p>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
