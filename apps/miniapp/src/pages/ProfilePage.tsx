import React from 'react';
import { Globe } from 'lucide-react';
import { useTelegram } from '../context/TelegramContext';
import { useLanguage } from '../context/LanguageContext';

export const ProfilePage: React.FC = () => {
  const { user } = useTelegram();
  const { language, setLanguage, t } = useLanguage();

  const displayName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : t('profileGuestName');
  const initial = (user?.first_name || t('profileGuestName')).charAt(0).toUpperCase();

  return (
    <div className="px-4 pt-4 pb-24">
      <h1 className="text-lg font-extrabold text-[var(--ink)] mb-4">{t('profile')}</h1>

      <div className="card p-4 flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--teal)] text-white flex items-center justify-center font-extrabold text-lg shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-[var(--ink)] truncate">{displayName || t('profileGuestName')}</p>
          {user?.username && <p className="text-xs text-[var(--muted)] truncate">@{user.username}</p>}
        </div>
      </div>

      <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2 flex items-center gap-1.5">
        <Globe className="w-3.5 h-3.5" />
        {t('language')}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setLanguage('uz')}
          className="rounded-lg py-3 text-sm font-bold border transition-colors"
          style={
            language === 'uz'
              ? { background: 'var(--teal)', color: '#fff', borderColor: 'var(--teal)' }
              : { background: 'var(--surface)', color: 'var(--ink)', borderColor: 'var(--border)' }
          }
        >
          O'zbekcha
        </button>
        <button
          onClick={() => setLanguage('ru')}
          className="rounded-lg py-3 text-sm font-bold border transition-colors"
          style={
            language === 'ru'
              ? { background: 'var(--teal)', color: '#fff', borderColor: 'var(--teal)' }
              : { background: 'var(--surface)', color: 'var(--ink)', borderColor: 'var(--border)' }
          }
        >
          Русский
        </button>
      </div>
    </div>
  );
};
