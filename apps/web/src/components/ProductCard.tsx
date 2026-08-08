import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
  onOpenLead: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, onOpenLead }) => {
  const { language, getLoc } = useLanguage();
  const { categories } = useData();

  const category = categories.find(c => c.id === product.categoryId);

  const formatPrice = (price: number | null | undefined) => {
    if (!price) return language === 'ru' ? 'Цена по запросу' : 'Narxi so‘rov bo‘yicha';
    const formatted = new Intl.NumberFormat(language === 'ru' ? 'ru-RU' : 'uz-UZ').format(price);
    return `${formatted} ${language === 'ru' ? 'сум' : 'so‘m'}`;
  };

  const primarySpec = product.specs?.[0];
  const secondarySpecs = (product.specs || []).slice(0, 2);

  return (
    <article
      id={`product-card-${product.id}`}
      className="group relative flex h-full min-h-[590px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#111A18] text-white shadow-[0_18px_55px_rgba(0,0,0,.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#08B4A5]/45 hover:shadow-[0_28px_80px_rgba(8,180,165,.13)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(8,180,165,.07),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <button
        type="button"
        onClick={() => onNavigate(`/product/${product.slug}`)}
        className="relative block h-[285px] w-full overflow-hidden bg-[#F4F8F7] text-left"
        aria-label={getLoc(product, 'title')}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(8,180,165,.10),transparent_58%)]" />

        <img
          src={product.images?.[0] || '/images/products/tanso-bosimsiz-main.png'}
          alt={getLoc(product, 'title')}
          className="relative z-[1] h-full w-full object-contain object-center p-5 transition-transform duration-500 ease-out group-hover:scale-[1.045]"
        />

        <div className="absolute left-4 top-4 z-10 max-w-[72%]">
          <span className="inline-flex min-h-7 items-center rounded-full border border-[#08B4A5]/20 bg-white/[0.92] px-3 py-1 text-[9px] font-black uppercase tracking-[.14em] text-[#078F84] shadow-sm backdrop-blur-sm">
            {category ? getLoc(category, 'name') : 'Tanso Solar'}
          </span>
        </div>

        <div className="absolute right-4 top-4 z-10">
          <span className={`inline-flex min-h-7 items-center rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[.12em] shadow-sm backdrop-blur-sm ${
            product.inStock
              ? 'border border-[#08B4A5]/20 bg-[#0D1514]/[0.88] text-[#54E5D6]'
              : 'border border-[#F58A36]/25 bg-[#0D1514]/[0.88] text-[#FFB36F]'
          }`}>
            {product.inStock
              ? (language === 'ru' ? 'В наличии' : 'Sotuvda')
              : (language === 'ru' ? 'Под заказ' : 'Buyurtmaga')}
          </span>
        </div>

        {primarySpec?.valueUz && (
          <div className="absolute bottom-4 left-4 z-10">
            <span className="inline-flex items-center rounded-xl bg-[#08B4A5] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.1em] text-white shadow-[0_8px_20px_rgba(8,180,165,.22)]">
              {getLoc(primarySpec, 'value')}
            </span>
          </div>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex-1">
          <h3
            onClick={() => onNavigate(`/product/${product.slug}`)}
            className="min-h-[3.25rem] cursor-pointer text-[1.04rem] font-extrabold leading-[1.55rem] tracking-[-0.018em] text-white transition-colors group-hover:text-[#55E1D4] line-clamp-2"
          >
            {getLoc(product, 'title')}
          </h3>

          <p className="mt-3 min-h-[2.6rem] text-[12px] leading-[1.35rem] text-zinc-400 line-clamp-2">
            {getLoc(product, 'shortDesc')}
          </p>

          {secondarySpecs.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {secondarySpecs.map((sp) => (
                <div key={sp.id} className="min-w-0 rounded-xl border border-white/[0.075] bg-white/[0.025] px-3 py-2.5">
                  <div className="truncate text-[8px] font-bold uppercase tracking-[.13em] text-zinc-500">{getLoc(sp, 'key')}</div>
                  <div className="mt-1 truncate text-[11px] font-bold text-zinc-200">{getLoc(sp, 'value')}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-white/[0.08] pt-5">
          <div className="flex min-h-[46px] items-end justify-between gap-4">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[.16em] text-zinc-500">
                {language === 'ru' ? 'Стоимость' : 'Narxi'}
              </div>
              <div className="mt-1 text-[1.05rem] font-black tracking-[-0.02em] text-[#F89A4C] sm:text-[1.12rem]">
                {formatPrice(product.priceUZS)}
              </div>
            </div>
            <div className="hidden h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-[#08B4A5] transition-all duration-300 group-hover:grid group-hover:border-[#08B4A5]/35 group-hover:bg-[#08B4A5]/[0.08]">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[.82fr_1.18fr] gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate(`/product/${product.slug}`)}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.025] px-3 text-[9px] font-extrabold uppercase tracking-[.12em] text-zinc-300 transition-all hover:border-[#08B4A5]/40 hover:bg-[#08B4A5]/5 hover:text-white"
            >
              <span>{language === 'ru' ? 'Подробнее' : 'Batafsil'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onOpenLead(product)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#08B4A5,#078F84)] px-3 text-[9px] font-extrabold uppercase tracking-[.1em] text-white shadow-[0_10px_26px_rgba(8,180,165,.20)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(8,180,165,.28)]"
              id={`btn-buy-${product.id}`}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{language === 'ru' ? 'Оставить заявку' : 'So‘rov yuborish'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
