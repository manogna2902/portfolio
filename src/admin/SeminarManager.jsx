import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function SeminarManager({ onShowToast }) {
  const { seminar, updateSeminar } = usePortfolio();

  const [formData, setFormData] = useState({
    title: seminar.title || 'Credit Card Fraud Detection',
    type: seminar.type || 'Academic Seminar Topic',
    institution: seminar.institution || 'KITSW, Warangal',
    description: seminar.description || 'Academic seminar exploring machine learning-based approaches for identifying fraudulent credit card transactions.',
    extendedNotes: seminar.extendedNotes || '',
    keyTakeaways: (seminar.keyTakeaways || []).join('\n')
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      if (onShowToast) onShowToast('Title and Description are required', 'error');
      return;
    }

    setSaving(true);
    try {
      const parsedTakeaways = formData.keyTakeaways
        .split('\n')
        .map(t => t.trim())
        .filter(Boolean);

      const updated = {
        ...seminar,
        title: formData.title.trim(),
        type: formData.type.trim(),
        institution: formData.institution.trim(),
        description: formData.description.trim(),
        extendedNotes: formData.extendedNotes.trim(),
        keyTakeaways: parsedTakeaways
      };

      await updateSeminar(updated);
      if (onShowToast) onShowToast('Seminar topic details updated successfully!', 'success');
    } catch (err) {
      console.error('Error saving seminar:', err);
      if (onShowToast) onShowToast('Failed to save seminar details', 'error');
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
            Academic Seminar Management
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Display settings for academic presentations (specifically marked as a seminar topic, not a project).
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save & Publish Seminar'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2.5">
          <svg className="w-5 h-5 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            <strong>Requirement Notice:</strong> "Credit Card Fraud Detection" must be presented strictly as an academic seminar topic, not as a finished software project.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Seminar Title <span className="text-red-500">*</span>
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
              Type / Category
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
            Institution / Department
          </label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
            Core Abstract / Overview <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
            Extended Research & Technical Notes
          </label>
          <textarea
            name="extendedNotes"
            rows={3}
            value={formData.extendedNotes}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
            Key Academic Takeaways (one per line)
          </label>
          <textarea
            name="keyTakeaways"
            rows={4}
            value={formData.keyTakeaways}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-white font-mono text-xs resize-y"
            placeholder="Key concept 1&#10;Key concept 2&#10;Key concept 3"
          />
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
