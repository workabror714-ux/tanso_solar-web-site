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
    <section id="services-home" className="scroll-mt-28 py-20 sm:py-24 bg-[var(--paper)] text-[var(--ink)]">
      <div className="tanso-container">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[var(--border)] pb-8">
          <div className="max-w-2xl">
            <div className="kicker">INJENERLIK VA SERVIS</div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
              {t('services')}
            </h2>
            <p className="text-sm text-[var(--muted)] mt-3 max-w-xl">
              {language === 'ru'
                ? 'Полный комплекс услуг от бесплатного аудита до долгосрочного сервиса'
                : 'Bepul konsultatsiyadan tortib to professional montaj va uzoq muddatli servis xizmati'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--teal-dark)] hover:text-[var(--teal)] transition-colors group"
          >
            <span>{language === 'ru' ? 'Все услуги' : 'Barcha xizmatlar'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeServices.map((serv) => {
            const IconComp = iconMap[serv.iconName] || Wrench;
            return (
              <div
                key={serv.id}
                className="card-interactive p-7 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="grid place-items-center w-11 h-11 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)] mb-6">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-extrabold text-[var(--ink)] mb-2">
                    {getLoc(serv, 'title')}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                    {getLoc(serv, 'description')}
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--border)] mt-6 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-[0.16em]">
                    TANSO SERVICE
                  </span>
                  <button
                    onClick={onOpenConsultation}
                    className="text-[10px] font-bold uppercase tracking-wider text-[var(--teal-dark)] hover:text-[var(--teal)] flex items-center gap-1.5"
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
