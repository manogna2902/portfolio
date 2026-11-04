import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredAuthUser, loginAdmin, logoutAdmin } from '../supabaseClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existing = getStoredAuthUser();
    if (existing) {
      setUser(existing);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const result = await loginAdmin(email, password);
    if (result.success) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    await logoutAdmin();
    setUser(null);
    setLoading(false);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
