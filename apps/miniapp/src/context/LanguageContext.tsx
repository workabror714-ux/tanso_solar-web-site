import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@tanso/shared/types';
import { useTelegram } from './TelegramContext';

/**
 * Mirrors apps/web's LanguageContext (same Language type, same getLoc
 * field-suffix convention: titleUz/titleRu, nameUz/nameRu, etc.) so
 * product/category data already stored bilingually just works here too.
 *
 * Default language: the user's own saved choice if they've picked one
 * before (tanso_bot_lang_v1 in localStorage); otherwise, on first launch,
 * follow Telegram's own client language (ru -> Russian, anything else ->
 * Uzbek) so the app opens in the language the person already uses.
 */

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getLoc: <T extends Record<string, any>>(obj: T | undefined | null, fieldPrefix: string) => string;
  t: (key: string, vars?: Record<string, string>) => string;
}

const STORAGE_KEY = 'tanso_bot_lang_v1';

const translations: Record<Language, Record<string, string>> = {
  uz: {
    catalogSubtitle: "Quyosh suv isitgichlari katalogi",
    searchPlaceholder: "Mahsulot qidirish...",
    noProducts: "Mahsulot topilmadi",
    all: "Barchasi",
    outOfStock: "Tugagan",
    inStock: "Mavjud",
    priceOnRequest: "Narx so'rov bo'yicha",
    specifications: "Texnik xususiyatlari",
    addToCart: "Savatga qo'shish",
    goToCart: "Savatga o'tish",
    cart: "Savat",
    orderReceivedTitle: "So'rov qabul qilindi!",
    orderReceivedMsg: "Bizning mutaxassisimiz tez orada siz bilan {phone} raqami orqali bog'lanadi.",
    backToCatalog: "Katalogga qaytish",
    cartEmptyTitle: "Savatingiz bo'sh",
    cartEmptyMsg: "Katalogdan mahsulot tanlab qo'shing",
    viewCatalog: "Katalogni ko'rish",
    errFullName: "Ism va familiyangizni kiriting",
    errPhone: "Telefon raqamini to'liq kiriting (9 ta raqam)",
    estimatedTotal: "Taxminiy summa",
    orderFormTitle: "Buyurtma berish uchun ma'lumotlaringiz",
    fullNamePlaceholder: "Ism va familiya",
    commentPlaceholder: "Qo'shimcha izoh (ixtiyoriy)",
    sending: "Yuborilmoqda...",
    placeOrder: "Buyurtma berish",
    genericError: "Xatolik yuz berdi, qaytadan urinib ko'ring.",
    noOrdersTitle: "So'rovlar yo'q",
    noOrdersMsg: "Katalogdan mahsulot tanlab buyurtma bersangiz, shu yerda ko'rinadi.",
    myOrders: "Mening so'rovlarim",
    myOrdersShort: "So'rovlarim",
    sent: "Yuborildi",
    managerWillCall: "Mas'ul menejer {phone} raqamiga qo'ng'iroq qiladi.",
    contact: "Aloqa",
    phone: "Telefon",
    address: "Manzil",
    workingHours: "Ish vaqti",
    telegramChannel: "Telegram kanal",
    subscribeNews: "Yangiliklarga obuna bo'ling",
    officialPage: "Rasmiy sahifamiz",
    ourVideos: "Videolarimiz",
    goToWebsite: "Veb-saytga o'tish",
    catalog: "Katalog",
    profile: "Profil",
    language: "Til",
    profileGuestName: "Mehmon",
  },
  ru: {
    catalogSubtitle: "Каталог солнечных водонагревателей",
    searchPlaceholder: "Поиск товара...",
    noProducts: "Товар не найден",
    all: "Все",
    outOfStock: "Нет в наличии",
    inStock: "В наличии",
    priceOnRequest: "Цена по запросу",
    specifications: "Технические характеристики",
    addToCart: "Добавить в корзину",
    goToCart: "Перейти в корзину",
    cart: "Корзина",
    orderReceivedTitle: "Заявка принята!",
    orderReceivedMsg: "Наш специалист свяжется с вами по номеру {phone} в ближайшее время.",
    backToCatalog: "Вернуться в каталог",
    cartEmptyTitle: "Ваша корзина пуста",
    cartEmptyMsg: "Выберите товары из каталога",
    viewCatalog: "Смотреть каталог",
    errFullName: "Введите имя и фамилию",
    errPhone: "Введите номер телефона полностью (9 цифр)",
    estimatedTotal: "Примерная сумма",
    orderFormTitle: "Ваши данные для оформления заказа",
    fullNamePlaceholder: "Имя и фамилия",
    commentPlaceholder: "Дополнительный комментарий (необязательно)",
    sending: "Отправка...",
    placeOrder: "Оформить заказ",
    genericError: "Произошла ошибка, попробуйте ещё раз.",
    noOrdersTitle: "Заявок пока нет",
    noOrdersMsg: "Выберите товар в каталоге и оформите заказ — он появится здесь.",
    myOrders: "Мои заявки",
    myOrdersShort: "Заявки",
    sent: "Отправлено",
    managerWillCall: "Менеджер позвонит вам по номеру {phone}.",
    contact: "Контакты",
    phone: "Телефон",
    address: "Адрес",
    workingHours: "Часы работы",
    telegramChannel: "Telegram-канал",
    subscribeNews: "Подпишитесь на новости",
    officialPage: "Наша официальная страница",
    ourVideos: "Наши видео",
    goToWebsite: "Перейти на сайт",
    catalog: "Каталог",
    profile: "Профиль",
    language: "Язык",
    profileGuestName: "Гость",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useTelegram();

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ru' || saved === 'uz') return saved;
    } catch {
      // localStorage unavailable — fall through to default.
    }
    return 'uz';
  });

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    if (saved) return; // user already has an explicit preference — don't override it
    if (user?.language_code === 'ru') {
      setLanguageState('ru');
    }
  }, [user]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const getLoc = <T extends Record<string, any>>(obj: T | undefined | null, fieldPrefix: string): string => {
    if (!obj) return '';
    const suffix = language === 'ru' ? 'Ru' : 'Uz';
    const altSuffix = language === 'ru' ? 'Uz' : 'Ru';
    const key = `${fieldPrefix}${suffix}`;
    if (obj[key] !== undefined && obj[key] !== null && String(obj[key]).trim() !== '') return String(obj[key]);
    const altKey = `${fieldPrefix}${altSuffix}`;
    if (obj[altKey] !== undefined && obj[altKey] !== null && String(obj[altKey]).trim() !== '') return String(obj[altKey]);
    return '';
  };

  const t = (key: string, vars?: Record<string, string>): string => {
    let str = translations[language]?.[key] || translations.uz?.[key] || key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(`{${k}}`, v);
      }
    }
    return str;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getLoc, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
