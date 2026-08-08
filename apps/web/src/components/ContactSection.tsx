import React, { useState } from 'react';
import { Send, Phone, User, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { createLead, settings } = useData();
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
    const res = await createLead({ type: 'consultation', fullName, phone, source: window.location.pathname + '#consultation-form' });
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
    <section className="py-20 sm:py-24 bg-[#0D1514] text-white relative overflow-hidden" id="consultation">
      <div className="absolute -top-36 right-0 w-[420px] h-[420px] rounded-full bg-[#08B4A5]/12 blur-[100px]" />
      <div className="absolute -bottom-48 left-0 w-[360px] h-[360px] rounded-full bg-[#F58A36]/7 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.018))] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,.24)]">
          <div className="grid lg:grid-cols-[1.05fr_.95fr]">
            <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              <div className="section-kicker">{language === 'ru' ? 'КОНСУЛЬТАЦИЯ' : 'KONSULTATSIYA'}</div>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-[1.04] text-white">
                {language === 'ru' ? 'Подберем подходящую систему TANSO' : 'Sizga mos TANSO tizimini tanlaymiz'}
              </h2>
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-zinc-400">
                {language === 'ru'
                  ? 'Оставьте имя и номер телефона. Специалист свяжется с вами и ответит на вопросы по модели, объему и типу системы.'
                  : 'Ism va telefon raqamingizni qoldiring. Mutaxassis model, hajm va tizim turi bo‘yicha savollaringizga javob beradi.'}
              </p>

              {settings.phone1 && (
                <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-white hover:text-[#25D4C4] transition-colors w-fit">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#08B4A5]/12 border border-[#08B4A5]/20"><Phone className="w-4 h-4 text-[#08B4A5]" /></span>
                  <span>{settings.phone1}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#F58A36]" />
                </a>
              )}
            </div>

            <div className="p-5 sm:p-7 lg:p-8 bg-[#09100F]/55 border-t lg:border-t-0 lg:border-l border-white/8">
              <div className="h-full rounded-2xl border border-white/9 bg-[#0D1514]/80 p-6 sm:p-8 flex flex-col justify-center">
                {isSuccess ? (
                  <div className="py-8 text-center space-y-3">
                    <span className="mx-auto grid place-items-center w-14 h-14 rounded-2xl bg-[#08B4A5]/12 border border-[#08B4A5]/20"><CheckCircle2 className="w-7 h-7 text-[#08B4A5]" /></span>
                    <h4 className="text-xl font-extrabold text-white">{t('successTitle')}</h4>
                    <p className="text-sm text-zinc-400">{t('successMsg')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" id="consultation-form">
                    {error && <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs">{error}</div>}

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[.16em] text-zinc-500 mb-2">{t('fullName')} *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={language === 'ru' ? 'Ваше имя' : 'Ism va familiya'} className="w-full pl-10 pr-4 py-3.5 text-sm rounded-xl bg-white/[0.035] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#08B4A5]/70 focus:ring-4 focus:ring-[#08B4A5]/5 transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[.16em] text-zinc-500 mb-2">{t('phoneNumber')} *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 90 123 45 67" className="w-full pl-10 pr-4 py-3.5 text-sm rounded-xl bg-white/[0.035] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#08B4A5]/70 focus:ring-4 focus:ring-[#08B4A5]/5 transition-all" />
                      </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-tanso-primary w-full mt-2 disabled:opacity-50" id="btn-submit-contact-form">
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /><span>{t('callMe')}</span></>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
