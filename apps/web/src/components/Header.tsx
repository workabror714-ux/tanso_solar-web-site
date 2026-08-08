import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { TansoLogo } from './TansoLogo';

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
          ? 'bg-[#0F1514]/95 backdrop-blur-md border-b border-[#222E2B] py-3.5 shadow-xl' 
          : 'bg-gradient-to-b from-[#0F1514]/90 via-[#0F1514]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('/')}
            className="text-left group cursor-pointer"
            id="logo-button"
          >
            <TansoLogo variant="light" className="h-9 sm:h-10" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#151D1C]/80 px-2 py-1.5 rounded-xl border border-[#222E2B] backdrop-blur-md shadow-inner">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#04AF9D] text-white shadow-md shadow-[#04AF9D]/20'
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
            <div className="flex items-center gap-1.5 border-r border-[#222E2B] pr-5 text-[11px] font-bold uppercase tracking-wider">
              <button
                onClick={() => setLanguage('uz')}
                className={`transition-colors px-1.5 py-0.5 rounded ${
                  language === 'uz' ? 'text-[#F6852D] font-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                UZ
              </button>
              <span className="text-zinc-600">/</span>
              <button
                onClick={() => setLanguage('ru')}
                className={`transition-colors px-1.5 py-0.5 rounded ${
                  language === 'ru' ? 'text-[#F6852D] font-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                RU
              </button>
            </div>

            {/* Phone Call Button */}
            <a
              href={`tel:${settings.phone1.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-200 hover:text-[#04AF9D] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F6852D]" />
              <span>{settings.phone1}</span>
            </a>

            {/* Primary CTA */}
            <button
              onClick={onOpenConsultation}
              className="btn-tanso-primary"
              id="btn-header-consultation"
            >
              <span>{t('consultation')}</span>
            </button>

            {/* Quick Admin Access Icon */}
            <button
              onClick={() => handleNavClick('/admin')}
              title="Admin Dashboard"
              className="p-2.5 rounded-lg border border-[#222E2B] hover:border-[#04AF9D]/50 text-zinc-400 hover:text-white transition-colors bg-[#151D1C]"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu controls */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="flex items-center bg-[#151D1C] border border-[#222E2B] rounded-lg p-0.5 text-xs text-zinc-300">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2 py-0.5 rounded ${language === 'uz' ? 'bg-[#04AF9D] text-white font-bold' : ''}`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-0.5 rounded ${language === 'ru' ? 'bg-[#04AF9D] text-white font-bold' : ''}`}
              >
                RU
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#151D1C] border border-[#222E2B] text-zinc-200 hover:text-white"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#04AF9D]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1514]/98 border-b border-[#222E2B] backdrop-blur-xl px-6 py-6 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-[#04AF9D]/15 text-[#04AF9D] border border-[#04AF9D]/30' 
                      : 'text-zinc-300 hover:bg-[#151D1C]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#F6852D]" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#222E2B] space-y-3">
            <a
              href={`tel:${settings.phone1.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#151D1C] border border-[#222E2B] text-zinc-200 text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-[#F6852D]" />
              <span>{settings.phone1}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 rounded-xl bg-[#04AF9D] text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#04AF9D]/20 flex items-center justify-center gap-2"
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

