import React from 'react';
import { Droplets, Layers3, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AboutSection } from '../components/AboutSection';
import { WhyTanso } from '../components/WhyTanso';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  const values = [
    {
      icon: Droplets,
      titleUz: 'Quyosh suv isitish yechimlari',
      titleRu: 'Солнечные системы нагрева воды',
      descUz: 'Uy va biznes uchun quyosh energiyasidan foydalanadigan issiq suv tizimlari.',
      descRu: 'Системы горячего водоснабжения на солнечной энергии для дома и бизнеса.',
    },
    {
      icon: Layers3,
      titleUz: 'Turli konfiguratsiyalar',
      titleRu: 'Разные конфигурации',
      descUz: 'Bosimli, bosimsiz va SPLIT mahsulotlardan ehtiyojga mos variant tanlash.',
      descRu: 'Подбор из напорных, безнапорных и SPLIT-моделей под задачу клиента.',
    },
    {
      icon: Headphones,
      titleUz: 'Konsultatsiya va servis',
      titleRu: 'Консультация и сервис',
      descUz: 'Mahsulot tanlash, o‘rnatish va foydalanish bo‘yicha amaliy yordam.',
      descRu: 'Практическая помощь с выбором, установкой и эксплуатацией оборудования.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D1514] text-white pt-28">
      <section className="pb-14 sm:pb-16 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-kicker">ABOUT TANSO</div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.045em] text-white">{t('about')}</h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-400">
            {language === 'ru'
              ? 'TANSO предлагает солнечные водонагреватели и коллекторные системы для частных и коммерческих объектов.'
              : 'TANSO xususiy va tijorat obyektlari uchun quyosh suv isitgichlari va kollektor tizimlarini taklif qiladi.'}
          </p>
        </div>
      </section>

      <AboutSection onNavigate={onNavigate} />

      <section className="py-20 bg-[#0D1514] border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titleUz} className="rounded-2xl border border-white/9 bg-white/[0.025] p-7 hover:border-[#08B4A5]/35 transition-colors">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#08B4A5]/10 text-[#08B4A5] mb-5"><Icon className="w-5 h-5" /></span>
                  <h3 className="text-base font-extrabold text-white">{language === 'ru' ? item.titleRu : item.titleUz}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{language === 'ru' ? item.descRu : item.descUz}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WhyTanso />
    </div>
  );
};
