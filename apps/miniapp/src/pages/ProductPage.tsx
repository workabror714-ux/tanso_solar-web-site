import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { Product } from '@tanso/shared/types';
import { useMiniData } from '../context/MiniDataContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onGoToCart: () => void;
}

const formatPrice = (product: Product) => {
  if (product.priceUZS) return `${product.priceUZS.toLocaleString('ru-RU')} so'm`;
  if (product.priceUSD) return `$${product.priceUSD.toLocaleString('en-US')}`;
  return null;
};

export const ProductPage: React.FC<ProductPageProps> = ({ product, onBack, onGoToCart }) => {
  const { categories } = useMiniData();
  const { addToCart, getQty, updateQty } = useCart();
  const { t, getLoc } = useLanguage();
  const [activeImg, setActiveImg] = useState(0);
  const qty = getQty(product.id);
  const price = formatPrice(product);
  const category = categories.find((c) => c.id === product.categoryId);
  const title = getLoc(product, 'title');
  const shortDesc = getLoc(product, 'shortDesc');

  return (
    // No BottomNav is rendered on this screen, and the "Add to cart" action
    // now lives in the normal document flow (below) instead of a fixed
    // overlay, so nothing here needs to reserve space for either.
    <div className="pb-8" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="sticky top-0 z-30 bg-[var(--paper)]/95 backdrop-blur border-b border-[var(--border)] px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--border)]">
          <ArrowLeft className="w-4 h-4 text-[var(--ink)]" />
        </button>
        <p className="text-sm font-bold text-[var(--ink)] truncate">{title}</p>
      </div>

      <div className="aspect-square bg-[var(--teal-tint)] flex items-center justify-center">
        {product.images?.[activeImg] ? (
          <img src={product.images[activeImg]} alt={title} className="w-full h-full object-contain p-6" />
        ) : null}
      </div>

      {product.images && product.images.length > 1 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className="w-14 h-14 shrink-0 rounded-lg overflow-hidden border-2"
              style={{ borderColor: i === activeImg ? 'var(--teal)' : 'var(--border)' }}
            >
              <img src={img} alt="" className="w-full h-full object-contain bg-[var(--teal-tint)]" />
            </button>
          ))}
        </div>
      )}

      <div className="px-4 pt-2">
        {category && <span className="badge badge-teal mb-2">{getLoc(category, 'name')}</span>}
        <h1 className="text-xl font-extrabold text-[var(--ink)] leading-tight mb-2">{title}</h1>

        <div className="flex items-center justify-between mb-4">
          {price ? (
            <span className="font-mono-num font-extrabold text-2xl text-[var(--ink)]">{price}</span>
          ) : (
            <span className="text-sm text-[var(--muted)]">{t('priceOnRequest')}</span>
          )}
          {product.inStock ? (
            <span className="badge badge-teal">{t('inStock')}</span>
          ) : (
            <span className="badge" style={{ color: 'var(--danger)', borderColor: 'rgba(179,67,47,.3)', background: 'var(--danger-tint)' }}>{t('outOfStock')}</span>
          )}
        </div>

        {shortDesc && (
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">{shortDesc}</p>
        )}

        {product.specs?.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">{t('specifications')}</p>
            <div className="card divide-y divide-[var(--border)] overflow-hidden">
              {product.specs.map((spec) => (
                <div key={spec.id} className="flex items-center justify-between px-3.5 py-2.5 text-sm">
                  <span className="text-[var(--muted)]">{getLoc(spec, 'key')}</span>
                  <span className="font-semibold text-[var(--ink)] text-right ml-3">{getLoc(spec, 'value')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.inStock && (
          <div className="flex items-center gap-3">
            {qty === 0 ? (
              <button onClick={() => addToCart(product.id, 1)} className="btn-primary flex-1">
                <ShoppingCart className="w-4 h-4" />
                <span>{t('addToCart')}</span>
              </button>
            ) : (
              <>
                <div className="flex items-center gap-1 bg-[var(--teal-tint)] rounded-lg p-1">
                  <button onClick={() => updateQty(product.id, qty - 1)} className="w-8 h-8 rounded-md bg-[var(--surface)] flex items-center justify-center">
                    <Minus className="w-3.5 h-3.5 text-[var(--teal-dark)]" />
                  </button>
                  <span className="w-8 text-center font-mono-num font-bold text-sm text-[var(--ink)]">{qty}</span>
                  <button onClick={() => updateQty(product.id, qty + 1)} className="w-8 h-8 rounded-md bg-[var(--surface)] flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5 text-[var(--teal-dark)]" />
                  </button>
                </div>
                <button onClick={onGoToCart} className="btn-primary flex-1">
                  <Check className="w-4 h-4" />
                  <span>{t('goToCart')}</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
