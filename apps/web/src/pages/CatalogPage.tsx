import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface CatalogPageProps {
  categorySlug?: string;
  onNavigate: (path: string) => void;
  onOpenConsultation: (product?: Product | null) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ categorySlug, onNavigate, onOpenConsultation }) => {
  const { language, t, getLoc } = useLanguage();
  const { products, categories } = useData();

  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(categorySlug || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'newest'>('featured');

  useEffect(() => {
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
    }
  }, [categorySlug]);

  // Active category
  const activeCategory = categories.find(c => c.slug === selectedCategorySlug || c.id === selectedCategorySlug);

  const filteredProducts = useMemo(() => {
    let list = products.filter(p => p.active !== false);

    if (selectedCategorySlug && selectedCategorySlug !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategorySlug || c.id === selectedCategorySlug);
      if (cat) {
        list = list.filter(p => p.categoryId === cat.id);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        const titleUz = (p.titleUz || (p as any).nameUz || '').toLowerCase();
        const titleRu = (p.titleRu || (p as any).nameRu || '').toLowerCase();
        const shortDescUz = (p.shortDescUz || (p as any).shortDescriptionUz || '').toLowerCase();
        const shortDescRu = (p.shortDescRu || (p as any).shortDescriptionRu || '').toLowerCase();
        const fullDescUz = (p.fullDescUz || (p as any).fullDescriptionUz || '').toLowerCase();
        const fullDescRu = (p.fullDescRu || (p as any).fullDescriptionRu || '').toLowerCase();
        const specsText = (p.specs || []).map(s => `${s.keyUz} ${s.keyRu} ${s.valueUz} ${s.valueRu}`).join(' ').toLowerCase();
        return (
          titleUz.includes(q) ||
          titleRu.includes(q) ||
          shortDescUz.includes(q) ||
          shortDescRu.includes(q) ||
          fullDescUz.includes(q) ||
          fullDescRu.includes(q) ||
          specsText.includes(q)
        );
      });
    }

    // Sort
    if (sortBy === 'price_asc') {
      list.sort((a, b) => (a.priceUZS || a.priceUSD || 0) - (b.priceUZS || b.priceUSD || 0));
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => (b.priceUZS || b.priceUSD || 0) - (a.priceUZS || a.priceUSD || 0));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, categories, selectedCategorySlug, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-28 pb-20">
      <div className="tanso-container">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-6">
          <button onClick={() => onNavigate('/')} className="hover:text-[var(--ink)] transition-colors">
            {t('home')}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--border-strong)]" />
          <span className="text-[var(--teal-dark)] font-bold">{t('catalog')}</span>
          {activeCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--border-strong)]" />
              <span className="text-[var(--ink)]">{getLoc(activeCategory, 'name')}</span>
            </>
          )}
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="kicker mb-3">TANSO KATALOG</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--ink)] tracking-[-0.02em]">
            {activeCategory ? getLoc(activeCategory, 'name') : t('catalog')}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted)] mt-2">
            {activeCategory
              ? getLoc(activeCategory, 'description')
              : (language === 'ru' ? 'Солнечные водонагреватели TANSO: напорные, безнапорные и SPLIT-системы' : 'TANSO quyosh suv isitgichlari: bosimli, bosimsiz va SPLIT tizimlar')}
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="card p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ru' ? 'Поиск по названию или характеристикам...' : 'Mahsulot nomi yoki xususiyati bo‘yicha qidiruv...'}
                className="field-input"
              />
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--muted)] font-semibold whitespace-nowrap">{language === 'ru' ? 'Сортировка:' : 'Saralash:'}</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs bg-[var(--surface)] border border-[var(--border)] rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--teal)] cursor-pointer"
              >
                <option value="featured">{language === 'ru' ? 'Популярные' : 'Ommabop'}</option>
                <option value="price_asc">{language === 'ru' ? 'Сначала дешевле' : 'Arzonroq'}</option>
                <option value="price_desc">{language === 'ru' ? 'Сначала дороже' : 'Qimmatroq'}</option>
                <option value="newest">{language === 'ru' ? 'Новинки' : 'Yangi kelganlar'}</option>
              </select>
            </div>

          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategorySlug('all')}
              className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                selectedCategorySlug === 'all'
                  ? 'bg-[var(--teal)] border-[var(--teal)] text-white'
                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--teal)] hover:text-[var(--ink)]'
              }`}
            >
              {language === 'ru' ? 'Все товары' : 'Barcha mahsulotlar'} ({products.length})
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategorySlug === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-[var(--teal)] border-[var(--teal)] text-white'
                      : 'bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--teal)] hover:text-[var(--ink)]'
                  }`}
                >
                  {getLoc(cat, 'name')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center card p-8">
            <p className="text-[var(--muted)] text-sm">
              {language === 'ru' ? 'По вашему запросу ничего не найдено.' : 'So‘rovingiz bo‘yicha mahsulot topilmadi.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onNavigate={onNavigate}
                onOpenLead={(p) => onOpenConsultation(p)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
