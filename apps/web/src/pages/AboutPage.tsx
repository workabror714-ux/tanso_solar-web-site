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
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-28">
      <section className="pb-14 sm:pb-16">
        <div className="tanso-container">
          <div className="kicker">TANSO HAQIDA</div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.025em] text-[var(--ink)]">{t('about')}</h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--muted)]">
            {language === 'ru'
              ? 'TANSO предлагает солнечные водонагреватели и коллекторные системы для частных и коммерческих объектов.'
              : 'TANSO xususiy va tijorat obyektlari uchun quyosh suv isitgichlari va kollektor tizimlarini taklif qiladi.'}
          </p>
        </div>
      </section>

      <AboutSection onNavigate={onNavigate} />

      <section className="py-20 bg-[var(--paper)]">
        <div className="tanso-container">
          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titleUz} className="card-interactive p-7">
                  <span className="grid place-items-center w-11 h-11 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)] mb-5"><Icon className="w-5 h-5" /></span>
                  <h3 className="text-base font-extrabold text-[var(--ink)]">{language === 'ru' ? item.titleRu : item.titleUz}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{language === 'ru' ? item.descRu : item.descUz}</p>
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
