import React, { useState } from 'react';
import { 
  ChevronRight, ShieldCheck, ShoppingBag, Phone, FileText, CheckCircle2, 
  Download, Zap, Share2, Award, Clock 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenConsultation: (product?: Product | null) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate, onOpenConsultation }) => {
  const { language, t, getLoc } = useLanguage();
  const { products, categories, settings } = useData();

  const product = products.find(p => p.slug === slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 text-center">
        <div className="max-w-md mx-auto p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h2 className="text-xl font-bold mb-2">Mahsulot topilmadi</h2>
          <p className="text-xs text-zinc-400 mb-6">Ushbu mahsulot o‘chirilgan yoki mavjud emas.</p>
          <button
            onClick={() => onNavigate('/catalog')}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white"
          >
            {t('catalog')}
          </button>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 3);

  const formatPrice = (price: number | null) => {
    if (!price) return t('requestQuote');
    return new Intl.NumberFormat(language === 'ru' ? 'ru-RU' : 'uz-UZ').format(price) + ' SO‘M';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
          <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
            {t('home')}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <button onClick={() => onNavigate('/catalog')} className="hover:text-white transition-colors">
            {t('catalog')}
          </button>
          {category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <button 
                onClick={() => onNavigate(`/catalog/${category.slug}`)} 
                className="hover:text-white transition-colors"
              >
                {getLoc(category, 'name')}
              </button>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-emerald-400 font-semibold truncate max-w-[200px] sm:max-w-none">
            {getLoc(product, 'name')}
          </span>
        </div>

        {/* Product Top Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative h-[380px] sm:h-[480px] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={product.images[selectedImageIndex] || product.images[0]} 
                alt={getLoc(product, 'name')}
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md text-amber-400 font-bold text-xs border border-zinc-800">
                  {product.capacity}
                </span>
                <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-md">
                  {product.availability === 'in_stock' ? t('inStock') : t('onOrder')}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx ? 'border-emerald-500 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                {category ? getLoc(category, 'name') : 'Tanso Solar'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                {getLoc(product, 'name')}
              </h1>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {getLoc(product, 'shortDescription')}
              </p>
            </div>

            {/* Pricing Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block uppercase font-semibold">Tavsiya etilgan narx:</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">
                  {product.showPrice ? formatPrice(product.price) : t('requestQuote')}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-zinc-400 block font-semibold">Kafolat:</span>
                <span className="text-xs text-amber-400 font-bold block mt-1">
                  {getLoc(product, 'warranty')}
                </span>
              </div>
            </div>

            {/* Key Specs Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                <span className="text-zinc-500 block text-[11px]">Hajmi / Quvvati</span>
                <span className="font-bold text-white mt-0.5 block">{product.capacity}</span>
              </div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                <span className="text-zinc-500 block text-[11px]">Ish unumdorligi</span>
                <span className="font-bold text-white mt-0.5 block">{product.power}</span>
              </div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-zinc-500 block text-[11px]">Holat</span>
                <span className="font-bold text-emerald-400 mt-0.5 block">
                  {product.availability === 'in_stock' ? t('inStock') : t('onOrder')}
                </span>
              </div>
            </div>

            {/* Features check list */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">
                {t('features')}
              </h4>
              <div className="space-y-2">
                {(language === 'ru' ? product.featuresRu : product.featuresUz).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() => onOpenConsultation(product)}
                className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all"
                id={`btn-detail-buy-${product.id}`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('buyNow')}</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onOpenConsultation(product)}
                  className="py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('consultation')}</span>
                </button>

                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(getLoc(product, 'name'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ulashish</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Description & Specs Tabs/Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 border-t border-zinc-800/80 pt-12">
          
          {/* Detailed Specifications Table */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-emerald-500 pl-3">
                {t('specifications')}
              </h3>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/80">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-zinc-400 w-1/3">
                      {language === 'ru' ? spec.keyRu : spec.keyUz}
                    </span>
                    <span className="font-bold text-white w-2/3">
                      {language === 'ru' ? spec.valueRu : spec.valueUz}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Paragraph */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-emerald-500 pl-3">
                {language === 'ru' ? 'Подробное описание' : 'Batafsil ma’lumot'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6">
                {getLoc(product, 'description')}
              </p>
            </div>
          </div>

          {/* Downloadable Docs & Guarantee Card */}
          <div className="space-y-6">
            
            {/* Warranty Card */}
            <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
                <h4 className="font-bold text-sm text-white">
                  {t('warranty')}
                </h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {getLoc(product, 'warranty')}. Tanso Solar tomonidan sertifikatlangan montaj va rasmiy servis shartnomasi beriladi.
              </p>
            </div>

            {/* Download Tech Passport */}
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Texnik pasport va qo‘llanma</span>
              </h4>
              <p className="text-xs text-zinc-400">
                Uskuna foydalanish va montaj pasporti PDF formatida.
              </p>
              <button
                onClick={() => alert('Pasport hujjati yuklanmoqda...')}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Yuklab olish (PDF)</span>
              </button>
            </div>

          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-zinc-800/80 pt-12">
            <h3 className="text-2xl font-black text-white mb-8">
              {t('relatedProducts')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard
                  key={relProd.id}
                  product={relProd}
                  onNavigate={onNavigate}
                  onOpenLead={(p) => onOpenConsultation(p)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
