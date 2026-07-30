import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Globe, 
  Menu, 
  X, 
  Sun, 
  Calculator, 
  Send,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCalculator: () => void;
  onOpenContact: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenCalculator,
  onOpenContact,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t.navHome },
    { id: 'calculator', label: t.navCalc, isHighlight: true },
    { id: 'products', label: t.navProducts },
    { id: 'services', label: t.navServices },
    { id: 'about', label: t.navAbout },
    { id: 'advantages', label: t.navAdvantages },
    { id: 'projects', label: t.navProjects },
    { id: 'news', label: t.navNews },
    { id: 'contact', label: t.navContact }
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === 'calculator') {
      onOpenCalculator();
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a 
              href="tel:+998712000022" 
              className="flex items-center gap-1.5 hover:text-teal-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-medium">+998 (71) 200-00-22</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-teal-500" />
              <span>{t.workingHours}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-teal-500" />
              <span>{t.addressShort}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors text-xs font-medium"
              >
                <Globe className="w-3.5 h-3.5 text-teal-400" />
                <span className="uppercase">{currentLang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-1 w-36 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-colors ${
                          currentLang === lang.code
                            ? 'bg-teal-600/20 text-teal-400 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Contact Link */}
            <a 
              href="https://t.me/tansogroup" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs font-medium transition-colors"
            >
              <Send className="w-3 h-3" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-md py-3 border-b border-slate-200/60'
            : 'bg-white/60 backdrop-blur-xl py-4 border-b border-slate-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E7490] to-[#14B8A6] flex items-center justify-center text-white shadow-lg shadow-cyan-900/10 group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 text-emerald-200 animate-spin-slow" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tight text-[#0F172A] font-display">
                  TANSO<span className="text-cyan-600">ENERGY</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-500 tracking-wide font-medium">
                {t.companyTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeSection === link.id
                    ? 'text-cyan-800 bg-cyan-100/60'
                    : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100/60'
                } ${link.isHighlight ? 'text-teal-700' : ''}`}
              >
                <span className="flex items-center gap-1.5">
                  {link.isHighlight && <Calculator className="w-4 h-4 text-teal-600" />}
                  {link.label}
                </span>
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-teal-800 bg-emerald-50/90 border border-emerald-200/80 hover:bg-emerald-100/90 transition-all shadow-sm backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.navCalc}</span>
            </button>

            <button
              onClick={onOpenContact}
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#0E7490] hover:bg-[#0F766E] shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/30 transition-all active:scale-95"
            >
              <span>{t.getQuote}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-left transition-colors ${
                    activeSection === link.id
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.isHighlight && <Calculator className="w-4 h-4 text-emerald-600" />}
                    {link.label}
                  </span>
                  <span className="text-slate-400 text-xs">→</span>
                </button>
              ))}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCalculator();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 text-teal-800 text-sm font-semibold border border-emerald-200"
                >
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <span>{t.navCalc}</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-700 to-teal-700 text-white text-sm font-bold shadow-md shadow-teal-700/20"
                >
                  {t.getQuote}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
