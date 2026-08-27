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
    <section id="contact-home" className="scroll-mt-28 py-20 sm:py-24 bg-[var(--ink)] text-white relative overflow-hidden">
      <div className="bg-dot-grid absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative tanso-container">
        <div className="rounded-[16px] border border-white/10 overflow-hidden">
          <div className="grid lg:grid-cols-[1.05fr_.95fr]">
            <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              <div className="kicker-dark">{language === 'ru' ? 'КОНСУЛЬТАЦИЯ' : 'KONSULTATSIYA'}</div>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.02em] leading-[1.08] text-white">
                {language === 'ru' ? 'Подберем подходящую систему TANSO' : 'Sizga mos TANSO tizimini tanlaymiz'}
              </h2>
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[var(--muted-dark)]">
                {language === 'ru'
                  ? 'Оставьте имя и номер телефона. Специалист свяжется с вами и ответит на вопросы по модели, объему и типу системы.'
                  : 'Ism va telefon raqamingizni qoldiring. Mutaxassis model, hajm va tizim turi bo‘yicha savollaringizga javob beradi.'}
              </p>

              {settings.phone1 && (
                <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-white hover:text-[#7FD8C7] transition-colors w-fit">
                  <span className="grid place-items-center w-10 h-10 rounded-md border border-white/12"><Phone className="w-4 h-4 text-[var(--teal)]" /></span>
                  <span className="font-mono-num">{settings.phone1}</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--amber)]" />
                </a>
              )}
            </div>

            <div className="p-5 sm:p-7 lg:p-8 border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="h-full rounded-[14px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 flex flex-col justify-center">
                {isSuccess ? (
                  <div className="py-8 text-center space-y-3">
                    <span className="mx-auto grid place-items-center w-14 h-14 rounded-full border border-white/12 bg-[var(--teal)]/15"><CheckCircle2 className="w-7 h-7 text-[var(--teal)]" /></span>
                    <h4 className="text-xl font-extrabold text-white">{t('successTitle')}</h4>
                    <p className="text-sm text-[var(--muted-dark)]">{t('successMsg')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" id="consultation-form">
                    {error && <div className="p-3 rounded-md bg-[var(--danger)]/15 border border-[var(--danger)]/40 text-[#F3B7A8] text-xs">{error}</div>}

                    <div>
                      <label className="field-label !text-[var(--muted-dark)]">{t('fullName')} *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-dark)]" />
                        <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={language === 'ru' ? 'Ваше имя' : 'Ism va familiya'} className="field-input-dark" />
                      </div>
                    </div>

                    <div>
                      <label className="field-label !text-[var(--muted-dark)]">{t('phoneNumber')} *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-dark)]" />
                        <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 90 123 45 67" className="field-input-dark" />
                      </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2 disabled:opacity-50" id="btn-submit-contact-form">
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
