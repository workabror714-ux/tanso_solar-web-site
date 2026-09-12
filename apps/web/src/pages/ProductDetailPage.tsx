import React, { useState } from 'react';
import {
  ChevronRight, ShieldCheck, ShoppingBag, Phone, CheckCircle2,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

// ─── Smart description renderer ───────────────────────────────────────────────
// Parses fullDesc text that may contain:
//   • Emoji-led sections  →  icon + bold title + body text
//   • ALL-CAPS lines      →  subsection heading
//   • "1. text" entries   →  numbered step list
//   • Plain lines         →  paragraph
const RichDescription: React.FC<{ text: string }> = ({ text }) => {
  if (!text?.trim()) return null;

  type Block =
    | { kind: 'heading'; text: string }
    | { kind: 'para'; text: string }
    | { kind: 'emoji'; emoji: string; title: string; body: string }
    | { kind: 'numbered'; items: string[] };

  // Insert a newline before every emoji so each emoji starts a new "line"
  const normalized = text
    .trim()
    .replace(/([\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}])/gu, '\n$1')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  const blocks: Block[] = [];
  let pending: string[] = [];

  const flushNumbered = () => {
    if (pending.length) { blocks.push({ kind: 'numbered', items: [...pending] }); pending = []; }
  };

  for (const line of normalized) {
    // Numbered list item  e.g. "1. Vakuumli..."
    const numM = line.match(/^(\d+)[.)]\s+(.+)/);
    if (numM) { pending.push(numM[2]); continue; }
    flushNumbered();

    // Emoji-led section  e.g. "🌟 SAMARALI ISITISH Vakuumli..."
    const emojM = line.match(/^([\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}])\s*(.+)/u);
    if (emojM) {
      const rest = emojM[2];
      // Title = leading uppercase block (no lowercase a-z); body = the rest
      const splitM = rest.match(/^([^a-z]+?)\s+([a-z].*)$/s);
      blocks.push({
        kind: 'emoji',
        emoji: emojM[1],
        title: splitM ? splitM[1].trim() : rest.slice(0, 55).trim(),
        body: splitM ? splitM[2].trim() : rest.slice(55).trim(),
      });
      continue;
    }

    // All-caps heading  e.g. "ISHLASH PRINSIPИ" or "TANSO SOLAR AFZALLIKLARI"
    if (/^[A-Z0-9\s']{4,}$/.test(line) && line.length < 120) {
      blocks.push({ kind: 'heading', text: line });
      continue;
    }

    blocks.push({ kind: 'para', text: line });
  }
  flushNumbered();

  return (
    <div className="space-y-3 text-sm">
      {blocks.map((b, i) => {
        if (b.kind === 'heading')
          return (
            <h4 key={i} className="font-bold uppercase tracking-wide text-xs text-[var(--teal-dark)] pt-4 pb-1 border-b border-[var(--border)] first:pt-0">
              {b.text}
            </h4>
          );

        if (b.kind === 'para')
          return <p key={i} className="text-[var(--muted)] leading-relaxed">{b.text}</p>;

        if (b.kind === 'emoji')
          return (
            <div key={i} className="flex gap-3 items-start py-0.5">
              <span className="text-lg shrink-0 mt-0.5 leading-none">{b.emoji}</span>
              <div className="min-w-0">
                <span className="font-semibold text-[var(--ink)] block leading-snug text-sm">{b.title}</span>
                {b.body && <span className="text-[var(--muted)] block mt-0.5 leading-relaxed text-sm">{b.body}</span>}
              </div>
            </div>
          );

        if (b.kind === 'numbered')
          return (
            <ol key={i} className="space-y-2 mt-1">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-[var(--muted)]">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--teal)]/10 text-[var(--teal-dark)] text-[10px] font-bold grid place-items-center mt-0.5 border border-[var(--teal)]/20">
                    {j + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          );

        return null;
      })}
    </div>
  );
};
// ──────────────────────────────────────────────────────────────────────────────

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenConsultation: (product?: Product | null) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate, onOpenConsultation }) => {
  const { language, t, getLoc } = useLanguage();
  const { products, categories } = useData();

  const product = products.find(p => p.slug === slug || p.id === slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-32 pb-20 text-center">
        <div className="max-w-md mx-auto p-8 card">
          <h2 className="text-xl font-bold mb-2">
            {language === 'ru' ? 'Товар не найден' : 'Mahsulot topilmadi'}
          </h2>
          <p className="text-xs text-[var(--muted)] mb-6">
            {language === 'ru' ? 'Запрошенный товар не существует или был удален.' : 'Ushbu mahsulot o‘chirilgan yoki mavjud emas.'}
          </p>
          <button
            onClick={() => onNavigate('/catalog')}
            className="btn-primary"
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

  const formatPrice = (price: number | null | undefined) => {
    if (!price) return language === 'ru' ? 'Цена по запросу' : 'Narxi so‘rov bo‘yicha';
    return new Intl.NumberFormat(language === 'ru' ? 'ru-RU' : 'uz-UZ').format(price) + ' UZS';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-28 pb-20">
      <div className="tanso-container">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-8">
          <button onClick={() => onNavigate('/')} className="hover:text-[var(--ink)] transition-colors">
            {t('home')}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--border-strong)]" />
          <button onClick={() => onNavigate('/catalog')} className="hover:text-[var(--ink)] transition-colors">
            {t('catalog')}
          </button>
          {category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--border-strong)]" />
              <button
                onClick={() => onNavigate(`/catalog/${category.slug}`)}
                className="hover:text-[var(--ink)] transition-colors"
              >
                {getLoc(category, 'name')}
              </button>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-[var(--border-strong)]" />
          <span className="text-[var(--teal-dark)] font-bold truncate max-w-[200px] sm:max-w-none">
            {getLoc(product, 'title')}
          </span>
        </div>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">

          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative h-[380px] sm:h-[500px] bg-[var(--teal-tint)] border border-[var(--border)] rounded-[14px] overflow-hidden">
              <img
                src={product.images?.[selectedImageIndex] || product.images?.[0] || '/images/products/tanso-bosimsiz-main.png'}
                alt={getLoc(product, 'title')}
                className="w-full h-full object-contain object-center p-5 sm:p-8"
              />

              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {product.specs?.[0]?.valueUz && (
                  <span className="badge bg-[var(--surface)] font-mono-num">
                    {getLoc(product.specs[0], 'value')}
                  </span>
                )}
                <span className={`badge ${product.inStock ? 'badge-teal' : 'badge-amber'}`}>
                  {product.inStock ? (language === 'ru' ? 'В наличии' : 'Sotuvda mavjud') : (language === 'ru' ? 'Под заказ' : 'Buyurtma berish')}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {(product.images?.length || 0) > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx ? 'border-[var(--teal)]' : 'border-[var(--border)] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Summary Info */}
          <div className="space-y-6">

            <div>
              <span className="badge badge-amber mb-3">
                {category ? getLoc(category, 'name') : 'TANSO SOLAR'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-[-0.01em] leading-snug">
                {getLoc(product, 'title')}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--muted)] mt-3 leading-relaxed">
                {getLoc(product, 'shortDesc')}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="p-5 rounded-[14px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between">
              <div>
                <span className="text-xs text-[var(--muted)] block font-semibold uppercase tracking-wider">
                  {language === 'ru' ? 'Официальная цена:' : 'Rasmiy narx:'}
                </span>
                <span className="text-2xl sm:text-3xl font-mono-num font-bold text-[var(--amber)] mt-1 block">
                  {formatPrice(product.priceUZS)}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-[var(--muted)] block font-semibold uppercase tracking-wider">
                  {language === 'ru' ? 'Статус:' : 'Holati:'}
                </span>
                <span className="text-xs text-[var(--teal-dark)] font-bold block mt-1 flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'ru' ? 'В наличии' : 'Mavjud'}</span>
                </span>
              </div>
            </div>

            {/* Main CTA Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => onOpenConsultation(product)}
                className="btn-primary w-full !min-h-[52px]"
                id={`btn-detail-order-${product.id}`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'ru' ? 'Отправить запрос' : 'So‘rov yuborish'}</span>
              </button>

              <button
                onClick={() => onOpenConsultation(product)}
                className="btn-secondary w-full"
              >
                <Phone className="w-4 h-4" />
                <span>{language === 'ru' ? 'Получить консультацию' : 'Konsultatsiya olish'}</span>
              </button>
            </div>

            {/* Quick Spec Highlights */}
            {product.specs && product.specs.length > 0 && (
              <div className="card p-4">
                {product.specs.slice(0, 4).map((sp) => (
                  <div key={sp.id} className="spec-row">
                    <span className="spec-row-label">{getLoc(sp, 'key')}</span>
                    <span className="spec-row-value">{getLoc(sp, 'value')}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 border-t border-[var(--border)] pt-12">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">

            {/* MAHSULOT HAQIDA */}
            <section>
              <h2 className="text-xl font-bold text-[var(--ink)] mb-4 border-l-4 border-[var(--teal)] pl-3">
                {language === 'ru' ? 'О продукте' : 'Mahsulot haqida'}
              </h2>
              <div className="card p-6">
                <RichDescription text={getLoc(product, 'fullDesc')} />
              </div>
            </section>

            {/* TEXNIK XUSUSIYATLAR */}
            <section>
              <h2 className="text-xl font-bold text-[var(--ink)] mb-4 border-l-4 border-[var(--teal)] pl-3">
                {language === 'ru' ? 'Технические характеристики' : 'Texnik xususiyatlar'}
              </h2>
              <div className="card p-6">
                {product.specs?.map((spec, idx) => (
                  <div key={idx} className="spec-row">
                    <span className="spec-row-label">{getLoc(spec, 'key')}</span>
                    <span className="spec-row-value">{getLoc(spec, 'value')}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar: Warranty & Service */}
          <div className="space-y-6">

            {/* KAFOLAT VA SERVIS */}
            <div className="card p-6 space-y-4 border-[var(--teal)]/40">
              <div className="flex items-center gap-3 text-[var(--teal-dark)]">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="font-bold text-sm text-[var(--ink)]">
                  {language === 'ru' ? 'Гарантия и сервис' : 'Kafolat va servis'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                {language === 'ru'
                  ? 'Уточняйте условия гарантии и обслуживания у специалиста Tanso Solar.'
                  : 'Kafolat va servis shartlarini Tanso Solar mutaxassisidan aniqlashtiring.'
                }
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenConsultation(product)}
                  className="btn-primary w-full"
                >
                  {language === 'ru' ? 'Связаться со специалистом' : 'Mutaxassis bilan bog‘lanish'}
                </button>
              </div>
            </div>

            {/* Order info note */}
            <div className="card p-6 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--amber)] flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{language === 'ru' ? 'Официальный дилер TANSO' : 'Rasmiy TANSO dileri'}</span>
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                {language === 'ru'
                  ? 'Все поставляемое оборудование проходит заводской контроль качества. Доставка и профессиональный монтаж по всему Узбекистану.'
                  : 'Barcha yetkazib beriladigan uskunalar zavod sifat nazoratidan o‘tgan. O‘zbekiston bo‘ylab yetkazib berish va professional montaj.'
                }
              </p>
            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-[var(--border)] pt-12">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-extrabold text-[var(--ink)]">
                {language === 'ru' ? 'Похожие товары в этой категории' : 'O‘xshash mahsulotlar'}
              </h3>
              <button
                onClick={() => onNavigate(`/catalog/${category?.slug || ''}`)}
                className="text-xs font-bold text-[var(--teal-dark)] hover:text-[var(--teal)] flex items-center gap-1 uppercase tracking-wider"
              >
                <span>{language === 'ru' ? 'Смотреть все' : 'Barchasini ko‘rish'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

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
