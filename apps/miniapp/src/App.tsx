import React, { useEffect, useState } from 'react';
import { Product } from '@tanso/shared/types';
import { TelegramProvider, useTelegram } from './context/TelegramContext';
import { CartProvider } from './context/CartContext';
import { MiniDataProvider } from './context/MiniDataContext';
import { LanguageProvider } from './context/LanguageContext';
import { BottomNav, TabKey } from './components/BottomNav';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { OrdersPage } from './pages/OrdersPage';
import { ContactPage } from './pages/ContactPage';
import { ProfilePage } from './pages/ProfilePage';

const MiniAppShell: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('catalog');
  const [openProduct, setOpenProduct] = useState<Product | null>(null);
  const { webApp } = useTelegram();

  // Telegram's native BackButton closes the product detail view when open,
  // mirroring how a normal browser back-button/swipe would behave.
  useEffect(() => {
    if (!webApp?.BackButton) return;

    const handleBack = () => setOpenProduct(null);

    if (openProduct) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(handleBack);
    } else {
      webApp.BackButton.hide();
    }

    return () => {
      webApp.BackButton.offClick?.(handleBack);
    };
  }, [openProduct, webApp]);

  const goToTab = (nextTab: TabKey) => {
    setOpenProduct(null);
    setTab(nextTab);
  };

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {openProduct ? (
        <ProductPage
          product={openProduct}
          onBack={() => setOpenProduct(null)}
          onGoToCart={() => goToTab('cart')}
        />
      ) : (
        <>
          {tab === 'catalog' && <CatalogPage onOpenProduct={setOpenProduct} />}
          {tab === 'cart' && <CartPage onBrowse={() => goToTab('catalog')} />}
          {tab === 'orders' && <OrdersPage />}
          {tab === 'contact' && <ContactPage />}
          {tab === 'profile' && <ProfilePage />}
          <BottomNav active={tab} onChange={goToTab} />
        </>
      )}
    </div>
  );
};

const MiniApp: React.FC = () => {
  return (
    <TelegramProvider>
      <LanguageProvider>
        <MiniDataProvider>
          <CartProvider>
            <MiniAppShell />
          </CartProvider>
        </MiniDataProvider>
      </LanguageProvider>
    </TelegramProvider>
  );
};

export default MiniApp;
