import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, Send as TelegramIcon, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ContactSection } from '../components/ContactSection';

export const ContactPage: React.FC = () => {
  const { language, t, getLoc } = useLanguage();
  const { settings } = useData();

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight mt-2">
            {t('contact')}
          </h1>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            {language === 'ru'
              ? 'Свяжитесь с нашими офисом и центральным складом в Ташкенте для консультаций и заказа оборудования'
              : 'Toshkent shahridagi bosh idora hamda markaziy omborimiz bilan bog‘laning'}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
            <div className="p-3 bg-zinc-950 text-emerald-400 rounded-xl w-fit">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Telefon raqamlar</h3>
            <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="block text-xs font-bold text-emerald-400 hover:underline">
              {settings.phone1}
            </a>
            <a href={`tel:${settings.phone2.replace(/\s+/g, '')}`} className="block text-xs text-zinc-400 hover:underline">
              {settings.phone2}
            </a>
          </div>

          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
            <div className="p-3 bg-zinc-950 text-amber-400 rounded-xl w-fit">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">{t('address')}</h3>
            <p className="text-xs text-zinc-300">
              {getLoc(settings, 'address')}
            </p>
          </div>

          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
            <div className="p-3 bg-zinc-950 text-emerald-400 rounded-xl w-fit">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">{t('workingHours')}</h3>
            <p className="text-xs text-zinc-300">
              {getLoc(settings, 'workingHours')}
            </p>
          </div>
        </div>

        <ContactSection />

      </div>
    </div>
  );
};
