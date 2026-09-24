import React, { useMemo, useState } from 'react';
import { Search, Sun } from 'lucide-react';
import { Product } from '@tanso/shared/types';
import { useMiniData } from '../context/MiniDataContext';
import { CategoryChips } from '../components/CategoryChips';
import { ProductCard } from '../components/ProductCard';

interface CatalogPageProps {
  onOpenProduct: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onOpenProduct }) => {
  const { categories, products, isLoading } = useMiniData();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.active !== false)
      .filter((p) => (activeCategory ? p.categoryId === activeCategory : true))
      .filter((p) => (query.trim() ? p.titleUz.toLowerCase().includes(query.trim().toLowerCase()) : true));
  }, [products, activeCategory, query]);

  return (
    <div className="pb-4">
      <div className="px-4 pt-4 pb-3 sticky top-0 z-30 bg-[var(--paper)]/95 backdrop-blur border-b border-[var(--border)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-md bg-[var(--teal)] flex items-center justify-center shrink-0">
            <Sun className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-[var(--ink)] leading-tight">TANSO SOLAR</p>
            <p className="text-[11px] text-[var(--muted)] leading-tight">Quyosh suv isitgichlari katalogi</p>
          </div>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-dark)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mahsulot qidirish..."
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
            <p className="text-sm text-[var(--muted)]">Mahsulot topilmadi</p>
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
