import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface FeaturedProductsProps {
  onNavigate: (path: string) => void;
  onOpenLead: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onNavigate, onOpenLead }) => {
  const { language, t } = useLanguage();
  const { products } = useData();

  const featured = products.filter(p => p.active && p.featured).slice(0, 6);

  return (
    <section className="py-20 bg-[#1A1A1A] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#F59E0B]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F59E0B]">
                02. TANSO SELECTION
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#F9F8F6] tracking-tight italic">
              {t('featuredProducts')}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-3 max-w-xl">
              {language === 'ru'
                ? 'Самые востребованные солнечные водонагреватели и энергосистемы в Узбекистане'
                : 'O’zbekistonda eng ko’p talab qilinadigan quyosh suv isitgichlari va energiya tizimlari'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/catalog')}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400 hover:text-white transition-colors group"
          >
            <span>{t('viewProducts')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onOpenLead={onOpenLead}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
