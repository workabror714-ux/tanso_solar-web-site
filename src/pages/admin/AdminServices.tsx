import React, { useState } from 'react';
import { Plus, Edit, Trash2, Wrench, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ServiceItem } from '../../types';

export const AdminServices: React.FC = () => {
  const { services, saveService, deleteService } = useData();
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);

  const handleOpenNew = () => {
    setEditingService({
      titleUz: '',
      titleRu: '',
      descriptionUz: '',
      descriptionRu: '',
      icon: 'Wrench',
      active: true,
      sortOrder: services.length + 1
    });
  };

  const handleSave = () => {
    if (!editingService || !editingService.titleUz) return;
    saveService(editingService as ServiceItem);
    setEditingService(null);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Xizmatlar Boshqaruvi</h1>
          <p className="text-zinc-400 mt-1">Konsultatsiya, audit, montaj va servis xizmatlari turlari.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 font-bold text-white flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Xizmat qo‘shish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-extrabold text-white text-base">{s.titleUz}</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">{s.descriptionUz}</p>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <span className="text-amber-400 font-mono">#{s.sortOrder}</span>
              <div className="space-x-2">
                <button onClick={() => setEditingService(s)} className="p-1.5 rounded bg-zinc-950 border border-zinc-800">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteService(s.id)} className="p-1.5 rounded bg-zinc-950 border border-zinc-800 text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingService && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
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
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Nomi RU *</label>
                <input
                  type="text"
                  value={editingService.titleRu || ''}
                  onChange={(e) => setEditingService({ ...editingService, titleRu: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Tavsif UZ</label>
                <textarea
                  rows={3}
                  value={editingService.descriptionUz || ''}
                  onChange={(e) => setEditingService({ ...editingService, descriptionUz: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Tavsif RU</label>
                <textarea
                  rows={3}
                  value={editingService.descriptionRu || ''}
                  onChange={(e) => setEditingService({ ...editingService, descriptionRu: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
              <button onClick={() => setEditingService(null)} className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800">
                Bekor qilish
              </button>
              <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-emerald-600 font-bold text-white">
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
