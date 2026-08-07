import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Search, Image as ImageIcon, Check, X, Eye, EyeOff, Star 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Product, SpecificationItem } from '../../types';

export const AdminProducts: React.FC = () => {
  const { products, categories, saveProduct, deleteProduct } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCat === 'ALL' || p.categoryId === selectedCat;
    const matchesQuery = !searchQuery.trim() || 
      p.nameUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.capacity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleOpenNew = () => {
    setEditingProduct({
      categoryId: categories[0]?.id || '1',
      nameUz: '',
      nameRu: '',
      slug: '',
      shortDescriptionUz: '',
      shortDescriptionRu: '',
      descriptionUz: '',
      descriptionRu: '',
      price: 0,
      showPrice: true,
      images: ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'],
      capacity: '200 Litr',
      power: '2.0 kW',
      warrantyUz: '5 Yil Rasmiy Kafolat',
      warrantyRu: '5 Лет Гарантии',
      availability: 'in_stock',
      active: true,
      featured: false,
      specifications: [
        { keyUz: 'Tizim sig’imi', keyRu: 'Емкость системы', valueUz: '200 L', valueRu: '200 Л' },
        { keyUz: 'Vakum naylar', keyRu: 'Вакуумные трубки', valueUz: '20 ta', valueRu: '20 шт' }
      ],
      featuresUz: ['Yuqori samaradorlik'],
      featuresRu: ['Высокая эффективность']
    });
  };

  const handleSave = () => {
    if (!editingProduct || !editingProduct.nameUz) return;
    saveProduct(editingProduct as Product);
    setEditingProduct(null);
  };

  const handleAddSpec = () => {
    if (!editingProduct) return;
    const specs = editingProduct.specifications || [];
    setEditingProduct({
      ...editingProduct,
      specifications: [...specs, { keyUz: '', keyRu: '', valueUz: '', valueRu: '' }]
    });
  };

  const handleUpdateSpec = (index: number, field: keyof SpecificationItem, val: string) => {
    if (!editingProduct) return;
    const specs = [...(editingProduct.specifications || [])];
    specs[index] = { ...specs[index], [field]: val };
    setEditingProduct({ ...editingProduct, specifications: specs });
  };

  const handleRemoveSpec = (index: number) => {
    if (!editingProduct) return;
    const specs = (editingProduct.specifications || []).filter((_, i) => i !== index);
    setEditingProduct({ ...editingProduct, specifications: specs });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Mahsulotlar katalogi</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Quyosh suv isitgichlari, panellar, inverterlar va akkumulyatorlar.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg w-fit"
          id="btn-add-product"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi mahsulot qo‘shish</span>
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nomi bo‘yicha qidiruv..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="ALL">Barcha kategoriyalar</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.nameUz}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="p-3.5">Rasm</th>
                <th className="p-3.5">Nomi (UZ)</th>
                <th className="p-3.5">Kategoriya</th>
                <th className="p-3.5">Hajmi</th>
                <th className="p-3.5">Narxi</th>
                <th className="p-3.5">Aktiv</th>
                <th className="p-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredProducts.map((p) => {
                const cat = categories.find(c => c.id === p.categoryId);
                return (
                  <tr key={p.id} className="hover:bg-zinc-800/60 transition-colors">
                    <td className="p-3.5">
                      <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-zinc-950" />
                    </td>
                    <td className="p-3.5 font-bold text-white">
                      {p.nameUz}
                      {p.featured && (
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold">
                          TOP
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-zinc-400">
                      {cat?.nameUz || '-'}
                    </td>
                    <td className="p-3.5 font-mono text-amber-400">
                      {p.capacity}
                    </td>
                    <td className="p-3.5 font-extrabold text-emerald-400">
                      {p.showPrice && p.price ? `${new Intl.NumberFormat().format(p.price)} SO‘M` : 'So‘rov bo‘yicha'}
                    </td>
                    <td className="p-3.5">
                      {p.active ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">Aktiv</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-500 border border-zinc-800 text-[10px]">Noaktiv</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 rounded bg-zinc-950 border border-zinc-800 hover:border-emerald-500 text-zinc-300"
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
                        className="p-1.5 rounded bg-zinc-950 border border-zinc-800 hover:border-rose-800 text-rose-400"
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
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl p-6 my-8 space-y-6 text-xs text-white max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
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
                  value={editingProduct.nameUz || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, nameUz: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                  placeholder="TANSO Solar Water Heater 200L"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Nomi (RU) *</label>
                <input
                  type="text"
                  value={editingProduct.nameRu || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, nameRu: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                  placeholder="Солнечный водонагреватель TANSO 200L"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Kategoriya</label>
                <select
                  value={editingProduct.categoryId}
                  onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.nameUz}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Hajmi / Sig’imi</label>
                <input
                  type="text"
                  value={editingProduct.capacity || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, capacity: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                  placeholder="200 Litr"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Narx (SO‘M)</label>
                <input
                  type="number"
                  value={editingProduct.price || 0}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.showPrice ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, showPrice: e.target.checked })}
                    className="accent-emerald-500 w-4 h-4"
                  />
                  <span>Narxni ko‘rsatish</span>
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

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.active ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, active: e.target.checked })}
                    className="accent-emerald-500 w-4 h-4"
                  />
                  <span>Aktiv</span>
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
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-[11px]"
              />
            </div>

            {/* Specifications builder */}
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-300 uppercase text-[11px]">Texnik xususiyatlar (Specifications)</span>
                <button
                  onClick={handleAddSpec}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold"
                >
                  + Qator qo‘shish
                </button>
              </div>

              <div className="space-y-2">
                {editingProduct.specifications?.map((sp, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Parametr UZ"
                      value={sp.keyUz}
                      onChange={(e) => handleUpdateSpec(idx, 'keyUz', e.target.value)}
                      className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-[10px]"
                    />
                    <input
                      type="text"
                      placeholder="Parametr RU"
                      value={sp.keyRu}
                      onChange={(e) => handleUpdateSpec(idx, 'keyRu', e.target.value)}
                      className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-[10px]"
                    />
                    <input
                      type="text"
                      placeholder="Qiymat UZ"
                      value={sp.valueUz}
                      onChange={(e) => handleUpdateSpec(idx, 'valueUz', e.target.value)}
                      className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-[10px]"
                    />
                    <div className="flex gap-1">
                      <input
                        type="text"
                        placeholder="Qiymat RU"
                        value={sp.valueRu}
                        onChange={(e) => handleUpdateSpec(idx, 'valueRu', e.target.value)}
                        className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-[10px] flex-1"
                      />
                      <button onClick={() => handleRemoveSpec(idx)} className="p-1 text-rose-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-lg"
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
