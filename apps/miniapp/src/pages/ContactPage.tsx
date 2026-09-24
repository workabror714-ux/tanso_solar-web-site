import React from 'react';
import { Phone, MapPin, Clock, Send, Instagram, Youtube } from 'lucide-react';
import { useMiniData } from '../context/MiniDataContext';
import { useLanguage } from '../context/LanguageContext';

const DEFAULT_MAP_URL =
  "https://yandex.uz/maps/10335/tashkent/?ll=69.201737%2C41.254642&mode=poi&poi%5Bpoint%5D=69.201614%2C41.254715&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D95573878212&z=20.16";

export const ContactPage: React.FC = () => {
  const { settings } = useMiniData();
  const { t } = useLanguage();

  return (
    <div className="px-4 pt-4 pb-24">
      <h1 className="text-lg font-extrabold text-[var(--ink)] mb-4">{t('contact')}</h1>

      <div className="flex flex-col gap-3">
        <a href={`tel:${settings.phone1?.replace(/\s+/g, '')}`} className="card-interactive p-4 flex items-center gap-3">
          <div className="grid place-items-center w-10 h-10 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)] shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--muted)] font-medium mb-0.5">{t('phone')}</p>
            <p className="font-mono-num font-bold text-[var(--ink)]">{settings.phone1}</p>
          </div>
        </a>

        {settings.addressRu && (
          <a
            href={settings.mapIframeUrl || DEFAULT_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-interactive p-4 flex items-center gap-3"
          >
            <div className="grid place-items-center w-10 h-10 rounded-md bg-[var(--amber-tint)] text-[var(--amber)] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted)] font-medium mb-0.5">{t('address')}</p>
              <p className="font-bold text-[var(--ink)] text-sm">{settings.addressUz || settings.addressRu}</p>
            </div>
          </a>
        )}

        {settings.workingHoursUz && (
          <div className="card-interactive p-4 flex items-center gap-3">
            <div className="grid place-items-center w-10 h-10 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted)] font-medium mb-0.5">{t('workingHours')}</p>
              <p className="font-bold text-[var(--ink)] text-sm">{settings.workingHoursUz}</p>
            </div>
          </div>
        )}

        {settings.telegram && (
          <a href={settings.telegram} target="_blank" rel="noopener noreferrer" className="card-interactive p-4 flex items-center gap-3">
            <div className="grid place-items-center w-10 h-10 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)] shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted)] font-medium mb-0.5">{t('telegramChannel')}</p>
              <p className="font-bold text-[var(--ink)] text-sm">{t('subscribeNews')}</p>
            </div>
          </a>
        )}

        {settings.instagram && (
          <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="card-interactive p-4 flex items-center gap-3">
            <div className="grid place-items-center w-10 h-10 rounded-md bg-[var(--amber-tint)] text-[var(--amber)] shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted)] font-medium mb-0.5">Instagram</p>
              <p className="font-bold text-[var(--ink)] text-sm">{t('officialPage')}</p>
            </div>
          </a>
        )}

        {/* Admin panel has no field to set this yet, so it falls back to the
            channel URL — same behavior as the main site's footer. */}
        <a
          href={settings.youtube || 'https://www.youtube.com/@tansosolar'}
          target="_blank"
          rel="noopener noreferrer"
          className="card-interactive p-4 flex items-center gap-3"
        >
          <div className="grid place-items-center w-10 h-10 rounded-md bg-[var(--danger-tint)] shrink-0" style={{ color: '#D32F2F' }}>
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--muted)] font-medium mb-0.5">YouTube</p>
            <p className="font-bold text-[var(--ink)] text-sm">{t('ourVideos')}</p>
          </div>
        </a>
      </div>

      <a href="https://tanso-solar.uz" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full mt-5">
        {t('goToWebsite')}
      </a>
    </div>
  );
};
