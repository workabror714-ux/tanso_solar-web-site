import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboardHome } from './pages/AdminDashboardHome';
import { AdminLeads } from './pages/AdminLeads';
import { AdminProducts } from './pages/AdminProducts';
import { AdminCategories } from './pages/AdminCategories';
import { AdminBanners } from './pages/AdminBanners';
import { AdminServices } from './pages/AdminServices';
import { AdminProjects } from './pages/AdminProjects';
import { AdminPartners } from './pages/AdminPartners';
import { AdminMedia } from './pages/AdminMedia';
import { AdminSettings } from './pages/AdminSettings';
import { AdminLogin } from './pages/AdminLogin';

const AdminRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/admin');

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-wider font-semibold">Yuklanmoqda...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onNavigate={navigate} />;
  }

  const renderContent = () => {
    switch (currentPath) {
      case '/admin/leads':
        return <AdminLeads />;
      case '/admin/products':
        return <AdminProducts />;
      case '/admin/categories':
        return <AdminCategories />;
      case '/admin/banners':
        return <AdminBanners />;
      case '/admin/services':
        return <AdminServices />;
      case '/admin/projects':
        return <AdminProjects />;
      case '/admin/partners':
        return <AdminPartners />;
      case '/admin/media':
        return <AdminMedia />;
      case '/admin/settings':
        return <AdminSettings />;
      case '/admin':
      default:
        return <AdminDashboardHome onNavigate={navigate} />;
    }
  };

  return (
    <AdminLayout currentPath={currentPath} onNavigate={navigate}>
      {renderContent()}
    </AdminLayout>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <AuthProvider>
          <AdminRouter />
        </AuthProvider>
      </DataProvider>
    </LanguageProvider>
  );
}

export default App;
