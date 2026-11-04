import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function About() {
  const { profile } = usePortfolio();

  const interestsList = profile.interests && profile.interests.length > 0 
    ? profile.interests 
    : [
      "Data Analytics",
      "Python",
      "Machine Learning",
      "Artificial Intelligence",
      "Data Visualization",
      "Problem Solving"
    ];

  return (
    <section id="about" className="py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">01 / Profile Overview</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">About Me</h2>
          <div className="w-12 h-1 bg-[#111111] mt-3" />
        </div>

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Profile Card & Quick Bio Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-2xl bg-[#F3F3F3] border border-[#E5E5E5]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="PM" className="w-full h-full rounded-xl object-cover" />
                  ) : (
                    'PM'
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111111]">{profile.name}</h3>
                  <p className="text-xs text-[#666666]">{profile.title}</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-[#444444] border-t border-[#E5E5E5] pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] uppercase tracking-wider font-medium">Institution</span>
                  <span className="font-semibold text-[#111111]">KITSW, Warangal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] uppercase tracking-wider font-medium">Discipline</span>
                  <span className="font-semibold text-[#111111]">B.Tech Data Science</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] uppercase tracking-wider font-medium">Location</span>
                  <span className="font-semibold text-[#111111]">{profile.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] uppercase tracking-wider font-medium">Email</span>
                  <span className="font-semibold text-[#111111]">{profile.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] uppercase tracking-wider font-medium">Phone</span>
                  <span className="font-semibold text-[#111111]">{profile.phone}</span>
                </div>
              </div>
            </div>

            {/* Career Objective Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#111111]">Career Objective</h4>
              </div>
              <p className="text-sm text-[#444444] leading-relaxed">
                To become a successful Data Analyst and transform raw data into meaningful insights that support better decision-making, while continuously sharpening technical, statistical, and analytical problem-solving skills.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Biography & Core Interests */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-6 tracking-tight">
                Passionate about turning complex patterns into strategic data intelligence.
              </h3>

              <div className="prose prose-neutral text-sm sm:text-base text-[#444444] leading-relaxed space-y-4 mb-10">
                <p>
                  {profile.bio}
                </p>
                <p>
                  As a data science undergraduate, I emphasize grounded mathematical foundations, reproducible Python workflows, and visual clarity through Tableau. My approach focuses on bridging exploratory data analysis with intuitive executive-level communication.
                </p>
              </div>

              {/* Highlighted Interests */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#111111] mb-4">
                  Core Fields of Interest
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {interestsList.map((interest, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F3F3F3] border border-[#E5E5E5] text-xs font-semibold text-[#111111] hover:border-[#111111] transition-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                      <span>{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-10 mt-10 border-t border-[#E5E5E5]">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111111]">8.8</div>
                <div className="text-xs text-[#666666] font-medium mt-1">B.Tech CGPA</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111111]">96.9%</div>
                <div className="text-xs text-[#666666] font-medium mt-1">Intermediate Score</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111111]">6+</div>
                <div className="text-xs text-[#666666] font-medium mt-1">Core Tech Focus</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
