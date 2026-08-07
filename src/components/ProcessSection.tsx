import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const ProcessSection: React.FC = () => {
  const { language, t } = useLanguage();

  const steps = [
    {
      num: '01',
      titleUz: 'So‘rov qoldiring',
      titleRu: 'Оставьте заявку',
      descUz: 'Saytimiz orqali yoki telefon orqali bepul so‘rov qoldiring.',
      descRu: 'Заполните форму на сайте или позвоните по указанному номеру.'
    },
    {
      num: '02',
      titleUz: 'Mutaxassis konsultatsiyasi',
      titleRu: 'Консультация эксперта',
      descUz: 'Injenering va loyihalash bo’yicha mutaxassisimiz siz bilan bog’lanadi.',
      descRu: 'Инженер уточнит детали вашего объекта и задачи по энергоснабжению.'
    },
    {
      num: '03',
      titleUz: 'Tizimni tanlash va hisoblash',
      titleRu: 'Расчет и подбор оборудования',
      descUz: 'Ob’yektingiz xususiyatidan kelib chiqib optimal uskuna va 3D smeta tayyorlanadi.',
      descRu: 'Подбор наиболее эффективного оборудования и составление прозрачной сметы.'
    },
    {
      num: '04',
      titleUz: 'Yetkazib berish',
      titleRu: 'Доставка на объект',
      descUz: 'Uskunalar maxsus xavfsiz transportda ob’yektga tezkor yetkaziladi.',
      descRu: 'Быстрая транспортировка спецтранспортом прямо до вашей локации.'
    },
    {
      num: '05',
      titleUz: 'Professional montaj',
      titleRu: 'Профессиональный монтаж',
      descUz: 'Tajribali muhandislar jamoasi tomonidan o’rnatish va sozlash ishlari.',
      descRu: 'Монтаж сертифицированными инженерами с соблюдением норм безопасности.'
    },
    {
      num: '06',
      titleUz: 'Ishga tushirish va kafolat',
      titleRu: 'Запуск и гарантия',
      descUz: 'Tizim sinovdan o’tkazilib, rasmiy kafolat shartnomasi topshiriladi.',
      descRu: 'Тестирование системы, инструктаж и передача гарантийных документов.'
    }
  ];

  return (
    <section className="py-20 bg-[#F9F8F6] text-[#1A1A1A] relative border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#064E3B]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#064E3B]">
              06. HOW IT WORKS
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-light tracking-tight text-[#1A1A1A] italic">
            {t('process')}
          </h2>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-3">
            {language === 'ru'
              ? 'Простой и прозрачный процесс от первого звонка до полноценного запуска'
              : 'Birinchi qo’ng’iroqdan tortib to tizimni to’liq ishga tushirishgacha bo’lgan bosqichlar'}
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="p-8 bg-white border border-[#1A1A1A]/10 hover:border-[#064E3B] transition-all relative group shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-editorial text-3xl font-light text-[#064E3B] italic">
                    {step.num}.
                  </span>
                  <span className="w-2 h-2 bg-[#F59E0B]" />
                </div>

                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                  {language === 'ru' ? step.titleRu : step.titleUz}
                </h3>

                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
                  {language === 'ru' ? step.descRu : step.descUz}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
