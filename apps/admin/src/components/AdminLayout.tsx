import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, ShoppingBag, FolderTree, Image as ImageIcon, 
  Wrench, Building2, Handshake, Settings, Bell, LogOut, Globe, Menu, X, 
  CheckCheck, Sun
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPath, onNavigate, children }) => {
  const { user, logout } = useAuth();
  const { leads, notifications, markAllNotificationsRead } = useData();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadLeadsCount = leads.filter(l => !l.isRead).length;
  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { label: 'Boshqaruv', path: '/admin', icon: LayoutDashboard },
    { label: 'So‘rovlar CRM', path: '/admin/leads', icon: Users, badge: unreadLeadsCount },
    { label: 'Mahsulotlar', path: '/admin/products', icon: ShoppingBag },
    { label: 'Kategoriyalar', path: '/admin/categories', icon: FolderTree },
    { label: 'Hero Bosh Banner', path: '/admin/banners', icon: ImageIcon },
    { label: 'Xizmatlar', path: '/admin/services', icon: Wrench },
    { label: 'Loyihalar', path: '/admin/projects', icon: Building2 },
    { label: 'Hamkorlar', path: '/admin/partners', icon: Handshake },
    { label: 'Media Fayllar', path: '/admin/media', icon: ImageIcon },
    { label: 'Sayt Sozlamalari', path: '/admin/settings', icon: Settings },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-zinc-100 flex flex-col lg:flex-row font-sans">
      
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-black/60 border-r border-white/10 flex-shrink-0 min-h-screen sticky top-0 h-screen">
        
        {/* Header Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#064E3B] text-white flex items-center justify-center">
              <Sun className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div>
              <span className="font-editorial text-lg font-light uppercase text-white tracking-wider block leading-none italic">
                TANSO <span className="text-[#F59E0B] font-normal">ADMIN</span>
              </span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mt-1 font-bold">Control Center</span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = currentPath === item.path;

            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive 
                    ? 'bg-[#064E3B] text-white border-l-2 border-[#F59E0B]' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>

                {!!item.badge && item.badge > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-[#F59E0B] text-[#1A1A1A] animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="p-3 bg-[#1A1A1A] border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#064E3B] text-white flex items-center justify-center font-bold text-xs">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full py-2 px-3 bg-[#1A1A1A] border border-white/10 hover:border-rose-800 text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Chiqish</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar */}
        <header className="bg-black/60 border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          
          {/* Left Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 bg-[#1A1A1A] border border-white/10 text-zinc-300"
            >
              <Menu className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F59E0B] hidden sm:inline">
              TANSO SOLAR UZBEKISTAN MANAGEMENT
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* View Public Website */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-[#1A1A1A] border border-white/10 hover:border-[#064E3B] text-zinc-300 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Veb-saytga o‘tish</span>
            </a>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 bg-[#1A1A1A] border border-white/10 text-zinc-300 hover:text-white transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F59E0B] text-[#1A1A1A] text-[10px] font-extrabold flex items-center justify-center">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#1A1A1A] border border-white/10 shadow-2xl z-50 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Xabarnomalar</span>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 font-bold uppercase"
                    >
                      <CheckCheck className="w-3 h-3" />
                      <span>O‘qilgan belgilash</span>
                    </button>
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-zinc-500 text-center py-4 font-light">Xabarlar yo‘q</p>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div 
                          key={n.id}
                          onClick={() => {
                            setNotifDropdownOpen(false);
                            onNavigate('/admin/leads');
                          }}
                          className={`p-2.5 text-xs cursor-pointer transition-colors border border-white/5 ${
                            n.isRead ? 'bg-black/30 text-zinc-400' : 'bg-[#064E3B]/40 text-zinc-200 border-[#064E3B]'
                          }`}
                        >
                          <p className="font-bold text-white">{n.title}</p>
                          <p className="text-[11px] truncate mt-0.5 font-light">{n.message}</p>
                          <span className="text-[10px] text-zinc-500 block mt-1">
                            {new Date(n.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex">
            <div className="w-72 bg-[#1A1A1A] h-full p-5 flex flex-col justify-between border-r border-white/10">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <span className="font-editorial text-base text-white italic">TANSO ADMIN</span>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-zinc-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider ${
                          currentPath === item.path ? 'bg-[#064E3B] text-white' : 'text-zinc-400 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComp className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {!!item.badge && item.badge > 0 && (
                          <span className="px-2 py-0.5 text-[10px] bg-[#F59E0B] text-[#1A1A1A] font-bold">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={logout}
                className="py-2.5 px-4 bg-rose-950/60 text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-800 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Chiqish</span>
              </button>
            </div>
          </div>
        )}

        {/* Inner Page View */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
};
