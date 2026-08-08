import React from 'react';
import { 
  Users, ShoppingBag, FolderTree, AlertCircle, TrendingUp, CheckCircle2, 
  Clock, ArrowUpRight, Phone, MessageSquare 
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface AdminDashboardHomeProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardHome: React.FC<AdminDashboardHomeProps> = ({ onNavigate }) => {
  const { leads, products, categories, services, projects } = useData();

  const totalLeads = leads.length;
  const unreadLeads = leads.filter(l => !l.isRead).length;
  const newLeadsToday = leads.filter(l => {
    const today = new Date().toDateString();
    return new Date(l.createdAt).toDateString() === today;
  }).length;

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.inStock).length;

  const statusCounts = {
    NEW: leads.filter(l => l.status === 'NEW').length,
    CONTACTED: leads.filter(l => l.status === 'CONTACTED').length,
    IN_PROGRESS: leads.filter(l => l.status === 'IN_PROGRESS').length,
    COMPLETED: leads.filter(l => l.status === 'COMPLETED').length,
    CANCELLED: leads.filter(l => l.status === 'CANCELLED').length,
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner Welcome */}
      <div className="p-6 bg-gradient-to-r from-[#064E3B]/80 via-[#1A1A1A] to-[#1A1A1A] border border-[#064E3B] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-editorial font-light text-white italic">Xush kelibsiz, Administrator!</h1>
          <p className="text-xs text-zinc-400 mt-1">
            TANSO SOLAR platformasi boshqaruv paneli va mijozlar so‘rovlari CRM tizimi.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/admin/leads')}
          className="px-5 py-2.5 bg-[#064E3B] hover:bg-[#064E3B]/80 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 w-fit transition-colors"
        >
          <Users className="w-4 h-4" />
          <span>So‘rovlarni ko‘rish ({unreadLeads} yangi)</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Bugungi so‘rovlar</span>
            <Clock className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <p className="text-3xl font-bold text-white font-mono">{newLeadsToday}</p>
          <span className="text-[11px] text-emerald-400 block font-medium">
            Oxirgi 24 soat ichida
          </span>
        </div>

        <div className="p-5 bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>O‘qilmagan so‘rovlar</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-bold text-amber-400 font-mono">{unreadLeads}</p>
          <span className="text-[11px] text-zinc-400 block font-medium">
            Tasdiqlash kutilmoqda
          </span>
        </div>

        <div className="p-5 bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Jami so‘rovlar (CRM)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-white font-mono">{totalLeads}</p>
          <span className="text-[11px] text-zinc-400 block font-medium">
            Barcha kelib tushgan so‘rovlar
          </span>
        </div>

        <div className="p-5 bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Aktiv Mahsulotlar</span>
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-white font-mono">{activeProducts} / {totalProducts}</p>
          <span className="text-[11px] text-zinc-400 block font-medium">
            Katalogdagi mahsulotlar
          </span>
        </div>
      </div>

      {/* CRM Status Breakdown */}
      <div className="bg-black/40 border border-white/10 p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
          So‘rovlar holati bo‘yicha taqsimot
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-black/60 border border-white/10 text-center">
            <span className="text-zinc-500 font-bold block uppercase text-[10px]">Yangi (NEW)</span>
            <span className="text-lg font-bold text-amber-400 block mt-1">{statusCounts.NEW}</span>
          </div>

          <div className="p-3 bg-black/60 border border-white/10 text-center">
            <span className="text-zinc-500 font-bold block uppercase text-[10px]">Bog‘lanildi</span>
            <span className="text-lg font-bold text-blue-400 block mt-1">{statusCounts.CONTACTED}</span>
          </div>

          <div className="p-3 bg-black/60 border border-white/10 text-center">
            <span className="text-zinc-500 font-bold block uppercase text-[10px]">Jarayonda</span>
            <span className="text-lg font-bold text-purple-400 block mt-1">{statusCounts.IN_PROGRESS}</span>
          </div>

          <div className="p-3 bg-black/60 border border-white/10 text-center">
            <span className="text-zinc-500 font-bold block uppercase text-[10px]">Yakunlandi</span>
            <span className="text-lg font-bold text-emerald-500 block mt-1">{statusCounts.COMPLETED}</span>
          </div>

          <div className="p-3 bg-black/60 border border-white/10 text-center">
            <span className="text-zinc-500 font-bold block uppercase text-[10px]">Bekor qilindi</span>
            <span className="text-lg font-bold text-rose-500 block mt-1">{statusCounts.CANCELLED}</span>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-black/40 border border-white/10 space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
            So‘nggi kelib tushgan so‘rovlar
          </h3>
          <button
            onClick={() => onNavigate('/admin/leads')}
            className="text-xs text-[#F59E0B] font-bold hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Barchasini ko‘rish</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-black/80 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-3">Mijoz</th>
                <th className="p-3">Telefon</th>
                <th className="p-3">Mahsulot / Xizmat</th>
                <th className="p-3">Holat</th>
                <th className="p-3">Sana</th>
                <th className="p-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-bold text-white">
                    {lead.fullName}
                    {!lead.isRead && (
                      <span className="ml-2 px-1.5 py-0.5 bg-[#F59E0B] text-[#1A1A1A] text-[9px] font-black uppercase">
                        Yangi
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <a href={`tel:${lead.phone}`} className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {lead.phone}
                    </a>
                  </td>
                  <td className="p-3 max-w-[200px] truncate">
                    {lead.productName || 'Konsultatsiya'}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-black/60 border border-white/10 font-semibold text-[10px]">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-500 text-[11px]">
                    {new Date(lead.createdAt).toLocaleString('uz-UZ')}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onNavigate('/admin/leads')}
                      className="px-2.5 py-1 bg-black/60 border border-white/10 hover:border-[#064E3B] text-zinc-200 text-[11px] font-semibold"
                    >
                      Batafsil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
