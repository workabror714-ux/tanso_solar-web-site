import React, { useRef, useState } from 'react';
import { Upload, Loader2, X, ImageOff } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Faqat rasm fayllari qabul qilinadi.');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Yuklashda xatolik yuz berdi.');
      onChange(data.url);
    } catch (e: any) {
      setError(e.message || 'Yuklashda xatolik yuz berdi.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-[10px] font-bold uppercase text-zinc-400">{label}</label>}
      <div className="flex items-start gap-3">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className={`grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded border bg-black/60 transition-colors ${
            dragOver ? 'border-[#064E3B] bg-[#064E3B]/10' : 'border-white/10'
          }`}
        >
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageOff className="h-5 w-5 text-zinc-600" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#064E3B] hover:bg-[#064E3B]/80 disabled:opacity-50 font-bold text-white uppercase tracking-wider text-[10px]"
            >
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{uploading ? 'Yuklanmoqda...' : 'Kompyuterdan yuklash'}</span>
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="flex items-center gap-1 px-2.5 py-2 bg-black/60 border border-white/10 hover:border-rose-800 text-rose-400 text-[10px] uppercase tracking-wider font-bold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Tozalash</span>
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="yoki tashqi rasm URL manzilini qo‘lda kiriting..."
            className="w-full p-2 bg-black/60 border border-white/10 font-mono text-[10px]"
          />
          {error && <p className="text-[10px] text-rose-400">{error}</p>}
        </div>
      </div>
    </div>
  );
};
