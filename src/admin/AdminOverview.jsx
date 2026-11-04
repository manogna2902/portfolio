import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { isSupabaseConfigured } from '../supabaseClient.js';

export default function AdminOverview({ onNavigateTab, onOpenSupabaseModal }) {
  const {
    profile,
    projects,
    education,
    skills,
    certifications,
    internships,
    services,
    messages
  } = usePortfolio();

  const isSupabase = isSupabaseConfigured();
  const unreadCount = (messages || []).filter(m => !m.read).length;

  const stats = [
    { label: 'Featured Projects', count: (projects || []).length, tab: 'projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { label: 'Technical Skills', count: (skills || []).length, tab: 'skills', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { label: 'Education Records', count: (education || []).length, tab: 'education', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
    { label: 'Certifications', count: (certifications || []).length, tab: 'certifications', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { label: 'Internships', count: (internships || []).length, tab: 'internships', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Unread Messages', count: unreadCount, tab: 'messages', highlight: unreadCount > 0, icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="PM" className="w-full h-full rounded-2xl object-cover" />
            ) : (
              'PM'
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
                Hello, {profile.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                Active Admin
              </span>
            </div>
            <p className="text-xs text-[#666666] mt-0.5">
              {profile.title} • {profile.location}
            </p>
          </div>
        </div>

        {/* Database Sync Status Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-[#111111]">
              {isSupabase ? 'Supabase Cloud Sync' : 'Local Persistence Engine'}
            </p>
            <p className="text-[11px] text-[#666666]">
              {isSupabase ? 'PostgreSQL & Storage Active' : 'Synced in LocalStorage'}
            </p>
          </div>
          <button
            onClick={onOpenSupabaseModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border border-[#E5E5E5] bg-[#F9F9F9] hover:bg-[#F3F3F3] text-[#111111] transition-colors"
          >
            {isSupabase ? 'Configure Backend' : 'Connect Supabase'}
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onNavigateTab(item.tab)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              item.highlight
                ? 'bg-red-50 border-red-200 hover:border-red-400'
                : 'bg-white border-[#E5E5E5] hover:border-[#111111]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <svg className={`w-5 h-5 ${item.highlight ? 'text-red-600' : 'text-[#888888]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888]">Manage</span>
            </div>
            <div className={`text-2xl font-extrabold ${item.highlight ? 'text-red-700' : 'text-[#111111]'}`}>
              {item.count}
            </div>
            <div className="text-xs font-medium text-[#666666] truncate mt-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Messages Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#111111] mb-4">
            Quick Management
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigateTab('profile')}
              className="p-3 text-left rounded-xl bg-[#F9F9F9] hover:bg-[#F3F3F3] border border-[#E5E5E5] transition-colors"
            >
              <p className="text-xs font-bold text-[#111111]">Profile & Photo</p>
              <p className="text-[11px] text-[#666666] mt-0.5">Edit bio, avatar, links</p>
            </button>
            <button
              onClick={() => onNavigateTab('projects')}
              className="p-3 text-left rounded-xl bg-[#F9F9F9] hover:bg-[#F3F3F3] border border-[#E5E5E5] transition-colors"
            >
              <p className="text-xs font-bold text-[#111111]">Projects</p>
              <p className="text-[11px] text-[#666666] mt-0.5">StudyMate & TRICITY</p>
            </button>
            <button
              onClick={() => onNavigateTab('resume')}
              className="p-3 text-left rounded-xl bg-[#F9F9F9] hover:bg-[#F3F3F3] border border-[#E5E5E5] transition-colors"
            >
              <p className="text-xs font-bold text-[#111111]">Resume PDF</p>
              <p className="text-[11px] text-[#666666] mt-0.5">Upload or update CV</p>
            </button>
            <button
              onClick={() => onNavigateTab('messages')}
              className="p-3 text-left rounded-xl bg-[#F9F9F9] hover:bg-[#F3F3F3] border border-[#E5E5E5] transition-colors"
            >
              <p className="text-xs font-bold text-[#111111]">Messages</p>
              <p className="text-[11px] text-[#666666] mt-0.5">{unreadCount} unread submissions</p>
            </button>
          </div>
        </div>

        {/* Latest Contact Form Submissions */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#111111]">
                Recent Contact Messages
              </h3>
              <button
                onClick={() => onNavigateTab('messages')}
                className="text-xs font-semibold text-[#111111] hover:underline"
              >
                View All Messages &rarr;
              </button>
            </div>

            {(messages || []).length === 0 ? (
              <p className="text-xs text-[#888888] py-8 text-center">No contact messages received yet.</p>
            ) : (
              <div className="divide-y divide-neutral-100">
                {(messages || []).slice(0, 3).map((msg) => (
                  <div key={msg.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#111111] truncate">{msg.name}</span>
                        {!msg.read && (
                          <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                        )}
                        <span className="text-[10px] text-[#888888] truncate">{msg.email}</span>
                      </div>
                      <p className="text-xs text-[#444444] font-medium truncate mt-0.5">{msg.subject}</p>
                      <p className="text-[11px] text-[#777777] line-clamp-1">{msg.message}</p>
                    </div>
                    <span className="text-[10px] text-neutral-400 shrink-0 font-mono">
                      {new Date(msg.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#666666]">
            <span>Form submissions are automatically synchronized.</span>
            <button
              onClick={() => onNavigateTab('messages')}
              className="text-xs font-bold text-[#111111]"
            >
              Open Inbox
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
