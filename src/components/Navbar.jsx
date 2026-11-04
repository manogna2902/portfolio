import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar({ onNavigateAdmin }) {
  const { profile } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Seminar', href: '#seminar' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleResumeDownload = () => {
    if (profile.resumeUrl) {
      window.open(profile.resumeUrl, '_blank');
    } else {
      // Generate clean minimal text resume file if no PDF uploaded yet
      const resumeContent = `PITTALA MANOGNA
${profile.title}
Location: ${profile.location}
Email: ${profile.email} | Phone: ${profile.phone}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}

ABOUT ME:
${profile.bio}

EDUCATION:
- B.Tech in Data Science, KITSW, Warangal (2024-Present) | CGPA: 8.8
- Intermediate MPC, TSRJC CET Girls, Nirmal (2022-2024) | Percentage: 96.9%
- SSC, ZPHS Maskapur (2022) | GPA: 9.2

SKILLS:
- Python, Tableau, Data Visualization, Java, Problem Solving

PROJECTS:
- StudyMate: Intelligent collaborative study platform for peer learning insights.
- TRICITY: Urban civic analytics platform for smart city data visualization.

INTERNSHIP:
- Java Programming Intern at InternPe (6 Weeks, 2026)

CERTIFICATIONS:
- Hedera Certified Foundation (HCF)

SEMINAR:
- Credit Card Fraud Detection (Academic ML Seminar)`;

      const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = profile.resumeFileName || 'Pittala_Manogna_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] py-3.5 shadow-sm' 
        : 'bg-white/80 backdrop-blur-sm py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-sm tracking-wider group-hover:scale-105 transition-transform">
              PM
            </span>
            <span className="text-base font-semibold text-[#111111] tracking-tight group-hover:text-black transition-colors">
              {profile.name || 'Pittala Manogna'}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-wider font-medium text-[#666666] hover:text-[#111111] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleResumeDownload}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#111111] bg-white border border-[#E5E5E5] rounded-md hover:border-[#111111] hover:bg-[#F3F3F3] transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Resume
            </button>

            <button
              onClick={onNavigateAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#666666] hover:text-[#111111] transition-colors"
              title={isAuthenticated ? "Open Admin Dashboard" : "Admin Login"}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {isAuthenticated ? 'Dashboard' : 'Admin'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#111111] hover:bg-[#F3F3F3] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E5E5] px-4 pt-3 pb-6 animate-fade-in shadow-xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-2 text-sm font-medium text-[#333333] hover:text-[#111111] border-b border-neutral-100"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); handleResumeDownload(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#111111] bg-[#F3F3F3] rounded-md border border-[#E5E5E5]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onNavigateAdmin(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#111111] rounded-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
