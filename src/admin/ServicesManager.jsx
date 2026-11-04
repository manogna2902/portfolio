import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import Modal from '../components/Modal.jsx';

export default function ServicesManager({ onShowToast }) {
  const { services, addService, updateService, deleteService } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'layout'
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      icon: 'layout'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      icon: item.icon || 'layout'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      if (onShowToast) onShowToast('Title and Description are required', 'error');
      return;
    }

    try {
      if (editingItem) {
        await updateService(editingItem.id, formData);
        if (onShowToast) onShowToast('Service updated successfully!', 'success');
      } else {
        await addService(formData);
        if (onShowToast) onShowToast('New service added!', 'success');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving service:', err);
      if (onShowToast) onShowToast('Failed to save service', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteService(deleteConfirmId);
      if (onShowToast) onShowToast('Service deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting service:', err);
      if (onShowToast) onShowToast('Failed to delete service', 'error');
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
            Services Management
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Manage your four core offerings: Tableau, Dashboard Creation, Data Cleaning, and Python Programming.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Service</span>
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(services || []).map((serv, idx) => (
          <div
            key={serv.id || idx}
            className="p-5 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#111111]">
                  {serv.title}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  0{idx + 1}
                </span>
              </div>
              <p className="text-xs text-[#555555]">
                {serv.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E5E5E5] flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">Icon: {serv.icon}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(serv)}
                  className="px-3 py-1 rounded-md text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirmId(serv.id)}
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
        title={editingItem ? 'Edit Service' : 'Add New Service'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Service Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g. Data Visualization using Tableau"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Icon Type
            </label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            >
              <option value="layout">Tableau / Visualization</option>
              <option value="gauge">Dashboard / Metrics</option>
              <option value="filter">Data Cleaning / Preprocessing</option>
              <option value="terminal">Python Programming</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Crisp professional summary of what is delivered..."
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
              {editingItem ? 'Save Changes' : 'Add Service'}
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
            Are you sure you want to remove this service?
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
              Delete Service
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
