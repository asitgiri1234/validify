import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api.js';

const AuthContext = createContext(null);

/**
 * Tracks mock “connected” state via express-session on the API.
 */
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading' | 'anonymous' | 'authenticated'
  const [user, setUser] = useState(null);

  const refreshSession = useCallback(async () => {
    try {
      const { data } = await authApi.session();
      if (data?.success && data.authenticated && data.user) {
        setUser(data.user);
        setStatus('authenticated');
      } else {
        setUser(null);
        setStatus('anonymous');
      }
    } catch {
      setUser(null);
      setStatus('anonymous');
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = useCallback(async () => {
    const { data } = await authApi.login();
    if (!data?.success) {
      const err = new Error(data?.error || 'Login failed');
      throw err;
    }
    setUser(data.user ?? null);
    setStatus('authenticated');
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setStatus('anonymous');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const value = useMemo(
    () => ({
      status,
      user,
      isAuthenticated: status === 'authenticated',
      isLoading: status === 'loading',
      login,
      logout,
      refreshSession,
    }),
    [status, user, login, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
