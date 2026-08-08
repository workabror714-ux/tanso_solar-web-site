import React from 'react';
import { ArrowRight, Phone, Layers3, PackageCheck, Droplets } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface HeroProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenConsultation }) => {
  const { language, t, getLoc } = useLanguage();
  const { banners, products, categories } = useData();
  const banner = banners.find((b) => b.active) || banners[0];
  const productCount = products.filter((p) => p.active !== false).length;
  const categoryCount = categories.filter((c) => c.active).length;

  const title = getLoc(banner, 'title') || (language === 'ru'
    ? 'Горячая вода от солнца — каждый день'
    : 'Quyoshdan issiq suv — har kuni');
  const subtitle = getLoc(banner, 'subtitle') || (language === 'ru'
    ? 'Солнечные водонагреватели TANSO для дома и бизнеса: напорные, безнапорные и SPLIT-системы.'
    : 'Uy va biznes uchun TANSO quyosh suv isitgichlari: bosimli, bosimsiz va SPLIT tizimlar.');

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0D1514] border-b border-white/8 pt-24 lg:pt-20">
      <div className="absolute inset-0">
        {banner?.bgImageUrl && (
          <img
            src={banner.bgImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.12] scale-105"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_46%,rgba(8,180,165,.22),transparent_27%),radial-gradient(circle_at_60%_15%,rgba(245,138,54,.08),transparent_22%),linear-gradient(90deg,#0D1514_0%,#0D1514_43%,rgba(13,21,20,.84)_66%,rgba(13,21,20,.96)_100%)]" />
        <div className="hero-grid absolute inset-0" />
        <div className="hero-noise absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-[1.02fr_.98fr] items-center gap-10 lg:gap-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
              className="section-kicker mb-5"
            >
              TANSO • UZBEKISTAN
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: .08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.55rem,6vw,5.2rem)] font-black leading-[.98] tracking-[-0.045em] text-white"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-zinc-300"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <button onClick={() => onNavigate(banner?.buttonLink || '/catalog')} className="btn-tanso-primary group">
                <span>{getLoc(banner, 'buttonText') || t('viewProducts')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={onOpenConsultation} className="btn-tanso-secondary">
                <Phone className="w-4 h-4 text-[#F58A36]" />
                <span>{t('freeConsultation')}</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: .8, delay: .36 }}
              className="mt-9 grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl"
            >
              <div className="tanso-card rounded-xl px-3 sm:px-4 py-3.5">
                <PackageCheck className="w-4 h-4 text-[#08B4A5] mb-2" />
                <div className="text-lg sm:text-xl font-black text-white">{productCount}</div>
                <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500">
                  {language === 'ru' ? 'моделей' : 'model'}
                </div>
              </div>
              <div className="tanso-card rounded-xl px-3 sm:px-4 py-3.5">
                <Layers3 className="w-4 h-4 text-[#F58A36] mb-2" />
                <div className="text-lg sm:text-xl font-black text-white">{categoryCount}</div>
                <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500">
                  {language === 'ru' ? 'категории' : 'kategoriya'}
                </div>
              </div>
              <div className="tanso-card rounded-xl px-3 sm:px-4 py-3.5">
                <Droplets className="w-4 h-4 text-[#08B4A5] mb-2" />
                <div className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                  {language === 'ru' ? 'Напорные / безнапорные' : 'Bosimli / bosimsiz'}
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500">TANSO</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 55, scale: .94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: .9, delay: .12, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[390px] sm:min-h-[480px] lg:min-h-[620px] flex items-center justify-center"
          >
            <div className="absolute w-[75%] aspect-square rounded-full bg-[#08B4A5]/20 blur-[90px] animate-orbit-glow" />
            <div className="absolute w-[58%] aspect-square rounded-full border border-[#08B4A5]/15" />
            <div className="absolute w-[78%] aspect-square rounded-full border border-white/[0.05]" />

            <div className="relative z-10 w-[82%] sm:w-[76%] lg:w-[92%] animate-soft-float drop-shadow-[0_42px_55px_rgba(0,0,0,.48)]">
              <img
                src="/images/products/tanso-bosimsiz-main.png"
                alt="TANSO quyosh suv isitgichi"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="absolute right-0 sm:right-5 lg:right-0 bottom-12 sm:bottom-16 tanso-glass rounded-2xl px-4 py-3 shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F58A36] shadow-[0_0_0_6px_rgba(245,138,54,.1)]" />
                <div>
                  <p className="text-[9px] uppercase tracking-[.16em] text-zinc-500">TANSO</p>
                  <p className="text-[11px] sm:text-xs font-extrabold text-white">
                    {language === 'ru' ? 'Солнечные водонагреватели' : 'Quyosh suv isitgichlari'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#08B4A5]/60 to-transparent" />
    </section>
  );
};
