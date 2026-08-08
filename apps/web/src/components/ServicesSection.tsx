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
    <section id="services-home" className="scroll-mt-28 py-20 bg-[#0F1514] border-b border-[#222E2B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#222E2B] pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#04AF9D]/10 rounded-full border border-[#04AF9D]/20 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F6852D]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#04AF9D]">
                INJENERLIK VA SERVIS XIZMATLARI
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              {t('services')}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
              {language === 'ru'
                ? 'Полный комплекс услуг от бесплатного аудита до долгосрочного сервиса'
                : 'Bepul konsultatsiyadan tortib to professional montaj va uzoq muddatli servis xizmati'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#04AF9D] hover:text-[#038a7c] transition-colors group"
          >
            <span>{language === 'ru' ? 'Все услуги' : 'Barcha xizmatlar'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((serv) => {
            const IconComp = iconMap[serv.iconName] || Wrench;
            return (
              <div
                key={serv.id}
                className="p-8 bg-[#151D1C] border border-[#222E2B] hover:border-[#04AF9D] rounded-2xl transition-all duration-300 group flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="p-3 bg-[#04AF9D] text-white rounded-xl w-fit mb-6 group-hover:bg-[#F6852D] transition-colors shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-2 uppercase tracking-wide group-hover:text-[#04AF9D] transition-colors">
                    {getLoc(serv, 'title')}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {getLoc(serv, 'description')}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#222E2B] mt-6 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                    TANSO SERVICE
                  </span>
                  <button 
                    onClick={onOpenConsultation}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#04AF9D] hover:text-[#038a7c] flex items-center gap-1.5"
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

