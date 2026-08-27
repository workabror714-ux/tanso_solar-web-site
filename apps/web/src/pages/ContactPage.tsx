import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ContactSection } from '../components/ContactSection';

export const ContactPage: React.FC = () => {
  const { language, t, getLoc } = useLanguage();
  const { settings } = useData();

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-28 pb-20">
      <div className="tanso-container mb-16">

        <div className="max-w-3xl mb-12">
          <div className="kicker">BOG‘LANISH</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--ink)] tracking-[-0.02em] mt-4">
            {t('contact')}
          </h1>
          <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">
            {language === 'ru'
              ? 'Свяжитесь с нашими офисом и центральным складом в Ташкенте для консультаций и заказа оборудования'
              : 'Toshkent shahridagi bosh idora hamda markaziy omborimiz bilan bog‘laning'}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          <div className="card-interactive p-6 space-y-3">
            <div className="grid place-items-center w-11 h-11 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[var(--ink)]">{language === 'ru' ? 'Номера телефонов' : 'Telefon raqamlar'}</h3>
            <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="block text-xs font-bold font-mono-num text-[var(--teal-dark)] hover:underline">
              {settings.phone1}
            </a>
            <a href={`tel:${settings.phone2.replace(/\s+/g, '')}`} className="block text-xs font-mono-num text-[var(--muted)] hover:underline">
              {settings.phone2}
            </a>
          </div>

          <div className="card-interactive p-6 space-y-3">
            <div className="grid place-items-center w-11 h-11 rounded-md bg-[var(--amber-tint)] text-[var(--amber)]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[var(--ink)]">{t('address')}</h3>
            <p className="text-xs text-[var(--muted)]">
              {getLoc(settings, 'address')}
            </p>
          </div>

          <div className="card-interactive p-6 space-y-3">
            <div className="grid place-items-center w-11 h-11 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[var(--ink)]">{t('workingHours')}</h3>
            <p className="text-xs text-[var(--muted)]">
              {getLoc(settings, 'workingHours')}
            </p>
          </div>
        </div>

      </div>

      <ContactSection />

    </div>
  );
};
