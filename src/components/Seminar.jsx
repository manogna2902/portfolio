import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Seminar() {
  const { seminar } = usePortfolio();

  return (
    <section id="seminar" className="py-24 bg-[#F3F3F3] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">08 / Research & Seminar</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">Academic Seminar</h2>
          <div className="w-12 h-1 bg-[#111111] mt-3" />
        </div>

        {/* Seminar Card */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 sm:p-12 shadow-sm">
          <div className="max-w-4xl">
            
            {/* Classification Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider">
                {seminar.type || 'Academic Seminar Topic'}
              </span>
              <span className="text-xs font-medium text-[#666666] border border-[#E5E5E5] px-3 py-1 rounded-full bg-[#F3F3F3]">
                {seminar.institution || 'KITSW, Warangal'}
              </span>
              <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-medium">
                Research Seminar • Non-Project Academic Study
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mb-4">
              {seminar.title || 'Credit Card Fraud Detection'}
            </h3>

            <p className="text-base sm:text-lg text-[#333333] leading-relaxed mb-6 font-medium">
              {seminar.description}
            </p>

            {seminar.extendedNotes && (
              <p className="text-sm text-[#555555] leading-relaxed mb-8">
                {seminar.extendedNotes}
              </p>
            )}

            {/* Key Takeaways */}
            {seminar.keyTakeaways && seminar.keyTakeaways.length > 0 && (
              <div className="pt-8 border-t border-[#E5E5E5]">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#111111] mb-4">
                  Key Academic Insights & Seminar Focus
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {seminar.keyTakeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] text-xs text-[#444444] leading-relaxed"
                    >
                      <div className="flex items-center gap-2 mb-2 font-bold text-[#111111]">
                        <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>Topic 0{idx + 1}</span>
                      </div>
                      <p>{takeaway}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
