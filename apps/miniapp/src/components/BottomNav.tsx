import React from 'react';
import { LayoutGrid, ShoppingCart, Phone, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export type TabKey = 'catalog' | 'cart' | 'contact' | 'profile';

interface BottomNavProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
  const { totalQty } = useCart();
  const { t } = useLanguage();

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'catalog', label: t('catalog'), icon: <LayoutGrid className="w-5 h-5" /> },
    { key: 'cart', label: t('cart'), icon: <ShoppingCart className="w-5 h-5" /> },
    { key: 'contact', label: t('contact'), icon: <Phone className="w-5 h-5" /> },
    { key: 'profile', label: t('profile'), icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)] border-t border-[var(--border)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-4">
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className="relative flex flex-col items-center justify-center gap-1 py-2.5 transition-colors"
              style={{ color: isActive ? 'var(--teal)' : 'var(--muted)' }}
            >
              <span className="relative">
                {tab.icon}
                {tab.key === 'cart' && totalQty > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[var(--amber)] text-white text-[10px] font-bold flex items-center justify-center">
                    {totalQty}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-semibold">{tab.label}</span>
              {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[var(--teal)]" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
