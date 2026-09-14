import React, { Fragment } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
interface HeroProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenConsultation }) => {
  const { language, t, getLoc } = useLanguage();
  const { banners } = useData();
  const banner = banners.find((b) => b.active) || banners[0];

  const titleText = getLoc(banner, 'title');
  const subtitle = getLoc(banner, 'subtitle') || (language === 'ru'
    ? 'Солнечные водонагреватели TANSO для дома и бизнеса: напорные, безнапорные и SPLIT-системы.'
    : 'Uy va biznes uchun TANSO quyosh suv isitgichlari: bosimli, bosimsiz va SPLIT tizimlar.');

  const titleLines = (titleText && titleText.includes('\n'))
    ? titleText.split('\n')
    : language === 'ru'
      ? ['Горячая вода', 'от солнца', 'каждый день']
      : ['Quyoshdan', 'issiq suv ', 'har kuni'];

  return (
    <section id="home" className="scroll-mt-28 relative flex items-center overflow-hidden bg-[var(--ink)] pt-16 lg:pt-14">
      <div className="absolute inset-0">
        {banner?.bgImageUrl && (
          <img
            src={banner.bgImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink)_0%,var(--ink)_46%,rgba(16,33,27,.82)_70%,rgba(16,33,27,.95)_100%)]" />
        <div className="bg-line-grid-dark absolute inset-0 opacity-50" />

        {/* Animated squares — right side only, behind product image */}
        {[
          { l:'53%', t:'4%',  w:32, h:32, d:0,   dr:5.8, filled:false },
          { l:'68%', t:'2%',  w:16, h:16, d:1.4, dr:4.2, filled:true  },
          { l:'81%', t:'8%',  w:24, h:24, d:0.7, dr:6.5, filled:false },
          { l:'93%', t:'18%', w:14, h:14, d:2.3, dr:3.9, filled:true  },
          { l:'57%', t:'36%', w:20, h:20, d:0.4, dr:5.1, filled:false },
          { l:'87%', t:'42%', w:28, h:28, d:1.8, dr:4.7, filled:false },
          { l:'73%', t:'58%', w:18, h:18, d:0.6, dr:6.2, filled:true  },
          { l:'94%', t:'55%', w:22, h:22, d:2.8, dr:3.6, filled:false },
          { l:'61%', t:'74%', w:26, h:26, d:1.0, dr:5.5, filled:false },
          { l:'79%', t:'80%', w:14, h:14, d:1.6, dr:4.0, filled:true  },
          { l:'91%', t:'78%', w:20, h:20, d:0.2, dr:6.8, filled:false },
          { l:'55%', t:'90%', w:12, h:12, d:2.0, dr:3.4, filled:true  },
        ].map((sq, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none rounded-[3px]"
            style={{
              left: sq.l, top: sq.t, width: sq.w, height: sq.h,
              border: sq.filled ? 'none' : '1px solid rgba(4,175,157,0.18)',
              backgroundColor: sq.filled ? 'rgba(4,175,157,0.07)' : 'transparent',
            }}
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.93, 1.05, 0.93] }}
            transition={{ duration: sq.dr, delay: sq.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Ambient glow behind product */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          style={{ background: 'radial-gradient(ellipse 50% 55% at 74% 50%, rgba(4,175,157,0.22) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 tanso-container py-7 lg:py-9">
        <div className="grid lg:grid-cols-[1.02fr_.98fr] items-center gap-8 lg:gap-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
              className="kicker-dark mb-5"
            >
              TANSO • O'ZBEKISTON
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: .08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white"
            >
              {titleLines.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
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
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: .96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 2.4, delay: .22, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] flex items-center justify-center pb-4 lg:pb-0"
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
