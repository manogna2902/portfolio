import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { uploadAsset } from '../supabaseClient.js';

export default function ProfileManager({ onShowToast }) {
  const { profile, updateProfile } = usePortfolio();

  const [formData, setFormData] = useState({
    name: profile.name || '',
    title: profile.title || '',
    tagline: profile.tagline || '',
    location: profile.location || '',
    email: profile.email || '',
    phone: profile.phone || '',
    linkedin: profile.linkedin || '',
    github: profile.github || '',
    bio: profile.bio || '',
    avatarUrl: profile.avatarUrl || '',
    interests: (profile.interests || []).join(', ')
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      if (onShowToast) onShowToast('Please select a valid image file (JPG, PNG, WebP)', 'error');
      return;
    }

    setUploading(true);
    try {
      const res = await uploadAsset('portfolio-assets', file, 'profile_avatar');
      if (res.success) {
        setFormData(prev => ({ ...prev, avatarUrl: res.url }));
        if (onShowToast) onShowToast('Profile picture uploaded successfully!', 'success');
      } else {
        if (onShowToast) onShowToast('Failed to upload image.', 'error');
      }
    } catch (err) {
      console.error('Avatar upload failed:', err);
      if (onShowToast) onShowToast('Error uploading picture.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAvatar = () => {
    setFormData(prev => ({ ...prev, avatarUrl: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const parsedInterests = formData.interests
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);

      const updated = {
        ...profile,
        name: formData.name.trim(),
        title: formData.title.trim(),
        tagline: formData.tagline.trim(),
        location: formData.location.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        linkedin: formData.linkedin.trim(),
        github: formData.github.trim(),
        bio: formData.bio.trim(),
        avatarUrl: formData.avatarUrl,
        interests: parsedInterests
      };

      await updateProfile(updated);
      if (onShowToast) onShowToast('Profile information updated and published!', 'success');
    } catch (err) {
      console.error('Update profile error:', err);
      if (onShowToast) onShowToast('Failed to update profile.', 'error');
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
            Profile Management
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Update your biography, personal details, professional title, and profile picture.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Profile Picture Upload Section */}
        <div className="p-6 rounded-2xl bg-[#F9F9F9] border border-[#E5E5E5]">
          <h3 className="text-xs uppercase tracking-wider font-bold text-[#111111] mb-4">
            Profile Picture
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white border-2 border-[#111111] flex items-center justify-center shrink-0 shadow-sm">
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center font-bold text-neutral-400">
                  <span className="text-xl">PM</span>
                  <span className="block text-[10px]">No Photo</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 cursor-pointer transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>

                {formData.avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
              <p className="text-[11px] text-[#666666]">
                Supported formats: PNG, JPG, JPEG, WebP. Recommended: Square ratio, clean professional portrait.
              </p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Professional Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Hero Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              GitHub URL
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>
        </div>

        {/* Biography */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
            About Me / Complete Biography
          </label>
          <textarea
            name="bio"
            rows={5}
            value={formData.bio}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
            Core Interests (comma-separated)
          </label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            placeholder="Data Analytics, Python, Machine Learning, Artificial Intelligence, Data Visualization, Problem Solving"
          />
        </div>

        {/* Save button footer */}
        <div className="pt-6 border-t border-[#E5E5E5] flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving Changes...' : 'Save & Publish Profile'}
          </button>
        </div>

      </form>

    </div>
  );
}
