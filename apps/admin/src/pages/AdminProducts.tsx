import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Search, Image as ImageIcon, Check, X, Eye, EyeOff, Star 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Product, ProductSpec } from '@tanso/shared/types';

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCat === 'ALL' || p.categoryId === selectedCat;
    const matchesQuery = !searchQuery.trim() || 
      p.titleUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.shortDescUz && p.shortDescUz.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const handleOpenNew = () => {
    setEditingProduct({
      categoryId: categories[0]?.id || 'cat-1',
      titleUz: '',
      titleRu: '',
      slug: '',
      shortDescUz: '',
      shortDescRu: '',
      fullDescUz: '',
      fullDescRu: '',
      priceUSD: 500,
      priceUZS: 6500000,
      images: ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'],
      inStock: true,
      featured: false,
      popular: false,
      specs: [
        { id: '1', keyUz: 'Tizim sig’imi', keyRu: 'Емкость системы', valueUz: '200 L', valueRu: '200 Л' }
      ]
    });
  };

  const handleSave = async () => {
    if (!editingProduct || !editingProduct.titleUz) return;
    if (editingProduct.id) {
      await updateProduct(editingProduct.id, editingProduct);
    } else {
      await addProduct(editingProduct as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>);
    }
    setEditingProduct(null);
  };

  const handleAddSpec = () => {
    if (!editingProduct) return;
    const specs = editingProduct.specs || [];
    setEditingProduct({
      ...editingProduct,
      specs: [...specs, { id: `${Date.now()}`, keyUz: '', keyRu: '', valueUz: '', valueRu: '' }]
    });
  };

  const handleUpdateSpec = (index: number, field: keyof ProductSpec, val: string) => {
    if (!editingProduct) return;
    const specs = [...(editingProduct.specs || [])];
    specs[index] = { ...specs[index], [field]: val };
    setEditingProduct({ ...editingProduct, specs });
  };

  const handleRemoveSpec = (index: number) => {
    if (!editingProduct) return;
    const specs = (editingProduct.specs || []).filter((_, i) => i !== index);
    setEditingProduct({ ...editingProduct, specs });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-editorial font-light text-white italic">Mahsulotlar katalogi</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Quyosh suv isitgichlari, panellar, inverterlar va akkumulyatorlar.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[#064E3B] hover:bg-[#064E3B]/80 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 w-fit transition-colors"
          id="btn-add-product"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi mahsulot qo‘shish</span>
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 bg-black/40 border border-white/10 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nomi bo‘yicha qidiruv..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#064E3B]"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="px-3 py-2 text-xs bg-black/60 border border-white/10 text-zinc-200 focus:outline-none focus:border-[#064E3B]"
        >
          <option value="ALL">Barcha kategoriyalar</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.nameUz}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-black/40 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-black/80 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-3.5">Rasm</th>
                <th className="p-3.5">Nomi (UZ)</th>
                <th className="p-3.5">Kategoriya</th>
                <th className="p-3.5">Narxi (USD / UZS)</th>
                <th className="p-3.5">Mavjud</th>
                <th className="p-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredProducts.map((p) => {
                const cat = categories.find(c => c.id === p.categoryId);
                return (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5">
                      <img src={p.images?.[0]} alt="" className="w-10 h-10 object-cover bg-black" />
                    </td>
                    <td className="p-3.5 font-bold text-white">
                      {p.titleUz}
                      {p.featured && (
                        <span className="ml-2 px-1.5 py-0.5 bg-[#064E3B] text-white text-[9px] font-bold">
                          TOP
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-zinc-400">
                      {cat?.nameUz || '-'}
                    </td>
                    <td className="p-3.5 font-extrabold text-emerald-400 font-mono">
                      ${p.priceUSD} / {p.priceUZS ? `${new Intl.NumberFormat().format(p.priceUZS)} UZS` : '-'}
                    </td>
                    <td className="p-3.5">
                      {p.inStock ? (
                        <span className="px-2 py-0.5 bg-[#064E3B]/40 text-emerald-400 border border-[#064E3B] text-[10px]">Mavjud</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-black/60 text-zinc-500 border border-white/10 text-[10px]">Yo'q</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 bg-black/60 border border-white/10 hover:border-[#064E3B] text-zinc-300"
                        title="Tahrirlash"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('O‘chirishni tasdiqlaysizmi?')) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 bg-black/60 border border-white/10 hover:border-rose-800 text-rose-400"
                        title="O‘chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1A1A1A] border border-white/10 w-full max-w-3xl p-6 my-8 space-y-6 text-xs text-white max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold">
                {editingProduct.id ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot yaratish'}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="p-1 text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Nomi (UZ) *</label>
                <input
                  type="text"
                  value={editingProduct.titleUz || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, titleUz: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                  placeholder="TANSO Solar Water Heater 200L"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Nomi (RU) *</label>
                <input
                  type="text"
                  value={editingProduct.titleRu || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, titleRu: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                  placeholder="Солнечный водонагреватель TANSO 200L"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Kategoriya</label>
                <select
                  value={editingProduct.categoryId}
                  onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                  className="w-full p-2.5 bg-black/60 border border-white/10 text-zinc-200"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.nameUz}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Narx (USD)</label>
                <input
                  type="number"
                  value={editingProduct.priceUSD || 0}
                  onChange={(e) => setEditingProduct({ ...editingProduct, priceUSD: Number(e.target.value) })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Narx (UZS)</label>
                <input
                  type="number"
                  value={editingProduct.priceUZS || 0}
                  onChange={(e) => setEditingProduct({ ...editingProduct, priceUZS: Number(e.target.value) })}
                  className="w-full p-2.5 bg-black/60 border border-white/10"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="accent-emerald-500 w-4 h-4"
                  />
                  <span>Mavjud (In Stock)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="accent-emerald-500 w-4 h-4"
                  />
                  <span>TOP (Featured)</span>
                </label>
              </div>
            </div>

            {/* Image URLs list */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Rasm URL manbaasi</label>
              <input
                type="text"
                value={editingProduct.images?.[0] || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                className="w-full p-2.5 bg-black/60 border border-white/10 font-mono text-[11px]"
              />
            </div>

            {/* Specifications builder */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-300 uppercase text-[11px]">Texnik xususiyatlar (Specifications)</span>
                <button
                  onClick={handleAddSpec}
                  className="px-2.5 py-1 bg-black/60 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider"
                >
                  + Qator qo‘shish
                </button>
              </div>

              <div className="space-y-2">
                {editingProduct.specs?.map((sp, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Parametr UZ"
                      value={sp.keyUz}
                      onChange={(e) => handleUpdateSpec(idx, 'keyUz', e.target.value)}
                      className="p-2 bg-black/60 border border-white/10 text-[10px]"
                    />
                    <input
                      type="text"
                      placeholder="Parametr RU"
                      value={sp.keyRu}
                      onChange={(e) => handleUpdateSpec(idx, 'keyRu', e.target.value)}
                      className="p-2 bg-black/60 border border-white/10 text-[10px]"
                    />
                    <input
                      type="text"
                      placeholder="Qiymat UZ"
                      value={sp.valueUz}
                      onChange={(e) => handleUpdateSpec(idx, 'valueUz', e.target.value)}
                      className="p-2 bg-black/60 border border-white/10 text-[10px]"
                    />
                    <div className="flex gap-1">
                      <input
                        type="text"
                        placeholder="Qiymat RU"
                        value={sp.valueRu}
                        onChange={(e) => handleUpdateSpec(idx, 'valueRu', e.target.value)}
                        className="p-2 bg-black/60 border border-white/10 text-[10px] flex-1"
                      />
                      <button onClick={() => handleRemoveSpec(idx)} className="p-1 text-rose-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-black/60 border border-white/10 text-zinc-400"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#064E3B] hover:bg-[#064E3B]/80 font-bold text-white uppercase tracking-wider"
              >
                Saqlash
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
