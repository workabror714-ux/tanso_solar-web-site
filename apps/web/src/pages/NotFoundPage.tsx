import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSeo } from '../hooks/useSeo';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

// Shown for any URL the router doesn't recognize. Previously these silently
// rendered the HomePage with no indication anything was wrong -- confusing
// for a visitor following a broken/mistyped link, and a "soft 404" that
// returns the homepage's content under the wrong URL.
export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  useSeo({
    title: language === 'ru' ? 'Страница не найдена | TANSO Solar' : 'Sahifa topilmadi | TANSO Solar',
    description: language === 'ru' ? 'Запрошенная страница не существует.' : "So'ralgan sahifa mavjud emas.",
  });

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-32 pb-20 flex items-center justify-center">
      <div className="max-w-md mx-auto p-8 card text-center">
        <div className="text-5xl font-extrabold text-[var(--teal-dark)] font-mono-num mb-2">404</div>
        <h1 className="text-xl font-bold mb-2">
          {language === 'ru' ? 'Страница не найдена' : 'Sahifa topilmadi'}
        </h1>
        <p className="text-xs text-[var(--muted)] mb-6">
          {language === 'ru'
            ? 'Возможно, страница была удалена или адрес введён неверно.'
            : "Sahifa o'chirilgan yoki manzil noto'g'ri kiritilgan bo'lishi mumkin."}
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button onClick={() => onNavigate('/')} className="btn-primary">
            {t('home')}
          </button>
          <button onClick={() => onNavigate('/catalog')} className="btn-secondary">
            {t('catalog')}
          </button>
        </div>
      </div>
    </div>
  );
};
