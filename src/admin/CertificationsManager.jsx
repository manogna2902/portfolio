import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { uploadAsset } from '../supabaseClient.js';
import Modal from '../components/Modal.jsx';

export default function CertificationsManager({ onShowToast }) {
  const { certifications, addCertification, updateCertification, deleteCertification } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    fileUrl: '',
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      issuer: '',
      issueDate: '2024',
      credentialUrl: '',
      fileUrl: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      issuer: item.issuer || '',
      issueDate: item.issueDate || '',
      credentialUrl: item.credentialUrl || '',
      fileUrl: item.fileUrl || '',
      description: item.description || ''
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const res = await uploadAsset('certificates', file, `certificate_${Date.now()}`);
      if (res.success) {
        setFormData(prev => ({ ...prev, fileUrl: res.url }));
        if (onShowToast) onShowToast('Certificate document uploaded!', 'success');
      } else {
        if (onShowToast) onShowToast('Failed to upload certificate', 'error');
      }
    } catch (err) {
      console.error('Certificate upload error:', err);
      if (onShowToast) onShowToast('Upload error', 'error');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.issuer.trim()) {
      if (onShowToast) onShowToast('Title and Issuer are required', 'error');
      return;
    }

    try {
      if (editingItem) {
        await updateCertification(editingItem.id, formData);
        if (onShowToast) onShowToast('Certification updated successfully!', 'success');
      } else {
        await addCertification(formData);
        if (onShowToast) onShowToast('New certification added!', 'success');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving certification:', err);
      if (onShowToast) onShowToast('Failed to save certification', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteCertification(deleteConfirmId);
      if (onShowToast) onShowToast('Certification deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting certification:', err);
      if (onShowToast) onShowToast('Failed to delete certification', 'error');
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
            Certifications Management
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Manage certifications like Hedera Certified Foundation (HCF), issuers, and upload certificate images or PDFs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Certification</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {(certifications || []).map((cert, idx) => (
          <div
            key={cert.id || idx}
            className="p-5 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E5E5E5] text-[#111111] px-2.5 py-0.5 rounded-full">
                  {cert.issueDate || 'Issued'}
                </span>
                <span className="text-xs font-bold text-[#111111]">
                  {cert.issuer}
                </span>
                {cert.fileUrl && (
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    File Attached
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-[#111111]">
                {cert.title}
              </h3>
              {cert.description && (
                <p className="text-xs text-[#555555] line-clamp-1 mt-1">
                  {cert.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {cert.fileUrl && (
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
                >
                  View File
                </a>
              )}
              <button
                onClick={() => handleOpenEdit(cert)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteConfirmId(cert.id)}
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
        title={editingItem ? 'Edit Certification' : 'Add New Certification'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Certification Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g. Hedera Certified Foundation (HCF)"
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Issuing Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                required
                placeholder="e.g. Hedera"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Issue Year / Date
              </label>
              <input
                type="text"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                placeholder="e.g. 2024"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Verification URL
            </label>
            <input
              type="url"
              value={formData.credentialUrl}
              onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          {/* Certificate Image / PDF Upload */}
          <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
              Certificate Image or PDF Document
            </label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 cursor-pointer">
                <span>{uploadingFile ? 'Uploading...' : 'Upload Certificate File'}</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  disabled={uploadingFile}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-[#666666] truncate max-w-xs">
                {formData.fileUrl ? 'File uploaded and linked' : 'No file chosen'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Description / Credential Highlights
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Details regarding concepts mastered..."
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
              {editingItem ? 'Save Changes' : 'Add Certification'}
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
            Are you sure you want to delete this certification?
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
              Delete Certification
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
