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
    <section id="catalog-home" className="scroll-mt-28 bg-[var(--paper)] py-20 text-[var(--ink)] sm:py-24">
      <div className="tanso-container">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="kicker">TANSO KATALOG</div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-[var(--ink)] sm:text-4xl lg:text-[2.75rem]">
              {language === 'ru' ? 'Категории продукции' : 'Mahsulot kategoriyalari'}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[var(--muted)]">
              {language === 'ru'
                ? 'Напорные, безнапорные и SPLIT-системы TANSO для разных сценариев использования.'
                : 'Turli foydalanish sharoitlari uchun TANSO bosimli, bosimsiz va SPLIT tizimlari.'}
            </p>
          </div>
          <button onClick={() => onNavigate('/catalog')} className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--teal-dark)]">
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
                className="card-interactive group relative min-h-[320px] overflow-hidden text-left"
              >
                <div className="grid h-full min-h-[320px] grid-rows-[auto_200px] sm:grid-cols-[minmax(0,1fr)_minmax(220px,.86fr)] sm:grid-rows-1">
                  <div className="relative z-10 flex min-w-0 flex-col p-6 sm:p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[var(--border)] bg-[var(--teal-tint)] text-[var(--teal-dark)]">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="badge badge-amber font-mono-num">
                        0{idx + 1} · {count} {language === 'ru' ? 'тов.' : 'mahsulot'}
                      </span>
                    </div>

                    <div className="mt-auto min-w-0 pt-8 sm:pt-10">
                      <h3 className="max-w-[19rem] break-words text-[1.3rem] font-extrabold leading-[1.15] tracking-[-0.01em] text-[var(--ink)] transition-colors group-hover:text-[var(--teal-dark)] sm:text-[1.42rem]">
                        {getLoc(cat, 'name')}
                      </h3>
                      <p className="mt-3 max-w-[21rem] text-xs leading-[1.4rem] text-[var(--muted)] line-clamp-3 sm:text-[13px]">
                        {getLoc(cat, 'description')}
                      </p>
                      <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-[var(--teal-dark)]">
                        <span>{t('details')}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  <div className="relative min-h-[200px] overflow-hidden border-t border-[var(--border)] bg-[var(--teal-tint)] sm:min-h-full sm:border-l sm:border-t-0">
                    <img
                      src={cat.imageUrl || '/images/products/tanso-bosimsiz-main.png'}
                      alt={getLoc(cat, 'name')}
                      className="relative z-10 h-full min-h-[200px] w-full object-contain object-center p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:min-h-[320px] sm:p-5"
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
