import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Category, Product, HeroBanner, Service, Project, Partner, SiteSettings, Lead, AdminNotification, LeadStatus 
} from '../types';
import { 
  initialCategories, initialProducts, initialHeroBanners, initialServices, 
  initialProjects, initialPartners, initialSiteSettings, initialLeads 
} from '../data/initialData';

interface DataContextType {
  categories: Category[];
  products: Product[];
  banners: HeroBanner[];
  services: Service[];
  projects: Project[];
  partners: Partner[];
  settings: SiteSettings;
  leads: Lead[];
  notifications: AdminNotification[];
  isLoading: boolean;
  
  // Actions
  createLead: (leadData: Partial<Lead>) => Promise<{ success: boolean; lead?: Lead; error?: string }>;
  updateLeadStatus: (id: string, status: LeadStatus, adminNotes?: string) => Promise<void>;
  markLeadRead: (id: string) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;

  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  updateBanners: (banners: HeroBanner[]) => Promise<void>;

  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  addPartner: (partner: Omit<Partner, 'id'>) => Promise<void>;
  updatePartner: (id: string, partner: Partial<Partner>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;

  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [banners, setBanners] = useState<HeroBanner[]>(initialHeroBanners);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch initial data from API server
  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const [
        resCats, resProds, resBanners, resServs, resProjs, resParts, resSetts, resLeads, resNotifs
      ] = await Promise.all([
        fetch('/api/categories').then(r => r.ok ? r.json() : null),
        fetch('/api/products').then(r => r.ok ? r.json() : null),
        fetch('/api/banners').then(r => r.ok ? r.json() : null),
        fetch('/api/services').then(r => r.ok ? r.json() : null),
        fetch('/api/projects').then(r => r.ok ? r.json() : null),
        fetch('/api/partners').then(r => r.ok ? r.json() : null),
        fetch('/api/settings').then(r => r.ok ? r.json() : null),
        fetch('/api/leads').then(r => r.ok ? r.json() : null),
        fetch('/api/notifications').then(r => r.ok ? r.json() : null),
      ]);

      if (resCats) setCategories(resCats);
      if (resProds) setProducts(resProds);
      if (resBanners) setBanners(resBanners);
      if (resServs) setServices(resServs);
      if (resProjs) setProjects(resProjs);
      if (resParts) setPartners(resParts);
      if (resSetts) setSettings(resSetts);
      if (resLeads) setLeads(resLeads);
      if (resNotifs) setNotifications(resNotifs);
    } catch (err) {
      console.warn('API fetch error, falling back to initial data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Lead Actions
  const createLead = async (leadData: Partial<Lead>) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads(prev => [data.lead, ...prev]);
        setNotifications(prev => [{
          id: `notif-${data.lead.id}`,
          leadId: data.lead.id,
          title: 'Yangi so‘rov kelib tushdi',
          message: `${data.lead.fullName} - ${data.lead.productName || 'Konsultatsiya'}`,
          createdAt: data.lead.createdAt,
          isRead: false
        }, ...prev]);
        return { success: true, lead: data.lead };
      }
      return { success: false, error: data.error || 'Xatolik yuz berdi' };
    } catch (err: any) {
      // Local fallback
      const fallbackLead: Lead = {
        id: `lead-${Date.now()}`,
        type: leadData.type || 'consultation',
        fullName: leadData.fullName || 'Mijoz',
        phone: leadData.phone || '',
        productId: leadData.productId,
        productName: leadData.productName,
        category: leadData.category,
        quantity: leadData.quantity || 1,
        comment: leadData.comment || '',
        source: leadData.source || '/',
        status: 'NEW',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isRead: false
      };
      setLeads(prev => [fallbackLead, ...prev]);
      return { success: true, lead: fallbackLead };
    }
  };

  const updateLeadStatus = async (id: string, status: LeadStatus, adminNotes?: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status, adminNotes: adminNotes !== undefined ? adminNotes : l.adminNotes, updatedAt: new Date().toISOString() } : l));
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });
    } catch (e) {}
  };

  const markLeadRead = async (id: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, isRead: true } : l));
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true })
      });
    } catch (e) {}
  };

  const deleteLead = async (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    } catch (e) {}
  };

  // Product Actions
  const addProduct = async (prodData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prodData)
      });
      const newProd = await res.json();
      setProducts(prev => [newProd, ...prev]);
    } catch (e) {
      const fallbackProd: Product = {
        ...prodData,
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProducts(prev => [fallbackProd, ...prev]);
    }
  };

  const updateProduct = async (id: string, prodData: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...prodData, updatedAt: new Date().toISOString() } : p));
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prodData)
      });
    } catch (e) {}
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch (e) {}
  };

  // Category Actions
  const addCategory = async (catData: Omit<Category, 'id'>) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData)
      });
      const newCat = await res.json();
      setCategories(prev => [...prev, newCat]);
    } catch (e) {
      setCategories(prev => [...prev, { ...catData, id: `cat-${Date.now()}` }]);
    }
  };

  const updateCategory = async (id: string, catData: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...catData } : c));
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData)
      });
    } catch (e) {}
  };

  const deleteCategory = async (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    } catch (e) {}
  };

  // Banner Actions
  const updateBanners = async (newBanners: HeroBanner[]) => {
    setBanners(newBanners);
    try {
      await fetch('/api/banners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBanners)
      });
    } catch (e) {}
  };

  // Service Actions
  const addService = async (servData: Omit<Service, 'id'>) => {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servData)
      });
      const newServ = await res.json();
      setServices(prev => [...prev, newServ]);
    } catch (e) {
      setServices(prev => [...prev, { ...servData, id: `serv-${Date.now()}` }]);
    }
  };

  const updateService = async (id: string, servData: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...servData } : s));
    try {
      await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servData)
      });
    } catch (e) {}
  };

  const deleteService = async (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
    } catch (e) {}
  };

  // Project Actions
  const addProject = async (projData: Omit<Project, 'id'>) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projData)
      });
      const newProj = await res.json();
      setProjects(prev => [newProj, ...prev]);
    } catch (e) {
      setProjects(prev => [{ ...projData, id: `proj-${Date.now()}` }, ...prev]);
    }
  };

  const updateProject = async (id: string, projData: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...projData } : p));
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projData)
      });
    } catch (e) {}
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    } catch (e) {}
  };

  // Partner Actions
  const addPartner = async (partData: Omit<Partner, 'id'>) => {
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partData)
      });
      const newPart = await res.json();
      setPartners(prev => [...prev, newPart]);
    } catch (e) {
      setPartners(prev => [...prev, { ...partData, id: `part-${Date.now()}` }]);
    }
  };

  const updatePartner = async (id: string, partData: Partial<Partner>) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...partData } : p));
    try {
      await fetch(`/api/partners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partData)
      });
    } catch (e) {}
  };

  const deletePartner = async (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/partners/${id}`, { method: 'DELETE' });
    } catch (e) {}
  };

  // Settings Actions
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
    } catch (e) {}
  };

  const markAllNotificationsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    try {
      await fetch('/api/notifications/read-all', { method: 'PATCH' });
    } catch (e) {}
  };

  return (
    <DataContext.Provider value={{
      categories, products, banners, services, projects, partners, settings, leads, notifications, isLoading,
      createLead, updateLeadStatus, markLeadRead, deleteLead,
      addProduct, updateProduct, deleteProduct,
      addCategory, updateCategory, deleteCategory,
      updateBanners,
      addService, updateService, deleteService,
      addProject, updateProject, deleteProject,
      addPartner, updatePartner, deletePartner,
      updateSettings, markAllNotificationsRead
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
