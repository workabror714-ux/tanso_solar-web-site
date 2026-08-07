import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getLoc: <T extends Record<string, any>>(obj: T | undefined | null, fieldPrefix: string) => string;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  uz: {
    home: 'Bosh sahifa',
    catalog: 'Katalog',
    about: 'Biz haqimizda',
    services: 'Xizmatlar',
    projects: 'Loyihalar',
    contact: 'Bog‘lanish',
    admin: 'Boshqaruv',
    consultation: 'Konsultatsiya olish',
    callUs: 'Bizga qo‘ng‘iroq qiling',
    viewProducts: 'Mahsulotlarni ko‘rish',
    freeConsultation: 'Bepul konsultatsiya',
    featuredProducts: 'Mashhur mahsulotlar',
    allCategories: 'Barcha kategoriyalar',
    categories: 'Kategoriyalar',
    details: 'Batafsil',
    buyNow: 'Sotib olish / So‘rov yuborish',
    requestQuote: 'Narxni aniqlash',
    inStock: 'Mavjud',
    onOrder: 'Buyurtma berish mumkin',
    outOfStock: 'Tugagan',
    specifications: 'Texnik xususiyatlari',
    features: 'Afzalliklari va imkoniyatlari',
    warranty: 'Kafolat va xizmat muddati',
    relatedProducts: 'O‘xshash mahsulotlar',
    sendRequest: 'So‘rov yuborish',
    fullName: 'Ism va familiya',
    phoneNumber: 'Telefon raqamingiz',
    quantity: 'Miqdori',
    comment: 'Izoh yoki qo‘shimcha savollar',
    close: 'Yopish',
    successTitle: 'Rahmat! So‘rovingiz qabul qilindi',
    successMsg: 'Tez orada mutaxassisimiz siz bilan bog‘lanadi.',
    whyTanso: 'Nega aynan TANSO SOLAR?',
    process: 'Qanday ishlaymiz?',
    partners: 'Bizning ishonchli hamkorlarimiz',
    contactHeading: 'Quyosh energiyasiga o‘tishga tayyormisiz?',
    contactSubheading: 'So‘rov qoldiring va 15 daqiqa ichida mutaxassisimiz sizga mos tizimni hisoblab beradi.',
    callMe: 'Menga qo‘ng‘iroq qiling',
    address: 'Manzil',
    workingHours: 'Ish vaqti',
    copyright: 'Barcha huquqlar himoyalangan.'
  },
  ru: {
    home: 'Главная',
    catalog: 'Каталог',
    about: 'О компании',
    services: 'Услуги',
    projects: 'Проекты',
    contact: 'Контакты',
    admin: 'Панель управления',
    consultation: 'Получить консультацию',
    callUs: 'Позвонить нам',
    viewProducts: 'Смотреть каталог',
    freeConsultation: 'Бесплатная консультация',
    featuredProducts: 'Популярные товары',
    allCategories: 'Все категории',
    categories: 'Категории',
    details: 'Подробнее',
    buyNow: 'Купить / Оставить заявку',
    requestQuote: 'Узнать цену',
    inStock: 'В наличии',
    onOrder: 'Под заказ',
    outOfStock: 'Нет в наличии',
    specifications: 'Технические характеристики',
    features: 'Преимущества и особенности',
    warranty: 'Гарантия и срок службы',
    relatedProducts: 'Похожие товары',
    sendRequest: 'Отправить заявку',
    fullName: 'Имя и фамилия',
    phoneNumber: 'Номер телефона',
    quantity: 'Количество',
    comment: 'Комментарий или вопросы',
    close: 'Закрыть',
    successTitle: 'Спасибо! Ваша заявка принята',
    successMsg: 'Наш специалист свяжется с вами в ближайшее время.',
    whyTanso: 'Почему выберают TANSO SOLAR?',
    process: 'Как мы работаем?',
    partners: 'Наши партнеры',
    contactHeading: 'Готовы перейти на солнечную энергию?',
    contactSubheading: 'Оставьте заявку и наш специалист рассчитает оптимальную систему за 15 минут.',
    callMe: 'Перезвоните мне',
    address: 'Адрес',
    workingHours: 'Режим работы',
    copyright: 'Все права защищены.'
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
    // Fallback
    const altSuffix = language === 'ru' ? 'Uz' : 'Ru';
    return String(obj[`${fieldPrefix}${altSuffix}`] || '');
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.uz?.[key] || key;
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
