import React from 'react';
import { PackageCheck, Droplets, Wrench, Headphones, Layers3, ClipboardCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhyTanso: React.FC = () => {
  const { language, t } = useLanguage();

  const benefits = [
    {
      titleUz: 'TANSO mahsulotlari',
      titleRu: 'Продукция TANSO',
      descUz: 'Katalogda TANSO quyosh suv isitgichlari va kollektor tizimlari.',
      descRu: 'В каталоге солнечные водонагреватели и коллекторные системы TANSO.',
      icon: PackageCheck,
    },
    {
      titleUz: 'Bosimli va bosimsiz yechimlar',
      titleRu: 'Напорные и безнапорные решения',
      descUz: 'Suv tizimingiz va foydalanish sharoitiga mos konfiguratsiyani tanlash imkoniyati.',
      descRu: 'Подбор конфигурации под водопровод и условия эксплуатации объекта.',
      icon: Droplets,
    },
    {
      titleUz: 'SPLIT tizimlar',
      titleRu: 'SPLIT-системы',
      descUz: 'Alohida kollektor konfiguratsiyasi kerak bo‘lgan obyektlar uchun SPLIT yechimlar.',
      descRu: 'SPLIT-решения для объектов, где требуется раздельная конфигурация коллектора.',
      icon: Layers3,
    },
    {
      titleUz: 'Mos mahsulotni tanlash',
      titleRu: 'Подбор подходящей модели',
      descUz: 'Hajm, tizim turi va obyekt ehtiyojidan kelib chiqib model tanlashga yordam beramiz.',
      descRu: 'Поможем подобрать модель по объему, типу системы и потребностям объекта.',
      icon: ClipboardCheck,
    },
    {
      titleUz: 'Montaj va servis',
      titleRu: 'Монтаж и сервис',
      descUz: 'Quyosh suv isitish tizimlarini o‘rnatish va texnik xizmat bo‘yicha yordam.',
      descRu: 'Помощь с монтажом и техническим обслуживанием солнечных водонагревателей.',
      icon: Wrench,
    },
    {
      titleUz: 'Konsultatsiya',
      titleRu: 'Консультация',
      descUz: 'Savollaringiz bo‘yicha TANSO mutaxassisi bilan bog‘lanish uchun so‘rov qoldiring.',
      descRu: 'Оставьте заявку, чтобы связаться со специалистом TANSO по вашему вопросу.',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[var(--paper)] text-[var(--ink)]">
      <div className="tanso-container">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="kicker justify-center">TANSO AFZALLIKLARI</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
            {t('whyTanso')}
          </h2>
          <p className="text-sm text-[var(--muted)] mt-3">
            {language === 'ru'
              ? 'Понятный каталог, несколько типов систем и помощь на этапе выбора и сервиса.'
              : 'Tushunarli katalog, bir nechta tizim turi va tanlashdan servisgacha yordam.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.titleUz} className="card-interactive p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className="grid place-items-center w-11 h-11 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="step-number">0{idx + 1}</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[var(--ink)]">
                  {language === 'ru' ? item.titleRu : item.titleUz}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
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
