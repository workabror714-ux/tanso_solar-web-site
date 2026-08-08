import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Sun, Award, Play } from 'lucide-react';
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
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-[#1A1A1A] text-white pt-24 pb-20 overflow-hidden border-b border-white/10">
      
      {/* Background Image / Video Container */}
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
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
          />
        )}
        
        {/* Dark Editorial Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/90 to-[#064E3B]/40"
          style={{ opacity: banner?.overlayOpacity ?? 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A]/70" />
      </div>

      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:5rem_5rem] z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-3xl space-y-8">
          
          {/* Editorial Eyebrow Tag */}
          <div className="inline-flex items-center gap-3">
            <span className="w-2 h-2 bg-[#F59E0B] rotate-45" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#F59E0B] font-bold">
              TANSO SOLAR • UZBEKISTAN
            </p>
          </div>

          {/* Headline - Editorial Playfair Display Serif */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light leading-[0.98] tracking-tight text-[#F9F8F6] italic">
            {getLoc(banner, 'heading') || 'Quyosh energiyasini uyingiz uchun ishlating.'}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-300/90 font-normal leading-relaxed max-w-2xl tracking-wide">
            {getLoc(banner, 'subtitle') || 'O‘zbekistondagi eng ishonchli va zamonaviy quyosh suv isitgichlari, fotopaneellar va energiya saqlash tizimlari.'}
          </p>

          {/* CTA Buttons - Editorial Solid Rectangular */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            
            {/* Primary CTA */}
            <button
              onClick={() => onNavigate('/catalog')}
              className="px-8 py-3.5 bg-[#064E3B] hover:bg-emerald-800 text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 group border border-emerald-500/30"
              id="btn-hero-catalog"
            >
              <span>{getLoc(banner, 'ctaPrimaryText') || t('viewProducts')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 border border-white/20 hover:border-white/50 bg-[#1A1A1A]/60 hover:bg-[#1A1A1A] text-[#F9F8F6] text-[11px] font-bold uppercase tracking-widest backdrop-blur-md transition-all flex items-center justify-center gap-2"
              id="btn-hero-consultation"
            >
              <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{getLoc(banner, 'ctaSecondaryText') || t('freeConsultation')}</span>
            </button>

          </div>

          {/* Hero Feature Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 text-xs text-zinc-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#064E3B]/40 border border-[#064E3B] text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[11px] tracking-wide">5 Yil Kafolat</p>
                <p className="text-[10px] text-zinc-400">Rasmiy servis markazi</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#064E3B]/40 border border-[#064E3B] text-[#F59E0B]">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[11px] tracking-wide">80% Tejamkorlik</p>
                <p className="text-[10px] text-zinc-400">Gaz va elektr xarajati</p>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="p-2 bg-[#064E3B]/40 border border-[#064E3B] text-emerald-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[11px] tracking-wide">1000+ Ob’yektlar</p>
                <p className="text-[10px] text-zinc-400">Butun O’zbekiston bo’ylab</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
