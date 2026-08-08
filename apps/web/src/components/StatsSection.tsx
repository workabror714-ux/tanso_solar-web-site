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
      value: 'TASHKENT',
      titleUz: 'Aloqa markazi',
      titleRu: 'Контактный центр',
      descUz: settings.addressUz || 'Toshkent',
      descRu: settings.addressRu || 'Ташкент',
      icon: MapPin,
    },
  ];

  return (
    <section className="bg-[#0D1514] border-b border-white/8 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.titleUz} className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 sm:px-5 py-5 hover:border-[#08B4A5]/30 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg sm:text-2xl font-black tracking-tight text-white">{item.value}</div>
                    <div className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#25D4C4]">
                      {language === 'ru' ? item.titleRu : item.titleUz}
                    </div>
                    <div className="mt-1 text-[9px] sm:text-[10px] leading-relaxed text-zinc-500 line-clamp-2">
                      {language === 'ru' ? item.descRu : item.descUz}
                    </div>
                  </div>
                  <span className="grid place-items-center w-9 h-9 rounded-xl border border-white/8 bg-white/[0.035]">
                    <Icon className="w-4 h-4 text-[#F58A36]" />
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
