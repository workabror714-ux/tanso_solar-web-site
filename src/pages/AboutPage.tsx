import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle, Zap, Building2, Globe2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AboutSection } from '../components/AboutSection';
import { WhyTanso } from '../components/WhyTanso';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">
            ABOUT TANSO SOLAR
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight mt-2">
            {t('about')}
          </h1>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            {language === 'ru'
              ? 'Tanso Solar — международный поставщик и сервисный центр в области солнечного водонагрева и альтернативной энергетики в Узбекистане.'
              : 'Tanso Solar — O’zbekistonda quyosh energiya texnologiyalari, suv isitish tizimlari hamda fotoelektrik panellar bo’yicha rasmiy yetkazib beruvchi va muhandislik markazi.'}
          </p>
        </div>
      </div>

      <AboutSection onNavigate={onNavigate} />

      {/* Corporate Values */}
      <section className="py-16 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <div className="p-3 bg-emerald-950 border border-emerald-500/30 text-emerald-400 rounded-xl w-fit mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Missiyamiz</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Aholiga hamda biznes sub’yektlariga ekologik toza va tejamkor quyosh energiyasini xavfsiz va uzluksiz yetkazish.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <div className="p-3 bg-emerald-950 border border-emerald-500/30 text-amber-400 rounded-xl w-fit mb-4">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Xalqaro standartlar</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Xalqaro ISO 9001 va CE sertifikatlariga ega Yevropa hamda Osiyo zavodlari uskunalaridan foydalanish.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <div className="p-3 bg-emerald-950 border border-emerald-500/30 text-emerald-400 rounded-xl w-fit mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tajribali Muhandislar</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Xorijiy davlatlarda malaka oshirgan tajribali energetik va gidravlik montaj muhandislari.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhyTanso />
    </div>
  );
};
