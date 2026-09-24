import React, { createContext, useContext, useEffect, useState } from 'react';
import { Category, Product, SiteSettings, Lead } from '@tanso/shared/types';
import { initialCategories, initialProducts, initialSiteSettings } from '@tanso/shared/data/initialData';

/**
 * Reads from the exact same /api/categories, /api/products, /api/settings
 * endpoints the public site and admin panel use. There is no separate bot
 * database or duplicated content: when a product is marked out of stock,
 * edited, or removed in the admin panel, this mini app reflects it on the
 * next fetch — no manual sync step anywhere.
 */

interface MiniDataContextType {
  categories: Category[];
  products: Product[];
  settings: SiteSettings;
  isLoading: boolean;
  refresh: () => Promise<void>;
  createLead: (leadData: Partial<Lead>) => Promise<{ success: boolean; error?: string }>;
}

const MiniDataContext = createContext<MiniDataContextType | undefined>(undefined);

export const MiniDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      const [resCats, resProds, resSettings] = await Promise.all([
        fetch('/api/categories').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/products').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/settings').then((r) => (r.ok ? r.json() : null)),
      ]);
      if (Array.isArray(resCats) && resCats.length) setCategories(resCats);
      if (Array.isArray(resProds) && resProds.length) setProducts(resProds);
      if (resSettings) setSettings(resSettings);
    } catch (err) {
      console.error('[MiniApp] Failed to load live data, using fallback.', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const createLead = async (leadData: Partial<Lead>) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data?.error || 'Xatolik yuz berdi.' };
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Internet aloqasi bilan muammo.' };
    }
  };

  return (
    <MiniDataContext.Provider value={{ categories, products, settings, isLoading, refresh: fetchAll, createLead }}>
      {children}
    </MiniDataContext.Provider>
  );
};

export const useMiniData = () => {
  const ctx = useContext(MiniDataContext);
  if (!ctx) throw new Error('useMiniData must be used within MiniDataProvider');
  return ctx;
};
