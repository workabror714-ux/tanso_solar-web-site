import React, { useMemo, useState } from 'react';
import { Minus, Plus, Trash2, ShoppingCart, CheckCircle2, User, Phone as PhoneIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMiniData } from '../context/MiniDataContext';
import { useTelegram } from '../context/TelegramContext';
import { useLanguage } from '../context/LanguageContext';
import { saveStoredOrder } from '../utils/orders';

interface CartPageProps {
  onBrowse: () => void;
}

const formatPrice = (uzs?: number, usd?: number) => {
  if (uzs) return `${uzs.toLocaleString('ru-RU')} so'm`;
  if (usd) return `$${usd.toLocaleString('en-US')}`;
  return null;
};

export const CartPage: React.FC<CartPageProps> = ({ onBrowse }) => {
  const { items, updateQty, removeFromCart, clearCart } = useCart();
  const { products, createLead } = useMiniData();
  const { user } = useTelegram();
  const { t, getLoc } = useLanguage();

  const [fullName, setFullName] = useState(user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : '');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const lines = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { item, product } : null;
      })
      .filter((x): x is { item: typeof items[0]; product: (typeof products)[0] } => !!x);
  }, [items, products]);

  const totalUZS = lines.reduce((sum, { item, product }) => sum + (product.priceUZS || 0) * item.qty, 0);

  if (isSuccess) {
    return (
      <div className="px-4 pt-16 pb-24 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--teal-tint)] flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-[var(--teal-dark)]" />
        </div>
        <h2 className="text-lg font-extrabold text-[var(--ink)] mb-2">{t('orderReceivedTitle')}</h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 max-w-xs">
          {t('orderReceivedMsg', { phone: `+998${phoneDigits}` })}
        </p>
        <button onClick={onBrowse} className="btn-primary">{t('backToCatalog')}</button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="px-4 pt-16 pb-24 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--teal-tint)] flex items-center justify-center mb-4">
          <ShoppingCart className="w-7 h-7 text-[var(--teal-dark)]" />
        </div>
        <h2 className="text-base font-bold text-[var(--ink)] mb-1">{t('cartEmptyTitle')}</h2>
        <p className="text-sm text-[var(--muted)] mb-6">{t('cartEmptyMsg')}</p>
        <button onClick={onBrowse} className="btn-primary">{t('viewCatalog')}</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError(t('errFullName'));
      return;
    }
    if (phoneDigits.length !== 9) {
      setError(t('errPhone'));
      return;
    }

    setIsSubmitting(true);

    const itemsSummary = lines.map(({ item, product }) => `${getLoc(product, 'title')} x${item.qty}`).join(', ');
    const productNames = lines.map(({ product }) => getLoc(product, 'title')).join(', ');
    const totalQty = lines.reduce((sum, { item }) => sum + item.qty, 0);

    const result = await createLead({
      type: 'product_request',
      fullName: fullName.trim(),
      phone: `+998${phoneDigits}`,
      productName: productNames,
      quantity: totalQty,
      comment: [itemsSummary, comment.trim()].filter(Boolean).join(' — '),
      source: 'telegram-miniapp',
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || t('genericError'));
      return;
    }

    saveStoredOrder({
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      phone: `+998${phoneDigits}`,
      items: lines.map(({ item, product }) => ({ title: getLoc(product, 'title'), qty: item.qty })),
    });

    clearCart();
    setIsSuccess(true);
  };

  return (
    <div className="px-4 pt-4 pb-28">
      <h1 className="text-lg font-extrabold text-[var(--ink)] mb-4">{t('cart')}</h1>

      <div className="flex flex-col gap-2.5 mb-6">
        {lines.map(({ item, product }) => {
          const price = formatPrice(product.priceUZS, product.priceUSD);
          const title = getLoc(product, 'title');
          return (
            <div key={product.id} className="card-interactive p-3 flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg bg-[var(--teal-tint)] shrink-0 flex items-center justify-center overflow-hidden">
                {product.images?.[0] && <img src={product.images[0]} alt="" className="w-full h-full object-contain p-1.5" loading="lazy" decoding="async" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[var(--ink)] line-clamp-2 leading-snug mb-1">{title}</p>
                {price && <p className="font-mono-num text-xs font-semibold text-[var(--muted)]">{price}</p>}
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <button onClick={() => removeFromCart(product.id)} className="text-[var(--muted-dark)]">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1 bg-[var(--teal-tint)] rounded-md p-0.5">
                  <button onClick={() => updateQty(product.id, item.qty - 1)} className="w-6 h-6 rounded flex items-center justify-center bg-[var(--surface)]">
                    <Minus className="w-3 h-3 text-[var(--teal-dark)]" />
                  </button>
                  <span className="w-6 text-center font-mono-num font-bold text-xs">{item.qty}</span>
                  <button onClick={() => updateQty(product.id, item.qty + 1)} className="w-6 h-6 rounded flex items-center justify-center bg-[var(--surface)]">
                    <Plus className="w-3 h-3 text-[var(--teal-dark)]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalUZS > 0 && (
        <div className="flex items-center justify-between px-1 mb-5">
          <span className="text-sm text-[var(--muted)]">{t('estimatedTotal')}</span>
          <span className="font-mono-num font-extrabold text-[var(--ink)]">{totalUZS.toLocaleString('ru-RU')} so'm</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 flex flex-col gap-3">
        <p className="text-sm font-bold text-[var(--ink)] mb-1">{t('orderFormTitle')}</p>

        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-dark)]" />
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t('fullNamePlaceholder')}
            className="field-input !pl-10"
          />
        </div>

        <div className="relative">
          <PhoneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-dark)]" />
          <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm font-mono-num text-[var(--muted-dark)] pointer-events-none select-none">+998</span>
          <input
            type="tel"
            inputMode="numeric"
            value={phoneDigits}
            onChange={(e) => setPhoneDigits(e.target.value.replace(/\D/g, '').slice(0, 9))}
            placeholder="90 123 45 67"
            maxLength={9}
            className="field-input !pl-[4.75rem]"
          />
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('commentPlaceholder')}
          rows={2}
          className="field-input !pl-4 resize-none"
        />

        {error && <p className="text-xs font-semibold text-[var(--danger)]">{error}</p>}

        <button type="submit" disabled={isSubmitting} className="btn-primary mt-1 disabled:opacity-60">
          {isSubmitting ? t('sending') : t('placeOrder')}
        </button>
      </form>
    </div>
  );
};
