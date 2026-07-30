import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Wrench, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  X,
  Sparkles
} from 'lucide-react';
import { Service, Language } from '../types';
import { servicesData } from '../data/mockData';
import { translations } from '../data/translations';

interface ServicesSectionProps {
  currentLang: Language;
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentLang,
  onOpenContact
}) => {
  const t = translations[currentLang];
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'Wrench': return Wrench;
      case 'Activity': return Activity;
      case 'ShieldCheck': return ShieldCheck;
      default: return Sparkles;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Muhandislik va Xizmatlar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            {t.servicesTitle}
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const IconComp = getIcon(service.iconName);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="group relative p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-cyan-400/50 shadow-xl backdrop-blur-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-[#0E7490] group-hover:text-white transition-all duration-300 mb-6 shadow-md">
                    <IconComp className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors font-display">
                    {service.title[currentLang]}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {service.shortDesc[currentLang]}
                  </p>
                </div>

                {/* Bottom Trigger */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                  <span>{t.learnMore}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    {React.createElement(getIcon(selectedService.iconName), { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">{selectedService.title[currentLang]}</h3>
                    <p className="text-xs text-cyan-400 font-medium">TANSO Certified Service</p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedService.fullDesc[currentLang]}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Asosiy Xususiyatlar:
                  </h4>
                  <div className="space-y-2">
                    {selectedService.features[currentLang].map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onOpenContact();
                    }}
                    className="flex-1 py-3 px-4 rounded-full bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-xs shadow-lg shadow-cyan-900/40 transition-all"
                  >
                    Ushbu Xizmat Bo'yicha Konsultatsiya Qoldirish
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
