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
    <section className="py-20 bg-[#F8FAF9] text-[#0F1514] relative border-b border-[#E2E8E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#E2E8E6] pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#04AF9D]/10 rounded-full border border-[#04AF9D]/20">
              <span className="w-2 h-2 rounded-full bg-[#F6852D]" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#04AF9D]">
                TANSO KATALOG
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F1514] tracking-tight uppercase">
              {language === 'ru' ? 'Категории оборудования' : 'Mahsulot kategoriyalari'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-xl">
              {language === 'ru' 
                ? 'Сертифицированное оборудование европейского и азиатского качества с гарантией'
                : 'Sertifikatlangan va sinovdan o’tgan yuqori unumdorlikka ega quyosh suv isitgichlari va fotopaneellar'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/catalog')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#04AF9D] hover:text-[#038a7c] transition-colors group"
          >
            <span>{t('allCategories')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCategories.map((cat, idx) => {
            const IconComp = iconMap[cat.icon] || Sun;
            const numberLabel = `0${idx + 1}`.slice(-2);
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate(`/catalog/${cat.slug}`)}
                className="group relative h-[380px] rounded-2xl border border-[#222E2B] bg-[#151D1C] text-white cursor-pointer overflow-hidden shadow-xl transition-all duration-500 hover:border-[#04AF9D] hover:shadow-2xl hover:shadow-[#04AF9D]/10"
              >
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={getLoc(cat, 'name')}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-50 group-hover:opacity-75"
                />

                {/* Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1514] via-[#0F1514]/60 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <div className="p-2.5 bg-[#04AF9D] text-white rounded-lg shadow-md">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#F6852D] uppercase tracking-widest bg-[#0F1514]/90 border border-[#222E2B] px-3 py-1 rounded-full backdrop-blur-md">
                    {numberLabel}. {cat.productCount} {language === 'ru' ? 'товаров' : 'ta mahsulot'}
                  </span>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2 z-10">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#04AF9D] transition-colors leading-snug">
                    {getLoc(cat, 'name')}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-normal">
                    {getLoc(cat, 'description')}
                  </p>

                  <div className="pt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#04AF9D] group-hover:translate-x-1 transition-transform">
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

