import React from 'react';
import { ShieldCheck, Cpu, Wrench, Zap, Headphones, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhyTanso: React.FC = () => {
  const { language, t } = useLanguage();

  const benefits = [
    {
      titleUz: 'Original va sertifikatlangan uskunalar',
      titleRu: 'Оригинальное сертифицированное оборудование',
      descUz: 'Zavod kafolati va xalqaro ISO/CE sertifikatlariga ega uskunalar.',
      descRu: 'Прямые поставки с завода с сертификатами качества ISO/CE.',
      icon: ShieldCheck
    },
    {
      titleUz: 'Professional injenering',
      titleRu: 'Профессиональный инжиниринг',
      descUz: 'Tajribali energetik va gidravlik muhandislar jamoasi.',
      descRu: 'Команда дипломированных инженеров-энергетиков.',
      icon: Cpu
    },
    {
      titleUz: 'Respublika bo’ylab montaj',
      titleRu: 'Монтаж по всему Узбекистану',
      descUz: 'Toshkent va barcha viloyatlarda montaj va servis brigadalari.',
      descRu: 'Выездные сервисные бригады во все регионы страны.',
      icon: Truck
    },
    {
      titleUz: 'Moslashtirilgan loyiha va smeta',
      titleRu: 'Индивидуальный проект и смета',
      descUz: 'Ob’yektingiz me’morchiligi va ehtiyojingizga mos aniq loyiha.',
      descRu: 'Точный видео- и 3D-расчет выработки энергии для вашего дома.',
      icon: Zap
    },
    {
      titleUz: 'Kafolat va texnik ko’rik',
      titleRu: 'Гарантия и техническое ТО',
      descUz: '5 yildan 10 yilgacha kafolat va doimiy profilaktika xizmati.',
      descRu: 'Гарантийные обязательства до 10 лет с плановым сервисом.',
      icon: Wrench
    },
    {
      titleUz: '24/7 Qo’llab-quvvatlash',
      titleRu: 'Поддержка 24/7',
      descUz: 'Muammolar paydo bo’lganda tezkor masofaviy diagnostika.',
      descRu: 'Круглосуточная горячая линия и удаленный мониторинг.',
      icon: Headphones
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAF9] text-[#0F1514] relative border-b border-[#E2E8E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#04AF9D]/10 rounded-full border border-[#04AF9D]/20">
            <span className="w-2 h-2 rounded-full bg-[#F6852D]" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#04AF9D]">
              AFZALLIKLAR VA SIFAT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F1514] uppercase">
            {t('whyTanso')}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            {language === 'ru'
              ? 'Надежность, технологичность и максимальная окупаемость для каждого клиента'
              : 'Har bir mijoz uchun ishonchlilik, yuqori samaradorlik va tezkor tejamkorlik'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const IconComp = item.icon;
            const numStr = `0${idx + 1}`.slice(-2);
            return (
              <div 
                key={idx}
                className="p-8 bg-white rounded-xl border border-[#E2E8E6] hover:border-[#04AF9D] transition-all duration-300 group shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-[#04AF9D]/10 text-[#04AF9D] group-hover:bg-[#04AF9D] group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-zinc-300 font-mono">
                      #{numStr}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1514] mb-2">
                    {language === 'ru' ? item.titleRu : item.titleUz}
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    {language === 'ru' ? item.descRu : item.descUz}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

