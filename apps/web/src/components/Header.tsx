import React, { useEffect, useState } from 'react';
import { Phone, Menu, X, ChevronRight } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

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

  const isActivePath = (path: string) =>
    currentPath === path || (path !== '/' && currentPath.startsWith(path));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D1514]/88 backdrop-blur-2xl border-b border-white/10 shadow-[0_16px_50px_rgba(0,0,0,.18)]'
          : 'bg-gradient-to-b from-[#0D1514]/95 via-[#0D1514]/60 to-transparent'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'py-2.5' : 'py-4'}`}>
        <div className="flex items-center justify-between gap-5">
          <button
            onClick={() => handleNavClick('/')}
            className="shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#08B4A5]"
            aria-label="TANSO bosh sahifa"
          >
            <TansoLogo className="h-8 sm:h-9 lg:h-10" />
          </button>

          <nav className="hidden lg:flex items-center gap-0.5 rounded-xl border border-white/8 bg-white/[0.035] p-1 backdrop-blur-xl">
            {navItems.map((item) => {
              const active = isActivePath(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative px-3.5 xl:px-4 py-2 rounded-lg text-[10px] xl:text-[11px] font-extrabold uppercase tracking-[0.08em] transition-colors ${
                    active ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {active && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#08B4A5]" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.035] p-0.5 text-[10px] font-extrabold uppercase tracking-wider">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2 py-1.5 rounded-md transition-colors ${language === 'uz' ? 'bg-[#08B4A5] text-white' : 'text-zinc-500 hover:text-white'}`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1.5 rounded-md transition-colors ${language === 'ru' ? 'bg-[#08B4A5] text-white' : 'text-zinc-500 hover:text-white'}`}
              >
                RU
              </button>
            </div>

            {settings.phone1 && (
              <a
                href={`tel:${settings.phone1.replace(/\s+/g, '')}`}
                className="hidden xl:flex items-center gap-2 text-[11px] font-bold text-zinc-300 hover:text-white transition-colors"
              >
                <span className="grid place-items-center w-8 h-8 rounded-lg border border-[#08B4A5]/25 bg-[#08B4A5]/10">
                  <Phone className="w-3.5 h-3.5 text-[#08B4A5]" />
                </span>
                <span>{settings.phone1}</span>
              </a>
            )}

            <button onClick={onOpenConsultation} className="btn-tanso-primary whitespace-nowrap">
              {t('consultation')}
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.04] p-0.5 text-[10px] font-extrabold">
              <button onClick={() => setLanguage('uz')} className={`px-2 py-1 rounded-md ${language === 'uz' ? 'bg-[#08B4A5] text-white' : 'text-zinc-400'}`}>UZ</button>
              <button onClick={() => setLanguage('ru')} className={`px-2 py-1 rounded-md ${language === 'ru' ? 'bg-[#08B4A5] text-white' : 'text-zinc-400'}`}>RU</button>
            </div>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="grid place-items-center w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] text-white"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/8 bg-[#0D1514]/98 backdrop-blur-2xl shadow-2xl animate-fade-in">
          <div className="px-4 sm:px-6 py-5 space-y-2">
            {navItems.map((item) => {
              const active = isActivePath(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center justify-between w-full rounded-xl px-4 py-3.5 text-sm font-bold transition-colors ${
                    active ? 'bg-[#08B4A5]/12 text-[#25D4C4] border border-[#08B4A5]/20' : 'text-zinc-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#F58A36]" />
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-white/8 grid gap-3">
              {settings.phone1 && (
                <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="btn-tanso-secondary w-full">
                  <Phone className="w-4 h-4 text-[#08B4A5]" />
                  {settings.phone1}
                </a>
              )}
              <button onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }} className="btn-tanso-primary w-full">
                {t('consultation')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
