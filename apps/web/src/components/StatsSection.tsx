import React from 'react';
import { PackageCheck, Layers3, Languages, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export const StatsSection: React.FC = () => {
  const { language } = useLanguage();
  const { products, categories, settings } = useData();

  const stats = [
    {
      value: String(products.filter((p) => p.active !== false).length),
      titleUz: 'TANSO modeli',
      titleRu: 'моделей TANSO',
      descUz: 'Katalogdagi real mahsulotlar',
      descRu: 'Реальные товары в каталоге',
      icon: PackageCheck,
    },
    {
      value: String(categories.filter((c) => c.active).length),
      titleUz: 'Kategoriya',
      titleRu: 'категории',
      descUz: 'Bosimli, bosimsiz va SPLIT',
      descRu: 'Напорные, безнапорные и SPLIT',
      icon: Layers3,
    },
    {
      value: 'UZ / RU',
      titleUz: 'Ikki tilda',
      titleRu: 'Два языка',
      descUz: 'Sayt va konsultatsiya',
      descRu: 'Сайт и консультация',
      icon: Languages,
    },
    {
      value: 'TOSHKENT',
      titleUz: 'Aloqa markazi',
      titleRu: 'Контактный центр',
      descUz: settings.addressUz || 'Toshkent',
      descRu: settings.addressRu || 'Ташкент',
      icon: MapPin,
    },
  ];

  return (
    <section className="bg-[var(--ink)] border-b border-white/10 py-8 sm:py-10">
      <div className="tanso-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.titleUz} className="card-dark-interactive px-4 sm:px-5 py-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg sm:text-2xl font-mono-num font-bold text-white">{item.value}</div>
                    <div className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#7FD8C7]">
                      {language === 'ru' ? item.titleRu : item.titleUz}
                    </div>
                    <div className="mt-1 text-[9px] sm:text-[10px] leading-relaxed text-[var(--muted-dark)] line-clamp-2">
                      {language === 'ru' ? item.descRu : item.descUz}
                    </div>
                  </div>
                  <span className="grid place-items-center w-9 h-9 rounded-md border border-white/10">
                    <Icon className="w-4 h-4 text-[var(--amber)]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
