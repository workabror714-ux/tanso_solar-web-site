import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  Headphones, 
  Sparkles, 
  Zap, 
  CheckCircle2
} from 'lucide-react';
import { Advantage, Language } from '../types';
import { advantagesData } from '../data/mockData';
import { translations } from '../data/translations';

interface AdvantagesSectionProps {
  currentLang: Language;
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return Award;
      case 'ShieldCheck': return ShieldCheck;
      case 'TrendingUp': return TrendingUp;
      case 'Headphones': return Headphones;
      default: return Sparkles;
    }
  };

  return (
    <section id="advantages" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-bold mb-4 border border-cyan-200/50 backdrop-blur-md">
            <Zap className="w-4 h-4 text-cyan-600" />
            <span>Afzalliklarimiz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            {t.advantagesTitle}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {t.advantagesSubtitle}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantagesData.map((adv, idx) => {
            const IconComp = getIcon(adv.icon);
            return (
              <motion.div
                key={adv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 rounded-[28px] bg-white/75 backdrop-blur-xl border border-white/80 hover:border-cyan-300 hover:bg-white/90 shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#0E7490] text-white flex items-center justify-center shadow-md shadow-cyan-900/20 group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-100/70 text-cyan-800 border border-cyan-200/50 font-extrabold text-[10px] uppercase">
                      {adv.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors">
                    {adv.title[currentLang]}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {adv.description[currentLang]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Kafolatlangan standart</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
