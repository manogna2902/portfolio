import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { uploadAsset } from '../supabaseClient.js';
import { downloadResumePdf } from '../utils/downloadHelper.js';
import Modal from '../components/Modal.jsx';

export default function ResumeManager({ onShowToast }) {
  const { profile, updateProfile } = usePortfolio();

  const [uploading, setUploading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      if (onShowToast) onShowToast('Please select a valid PDF file', 'error');
      return;
    }

    setUploading(true);
    try {
      const res = await uploadAsset('resumes', file, file.name);
      if (res.success) {
        await updateProfile({
          ...profile,
          resumeUrl: res.url,
          resumeFileName: file.name,
          resumeUpdatedAt: new Date().toISOString()
        });
        if (onShowToast) onShowToast('Resume uploaded and published to homepage!', 'success');
      } else {
        if (onShowToast) onShowToast('Failed to upload resume file', 'error');
      }
    } catch (err) {
      console.error('Error uploading resume:', err);
      if (onShowToast) onShowToast('Upload error', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveResume = async () => {
    try {
      await updateProfile({
        ...profile,
        resumeUrl: '',
        resumeFileName: 'Pittala_Manogna_Resume.pdf',
        resumeUpdatedAt: new Date().toISOString()
      });
      setDeleteConfirmOpen(false);
      if (onShowToast) onShowToast('Resume removed. Homepage now uses auto-generated resume format.', 'info');
    } catch (err) {
      console.error('Error removing resume:', err);
      if (onShowToast) onShowToast('Failed to remove resume', 'error');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in">
      
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-[#E5E5E5]">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
          Resume Management
        </h2>
        <p className="text-xs text-[#666666] mt-1">
          Upload, replace, and manage the PDF resume linked directly to the "Download Resume" buttons on the public website.
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Current Active Resume Card */}
        <div className="p-6 rounded-2xl bg-[#F9F9F9] border border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#111111]">
                  {profile.resumeFileName || 'Pittala_Manogna_Resume.pdf'}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  profile.resumeUrl ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {profile.resumeUrl ? 'Custom PDF Active' : 'Auto Generated Resume'}
                </span>
              </div>
              <p className="text-xs text-[#666666] mt-1">
                Last updated: {profile.resumeUpdatedAt ? new Date(profile.resumeUpdatedAt).toLocaleDateString() : 'Current'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {profile.resumeUrl && (
              <button
                type="button"
                onClick={() => downloadResumePdf(profile.resumeUrl, profile.resumeFileName || 'Pittala_Manogna_Resume.pdf', onShowToast)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3] transition-colors"
              >
                Test Download
              </button>
            )}

            {profile.resumeUrl && (
              <button
                onClick={() => setDeleteConfirmOpen(true)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Upload Form Box */}
        <div className="border-2 border-dashed border-[#E5E5E5] hover:border-[#111111] rounded-2xl p-8 sm:p-12 text-center transition-all bg-[#FAFAFA]">
          <div className="w-16 h-16 rounded-full bg-[#111111] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <h4 className="text-base font-bold text-[#111111] mb-1">
            {profile.resumeUrl ? 'Replace Current Resume PDF' : 'Upload Your Professional Resume (PDF)'}
          </h4>
          <p className="text-xs text-[#666666] max-w-sm mx-auto mb-6">
            Upload your latest verified curriculum vitae. Once uploaded, the "Download Resume" buttons on the homepage will immediately deliver this file to visitors.
          </p>

          <label className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 cursor-pointer transition-all shadow-sm">
            {uploading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Uploading & Publishing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Select PDF File</span>
              </>
            )}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Confirm Resume Removal"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-[#444444]">
            Are you sure you want to remove the uploaded PDF resume? Visitors will be able to download the default formatted curriculum vitae.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteConfirmOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
            >
              Cancel
            </button>
            <button
              onClick={handleRemoveResume}
              className="px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
            >
              Remove PDF
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
