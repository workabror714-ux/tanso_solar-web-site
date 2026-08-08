import React, { useState } from 'react';
import { Plus, Edit, Trash2, Handshake, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PartnerItem } from '@tanso/shared/types';

export const AdminPartners: React.FC = () => {
  const { partners, addPartner, updatePartner, deletePartner } = useData();
  const [editingPartner, setEditingPartner] = useState<Partial<PartnerItem> | null>(null);

  const handleOpenNew = () => {
    setEditingPartner({
      name: '',
      logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=300',
      active: true
    });
  };

  const handleSave = async () => {
    if (!editingPartner || !editingPartner.name) return;
    if (editingPartner.id) {
      await updatePartner(editingPartner.id, editingPartner);
    } else {
      await addPartner(editingPartner as Omit<PartnerItem, 'id'>);
    }
    setEditingPartner(null);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-editorial font-light text-white italic">Hamkorlar va Zavodlar</h1>
          <p className="text-zinc-400 mt-1">Rasmiy ishlab chiqaruvchilar hamkorlik brendlari.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[#064E3B] hover:bg-[#064E3B]/80 font-bold text-white uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Hamkor qo‘shish</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {partners.map((p) => (
          <div key={p.id} className="bg-black/40 border border-white/10 p-4 space-y-2 text-center">
            <h3 className="font-bold text-white text-sm">{p.name}</h3>
            <div className="pt-2 flex justify-center gap-2 border-t border-white/10">
              <button onClick={() => setEditingPartner(p)} className="p-1 bg-black/60 border border-white/10 hover:border-[#064E3B]">
                <Edit className="w-3.5 h-3.5 text-zinc-300" />
              </button>
              <button onClick={() => deletePartner(p.id)} className="p-1 bg-black/60 border border-white/10 hover:border-rose-800 text-rose-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPartner && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/10 w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
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
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Logo URL</label>
                <input
                  type="text"
                  value={editingPartner.logoUrl || ''}
                  onChange={(e) => setEditingPartner({ ...editingPartner, logoUrl: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10 font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button onClick={() => setEditingPartner(null)} className="px-4 py-2 bg-black/60 border border-white/10">
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
