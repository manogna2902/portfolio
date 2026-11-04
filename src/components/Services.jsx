import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Services() {
  const { services } = usePortfolio();

  const renderIcon = (iconName, title) => {
    const key = (iconName || title).toLowerCase();
    if (key.includes('tableau') || key.includes('visualization')) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      );
    }
    if (key.includes('dashboard') || key.includes('gauge')) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    }
    if (key.includes('clean') || key.includes('preprocessing') || key.includes('filter')) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
  };

  return (
    <section id="services" className="py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">07 / Capabilities & Offerings</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">Services</h2>
          <div className="w-12 h-1 bg-[#111111] mt-3" />
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(services || []).map((serv, idx) => (
            <div
              key={serv.id || idx}
              className="minimal-card p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center mb-6 shadow-sm">
                  {renderIcon(serv.icon, serv.title)}
                </div>

                <h3 className="text-lg font-bold text-[#111111] mb-3 tracking-tight">
                  {serv.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {serv.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#666666]">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Service 0{idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-[#111111]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
