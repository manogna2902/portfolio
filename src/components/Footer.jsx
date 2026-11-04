import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Footer({ onNavigateAdmin }) {
  const { profile } = usePortfolio();
  const { isAuthenticated } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white py-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800 items-start">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-white text-[#111111] flex items-center justify-center font-bold text-sm tracking-wider">
                PM
              </span>
              <span className="text-lg font-bold tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-medium mb-1">
              {profile.title}
            </p>
            <p className="text-xs text-neutral-500 italic max-w-sm">
              "{profile.tagline || 'Turning Data into Meaningful Insights'}"
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h5 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-4">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              <li><a href="#about" className="hover:text-white transition-colors">About Me</a></li>
              <li><a href="#education" className="hover:text-white transition-colors">Education</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">Skills</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#certifications" className="hover:text-white transition-colors">Certifications</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Internships</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#seminar" className="hover:text-white transition-colors">Academic Seminar</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Socials & Administration */}
          <div className="md:col-span-3">
            <h5 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-4">
              Connect & Admin
            </h5>
            <div className="flex flex-col gap-2.5 text-xs text-neutral-400 font-medium mb-6">
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>LinkedIn</span>
                  <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>GitHub</span>
                  <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
                {profile.email}
              </a>
            </div>

            {/* Admin Portal Button */}
            <button
              onClick={onNavigateAdmin}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 text-xs font-semibold transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Pittala Manogna. Built with React & Supabase. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}
