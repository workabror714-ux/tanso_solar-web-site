import { Category, Product, HeroBanner, Service, Project, Partner, SiteSettings, Lead } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    slug: 'quyosh-suv-isitgichlari',
    nameUz: 'Quyosh suv isitgichlari',
    nameRu: 'Солнечные водонагреватели',
    descriptionUz: 'Bosim ostida ishlaydigan va mavsumiy yuqori samarali quyosh kollektorlari va suv isitish tizimlari.',
    descriptionRu: 'Напорные и безнапорные высокоэффективные солнечные водонагреватели для дома и бизнеса.',
    active: true,
    sortOrder: 1,
  },
  {
    id: 'cat-2',
    slug: 'quyosh-panellari',
    nameUz: 'Quyosh panellari',
    nameRu: 'Солнечные панели',
    descriptionUz: 'Yuqori F.I.K.ga ega Monokristall TOPCon va N-type quyosh fotoelektrik panellari.',
    descriptionRu: 'Монокристаллические солнечные панели нового поколения TOPCon и N-Type с повышенным КПД.',
    active: true,
    sortOrder: 2,
  },
  {
    id: 'cat-3',
    slug: 'solar-inverterlar',
    nameUz: 'Solar inverterlar',
    nameRu: 'Солнечные инверторы',
    descriptionUz: 'On-grid, Off-grid va Gibrid aqlli solar inverterlar va energiya boshqaruv modullari.',
    descriptionRu: 'Сетевые (On-Grid), автономные (Off-Grid) и гибридные умные солнечные инверторы.',
    active: true,
    sortOrder: 3,
  },
  {
    id: 'cat-4',
    slug: 'akkumulyatorlar',
    nameUz: 'Akkumulyatorlar va Energiya Saqlash',
    nameRu: 'Аккумуляторы и Накопители',
    descriptionUz: 'LiFePO4 (Litiy-temir-fosfat) hamda Gel quyosh akkumulyator tizimlari.',
    descriptionRu: 'Современные LiFePO4 литиевые накопители и гелевые аккумуляторы с длительным сроком службы.',
    active: true,
    sortOrder: 4,
  },
  {
    id: 'cat-5',
    slug: 'aksessuarlar',
    nameUz: 'Aksessuarlar va Montaj Jihozlari',
    nameRu: 'Аксессуары и Монтажные Системы',
    descriptionUz: 'Alyuminiy profil moslamalari, quyosh kabellari va himoya avtomatlari.',
    descriptionRu: 'Алюминиевые профили, специальные кабели, защиты от импульсных перенапряжений.',
    active: true,
    sortOrder: 5,
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    slug: 'tanso-pressurized-200l',
    titleUz: 'Tanso Solar Pressurized 200L Bosimli Suv Isitgich',
    titleRu: 'Напорный солнечный водонагреватель Tanso Solar 200L',
    categoryId: 'cat-1',
    shortDescUz: '200 litrli bosim ostida ishlaydigan termasifon quyosh kollektori. Kottej va xususiy uylar uchun ideal yechim.',
    shortDescRu: 'Напорная термосифонная солнечная система объемом 200 литров с водяным насосом высокого давления.',
    fullDescUz: 'Tanso Solar 200L bosimli quyosh suv isitish tizimi yil davomida issiq suv bilan ta’minlash uchun mo‘ljallangan. Vakuumni saqlaydigan Heat-Pipe trubkalari muzlashga va do‘lga chidamli. Ichki baki zanglamaydigan SUS304 oziq-ovqat po‘latidan tayyorlangan.',
    fullDescRu: 'Солнечная система Tanso Solar 200L обеспечивает бесперебойное горячее водоснабжение круглый год. Вакуумные трубки Heat-Pipe устойчивы к морозам до -35°C и граду. Внутренний бак выполнен из пищевой нержавеющей стали SUS304.',
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 550,
    priceUZS: 6800000,
    inStock: true,
    specs: [
      { id: '1', keyUz: 'Hajmi', keyRu: 'Объем', valueUz: '200 Litr', valueRu: '200 Л' },
      { id: '2', keyUz: 'Ishchi bosim', keyRu: 'Рабочее давление', valueUz: '6 bar', valueRu: '6 бар' },
      { id: '3', keyUz: 'Vakuumni trubkasi', keyRu: 'Вакуумная трубка', valueUz: '20 dona Heat-Pipe (58x1800mm)', valueRu: '20 шт Heat-Pipe (58x1800мм)' }
    ],
    featured: true,
    popular: true,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'prod-2',
    slug: 'tanso-non-pressurized-300l',
    titleUz: 'Tanso Solar Commercial 300L Mavsumiy Suv Isitgich',
    titleRu: 'Безнапорный солнечный водонагреватель Tanso Solar 300L',
    categoryId: 'cat-1',
    shortDescUz: 'Mehmonxona, restoran va xususiy xonadonlar uchun yuqori hajm va tejamkorlik beruvchi 300L quyosh tizimi.',
    shortDescRu: 'Мощный солнечный водонагреватель объемом 300 литров для гостиниц, ресторанов и загородных домов.',
    fullDescUz: '300 litr hajmli Tanso Solar mavsumiy kollektori yoz va bahor-kuz oylarida suvni tekinga 90°C gacha isitib beradi. Katta oilalar hamda tijorat ob’yektlari uchun elektremenergiya xarajatlarini 80% gacha qisqartiradi.',
    fullDescRu: 'Безнапорная система на 300 литров прогревает воду до 90°C с апреля по ноябрь. Позволяет сократить затраты на газ и электричество для крупных хозяйств до 80%.',
    images: [
      'https://images.unsplash.com/photo-1548611716-300481518f95?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 660,
    priceUZS: 8200000,
    inStock: true,
    specs: [
      { id: '1', keyUz: 'Hajmi', keyRu: 'Объем', valueUz: '300 Litr', valueRu: '300 Л' },
      { id: '2', keyUz: 'Trubkalar soni', keyRu: 'Количество трубок', valueUz: '30 dona vakuumni trubka', valueRu: '30 вакуумных трубок' }
    ],
    featured: true,
    popular: true,
    createdAt: '2026-01-16T10:00:00Z',
    updatedAt: '2026-01-16T10:00:00Z'
  },
  {
    id: 'prod-3',
    slug: 'topcon-585w-panel',
    titleUz: 'Tanso Monokristall TOPCon 585W Quyosh Paneli',
    titleRu: 'Монокристаллическая солнечная панель TOPCon 585 Вт',
    categoryId: 'cat-2',
    shortDescUz: 'F.I.K. 22.8% bo’lgan eng so’nggi avlod N-type TOPCon texnologiyali quyosh fotopaneli.',
    shortDescRu: 'Солнечный модуль нового поколения N-Type TOPCon с коэффициентом полезного действия 22.8%.',
    fullDescUz: 'Tanso 585W quyosh paneli yuqori haroratlarda ham energiya yo’qotilishini minimal darajada saqlaydi. Bifacial xususiyati tufayli orqa tomondan +15% qo’shimcha quvvat beradi.',
    fullDescRu: 'Панель 585W обеспечивает максимальную выработку энергии даже в жарком климате Узбекистана.',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 110,
    priceUZS: 1350000,
    inStock: true,
    specs: [
      { id: '1', keyUz: 'Quvvati', keyRu: 'Мощность', valueUz: '585 W', valueRu: '585 Вт' },
      { id: '2', keyUz: 'F.I.K (Efficiency)', keyRu: 'КПД', valueUz: '22.8%', valueRu: '22.8%' }
    ],
    featured: true,
    popular: false,
    createdAt: '2026-01-18T10:00:00Z',
    updatedAt: '2026-01-18T10:00:00Z'
  },
  {
    id: 'prod-4',
    slug: 'deye-hybrid-10kw-inverter',
    titleUz: 'Tanso Hybrid Smart Inverter 10kW 3-Phase',
    titleRu: 'Гибридный трехфазный инвертор Tanso 10 кВт',
    categoryId: 'cat-3',
    shortDescUz: '3 faza, 10kW quvvatli gibrid quyosh inverteri. Tarmoq bor va yo’q paytda to’liq avtonomiya beradi.',
    shortDescRu: 'Умный трехфазный гибридный инвертор мощностью 10 кВт с онлайн мониторингом и мобильным приложением.',
    fullDescUz: 'Tanso 10kW gibrid inverteri tarmoq (On-Grid) hamda akkumulyator (Off-Grid) rejimlari o’rtasida 4ms ichida uzluksiz o’tadi.',
    fullDescRu: 'Переключение на резервный источник питания занимает менее 4 мс.',
    images: [
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 1480,
    priceUZS: 18500000,
    inStock: true,
    specs: [
      { id: '1', keyUz: 'Nominal quvvat', keyRu: 'Номинальная мощность', valueUz: '10,000 W', valueRu: '10,000 Вт' },
      { id: '2', keyUz: 'Fazalar', keyRu: 'Фазы', valueUz: '3 Faza (380V / 400V)', valueRu: '3 Фазы (380В / 400В)' }
    ],
    featured: true,
    popular: true,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z'
  }
];

export const initialHeroBanners: HeroBanner[] = [
  {
    id: 'banner-1',
    titleUz: 'Quyosh energiyasini uyingiz va biznesingiz uchun ishlating.',
    titleRu: 'Используйте энергию солнца для вашего дома и бизнеса.',
    subtitleUz: 'O’zbekistondagi eng ishonchli va zamonaviy quyosh suv isitgichlari, fotopaneellar va energiya saqlash tizimlari.',
    subtitleRu: 'Надежные солнечные водонагреватели, фотопанели и системы хранения энергии с гарантией в Узбекистане.',
    buttonTextUz: 'Mahsulotlarni ko‘rish',
    buttonTextRu: 'Смотреть каталог',
    buttonLink: '/catalog',
    bgImageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1920',
    active: true,
    sortOrder: 1,
  }
];

export const initialServices: Service[] = [
  {
    id: 'serv-1',
    titleUz: 'Bepul konsultatsiya',
    titleRu: 'Бесплатная консультация',
    descUz: 'Bizning mutaxassislarimiz obyektga mos energiya echimlarini tavsiya qiladi hamda hisob-kitob qilib beradi.',
    descRu: 'Наши эксперты проконсультируют вас по техническим вопросам и подберут оптимальное решение.',
    iconName: 'MessageSquare',
    imageUrl: 'https://images.unsplash.com/photo-1521791136364-798a7bc0d262?auto=format&fit=crop&q=80&w=600',
    active: true,
    sortOrder: 1
  },
  {
    id: 'serv-2',
    titleUz: 'Ob’yektni o‘rganish',
    titleRu: 'Аудит и замер объекта',
    descUz: 'Muhandislarimiz obyektga tashrif buyurib, tom burchagi, quyosh tushishi va elektr yuklamasini aniqlaydi.',
    descRu: 'Выезд инженеров на объект для замера освещенности, угла крыши и анализа энергопотребления.',
    iconName: 'Search',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    active: true,
    sortOrder: 2
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    titleUz: 'Toshkent VIP Kottej Massivida 30kW Quyosh Tizimi',
    titleRu: 'Солнечная электростанция 30 кВт в коттеджном поселке Ташкента',
    locationUz: 'Toshkent sh., Yunusobod tuman',
    locationRu: 'г. Ташкент, Юнусабадский р-н',
    capacity: '30 kW PV + 1000L Water Heating',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000',
    featured: true,
    active: true
  }
];

export const initialPartners: Partner[] = [
  { id: 'part-1', name: 'LONGi Solar', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300', websiteUrl: 'https://longi.com', active: true, sortOrder: 1 },
  { id: 'part-2', name: 'Growatt Inverters', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300', websiteUrl: 'https://ginverter.com', active: true, sortOrder: 2 }
];

export const initialSiteSettings: SiteSettings = {
  companyName: 'TANSO SOLAR UZBEKISTAN',
  phone1: '+998 71 200 88 77',
  phone2: '+998 90 123 45 67',
  email: 'info@tansosolar.uz',
  telegram: 'https://t.me/tansosolar_uz',
  instagram: 'https://instagram.com/tansosolar.uz',
  facebook: 'https://facebook.com/tansosolar.uz',
  youtube: 'https://youtube.com/@tansosolar',
  addressUz: 'O’zbekiston, Toshkent sh, Sergeli tumani, Sanoat zonasi 4-dona',
  addressRu: 'Узбекистан, г. Ташкент, Сергелийский р-н, Промзона 4',
  mapIframeUrl: 'https://maps.google.com',
  workingHoursUz: 'Dush - Shan: 09:00 - 18:00',
  workingHoursRu: 'Пн - Сб: 09:00 - 18:00'
};

export const initialLeads: Lead[] = [
  {
    id: 'lead-101',
    type: 'product_request',
    fullName: 'Anvar Rahimov',
    phone: '+998 97 111 22 33',
    productId: 'prod-1',
    productName: 'Tanso Solar Pressurized 200L Bosimli Suv Isitgich',
    category: 'Quyosh suv isitgichlari',
    quantity: 1,
    comment: 'Toshkent viloyati Bo’stonliq tumanidagi kottejimizga o’rnatish bo’yicha narxlarni va montaj vaqtini bilmoqchi edim.',
    source: '/product/tanso-pressurized-200l',
    status: 'NEW',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    isRead: false,
    adminNotes: ''
  }
];
