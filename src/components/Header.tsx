import React, { useState, useEffect } from 'react';
import { Sun, Phone, Menu, X, ChevronRight, Globe, ShieldCheck, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenConsultation }) => {
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('home'), path: '/' },
    { label: t('catalog'), path: '/catalog' },
    { label: t('about'), path: '/about' },
    { label: t('services'), path: '/services' },
    { label: t('projects'), path: '/projects' },
    { label: t('contact'), path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1A1A1A]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl' 
          : 'bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3.5 text-left group"
            id="logo-button"
          >
            <div className="w-8 h-8 bg-[#064E3B] rotate-45 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
              <div className="w-3 h-3 bg-[#F59E0B] rounded-full -rotate-45" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#F9F8F6] uppercase block leading-none font-sans">
                TANSO <span className="text-[#064E3B] font-extrabold text-emerald-400">SOLAR</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#F59E0B] font-bold uppercase block mt-1">
                UZBEKISTAN
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#1A1A1A]/90 p-1.5 rounded-none border border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition-all ${
                    isActive
                      ? 'bg-[#064E3B] text-white shadow-md'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-5">
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-r border-white/15 pr-5 text-[11px] font-bold uppercase tracking-wider">
              <button
                onClick={() => setLanguage('uz')}
                className={`transition-colors ${
                  language === 'uz' ? 'text-[#F59E0B] font-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                UZ
              </button>
              <span className="text-white/20">/</span>
              <button
                onClick={() => setLanguage('ru')}
                className={`transition-colors ${
                  language === 'ru' ? 'text-[#F59E0B] font-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                RU
              </button>
            </div>

            {/* Phone Call Button */}
            <a
              href={`tel:${settings.phone1.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#F59E0B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#064E3B]" />
              <span>{settings.phone1}</span>
            </a>

            {/* Primary CTA */}
            <button
              onClick={onOpenConsultation}
              className="px-6 py-2.5 bg-[#064E3B] hover:bg-emerald-800 text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-emerald-950/80"
              id="btn-header-consultation"
            >
              <span>{t('consultation')}</span>
            </button>

            {/* Quick Admin Access Icon */}
            <button
              onClick={() => handleNavClick('/admin')}
              title="Admin Dashboard"
              className="p-2 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors bg-black/40"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-0.5 text-xs text-zinc-300">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2 py-0.5 rounded-full ${language === 'uz' ? 'bg-zinc-800 text-amber-400 font-bold' : ''}`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-0.5 rounded-full ${language === 'ru' ? 'bg-zinc-800 text-amber-400 font-bold' : ''}`}
              >
                RU
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800/80 backdrop-blur-xl px-6 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' 
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 space-y-3">
            <a
              href={`tel:${settings.phone1.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{settings.phone1}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
            >
              <span>{t('consultation')}</span>
            </button>

            <button
              onClick={() => handleNavClick('/admin')}
              className="w-full py-2 text-center text-xs text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
