import React from 'react';
import { MessageSquareText, ClipboardList, PackageCheck, Truck, Wrench, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ProcessSection: React.FC = () => {
  const { language, t } = useLanguage();

  const steps = [
    {
      titleUz: 'So‘rov qoldiring', titleRu: 'Оставьте заявку',
      descUz: 'Ism va telefon raqamingizni qoldiring yoki telefon orqali bog‘laning.',
      descRu: 'Оставьте имя и номер телефона или свяжитесь с нами по телефону.', icon: MessageSquareText,
    },
    {
      titleUz: 'Ehtiyojni aniqlaymiz', titleRu: 'Уточняем задачу',
      descUz: 'Hajm, suv tizimi va foydalanish sharoitlari bo‘yicha savollarga aniqlik kiritamiz.',
      descRu: 'Уточняем объем, тип водоснабжения и условия эксплуатации.', icon: ClipboardList,
    },
    {
      titleUz: 'Modelni tanlaymiz', titleRu: 'Подбираем модель',
      descUz: 'Bosimli, bosimsiz yoki SPLIT tizimlardan mos variantni tavsiya qilamiz.',
      descRu: 'Подбираем подходящий вариант из напорных, безнапорных или SPLIT-систем.', icon: PackageCheck,
    },
    {
      titleUz: 'Yetkazib berish', titleRu: 'Доставка',
      descUz: 'Buyurtma tafsilotlari kelishilgach, yetkazib berish masalasi muvofiqlashtiriladi.',
      descRu: 'После согласования заказа координируем доставку оборудования.', icon: Truck,
    },
    {
      titleUz: 'Montaj', titleRu: 'Монтаж',
      descUz: 'Kerak bo‘lsa, tizimni o‘rnatish va ishga tayyorlash bo‘yicha yordam beramiz.',
      descRu: 'При необходимости помогаем с установкой и подготовкой системы к работе.', icon: Wrench,
    },
    {
      titleUz: 'Servis va aloqa', titleRu: 'Сервис и связь',
      descUz: 'Foydalanish bo‘yicha savollar va texnik xizmat uchun qayta bog‘lanishingiz mumkin.',
      descRu: 'Остаемся на связи по вопросам эксплуатации и технического обслуживания.', icon: Headphones,
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[var(--teal-tint)] text-[var(--ink)]">
      <div className="tanso-container">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <div className="kicker">JARAYON</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">{t('process')}</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {language === 'ru' ? 'От первой заявки до подбора, установки и дальнейшего сервиса.' : 'Birinchi so‘rovdan model tanlash, montaj va keyingi servisgacha.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.titleUz} className="card-interactive relative p-6 sm:p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="grid place-items-center w-11 h-11 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--teal-dark)]"><Icon className="w-5 h-5" /></span>
                  <span className="step-number">0{idx + 1}</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[var(--ink)]">{language === 'ru' ? step.titleRu : step.titleUz}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--muted)]">{language === 'ru' ? step.descRu : step.descUz}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
