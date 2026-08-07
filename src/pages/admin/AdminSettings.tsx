import React, { useState } from 'react';
import { Save, Phone, Send, MapPin, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useData();
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 text-xs text-white max-w-4xl">
      <div>
        <h1 className="text-2xl font-black">Sayt Tizim Sozlamalari</h1>
        <p className="text-zinc-400 mt-1">Aloqa ma’lumotlari, Telegram bot sozlamalari hamda manzillar.</p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950 border border-emerald-500/50 text-emerald-300 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-bold">Sozlamalar muvaffaqiyatli saqlandi!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Contact Numbers */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Aloqa telefonlari va Telegram</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Asosiy Telefon 1 *</label>
              <input
                type="text"
                required
                value={formData.phone1}
                onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Qo‘shimcha Telefon 2</label>
              <input
                type="text"
                value={formData.phone2}
                onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Telegram Kanal Linki</label>
              <input
                type="text"
                value={formData.telegramChannel}
                onChange={(e) => setFormData({ ...formData, telegramChannel: e.target.value })}
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Instagram Linki</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono"
              />
            </div>
          </div>
        </div>

        {/* Telegram Bot Integration */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-400" />
              <span>Telegram Bot CRM Bildirishnomasi</span>
            </h3>
            <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-400 text-[10px] font-bold">
              Server-side API
            </span>
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Mijoz so‘rov qoldirganda administrator guruhiga avtomatik Telegram bildirishnomasi borishi uchun Telegram Bot Token va Chat ID kiriting:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Bot Token</label>
              <input
                type="text"
                value={formData.telegramBotToken}
                onChange={(e) => setFormData({ ...formData, telegramBotToken: e.target.value })}
                placeholder="123456789:ABCdefGHI..."
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Telegram Chat / Group ID</label>
              <input
                type="text"
                value={formData.telegramChatId}
                onChange={(e) => setFormData({ ...formData, telegramChatId: e.target.value })}
                placeholder="-100123456789"
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Addresses & Working Hours */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Manzil va Ish Vaqti</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Manzil UZ</label>
              <input
                type="text"
                value={formData.addressUz}
                onChange={(e) => setFormData({ ...formData, addressUz: e.target.value })}
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Manzil RU</label>
              <input
                type="text"
                value={formData.addressRu}
                onChange={(e) => setFormData({ ...formData, addressRu: e.target.value })}
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Ish Vaqti UZ</label>
              <input
                type="text"
                value={formData.workingHoursUz}
                onChange={(e) => setFormData({ ...formData, workingHoursUz: e.target.value })}
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Ish Vaqti RU</label>
              <input
                type="text"
                value={formData.workingHoursRu}
                onChange={(e) => setFormData({ ...formData, workingHoursRu: e.target.value })}
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-950/60"
        >
          <Save className="w-4 h-4" />
          <span>Sozlamalarni saqlash</span>
        </button>

      </form>
    </div>
  );
};
