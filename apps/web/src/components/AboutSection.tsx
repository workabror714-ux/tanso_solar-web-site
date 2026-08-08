import React from 'react';
import { CheckCircle, ArrowRight, Droplets } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutSectionProps {
  onNavigate: (path: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <section className="py-20 sm:py-24 bg-[#F5F8F7] text-[#0E1715] relative overflow-hidden border-b border-[#DDE7E4]">
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#08B4A5]/8 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative pb-8 sm:pb-12">
            <div className="relative z-10 rounded-3xl border border-[#DDE7E4] shadow-[0_24px_70px_rgba(15,40,35,.14)] overflow-hidden bg-white">
              <img
                src="/images/products/tanso-showroom-wide.png"
                alt="TANSO quyosh suv isitgichi"
                className="w-full h-[420px] sm:h-[500px] object-cover"
              />
            </div>

            <div className="absolute -bottom-1 right-3 sm:right-8 z-20 w-[48%] rounded-2xl border-[6px] border-[#F5F8F7] shadow-2xl hidden sm:block overflow-hidden bg-white">
              <img
                src="/images/products/tanso-bosimsiz-main.png"
                alt="TANSO mahsuloti"
                className="w-full h-[210px] object-contain p-4"
              />
            </div>

            <div className="absolute top-5 left-5 z-20 tanso-glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
              <div className="grid place-items-center w-10 h-10 rounded-xl bg-[#08B4A5] text-white">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[.16em] text-zinc-400">TANSO SYSTEMS</p>
                <p className="text-xs font-extrabold text-white">Bosimli • Bosimsiz • SPLIT</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="section-kicker">
              {language === 'ru' ? 'О TANSO' : 'TANSO HAQIDA'}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] leading-[1.05] text-[#0E1715]">
              {language === 'ru'
                ? 'Солнечные решения для горячей воды дома и в бизнесе'
                : 'Uy va biznes uchun quyoshdan issiq suv yechimlari'}
            </h2>

            <p className="text-sm sm:text-base text-[#63716E] leading-relaxed max-w-2xl">
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
                <div key={item} className="flex items-start gap-2.5 rounded-xl bg-white border border-[#DDE7E4] px-4 py-3 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-[#08B4A5] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-[#21302D]">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button onClick={() => onNavigate('/about')} className="btn-tanso-primary group">
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
