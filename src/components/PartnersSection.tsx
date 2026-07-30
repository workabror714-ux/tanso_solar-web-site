import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Globe } from 'lucide-react';
import { Language } from '../types';
import { partnersData } from '../data/mockData';
import { translations } from '../data/translations';

interface PartnersSectionProps {
  currentLang: Language;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="py-16 bg-[#0F172A] text-white border-y border-slate-800/80 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/30 via-transparent to-teal-950/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Tier-1 Global Distribution
          </p>
          <h3 className="text-xl font-bold text-white font-display">
            {t.partnersTitle}
          </h3>
          <p className="text-xs text-slate-400">
            {t.partnersSubtitle}
          </p>
        </div>

        {/* Ticker Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
          {partnersData.map((partner) => (
            <motion.div
              key={partner.id}
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-[20px] bg-slate-800/40 backdrop-blur-md border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center justify-center text-center group transition-all"
            >
              <span className="text-sm font-black text-slate-400 group-hover:text-cyan-300 transition-colors font-display tracking-wider">
                {partner.logoText}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 font-medium">
                {partner.tier}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
