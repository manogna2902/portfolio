import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import Modal from '../components/Modal.jsx';

export default function EducationManager({ onShowToast }) {
  const { education, addEducation, updateEducation, deleteEducation } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    period: '',
    score: '',
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      degree: '',
      institution: '',
      period: '',
      score: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      degree: item.degree || '',
      institution: item.institution || '',
      period: item.period || '',
      score: item.score || '',
      description: item.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.degree.trim() || !formData.institution.trim()) {
      if (onShowToast) onShowToast('Degree and Institution are required', 'error');
      return;
    }

    try {
      if (editingItem) {
        await updateEducation(editingItem.id, formData);
        if (onShowToast) onShowToast('Education entry updated successfully!', 'success');
      } else {
        await addEducation(formData);
        if (onShowToast) onShowToast('New education entry added!', 'success');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving education:', err);
      if (onShowToast) onShowToast('Failed to save education entry', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteEducation(deleteConfirmId);
      if (onShowToast) onShowToast('Education entry deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting education:', err);
      if (onShowToast) onShowToast('Failed to delete education entry', 'error');
    } finally {
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
            Education Management
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Manage degrees, institutions, study periods, CGPA, and percentages displayed in the timeline.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Education</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {(education || []).map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl border border-[#E5E5E5] hover:border-[#111111] transition-all bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E5E5E5] text-[#111111] px-2.5 py-0.5 rounded-full">
                  {item.period}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {item.score}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#111111]">
                {item.degree}
              </h3>
              <p className="text-xs font-medium text-[#666666]">
                {item.institution}
              </p>
              {item.description && (
                <p className="text-xs text-[#555555] line-clamp-1 mt-1">
                  {item.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(item)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3] transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteConfirmId(item.id)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Education Entry' : 'Add New Education Entry'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Degree / Qualification <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              required
              placeholder="e.g. B.Tech – Data Science"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Institution / School <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              required
              placeholder="e.g. Kakatiya Institute of Technology and Science (KITSW), Warangal"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Period / Year <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                required
                placeholder="e.g. 2024–Present"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                CGPA / Percentage <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                required
                placeholder="e.g. CGPA: 8.8 or 96.9%"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Description / Specialization
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Course highlights, key subjects, or distinctions..."
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-[#E5E5E5]">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800"
            >
              {editingItem ? 'Save Changes' : 'Add Education'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-[#444444]">
            Are you sure you want to delete this education entry? This change will be permanently saved.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
            >
              Delete Entry
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
