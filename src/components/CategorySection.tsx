import React from 'react';
import { ArrowRight, Sun, Zap, Cpu, Battery, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface CategorySectionProps {
  onNavigate: (path: string) => void;
}

const iconMap: Record<string, any> = {
  Sun,
  Zap,
  Cpu,
  Battery,
  Wrench
};

export const CategorySection: React.FC<CategorySectionProps> = ({ onNavigate }) => {
  const { language, t, getLoc } = useLanguage();
  const { categories } = useData();

  const activeCategories = categories.filter(c => c.active).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="py-20 bg-[#F9F8F6] text-[#1A1A1A] relative border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#1A1A1A]/10 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#064E3B]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#064E3B]">
                01. TANSO SOLAR CATALOG
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#1A1A1A] tracking-tight italic">
              {language === 'ru' ? 'Категории оборудования' : 'Mahsulot kategoriyalari'}
            </h2>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-3 max-w-xl">
              {language === 'ru' 
                ? 'Сертифицированное оборудование европейского и азиатского качества с гарантией'
                : 'Sertifikatlangan va sinovdan o’tgan yuqori unumdorlikka ega quyosh qurilmalari'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/catalog')}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#064E3B] hover:text-[#064E3B]/80 transition-colors group"
          >
            <span>{t('allCategories')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategories.map((cat, idx) => {
            const IconComp = iconMap[cat.icon] || Sun;
            const numberLabel = `0${idx + 1}`.slice(-2);
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate(`/catalog/${cat.slug}`)}
                className="group relative h-[380px] border border-[#1A1A1A]/10 bg-[#1A1A1A] text-white cursor-pointer overflow-hidden transition-all duration-500 hover:border-[#064E3B]"
              >
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={getLoc(cat, 'name')}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-50 group-hover:opacity-70"
                />

                {/* Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <div className="p-2.5 bg-[#064E3B] text-white">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-widest bg-[#1A1A1A]/80 border border-white/10 px-3 py-1 backdrop-blur-md">
                    {numberLabel}. {cat.productCount} {language === 'ru' ? 'товаров' : 'ta mahsulot'}
                  </span>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2 z-10">
                  <h3 className="font-editorial text-2xl font-normal text-white group-hover:text-[#F59E0B] transition-colors italic">
                    {getLoc(cat, 'name')}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-light">
                    {getLoc(cat, 'description')}
                  </p>

                  <div className="pt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#064E3B] text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>{t('details')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
