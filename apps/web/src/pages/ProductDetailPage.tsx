import React, { useState } from 'react';
import {
  ChevronRight, ShieldCheck, ShoppingBag, Phone, CheckCircle2,
  Award, Flame, Home, Building2, Utensils, Hotel, Layers
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

  // Determine advantages based on category
  const getAdvantages = () => {
    if (category?.slug === 'bosimli') {
      return language === 'ru' ? [
        'Стабильное давление горячей воды в кранах и душе',
        'Прямое подключение к городской водопроводной сети',
        'Быстрая и эффективная теплопередача через медь Heat-Pipe',
        'Герметичная надежная конструкция под давлением',
        'Экологичное и экономичное решение для нагрева воды',
        'Подходит для домов, дач, гостиниц и коммерческих объектов'
      ] : [
        'Dush va kranlarda barqaror issiq suv bosimi',
        'Shahar suv tarmog‘iga to‘g‘ridan-to‘g‘ri ulanish imkoniyati',
        'Mis Heat-Pipe orqali tez va samarali issiqlik uzatish',
        'Germetik va ishonchli bosimli konstruksiya',
        'Ekologik va tejamkor issiq suv yechimi',
        'Uy, dala hovli, mehmonxona va boshqa obyektlar uchun mos'
      ];
    } else if (category?.slug?.includes('split')) {
      return language === 'ru' ? [
        'Раздельное размещение коллектора и бака-аккумулятора',
        'Высокоэффективные вакуумные тепловые трубки',
        'Идеально подходит для сложных архитектурных проектов',
        'Минимальные теплопотери и высокая надежность',
        'Удобство монтажа и технического обслуживания'
      ] : [
        'Kollektor va saqlash bakini alohida joylashtirish imkoniyati',
        'Yuqori samaradorlikka ega vakuum issiqlik trubkalari',
        'Murakkab me’moriy loyihalar uchun ideal yechim',
        'Minimal issiqlik yo‘qotilishi va yuqori ishonchlilik',
        'O‘rnatish va texnik xizmat ko‘rsatish qulayligi'
      ];
    } else {
      return language === 'ru' ? [
        'Помогает снизить расходы на электричество и газ',
        'Эффективное поглощение солнечной энергии через вакуумные трубки',
        'Минимальные теплопотери благодаря 50мм пенополиуретану',
        'Простая, долговечная и надежная конструкция',
        'Подача воды естественным самотеком',
        'Идеально подходит для частных домов и дач'
      ] : [
        'Elektr va gaz sarfini kamaytirishga yordam beradi',
        'Vakuum trubkalar orqali samarali quyosh energiyasi yutilishi',
        '50 mm poliuretan izolyatsiyasi tufayli kam issiqlik yo‘qotilishi',
        'Oddiy, chidamli va ishonchli konstruksiya',
        'Suvni tabiiy oqim (gravitatsiya) orqali yetkazib berish',
        'Xususiy xonadonlar va dala hovlilari uchun ideal yechim'
      ];
    }
  };

  // Determine working principle text
  const getWorkingPrinciple = () => {
    if (category?.slug === 'bosimli') {
      return language === 'ru'
        ? 'Вакуумные трубки поглощают солнечную энергию. Медный теплопередающий элемент Heat-Pipe передает тепло в накопительный бак. Вода не циркулирует напрямую внутри вакуумных трубок. Бак поддерживает давление входящей водопроводной сети и обеспечивает стабильный напор горячей воды.'
        : 'Vakuum trubkalari quyosh energiyasini yutadi. Mis issiqlik uzatish elementi (Heat-Pipe) issiqlikni saqlash bakiga uzatadi. Suv vakuum trubkalarining ichida to‘g‘ridan-to‘g‘ri aylanmaydi. Bak kiruvchi suv tarmog‘i bosimini saqlaydi va barqaror issiq suv oqimini ta’minlaydi.';
    } else if (category?.slug?.includes('split')) {
      return language === 'ru'
        ? 'SPLIT-коллектор воспринимает солнечную радиацию вакуумными тепловыми трубками и передает теплоноситель в отдельный бак-аккумулятор или отопительный контур здания.'
        : 'SPLIT kollektor vakuum issiqlik trubkalari orqali quyosh energiyasini qabul qiladi va issiqlik uzatuvchi suyuqlik vositasida issiqlikni alohida saqlash bakiga yoki obyektning isitish tizimiga yetkazib beradi.';
    } else {
      return language === 'ru'
        ? 'Вакуумные трубки поглощают солнечный свет и нагревают воду внутри. При установке на крыше или возвышенности горячая вода подается в точки водоразбора естественным самотеком благодаря гравитации.'
        : 'Vakuum trubkalar quyosh nurini yutadi va ichidagi suvni isitadi. Tom yoki baland joyga o‘rnatilganda, issiq suv tabiiy gravitatsiya (oqim) hisobiga xonadondagi kran va dushlarga yetib boradi.';
    }
  };

  const advantages = getAdvantages();
  const workingPrinciple = getWorkingPrinciple();

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
              <div className="card p-6 text-xs sm:text-sm text-[var(--muted)] leading-relaxed space-y-4">
                <p>
                  {getLoc(product, 'fullDesc')}
                </p>
                <p>
                  {language === 'ru'
                    ? 'Оборудование TANSO изготавливается из высококачественных материалов: внутренний бак выполнен из пищевой нержавеющей стали SUS304 толщиной 0.4 мм, а термоизолирующий слой из пенополиуретана высочайшей плотности 50 мм минимизирует ночные теплопотери.'
                    : 'TANSO uskunasi yuqori sifatli materiallardan tayyorlangan: ichki bak 0.4 mm qalinlikdagi SUS304 oziq-ovqat zanglamaydigan po‘latidan, 50 mm yuqori zichlikdagi poliuretan izolyatsiya qatlami esa tunda issiqlik yo‘qotilishini minimal darajaga tushiradi.'
                  }
                </p>
              </div>
            </section>

            {/* ASOSIY AFZALLIKLAR */}
            <section>
              <h2 className="text-xl font-bold text-[var(--ink)] mb-4 border-l-4 border-[var(--teal)] pl-3">
                {language === 'ru' ? 'Основные преимущества' : 'Asosiy afzalliklar'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {advantages.map((adv, idx) => (
                  <div key={idx} className="card p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--teal)] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[var(--ink)] font-medium">{adv}</span>
                  </div>
                ))}
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

            {/* ISHLASH PRINSIPI */}
            <section>
              <h2 className="text-xl font-bold text-[var(--ink)] mb-4 border-l-4 border-[var(--teal)] pl-3 flex items-center gap-2">
                <Flame className="w-5 h-5 text-[var(--amber)]" />
                <span>{language === 'ru' ? 'Принцип работы' : 'Ishlash prinsipi'}</span>
              </h2>
              <div className="card p-6 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                <p>{workingPrinciple}</p>
              </div>
            </section>

            {/* KIMLAR UCHUN MOS */}
            <section>
              <h2 className="text-xl font-bold text-[var(--ink)] mb-4 border-l-4 border-[var(--teal)] pl-3">
                {language === 'ru' ? 'Кому подходит' : 'Kimlar uchun mos'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="card p-4 text-center space-y-2">
                  <Home className="w-6 h-6 text-[var(--amber)] mx-auto" />
                  <span className="text-xs font-bold block text-[var(--ink)]">
                    {language === 'ru' ? 'Частные дома / Коттеджи' : 'Xususiy xonadonlar'}
                  </span>
                </div>
                <div className="card p-4 text-center space-y-2">
                  <Building2 className="w-6 h-6 text-[var(--teal-dark)] mx-auto" />
                  <span className="text-xs font-bold block text-[var(--ink)]">
                    {language === 'ru' ? 'Дачные участки' : 'Dala hovlilar'}
                  </span>
                </div>
                <div className="card p-4 text-center space-y-2">
                  <Hotel className="w-6 h-6 text-[var(--teal-dark)] mx-auto" />
                  <span className="text-xs font-bold block text-[var(--ink)]">
                    {language === 'ru' ? 'Гостиницы и отели' : 'Mehmonxonalar'}
                  </span>
                </div>
                <div className="card p-4 text-center space-y-2">
                  <Utensils className="w-6 h-6 text-[var(--amber)] mx-auto" />
                  <span className="text-xs font-bold block text-[var(--ink)]">
                    {language === 'ru' ? 'Рестораны и кафе' : 'Restoran va oshxonalar'}
                  </span>
                </div>
                <div className="card p-4 text-center space-y-2 col-span-2 sm:col-span-1">
                  <Layers className="w-6 h-6 text-[var(--teal-dark)] mx-auto" />
                  <span className="text-xs font-bold block text-[var(--ink)]">
                    {language === 'ru' ? 'Коммерческие объекты' : 'Tijorat obyektlari'}
                  </span>
                </div>
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
