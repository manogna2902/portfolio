import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function ContactInfoManager({ onShowToast }) {
  const { profile, updateProfile } = usePortfolio();

  const [formData, setFormData] = useState({
    email: profile.email || '',
    phone: profile.phone || '',
    location: profile.location || '',
    linkedin: profile.linkedin || '',
    github: profile.github || ''
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      if (onShowToast) onShowToast('Email is required', 'error');
      return;
    }

    setSaving(true);
    try {
      await updateProfile({
        ...profile,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        linkedin: formData.linkedin.trim(),
        github: formData.github.trim()
      });
      if (onShowToast) onShowToast('Contact information updated successfully!', 'success');
    } catch (err) {
      console.error('Error updating contact info:', err);
      if (onShowToast) onShowToast('Failed to update contact info', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
            Contact Information Management
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Update your public communication channels, email, phone, location, and social profiles.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Public Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="manogna2902@gmail.com"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 8331003290"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Location / City
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Warangal, Telangana, India"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              LinkedIn Profile Link
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://www.linkedin.com/in/manogna-pittala-077aa9325/"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              GitHub Profile Link
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/manogna2902"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5E5E5] flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save & Publish'}
          </button>
        </div>

      </form>

    </div>
  );
}
