import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronRight, LayoutGrid, List } from 'lucide-react';
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

  // Active category
  const activeCategory = categories.find(c => c.slug === selectedCategorySlug);

  const filteredProducts = useMemo(() => {
    let list = products.filter(p => p.active);

    if (selectedCategorySlug && selectedCategorySlug !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategorySlug);
      if (cat) {
        list = list.filter(p => p.categoryId === cat.id);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.nameUz.toLowerCase().includes(q) ||
        p.nameRu.toLowerCase().includes(q) ||
        p.capacity.toLowerCase().includes(q) ||
        p.power.toLowerCase().includes(q) ||
        p.shortDescriptionUz.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price_asc') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, categories, selectedCategorySlug, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
          <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
            {t('home')}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-emerald-400 font-semibold">{t('catalog')}</span>
          {activeCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-zinc-200">{getLoc(activeCategory, 'name')}</span>
            </>
          )}
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {activeCategory ? getLoc(activeCategory, 'name') : t('catalog')}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            {activeCategory 
              ? getLoc(activeCategory, 'description')
              : (language === 'ru' ? 'Высококачественное солнечные системы, панели, инверторы и накопители' : 'Quyosh suv isitish tizimlari, fotopaneellar, inverterlar hamda akkumulyatorlar')}
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ru' ? 'Поиск по названию или характеристикам...' : 'Mahsulot nomi yoki xususiyati bo‘yicha qidiruv...'}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-semibold whitespace-nowrap">Saralash:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
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
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategorySlug === 'all'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
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
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
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
          <div className="py-20 text-center bg-zinc-900/40 rounded-2xl border border-zinc-800/80 p-8">
            <p className="text-zinc-400 text-sm">
              {language === 'ru' ? 'По вашему запросу ничего не найдено.' : 'So‘rovingiz bo‘yicha mahsulot topilmadi.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
