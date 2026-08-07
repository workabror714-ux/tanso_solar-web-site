import { Category, Product, HeroBanner, Service, Project, Partner, SiteSettings, Lead } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    slug: 'quyosh-suv-isitgichlari',
    nameUz: 'Quyosh suv isitgichlari',
    nameRu: 'Солнечные водонагреватели',
    descriptionUz: 'Bosim ostida ishlaydigan va mavsumiy yuqori samarali quyosh kollektorlari va suv isitish tizimlari.',
    descriptionRu: 'Напорные и безнапорные высокоэффективные солнечные водонагреватели для дома и бизнеса.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    icon: 'Sun',
    productCount: 12,
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
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    icon: 'Zap',
    productCount: 18,
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
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800',
    icon: 'Cpu',
    productCount: 10,
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
    image: 'https://images.unsplash.com/photo-1558441719-6779b6819c90?auto=format&fit=crop&q=80&w=800',
    icon: 'Battery',
    productCount: 8,
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
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    icon: 'Wrench',
    productCount: 15,
    active: true,
    sortOrder: 5,
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    slug: 'tanso-pressurized-200l',
    nameUz: 'Tanso Solar Pressurized 200L Bosimli Suv Isitgich',
    nameRu: 'Напорный солнечный водонагреватель Tanso Solar 200L',
    categoryId: 'cat-1',
    shortDescriptionUz: '200 litrli bosim ostida ishlaydigan termasifon quyosh kollektori. Kottej va xususiy uylar uchun ideal yechim.',
    shortDescriptionRu: 'Напорная термосифонная солнечная система объемом 200 литров с водяным насосом высокого давления.',
    descriptionUz: 'Tanso Solar 200L bosimli quyosh suv isitish tizimi yil davomida issiq suv bilan ta’minlash uchun mo‘ljallangan. Vakuumni saqlaydigan Heat-Pipe trubkalari muzlashga va do‘lga chidamli. Ichki baki zanglamaydigan SUS304 oziq-ovqat po‘latidan tayyorlangan.',
    descriptionRu: 'Солнечная система Tanso Solar 200L обеспечивает бесперебойное горячее водоснабжение круглый год. Вакуумные трубки Heat-Pipe устойчивы к морозам до -35°C и граду. Внутренний бак выполнен из пищевой нержавеющей стали SUS304.',
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000'
    ],
    price: 6800000,
    showPrice: true,
    availability: 'in_stock',
    capacity: '200 Litr',
    power: '1.8 kW heat efficiency',
    specifications: [
      { keyUz: 'Hajmi', keyRu: 'Объем', valueUz: '200 Litr', valueRu: '200 Л' },
      { keyUz: 'Ishchi bosim', keyRu: 'Рабочее давление', valueUz: '6 bar', valueRu: '6 бар' },
      { keyUz: 'Vakuumni trubkasi', keyRu: 'Вакуумная трубка', valueUz: '20 dona Heat-Pipe (58x1800mm)', valueRu: '20 шт Heat-Pipe (58x1800мм)' },
      { keyUz: 'Ichki bak materiali', keyRu: 'Материал бака', valueUz: 'Zanglamaydigan po’lat SUS304 1.2mm', valueRu: 'Нержавеющая сталь SUS304 1.2мм' },
      { keyUz: 'Izolyatsiya', keyRu: 'Изоляция', valueUz: 'Poliuretan 55mm (issiqlikni 72 soat saqlaydi)', valueRu: 'Пенополиуретан 55мм (сохраняет 72ч)' },
      { keyUz: 'Muzlashga chidamlilik', keyRu: 'Морозостойкость', valueUz: '-35°C gacha', valueRu: 'до -35°C' }
    ],
    featuresUz: [
      'Shahar suv quvuri bosimiga to’liq mos keladi',
      'Vakuumni Heat-Pipe texnologiyasi',
      'Aqlli elektron boshqaruv kontrolleri',
      'Muzlashdan va ortiqcha qizishdan avtomatik himoya'
    ],
    featuresRu: [
      'Совместим с городским давлением водопровода',
      'Технология вакуумных трубок Heat-Pipe',
      'Умный электронный контроллер управления',
      'Автоматическая защита от замерзания и перегрева'
    ],
    warrantyUz: '5 yil rasmiy kafolat, 20 yil xizmat muddati',
    warrantyRu: '5 лет официальной гарантии, срок службы 20 лет',
    featured: true,
    active: true,
    sortOrder: 1,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'prod-2',
    slug: 'tanso-non-pressurized-300l',
    nameUz: 'Tanso Solar Commercial 300L Mavsumiy Suv Isitgich',
    nameRu: 'Безнапорный солнечный водонагреватель Tanso Solar 300L',
    categoryId: 'cat-1',
    shortDescriptionUz: 'Mehmonxona, restoran va xususiy xonadonlar uchun yuqori hajm va tejamkorlik beruvchi 300L quyosh tizimi.',
    shortDescriptionRu: 'Мощный солнечный водонагреватель объемом 300 литров для гостиниц, ресторанов и загородных домов.',
    descriptionUz: '300 litr hajmli Tanso Solar mavsumiy kollektori yoz va bahor-kuz oylarida suvni tekinga 90°C gacha isitib beradi. Katta oilalar hamda tijorat ob’yektlari uchun elektremenergiya xarajatlarini 80% gacha qisqartiradi.',
    descriptionRu: 'Безнапорная система на 300 литров прогревает воду до 90°C с апреля по ноябрь. Позволяет сократить затраты на газ и электричество для крупных хозяйств до 80%.',
    images: [
      'https://images.unsplash.com/photo-1548611716-300481518f95?auto=format&fit=crop&q=80&w=1000'
    ],
    price: 8200000,
    showPrice: true,
    availability: 'in_stock',
    capacity: '300 Litr',
    power: '2.5 kW heat efficiency',
    specifications: [
      { keyUz: 'Hajmi', keyRu: 'Объем', valueUz: '300 Litr', valueRu: '300 Л' },
      { keyUz: 'Trubkalar soni', keyRu: 'Количество трубок', valueUz: '30 dona vakuumni trubka', valueRu: '30 вакуумных трубок' },
      { keyUz: 'Karkas', keyRu: 'Каркас', valueUz: 'Zanglamaydigan galvanizatsiyalangan po’lat', valueRu: 'Оцинкованная коррозиестойкая сталь' },
      { keyUz: 'Suv to’ldirish', keyRu: 'Наполнение водой', valueUz: 'Avtomatik mayda bak (Assistant Tank)', valueRu: 'Автоматический поплавковый бачек' }
    ],
    featuresUz: [
      'Arzon va oson montaj',
      '30 ta uch qatlamli shisha vakuumni trubka',
      'Iqtisodiy jihatdan juda tez oqlanadi (1.5 yilda)'
    ],
    featuresRu: [
      'Быстрый и экономичный монтаж',
      '30 трехслойных высокоэффективных трубок',
      'Быстрая окупаемость (менее 1.5 лет)'
    ],
    warrantyUz: '3 yil kafolat',
    warrantyRu: '3 года гарантии',
    featured: true,
    active: true,
    sortOrder: 2,
    createdAt: '2026-01-16T10:00:00Z',
    updatedAt: '2026-01-16T10:00:00Z'
  },
  {
    id: 'prod-3',
    slug: 'topcon-585w-panel',
    nameUz: 'Tanso Monokristall TOPCon 585W Quyosh Paneli',
    nameRu: 'Монокристаллическая солнечная панель TOPCon 585 Вт',
    categoryId: 'cat-2',
    shortDescriptionUz: 'F.I.K. 22.8% bo’lgan eng so’nggi avlod N-type TOPCon texnologiyali quyosh fotopaneli.',
    shortDescriptionRu: 'Солнечный модуль нового поколения N-Type TOPCon с коэффициентом полезного действия 22.8%.',
    descriptionUz: 'Tanso 585W quyosh paneli yuqori haroratlarda ham energiya yo’qotilishini minimal darajada saqlaydi. Bifacial (ikki tomonlama nurlanish qabul qilish) xususiyati tufayli orqa tomondan +15% qo’shimcha quvvat beradi.',
    descriptionRu: 'Панель 585W обеспечивает максимальную выработку энергии даже в жарком климате Узбекистана. Технология Bifacial прибавляет до 15% энергии за счет отраженного света.',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000'
    ],
    price: 1350000,
    showPrice: true,
    availability: 'in_stock',
    capacity: '585 Watt Peak',
    power: '585W',
    specifications: [
      { keyUz: 'Quvvati', keyRu: 'Мощность', valueUz: '585 W', valueRu: '585 Вт' },
      { keyUz: 'F.I.K (Efficiency)', keyRu: 'КПД', valueUz: '22.8%', valueRu: '22.8%' },
      { keyUz: 'Texnologiya', keyRu: 'Технология', valueUz: 'N-type TOPCon, Bifacial Dual Glass', valueRu: 'N-type TOPCon, Bifacial Двойное стекло' },
      { keyUz: 'O’lchami', keyRu: 'Габариты', valueUz: '2278 x 1134 x 30 mm', valueRu: '2278 x 1134 x 30 мм' },
      { keyUz: 'Og’irligi', keyRu: 'Вес', valueUz: '27.5 kg', valueRu: '27.5 кг' }
    ],
    featuresUz: [
      'Anti-PID va kuchli shamol/qor yuklamasiga chidamli',
      'Orqa tomondan +10% dan +25% gacha qo’shimcha energiya',
      'Yuqori harorat koeffitsienti (-0.29%/°C)'
    ],
    featuresRu: [
      'Защита Anti-PID, устойчивость к снегу и ветру',
      'Дополнительная генерация до +25% с обратной стороны',
      'Отличный температурный коэффициент (-0.29%/°C)'
    ],
    warrantyUz: '12 yil mahsulot kafolati, 30 yil unumdorlik kafolati (87.4%)',
    warrantyRu: '12 лет гарантии на материалы, 30 лет на сохранение 87.4% мощности',
    featured: true,
    active: true,
    sortOrder: 3,
    createdAt: '2026-01-18T10:00:00Z',
    updatedAt: '2026-01-18T10:00:00Z'
  },
  {
    id: 'prod-4',
    slug: 'deye-hybrid-10kw-inverter',
    nameUz: 'Tanso Hybrid Smart Inverter 10kW 3-Phase',
    nameRu: 'Гибридный трехфазный инвертор Tanso 10 кВт',
    categoryId: 'cat-3',
    shortDescriptionUz: '3 faza, 10kW quvvatli gibrid quyosh inverteri. Tarmoq bor va yo’q paytda to’liq avtonomiya beradi.',
    shortDescriptionRu: 'Умный трехфазный гибридный инвертор мощностью 10 кВт с онлайн мониторингом и мобильным приложением.',
    descriptionUz: 'Tanso 10kW gibrid inverteri tarmoq (On-Grid) hamda akkumulyator (Off-Grid) rejimlari o’rtasida 4ms ichida uzluksiz o’tadi. Uy va biznes elektr jihozlarini avariyalarda to’xtovsiz ta’minlaydi. Mobil ilova orqali real vaqtda kuzatuv.',
    descriptionRu: 'Переключение на резервный источник питания занимает менее 4 мс. Инвертор поддерживает параллельное подключение и работу с бензиновыми и дизельными генераторами.',
    images: [
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000'
    ],
    price: 18500000,
    showPrice: true,
    availability: 'in_stock',
    capacity: '10 kW',
    power: '10 kW (Max 15 kW PV input)',
    specifications: [
      { keyUz: 'Nominal quvvat', keyRu: 'Номинальная мощность', valueUz: '10,000 W', valueRu: '10,000 Вт' },
      { keyUz: 'Fazalar', keyRu: 'Фазы', valueUz: '3 Faza (380V / 400V)', valueRu: '3 Фазы (380В / 400В)' },
      { keyUz: 'MPPT trekkerlar', keyRu: 'MPPT трекеры', valueUz: '2 dona (Har biri 2 string)', valueRu: '2 шт (По 2 стринга)' },
      { keyUz: 'Akkumulyator kuchlanishi', keyRu: 'Напряжение АКБ', valueUz: '48V Low Voltage (LiFePO4 / Lead-Acid)', valueRu: '48В Низковольтное (LiFePO4)' },
      { keyUz: 'Himoya darajasi', keyRu: 'Степень защиты', valueUz: 'IP65 (Tashqi muhit uchun mos)', valueRu: 'IP65 (Пылевлагозащищенный)' }
    ],
    featuresUz: [
      'Smart Load funksiyasi bilan ikkilamchi yuklamalarni ajratish',
      'Wi-Fi modul orqali mobil ilovada ko’rish',
      'Dizel-generator bilan avtomatik integratsiya'
    ],
    featuresRu: [
      'Функция Smart Load для отключения второстепенных нагрузок',
      'Удаленный мониторинг через Wi-Fi модуль',
      'Автоматический запуск генератора'
    ],
    warrantyUz: '5 yil rasmiy kafolat',
    warrantyRu: '5 лет официальной гарантии',
    featured: true,
    active: true,
    sortOrder: 4,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'prod-5',
    slug: 'lifepo4-wall-mounted-15kwh',
    nameUz: 'Tanso PowerWall LiFePO4 51.2V 300Ah (15.3kWh)',
    nameRu: 'Литиевый накопитель PowerWall LiFePO4 15.3 кВт·ч',
    categoryId: 'cat-4',
    shortDescriptionUz: 'Devorga o’rnatiluvchi 15.3 kWh sig’imli litiy-temir-fosfat energiya saqlash modullari.',
    shortDescriptionRu: 'Настенный литий-железо-фосфатный аккумулятор емкостью 15.3 кВт·ч для бесперебойного электропитания.',
    descriptionUz: 'Tanso PowerWall 15.3kWh akkumulyator moduli 6000 dan ortiq zaryadlash sikliga ega. Ichki Smart BMS moduli batareyani harorat, ortiqcha zaryad va qisqa tutashuvdan asraydi. 15 yildan ortiq xizmat qiladi.',
    descriptionRu: 'Накопитель энергии PowerWall 15.3 кВт·ч рассчитан на 6000+ циклов при 80% глубине разряда. Встроенная интеллектуальная BMS обеспечивает безопасность и балансировку ячеек.',
    images: [
      'https://images.unsplash.com/photo-1558441719-6779b6819c90?auto=format&fit=crop&q=80&w=1000'
    ],
    price: 32000000,
    showPrice: true,
    availability: 'in_stock',
    capacity: '15.36 kWh (300Ah)',
    power: '100A continuous charge/discharge',
    specifications: [
      { keyUz: 'Energiya sig’imi', keyRu: 'Емкость энергии', valueUz: '15.36 kWh', valueRu: '15.36 кВт·ч' },
      { keyUz: 'Kuchlanish', keyRu: 'Напряжение', valueUz: '51.2 V', valueRu: '51.2 В' },
      { keyUz: 'Sikllar soni', keyRu: 'Циклы разряда', valueUz: '6000+ sikl (DOD 80%)', valueRu: '6000+ циклов (DOD 80%)' },
      { keyUz: 'Parallel ulash', keyRu: 'Параллельное подключение', valueUz: '15 donagacha modulni ulash imkoni (230kWh)', valueRu: 'До 15 модулей (230 кВт·ч)' }
    ],
    featuresUz: [
      'Portlashga va yonishga qarshi xavfsiz LiFePO4 kimyosi',
      'CAN va RS485 protokollari bilan barcha inverterlar bilan mos keladi',
      'LCD displey va holat indikatorlari'
    ],
    featuresRu: [
      'Безопасная химия LiFePO4 без риска возгорания',
      'Совместим со всеми ведущими брендами инверторов',
      'LCD экран с индикацией уровня заряда и температуры'
    ],
    warrantyUz: '10 yil kafolat',
    warrantyRu: '10 лет гарантии',
    featured: true,
    active: true,
    sortOrder: 5,
    createdAt: '2026-01-22T10:00:00Z',
    updatedAt: '2026-01-22T10:00:00Z'
  },
  {
    id: 'prod-6',
    slug: 'on-grid-50kw-inverter',
    nameUz: 'Tanso Industrial On-Grid Inverter 50kW',
    nameRu: 'Промышленный сетевой инвертор Tanso 50 кВт',
    categoryId: 'cat-3',
    shortDescriptionUz: 'Zavod, fabrika va yirik tijorat ob’yektlari uchun 50kW tarmoq solar inverteri.',
    shortDescriptionRu: 'Сетевой солнечный инвертор мощностью 50 кВт для промышленных предприятий и солнечных ферм.',
    descriptionUz: 'Tanso 50kW industrial inverteri korxonangizning kunduzgi elektr sarfini to’liq quyosh energiyasi hisobidan qoplashga yordam beradi. 98.8% F.I.K va 4 ta mustaqil MPPT trekkega ega.',
    descriptionRu: 'Промышленный инвертор 50 кВт для замещения собственного потребления фабрик и коммерческих зданий. КПД до 98.8%, поддержка 4 независимых MPPT.',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000'
    ],
    price: 38000000,
    showPrice: true,
    availability: 'in_stock',
    capacity: '50 kW',
    power: '50 kW',
    specifications: [
      { keyUz: 'Quvvati', keyRu: 'Мощность', valueUz: '50,000 W', valueRu: '50,000 Вт' },
      { keyUz: 'Maksimal F.I.K.', keyRu: 'Макс. КПД', valueUz: '98.8%', valueRu: '98.8%' },
      { keyUz: 'MPPT soni', keyRu: 'Кол-во MPPT', valueUz: '4 MPPT / 8 String', valueRu: '4 MPPT / 8 Стрингов' }
    ],
    featuresUz: ['Masofadan monitoring va nosozliklarni diagnostika qilish', 'Surge Protection Device (SPD Type II)'],
    featuresRu: ['Удаленный мониторинг и диагностика', 'Встроенная защита SPD Type II'],
    warrantyUz: '5 yil kafolat',
    warrantyRu: '5 лет гарантии',
    featured: false,
    active: true,
    sortOrder: 6,
    createdAt: '2026-01-25T10:00:00Z',
    updatedAt: '2026-01-25T10:00:00Z'
  },
  {
    id: 'prod-7',
    slug: 'solar-mounting-structure-roof',
    nameUz: 'Quyosh panellari uchun alyuminiy tom karkas to’plami',
    nameRu: 'Комплект алюминиевых креплений для крыши',
    categoryId: 'cat-5',
    shortDescriptionUz: 'Anodlangan alyuminiydan tayyorlangan zanglamas montaj profillari hamda qisqichlar.',
    shortDescriptionRu: 'Анодированный алюминиевый профиль и комплект зажимов для надежного монтажа на крышу.',
    descriptionUz: 'Aero-dinamik shaklga ega quyosh paneli montaj to’plami tom konstruksiyasiga ortiqcha og’irlik tushirmaydi va 25 yildan ortiq korroziyaga uchramaydi.',
    descriptionRu: 'Легкие и прочные алюминиевые профили с анодированным покрытием для скатных и плоских крыш.',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000'
    ],
    price: 250000,
    showPrice: true,
    availability: 'in_stock',
    capacity: 'Per panel set',
    power: 'N/A',
    specifications: [
      { keyUz: 'Material', keyRu: 'Материал', valueUz: 'AL6005-T5 Anodlangan alyuminiy', valueRu: 'Анодированный алюминий AL6005-T5' },
      { keyUz: 'Bolt va gaykalar', keyRu: 'Метизы', valueUz: 'Zanglamaydigan po’lat SUS304', valueRu: 'Нержавеющая сталь SUS304' }
    ],
    featuresUz: ['160 km/soat shamol tezligiga chidamli', 'Oson va tez montaj'],
    featuresRu: ['Устойчивость к ветру до 160 км/ч', 'Быстрый монтаж без сварки'],
    warrantyUz: '10 yil kafolat',
    warrantyRu: '10 лет гарантии',
    featured: false,
    active: true,
    sortOrder: 7,
    createdAt: '2026-01-26T10:00:00Z',
    updatedAt: '2026-01-26T10:00:00Z'
  },
  {
    id: 'prod-8',
    slug: 'tanso-pressurized-150l',
    nameUz: 'Tanso Solar Compact 150L Bosimli Suv Isitgich',
    nameRu: 'Компактный напорный водонагреватель Tanso Solar 150L',
    categoryId: 'cat-1',
    shortDescriptionUz: 'Kichik oilalar va dala hovli uchun ixcham 150 litrli quyosh suv isitgich.',
    shortDescriptionRu: 'Компактная солнечная напорная система на 150 литров для дач и небольших семей.',
    descriptionUz: 'Tanso Solar 150L ixcham va samarali quyosh suv isitgichi 3-4 kishilik oilaning issiq suvga bo’lgan ehtiyojini to’liq qoplaydi.',
    descriptionRu: 'Солнечная система 150L идеально подходит для небольшой семьи из 3-4 человек.',
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000'
    ],
    price: 5500000,
    showPrice: true,
    availability: 'in_stock',
    capacity: '150 Litr',
    power: '1.4 kW heat efficiency',
    specifications: [
      { keyUz: 'Hajmi', keyRu: 'Объем', valueUz: '150 Litr', valueRu: '150 Л' },
      { keyUz: 'Bosim', keyRu: 'Давление', valueUz: '6 bar', valueRu: '6 бар' }
    ],
    featuresUz: ['Ixcham o’lcham', 'Yuqori issiqlik izolyatsiyasi'],
    featuresRu: ['Компактные габариты', 'Высокая теплоизоляция'],
    warrantyUz: '5 yil kafolat',
    warrantyRu: '5 лет гарантии',
    featured: false,
    active: true,
    sortOrder: 8,
    createdAt: '2026-01-28T10:00:00Z',
    updatedAt: '2026-01-28T10:00:00Z'
  }
];

