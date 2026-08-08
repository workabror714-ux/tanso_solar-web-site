import { Category, Product, HeroBanner, Service, Project, Partner, SiteSettings, Lead } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    slug: 'bosimsiz',
    nameUz: 'Bosimsiz',
    nameRu: 'Без давления',
    descriptionUz: 'Bosimsiz quyosh suv isitish tizimlari hamda kollektorlari.',
    descriptionRu: 'Безнапорные солнечные водонагреватели и коллекторы.',
    active: true,
    sortOrder: 1,
  },
  {
    id: 'cat-2',
    slug: 'bosimli',
    nameUz: 'Bosimli',
    nameRu: 'С давлением',
    descriptionUz: 'Bosim ostida ishlaydigan yuqori samarali quyosh suv isitish tizimlari.',
    descriptionRu: 'Напорные солнечные водонагреватели под давлением.',
    active: true,
    sortOrder: 2,
  },
  {
    id: 'cat-3',
    slug: 'split-bosimli-20-kolba',
    nameUz: 'Bosimli SPLIT — 20 dona kolba',
    nameRu: 'Сплит с давлением 20шт колба',
    descriptionUz: 'Bosimli SPLIT tizimlari uchun 20 dona kolbali issiqlik kollektorlari.',
    descriptionRu: 'Сплит системы под давлением с 20 вакуумными колбами.',
    active: true,
    sortOrder: 3,
  },
  {
    id: 'cat-4',
    slug: 'split-bosimsiz',
    nameUz: 'Bosimsiz SPLIT',
    nameRu: 'Сплит без давления',
    descriptionUz: 'Bosimsiz SPLIT quyosh issiqlik kollektor tizimlari.',
    descriptionRu: 'Безнапорные сплит системы солнечного теплового коллектора.',
    active: true,
    sortOrder: 4,
  }
];

const bosimsizCommonDescUz = `TANSO vakuum trubkali bosimsiz quyosh suv isitgichi uylar, dala hovlilar va boshqa obyektlarda issiq suv olish uchun tejamkor yechimdir. Tizim quyosh energiyasidan foydalanib suvni isitadi va tom yoki balandroq joyga o‘rnatilganda issiq suvni tabiiy oqim orqali yetkazib beradi.

Vakuum trubkalari quyosh nurlarini samarali yutib, suvni tez isitadi. Yuqori zichlikdagi poliuretan izolyatsiyasi tufayli tunda va sovuq kunlarda issiqlik yo‘qotilishi minimal darajada saqlanadi. Oddiy va ishonchli konstruksiya uzoq yillar xizmat qiladi.`;

const bosimsizCommonDescRu = `Безнапорный солнечный водонагреватель TANSO с вакуумными трубками — экономичное решение для обеспечения горячей водой частных домов, дач и других объектов. Система нагревает воду за счет солнечной энергии и подает горячую воду самотеком при установке на крыше или возвышенности.

Вакуумные трубки эффективно поглощают солнечные лучи и быстро нагревают воду. Благодаря высокоплотной полиуретановой изоляции теплопотери в ночное время и в прохладную погоду минимальны. Простая и надежная конструкция обеспечивает долгий срок службы.`;

const bosimliCommonDescUz = `TANSO bosimli quyosh suv isitgichi markaziy yoki shahar suv tarmog‘i bosimi bilan ishlash uchun mo‘ljallangan zamonaviy issiq suv tizimidir. Vakuum trubkalari quyosh energiyasini yutadi va heat-pipe/mis issiqlik uzatish elementi orqali issiqlik bakka uzatiladi. Natijada foydalanuvchi barqaror bosimdagi issiq suvdan foydalanishi mumkin.

Tizim germetik konstruksiyaga ega bo‘lib, shahar suv bosimi ostida to‘g‘ridan-to‘g‘ri ishlaydi. Bu esa dush va kranlarda qulay va kuchli issiq suv bosimini kafolatlaydi.`;

