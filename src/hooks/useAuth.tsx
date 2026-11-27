import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types';
import { login, register, logout } from '../services/authService';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // integration point: GET /api/auth/me
    const stored = localStorage.getItem('g4g_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const u = await login(email, password);
    setUser(u);
    localStorage.setItem('g4g_user', JSON.stringify(u));
  };

  const signUp = async (email: string, password: string) => {
    const u = await register(email, password);
    setUser(u);
    localStorage.setItem('g4g_user', JSON.stringify(u));
  };

  const signOut = () => {
    logout();
    setUser(null);
    localStorage.removeItem('g4g_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};