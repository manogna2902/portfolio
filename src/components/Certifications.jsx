import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Certifications() {
  const { certifications } = usePortfolio();

  return (
    <section id="certifications" className="py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">05 / Verified Credentials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">Certifications</h2>
          <div className="w-12 h-1 bg-[#111111] mt-3" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(certifications || []).map((cert, idx) => (
            <div
              key={cert.id || idx}
              className="minimal-card p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666] bg-[#F3F3F3] px-2.5 py-1 rounded-md">
                    {cert.issueDate || 'Issued'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#111111] mb-1 tracking-tight">
                  {cert.title}
                </h3>
                <p className="text-xs font-semibold text-[#666666] mb-4 uppercase tracking-wider">
                  Issuing Organization: {cert.issuer}
                </p>

                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-6">
                  {cert.description}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-5 border-t border-[#E5E5E5] flex items-center justify-between gap-3">
                {cert.fileUrl ? (
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:underline"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Certificate</span>
                  </a>
                ) : (
                  <span className="text-xs text-neutral-400 font-medium">Digital Credential</span>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors"
                  >
                    <span>Verify</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