export const initialHeroBanners: HeroBanner[] = [
  {
    id: 'banner-1',
    bgType: 'image',
    bgUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1920',
    headingUz: 'Quyosh energiyasini uyingiz va biznesingiz uchun ishlating.',
    headingRu: 'Используйте энергию солнца для вашего дома и бизнеса.',
    subtitleUz: 'O’zbekistondagi eng ishonchli va zamonaviy quyosh suv isitgichlari, fotopaneellar va energiya saqlash tizimlari.',
    subtitleRu: 'Надежные солнечные водонагреватели, фотопанели и системы хранения энергии с гарантией в Узбекистане.',
    ctaPrimaryTextUz: 'Mahsulotlarni ko‘rish',
    ctaPrimaryTextRu: 'Смотреть каталог',
    ctaPrimaryUrl: '/catalog',
    ctaSecondaryTextUz: 'Bepul konsultatsiya',
    ctaSecondaryTextRu: 'Бесплатная консультация',
    ctaSecondaryUrl: '#consultation',
    overlayOpacity: 0.6,
    active: true,
    sortOrder: 1,
  }
];

export const initialServices: Service[] = [
  {
    id: 'serv-1',
    titleUz: 'Bepul konsultatsiya',
    titleRu: 'Бесплатная консультация',
    descriptionUz: 'Bizning mutaxassislarimiz obyektga mos energiya echimlarini tavsiya qiladi hamda hisob-kitob qilib beradi.',
    descriptionRu: 'Наши эксперты проконсультируют вас по техническим вопросам и подберут оптимальное решение.',
    icon: 'MessageSquare',
    image: 'https://images.unsplash.com/photo-1521791136364-798a7bc0d262?auto=format&fit=crop&q=80&w=600',
    active: true,
    sortOrder: 1
  },
  {
    id: 'serv-2',
    titleUz: 'Ob’yektni o‘rganish',
    titleRu: 'Аудит и замер объекта',
    descriptionUz: 'Muhandislarimiz obyektga tashrif buyurib, tom burchagi, quyosh tushishi va elektr yuklamasini aniqlaydi.',
    descriptionRu: 'Выезд инженеров на объект для замера освещенности, угла крыши и анализа энергопотребления.',
    icon: 'Search',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    active: true,
    sortOrder: 2
  },
  {
    id: 'serv-3',
    titleUz: 'Tizimni hisoblash va loyihalash',
    titleRu: 'Расчет и проектирование',
    descriptionUz: 'Ob’yektingiz ehtiyojiga va byudjetingizga mos 3D va muhandislik loyihalarini tayyorlash.',
    descriptionRu: 'Профессиональное 3D-проектирование солнечных электростанций и гидросистем под ваш бюджет.',
    icon: 'Calculator',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600',
    active: true,
    sortOrder: 3
  },
  {
    id: 'serv-4',
    titleUz: 'Tezkor yetkazib berish',
    titleRu: 'Быстрая доставка',
    descriptionUz: 'O’zbekistonning barcha viloyatlariga maxsus transport vositalarida havfsiz yetkazib beramiz.',
    descriptionRu: 'Безопасная транспортировка спецтранспортом по всем регионам Республики Узбекистан.',
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
    active: true,
    sortOrder: 4
  },
  {
    id: 'serv-5',
    titleUz: 'Professional montaj va sozlash',
    titleRu: 'Профессиональный монтаж',
    descriptionUz: 'Sertifikatlangan muhandislar jamoasi tomonidan sifatli va xavfsiz montaj ishlari.',
    descriptionRu: 'Монтажные работы сертифицированной бригадой инженеров в строгом соответствии с ГОСТ.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600',
    active: true,
    sortOrder: 5
  },
  {
    id: 'serv-6',
    titleUz: 'Kafolat va texnik servis',
    titleRu: 'Гарантия и технический сервис',
    descriptionUz: '24/7 rejimida koll-markaz va doimiy texnik ko’rik hamda kafolat xizmati.',
    descriptionRu: 'Круглосуточная поддержка, плановое ТО и гарантийное обслуживание оборудования.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
    active: true,
    sortOrder: 6
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    titleUz: 'Toshkent VIP Kottej Massivida 30kW Quyosh Tizimi',
    titleRu: 'Солнечная электростанция 30 кВт в коттеджном поселке Ташкента',
    location: 'Toshkent sh., Yunusobod tuman',
    systemType: 'Hybrid Solar & Water Heating',
    capacity: '30 kW PV + 1000L Solar Hot Water',
    year: '2025',
    descriptionUz: 'Ushbu ob’yektda 30kW gibrid quyosh elektr stantsiyasi va 1000 litrli quyosh suv isitish tizimi o’rnatildi. Yillik tejamkorlik 45 mln so’mni tashkil etadi.',
    descriptionRu: 'Установлена гибридная солнечная станция на 30 кВт и система нагрева воды на 1000 литров. Годовая экономия составляет 45 млн сумов.',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000'
    ],
    featured: true,
    active: true
  },
  {
    id: 'proj-2',
    titleUz: 'Samarqand Premium Mehmonxona 3000L Suv Isitish Majmuasi',
    titleRu: 'Солнечный водонагрев 3000L для премиум отеля в Самарканде',
    location: 'Samarqand sh., Registon hududi',
    systemType: 'Commercial Solar Thermal System',
    capacity: '3000 Litr kunlik issiq suv',
    year: '2025',
    descriptionUz: 'Mehmonxonaning 40 ta xonasi uchun 3000 litrli markazlashgan quyosh suv isitish majmuasi montaj qilindi. Gaz va elektr sarfi 85% ga kamaytirildi.',
    descriptionRu: 'Централизованный комплекс на 3000 литров обеспечивает 40 номеров отеля горячей водой. Затраты на газ сокращены на 85%.',
    images: [
      'https://images.unsplash.com/photo-1548611716-300481518f95?auto=format&fit=crop&q=80&w=1000'
    ],
    featured: true,
    active: true
  },
  {
    id: 'proj-3',
    titleUz: 'Buxoro To’qimachilik Fabrikasida 100kW On-Grid Stantsiya',
    titleRu: 'Сетевая солнечная станция 100 кВт на фабрике в Бухаре',
    location: 'Buxoro viloyati, Kogon',
    systemType: 'Industrial On-Grid Solar Station',
    capacity: '100 kW PV',
    year: '2024',
    descriptionUz: 'Ishlab chiqarish liniyasining kunduzgi elektr sarfini quyosh panellari hisobidan ta’minlaydigan industrial stantsiya.',
    descriptionRu: 'Промышленная солнечная станция для обеспечения дневной нагрузки текстильного производства.',
    images: [
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000'
    ],
    featured: true,
    active: true
  },
  {
    id: 'proj-4',
    titleUz: 'Namangan Fermer Xo’jaligi Sug’orish Quyosh Tizimi',
    titleRu: 'Солнечная насосная система для фермерского хозяйства в Намангане',
    location: 'Namangan viloyati, Chust',
    systemType: 'Solar Water Pumping System',
    capacity: '15 kW Pump Solar Drive',
    year: '2024',
    descriptionUz: 'Elektr tarmoqlaridan yiroqdagi bog’larni sug’orish uchun avtonom quyosh nasos stantsiyasi.',
    descriptionRu: 'Автономная система солнечного полива для фруктовых садов в отдаленном районе.',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000'
    ],
    featured: false,
    active: true
  }
];

