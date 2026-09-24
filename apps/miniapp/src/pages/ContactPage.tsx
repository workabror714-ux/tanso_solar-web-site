import React from 'react';
import { Phone, MapPin, Clock, Send } from 'lucide-react';
import { useMiniData } from '../context/MiniDataContext';

export const ContactPage: React.FC = () => {
  const { settings } = useMiniData();

  return (
    <div className="px-4 pt-4 pb-24">
      <h1 className="text-lg font-extrabold text-[var(--ink)] mb-4">Aloqa</h1>

      <div className="flex flex-col gap-3">
        <a href={`tel:${settings.phone1?.replace(/\s+/g, '')}`} className="card-interactive p-4 flex items-center gap-3">
          <div className="grid place-items-center w-10 h-10 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)] shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--muted)] font-medium mb-0.5">Telefon</p>
            <p className="font-mono-num font-bold text-[var(--ink)]">{settings.phone1}</p>
          </div>
        </a>

        {settings.addressRu && (
          <div className="card-interactive p-4 flex items-center gap-3">
            <div className="grid place-items-center w-10 h-10 rounded-md bg-[var(--amber-tint)] text-[var(--amber)] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted)] font-medium mb-0.5">Manzil</p>
              <p className="font-bold text-[var(--ink)] text-sm">{settings.addressUz || settings.addressRu}</p>
            </div>
          </div>
        )}

        {settings.workingHoursUz && (
          <div className="card-interactive p-4 flex items-center gap-3">
            <div className="grid place-items-center w-10 h-10 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted)] font-medium mb-0.5">Ish vaqti</p>
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
              <p className="text-xs text-[var(--muted)] font-medium mb-0.5">Telegram kanal</p>
              <p className="font-bold text-[var(--ink)] text-sm">Yangiliklarga obuna bo'ling</p>
            </div>
          </a>
        )}
      </div>

      <a href="https://tanso-solar.uz" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full mt-5">
        Veb-saytga o'tish
      </a>
    </div>
  );
};
