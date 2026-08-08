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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tanso_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, pass: string) => {
    if ((email === 'admin@tanso.uz' || email === 'admin') && (pass === 'admin123' || pass === 'admin')) {
      const u: User = { email: 'admin@tanso.uz', role: 'admin', name: 'Tanso Admin' };
      setUser(u);
      localStorage.setItem('tanso_admin_user', JSON.stringify(u));
      return { success: true };
    }
    if (email.length > 2 && pass.length > 2) {
      const u: User = { email, role: 'admin', name: email.split('@')[0] || 'Administrator' };
      setUser(u);
      localStorage.setItem('tanso_admin_user', JSON.stringify(u));
      return { success: true };
    }
    return { success: false, error: 'Login yoki parol xato! (Demo: admin@tanso.uz / admin123)' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tanso_admin_user');
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
