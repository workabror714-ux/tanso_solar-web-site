import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const WebRouter: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<any | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const handleOpenConsultation = (product?: any) => {
    if (product) {
      setSelectedProductForModal(product);
    } else {
      setSelectedProductForModal(null);
    }
    setIsConsultationOpen(true);
  };

  const renderContent = () => {
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '');
      return <ProductDetailPage slug={slug} onNavigate={navigate} onOpenConsultation={handleOpenConsultation} />;
    }

    if (currentPath.startsWith('/catalog/')) {
      const catSlug = currentPath.replace('/catalog/', '');
      return <CatalogPage categorySlug={catSlug} onNavigate={navigate} onOpenConsultation={handleOpenConsultation} />;
    }

    switch (currentPath) {
      case '/catalog':
        return <CatalogPage onNavigate={navigate} onOpenConsultation={handleOpenConsultation} />;
      case '/services':
        return <ServicesPage onNavigate={navigate} onConsult={handleOpenConsultation} />;
      case '/projects':
        return <ProjectsPage onNavigate={navigate} onConsult={handleOpenConsultation} />;
      case '/about':
        return <AboutPage onNavigate={navigate} onConsult={handleOpenConsultation} />;
      case '/contact':
        return <ContactPage onNavigate={navigate} />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} onOpenConsultation={handleOpenConsultation} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col font-sans selection:bg-[#064E3B] selection:text-white">
      <Header 
        currentPath={currentPath} 
        onNavigate={navigate} 
        onOpenConsultation={() => handleOpenConsultation()} 
      />

      <main className="flex-1 pt-20">
        {renderContent()}
      </main>

      <Footer onNavigate={navigate} />

      <LeadModal
        isOpen={isConsultationOpen}
        onClose={() => {
          setIsConsultationOpen(false);
          setSelectedProductForModal(null);
        }}
        product={selectedProductForModal}
      />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <WebRouter />
      </DataProvider>
    </LanguageProvider>
  );
}

export default App;
