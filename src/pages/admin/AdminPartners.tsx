import React, { useState } from 'react';
import { Plus, Edit, Trash2, Handshake, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PartnerItem } from '../../types';

export const AdminPartners: React.FC = () => {
  const { partners, savePartner, deletePartner } = useData();
  const [editingPartner, setEditingPartner] = useState<Partial<PartnerItem> | null>(null);

  const handleOpenNew = () => {
    setEditingPartner({
      name: '',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=300',
      website: 'https://tanso.uz',
      active: true,
      sortOrder: partners.length + 1
    });
  };

  const handleSave = () => {
    if (!editingPartner || !editingPartner.name) return;
    savePartner(editingPartner as PartnerItem);
    setEditingPartner(null);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Hamkorlar va Zavodlar</h1>
          <p className="text-zinc-400 mt-1">Rasmiy ishlab chiqaruvchilar hamkorlik brendlari.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 font-bold text-white flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Hamkor qo‘shish</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {partners.map((p) => (
          <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2 text-center">
            <h3 className="font-bold text-white text-sm">{p.name}</h3>
            <p className="text-[10px] text-zinc-500 font-mono">{p.website}</p>
            <div className="pt-2 flex justify-center gap-2 border-t border-zinc-800">
              <button onClick={() => setEditingPartner(p)} className="p-1 rounded bg-zinc-950 border border-zinc-800">
                <Edit className="w-3.5 h-3.5 text-zinc-300" />
              </button>
              <button onClick={() => deletePartner(p.id)} className="p-1 rounded bg-zinc-950 border border-zinc-800 text-rose-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPartner && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-sm">Hamkor ma’lumotlari</h3>
              <button onClick={() => setEditingPartner(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Brend Nomi *</label>
                <input
                  type="text"
                  value={editingPartner.name || ''}
                  onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Veb-sayt URL</label>
                <input
                  type="text"
                  value={editingPartner.website || ''}
                  onChange={(e) => setEditingPartner({ ...editingPartner, website: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
              <button onClick={() => setEditingPartner(null)} className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800">
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
