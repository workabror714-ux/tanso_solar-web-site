import React from 'react';
import { ArrowRight, Sun, Droplets, Layers3, PanelsTopLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface CategorySectionProps {
  onNavigate: (path: string) => void;
}

const iconMap: Record<string, any> = { Sun, Droplets, Layers: Layers3, PanelsTopLeft };

export const CategorySection: React.FC<CategorySectionProps> = ({ onNavigate }) => {
  const { language, t, getLoc } = useLanguage();
  const { categories, products } = useData();
  const activeCategories = categories.filter((c) => c.active).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="catalog-home" className="scroll-mt-28 border-b border-[#DDE7E4] bg-[#F5F8F7] py-20 text-[#0E1715] sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="section-kicker">TANSO CATALOG</div>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#0E1715] sm:text-4xl lg:text-5xl">
              {language === 'ru' ? 'Категории продукции' : 'Mahsulot kategoriyalari'}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[#63716E]">
              {language === 'ru'
                ? 'Напорные, безнапорные и SPLIT-системы TANSO для разных сценариев использования.'
                : 'Turli foydalanish sharoitlari uchun TANSO bosimli, bosimsiz va SPLIT tizimlari.'}
            </p>
          </div>
          <button onClick={() => onNavigate('/catalog')} className="group inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#078F84]">
            <span>{t('allCategories')}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {activeCategories.map((cat, idx) => {
            const Icon = iconMap[cat.iconName || 'Sun'] || Sun;
            const count = products.filter((p) => p.categoryId === cat.id && p.active !== false).length;

            return (
              <button
                key={cat.id}
                onClick={() => onNavigate(`/catalog/${cat.slug}`)}
                className="group relative min-h-[330px] overflow-hidden rounded-[28px] border border-[#D9E5E2] bg-white text-left shadow-[0_16px_50px_rgba(14,35,31,.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#08B4A5]/40 hover:shadow-[0_28px_70px_rgba(8,180,165,.13)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#08B4A5,#35D2C4,#F58A36)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="grid h-full min-h-[330px] grid-rows-[auto_210px] sm:grid-cols-[minmax(0,1fr)_minmax(220px,.86fr)] sm:grid-rows-1">
                  <div className="relative z-10 flex min-w-0 flex-col p-6 sm:p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#08B4A5]/10 bg-[#08B4A5]/[0.09] text-[#08B4A5]">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="rounded-full bg-[#FFF5EC] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.14em] text-[#F27D22]">
                        0{idx + 1} · {count} {language === 'ru' ? 'тов.' : 'mahsulot'}
                      </span>
                    </div>

                    <div className="mt-auto min-w-0 pt-8 sm:pt-10">
                      <h3 className="max-w-[19rem] break-words text-[1.35rem] font-black leading-[1.12] tracking-[-0.026em] text-[#0E1715] transition-colors group-hover:text-[#078F84] sm:text-[1.48rem]">
                        {getLoc(cat, 'name')}
                      </h3>
                      <p className="mt-3 max-w-[21rem] text-xs leading-[1.4rem] text-[#63716E] line-clamp-3 sm:text-[13px]">
                        {getLoc(cat, 'description')}
                      </p>
                      <div className="mt-5 inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[.14em] text-[#078F84]">
                        <span>{t('details')}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  <div className="relative min-h-[210px] overflow-hidden border-t border-[#E7EFED] bg-[radial-gradient(circle_at_50%_48%,rgba(8,180,165,.16),transparent_63%)] sm:min-h-full sm:border-l sm:border-t-0">
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.9),rgba(8,180,165,.035))]" />
                    <div className="absolute bottom-5 right-5 h-24 w-24 rounded-full border border-[#08B4A5]/10" />
                    <div className="absolute bottom-9 right-9 h-16 w-16 rounded-full border border-[#F58A36]/10" />
                    <img
                      src={cat.imageUrl || '/images/products/tanso-bosimsiz-main.png'}
                      alt={getLoc(cat, 'name')}
                      className="relative z-10 h-full min-h-[210px] w-full object-contain object-center p-4 transition-transform duration-500 ease-out group-hover:scale-[1.055] sm:min-h-[330px] sm:p-5"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
