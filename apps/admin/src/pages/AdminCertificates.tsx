import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, GripVertical, EyeOff, Award } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Certificate } from '@tanso/shared/types';
import { ImageUploader } from '../components/ImageUploader';

export const AdminCertificates: React.FC = () => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useData();
  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null);

  const sorted = [...certificates].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const handleOpenNew = () => {
    setEditingCert({
      image: '',
      titleUz: '',
      titleRu: '',
      subtitleUz: '',
      subtitleRu: '',
      active: true,
      sortOrder: sorted.length > 0 ? Math.max(...sorted.map((c) => c.sortOrder ?? 0)) + 1 : 1,
    });
  };

  const handleSave = async () => {
    if (!editingCert || !editingCert.image || !editingCert.titleRu) return;
    if (editingCert.id) {
      await updateCertificate(editingCert.id, editingCert);
    } else {
      await addCertificate(editingCert as Omit<Certificate, 'id'>);
    }
    setEditingCert(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Удалить этот сертификат? Действие необратимо.')) return;
    await deleteCertificate(id);
  };

  const toggleActive = async (cert: Certificate) => {
    await updateCertificate(cert.id, { active: !cert.active });
  };

  const moveOrder = async (cert: Certificate, direction: -1 | 1) => {
    const idx = sorted.findIndex((c) => c.id === cert.id);
    const swapWith = sorted[idx + direction];
    if (!swapWith) return;
    await Promise.all([
      updateCertificate(cert.id, { sortOrder: swapWith.sortOrder }),
      updateCertificate(swapWith.id, { sortOrder: cert.sortOrder }),
    ]);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-editorial font-light text-white italic">Сертификаты</h1>
          <p className="text-zinc-400 mt-1">
            Официальные сертификаты завода-производителя на странице «О компании». Слайдер на сайте
            подтягивает этот список автоматически.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[#064E3B] hover:bg-[#064E3B]/80 font-bold text-white uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить сертификат</span>
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="bg-black/40 border border-white/10 p-10 text-center text-zinc-500">
          <Award className="w-8 h-8 mx-auto mb-3 text-zinc-600" />
          Сертификаты ещё не добавлены.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sorted.map((cert, idx) => (
            <div
              key={cert.id}
              className={`bg-black/40 border p-3 space-y-2 ${cert.active ? 'border-white/10' : 'border-white/5 opacity-50'}`}
            >
              <div className="relative h-32 w-full overflow-hidden bg-white rounded">
                {cert.image ? (
                  <img src={cert.image} alt={cert.titleRu} className="h-full w-full object-cover object-top" />
                ) : (
                  <div className="h-full w-full grid place-items-center text-zinc-400">
                    <Award className="w-6 h-6" />
                  </div>
                )}
                {!cert.active && (
                  <div className="absolute inset-0 bg-black/60 grid place-items-center">
                    <EyeOff className="w-5 h-5 text-zinc-300" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-white text-[11px] leading-tight line-clamp-2">{cert.titleRu}</h3>
                <p className="text-zinc-500 text-[10px] mt-0.5 line-clamp-2">{cert.subtitleRu}</p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-1 border-t border-white/10">
                <div className="flex gap-1">
                  <button
                    onClick={() => moveOrder(cert, -1)}
                    disabled={idx === 0}
                    className="p-1 bg-black/60 border border-white/10 hover:border-[#064E3B] disabled:opacity-30 disabled:hover:border-white/10"
                    title="Выше"
                  >
                    <GripVertical className="w-3.5 h-3.5 text-zinc-300 rotate-90" />
                  </button>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleActive(cert)}
                    className={`p-1 bg-black/60 border text-[10px] px-2 font-bold uppercase ${cert.active ? 'border-white/10 text-zinc-300 hover:border-amber-600' : 'border-emerald-800 text-emerald-400'}`}
                    title={cert.active ? 'Скрыть с сайта' : 'Показать на сайте'}
                  >
                    {cert.active ? 'Скрыть' : 'Показать'}
                  </button>
                  <button onClick={() => setEditingCert(cert)} className="p-1 bg-black/60 border border-white/10 hover:border-[#064E3B]">
                    <Edit className="w-3.5 h-3.5 text-zinc-300" />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-1 bg-black/60 border border-white/10 hover:border-rose-800 text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingCert && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1A1A1A] border border-white/10 w-full max-w-lg p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm">{editingCert.id ? 'Редактировать сертификат' : 'Новый сертификат'}</h3>
              <button onClick={() => setEditingCert(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
              <ImageUploader
                label="Изображение сертификата *"
                value={editingCert.image || ''}
                onChange={(url) => setEditingCert({ ...editingCert, image: url })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Название (RU) *</label>
                  <input
                    type="text"
                    value={editingCert.titleRu || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, titleRu: e.target.value })}
                    className="w-full p-2.5 bg-black/60 border border-white/10"
                    placeholder="Например: ISO 9001:2015"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Название (UZ)</label>
                  <input
                    type="text"
                    value={editingCert.titleUz || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, titleUz: e.target.value })}
                    className="w-full p-2.5 bg-black/60 border border-white/10"
                    placeholder="Masalan: ISO 9001:2015"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Подзаголовок (RU)</label>
                  <textarea
                    rows={2}
                    value={editingCert.subtitleRu || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, subtitleRu: e.target.value })}
                    className="w-full p-2.5 bg-black/60 border border-white/10 resize-none"
                    placeholder="Краткое описание сертификата"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Подзаголовок (UZ)</label>
                  <textarea
                    rows={2}
                    value={editingCert.subtitleUz || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, subtitleUz: e.target.value })}
                    className="w-full p-2.5 bg-black/60 border border-white/10 resize-none"
                    placeholder="Sertifikat haqida qisqacha"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingCert.active !== false}
                  onChange={(e) => setEditingCert({ ...editingCert, active: e.target.checked })}
                  className="w-4 h-4 accent-[#064E3B]"
                />
                <span className="text-[11px] font-bold text-zinc-300">Показывать на сайте</span>
              </label>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button onClick={() => setEditingCert(null)} className="px-4 py-2 bg-black/60 border border-white/10">
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={!editingCert.image || !editingCert.titleRu}
                className="px-5 py-2 bg-[#064E3B] hover:bg-[#064E3B]/80 disabled:opacity-40 font-bold text-white uppercase tracking-wider"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
