import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  ArrowRight, 
  Calculator, 
  TrendingUp, 
  Sun,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  onOpenCalculator: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenCalculator,
  onOpenContact
}) => {
  const t = translations[currentLang];

  const stats = [
    { val: t.heroStat1Val, lbl: t.heroStat1Lbl, icon: Zap },
    { val: t.heroStat2Val, lbl: t.heroStat2Lbl, icon: CheckCircle2 },
    { val: t.heroStat3Val, lbl: t.heroStat3Lbl, icon: ShieldCheck },
    { val: t.heroStat4Val, lbl: t.heroStat4Lbl, icon: Award }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-36 pb-20 flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-5%] right-[-5%] w-[550px] h-[550px] bg-cyan-200/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[650px] h-[650px] bg-teal-200/35 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Subdued Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-emerald-700 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md"
            >
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>{t.heroBadge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] font-display"
            >
              <span className="block">{t.heroTitle1}</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                {t.heroTitle2}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={onOpenCalculator}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-sm shadow-xl shadow-cyan-900/20 hover:shadow-cyan-900/30 hover:scale-[1.02] active:scale-95 transition-all group"
              >
                <Calculator className="w-4 h-4 text-cyan-200" />
                <span>{t.heroCtaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('products')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/80 hover:bg-white text-slate-900 border border-slate-200/80 font-bold text-sm shadow-sm hover:shadow-md backdrop-blur-md transition-all"
              >
                <span>{t.heroCtaSecondary}</span>
              </button>
            </motion.div>

            {/* Key Trust Signals */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 border-t border-slate-200/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span className="font-medium">Tier-1 BNEF Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">ISO 9001 / CE / TUV</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                <span className="font-medium">25 Yillik Kafolat</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Card / Floating Widget */}
          <div className="lg:col-span-5 relative">
            
            {/* Glassmorphic Live Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative p-6 sm:p-8 rounded-[32px] bg-white/75 backdrop-blur-xl border border-white/80 shadow-2xl shadow-cyan-900/5 space-y-6"
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-100/70 border border-cyan-200/80 flex items-center justify-center text-cyan-700">
                    <Activity className="w-5 h-5 animate-pulse text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">TANSO Cloud Dispatch</h3>
                    <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                      Live Monitoring Operational
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-emerald-100/80 text-emerald-800 rounded-full border border-emerald-200/50">
                  Active
                </span>
              </div>

              {/* Energy Stats Inside Card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-[20px] bg-slate-50/90 border border-slate-200/70">
                  <p className="text-xs text-slate-500 font-medium mb-1">Bugungi Ishlab Chiqarish</p>
                  <p className="text-xl font-black text-slate-900 font-display">84,290 <span className="text-xs text-cyan-700 font-bold">kWh</span></p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+14.2% samaradorlik</span>
                  </div>
                </div>

                <div className="p-4 rounded-[20px] bg-slate-50/90 border border-slate-200/70">
                  <p className="text-xs text-slate-500 font-medium mb-1">CO2 Tejamkorligi</p>
                  <p className="text-xl font-black text-slate-900 font-display">62.4 <span className="text-xs text-emerald-600 font-bold">Tonna</span></p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-teal-700 font-bold">
                    <Sun className="w-3.5 h-3.5" />
                    <span>Nol emissiya</span>
                  </div>
                </div>
              </div>

              {/* Mini CTA inside Hero Card */}
              <div className="p-4 rounded-[20px] bg-gradient-to-r from-cyan-900 to-slate-900 text-white flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-xs font-bold text-white">Energiya Mustaqilligi</p>
                  <p className="text-[11px] text-slate-300">Bepul konsultatsiya va 3D loyiha</p>
                </div>
                <button
                  onClick={onOpenContact}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md transition-all shrink-0"
                >
                  Murojaat
                </button>
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-4 rounded-[24px] bg-white/90 border border-white shadow-xl backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                25
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">25 Yil Kafolat</p>
                <p className="text-[10px] text-slate-500">Rasmiy servis markazi</p>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Hero Bottom Key Statistics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-slate-200/60">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="p-5 rounded-[24px] bg-white/60 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-2xl bg-cyan-100/70 text-cyan-700 group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                    {stat.val}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{stat.lbl}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
