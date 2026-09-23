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

          {/* Phone card */}
          <div className="card-interactive p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-11 h-11 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-[var(--muted)]">{language === 'ru' ? 'Номера телефонов' : 'Telefon raqamlar'}</p>
            </div>
            <div>
              <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="block text-3xl font-extrabold font-mono-num text-[var(--ink)] hover:text-[var(--teal-dark)] transition-colors leading-tight whitespace-nowrap">
                {settings.phone1}
              </a>
              {settings.phone2 && (
                <a href={`tel:${settings.phone2.replace(/\s+/g, '')}`} className="block text-base font-mono-num text-[var(--muted)] hover:text-[var(--teal-dark)] transition-colors mt-1">
                  {settings.phone2}
                </a>
              )}
            </div>
          </div>

          {/* Address card */}
          <a
            href={settings.mapIframeUrl || "https://yandex.uz/maps/10335/tashkent/?ll=69.201737%2C41.254642&mode=poi&poi%5Bpoint%5D=69.201614%2C41.254715&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D95573878212&z=20.16"}
            target="_blank"
            rel="noopener noreferrer"
            className="card-interactive p-6 flex flex-col gap-4 group"
          >
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-11 h-11 rounded-md bg-[var(--amber-tint)] text-[var(--amber)] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-[var(--muted)]">{t('address')}</p>
            </div>
            <span className="text-xl font-extrabold text-[var(--ink)] group-hover:text-[var(--teal-dark)] transition-colors leading-tight whitespace-nowrap">
              {getLoc(settings, 'address')}
            </span>
          </a>

          {/* Working hours card */}
          <div className="card-interactive p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-11 h-11 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-[var(--muted)]">{t('workingHours')}</p>
            </div>
            <span className="text-xl font-extrabold text-[var(--ink)] leading-tight whitespace-nowrap">
              {getLoc(settings, 'workingHours')}
            </span>
          </div>

        </div>

      </div>

      <ContactSection />

    </div>
  );
};
