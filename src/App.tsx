import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages & Layout
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboardHome } from './pages/admin/AdminDashboardHome';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminBanners } from './pages/admin/AdminBanners';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminPartners } from './pages/admin/AdminPartners';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminSettings } from './pages/admin/AdminSettings';

import { Product } from './types';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  const { isAuthenticated, isLoading } = useAuth();

  // Navigation helper
  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Popstate handle
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenConsultation = (product: Product | null = null) => {
    setSelectedProductForModal(product);
    setLeadModalOpen(true);
  };

  // Check if route is inside admin area
  const isAdminRoute = currentPath.startsWith('/admin');

  if (isAdminRoute) {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (currentPath === '/admin/login') {
      return <AdminLogin onNavigate={handleNavigate} />;
    }

    if (!isAuthenticated) {
      return <AdminLogin onNavigate={handleNavigate} />;
    }

    // Render Admin View inside Layout
    let adminPageContent = <AdminDashboardHome onNavigate={handleNavigate} />;
    if (currentPath === '/admin/leads') adminPageContent = <AdminLeads />;
    else if (currentPath === '/admin/products') adminPageContent = <AdminProducts />;
    else if (currentPath === '/admin/categories') adminPageContent = <AdminCategories />;
    else if (currentPath === '/admin/banners') adminPageContent = <AdminBanners />;
    else if (currentPath === '/admin/services') adminPageContent = <AdminServices />;
    else if (currentPath === '/admin/projects') adminPageContent = <AdminProjects />;
    else if (currentPath === '/admin/partners') adminPageContent = <AdminPartners />;
    else if (currentPath === '/admin/media') adminPageContent = <AdminMedia />;
    else if (currentPath === '/admin/settings') adminPageContent = <AdminSettings />;

    return (
      <AdminLayout currentPath={currentPath} onNavigate={handleNavigate}>
        {adminPageContent}
      </AdminLayout>
    );
  }

  // Render Public Website Page
  const renderPublicPage = () => {
    // Route matching
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '');
      return (
        <ProductDetailPage 
          slug={slug} 
          onNavigate={handleNavigate} 
          onOpenConsultation={handleOpenConsultation} 
        />
      );
    }

    if (currentPath.startsWith('/catalog/')) {
      const catSlug = currentPath.replace('/catalog/', '');
      return (
        <CatalogPage 
          categorySlug={catSlug} 
          onNavigate={handleNavigate} 
          onOpenConsultation={handleOpenConsultation} 
        />
      );
    }

    if (currentPath === '/catalog') {
      return (
        <CatalogPage 
          onNavigate={handleNavigate} 
          onOpenConsultation={handleOpenConsultation} 
        />
      );
    }

    if (currentPath === '/about') {
      return (
        <AboutPage 
          onNavigate={handleNavigate} 
          onOpenConsultation={() => handleOpenConsultation(null)} 
        />
      );
    }

    if (currentPath === '/services') {
      return (
        <ServicesPage 
          onNavigate={handleNavigate} 
          onOpenConsultation={() => handleOpenConsultation(null)} 
        />
      );
    }

    if (currentPath === '/projects') {
      return (
        <ProjectsPage 
          onNavigate={handleNavigate} 
          onOpenConsultation={() => handleOpenConsultation(null)} 
        />
      );
    }

    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // Default HomePage
    return (
      <HomePage 
        onNavigate={handleNavigate} 
        onOpenConsultation={handleOpenConsultation} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500 selection:text-white flex flex-col justify-between font-sans">
      <Header currentPath={currentPath} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        {renderPublicPage()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        product={selectedProductForModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </DataProvider>
    </AuthProvider>
  );
}
