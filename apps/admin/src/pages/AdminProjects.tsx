import React, { useState } from 'react';
import { Plus, Edit, Trash2, Building2, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ProjectItem } from '@tanso/shared/types';
import { ImageUploader } from '../components/ImageUploader';

export const AdminProjects: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);

  const handleOpenNew = () => {
    setEditingProject({
      titleUz: '',
      titleRu: '',
      locationUz: 'Toshkent shahri',
      locationRu: 'г. Ташкент',
      capacity: '500 литров',
      year: String(new Date().getFullYear()),
      imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
      featured: false,
      active: true
    });
  };

  const handleSave = async () => {
    if (!editingProject || !editingProject.titleUz) return;
    if (editingProject.id) {
      await updateProject(editingProject.id, editingProject);
    } else {
      await addProject(editingProject as Omit<ProjectItem, 'id'>);
    }
    setEditingProject(null);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-editorial font-light text-white italic">Портфолио выполненных проектов</h1>
          <p className="text-zinc-400 mt-1">Галерея установленных солнечных станций и гелиосистем.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[#064E3B] hover:bg-[#064E3B]/80 font-bold text-white uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить проект</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-black/40 border border-white/10 overflow-hidden space-y-3">
            <img src={p.imageUrl || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'} alt="" className="w-full h-40 object-cover bg-black" />
            <div className="p-4 space-y-2">
              <span className="text-[10px] text-[#F59E0B] font-bold">{p.locationUz} • {p.capacity}</span>
              <h3 className="font-bold text-white text-sm">{p.titleUz}</h3>
              <p className="text-zinc-400 text-[11px]">{p.year || '—'}{p.featured ? ' · TOP' : ''}</p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[10px] text-zinc-500">{p.capacity}</span>
                <div className="space-x-2">
                  <button onClick={() => setEditingProject(p)} className="p-1.5 bg-black/60 border border-white/10 hover:border-[#064E3B]">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteProject(p.id)} className="p-1.5 bg-black/60 border border-white/10 hover:border-rose-800 text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/10 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm">Данные проекта</h3>
              <button onClick={() => setEditingProject(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Заголовок UZ *</label>
                <input
                  type="text"
                  value={editingProject.titleUz || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, titleUz: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Заголовок RU *</label>
                <input
                  type="text"
                  value={editingProject.titleRu || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, titleRu: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Местоположение UZ</label>
                  <input
                    type="text"
                    value={editingProject.locationUz || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, locationUz: e.target.value })}
                    className="w-full p-2.5 bg-black/60 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Местоположение RU</label>
                  <input
                    type="text"
                    value={editingProject.locationRu || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, locationRu: e.target.value })}
                    className="w-full p-2.5 bg-black/60 border border-white/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Мощность / Объём</label>
                  <input
                    type="text"
                    value={editingProject.capacity || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, capacity: e.target.value })}
                    className="w-full p-2.5 bg-black/60 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Год *</label>
                  <input
                    type="text"
                    value={editingProject.year || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full p-2.5 bg-black/60 border border-white/10"
                    placeholder="2026"
                  />
                </div>
              </div>

              <ImageUploader
                label="Изображение"
                value={editingProject.imageUrl || ''}
                onChange={(url) => setEditingProject({ ...editingProject, imageUrl: url })}
              />

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editingProject.featured ?? false}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="accent-emerald-500 w-4 h-4"
                />
                <span>ТОП (Featured)</span>
              </label>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button onClick={() => setEditingProject(null)} className="px-4 py-2 bg-black/60 border border-white/10">
                Отмена
              </button>
              <button onClick={handleSave} className="px-5 py-2 bg-[#064E3B] hover:bg-[#064E3B]/80 font-bold text-white uppercase tracking-wider">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
