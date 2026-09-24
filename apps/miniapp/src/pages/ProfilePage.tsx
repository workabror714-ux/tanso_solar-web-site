import React, { useEffect, useState } from 'react';
import { Globe, ClipboardList, CheckCircle2, Phone, ExternalLink } from 'lucide-react';
import { useTelegram } from '../context/TelegramContext';
import { useLanguage } from '../context/LanguageContext';
import { getStoredOrders, StoredOrder } from '../utils/orders';

export const ProfilePage: React.FC = () => {
  const { user } = useTelegram();
  const { language, setLanguage, t } = useLanguage();
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  const displayName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : t('profileGuestName');
  const initial = (user?.first_name || t('profileGuestName')).charAt(0).toUpperCase();

  return (
    <div className="px-4 pt-4 pb-24">
      <h1 className="text-lg font-extrabold text-[var(--ink)] mb-4">{t('profile')}</h1>

      {/* Identity */}
      <div className="card p-4 flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--teal)] text-white flex items-center justify-center font-extrabold text-lg shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-[var(--ink)] truncate">{displayName || t('profileGuestName')}</p>
          {user?.username && <p className="text-xs text-[var(--muted)] truncate">@{user.username}</p>}
        </div>
      </div>

      {/* Language */}
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2 flex items-center gap-1.5">
        <Globe className="w-3.5 h-3.5" />
        {t('language')}
      </p>
      <div className="grid grid-cols-2 gap-2 mb-6">
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

      {/* Quick links */}
      <div className="flex flex-col gap-2 mb-6">
        <a href="https://tanso-solar.uz" target="_blank" rel="noopener noreferrer" className="card-interactive p-3.5 flex items-center gap-3">
          <div className="grid place-items-center w-9 h-9 rounded-md bg-[var(--teal-tint)] text-[var(--teal-dark)] shrink-0">
            <ExternalLink className="w-4.5 h-4.5" />
          </div>
          <p className="font-bold text-[var(--ink)] text-sm">{t('goToWebsite')}</p>
        </a>
      </div>

      {/* Order history (moved here from its own bottom-nav tab) */}
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2 flex items-center gap-1.5">
        <ClipboardList className="w-3.5 h-3.5" />
        {t('myOrders')}
      </p>

      {orders.length === 0 ? (
        <div className="card p-5 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--teal-tint)] flex items-center justify-center mb-3">
            <ClipboardList className="w-5.5 h-5.5 text-[var(--teal-dark)]" />
          </div>
          <p className="text-sm font-bold text-[var(--ink)] mb-1">{t('noOrdersTitle')}</p>
          <p className="text-xs text-[var(--muted)]">{t('noOrdersMsg')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div key={order.id} className="card p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="badge badge-teal">
                  <CheckCircle2 className="w-3 h-3" />
                  {t('sent')}
                </span>
                <span className="text-[11px] text-[var(--muted)] font-mono-num">
                  {new Date(order.createdAt).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </span>
              </div>
              <div className="flex flex-col gap-1 mb-2">
                {order.items.map((it, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-[var(--ink)]">{it.title}</span>
                    <span className="font-mono-num font-semibold text-[var(--muted)]">x{it.qty}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--muted)] pt-2 border-t border-[var(--border)] flex items-center gap-1.5">
                <Phone className="w-3 h-3 shrink-0" />
                {t('managerWillCall', { phone: order.phone })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
