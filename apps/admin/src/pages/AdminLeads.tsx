import React, { useState, useMemo } from 'react';
import { 
  Users, Search, Filter, Phone, Trash2, CheckCircle2, MessageSquare, 
  X, Calendar, FileText, ChevronRight, Check
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Lead, LeadStatus } from '@tanso/shared/types';

export const AdminLeads: React.FC = () => {
  const { leads, updateLeadStatus, markLeadRead, deleteLead } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  const filteredLeads = useMemo(() => {
    let list = [...leads];

    if (selectedStatus !== 'ALL') {
      list = list.filter(l => l.status === selectedStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(l => 
        l.fullName.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.productName && l.productName.toLowerCase().includes(q)) ||
        (l.comment && l.comment.toLowerCase().includes(q))
      );
    }

    return list;
  }, [leads, selectedStatus, searchQuery]);

  const handleOpenLeadDrawer = (lead: Lead) => {
    setActiveLead(lead);
    setAdminNoteInput(lead.adminNotes || '');
    if (!lead.isRead) {
      markLeadRead(lead.id);
    }
  };

  const handleSaveNotes = () => {
    if (!activeLead) return;
    updateLeadStatus(activeLead.id, activeLead.status, adminNoteInput);
    setActiveLead(prev => prev ? { ...prev, adminNotes: adminNoteInput } : null);
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
    if (activeLead && activeLead.id === leadId) {
      setActiveLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const statusColors: Record<LeadStatus, string> = {
    NEW: 'bg-amber-950/80 text-amber-400 border-amber-800',
    CONTACTED: 'bg-blue-950/80 text-blue-400 border-blue-800',
    IN_PROGRESS: 'bg-purple-950/80 text-purple-400 border-purple-800',
    COMPLETED: 'bg-emerald-950/80 text-emerald-400 border-emerald-800',
    CANCELLED: 'bg-rose-950/80 text-rose-400 border-rose-800',
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-editorial font-light text-white italic">So‘rovlar CRM (Leads)</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Mijozlardan kelib tushgan barcha buyurtmalar va konsultatsiya so‘rovlari.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 bg-black/40 border border-white/10 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mijoz ismi, telefon raqami yoki mahsulot nomi bo‘yicha..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#064E3B]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['ALL', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedStatus === st
                    ? 'bg-[#064E3B] text-white'
                    : 'bg-black/60 border border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                {st === 'ALL' ? 'Barchasi' : st}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-black/40 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-black/80 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-3.5">Mijoz</th>
                <th className="p-3.5">Telefon</th>
                <th className="p-3.5">Mahsulot / Turi</th>
                <th className="p-3.5">Soni</th>
                <th className="p-3.5">Holat</th>
                <th className="p-3.5">Sana</th>
                <th className="p-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-zinc-500">
                    So‘rovlar topilmadi
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className={`hover:bg-white/5 transition-colors ${!lead.isRead ? 'bg-amber-950/20 font-semibold' : ''}`}
                  >
                    <td className="p-3.5 font-bold text-white">
                      {lead.fullName}
                      {!lead.isRead && (
                        <span className="ml-2 px-1.5 py-0.5 bg-[#F59E0B] text-[#1A1A1A] text-[9px] font-black uppercase">
                          Yangi
                        </span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <a href={`tel:${lead.phone}`} className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </a>
                    </td>

                    <td className="p-3.5 max-w-[180px] truncate">
                      {lead.productName || 'Konsultatsiya'}
                    </td>

                    <td className="p-3.5 font-mono">
                      {lead.quantity || 1}
                    </td>

                    <td className="p-3.5">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`px-2.5 py-1 text-[10px] font-bold border ${statusColors[lead.status]} cursor-pointer focus:outline-none bg-black`}
                      >
                        <option value="NEW">NEW (Yangi)</option>
                        <option value="CONTACTED">CONTACTED (Bog‘lanildi)</option>
                        <option value="IN_PROGRESS">IN_PROGRESS (Jarayonda)</option>
                        <option value="COMPLETED">COMPLETED (Yakunlandi)</option>
                        <option value="CANCELLED">CANCELLED (Bekor qilindi)</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-zinc-500 text-[11px]">
                      {new Date(lead.createdAt).toLocaleString('uz-UZ')}
                    </td>

                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenLeadDrawer(lead)}
                        className="px-2.5 py-1 bg-black/60 border border-white/10 hover:border-[#064E3B] text-zinc-200 text-[11px] font-semibold uppercase tracking-wider"
                      >
                        Ko‘rish
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('So‘rovni o‘chirishni tasdiqlaysizmi?')) {
                            deleteLead(lead.id);
                          }
                        }}
                        className="p-1 bg-black/60 border border-white/10 hover:border-rose-800 text-rose-400"
                        title="O‘chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal / Drawer */}
      {activeLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-[#1A1A1A] border-l border-white/10 h-full p-6 overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B]">
                  LEAD DETAILS #{activeLead.id}
                </span>
                <h3 className="text-lg font-bold text-white">{activeLead.fullName}</h3>
              </div>
              <button
                onClick={() => setActiveLead(null)}
                className="p-1.5 bg-black/60 border border-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Phone CTA */}
            <div className="p-4 bg-[#064E3B]/30 border border-[#064E3B] flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block font-semibold">Telefon:</span>
                <span className="text-base font-extrabold text-white font-mono">{activeLead.phone}</span>
              </div>
              <a
                href={`tel:${activeLead.phone}`}
                className="px-4 py-2 bg-[#064E3B] hover:bg-[#064E3B]/80 text-white font-bold text-xs flex items-center gap-1.5 uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Qo‘ng‘iroq qilish</span>
              </a>
            </div>

            {/* Product details */}
            <div className="space-y-3 bg-black/60 p-4 border border-white/10 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-zinc-500">Mahsulot:</span>
                <span className="font-bold text-white">{activeLead.productName || 'Konsultatsiya'}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-zinc-500">Kategoriya:</span>
                <span className="font-semibold text-zinc-300">{activeLead.category || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-zinc-500">Miqdori:</span>
                <span className="font-bold text-[#F59E0B]">{activeLead.quantity || 1} ta</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-zinc-500">Manbaa:</span>
                <span className="text-zinc-400">{activeLead.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Yaratilgan vaqti:</span>
                <span className="text-zinc-400">{new Date(activeLead.createdAt).toLocaleString('uz-UZ')}</span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1.5">
                Mijoz izohi:
              </label>
              <div className="p-3 bg-black/60 border border-white/10 text-xs text-zinc-300 italic">
                {activeLead.comment || 'Izoh biriktirilmagan'}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-zinc-400">
                Ichki administrator eslatmasi (Notes):
              </label>
              <textarea
                rows={4}
                value={adminNoteInput}
                onChange={(e) => setAdminNoteInput(e.target.value)}
                placeholder="Masalan: Mijoz bilan gaplashildi, 12-avgustda joyiga borib o‘rganiladi..."
                className="w-full p-3 bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#064E3B]"
              />
              <button
                onClick={handleSaveNotes}
                className="py-2.5 px-4 bg-[#064E3B] hover:bg-[#064E3B]/80 text-white font-bold text-xs flex items-center justify-center gap-1.5 w-full uppercase tracking-wider"
              >
                <Check className="w-4 h-4" />
                <span>Eslatmani saqlash</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
