import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutSectionProps {
  onNavigate: (path: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <section className="py-20 bg-[#F9F8F6] text-[#1A1A1A] relative overflow-hidden border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Asymmetric Image Grid */}
          <div className="relative">
            <div className="relative z-10 border border-[#1A1A1A]/20 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000" 
                alt="Tanso Solar Installation" 
                className="w-full h-[420px] object-cover"
              />
            </div>

            {/* Overlapping Secondary Image */}
            <div className="absolute -bottom-8 -right-4 sm:right-6 z-20 w-3/5 border-4 border-[#F9F8F6] shadow-2xl hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800" 
                alt="Tanso Inverters" 
                className="w-full h-[220px] object-cover"
              />
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute top-6 left-6 z-20 p-5 bg-[#1A1A1A] text-white border border-white/10 shadow-2xl flex items-center gap-4">
              <div className="p-3 bg-[#064E3B] text-[#F9F8F6]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="font-editorial text-2xl font-light text-[#F59E0B]">10+ Yil</p>
                <p className="text-[10px] text-zinc-300 uppercase tracking-wider font-bold">Tajriba va kafolat</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#064E3B]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#064E3B]">
                08. TANSO SOLAR COMPANY
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-light tracking-tight leading-tight text-[#1A1A1A] italic">
              {language === 'ru'
                ? 'Лидер в сфере солнечного водонагрева и возобновляемой энергии'
                : 'Quyosh va issiqlik energiyasi sohasidagi ishonchli hamkoringiz'}
            </h2>

            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed font-light">
              {language === 'ru'
                ? 'Компания TANSO SOLAR специализируется на проектировании, поставке и монтаже высокоэффективных солнечных водонагревательных систем, фотоэлектрических панелей и систем накопления энергии для частных домов, коммерческих зданий и гостиниц в Узбекистане.'
                : 'TANSO SOLAR kompaniyasi O’zbekiston bo’ylab xususiy uylar, kottejlar, mehmonxonalar hamda sanoat ob’yektlari uchun quyosh suv isitgichlari, fotopaneellar hamda avtonom energiya tizimlarini loyihalashtirish va montaj qilish bilan shug’ullanadi.'}
            </p>

            {/* Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#1A1A1A]">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#064E3B] flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium">{language === 'ru' ? 'Сертифицированное европейское оборудование' : 'Sertifikatlangan va sinovdan o’tgan uskunalar'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#064E3B] flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium">{language === 'ru' ? 'Профессиональная бригада инженеров' : 'Malakali muhandislar va montajchilar jamoasi'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#064E3B] flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium">{language === 'ru' ? 'Сервисная поддержка и регулярный замер' : '24/7 texnik yordam va servis ko’rigi'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#064E3B] flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium">{language === 'ru' ? 'Официальная гарантия до 10 лет' : '10 yilgacha rasmiy kafolat shartnomasi'}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('/about')}
                className="px-6 py-3.5 bg-[#064E3B] hover:bg-emerald-900 text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2 group shadow-md"
              >
                <span>{language === 'ru' ? 'Узнать больше о Tanso' : 'Tanso haqida ko‘proq'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
