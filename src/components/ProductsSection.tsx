import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Zap, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  SlidersHorizontal,
  Eye,
  ShoppingBag
} from 'lucide-react';
import { Product, Language } from '../types';
import { productsData } from '../data/mockData';
import { translations } from '../data/translations';

interface ProductsSectionProps {
  currentLang: Language;
  onSelectProduct: (product: Product) => void;
  onQuickQuote: (productName: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  currentLang,
  onSelectProduct,
  onQuickQuote
}) => {
  const t = translations[currentLang];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'panels', label: t.catPanels },
    { id: 'inverters', label: t.catInverters },
    { id: 'batteries', label: t.catBatteries },
    { id: 'heaters', label: t.catHeaters },
    { id: 'turnkey', label: t.catTurnkey }
  ];

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description[currentLang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-cyan-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-bold mb-3 border border-cyan-200/50 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-cyan-600" />
              <span>Sertifikatlangan Mahsulotlar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
              {t.productsTitle}
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              {t.productsSubtitle}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0E7490] text-white shadow-lg shadow-cyan-900/20'
                  : 'bg-white/70 backdrop-blur-md hover:bg-white text-slate-700 border border-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-[32px] bg-white/75 backdrop-blur-xl border border-white/80 hover:border-cyan-500/50 shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Product Thumbnail Container */}
                  <div className="relative h-60 bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0E7490] text-white text-[10px] font-extrabold tracking-wider uppercase shadow-md">
                        {product.badge[currentLang]}
                      </span>
                    )}

                    {/* Category Tag */}
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-semibold border border-slate-700/60">
                      {product.categoryLabel[currentLang]}
                    </span>

                    {/* Efficiency or Power Pill */}
                    {product.powerRating && (
                      <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow-md">
                        {product.powerRating}
                      </span>
                    )}
                  </div>

                  {/* Product Details Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:text-cyan-700 transition-colors line-clamp-2 font-display">
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {product.description[currentLang]}
                    </p>

                    {/* Spec Chips */}
                    <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-100">
                      {product.efficiency && (
                        <span className="px-3 py-1 rounded-full bg-slate-100/90 text-slate-700 text-[11px] font-semibold">
                          ⚡ {t.efficiencyLabel}: <strong>{product.efficiency}</strong>
                        </span>
                      )}
                      {product.warranty && (
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-100">
                          🛡️ {product.warranty}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-slate-100/80 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>{t.viewDetails}</span>
                  </button>

                  <button
                    onClick={() => onQuickQuote(product.name)}
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-xs shadow-md shadow-cyan-900/10 transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{t.quickQuote}</span>
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white/70 backdrop-blur-md rounded-[32px] border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium">Ushbu so'rov bo'yicha hech qanday mahsulot topilmadi.</p>
          </div>
        )}

      </div>
    </section>
  );
};
