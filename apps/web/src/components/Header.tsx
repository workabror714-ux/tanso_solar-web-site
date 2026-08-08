import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Phone, Menu, X, ChevronRight, LockKeyhole } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { TansoLogo } from './TansoLogo';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

interface NavItem {
  label: string;
  path: string;
  sectionId: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenConsultation }) => {
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHomeSection, setActiveHomeSection] = useState('home');
  const rafRef = useRef<number | null>(null);

  const navItems: NavItem[] = useMemo(() => [
    { label: t('home'), path: '/', sectionId: 'home' },
    { label: t('catalog'), path: '/catalog', sectionId: 'catalog-home' },
    { label: t('about'), path: '/about', sectionId: 'about-home' },
    { label: t('services'), path: '/services', sectionId: 'services-home' },
    { label: t('projects'), path: '/projects', sectionId: 'projects-home' },
    { label: t('contact'), path: '/contact', sectionId: 'contact-home' },
  ], [language]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (currentPath !== '/') return;

    const updateActiveSection = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        const activationLine = Math.min(220, window.innerHeight * 0.28);
        let nextActive = 'home';

        for (const item of navItems) {
          const section = document.getElementById(item.sectionId);
          if (!section) continue;
          const rect = section.getBoundingClientRect();
          if (rect.top <= activationLine) nextActive = item.sectionId;
        }

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 28) {
          nextActive = 'contact-home';
        }

        setActiveHomeSection((prev) => (prev === nextActive ? prev : nextActive));
        rafRef.current = null;
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [currentPath, navItems]);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const headerOffset = 96;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    setActiveHomeSection(sectionId);
  };

  const handleNavClick = (item: NavItem) => {
    setMobileMenuOpen(false);

    if (currentPath === '/') {
      scrollToSection(item.sectionId);
      return;
    }

    // Subpages keep their dedicated routes. Home uses scroll-spy sections.
    onNavigate(item.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActiveItem = (item: NavItem) => {
    if (currentPath === '/') return activeHomeSection === item.sectionId;
    if (item.path === '/catalog' && currentPath.startsWith('/product/')) return true;
    return currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
  };

  const openAdmin = () => {
    // Root application switches between public/admin apps based on pathname, so use a full navigation.
    window.location.assign('/admin');
  };

  const phoneHref = settings.phone1 ? `tel:${settings.phone1.replace(/\s+/g, '')}` : undefined;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4 pt-3 transition-all duration-300 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto max-w-[1480px] transition-all duration-300 rounded-2xl border ${
          isScrolled
            ? 'bg-[#0B1413]/92 backdrop-blur-2xl border-white/10 shadow-[0_18px_55px_rgba(0,0,0,.28)]'
            : 'bg-[#0B1413]/68 backdrop-blur-xl border-white/[0.075] shadow-[0_14px_45px_rgba(0,0,0,.14)]'
        }`}
      >
        <div className={`flex items-center justify-between gap-3 px-3 sm:px-4 lg:px-5 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-2.5'}`}>
          <button
            onClick={() => handleNavClick(navItems[0])}
            className="shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#08B4A5]"
            aria-label="TANSO bosh sahifa"
          >
            <TansoLogo className="h-8 sm:h-9 2xl:h-10" />
          </button>

          <nav className="hidden xl:flex items-center gap-1 min-w-0">
            {navItems.map((item) => {
              const active = isActiveItem(item);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item)}
                  className={`relative isolate overflow-hidden px-3 2xl:px-4 py-2.5 rounded-xl text-[10px] 2xl:text-[11px] font-extrabold uppercase tracking-[0.075em] transition-colors whitespace-nowrap ${
                    active ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="tanso-nav-active"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-xl border border-[#08B4A5]/24 bg-[#08B4A5]/10 shadow-[inset_0_-2px_0_#08B4A5]"
                    />
                  )}
                  <span className="inline-flex items-center gap-2">
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#F58A36] shadow-[0_0_0_4px_rgba(245,138,54,.08)]" />}
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center justify-end gap-2 2xl:gap-3 shrink-0">
            <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.035] p-0.5 text-[10px] font-extrabold uppercase tracking-wider">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2 py-1.5 rounded-[9px] transition-colors ${language === 'uz' ? 'bg-[#08B4A5] text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1.5 rounded-[9px] transition-colors ${language === 'ru' ? 'bg-[#08B4A5] text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
              >
                RU
              </button>
            </div>

            {phoneHref && (
              <>
                <a
                  href={phoneHref}
                  className="hidden 2xl:flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1.5 hover:border-[#08B4A5]/35 hover:bg-[#08B4A5]/[0.06] transition-all"
                  aria-label={`${language === 'ru' ? 'Позвонить' : 'Qo‘ng‘iroq'} ${settings.phone1}`}
                >
                  <span className="grid place-items-center w-8 h-8 rounded-lg bg-[#08B4A5]/10 border border-[#08B4A5]/20">
                    <Phone className="w-3.5 h-3.5 text-[#25D4C4]" />
                  </span>
                  <span className="leading-none whitespace-nowrap">
                    <span className="block text-[8px] uppercase tracking-[.14em] text-zinc-500 mb-1">
                      {language === 'ru' ? 'Телефон' : 'Qo‘ng‘iroq'}
                    </span>
                    <span className="block text-[11px] font-extrabold text-zinc-200">{settings.phone1}</span>
                  </span>
                </a>

                <a
                  href={phoneHref}
                  className="hidden xl:grid 2xl:hidden place-items-center w-10 h-10 rounded-xl border border-white/10 bg-white/[0.035] text-[#25D4C4] hover:bg-[#08B4A5]/10 hover:border-[#08B4A5]/35 transition-all"
                  title={settings.phone1}
                  aria-label={`${language === 'ru' ? 'Позвонить' : 'Qo‘ng‘iroq'} ${settings.phone1}`}
                >
                  <Phone className="w-4 h-4" />
                </a>
              </>
            )}

            <button onClick={onOpenConsultation} className="btn-tanso-primary whitespace-nowrap !min-h-[42px] !px-4 2xl:!px-5">
              {t('consultation')}
            </button>

            <button
              onClick={openAdmin}
              className="grid place-items-center w-10 h-10 rounded-xl border border-white/10 bg-white/[0.035] text-zinc-500 hover:text-[#25D4C4] hover:border-[#08B4A5]/35 hover:bg-[#08B4A5]/10 transition-all"
              title={language === 'ru' ? 'Админ-панель' : 'Admin panel'}
              aria-label={language === 'ru' ? 'Открыть админ-панель' : 'Admin panelni ochish'}
            >
              <LockKeyhole className="w-4 h-4" />
            </button>
          </div>

          <div className="flex xl:hidden items-center gap-2">
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

        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-white/8 px-3 sm:px-4 py-4 animate-fade-in">
            <div className="grid gap-1.5">
              {navItems.map((item) => {
                const active = isActiveItem(item);
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item)}
                    className={`flex items-center justify-between w-full rounded-xl px-4 py-3.5 text-sm font-bold transition-colors ${
                      active ? 'bg-[#08B4A5]/12 text-[#25D4C4] border border-[#08B4A5]/20' : 'text-zinc-300 hover:bg-white/[0.04] border border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-[#F58A36]" />}
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#F58A36]" />
                  </button>
                );
              })}
            </div>

            <div className="pt-4 mt-4 border-t border-white/8 grid sm:grid-cols-2 gap-2.5">
              {phoneHref && (
                <a href={phoneHref} className="btn-tanso-secondary w-full whitespace-nowrap">
                  <Phone className="w-4 h-4 text-[#08B4A5]" />
                  {settings.phone1}
                </a>
              )}
              <button onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }} className="btn-tanso-primary w-full">
                {t('consultation')}
              </button>
              <button
                onClick={openAdmin}
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] py-3 text-xs font-extrabold uppercase tracking-wider text-zinc-400 hover:text-white hover:border-[#08B4A5]/35 transition-colors"
              >
                <LockKeyhole className="w-4 h-4 text-[#08B4A5]" />
                {language === 'ru' ? 'Админ-панель' : 'Admin panel'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
