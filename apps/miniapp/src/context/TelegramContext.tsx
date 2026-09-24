import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Thin wrapper around the Telegram WebApp JS SDK (loaded globally via
 * <script src="https://telegram.org/js/telegram-web-app.js"> in index.html).
 * Every call is guarded so the mini app also renders fine as a plain page
 * in a normal browser (useful for local preview / testing outside Telegram).
 */

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramContextType {
  isTelegram: boolean;
  user: TelegramUser | null;
  webApp: any | null;
  haptic: (style?: 'light' | 'medium' | 'heavy') => void;
}

const TelegramContext = createContext<TelegramContextType>({
  isTelegram: false,
  user: null,
  webApp: null,
  haptic: () => {},
});

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webApp, setWebApp] = useState<any | null>(null);

  useEffect(() => {
    const wa = (window as any)?.Telegram?.WebApp;
    if (!wa) return;

    try {
      wa.ready();
      wa.expand();
      wa.setHeaderColor?.('#10211B');
      wa.setBackgroundColor?.('#FAF8F4');
      wa.enableClosingConfirmation?.();
    } catch {
      // Older Bot API clients may not support every method — safe to ignore.
    }

    setWebApp(wa);
  }, []);

  const value = useMemo<TelegramContextType>(() => ({
    isTelegram: !!webApp,
    user: webApp?.initDataUnsafe?.user || null,
    webApp,
    haptic: (style: 'light' | 'medium' | 'heavy' = 'light') => {
      try {
        webApp?.HapticFeedback?.impactOccurred?.(style);
      } catch {
        // no-op outside Telegram
      }
    },
  }), [webApp]);

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>;
};

export const useTelegram = () => useContext(TelegramContext);
