import React from 'react';
import { Plus, Check } from 'lucide-react';
import { Product } from '@tanso/shared/types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

const formatPrice = (product: Product) => {
  if (product.priceUZS) return `${product.priceUZS.toLocaleString('ru-RU')} so'm`;
  if (product.priceUSD) return `$${product.priceUSD.toLocaleString('en-US')}`;
  return null;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpen }) => {
  const { addToCart, getQty } = useCart();
  const qty = getQty(product.id);
  const price = formatPrice(product);

  return (
    <div className="card-interactive overflow-hidden flex flex-col">
      <button onClick={() => onOpen(product)} className="block w-full text-left">
        <div className="aspect-square bg-[var(--teal-tint)] flex items-center justify-center overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.titleUz}
              className="w-full h-full object-contain p-3"
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
            />
          ) : (
            <div className="w-10 h-10 rounded-md bg-[var(--surface)]" />
          )}
        </div>
      </button>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <button onClick={() => onOpen(product)} className="text-left">
          <p className="text-sm font-bold text-[var(--ink)] leading-snug line-clamp-2">{product.titleUz}</p>
        </button>

        {!product.inStock && (
          <span className="badge" style={{ color: 'var(--danger)', borderColor: 'rgba(179,67,47,.3)', background: 'var(--danger-tint)', alignSelf: 'flex-start' }}>
            Tugagan
          </span>
        )}

        <div className="mt-auto flex items-center justify-between gap-2">
          {price ? (
            <span className="font-mono-num font-extrabold text-[var(--ink)] text-sm">{price}</span>
          ) : (
            <span className="text-xs text-[var(--muted)]">Narx so'rov bo'yicha</span>
          )}

          {product.inStock && (
            <button
              onClick={() => addToCart(product.id, 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
              style={{ background: qty > 0 ? 'var(--teal)' : 'var(--teal-tint)', color: qty > 0 ? '#fff' : 'var(--teal-dark)' }}
              aria-label="Savatga qo'shish"
            >
              {qty > 0 ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
