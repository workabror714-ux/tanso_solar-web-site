import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
  role: 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// These two keys are always written together by login() below, and are
// what every admin API call (see DataContext.tsx's adminFetch) sends as
// the `x-admin-key` header. Previously this "login" was entirely
// client-side (any email/password combo worked) and no request was ever
// checked server-side — see server.ts's requireAdminAuth for the real
// check this now talks to.
const ADMIN_KEY_STORAGE = 'tanso_admin_key';
const ADMIN_USER_STORAGE = 'tanso_admin_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // A saved user is only trusted together with a saved admin key (they're
    // always written together). A user without a key means an old
    // pre-auth session (or a cleared key) — not valid, log in again.
    const savedUser = localStorage.getItem(ADMIN_USER_STORAGE);
    const savedKey = localStorage.getItem(ADMIN_KEY_STORAGE);
    if (savedUser && savedKey) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: pass }),
      });
      if (!res.ok) {
        return { success: false, error: 'Email yoki parol noto‘g‘ri.' };
      }
      const u: User = { email, role: 'admin', name: email.split('@')[0] || 'Administrator' };
      setUser(u);
      localStorage.setItem(ADMIN_USER_STORAGE, JSON.stringify(u));
      localStorage.setItem(ADMIN_KEY_STORAGE, pass);
      return { success: true };
    } catch {
      return { success: false, error: 'Serverga ulanib bo‘lmadi. Internet aloqasini tekshiring.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(ADMIN_USER_STORAGE);
    localStorage.removeItem(ADMIN_KEY_STORAGE);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
