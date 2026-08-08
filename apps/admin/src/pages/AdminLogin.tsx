import React, { useState } from 'react';
import { Sun, Lock, User, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLoginProps {
  onNavigate: (path: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@tanso.uz');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      onNavigate('/admin');
    } else {
      setError(res.error || 'Login xatosi');
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4 text-white relative">
      <div className="w-full max-w-md bg-[#1A1A1A] border border-white/10 p-8 relative z-10">
        
        {/* Brand */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 mx-auto bg-[#064E3B] border border-[#064E3B] flex items-center justify-center">
            <Sun className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <h1 className="text-2xl font-editorial font-light tracking-wider text-white italic">
            TANSO <span className="text-[#F59E0B] not-italic">SOLAR</span>
          </h1>
          <p className="text-xs text-zinc-400">
            Administrator boshqaruv paneli
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
              Login / Email
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tanso.uz"
                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#064E3B] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
              Parol
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#064E3B] transition-colors"
              />
            </div>
          </div>

          <div className="p-3 bg-black/60 border border-white/10 text-[11px] text-zinc-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Demo kirish: <b>admin@tanso.uz</b> / <b>admin123</b></span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 bg-[#064E3B] hover:bg-[#064E3B]/80 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            id="btn-admin-login"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Tizimga kirish</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-wider"
          >
            ← Bosh sahifaga qaytish
          </button>
        </div>

      </div>
    </div>
  );
};