export const initialPartners: Partner[] = [
  { id: 'part-1', name: 'LONGi Solar', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300', website: 'https://longi.com', active: true, sortOrder: 1 },
  { id: 'part-2', name: 'Growatt Inverters', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300', website: 'https://ginverter.com', active: true, sortOrder: 2 },
  { id: 'part-3', name: 'Huawei FusionSolar', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300', website: 'https://solar.huawei.com', active: true, sortOrder: 3 },
  { id: 'part-4', name: 'Deye Inverters', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300', website: 'https://deyeinverter.com', active: true, sortOrder: 4 },
  { id: 'part-5', name: 'Jinko Solar', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300', website: 'https://jinkosolar.com', active: true, sortOrder: 5 },
  { id: 'part-6', name: 'Tanso Thermal Tech', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300', website: 'https://tansosolar.uz', active: true, sortOrder: 6 }
];

export const initialSiteSettings: SiteSettings = {
  companyName: 'TANSO SOLAR UZBEKISTAN',
  phone1: '+998 71 200 88 77',
  phone2: '+998 90 123 45 67',
  telegram: 'https://t.me/tansosolar_uz',
  instagram: 'https://instagram.com/tansosolar.uz',
  facebook: 'https://facebook.com/tansosolar.uz',
  youtube: 'https://youtube.com/@tansosolar',
  addressUz: 'O’zbekiston, Toshkent sh, Sergeli tumani, Sanoat zonasi 4-dona',
  addressRu: 'Узбекистан, г. Ташкент, Сергелийский р-н, Промзона 4',
  workingHoursUz: 'Dush - Shan: 09:00 - 18:00',
  workingHoursRu: 'Пн - Сб: 09:00 - 18:00',
  mapCoordinates: '41.2294, 69.2183',
  logoUrl: '',
  seoTitleUz: 'TANSO SOLAR - Quyosh suv isitgichlari va fotopaneellar O’zbekistonda',
  seoTitleRu: 'TANSO SOLAR - Солнечные водонагреватели и панели в Узбекистане',
  seoDescriptionUz: 'Sifatli va kafolatli quyosh suv isitish tizimlari, quyosh panellari hamda inverterlar yetkazib berish va montaj qilish.',
  seoDescriptionRu: 'Поставка и монтаж солнечных водонагревателей, фотопанелей и инверторов высокого качества в Узбекистане.'
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
  },
  {
    id: 'lead-102',
    type: 'consultation',
    fullName: 'Shoxrux Alimov',
    phone: '+998 90 987 65 43',
    comment: 'Mehmonxonamiz uchun quyosh panellari va 2000L suv isitish tizimini hisoblab berishingizni so’rayman.',
    source: '/contact',
    status: 'CONTACTED',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    isRead: true,
    adminNotes: 'Mijoz bilan bog’lanildi, muhandis ko’rigi 10-avgustga belgilandi.'
  },
  {
    id: 'lead-103',
    type: 'product_request',
    fullName: 'Jamshid Karimov',
    phone: '+998 93 555 44 33',
    productId: 'prod-4',
    productName: 'Tanso Hybrid Smart Inverter 10kW 3-Phase',
    category: 'Solar inverterlar',
    quantity: 2,
    comment: 'Toshkent shahridagi ishlab chiqarish sexi uchun 10kW gibrid inverterlar kerak.',
    source: '/catalog',
    status: 'INTERESTED',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    isRead: true,
    adminNotes: 'Tijorat taklifi Telegram orqali yuborildi.'
  },
  {
    id: 'lead-104',
    type: 'product_request',
    fullName: 'Sardor Sobirov',
    phone: '+998 91 234 56 78',
    productId: 'prod-5',
    productName: 'Tanso PowerWall LiFePO4 51.2V 300Ah (15.3kWh)',
    category: 'Akkumulyatorlar va Energiya Saqlash',
    quantity: 1,
    comment: 'Akkumulyator yetkazib berish xizmati bilan birga.',
    source: '/product/lifepo4-wall-mounted-15kwh',
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    isRead: true,
    adminNotes: 'Shartnoma tuzildi, to’lov qilindi va yetkazib berib montaj qilindi.'
  }
];
