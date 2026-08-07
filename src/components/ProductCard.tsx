import React from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
  onOpenLead: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, onOpenLead }) => {
  const { language, t, getLoc } = useLanguage();
  const { categories } = useData();

  const category = categories.find(c => c.id === product.categoryId);

  const formatPrice = (price: number | null) => {
    if (!price) return t('requestQuote');
    return new Intl.NumberFormat(language === 'ru' ? 'ru-RU' : 'uz-UZ').format(price) + ' SO‘M';
  };

  return (
    <div 
      className="group bg-[#1A1A1A] text-white border border-white/10 overflow-hidden shadow-md hover:border-[#064E3B] transition-all duration-300 flex flex-col justify-between"
      id={`product-card-${product.id}`}
    >
      <div>
        {/* Image Container */}
        <div 
          onClick={() => onNavigate(`/product/${product.slug}`)}
          className="relative h-60 bg-black/40 overflow-hidden cursor-pointer"
        >
          <img 
            src={product.images[0]} 
            alt={getLoc(product, 'name')}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="px-2.5 py-1 bg-[#064E3B] text-[#F9F8F6] font-bold text-[10px] uppercase tracking-wider">
              {product.capacity}
            </span>
            {product.featured && (
              <span className="px-2.5 py-1 bg-[#F59E0B] text-[#1A1A1A] font-extrabold text-[10px] uppercase tracking-widest shadow-sm">
                TOP
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 z-10">
            <span className="px-2.5 py-1 bg-[#1A1A1A]/90 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-white/10 backdrop-blur-md">
              {product.availability === 'in_stock' ? t('inStock') : t('onOrder')}
            </span>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-5 space-y-3">
          
          {/* Category Name */}
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
            {category ? getLoc(category, 'name') : 'Tanso Solar'}
          </span>

          {/* Product Title */}
          <h3 
            onClick={() => onNavigate(`/product/${product.slug}`)}
            className="font-editorial text-lg font-normal text-white group-hover:text-[#F59E0B] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {getLoc(product, 'name')}
          </h3>

          {/* Description */}
          <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-light">
            {getLoc(product, 'shortDescription')}
          </p>

          {/* Key Specs Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 border border-white/10 bg-white/5 text-zinc-300 uppercase">
              {product.power}
            </span>
            <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 border border-white/10 bg-white/5 text-zinc-300 uppercase">
              {getLoc(product, 'warranty')}
            </span>
          </div>

        </div>
      </div>

      {/* Footer / Pricing & Actions */}
      <div className="p-5 pt-0 space-y-3 border-t border-white/10 mt-2">
        <div className="pt-3 flex items-baseline justify-between">
          <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Narx:</span>
          <span className="text-sm font-extrabold text-[#F59E0B] font-mono">
            {product.showPrice ? formatPrice(product.price) : t('requestQuote')}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onNavigate(`/product/${product.slug}`)}
            className="py-2.5 px-3 border border-white/20 text-zinc-300 hover:text-white hover:border-white/50 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1"
          >
            <span>{t('details')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenLead(product)}
            className="py-2.5 px-3 bg-[#064E3B] hover:bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-md"
            id={`btn-buy-${product.id}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{language === 'ru' ? 'Заказать' : 'Sotib olish'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
