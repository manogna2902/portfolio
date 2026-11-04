import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import Modal from '../components/Modal.jsx';

export default function InternshipsManager({ onShowToast }) {
  const { internships, addInternship, updateInternship, deleteInternship } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    duration: '',
    period: '',
    description: '',
    highlights: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      role: '',
      company: '',
      duration: '6 Weeks',
      period: '2026',
      description: '',
      highlights: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      role: item.role || '',
      company: item.company || '',
      duration: item.duration || '',
      period: item.period || '',
      description: item.description || '',
      highlights: Array.isArray(item.highlights) ? item.highlights.join('\n') : (item.highlights || '')
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.company.trim() || !formData.description.trim()) {
      if (onShowToast) onShowToast('Role, Company, and Description are required', 'error');
      return;
    }

    const parsedHighlights = formData.highlights
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);

    const payload = {
      role: formData.role.trim(),
      company: formData.company.trim(),
      duration: formData.duration.trim(),
      period: formData.period.trim(),
      description: formData.description.trim(),
      highlights: parsedHighlights
    };

    try {
      if (editingItem) {
        await updateInternship(editingItem.id, payload);
        if (onShowToast) onShowToast('Internship updated successfully!', 'success');
      } else {
        await addInternship(payload);
        if (onShowToast) onShowToast('New internship added!', 'success');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving internship:', err);
      if (onShowToast) onShowToast('Failed to save internship', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteInternship(deleteConfirmId);
      if (onShowToast) onShowToast('Internship deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting internship:', err);
      if (onShowToast) onShowToast('Failed to delete internship', 'error');
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
            Internships Management
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Manage your industry experience, including the Java Programming Internship at InternPe.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Internship</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {(internships || []).map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-6 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E5E5E5] text-[#111111] px-2.5 py-0.5 rounded-full">
                  {item.duration || '6 Weeks'} • {item.period || '2026'}
                </span>
                <span className="text-xs font-bold text-[#111111]">
                  {item.company}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111111]">
                {item.role}
              </h3>
              <p className="text-xs text-[#555555] line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(item)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteConfirmId(item.id)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200"
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
        title={editingItem ? 'Edit Internship Record' : 'Add New Internship'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Role / Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                placeholder="e.g. Java Programming Intern"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Company / Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                placeholder="e.g. InternPe"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 6 Weeks"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Year / Period
              </label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="e.g. 2026"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Overall Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Summary of responsibilities and scope..."
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Key Technical Learnings (one per line)
            </label>
            <textarea
              rows={3}
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              placeholder="Built structured Java modules adhering to OOP&#10;Designed efficient data algorithms&#10;Applied debugging and version control"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white font-mono text-xs resize-y"
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
              {editingItem ? 'Save Changes' : 'Add Internship'}
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
            Are you sure you want to remove this internship experience?
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
              Delete Record
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
