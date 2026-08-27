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
      className="card-interactive group relative flex h-full min-h-[560px] flex-col overflow-hidden"
    >
      <button
        type="button"
        onClick={() => onNavigate(`/product/${product.slug}`)}
        className="relative block h-[260px] w-full overflow-hidden border-b border-[var(--border)] bg-[var(--teal-tint)] text-left"
        aria-label={getLoc(product, 'title')}
      >
        <img
          src={product.images?.[0] || '/images/products/tanso-bosimsiz-main.png'}
          alt={getLoc(product, 'title')}
          className="relative z-[1] h-full w-full object-contain object-center p-5 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute left-4 top-4 z-10 max-w-[72%]">
          <span className="badge bg-[var(--surface)]">
            {category ? getLoc(category, 'name') : 'Tanso Solar'}
          </span>
        </div>

        <div className="absolute right-4 top-4 z-10">
          <span className={`badge ${product.inStock ? 'badge-teal' : 'badge-amber'}`}>
            {product.inStock
              ? (language === 'ru' ? 'В наличии' : 'Sotuvda')
              : (language === 'ru' ? 'Под заказ' : 'Buyurtmaga')}
          </span>
        </div>

        {primarySpec?.valueUz && (
          <div className="absolute bottom-4 left-4 z-10">
            <span className="inline-flex items-center rounded-md bg-[var(--ink)] px-3 py-1.5 text-[11px] font-mono-num font-bold text-white">
              {getLoc(primarySpec, 'value')}
            </span>
          </div>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex-1">
          <h3
            onClick={() => onNavigate(`/product/${product.slug}`)}
            className="min-h-[3.25rem] cursor-pointer text-[1.02rem] font-bold leading-[1.5rem] tracking-[-0.01em] text-[var(--ink)] transition-colors group-hover:text-[var(--teal-dark)] line-clamp-2"
          >
            {getLoc(product, 'title')}
          </h3>

          <p className="mt-3 min-h-[2.6rem] text-[12px] leading-[1.35rem] text-[var(--muted)] line-clamp-2">
            {getLoc(product, 'shortDesc')}
          </p>

          {secondarySpecs.length > 0 && (
            <div className="mt-4">
              {secondarySpecs.map((sp) => (
                <div key={sp.id} className="spec-row !py-2">
                  <span className="spec-row-label truncate">{getLoc(sp, 'key')}</span>
                  <span className="spec-row-value truncate">{getLoc(sp, 'value')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-[var(--border)] pt-5">
          <div className="flex min-h-[46px] items-end justify-between gap-4">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[.16em] text-[var(--muted)]">
                {language === 'ru' ? 'Стоимость' : 'Narxi'}
              </div>
              <div className="mt-1 font-mono-num text-[1.02rem] font-bold text-[var(--amber)] sm:text-[1.08rem]">
                {formatPrice(product.priceUZS)}
              </div>
            </div>
            <div className="hidden h-8 w-8 shrink-0 place-items-center rounded-md border border-[var(--border)] text-[var(--teal-dark)] transition-all duration-300 group-hover:grid group-hover:border-[var(--teal)] group-hover:bg-[var(--teal-tint)]">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[.82fr_1.18fr] gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate(`/product/${product.slug}`)}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-[var(--border)] px-3 text-[10px] font-bold uppercase tracking-[.08em] text-[var(--muted)] transition-all hover:border-[var(--teal)] hover:text-[var(--ink)]"
            >
              <span>{language === 'ru' ? 'Подробнее' : 'Batafsil'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onOpenLead(product)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--teal)] px-3 text-[10px] font-bold uppercase tracking-[.06em] text-white transition-all hover:bg-[var(--teal-dark)]"
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
