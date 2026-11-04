import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { uploadAsset } from '../supabaseClient.js';
import Modal from '../components/Modal.jsx';

export default function ProjectsManager({ onShowToast }) {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: true
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      technologies: 'Python, Data Analytics, React',
      githubUrl: 'https://github.com/manogna2902',
      liveUrl: '',
      imageUrl: '',
      featured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : (item.technologies || ''),
      githubUrl: item.githubUrl || '',
      liveUrl: item.liveUrl || '',
      imageUrl: item.imageUrl || '',
      featured: item.featured ?? true
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadAsset('portfolio-assets', file, `project_${Date.now()}`);
      if (res.success) {
        setFormData(prev => ({ ...prev, imageUrl: res.url }));
        if (onShowToast) onShowToast('Project screenshot uploaded!', 'success');
      } else {
        if (onShowToast) onShowToast('Failed to upload image', 'error');
      }
    } catch (err) {
      console.error('Error uploading screenshot:', err);
      if (onShowToast) onShowToast('Upload error', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      if (onShowToast) onShowToast('Title and Description are required', 'error');
      return;
    }

    // Safety guard
    if (formData.title.toLowerCase().includes('student data quality repair system')) {
      if (onShowToast) onShowToast('This project is excluded per specifications', 'error');
      return;
    }

    const parsedTechs = formData.technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const projectPayload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologies: parsedTechs,
      githubUrl: formData.githubUrl.trim(),
      liveUrl: formData.liveUrl.trim(),
      imageUrl: formData.imageUrl,
      featured: formData.featured
    };

    try {
      if (editingItem) {
        await updateProject(editingItem.id, projectPayload);
        if (onShowToast) onShowToast('Project details updated successfully!', 'success');
      } else {
        await addProject(projectPayload);
        if (onShowToast) onShowToast('New project created successfully!', 'success');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving project:', err);
      if (onShowToast) onShowToast('Failed to save project', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteProject(deleteConfirmId);
      if (onShowToast) onShowToast('Project deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting project:', err);
      if (onShowToast) onShowToast('Failed to delete project', 'error');
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
            Projects Management
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Manage StudyMate, TRICITY, and other project cards, links, tech stacks, and screenshots.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {(projects || []).map((proj, idx) => (
          <div
            key={proj.id || idx}
            className="p-6 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-[#111111] bg-white border border-[#E5E5E5] px-2.5 py-0.5 rounded-md">
                  Project 0{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-[#111111]">
                  {proj.title}
                </h3>
                {proj.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-xs text-[#555555] line-clamp-2">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(proj.technologies || []).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-medium bg-white text-[#444444] border border-[#E5E5E5] px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#666666] hover:text-[#111111] hover:bg-white border border-transparent hover:border-[#E5E5E5]"
                  title="View GitHub repository"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              <button
                onClick={() => handleOpenEdit(proj)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteConfirmId(proj.id)}
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
        title={editingItem ? 'Edit Project Details' : 'Add New Project'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g. StudyMate or TRICITY"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Feature on Public Site
              </label>
              <select
                value={formData.featured ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, featured: e.target.value === 'true' })}
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              >
                <option value="true">Yes (Featured)</option>
                <option value="false">No (Standard)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Detailed description of features, analytics problem solved, and technical architecture..."
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Technologies / Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="Python, Tableau, React, SQLite, REST API"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/manogna2902/..."
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Live Demo URL (optional)
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>
          </div>

          {/* Screenshot Upload */}
          <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#333333]">
                Project Screenshot / Mockup
              </label>
              {formData.imageUrl && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                  className="text-xs text-red-600 hover:underline"
                >
                  Clear Screenshot
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 cursor-pointer">
                <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-[#666666] truncate max-w-xs">
                {formData.imageUrl ? 'Screenshot attached' : 'No image chosen'}
              </span>
            </div>
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
              {editingItem ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Project Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-[#444444]">
            Are you sure you want to permanently delete this project? This will immediately remove it from your portfolio.
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
              Delete Project
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
