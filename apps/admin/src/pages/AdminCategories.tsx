import React, { useState } from 'react';
import { Plus, Edit, Trash2, FolderTree, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Category } from '@tanso/shared/types';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  const handleOpenNew = () => {
    setEditingCategory({
      nameUz: '',
      nameRu: '',
      slug: '',
      descriptionUz: '',
      descriptionRu: '',
      sortOrder: categories.length + 1,
      active: true
    });
  };

  const handleSave = async () => {
    if (!editingCategory || !editingCategory.nameUz) return;
    if (editingCategory.id) {
      await updateCategory(editingCategory.id, editingCategory);
    } else {
      await addCategory(editingCategory as Omit<Category, 'id'>);
    }
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-editorial font-light text-white italic">Kategoriyalar boshqaruvi</h1>
          <p className="text-zinc-400 mt-1">Mahsulot guruhlari va navbat tartibi.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[#064E3B] hover:bg-[#064E3B]/80 font-bold text-white uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Kategoriya qo‘shish</span>
        </button>
      </div>

      <div className="bg-black/40 border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/80 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
            <tr>
              <th className="p-3.5">Tartib</th>
              <th className="p-3.5">Nomi UZ</th>
              <th className="p-3.5">Nomi RU</th>
              <th className="p-3.5">Slug</th>
              <th className="p-3.5">Aktiv</th>
              <th className="p-3.5 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="p-3.5 font-mono text-[#F59E0B]">{c.sortOrder}</td>
                <td className="p-3.5 font-bold">{c.nameUz}</td>
                <td className="p-3.5 text-zinc-400">{c.nameRu}</td>
                <td className="p-3.5 font-mono text-emerald-400">{c.slug}</td>
                <td className="p-3.5">
                  {c.active ? (
                    <span className="px-2 py-0.5 bg-[#064E3B]/40 text-emerald-400 border border-[#064E3B]">Aktiv</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-black/60 text-zinc-500 border border-white/10">Noaktiv</span>
                  )}
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button onClick={() => setEditingCategory(c)} className="p-1.5 bg-black/60 border border-white/10 hover:border-[#064E3B]">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Kategoriyani o‘chirishni tasdiqlaysizmi?')) {
                        deleteCategory(c.id);
                      }
                    }} 
                    className="p-1.5 bg-black/60 border border-white/10 hover:border-rose-800 text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/10 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm">Kategoriya ma’lumotlari</h3>
              <button onClick={() => setEditingCategory(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Nomi UZ *</label>
                <input
                  type="text"
                  value={editingCategory.nameUz || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, nameUz: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Nomi RU *</label>
                <input
                  type="text"
                  value={editingCategory.nameRu || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, nameRu: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Slug (URL)</label>
                <input
                  type="text"
                  value={editingCategory.slug || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10 font-mono"
                  placeholder="quyosh-suv-isitgichlari"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button onClick={() => setEditingCategory(null)} className="px-4 py-2 bg-black/60 border border-white/10">
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
