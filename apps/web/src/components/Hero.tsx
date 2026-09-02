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
    <section id="home" className="scroll-mt-28 relative flex items-center overflow-hidden bg-[var(--ink)] pt-20 lg:pt-16">
      <div className="absolute inset-0">
        {banner?.bgImageUrl && (
          <img
            src={banner.bgImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink)_0%,var(--ink)_46%,rgba(16,33,27,.82)_70%,rgba(16,33,27,.95)_100%)]" />
        <div className="bg-line-grid-dark absolute inset-0 opacity-60" />
      </div>

      <div className="relative z-10 tanso-container w-full py-9 lg:py-12">
        <div className="grid lg:grid-cols-[1.02fr_.98fr] items-center gap-10 lg:gap-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
              className="kicker-dark mb-5"
            >
              TANSO • O‘ZBEKISTON
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: .08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.02em] text-white"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--muted-dark)]"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <button onClick={() => onNavigate(banner?.buttonLink || '/catalog')} className="btn-primary group">
                <span>{getLoc(banner, 'buttonText') || t('viewProducts')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={onOpenConsultation} className="btn-secondary-dark">
                <Phone className="w-4 h-4 text-[var(--amber)]" />
                <span>{t('freeConsultation')}</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: .8, delay: .36 }}
              className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl"
            >
              <div className="card-dark px-3 sm:px-4 py-2.5">
                <PackageCheck className="w-4 h-4 text-[var(--teal)] mb-1.5" />
                <div className="text-lg sm:text-xl font-mono-num font-bold text-white">{productCount}</div>
                <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--muted-dark)]">
                  {language === 'ru' ? 'моделей' : 'model'}
                </div>
              </div>
              <div className="card-dark px-3 sm:px-4 py-2.5">
                <Layers3 className="w-4 h-4 text-[var(--amber)] mb-1.5" />
                <div className="text-lg sm:text-xl font-mono-num font-bold text-white">{categoryCount}</div>
                <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--muted-dark)]">
                  {language === 'ru' ? 'категории' : 'kategoriya'}
                </div>
              </div>
              <div className="card-dark px-3 sm:px-4 py-2.5">
                <Droplets className="w-4 h-4 text-[var(--teal)] mb-1.5" />
                <div className="text-xs sm:text-sm font-semibold text-white leading-tight">
                  {language === 'ru' ? 'Напорные / безнапорные' : 'Bosimli / bosimsiz'}
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--muted-dark)]">TANSO</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: .96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: .9, delay: .12, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] flex items-center justify-center pb-6 lg:pb-2"
          >
            <div className="absolute w-[80%] aspect-square rounded-full border border-white/[0.06]" />

            <div className="relative z-10 w-[76%] sm:w-[70%] lg:w-[80%] drop-shadow-[0_36px_50px_rgba(0,0,0,.5)]">
              <img
                src="/images/products/tanso-bosimsiz-main.png"
                alt="TANSO quyosh suv isitgichi"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="absolute z-30 right-2 sm:right-6 lg:right-3 bottom-3 sm:bottom-5 lg:bottom-7 max-w-[250px] card-dark px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--amber)]" />
                <div>
                  <p className="text-[9px] uppercase tracking-[.16em] text-[var(--muted-dark)]">TANSO</p>
                  <p className="text-[11px] sm:text-xs font-semibold text-white">
                    {language === 'ru' ? 'Солнечные водонагреватели' : 'Quyosh suv isitgichlari'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-white/10" />
    </section>
  );
};
