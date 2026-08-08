import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
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

  const formatPrice = (price: number | null | undefined) => {
    if (!price) return language === 'ru' ? 'Цена по запросу' : 'Narxi so‘rov bo‘yicha';
    return new Intl.NumberFormat(language === 'ru' ? 'ru-RU' : 'uz-UZ').format(price) + ' UZS';
  };

  return (
    <div 
      className="group bg-[#151D1C] text-white border border-[#222E2B] rounded-xl overflow-hidden shadow-lg hover:border-[#04AF9D]/70 hover:shadow-xl hover:shadow-[#04AF9D]/10 transition-all duration-300 flex flex-col justify-between"
      id={`product-card-${product.id}`}
    >
      <div>
        {/* Image Container */}
        <div 
          onClick={() => onNavigate(`/product/${product.slug}`)}
          className="relative h-60 bg-[#0F1514] overflow-hidden cursor-pointer"
        >
          <img 
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'} 
            alt={getLoc(product, 'title')}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />

          {/* Capacity/Model Badge */}
          {product.specs?.[0]?.valueUz && (
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 bg-[#04AF9D] text-white font-bold text-[10px] uppercase tracking-wider rounded shadow-sm">
                {getLoc(product.specs[0], 'value')}
              </span>
            </div>
          )}

          <div className="absolute bottom-3 right-3 z-10">
            <span className="px-2.5 py-1 bg-[#0F1514]/90 text-[#04AF9D] text-[10px] font-bold uppercase tracking-wider rounded border border-[#222E2B] backdrop-blur-md">
              {product.inStock ? (language === 'ru' ? 'В наличии' : 'Sotuvda mavjud') : (language === 'ru' ? 'Под заказ' : 'Buyurtmaga')}
            </span>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-5 space-y-3">
          
          {/* Category Name */}
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6852D] block">
            {category ? getLoc(category, 'name') : 'Tanso Solar'}
          </span>

          {/* Product Title */}
          <h3 
            onClick={() => onNavigate(`/product/${product.slug}`)}
            className="text-base font-bold text-white group-hover:text-[#04AF9D] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {getLoc(product, 'title')}
          </h3>

          {/* Description */}
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
            {getLoc(product, 'shortDesc')}
          </p>

          {/* Key Specs Pills */}
          {product.specs && product.specs.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {product.specs.slice(0, 2).map((sp) => (
                <span key={sp.id} className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded border border-[#222E2B] bg-[#0F1514] text-zinc-300 uppercase">
                  {getLoc(sp, 'key')}: {getLoc(sp, 'value')}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Footer / Pricing & Actions */}
      <div className="p-5 pt-0 space-y-3 border-t border-[#222E2B] mt-2">
        <div className="pt-3 flex items-baseline justify-between">
          <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">
            {language === 'ru' ? 'Цена:' : 'Narxi:'}
          </span>
          <span className="text-base font-extrabold text-[#F6852D] font-mono">
            {formatPrice(product.priceUZS)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onNavigate(`/product/${product.slug}`)}
            className="py-2.5 px-3 rounded-lg border border-[#222E2B] text-zinc-300 hover:text-white hover:border-[#04AF9D]/50 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1"
          >
            <span>{language === 'ru' ? 'Подробнее' : 'Batafsil'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenLead(product)}
            className="py-2.5 px-3 bg-[#04AF9D] hover:bg-[#038a7c] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#04AF9D]/20"
            id={`btn-buy-${product.id}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{language === 'ru' ? 'Запросить' : 'So‘rov yuborish'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};

