import React, { useState } from 'react';
import Modal from '../components/Modal.jsx';
import { 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  testSupabaseConnection 
} from '../supabaseClient.js';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function SupabaseSettingsModal({ isOpen, onClose, onShowToast }) {
  const { reloadPortfolioData } = usePortfolio();
  const currentConfig = getSupabaseConfig();

  const [url, setUrl] = useState(currentConfig.url || '');
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey || '');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTestConnection = async () => {
    if (!url.trim() || !anonKey.trim()) {
      setTestResult({ success: false, message: 'Please provide both Supabase URL and Anon Key' });
      return;
    }

    setTesting(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection(url.trim(), anonKey.trim());
      setTestResult(res);
    } catch (err) {
      setTestResult({ success: false, message: err.message || 'Connection test failed' });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) {
      if (onShowToast) onShowToast('Both fields are required', 'error');
      return;
    }

    try {
      saveSupabaseConfig(url.trim(), anonKey.trim());
      await reloadPortfolioData();
      if (onShowToast) onShowToast('Supabase configuration saved & connected!', 'success');
      onClose();
    } catch (err) {
      console.error('Error saving Supabase config:', err);
      if (onShowToast) onShowToast('Failed to save configuration', 'error');
    }
  };

  const handleClear = async () => {
    localStorage.removeItem('manogna_portfolio_supabase_config');
    setUrl('');
    setAnonKey('');
    setTestResult(null);
    await reloadPortfolioData();
    if (onShowToast) onShowToast('Returned to Local Persistence Mode', 'info');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Supabase Cloud Database Settings"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSave} className="space-y-6">
        
        <p className="text-xs text-[#555555] leading-relaxed">
          Connect your live Supabase cloud project to enable PostgreSQL tables, Supabase Authentication, Row Level Security (RLS), and Cloud Storage for photos, resumes, and certificates.
        </p>

        {testResult && (
          <div className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
            testResult.success
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-red-50 text-red-900 border border-red-200'
          }`}>
            <span className="font-bold shrink-0">{testResult.success ? 'Success:' : 'Notice:'}</span>
            <span>{testResult.message}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Supabase Project URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-project-id.supabase.co"
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
              Supabase Anon (Public) Key <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              required
              className="w-full px-4 py-2.5 rounded-lg text-xs font-mono bg-white resize-none"
            />
          </div>
        </div>

        {/* Quick Helper */}
        <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] text-xs text-[#666666] space-y-1">
          <p className="font-semibold text-[#111111]">Where to find these in Supabase?</p>
          <p>1. Open your project on <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline font-medium text-[#111111]">supabase.com</a></p>
          <p>2. Go to <strong>Project Settings</strong> &gt; <strong>API</strong></p>
          <p>3. Copy <strong>Project URL</strong> and the <strong>anon / public</strong> API key.</p>
          <p>4. Execute the SQL script in <code>supabase/schema.sql</code> in the Supabase SQL Editor.</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E5E5E5]">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3] disabled:opacity-50"
            >
              {testing ? 'Testing...' : 'Test Connection'}
            </button>
            {currentConfig.url && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                Reset to Local
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800"
            >
              Save & Connect
            </button>
          </div>
        </div>

      </form>
    </Modal>
  );
}
