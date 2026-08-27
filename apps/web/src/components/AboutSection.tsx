import React from 'react';
import { CheckCircle, ArrowRight, Droplets } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutSectionProps {
  onNavigate: (path: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <section id="about-home" className="scroll-mt-28 py-20 sm:py-24 bg-[var(--paper)] text-[var(--ink)]">
      <div className="tanso-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative pb-8 sm:pb-12">
            <div className="relative z-10 overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)]">
              <img
                src="/images/products/tanso-showroom-wide.png"
                alt="TANSO quyosh suv isitgichi"
                className="w-full h-[420px] sm:h-[500px] object-cover"
              />
            </div>

            <div className="absolute -bottom-1 right-3 sm:right-8 z-20 w-[48%] rounded-[14px] border-[6px] border-[var(--paper)] hidden sm:block overflow-hidden bg-[var(--surface)] shadow-[0_18px_45px_rgba(16,33,27,.14)]">
              <img
                src="/images/products/tanso-bosimsiz-main.png"
                alt="TANSO mahsuloti"
                className="w-full h-[210px] object-contain p-4"
              />
            </div>

            <div className="absolute top-5 left-5 z-20 card px-4 py-3 flex items-center gap-3 shadow-[0_12px_30px_rgba(16,33,27,.1)]">
              <div className="grid place-items-center w-10 h-10 rounded-md bg-[var(--teal)] text-white">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[.16em] text-[var(--muted)]">TANSO SYSTEMS</p>
                <p className="text-xs font-bold text-[var(--ink)]">Bosimli • Bosimsiz • SPLIT</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="kicker">
              {language === 'ru' ? 'О TANSO' : 'TANSO HAQIDA'}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.02em] leading-[1.1] text-[var(--ink)]">
              {language === 'ru'
                ? 'Солнечные решения для горячей воды дома и в бизнесе'
                : 'Uy va biznes uchun quyoshdan issiq suv yechimlari'}
            </h2>

            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-2xl">
              {language === 'ru'
                ? 'TANSO предлагает солнечные водонагреватели напорного и безнапорного типа, а также SPLIT-коллекторы. Подберем подходящую систему под объект и поможем с консультацией и сервисом.'
                : 'TANSO bosimli va bosimsiz quyosh suv isitgichlari hamda SPLIT kollektorlarini taklif qiladi. Obyektingiz uchun mos tizimni tanlash, konsultatsiya va servis bo‘yicha yordam beramiz.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                language === 'ru' ? 'Подбор системы под потребность' : 'Ehtiyojga mos tizim tanlash',
                language === 'ru' ? 'Напорные и безнапорные модели' : 'Bosimli va bosimsiz modellar',
                language === 'ru' ? 'SPLIT-коллекторы' : 'SPLIT kollektorlar',
                language === 'ru' ? 'Консультация и сервис' : 'Konsultatsiya va servis',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 rounded-md bg-[var(--surface)] border border-[var(--border)] px-4 py-3">
                  <CheckCircle className="w-4 h-4 text-[var(--teal)] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-[var(--ink)]">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button onClick={() => onNavigate('/about')} className="btn-primary group">
                <span>{language === 'ru' ? 'Подробнее о TANSO' : 'TANSO haqida ko‘proq'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
