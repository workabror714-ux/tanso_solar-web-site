import React from 'react';
import { Award, Zap, ShieldCheck, Wrench, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const StatsSection: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    {
      value: '10+',
      titleUz: 'Yillik tajriba',
      titleRu: 'Лет опыта',
      descUz: 'Quyosh va suv isitish texnologiyalarida',
      descRu: 'В сфере солнечного водонагрева',
      icon: Award
    },
    {
      value: '1000+',
      titleUz: 'O’rnatilgan ob’yekt',
      titleRu: 'Установленных объектов',
      descUz: 'Xususiy va tijorat binolari',
      descRu: 'Частных домов и предприятий',
      icon: CheckCircle
    },
    {
      value: '80%',
      titleUz: 'Energiya tejamkorligi',
      titleRu: 'Экономия энергии',
      descUz: 'Kommunal to’lovlarni qisqartirish',
      descRu: 'Снижение расходов на газ и свет',
      icon: Zap
    },
    {
      value: '5 Yil',
      titleUz: 'Rasmiy kafolat',
      titleRu: 'Официальная гарантия',
      descUz: 'To’liq muhandislik servis xizmati',
      descRu: 'Сервисное обслуживание',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="bg-[#F9F8F6] text-[#1A1A1A] border-b border-[#1A1A1A]/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div 
                key={index}
                className="p-6 bg-white border border-[#1A1A1A]/10 hover:border-[#064E3B] transition-all group shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-editorial text-3xl sm:text-4xl font-light text-[#1A1A1A] tracking-tight group-hover:text-[#064E3B] transition-colors">
                    {item.value}
                  </span>
                  <div className="p-2 bg-[#064E3B]/10 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-all">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  {language === 'ru' ? item.titleRu : item.titleUz}
                </h4>
                <p className="text-[11px] text-[#1A1A1A]/60 mt-1">
                  {language === 'ru' ? item.descRu : item.descUz}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
