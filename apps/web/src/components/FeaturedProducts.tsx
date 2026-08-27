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
    <section className="py-20 sm:py-24 bg-[var(--teal-tint)]">
      <div className="tanso-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="kicker">TANSO MAHSULOTLARI</div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">{t('featuredProducts')}</h2>
            <p className="mt-3 text-sm text-[var(--muted)] max-w-xl">
              {language === 'ru' ? 'Выбранные модели из актуального каталога TANSO.' : 'TANSO katalogidan saralangan quyosh suv isitish modellari.'}
            </p>
          </div>
          <button onClick={() => onNavigate('/catalog')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--teal-dark)] group">
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
