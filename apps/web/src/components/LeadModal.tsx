import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Phone, User, FileText, Hash } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Product } from '../types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  defaultComment?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, product, defaultComment }) => {
  const { t, language, getLoc } = useLanguage();
  const { createLead, categories } = useData();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState(defaultComment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const categoryName = product 
    ? categories.find(c => c.id === product.categoryId)?.[language === 'ru' ? 'nameRu' : 'nameUz']
    : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage(language === 'ru' ? 'Введите ваше имя' : 'Ism va familiyangizni kiriting');
      return;
    }

    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage(language === 'ru' ? 'Введите корректный номер телефона' : 'To‘g‘ri telefon raqamingizni kiriting');
      return;
    }

    setIsSubmitting(true);

    const productName = product ? (getLoc(product, 'title') || getLoc(product, 'name')) : undefined;
    const capacityOrModel = product?.specs?.[0] ? `${getLoc(product.specs[0], 'key')}: ${getLoc(product.specs[0], 'value')}` : '';
    const formattedPrice = product?.priceUZS ? `${product.priceUZS.toLocaleString()} UZS` : '';
    
    const metaDetails = [
      capacityOrModel && `[Model/Cap: ${capacityOrModel}]`,
      formattedPrice && `[Price: ${formattedPrice}]`,
      comment
    ].filter(Boolean).join(' ');

    const result = await createLead({
      type: product ? 'product_request' : 'consultation',
      fullName,
      phone,
      productId: product?.id,
      productName,
      category: categoryName,
      quantity,
      comment: metaDetails,
      source: window.location.href || window.location.pathname
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        // Reset form after delay
        setFullName('');
        setPhone('');
        setQuantity(1);
        setComment('');
        setIsSuccess(false);
        onClose();
      }, 3000);
    } else {
      setErrorMessage(result.error || (language === 'ru' ? 'Ошибка отправки' : 'Yuborishda xatolik yuz berdi'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[var(--ink)] rounded-[14px] shadow-2xl border border-white/10 overflow-hidden text-white"
        id="lead-modal-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#7FD8C7]">
              TANSO SOLAR • UZBEKISTAN
            </span>
            <h3 className="text-lg font-bold text-white">
              {product ? t('buyNow') : t('consultation')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[var(--muted-dark)] hover:text-white transition-colors"
            id="btn-close-lead-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[var(--teal)]/15 text-[var(--teal)] rounded-full flex items-center justify-center border border-white/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white">
                {t('successTitle')}
              </h4>
              <p className="text-sm text-[var(--muted-dark)] max-w-sm mx-auto">
                {t('successMsg')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product summary pill if selected */}
              {product && (
                <div className="p-3 bg-white/[0.04] border border-white/10 rounded-md flex items-center gap-3">
                  <img
                    src={product.images?.[0] || '/images/products/tanso-bosimsiz-main.png'}
                    alt={getLoc(product, 'title')}
                    className="w-14 h-14 object-cover rounded-md flex-shrink-0 bg-white"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-[#7FD8C7] font-bold uppercase tracking-wider">
                      {categoryName || 'Tanso Solar'}
                    </p>
                    <p className="text-sm font-bold truncate text-white">
                      {getLoc(product, 'title')}
                    </p>
                    <p className="text-xs text-[var(--amber)] font-mono-num font-bold mt-0.5">
                      {product.priceUSD ? `$${product.priceUSD}` : (product.priceUZS ? `${product.priceUZS.toLocaleString()} UZS` : 'TANSO SOLAR')}
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-[var(--danger)]/15 border border-[var(--danger)]/40 text-[#F3B7A8] text-xs rounded-md">
                  {errorMessage}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="field-label !text-[var(--muted-dark)]">
                  {t('fullName')} *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-dark)]" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'ru' ? 'Например: Алишер Усманов' : 'Masalan: Alisher Usmanov'}
                    className="field-input-dark"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="field-label !text-[var(--muted-dark)]">
                  {t('phoneNumber')} *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-dark)]" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="field-input-dark"
                  />
                </div>
              </div>

              {/* Quantity (if product selected) */}
              {product && (
                <div>
                  <label className="field-label !text-[var(--muted-dark)]">
                    {t('quantity')}
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-dark)]" />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="field-input-dark"
                    />
                  </div>
                </div>
              )}

              {/* Comment */}
              <div>
                <label className="field-label !text-[var(--muted-dark)]">
                  {t('comment')}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3 w-4 h-4 text-[var(--muted-dark)]" />
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={language === 'ru' ? 'Вопросы по замеру, доставке или монтажу...' : 'Obyekt manzili, montaj vaqti yoki qo‘shimcha savollar...'}
                    className="field-input-dark resize-none"
                  />
                </div>
              </div>

              {/* Security info note */}
              <div className="flex items-center gap-2 text-xs text-[var(--muted-dark)] pt-1">
                <ShieldCheck className="w-4 h-4 text-[var(--teal)] flex-shrink-0" />
                <span>
                  {language === 'ru'
                    ? 'Ваши данные защищены и передаются напрямую инженерам Tanso Solar'
                    : 'Ma’lumotlaringiz maxfiy saqlanadi va bevosita Tanso Solar muhandislariga yuboriladi'}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full mt-2 !min-h-[52px] disabled:opacity-50"
                id="btn-submit-lead"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('sendRequest')}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

