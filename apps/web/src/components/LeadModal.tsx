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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1514]/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#151D1C] rounded-2xl shadow-2xl border border-[#222E2B] overflow-hidden text-white"
        id="lead-modal-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222E2B] bg-[#0F1514]/50">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#04AF9D]">
              TANSO SOLAR • UZBEKISTAN
            </span>
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              {product ? t('buyNow') : t('consultation')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#222E2B] text-zinc-400 hover:text-white transition-colors"
            id="btn-close-lead-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#04AF9D]/20 text-[#04AF9D] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white uppercase">
                {t('successTitle')}
              </h4>
              <p className="text-sm text-zinc-300 max-w-sm mx-auto">
                {t('successMsg')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product summary pill if selected */}
              {product && (
                <div className="p-3 bg-[#0F1514] border border-[#04AF9D]/30 rounded-xl flex items-center gap-3">
                  <img 
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'} 
                    alt={getLoc(product, 'title')} 
                    className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-[#04AF9D] font-bold uppercase tracking-wider">
                      {categoryName || 'Tanso Solar'}
                    </p>
                    <p className="text-sm font-bold truncate text-white">
                      {getLoc(product, 'title')}
                    </p>
                    <p className="text-xs text-[#F6852D] font-bold mt-0.5">
                      {product.priceUSD ? `$${product.priceUSD}` : (product.priceUZS ? `${product.priceUZS.toLocaleString()} UZS` : 'TANSO SOLAR')}
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs rounded-lg">
                  {errorMessage}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                  {t('fullName')} *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'ru' ? 'Например: Алишер Усманов' : 'Masalan: Alisher Usmanov'}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#0F1514] border border-[#222E2B] rounded-xl text-white focus:outline-none focus:border-[#04AF9D] transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                  {t('phoneNumber')} *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#0F1514] border border-[#222E2B] rounded-xl text-white focus:outline-none focus:border-[#04AF9D] transition-all"
                  />
                </div>
              </div>

              {/* Quantity (if product selected) */}
              {product && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                    {t('quantity')}
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#0F1514] border border-[#222E2B] rounded-xl text-white focus:outline-none focus:border-[#04AF9D] transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Comment */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                  {t('comment')}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={language === 'ru' ? 'Вопросы по замеру, доставке или монтажу...' : 'Obyekt manzili, montaj vaqti yoki qo‘shimcha savollar...'}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#0F1514] border border-[#222E2B] rounded-xl text-white focus:outline-none focus:border-[#04AF9D] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Security info note */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#04AF9D] flex-shrink-0" />
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
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#04AF9D] hover:bg-[#038a7c] text-white font-bold text-sm shadow-lg shadow-[#04AF9D]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 uppercase tracking-wider"
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

