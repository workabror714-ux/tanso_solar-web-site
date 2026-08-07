import React, { useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, Video, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { HeroBanner } from '../../types';

export const AdminBanners: React.FC = () => {
  const { banners, saveBanner, deleteBanner } = useData();
  const [editingBanner, setEditingBanner] = useState<Partial<HeroBanner> | null>(null);

  const handleOpenNew = () => {
    setEditingBanner({
      titleUz: 'Quyosh va Issiq Suv Tizimlari',
      titleRu: 'Солнечные Водонагревательные Системы',
      subtitleUz: 'O‘zbekiston bo‘ylab 80% gacha tejamkor energiya uskunalarini montaj qilish',
      subtitleRu: 'Монтаж эффективного оборудования с экономией до 80%',
      ctaTextUz: 'Katalog va Smeta Olis',
      ctaTextRu: 'Получить Каatalog',
      ctaLink: '/catalog',
      bgType: 'image',
      bgUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1920',
      active: true,
      sortOrder: banners.length + 1
    });
  };

  const handleSave = () => {
    if (!editingBanner || !editingBanner.titleUz) return;
    saveBanner(editingBanner as HeroBanner);
    setEditingBanner(null);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Hero Bosh Bannerlar Boshqaruvi</h1>
          <p className="text-zinc-400 mt-1">Homepage bosh parda rasmlari, video foni hamda sarlavhalar slideri.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 font-bold text-white flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Banner qo‘shish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div key={b.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 relative overflow-hidden">
            <div className="relative h-40 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
              <img src={b.bgUrl} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-4 flex flex-col justify-end">
                <span className="text-amber-400 font-bold text-[10px] uppercase">{b.bgType}</span>
                <h3 className="font-extrabold text-white text-sm line-clamp-1">{b.titleUz}</h3>
                <p className="text-[11px] text-zinc-300 line-clamp-1">{b.subtitleUz}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="text-[11px] text-zinc-400">Tartib: <b>#{b.sortOrder}</b></span>
              <div className="space-x-2">
                <button onClick={() => setEditingBanner(b)} className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 font-bold">
                  Tahrirlash
                </button>
                <button onClick={() => deleteBanner(b.id)} className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-rose-400 font-bold">
                  O‘chirish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingBanner && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
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
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Sarlavha RU *</label>
                <input
                  type="text"
                  value={editingBanner.titleRu || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, titleRu: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Kichik Sarlavha UZ</label>
                <input
                  type="text"
                  value={editingBanner.subtitleUz || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subtitleUz: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Kichik Sarlavha RU</label>
                <input
                  type="text"
                  value={editingBanner.subtitleRu || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subtitleRu: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Fon Media URL (Rasm/Video)</label>
                <input
                  type="text"
                  value={editingBanner.bgUrl || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, bgUrl: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
              <button onClick={() => setEditingBanner(null)} className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800">
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
