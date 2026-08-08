import React from 'react';
import { Award, Zap, ShieldCheck, CheckCircle } from 'lucide-react';
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
    <section className="bg-[#F8FAF9] text-[#0F1514] border-b border-[#E2E8E6] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div 
                key={index}
                className="p-6 bg-[#0F1514] text-white rounded-2xl border border-[#222E2B] hover:border-[#04AF9D] transition-all group shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-black text-[#F6852D] font-mono tracking-tight group-hover:text-[#04AF9D] transition-colors">
                    {item.value}
                  </span>
                  <div className="p-2.5 bg-[#04AF9D]/10 text-[#04AF9D] rounded-xl group-hover:bg-[#04AF9D] group-hover:text-white transition-all">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  {language === 'ru' ? item.titleRu : item.titleUz}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1">
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

