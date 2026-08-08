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
    <div className="min-h-screen bg-[#0D1514] text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
          <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
            {t('home')}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-[#08B4A5] font-bold">{t('catalog')}</span>
          {activeCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-zinc-200">{getLoc(activeCategory, 'name')}</span>
            </>
          )}
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="section-kicker mb-3">TANSO CATALOG</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-[-0.035em]">
            {activeCategory ? getLoc(activeCategory, 'name') : t('catalog')}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            {activeCategory 
              ? getLoc(activeCategory, 'description')
              : (language === 'ru' ? 'Солнечные водонагреватели TANSO: напорные, безнапорные и SPLIT-системы' : 'TANSO quyosh suv isitgichlari: bosimli, bosimsiz va SPLIT tizimlar')}
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-white/[0.035] border border-white/10 rounded-2xl p-4 mb-8 space-y-4 shadow-[0_18px_55px_rgba(0,0,0,.16)] backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ru' ? 'Поиск по названию или характеристикам...' : 'Mahsulot nomi yoki xususiyati bo‘yicha qidiruv...'}
                className="w-full pl-10 pr-4 py-3 text-sm bg-[#09100F] border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#08B4A5]/70 focus:ring-4 focus:ring-[#08B4A5]/5 transition-all"
              />
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-semibold whitespace-nowrap">{language === 'ru' ? 'Сортировка:' : 'Saralash:'}</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs bg-[#0F1514] border border-[#222E2B] rounded-xl text-zinc-200 focus:outline-none focus:border-[#08B4A5] cursor-pointer"
              >
                <option value="featured">{language === 'ru' ? 'Популярные' : 'Ommabop'}</option>
                <option value="price_asc">{language === 'ru' ? 'Сначала дешевле' : 'Arzonroq'}</option>
                <option value="price_desc">{language === 'ru' ? 'Сначала дороже' : 'Qimmatroq'}</option>
                <option value="newest">{language === 'ru' ? 'Новинки' : 'Yangi kelganlar'}</option>
              </select>
            </div>

          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategorySlug('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategorySlug === 'all'
                  ? 'bg-[#08B4A5] text-white shadow-md shadow-[#08B4A5]/20'
                  : 'bg-[#0F1514] border border-[#222E2B] text-zinc-400 hover:text-white hover:border-[#08B4A5]/40'
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
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#08B4A5] text-white shadow-md shadow-[#08B4A5]/20'
                      : 'bg-[#0F1514] border border-[#222E2B] text-zinc-400 hover:text-white hover:border-[#08B4A5]/40'
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
          <div className="py-20 text-center bg-[#151D1C] rounded-2xl border border-[#222E2B] p-8">
            <p className="text-zinc-400 text-sm">
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

