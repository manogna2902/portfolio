import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { DEFAULT_ADMIN } from '../supabaseClient.js';

export default function AdminLogin({ onLoginSuccess, onBackToSite, onShowToast }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState(DEFAULT_ADMIN.email);
  const [password, setPassword] = useState(DEFAULT_ADMIN.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      if (onShowToast) onShowToast('Welcome back, Pittala Manogna!', 'success');
      onLoginSuccess();
    } else {
      setError(result.error || 'Authentication failed. Please check credentials.');
      if (onShowToast) onShowToast('Login failed', 'error');
    }
  };

  const handleUseDefaultCredentials = () => {
    setEmail(DEFAULT_ADMIN.email);
    setPassword(DEFAULT_ADMIN.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      
      {/* Top Brand Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#666666] hover:text-[#111111] transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Public Portfolio
        </button>

        <div className="w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-sm">
          PM
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          Admin Control Center
        </h2>
        <p className="mt-1 text-xs text-[#666666]">
          Secure content management portal for Pittala Manogna
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-lg border border-[#E5E5E5] rounded-2xl">
          
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border-[#E5E5E5]"
                placeholder="manogna2902@gmail.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#666666] hover:text-[#111111]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border-[#E5E5E5]"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Log In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Helper Credentials Card */}
          <div className="mt-6 pt-5 border-t border-[#E5E5E5] text-xs text-[#666666]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#111111]">Default Credentials:</span>
              <button
                type="button"
                onClick={handleUseDefaultCredentials}
                className="text-xs text-[#111111] font-bold underline hover:no-underline"
              >
                Auto-fill
              </button>
            </div>
            <div className="bg-[#F9F9F9] p-3 rounded-lg border border-[#E5E5E5] space-y-1 font-mono text-[11px]">
              <div>Email: <span className="text-[#111111] font-semibold">{DEFAULT_ADMIN.email}</span></div>
              <div>Password: <span className="text-[#111111] font-semibold">{DEFAULT_ADMIN.password}</span></div>
            </div>
            <p className="mt-2 text-[11px] text-[#888888]">
              Tip: Supports both local testing and real Supabase Auth when your Supabase database is connected!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
