import React, { useState } from 'react';
import { Plus, Edit, Trash2, FolderTree, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Category } from '../../types';

export const AdminCategories: React.FC = () => {
  const { categories, saveCategory, deleteCategory } = useData();
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  const handleOpenNew = () => {
    setEditingCategory({
      nameUz: '',
      nameRu: '',
      slug: '',
      descriptionUz: '',
      descriptionRu: '',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
      icon: 'Sun',
      productCount: 0,
      sortOrder: categories.length + 1,
      active: true
    });
  };

  const handleSave = () => {
    if (!editingCategory || !editingCategory.nameUz) return;
    saveCategory(editingCategory as Category);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Kategoriyalar boshqaruvi</h1>
          <p className="text-zinc-400 mt-1">Mahsulot guruhlari va navbat tartibi.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 font-bold text-white flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Kategoriya qo‘shish</span>
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
            <tr>
              <th className="p-3.5">Tartib</th>
              <th className="p-3.5">Nomi UZ</th>
              <th className="p-3.5">Nomi RU</th>
              <th className="p-3.5">Slug</th>
              <th className="p-3.5">Aktiv</th>
              <th className="p-3.5 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-800/60">
                <td className="p-3.5 font-mono text-amber-400">{c.sortOrder}</td>
                <td className="p-3.5 font-bold">{c.nameUz}</td>
                <td className="p-3.5 text-zinc-400">{c.nameRu}</td>
                <td className="p-3.5 font-mono text-emerald-400">{c.slug}</td>
                <td className="p-3.5">
                  {c.active ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Aktiv</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-500 border border-zinc-800">Noaktiv</span>
                  )}
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button onClick={() => setEditingCategory(c)} className="p-1.5 rounded bg-zinc-950 border border-zinc-800">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Kategoriyani o‘chirishni tasdiqlaysizmi?')) {
                        deleteCategory(c.id);
                      }
                    }} 
                    className="p-1.5 rounded bg-zinc-950 border border-zinc-800 text-rose-400"
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
        <div className="fixed inset-0 z-50 bg-zinc-950/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
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
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Nomi RU *</label>
                <input
                  type="text"
                  value={editingCategory.nameRu || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, nameRu: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Slug (URL)</label>
                <input
                  type="text"
                  value={editingCategory.slug || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono"
                  placeholder="quyosh-suv-isitgichlari"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Rasm URL</label>
                <input
                  type="text"
                  value={editingCategory.image || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
              <button onClick={() => setEditingCategory(null)} className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800">
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
