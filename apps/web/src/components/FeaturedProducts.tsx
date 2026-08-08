import React from 'react';
import { ArrowRight } from 'lucide-react';
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
  const featured = products.filter((p) => p.active !== false && p.featured).slice(0, 6);

  return (
    <section className="py-20 sm:py-24 bg-[#0D1514] text-white relative border-b border-white/8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(8,180,165,.08),transparent_30%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="section-kicker">TANSO PRODUCTS</div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-white">{t('featuredProducts')}</h2>
            <p className="mt-3 text-sm text-zinc-400 max-w-xl">
              {language === 'ru' ? 'Выбранные модели из актуального каталога TANSO.' : 'TANSO katalogidan saralangan quyosh suv isitish modellari.'}
            </p>
          </div>
          <button onClick={() => onNavigate('/catalog')} className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#25D4C4] group">
            <span>{t('viewProducts')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} onOpenLead={onOpenLead} />
          ))}
        </div>
      </div>
    </section>
  );
};
