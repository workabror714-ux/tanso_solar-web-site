import React, { createContext, useContext, useState } from 'react';
import { Language } from '@tanso/shared/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getLoc: <T extends Record<string, any>>(obj: T | undefined | null, fieldPrefix: string) => string;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  uz: {
    admin: 'Boshqaruv',
    close: 'Yopish'
  },
  ru: {
    admin: 'Панель управления',
    close: 'Закрыть'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('tanso_lang');
    return (saved === 'ru' ? 'ru' : 'uz') as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tanso_lang', lang);
  };

  const getLoc = <T extends Record<string, any>>(obj: T | undefined | null, fieldPrefix: string): string => {
    if (!obj) return '';
    const suffix = language === 'ru' ? 'Ru' : 'Uz';
    const key = `${fieldPrefix}${suffix}`;
    if (obj[key] !== undefined && obj[key] !== null) {
      return String(obj[key]);
    }
    const altSuffix = language === 'ru' ? 'Uz' : 'Ru';
    return String(obj[`${fieldPrefix}${altSuffix}`] || '');
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getLoc, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
