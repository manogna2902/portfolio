import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import Modal from '../components/Modal.jsx';

export default function SkillsManager({ onShowToast }) {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    icon: 'code',
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'Data & Analytics',
      icon: 'code',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      category: item.category || '',
      icon: item.icon || 'code',
      description: item.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      if (onShowToast) onShowToast('Skill name is required', 'error');
      return;
    }

    try {
      if (editingItem) {
        await updateSkill(editingItem.id, formData);
        if (onShowToast) onShowToast('Skill updated successfully!', 'success');
      } else {
        await addSkill(formData);
        if (onShowToast) onShowToast('New skill added!', 'success');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving skill:', err);
      if (onShowToast) onShowToast('Failed to save skill', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteSkill(deleteConfirmId);
      if (onShowToast) onShowToast('Skill deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting skill:', err);
      if (onShowToast) onShowToast('Failed to delete skill', 'error');
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
            Skills Management
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Manage your technical competencies, categories, descriptions, and icons.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Skill</span>
        </button>
      </div>

      {/* Grid of skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(skills || []).map((skill, idx) => (
          <div
            key={skill.id || idx}
            className="p-5 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#111111]">
                  {skill.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#E5E5E5] text-[#333333] px-2 py-0.5 rounded">
                  {skill.category || 'Skill'}
                </span>
              </div>
              <p className="text-xs text-[#555555] line-clamp-2">
                {skill.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E5E5E5] flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-mono">Icon: {skill.icon}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(skill)}
                  className="px-3 py-1 rounded-md text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirmId(skill.id)}
                  className="px-3 py-1 rounded-md text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Skill Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. Python, SQL, Tableau"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Programming, BI"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Icon Identifier
              </label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              >
                <option value="code">Code / Terminal</option>
                <option value="bar-chart-2">Bar Chart / Tableau</option>
                <option value="pie-chart">Pie Chart / Visualization</option>
                <option value="cpu">CPU / Java / Systems</option>
                <option value="brain">Brain / Problem Solving</option>
                <option value="layout">Layout / UI</option>
                <option value="database">Database / SQL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Description / Application
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="How you apply this skill in real projects..."
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
              {editingItem ? 'Save Changes' : 'Add Skill'}
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
            Are you sure you want to remove this skill from your portfolio?
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
              Delete Skill
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
