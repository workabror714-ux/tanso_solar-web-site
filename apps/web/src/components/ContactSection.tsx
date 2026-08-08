import React, { useState } from 'react';
import { Send, Phone, User, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { createLead } = useData();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !phone.trim()) {
      setError(language === 'ru' ? 'Заполните имя и номер телефона' : 'Ism va telefon raqamingizni kiriting');
      return;
    }

    setIsSubmitting(true);
    const res = await createLead({
      type: 'consultation',
      fullName,
      phone,
      source: window.location.pathname + '#consultation-form'
    });
    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
      setFullName('');
      setPhone('');
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setError(res.error || 'Xatolik yuz berdi');
    }
  };

  return (
    <section className="py-20 bg-[#0F1514] text-white relative border-b border-[#222E2B]" id="consultation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative bg-[#151D1C] border border-[#222E2B] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Header info */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#04AF9D]/10 rounded-full border border-[#04AF9D]/20 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F6852D]" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#04AF9D]">
                  BEPUL KONSULTATSIYA
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase leading-tight">
                {t('contactHeading')}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg font-normal">
                {t('contactSubheading')}
              </p>

              <div className="pt-2 flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#04AF9D]" />
                  <span>{language === 'ru' ? 'Бесплатный выезд' : 'Bepul obyekt ko‘rigi'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#04AF9D]" />
                  <span>{language === 'ru' ? 'Расчет за 15 минут' : '15 daqiqada smeta'}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#0F1514] border border-[#222E2B] rounded-2xl p-6 sm:p-8 shadow-xl">
              {isSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#04AF9D] mx-auto" />
                  <h4 className="text-xl font-bold text-white uppercase">{t('successTitle')}</h4>
                  <p className="text-xs text-zinc-400 font-normal">{t('successMsg')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="consultation-form">
                  {error && (
                    <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
                      {t('fullName')} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={language === 'ru' ? 'Алишер Усманов' : 'Alisher Usmanov'}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-[#151D1C] border border-[#222E2B] rounded-xl text-white focus:outline-none focus:border-[#04AF9D] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
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
                        className="w-full pl-10 pr-4 py-3 text-sm bg-[#151D1C] border border-[#222E2B] rounded-xl text-white focus:outline-none focus:border-[#04AF9D] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#04AF9D] hover:bg-[#038a7c] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2 shadow-lg shadow-[#04AF9D]/20"
                    id="btn-submit-contact-form"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t('callMe')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

