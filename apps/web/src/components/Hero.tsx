import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Sun, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface HeroProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenConsultation }) => {
  const { language, t, getLoc } = useLanguage();
  const { banners } = useData();

  const banner = banners.find(b => b.active) || banners[0];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-[#0F1514] text-white pt-28 pb-20 overflow-hidden border-b border-[#222E2B]">
      
      {/* Background Image / Overlay Container */}
      <div className="absolute inset-0 z-0">
        {banner?.bgType === 'video' ? (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover scale-105"
            src={banner.bgUrl}
          />
        ) : (
          <img 
            src={banner?.bgUrl || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1920'} 
            alt="Tanso Solar Background"
            className="w-full h-full object-cover object-center scale-105 opacity-40 transition-transform duration-10000"
          />
        )}
        
        {/* Brand Dark Graphite Gradient Overlay with Teal Glow */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#0F1514] via-[#0F1514]/90 to-[#04AF9D]/25"
          style={{ opacity: banner?.overlayOpacity ?? 0.85 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1514] via-transparent to-[#0F1514]/80" />
      </div>

      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#04AF9D0D_1px,transparent_1px),linear-gradient(to_bottom,#04AF9D0D_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-3xl space-y-8">
          
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-3 bg-[#151D1C]/90 px-4 py-1.5 rounded-full border border-[#222E2B] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F6852D] animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#04AF9D] font-bold">
              TANSO SOLAR • UZBEKISTAN
            </p>
          </div>

          {/* Headline - Strong Modern Architectural Typography */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-white font-sans uppercase">
            {getLoc(banner, 'heading') || 'Quyosh energiyasi bilan bepul va barqaror issiq suv'}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed max-w-2xl tracking-wide">
            {getLoc(banner, 'subtitle') || 'TANSO SOLAR quyosh suv isitgichlari bilan gaz va elektr energiyasini 80% gacha tejang. Yuqori sifat va rasmiy kafolat.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            
            {/* Primary CTA - Tanso Teal */}
            <button
              onClick={() => onNavigate('/catalog')}
              className="btn-tanso-primary flex items-center justify-center gap-3 group shadow-lg shadow-[#04AF9D]/20"
              id="btn-hero-catalog"
            >
              <span>{getLoc(banner, 'ctaPrimaryText') || t('viewProducts')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA - Dark / Transparent */}
            <button
              onClick={onOpenConsultation}
              className="btn-tanso-secondary flex items-center justify-center gap-2"
              id="btn-hero-consultation"
            >
              <Zap className="w-4 h-4 text-[#F6852D]" />
              <span>{getLoc(banner, 'ctaSecondaryText') || t('freeConsultation')}</span>
            </button>

          </div>

          {/* Hero Feature Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-[#222E2B] text-xs text-zinc-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#151D1C] rounded-lg border border-[#04AF9D]/30 text-[#04AF9D]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[11px] tracking-wide">5 Yil Kafolat</p>
                <p className="text-[10px] text-zinc-400">Rasmiy servis va xizmat</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#151D1C] rounded-lg border border-[#F6852D]/30 text-[#F6852D]">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[11px] tracking-wide">80% Tejamkorlik</p>
                <p className="text-[10px] text-zinc-400">Gaz va elektr xarajati</p>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="p-2.5 bg-[#151D1C] rounded-lg border border-[#04AF9D]/30 text-[#04AF9D]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[11px] tracking-wide">Sertifikatlangan</p>
                <p className="text-[10px] text-zinc-400">Xalqaro sifat standarti</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

