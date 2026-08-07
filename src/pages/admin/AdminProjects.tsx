import React, { useState } from 'react';
import { Plus, Edit, Trash2, Building2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ProjectItem } from '../../types';

export const AdminProjects: React.FC = () => {
  const { projects, saveProject, deleteProject } = useData();
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);

  const handleOpenNew = () => {
    setEditingProject({
      titleUz: '',
      titleRu: '',
      descriptionUz: '',
      descriptionRu: '',
      location: 'Toshkent shahri',
      capacity: '500 Litr',
      systemType: 'Quyosh suv isitish',
      year: '2024',
      images: ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'],
      active: true
    });
  };

  const handleSave = () => {
    if (!editingProject || !editingProject.titleUz) return;
    saveProject(editingProject as ProjectItem);
    setEditingProject(null);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Bajarilgan Loyihalar Portfolio</h1>
          <p className="text-zinc-400 mt-1">O‘rnatilgan quyosh stantsiyalari va geliotizimlar gallereyasi.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 font-bold text-white flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Loyiha qo‘shish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden space-y-3">
            <img src={p.images[0]} alt="" className="w-full h-40 object-cover bg-zinc-950" />
            <div className="p-4 space-y-2">
              <span className="text-[10px] text-amber-400 font-bold">{p.location} • {p.capacity}</span>
              <h3 className="font-extrabold text-white text-sm">{p.titleUz}</h3>
              <p className="text-zinc-400 text-[11px] line-clamp-2">{p.descriptionUz}</p>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <span className="text-[10px] text-zinc-500">Yil: {p.year}</span>
                <div className="space-x-2">
                  <button onClick={() => setEditingProject(p)} className="p-1.5 rounded bg-zinc-950 border border-zinc-800">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteProject(p.id)} className="p-1.5 rounded bg-zinc-950 border border-zinc-800 text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-sm">Loyiha ma’lumotlari</h3>
              <button onClick={() => setEditingProject(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Sarlavha UZ *</label>
                <input
                  type="text"
                  value={editingProject.titleUz || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, titleUz: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Sarlavha RU *</label>
                <input
                  type="text"
                  value={editingProject.titleRu || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, titleRu: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Joylashuv</label>
                  <input
                    type="text"
                    value={editingProject.location || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Quvvati / Hajmi</label>
                  <input
                    type="text"
                    value={editingProject.capacity || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, capacity: e.target.value })}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Rasm URL</label>
                <input
                  type="text"
                  value={editingProject.images?.[0] || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, images: [e.target.value] })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
              <button onClick={() => setEditingProject(null)} className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800">
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
