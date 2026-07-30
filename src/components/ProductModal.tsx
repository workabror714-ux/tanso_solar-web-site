import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Zap, ShoppingBag } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface ProductModalProps {
  product: Product | null;
  currentLang: Language;
  onClose: () => void;
  onQuickQuote: (productName: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currentLang,
  onClose,
  onQuickQuote
}) => {
  if (!product) return null;
  const t = translations[currentLang];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-white/90 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 sm:p-8 text-slate-900 shadow-2xl overflow-hidden my-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100/80 text-slate-500 hover:text-slate-900 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Image Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="rounded-[24px] overflow-hidden bg-slate-100 h-64 border border-slate-200 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.powerRating && (
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow-md">
                    {product.powerRating}
                  </span>
                )}
              </div>

              {product.priceEstimate && (
                <div className="p-4 rounded-[20px] bg-white/70 border border-slate-200/80 text-center">
                  <p className="text-xs text-slate-500">Taxminiy narx oralig'i</p>
                  <p className="text-xl font-black text-cyan-800 font-display mt-0.5">
                    {product.priceEstimate}
                  </p>
                  <p className="text-[10px] text-slate-400">Rasmiy kafolat bilan</p>
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <span className="px-3.5 py-1 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-extrabold uppercase border border-cyan-200/50">
                  {product.categoryLabel[currentLang]}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2 font-display leading-tight">
                  {product.name}
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description[currentLang]}
              </p>

              {/* Specs Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.specsHeader}
                </h4>
                <div className="rounded-[20px] border border-slate-200/80 overflow-hidden text-xs">
                  {product.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between p-3 ${
                        idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white/80'
                      }`}
                    >
                      <span className="text-slate-500 font-medium">{spec.label[currentLang]}</span>
                      <span className="text-slate-900 font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onQuickQuote(product.name);
                  }}
                  className="flex-1 py-3.5 px-4 rounded-full bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-xs shadow-lg shadow-cyan-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Narxini so'rash / Buyurtma</span>
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
