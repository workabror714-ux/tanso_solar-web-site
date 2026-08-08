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
    <section id="catalog-home" className="scroll-mt-28 py-20 sm:py-24 bg-[#F5F8F7] text-[#0E1715] border-b border-[#DDE7E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="section-kicker">TANSO CATALOG</div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-[#0E1715]">
              {language === 'ru' ? 'Категории продукции' : 'Mahsulot kategoriyalari'}
            </h2>
            <p className="mt-3 text-sm text-[#63716E] max-w-xl">
              {language === 'ru'
                ? 'Напорные, безнапорные и SPLIT-системы TANSO для разных сценариев использования.'
                : 'Turli foydalanish sharoitlari uchun TANSO bosimli, bosimsiz va SPLIT tizimlari.'}
            </p>
          </div>
          <button onClick={() => onNavigate('/catalog')} className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#078F84] group">
            <span>{t('allCategories')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {activeCategories.map((cat, idx) => {
            const Icon = iconMap[cat.iconName || 'Sun'] || Sun;
            const count = products.filter((p) => p.categoryId === cat.id && p.active !== false).length;
            return (
              <button
                key={cat.id}
                onClick={() => onNavigate(`/catalog/${cat.slug}`)}
                className="group text-left relative min-h-[360px] sm:min-h-[340px] rounded-3xl overflow-hidden bg-white border border-[#DDE7E4] shadow-[0_16px_55px_rgba(14,35,31,.07)] hover:border-[#08B4A5]/45 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(8,180,165,.12)] transition-all duration-300"
              >
                <div className="grid h-full min-h-[360px] sm:min-h-[340px] sm:grid-cols-[1.06fr_.94fr]">
                  <div className="relative z-10 p-6 sm:p-8 flex flex-col min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#08B4A5]/10 text-[#08B4A5] shrink-0"><Icon className="w-4.5 h-4.5" /></span>
                      <span className="text-[10px] font-black uppercase tracking-[.15em] text-[#F58A36]">0{idx + 1} · {count} {language === 'ru' ? 'тов.' : 'mahsulot'}</span>
                    </div>

                    <div className="mt-auto pt-8 sm:pt-10 min-w-0">
                      <h3 className="max-w-full text-xl sm:text-[1.42rem] lg:text-[1.5rem] leading-[1.12] font-black tracking-[-0.025em] text-[#0E1715] group-hover:text-[#078F84] transition-colors break-words">
                        {getLoc(cat, 'name')}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#63716E] line-clamp-3">{getLoc(cat, 'description')}</p>
                      <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#078F84]">
                        <span>{t('details')}</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  <div className="relative min-h-[205px] sm:min-h-full overflow-hidden bg-[radial-gradient(circle_at_55%_45%,rgba(8,180,165,.14),transparent_66%)] border-t sm:border-t-0 sm:border-l border-[#E7EFED]">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.75),rgba(8,180,165,.025))]" />
                    <img
                      src={cat.imageUrl || '/images/products/tanso-bosimsiz-main.png'}
                      alt={getLoc(cat, 'name')}
                      className="relative z-10 w-full h-full min-h-[205px] sm:min-h-[340px] object-contain object-center p-4 sm:p-5 transition-transform duration-500 group-hover:scale-[1.045]"
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
