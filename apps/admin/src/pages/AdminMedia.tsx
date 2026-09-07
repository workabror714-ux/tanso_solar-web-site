import React, { useEffect, useState } from 'react';
import { Copy, Check, Trash2, RefreshCw, Loader2 } from 'lucide-react';
import { ImageUploader } from '../components/ImageUploader';

interface MediaItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const AdminMedia: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploadValue, setUploadValue] = useState('');

  const loadMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/media');
      const data = await res.json().catch(() => []);
      if (!res.ok) throw new Error((data as any)?.error || 'Media ro‘yxatini olishda xatolik.');
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e.message || 'Media ro‘yxatini olishda xatolik.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  useEffect(() => {
    if (uploadValue) {
      // A new file just finished uploading via the uploader below — refresh the gallery and reset it.
      loadMedia();
      setUploadValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadValue]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (url: string) => {
    if (!confirm('Bu faylni butunlay o‘chirishni tasdiqlaysizmi? Agar u biror mahsulot/kategoriyada ishlatilayotgan bo‘lsa, u yerdagi rasm ham yo‘qoladi.')) return;
    try {
      const res = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error('O‘chirishda xatolik yuz berdi.');
      setItems((prev) => prev.filter((m) => m.url !== url));
    } catch (e: any) {
      alert(e.message || 'O‘chirishda xatolik yuz berdi.');
    }
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-editorial font-light text-white italic">Media Fayllar Gallereyasi</h1>
          <p className="text-zinc-400 mt-1">Kompyuterdan yuklangan rasmlar. Har qanday admin formada ishlatish uchun havolasini nusxalang.</p>
        </div>
        <button
          onClick={loadMedia}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-2 bg-black/60 border border-white/10 hover:border-[#064E3B] font-bold text-white uppercase tracking-wider text-[10px]"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
          <span>Yangilash</span>
        </button>
      </div>

      <div className="p-4 bg-black/40 border border-white/10">
        <ImageUploader label="Yangi rasm yuklash" value={uploadValue} onChange={setUploadValue} />
      </div>

      {error && (
        <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-zinc-400 py-8 justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Yuklanmoqda...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="py-12 text-center text-zinc-500">Hali yuklangan fayl yo‘q. Yuqoridagi tugma orqali birinchi rasmni yuklang.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((m) => (
            <div key={m.url} className="bg-black/40 border border-white/10 overflow-hidden space-y-3 p-3">
              <img src={m.url} alt="" className="w-full h-40 object-cover bg-black" />
              <div className="flex items-center justify-between text-[10px] text-zinc-500">
                <span>{formatSize(m.size)}</span>
                <span>{new Date(m.uploadedAt).toLocaleDateString('uz-UZ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(m.url)}
                  className="flex-1 px-2.5 py-1.5 bg-black/60 border border-white/10 hover:border-[#064E3B] text-emerald-400 font-bold flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider"
                >
                  {copiedUrl === m.url ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUrl === m.url ? 'Nusxalandi' : 'Havolani nusxalash'}</span>
                </button>
                <button
                  onClick={() => handleDelete(m.url)}
                  className="px-2.5 py-1.5 bg-black/60 border border-white/10 hover:border-rose-800 text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
