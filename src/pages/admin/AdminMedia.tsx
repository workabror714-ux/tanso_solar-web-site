import React, { useState } from 'react';
import { Image as ImageIcon, Copy, Check, Upload, Trash2 } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState('');

  const sampleMedia = [
    { title: 'Tanso Solar Collector 200L', url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800' },
    { title: 'Commercial Inverter & Panels', url: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800' },
    { title: 'Roof Installation Tashkent', url: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=800' },
  ];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6 text-xs text-white">
      <div>
        <h1 className="text-2xl font-black">Media Fayllar Gallereyasi</h1>
        <p className="text-zinc-400 mt-1">Mahsulotlar va bannerlar uchun rasm havolalari.</p>
      </div>

      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex gap-3">
        <input
          type="text"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          placeholder="Tashqi rasm linkini joylang (URL)..."
          className="flex-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs"
        />
        <button
          onClick={() => {
            if (customUrl) {
              handleCopy(customUrl);
              setCustomUrl('');
            }
          }}
          className="px-4 py-2.5 bg-emerald-600 font-bold rounded-xl text-white flex items-center gap-1.5"
        >
          <Copy className="w-4 h-4" />
          <span>Nusxalash</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleMedia.map((m, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden space-y-3 p-3">
            <img src={m.url} alt="" className="w-full h-40 object-cover rounded-xl bg-zinc-950" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-[11px] truncate">{m.title}</span>
              <button
                onClick={() => handleCopy(m.url)}
                className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 font-bold flex items-center gap-1 text-[10px]"
              >
                {copiedUrl === m.url ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUrl === m.url ? 'Nusxalandi' : 'Copy URL'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
