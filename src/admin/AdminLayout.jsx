import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { isSupabaseConfigured } from '../supabaseClient.js';

export default function AdminLayout({
  activeTab,
  onSelectTab,
  onBackToSite,
  onOpenSupabaseModal,
  children
}) {
  const { user, logout } = useAuth();
  const { messages } = usePortfolio();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const unreadMessagesCount = (messages || []).filter(m => !m.read).length;
  const isSupabaseActive = isSupabaseConfigured();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'profile', label: 'Profile Management', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'education', label: 'Education Management', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
    { id: 'skills', label: 'Skills Management', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { id: 'projects', label: 'Projects Management', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'certifications', label: 'Certifications', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { id: 'internships', label: 'Internships', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'services', label: 'Services', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
    { id: 'seminar', label: 'Seminar Topics', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
    { id: 'contact_info', label: 'Contact Information', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'resume', label: 'Resume Management', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'messages', label: 'Contact Messages', badge: unreadMessagesCount, icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' },
  ];

  const handleMenuClick = (id) => {
    onSelectTab(id);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="bg-white border-b border-[#E5E5E5] sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-[#111111] hover:bg-[#F3F3F3]"
              aria-label="Toggle Navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                PM
              </span>
              <div>
                <h1 className="text-sm font-bold text-[#111111] tracking-tight">Admin Dashboard</h1>
                <p className="text-[11px] text-[#666666] hidden sm:block">Logged in as {user?.email || 'Administrator'}</p>
              </div>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-3">
            {/* Supabase Status Button */}
            <button
              onClick={onOpenSupabaseModal}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSupabaseActive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
              title="Click to configure or test Supabase connection"
            >
              <span className={`w-2 h-2 rounded-full ${isSupabaseActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="hidden sm:inline">
                {isSupabaseActive ? 'Supabase Connected' : 'Supabase Setup'}
              </span>
            </button>

            {/* View Site */}
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>View Site</span>
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
              title="Logout from dashboard"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* Desktop Sidebar */}
        <aside className="w-64 shrink-0 hidden lg:block">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-3 shadow-sm sticky top-24">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#888888]">
              Dashboard Menu
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#111111] text-white shadow-sm'
                        : 'text-[#444444] hover:bg-[#F3F3F3] hover:text-[#111111]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <svg className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#888888]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white text-[#111111]' : 'bg-red-600 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 mt-4 border-t border-[#E5E5E5] px-2">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
            <div className="relative bg-white w-72 max-w-[80%] h-full p-4 overflow-y-auto shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E5E5]">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs">PM</span>
                    <span className="text-sm font-bold text-[#111111]">Dashboard Menu</span>
                  </div>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-neutral-400 hover:text-black">
                    &times;
                  </button>
                </div>

                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive
                            ? 'bg-[#111111] text-white'
                            : 'text-[#444444] hover:bg-[#F3F3F3]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <svg className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#888888]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                          </svg>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#E5E5E5]">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Content Panel */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

      </div>
    </div>
  );
}
