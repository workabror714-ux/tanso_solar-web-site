import React, { useMemo, useState } from 'react';
import { Search, Globe } from 'lucide-react';
import { Product } from '@tanso/shared/types';
import { useMiniData } from '../context/MiniDataContext';
import { useLanguage } from '../context/LanguageContext';
import { CategoryChips } from '../components/CategoryChips';
import { ProductCard } from '../components/ProductCard';

interface CatalogPageProps {
  onOpenProduct: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onOpenProduct }) => {
  const { categories, products, isLoading } = useMiniData();
  const { t, getLoc, language, setLanguage } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.active !== false)
      .filter((p) => (activeCategory ? p.categoryId === activeCategory : true))
      .filter((p) => (query.trim() ? getLoc(p, 'title').toLowerCase().includes(query.trim().toLowerCase()) : true));
  }, [products, activeCategory, query, getLoc]);

  return (
    // pb-24 clears the fixed BottomNav (~72px incl. safe-area) so the last
    // row of products is fully reachable when scrolled to the end.
    <div className="pb-24">
      <div className="px-4 pt-4 pb-3 sticky top-0 z-30 bg-[var(--paper)]/95 backdrop-blur border-b border-[var(--border)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-md bg-white border border-[var(--border)] flex items-center justify-center shrink-0 overflow-hidden p-1">
            <img src="/android-chrome-512x512.png" alt="TANSO" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-extrabold text-[var(--ink)] leading-tight">TANSO SOLAR</p>
            <p className="text-[11px] text-[var(--muted)] leading-tight">{t('catalogSubtitle')}</p>
          </div>
          {/* Quick language toggle so switching doesn't require a trip to
              Profile — full picker still lives there too. */}
          <button
            onClick={() => setLanguage(language === 'ru' ? 'uz' : 'ru')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] shrink-0"
            aria-label={t('language')}
          >
            <Globe className="w-3.5 h-3.5 text-[var(--teal-dark)]" />
            <span className="text-[11px] font-bold uppercase text-[var(--ink)]">{language}</span>
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-dark)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="field-input !pl-10"
          />
        </div>

        <CategoryChips categories={categories} active={activeCategory} onChange={setActiveCategory} />
      </div>

      <div className="px-4 pt-4">
        {isLoading && products.length === 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-[14px] bg-[var(--teal-tint)] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-[var(--muted)]">{t('noProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