const bosimliCommonDescRu = `Напорный солнечный водонагреватель TANSO — современная система горячего водоснабжения, предназначенная для работы под давлением городской или центральной водопроводной сети. Вакуумные трубки поглощают солнечную энергию и передают тепло в бак через медные тепловые трубки Heat-pipe, обеспечивая стабильный напор горячей воды.

Система имеет герметичную конструкцию и работает непосредственно под давлением водопровода, обеспечивая высокий уровень комфорта при использовании душа и смесителей.`;

export const initialProducts: Product[] = [
  // 1. 400L Bosimsiz
  {
    id: 'prod-1',
    slug: 'bosimsiz-400l',
    titleUz: '400L bosimsiz quyosh suv isitgichi',
    titleRu: 'Солнечный водонагреватель 400л',
    categoryId: 'cat-1',
    shortDescUz: '400 litrli vakuum trubkali bosimsiz quyosh suv isitish tizimi. Katta xonadonlar va ob’yektlar uchun tejamkor yechim.',
    shortDescRu: 'Солнечный водонагреватель 400л безнапорного типа. Экономичное решение для больших домов и объектов.',
    fullDescUz: bosimsizCommonDescUz,
    fullDescRu: bosimsizCommonDescRu,
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 9591750,
    inStock: true,
    active: true,
    featured: true,
    popular: true,
    specs: [
      { id: 'sp-1', keyUz: 'Hajmi (Capacity)', keyRu: 'Объем', valueUz: '400 Litr', valueRu: '400 Л' },
      { id: 'sp-2', keyUz: 'Tizim turi', keyRu: 'Тип системы', valueUz: 'Bosimsiz (Non-Pressurized)', valueRu: 'Без давления' },
      { id: 'sp-3', keyUz: 'Vakuum trubkasi', keyRu: 'Вакуумные трубки', valueUz: 'Borosilicate glass 3.3', valueRu: 'Боросиликатное стекло 3.3' },
      { id: 'sp-4', keyUz: 'Yutuvchi qatlam (Absorber)', keyRu: 'Поглощающее покрытие', valueUz: 'Cu-SS-AL/N or AL-N-AL', valueRu: 'Cu-SS-AL/N or AL-N-AL' },
      { id: 'sp-5', keyUz: 'Ichki bak', keyRu: 'Внутренний бак', valueUz: '0.4 mm SUS304 oziq-ovqat zanglamaydigan po‘lat', valueRu: '0.4 мм пищевая нерж. сталь SUS304' },
      { id: 'sp-6', keyUz: 'Tashqi bak', keyRu: 'Внешний бак', valueUz: 'Nikel gibrid tashqi bak', valueRu: 'Никелированный внешний бак' },
      { id: 'sp-7', keyUz: 'Izolyatsiya', keyRu: 'Изоляция', valueUz: '50 mm yuqori zichlikdagi poliuretan', valueRu: '50 мм высокоплотный пенополиуретан' },
      { id: 'sp-8', keyUz: 'Karkas / Rama', keyRu: 'Rама / Каркас', valueUz: '1.5 mm galvanizatsiyalangan po‘lat', valueRu: '1.5 мм оцинкованная сталь' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },

  // 2. 300L Bosimsiz
  {
    id: 'prod-2',
    slug: 'bosimsiz-300l',
    titleUz: '300L bosimsiz quyosh suv isitgichi',
    titleRu: 'Солнечный водонагреватель 300л',
    categoryId: 'cat-1',
    shortDescUz: '300 litrli vakuum trubkali bosimsiz quyosh suv isitgich tizimi.',
    shortDescRu: 'Солнечный водонагреватель 300л безнапорного типа.',
    fullDescUz: bosimsizCommonDescUz,
    fullDescRu: bosimsizCommonDescRu,
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 7177500,
    inStock: true,
    active: true,
    featured: true,
    popular: true,
    specs: [
      { id: 'sp-1', keyUz: 'Hajmi (Capacity)', keyRu: 'Объем', valueUz: '300 Litr', valueRu: '300 Л' },
      { id: 'sp-2', keyUz: 'Tizim turi', keyRu: 'Тип системы', valueUz: 'Bosimsiz (Non-Pressurized)', valueRu: 'Без давления' },
      { id: 'sp-3', keyUz: 'Vakuum trubkasi', keyRu: 'Вакуумные трубки', valueUz: 'Borosilicate glass 3.3', valueRu: 'Боросиликатное стекло 3.3' },
      { id: 'sp-4', keyUz: 'Yutuvchi qatlam', keyRu: 'Поглощающее покрытие', valueUz: 'Cu-SS-AL/N or AL-N-AL', valueRu: 'Cu-SS-AL/N or AL-N-AL' },
      { id: 'sp-5', keyUz: 'Ichki bak', keyRu: 'Внутренний бак', valueUz: '0.4 mm SUS304 oziq-ovqat zanglamaydigan po‘lat', valueRu: '0.4 мм пищевая нерж. сталь SUS304' },
      { id: 'sp-6', keyUz: 'Izolyatsiya', keyRu: 'Изоляция', valueUz: '50 mm yuqori zichlikdagi poliuretan', valueRu: '50 мм высокоплотный пенополиуретан' },
      { id: 'sp-7', keyUz: 'Karkas / Rama', keyRu: 'Каркас', valueUz: '1.5 mm galvanizatsiyalangan po‘lat', valueRu: '1.5 мм оцинкованная сталь' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },

  // 3. 250L Bosimsiz
  {
    id: 'prod-3',
    slug: 'bosimsiz-250l',
    titleUz: '250L bosimsiz quyosh suv isitgichi',
    titleRu: 'Солнечный водонагреватель 250л',
    categoryId: 'cat-1',
    shortDescUz: '250 litrli bosimsiz quyosh suv isitgich tizimi.',
    shortDescRu: 'Безнапорный солнечный водонагреватель объемом 250 литров.',
    fullDescUz: bosimsizCommonDescUz,
    fullDescRu: bosimsizCommonDescRu,
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 3340800,
    inStock: true,
    active: true,
    featured: false,
    popular: true,
    specs: [
      { id: 'sp-1', keyUz: 'Hajmi (Capacity)', keyRu: 'Объем', valueUz: '250 Litr', valueRu: '250 Л' },
      { id: 'sp-2', keyUz: 'Tizim turi', keyRu: 'Тип системы', valueUz: 'Bosimsiz (Non-Pressurized)', valueRu: 'Без давления' },
      { id: 'sp-3', keyUz: 'Vakuum trubkasi', keyRu: 'Вакуумные трубки', valueUz: 'Borosilicate glass 3.3', valueRu: 'Боросиликатное стекло 3.3' },
      { id: 'sp-4', keyUz: 'Ichki bak', keyRu: 'Внутренний бак', valueUz: '0.4 mm SUS304 oziq-ovqat zanglamaydigan po‘lat', valueRu: '0.4 мм пищевая нерж. сталь SUS304' },
      { id: 'sp-5', keyUz: 'Izolyatsiya', keyRu: 'Изоляция', valueUz: '50 mm yuqori zichlikdagi poliuretan', valueRu: '50 мм высокоплотный пенополиуретан' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },

  // 4. 200L TS-NSC-20 Bosimsiz Internal Heat Exchanger
  {
    id: 'prod-4',
    slug: 'bosimsiz-200l-ts-nsc-20',
    titleUz: 'Ichki issiqlik almashtirgichli 200L quyosh suv isitgichi TS-NSC-20',
    titleRu: 'Солнечный водонагреватель 200л с внутренним теплообменником TS-NSC-20',
    categoryId: 'cat-1',
    shortDescUz: 'Ichki issiqlik almashtirgichli 200 litrli quyosh suv isitgichi TS-NSC-20.',
    shortDescRu: 'Солнечный водонагреватель 200л с внутренним теплообменником. Модель: TS-NSC-20.',
    fullDescUz: `Ichki issiqlik almashtirgichli (internal heat exchanger) TANSO 200L TS-NSC-20 modeli suvni bilvosita va samarali isitish uchun maxsus ishlab chiqilgan. Bak ichidagi mis spiral orqali issiqlik almashinuvi amalga oshadi.

${bosimsizCommonDescUz}`,
    fullDescRu: `Модель TANSO 200L TS-NSC-20 с внутренним теплообменником предназначена для эффективного и косвенного нагрева воды. Теплообмен происходит через медный змеевик внутри бака.

${bosimsizCommonDescRu}`,
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 6068250,
    inStock: true,
    active: true,
    featured: true,
    popular: false,
    specs: [
      { id: 'sp-1', keyUz: 'Hajmi (Capacity)', keyRu: 'Объем', valueUz: '200 Litr', valueRu: '200 Л' },
      { id: 'sp-2', keyUz: 'Model', keyRu: 'Модель', valueUz: 'TS-NSC-20', valueRu: 'TS-NSC-20' },
      { id: 'sp-3', keyUz: 'Xususiyati', keyRu: 'Особенность', valueUz: 'Ichki issiqlik almashtirgichli (Internal heat exchanger)', valueRu: 'Внутренний теплообменник' },
      { id: 'sp-4', keyUz: 'Vakuum trubkasi', keyRu: 'Вакуумные трубки', valueUz: 'Borosilicate glass 3.3', valueRu: 'Боросиликатное стекло 3.3' },
      { id: 'sp-5', keyUz: 'Ichki bak', keyRu: 'Внутренний бак', valueUz: '0.4 mm SUS304 oziq-ovqat zanglamaydigan po‘lat', valueRu: '0.4 мм пищевая нерж. сталь SUS304' },
      { id: 'sp-6', keyUz: 'Izolyatsiya', keyRu: 'Изоляция', valueUz: '50 mm yuqori zichlikdagi poliuretan', valueRu: '50 мм высокоплотный пенополиуретан' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },

  // 5. 200L Bosimsiz
  {
    id: 'prod-5',
    slug: 'bosimsiz-200l',
    titleUz: '200L bosimsiz quyosh suv isitgichi',
    titleRu: 'Солнечный водонагреватель 200л',
    categoryId: 'cat-1',
    shortDescUz: '200 litrli bosimsiz quyosh suv isitgich tizimi.',
    shortDescRu: 'Безнапорный солнечный водонагреватель объемом 200 литров.',
    fullDescUz: bosimsizCommonDescUz,
    fullDescRu: bosimsizCommonDescRu,
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 5154750,
    inStock: true,
    active: true,
    featured: false,
    popular: true,
    specs: [
      { id: 'sp-1', keyUz: 'Hajmi (Capacity)', keyRu: 'Объем', valueUz: '200 Litr', valueRu: '200 Л' },
      { id: 'sp-2', keyUz: 'Tizim turi', keyRu: 'Тип системы', valueUz: 'Bosimsiz (Non-Pressurized)', valueRu: 'Без давления' },
      { id: 'sp-3', keyUz: 'Vakuum trubkasi', keyRu: 'Вакуумные трубки', valueUz: 'Borosilicate glass 3.3', valueRu: 'Боросиликатное стекло 3.3' },
      { id: 'sp-4', keyUz: 'Ichki bak', keyRu: 'Внутренний бак', valueUz: '0.4 mm SUS304 oziq-ovqat zanglamaydigan po‘lat', valueRu: '0.4 мм пищевая нерж. сталь SUS304' },
      { id: 'sp-5', keyUz: 'Izolyatsiya', keyRu: 'Изоляция', valueUz: '50 mm yuqori zichlikdagi poliuretan', valueRu: '50 мм высокоплотный пенополиуретан' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },

  // 6. 100L Bosimsiz
  {
    id: 'prod-6',
    slug: 'bosimsiz-100l',
    titleUz: '100L bosimsiz quyosh suv isitgichi',
    titleRu: 'Солнечный водонагреватель 100л',
    categoryId: 'cat-1',
    shortDescUz: '100 litrli bosimsiz quyosh suv isitgich tizimi.',
    shortDescRu: 'Безнапорный солнечный водонагреватель объемом 100 литров.',
    fullDescUz: bosimsizCommonDescUz,
    fullDescRu: bosimsizCommonDescRu,
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 3500000,
    inStock: true,
    active: true,
    featured: false,
    popular: false,
    specs: [
      { id: 'sp-1', keyUz: 'Hajmi (Capacity)', keyRu: 'Объем', valueUz: '100 Litr', valueRu: '100 Л' },
      { id: 'sp-2', keyUz: 'Tizim turi', keyRu: 'Тип системы', valueUz: 'Bosimsiz (Non-Pressurized)', valueRu: 'Без давления' },
      { id: 'sp-3', keyUz: 'Vakuum trubkasi', keyRu: 'Вакуумные трубки', valueUz: 'Borosilicate glass 3.3', valueRu: 'Боросиликатное стекло 3.3' },
      { id: 'sp-4', keyUz: 'Ichki bak', keyRu: 'Внутренний бак', valueUz: '0.4 mm SUS304 oziq-ovqat zanglamaydigan po‘lat', valueRu: '0.4 мм пищевая нерж. сталь SUS304' },
      { id: 'sp-5', keyUz: 'Izolyatsiya', keyRu: 'Изоляция', valueUz: '50 mm yuqori zichlikdagi poliuretan', valueRu: '50 мм высокоплотный пенополиуретан' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },

  // 7. 300L Bosimli
  {
    id: 'prod-7',
    slug: 'bosimli-300l',
    titleUz: '300L bosimli quyosh suv isitgichi',
    titleRu: 'Солнечный водонагреватель под давлением 300л',
    categoryId: 'cat-2',
    shortDescUz: '300 litrli bosimli quyosh suv isitgich tizimi. Shahar suv tarmog‘i bosimi ostida ishlaydi.',
    shortDescRu: 'Солнечный водонагреватель под давлением объемом 300 литров. Работает под давлением сети.',
    fullDescUz: bosimliCommonDescUz,
    fullDescRu: bosimliCommonDescRu,
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 10896750,
    inStock: true,
    active: true,
    featured: true,
    popular: true,
    specs: [
      { id: 'sp-1', keyUz: 'Hajmi (Capacity)', keyRu: 'Объем', valueUz: '300 Litr', valueRu: '300 Л' },
      { id: 'sp-2', keyUz: 'Tizim turi', keyRu: 'Тип системы', valueUz: 'Bosimli (Pressurized Heat-Pipe)', valueRu: 'Под давлением' },
      { id: 'sp-3', keyUz: 'Ishchi bosim', keyRu: 'Рабочее давление', valueUz: '0.6 MPa gacha', valueRu: 'До 0.6 МПа' },
      { id: 'sp-4', keyUz: 'Issiqlik uzatish', keyRu: 'Теплопередача', valueUz: 'Mis Heat-pipe uzatish elementi', valueRu: 'Медные Heat-pipe элементы' },
      { id: 'sp-5', keyUz: 'Vakuum trubkalari', keyRu: 'Вакуумные трубки', valueUz: 'Borosilicate glass 3.3', valueRu: 'Боросиликатное стекло 3.3' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },

  // 8. 200L Bosimli
  {
    id: 'prod-8',
    slug: 'bosimli-200l',
    titleUz: '200L bosimli quyosh suv isitgichi',
    titleRu: 'Солнечный водонагреватель под давлением 200л',
    categoryId: 'cat-2',
    shortDescUz: '200 litrli bosimli quyosh suv isitgich tizimi.',
    shortDescRu: 'Солнечный водонагреватель под давлением объемом 200 литров.',
    fullDescUz: bosimliCommonDescUz,
    fullDescRu: bosimliCommonDescRu,
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 7503750,
    inStock: true,
    active: true,
    featured: true,
    popular: true,
    specs: [
      { id: 'sp-1', keyUz: 'Hajmi (Capacity)', keyRu: 'Объем', valueUz: '200 Litr', valueRu: '200 Л' },
      { id: 'sp-2', keyUz: 'Tizim turi', keyRu: 'Тип системы', valueUz: 'Bosimli (Pressurized Heat-Pipe)', valueRu: 'Под давлением' },
      { id: 'sp-3', keyUz: 'Ishchi bosim', keyRu: 'Рабочее давление', valueUz: '0.7 MPa gacha', valueRu: 'До 0.7 МПа' },
      { id: 'sp-4', keyUz: 'Issiqlik uzatish', keyRu: 'Теплопередача', valueUz: 'Mis Heat-pipe uzatish elementi', valueRu: 'Медные Heat-pipe элементы' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },

  // 9. 100L Bosimli
  {
    id: 'prod-9',
    slug: 'bosimli-100l',
    titleUz: '100L bosimli quyosh suv isitgichi',
    titleRu: 'Солнечный водонагреватель под давлением 100л',
    categoryId: 'cat-2',
    shortDescUz: '100 litrli bosimli quyosh suv isitgich tizimi.',
    shortDescRu: 'Солнечный водонагреватель под давлением объемом 100 литров.',
    fullDescUz: bosimliCommonDescUz,
    fullDescRu: bosimliCommonDescRu,
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 4632750,
    inStock: true,
    active: true,
    featured: false,
    popular: false,
    specs: [
      { id: 'sp-1', keyUz: 'Hajmi (Capacity)', keyRu: 'Объем', valueUz: '100 Litr', valueRu: '100 Л' },
      { id: 'sp-2', keyUz: 'Tizim turi', keyRu: 'Тип системы', valueUz: 'Bosimli (Pressurized Heat-Pipe)', valueRu: 'Под давлением' },
      { id: 'sp-3', keyUz: 'Ishchi bosim', keyRu: 'Рабочее давление', valueUz: '0.6 MPa gacha', valueRu: 'До 0.6 МПа' },
      { id: 'sp-4', keyUz: 'Issiqlik uzatish', keyRu: 'Теплопередача', valueUz: 'Mis Heat-pipe uzatish elementi', valueRu: 'Медные Heat-pipe элементы' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },

  // 10. SPLIT — 20 dona kolba
  {
    id: 'prod-10',
    slug: 'split-collector-20-kolba',
    titleUz: 'SPLIT issiqlik trubkalari kollektori — 20 dona kolba',
    titleRu: 'Коллектор тепловых труб SPLIT — 20 колб',
    categoryId: 'cat-3',
    shortDescUz: 'SPLIT turidagi 20 dona vakuum issiqlik trubkali kollektor.',
    shortDescRu: 'Солнечный коллектор SPLIT на 20 вакуумных колб.',
    fullDescUz: `SPLIT turidagi quyosh kollektori vakuum issiqlik trubkalari yordamida quyosh energiyasini issiqlikka aylantirish uchun mo‘ljallangan. Kollektor va issiq suv saqlash tizimi alohida joylashtiriladigan konfiguratsiyalar uchun mo‘ljallangan.`,
    fullDescRu: `Солнечный коллектор SPLIT типа предназначен для преобразования солнечной энергии в тепловую с помощью вакуумных тепловых трубок. Разработан для конфигураций, где коллектор и бак-аккумулятор размещаются раздельно.`,
    images: [
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 5481000,
    inStock: true,
    active: true,
    featured: true,
    popular: true,
    specs: [
      { id: 'sp-1', keyUz: 'Kollektor turi', keyRu: 'Тип коллектора', valueUz: 'SPLIT collector', valueRu: 'Сплит-коллектор' },
      { id: 'sp-2', keyUz: 'Vakuum trubkalar soni', keyRu: 'Количество вакуумных трубок', valueUz: '20 dona kolba', valueRu: '20 шт колб' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  },

  // 11. Bosimsiz SPLIT TS-LPC5818-50
  {
    id: 'prod-11',
    slug: 'split-ts-lpc5818-50',
    titleUz: 'Bosimsiz quyosh issiqlik kollektor tizimi TS-LPC5818-50',
    titleRu: 'Non-Pressurized солнечная тепловая коллекторная система TS-LPC5818-50',
    categoryId: 'cat-4',
    shortDescUz: 'Bosimsiz quyosh issiqlik kollektor tizimi. Modeli: TS-LPC5818-50.',
    shortDescRu: 'Non-Pressurized солнечная тепловая коллекторная система. Модель: TS-LPC5818-50.',
    fullDescUz: `Bosimsiz quyosh issiqlik kollektor tizimi TS-LPC5818-50. Ushbu tizim yuqori samaradorlik va ishonchlilik bilan ishlaydi.`,
    fullDescRu: `Non-Pressurized солнечная тепловая коллекторная система TS-LPC5818-50. Данная система обеспечивает высокую эффективность и надежность.`,
    images: [
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000'
    ],
    priceUSD: 0,
    priceUZS: 3353850,
    inStock: true,
    active: true,
    featured: true,
    popular: true,
    specs: [
      { id: 'sp-1', keyUz: 'Model', keyRu: 'Модель', valueUz: 'TS-LPC5818-50', valueRu: 'TS-LPC5818-50' },
      { id: 'sp-2', keyUz: 'Tizim turi', keyRu: 'Тип системы', valueUz: 'Non-Pressurized / Bosimsiz SPLIT', valueRu: 'Безнапорный SPLIT' }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z'
  }
];

export const initialHeroBanners: HeroBanner[] = [
  {
    id: 'hero-1',
    titleUz: 'Quyosh Energiyasi Bilan Bepul Issiq Suv',
    titleRu: 'Горячая Вода От Солнца Без Лишних Затрат',
    subtitleUz: 'TANSO SOLAR quyosh suv isitgichlari bilan gaz va elektr energiyasini 80% gacha tejang.',
    subtitleRu: 'Экономьте до 80% расходов на газ и электричество с напорными и безнапорными водонагревателями TANSO.',
    bgImageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1920',
    buttonTextUz: 'Katalogga o‘tish',
    buttonTextRu: 'Перейти в каталог',
    buttonLink: '/catalog',
    active: true,
    sortOrder: 1,
  }
];

export const initialServices: Service[] = [
  {
    id: 'serv-1',
    titleUz: 'Quyosh suv isitgichlarini professional montaj qilish',
    titleRu: 'Профессиональный монтаж солнечных водонагревателей',
    descUz: 'Malakali mutaxassislar tomonidan barcha turdagi quyosh suv isitgichlarini o‘rnatish.',
    descRu: 'Установка всех типов солнечных водонагревателей квалифицированными специалистами.',
    iconName: 'Wrench',
    active: true,
    sortOrder: 1,
  },
  {
    id: 'serv-2',
    titleUz: 'Texnik xizmat ko‘rsatish va profilaktika',
    titleRu: 'Техническое обслуживание и профилактика',
    descUz: 'Quyosh tizimlarini yillik profilaktika qilish va nosozliklarni bartaraf etish.',
    descRu: 'Ежегодное профилактическое обслуживание и устранение неисправностей.',
    iconName: 'ShieldCheck',
    active: true,
    sortOrder: 2,
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    titleUz: 'Toshkent viloyatida 300L bosimli quyosh suv isitgichi o‘rnatilishi',
    titleRu: 'Установка напорного водонагревателя 300л в Ташкентской области',
    locationUz: 'Toshkent viloyati',
    locationRu: 'Ташкентская область',
    capacity: '300 L',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
    featured: true,
    active: true,
  }
];

export const initialPartners: Partner[] = [
  {
    id: 'part-1',
    name: 'TANSO Solar Energy',
    logoUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=200',
    websiteUrl: 'https://tansosolar.uz',
    active: true,
    sortOrder: 1,
  }
];

export const initialSiteSettings: SiteSettings = {
  companyName: 'TANSO SOLAR',
  phone1: '+998 90 123 45 67',
  phone2: '+998 71 200 00 00',
  email: 'info@tansosolar.uz',
  addressUz: 'Toshkent shahri, Sergeli tumani, Yangi Sergeli ko‘chasi, 12-uy',
  addressRu: 'г. Ташкент, Сергелийский район, ул. Янги Сергели, дом 12',
  telegram: 'https://t.me/tansosolar',
  instagram: 'https://instagram.com/tansosolar.uz',
  facebook: '',
  youtube: '',
  mapIframeUrl: '',
  workingHoursUz: 'Dush - Shan: 09:00 - 18:00',
  workingHoursRu: 'Пн - Сб: 09:00 - 18:00',
};

export const initialSettings = initialSiteSettings;

export const initialLeads: Lead[] = [];
