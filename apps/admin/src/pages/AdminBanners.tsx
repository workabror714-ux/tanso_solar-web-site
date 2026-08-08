import React, { useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { HeroBanner } from '@tanso/shared/types';

export const AdminBanners: React.FC = () => {
  const { banners, updateBanners } = useData();
  const [editingBanner, setEditingBanner] = useState<Partial<HeroBanner> | null>(null);

  const handleOpenNew = () => {
    setEditingBanner({
      titleUz: 'Quyosh va Issiq Suv Tizimlari',
      titleRu: 'Солнечные Водонагревательные Системы',
      subtitleUz: 'O‘zbekiston bo‘ylab 80% gacha tejamkor energiya uskunalarini montaj qilish',
      subtitleRu: 'Монтаж эффективного оборудования с экономией до 80%',
      buttonTextUz: 'Katalog va Smeta Olish',
      buttonTextRu: 'Получить Каталог',
      buttonLink: '/catalog',
      bgImageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1920',
      active: true,
      sortOrder: banners.length + 1
    });
  };

  const handleSave = async () => {
    if (!editingBanner || !editingBanner.titleUz) return;
    let newBanners = [...banners];
    if (editingBanner.id) {
      newBanners = newBanners.map(b => b.id === editingBanner.id ? { ...b, ...editingBanner } as HeroBanner : b);
    } else {
      newBanners.push({ ...editingBanner, id: `banner-${Date.now()}` } as HeroBanner);
    }
    await updateBanners(newBanners);
    setEditingBanner(null);
  };

  const handleDelete = async (id: string) => {
    const newBanners = banners.filter(b => b.id !== id);
    await updateBanners(newBanners);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-editorial font-light text-white italic">Hero Bosh Bannerlar Boshqaruvi</h1>
          <p className="text-zinc-400 mt-1">Homepage bosh parda rasmlari va sarlavhalar slideri.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[#064E3B] hover:bg-[#064E3B]/80 font-bold text-white uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Banner qo‘shish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div key={b.id} className="bg-black/40 border border-white/10 p-5 space-y-4 relative overflow-hidden">
            <div className="relative h-40 overflow-hidden bg-black border border-white/10">
              <img src={b.bgImageUrl} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end">
                <h3 className="font-bold text-white text-sm line-clamp-1">{b.titleUz}</h3>
                <p className="text-[11px] text-zinc-300 line-clamp-1">{b.subtitleUz}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-[11px] text-zinc-400">Tartib: <b>#{b.sortOrder}</b></span>
              <div className="space-x-2">
                <button onClick={() => setEditingBanner(b)} className="px-3 py-1.5 bg-black/60 border border-white/10 hover:border-[#064E3B] font-bold uppercase tracking-wider">
                  Tahrirlash
                </button>
                <button onClick={() => handleDelete(b.id)} className="px-3 py-1.5 bg-black/60 border border-white/10 text-rose-400 font-bold uppercase tracking-wider">
                  O‘chirish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingBanner && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/10 w-full max-w-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm">Banner sozlamalari</h3>
              <button onClick={() => setEditingBanner(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Sarlavha UZ *</label>
                <input
                  type="text"
                  value={editingBanner.titleUz || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, titleUz: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Sarlavha RU *</label>
                <input
                  type="text"
                  value={editingBanner.titleRu || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, titleRu: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Kichik Sarlavha UZ</label>
                <input
                  type="text"
                  value={editingBanner.subtitleUz || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subtitleUz: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Kichik Sarlavha RU</label>
                <input
                  type="text"
                  value={editingBanner.subtitleRu || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subtitleRu: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Fon Rasm URL</label>
                <input
                  type="text"
                  value={editingBanner.bgImageUrl || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, bgImageUrl: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10 font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button onClick={() => setEditingBanner(null)} className="px-4 py-2 bg-black/60 border border-white/10">
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
