import React, { useState } from 'react';
import { Plus, Edit, Trash2, Wrench, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ServiceItem } from '@tanso/shared/types';

export const AdminServices: React.FC = () => {
  const { services, addService, updateService, deleteService } = useData();
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);

  const handleOpenNew = () => {
    setEditingService({
      titleUz: '',
      titleRu: '',
      descUz: '',
      descRu: '',
      active: true,
      sortOrder: services.length + 1
    });
  };

  const handleSave = async () => {
    if (!editingService || !editingService.titleUz) return;
    if (editingService.id) {
      await updateService(editingService.id, editingService);
    } else {
      await addService(editingService as Omit<ServiceItem, 'id'>);
    }
    setEditingService(null);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-editorial font-light text-white italic">Xizmatlar Boshqaruvi</h1>
          <p className="text-zinc-400 mt-1">Konsultatsiya, audit, montaj va servis xizmatlari turlari.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[#064E3B] hover:bg-[#064E3B]/80 font-bold text-white uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Xizmat qo‘shish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-black/40 border border-white/10 p-5 space-y-3">
            <h3 className="font-bold text-white text-base">{s.titleUz}</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">{s.descUz}</p>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-[#F59E0B] font-mono">#{s.sortOrder}</span>
              <div className="space-x-2">
                <button onClick={() => setEditingService(s)} className="p-1.5 bg-black/60 border border-white/10 hover:border-[#064E3B]">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteService(s.id)} className="p-1.5 bg-black/60 border border-white/10 hover:border-rose-800 text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/10 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm">Xizmat ma’lumotlari</h3>
              <button onClick={() => setEditingService(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Nomi UZ *</label>
                <input
                  type="text"
                  value={editingService.titleUz || ''}
                  onChange={(e) => setEditingService({ ...editingService, titleUz: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Nomi RU *</label>
                <input
                  type="text"
                  value={editingService.titleRu || ''}
                  onChange={(e) => setEditingService({ ...editingService, titleRu: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Tavsif UZ</label>
                <textarea
                  rows={3}
                  value={editingService.descUz || ''}
                  onChange={(e) => setEditingService({ ...editingService, descUz: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Tavsif RU</label>
                <textarea
                  rows={3}
                  value={editingService.descRu || ''}
                  onChange={(e) => setEditingService({ ...editingService, descRu: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button onClick={() => setEditingService(null)} className="px-4 py-2 bg-black/60 border border-white/10">
                Bekor qilish
              </button>
              <button onClick={handleSave} className="px-5 py-2 bg-[#064E3B] hover:bg-[#064E3B]/80 font-bold text-white uppercase tracking-wider">
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
