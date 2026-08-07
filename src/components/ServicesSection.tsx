import React from 'react';
import { 
  MessageSquare, Search, Calculator, Truck, Wrench, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface ServicesSectionProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

const iconMap: Record<string, any> = {
  MessageSquare,
  Search,
  Calculator,
  Truck,
  Wrench,
  ShieldCheck
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate, onOpenConsultation }) => {
  const { language, t, getLoc } = useLanguage();
  const { services } = useData();

  const activeServices = services.filter(s => s.active).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="py-20 bg-[#1A1A1A] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#F59E0B]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F59E0B]">
                04. SERVICES & ENGINEERING
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light tracking-tight text-[#F9F8F6] italic">
              {t('services')}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-3 max-w-xl">
              {language === 'ru'
                ? 'Полный комплекс услуг от бесплатного аудита до долгосрочного сервиса'
                : 'Bepul konsultatsiyadan tortib to professional montaj va uzoq muddatli servis xizmati'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400 hover:text-white transition-colors group"
          >
            <span>{language === 'ru' ? 'Все услуги' : 'Barcha xizmatlar'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((serv) => {
            const IconComp = iconMap[serv.icon] || Wrench;
            return (
              <div
                key={serv.id}
                className="p-8 bg-black/40 border border-white/10 hover:border-[#064E3B] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-[#064E3B] text-white w-fit mb-6 group-hover:bg-[#F59E0B] group-hover:text-[#1A1A1A] transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h3 className="font-editorial text-xl font-normal text-white mb-2 group-hover:text-[#F59E0B] transition-colors italic">
                    {getLoc(serv, 'title')}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {getLoc(serv, 'description')}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                    TANSO SERVICE
                  </span>
                  <button 
                    onClick={onOpenConsultation}
                    className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 hover:text-white flex items-center gap-1.5"
                  >
                    <span>{t('consultation')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
