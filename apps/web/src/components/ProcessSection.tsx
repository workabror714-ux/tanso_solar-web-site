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
    <section className="py-20 sm:py-24 bg-[#F5F8F7] text-[#0E1715] border-b border-[#DDE7E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <div className="section-kicker">PROCESS</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-[#0E1715]">{t('process')}</h2>
          <p className="mt-3 text-sm text-[#63716E]">
            {language === 'ru' ? 'От первой заявки до подбора, установки и дальнейшего сервиса.' : 'Birinchi so‘rovdan model tanlash, montaj va keyingi servisgacha.'}
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.titleUz} className="relative rounded-2xl bg-white border border-[#DDE7E4] p-6 sm:p-7 shadow-[0_12px_38px_rgba(14,35,31,.055)] hover:border-[#08B4A5]/45 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-5">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#08B4A5]/10 text-[#08B4A5]"><Icon className="w-5 h-5" /></span>
                  <span className="text-sm font-black text-[#F58A36]">0{idx + 1}</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0E1715]">{language === 'ru' ? step.titleRu : step.titleUz}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#63716E]">{language === 'ru' ? step.descRu : step.descUz}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
