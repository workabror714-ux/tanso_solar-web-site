import React, { useEffect, useState } from 'react';
import { ClipboardList, CheckCircle2 } from 'lucide-react';
import { getStoredOrders, StoredOrder } from '../utils/orders';
import { useLanguage } from '../context/LanguageContext';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  if (orders.length === 0) {
    return (
      <div className="px-4 pt-16 pb-24 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--teal-tint)] flex items-center justify-center mb-4">
          <ClipboardList className="w-7 h-7 text-[var(--teal-dark)]" />
        </div>
        <h2 className="text-base font-bold text-[var(--ink)] mb-1">{t('noOrdersTitle')}</h2>
        <p className="text-sm text-[var(--muted)] max-w-xs">{t('noOrdersMsg')}</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-24">
      <h1 className="text-lg font-extrabold text-[var(--ink)] mb-4">{t('myOrders')}</h1>
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
            <p className="text-xs text-[var(--muted)] pt-2 border-t border-[var(--border)]">
              {t('managerWillCall', { phone: order.phone })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
