import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Phone, Menu, X, ChevronRight } from 'lucide-react';
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

  const phoneHref = settings.phone1 ? `tel:${settings.phone1.replace(/\s+/g, '')}` : undefined;

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      <div
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[var(--ink)]/97 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.22)]'
            : 'bg-[var(--ink)] border-white/[0.06]'
        }`}
      >
        <div className="tanso-container flex items-center justify-between gap-3 py-3">
          <button
            onClick={() => handleNavClick(navItems[0])}
            className="shrink-0 rounded-lg"
            aria-label="TANSO bosh sahifa"
          >
            <TansoLogo className="h-8 sm:h-9" />
          </button>

          <nav className="hidden xl:flex items-center gap-1 min-w-0">
            {navItems.map((item) => {
              const active = isActiveItem(item);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item)}
                  className={`relative isolate overflow-hidden px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-[0.07em] transition-colors whitespace-nowrap ${
                    active ? 'text-white' : 'text-[var(--muted-dark)] hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="tanso-nav-active"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-x-3 bottom-1 -z-10 h-[2px] bg-[var(--amber)]"
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center justify-end gap-2.5 shrink-0">
            <div className="flex items-center rounded-md border border-white/12 p-0.5 text-[10px] font-bold uppercase tracking-wider">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2.5 py-1.5 rounded transition-colors ${language === 'uz' ? 'bg-[var(--teal)] text-white' : 'text-[var(--muted-dark)] hover:text-white'}`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2.5 py-1.5 rounded transition-colors ${language === 'ru' ? 'bg-[var(--teal)] text-white' : 'text-[var(--muted-dark)] hover:text-white'}`}
              >
                RU
              </button>
            </div>

            {phoneHref && (
              <a
                href={phoneHref}
                className="hidden 2xl:flex shrink-0 items-center gap-2.5 rounded-md border border-white/12 px-2.5 py-1.5 hover:border-[var(--teal)] transition-colors"
                aria-label={`${language === 'ru' ? 'Позвонить' : 'Qo‘ng‘iroq'} ${settings.phone1}`}
              >
                <Phone className="w-3.5 h-3.5 text-[var(--amber)]" />
                <span className="text-[11px] font-mono-num font-semibold text-white whitespace-nowrap">{settings.phone1}</span>
              </a>
            )}

            <button onClick={onOpenConsultation} className="btn-primary whitespace-nowrap !min-h-[42px] !px-4">
              {t('consultation')}
            </button>
          </div>

          <div className="flex xl:hidden items-center gap-2">
            <div className="flex items-center rounded-md border border-white/12 p-0.5 text-[10px] font-bold">
              <button onClick={() => setLanguage('uz')} className={`px-2 py-1.5 rounded ${language === 'uz' ? 'bg-[var(--teal)] text-white' : 'text-[var(--muted-dark)]'}`}>UZ</button>
              <button onClick={() => setLanguage('ru')} className={`px-2 py-1.5 rounded ${language === 'ru' ? 'bg-[var(--teal)] text-white' : 'text-[var(--muted-dark)]'}`}>RU</button>
            </div>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="grid place-items-center w-11 h-11 rounded-md border border-white/12 text-white"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-white/10 animate-fade-in">
            <div className="tanso-container py-4">
              <div className="grid gap-1">
                {navItems.map((item) => {
                  const active = isActiveItem(item);
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item)}
                      className={`flex items-center justify-between w-full rounded-md px-4 py-3.5 text-sm font-bold transition-colors ${
                        active ? 'bg-white/[0.06] text-white border-l-2 border-[var(--amber)]' : 'text-[var(--muted-dark)] hover:bg-white/[0.04] border-l-2 border-transparent'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-[var(--amber)]" />
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 grid sm:grid-cols-2 gap-2.5">
                {phoneHref && (
                  <a href={phoneHref} className="btn-secondary-dark w-full whitespace-nowrap">
                    <Phone className="w-4 h-4 text-[var(--amber)]" />
                    {settings.phone1}
                  </a>
                )}
                <button onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }} className="btn-primary w-full">
                  {t('consultation')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
