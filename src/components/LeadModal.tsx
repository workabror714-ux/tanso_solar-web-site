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
  const { t, language } = useLanguage();
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

    const result = await createLead({
      type: product ? 'product_request' : 'consultation',
      fullName,
      phone,
      productId: product?.id,
      productName: product ? (language === 'ru' ? product.nameRu : product.nameUz) : undefined,
      category: categoryName,
      quantity,
      comment,
      source: window.location.pathname
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden text-zinc-900 dark:text-zinc-100"
        id="lead-modal-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
              TANSO SOLAR • UZBEKISTAN
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {product ? t('buyNow') : t('consultation')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            id="btn-close-lead-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {t('successTitle')}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                {t('successMsg')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product summary pill if selected */}
              {product && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-3">
                  <img 
                    src={product.images[0]} 
                    alt={product.nameUz} 
                    className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                      {categoryName || 'Tanso Solar'}
                    </p>
                    <p className="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100">
                      {language === 'ru' ? product.nameRu : product.nameUz}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {product.capacity} • {product.power}
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs rounded-lg">
                  {errorMessage}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400 mb-1.5">
                  {t('fullName')} *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'ru' ? 'Например: Алишер Усманов' : 'Masalan: Alisher Usmanov'}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400 mb-1.5">
                  {t('phoneNumber')} *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Quantity (if product selected) */}
              {product && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400 mb-1.5">
                    {t('quantity')}
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Comment */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400 mb-1.5">
                  {t('comment')}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={language === 'ru' ? 'Вопросы по замеру, доставке или монтажу...' : 'Obyekt manzili, montaj vaqti yoki qo‘shimcha savollar...'}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Security info note */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
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
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
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
