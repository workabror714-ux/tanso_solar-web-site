import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { neon } from '@neondatabase/serverless';
// --- Inlined seed data (originally packages/shared/data/initialData.ts) ---
// Kept in this file rather than imported: see the comment on the db helpers
// below for why.
const initialCategories = [
  {
    id: 'cat-1',
    slug: 'bosimsiz',
    iconName: 'Sun',
    imageUrl: '/images/products/tanso-bosimsiz-main.png',
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
    iconName: 'Droplets',
    imageUrl: '/images/products/tanso-silver.jpg',
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
    iconName: 'Layers',
    imageUrl: '/images/products/tanso-split.jpg',
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
    iconName: 'PanelsTopLeft',
    imageUrl: '/images/products/tanso-split.jpg',
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

const initialProducts = [
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
      '/images/products/tanso-showroom-wide.png',
      '/images/products/tanso-bosimsiz-main.png',
      '/images/products/tanso-showroom.png'
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
      '/images/products/tanso-showroom.png',
      '/images/products/tanso-bosimsiz-main.png',
      '/images/products/tanso-silver.jpg'
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
      '/images/products/tanso-bosimsiz-main.png',
      '/images/products/tanso-showroom.png'
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
      '/images/products/tanso-silver.jpg',
      '/images/products/tanso-showroom.png'
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
      '/images/products/tanso-bosimsiz-main.png',
      '/images/products/tanso-silver.jpg'
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
      '/images/products/tanso-silver.jpg',
      '/images/products/tanso-bosimsiz-main.png'
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
      '/images/products/tanso-showroom-wide.png',
      '/images/products/tanso-silver.jpg'
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
      '/images/products/tanso-silver.jpg',
      '/images/products/tanso-showroom.png'
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
      '/images/products/tanso-bosimsiz-main.png',
      '/images/products/tanso-silver.jpg'
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
      '/images/products/tanso-split.jpg',
      '/images/products/tanso-showroom-wide.png'
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
      '/images/products/tanso-split.jpg',
      '/images/products/tanso-marketing-wide.png'
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

const initialHeroBanners = [
  {
    id: 'hero-1',
    titleUz: 'Quyoshdan issiq suv — har kuni',
    titleRu: 'Горячая вода от солнца — каждый день',
    subtitleUz: 'Uy va biznes uchun TANSO quyosh suv isitgichlari: bosimli, bosimsiz va SPLIT tizimlar.',
    subtitleRu: 'Солнечные водонагреватели TANSO для дома и бизнеса: напорные, безнапорные и SPLIT-системы.',
    bgImageUrl: '/images/products/tanso-showroom-wide.png',
    buttonTextUz: 'Katalogga o‘tish',
    buttonTextRu: 'Перейти в каталог',
    buttonLink: '/catalog',
    active: true,
    sortOrder: 1,
  }
];

const initialServices = [
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

const initialProjects = [
  {
    id: 'proj-1',
    titleUz: 'Toshkent viloyatida 300L bosimli quyosh suv isitgichi o‘rnatilishi',
    titleRu: 'Установка напорного водонагревателя 300л в Ташкентской области',
    locationUz: 'Toshkent viloyati',
    locationRu: 'Ташкентская область',
    capacity: '300 L',
    year: '2025',
    imageUrl: '/images/products/tanso-showroom-wide.png',
    featured: true,
    active: true,
  }
];

const initialPartners = [
  {
    id: 'part-1',
    name: 'TANSO Solar Energy',
    logoUrl: '/images/brand/tanso-logo-header.png',
    websiteUrl: 'https://tansosolar.uz',
    active: true,
    sortOrder: 1,
  }
];

const initialSiteSettings = {
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

const initialSettings = initialSiteSettings;

const initialLeads: any[] = [];


/**
 * Persistence layer for TANSO's admin-editable content, backed by Neon
 * Postgres over Neon's HTTP driver (no TCP/native bindings). Kept inline
 * in server.ts (rather than a separate module) because Vercel's Node
 * function packaging for this project was not including newly added
 * local source files in the deployed function bundle -- every request
 * crashed with ERR_MODULE_NOT_FOUND for the new file, regardless of its
 * name, location or which Postgres client library it used. server.ts
 * itself is already known to deploy correctly, so the fix is to add no
 * new local files at all.
 *
 * Design: one table per entity, each row storing the full object as JSONB
 * under a `data` column, keyed by the entity's own `id`. This mirrors the
 * shapes already defined in packages/shared/types and used throughout the
 * frontend, so no field-by-field column mapping is needed.
 */

type SqlFn = ReturnType<typeof neon>;

let sqlClient: SqlFn | null = null;

function getSql(): SqlFn {
  if (sqlClient) return sqlClient;

  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (!connectionString) {
    throw new Error(
      "Database ulanmagan: DATABASE_URL (yoki POSTGRES_URL) environment variable topilmadi. " +
      "Vercel dashboard -> Storage -> Create Database -> Postgres orqali ulang."
    );
  }

  sqlClient = neon(connectionString);
  return sqlClient;
}

const ROW_TABLES = [
  'categories',
  'products',
  'hero_banners',
  'services',
  'projects',
  'partners',
  'leads',
  'notifications',
] as const;

type RowTable = (typeof ROW_TABLES)[number];

let initPromise: Promise<void> | null = null;

/** Ensures tables exist and are seeded. Safe to call on every request. */
function ensureDb(): Promise<void> {
  if (!initPromise) {
    initPromise = doInit().catch((err) => {
      // Allow a later request to retry instead of permanently wedging
      // this serverless instance on a transient connection failure.
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

async function doInit(): Promise<void> {
  const sql = getSql();

  for (const table of ROW_TABLES) {
    await sql.query(`
      CREATE TABLE IF NOT EXISTS ${table} (
        id TEXT PRIMARY KEY,
        seq SERIAL,
        data JSONB NOT NULL
      );
    `);
  }

  await sql.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY DEFAULT 'main',
      data JSONB NOT NULL
    );
  `);

  await seedIfEmpty('categories', initialCategories as unknown as Record<string, unknown>[]);
  await seedIfEmpty('products', initialProducts as unknown as Record<string, unknown>[]);
  await seedIfEmpty('hero_banners', initialHeroBanners as unknown as Record<string, unknown>[]);
  await seedIfEmpty('services', initialServices as unknown as Record<string, unknown>[]);
  await seedIfEmpty('projects', initialProjects as unknown as Record<string, unknown>[]);
  await seedIfEmpty('partners', initialPartners as unknown as Record<string, unknown>[]);
  await seedIfEmpty('leads', initialLeads as unknown as Record<string, unknown>[]);

  const settingsRows = (await sql.query(`SELECT 1 FROM site_settings WHERE id = 'main'`)) as any[];
  if (settingsRows.length === 0) {
    await sql.query(`INSERT INTO site_settings (id, data) VALUES ('main', $1)`, [
      JSON.stringify(initialSiteSettings),
    ]);
  }

  const notifRows = (await sql.query(`SELECT 1 FROM notifications LIMIT 1`)) as any[];
  if (notifRows.length === 0) {
    const unread = (initialLeads as any[]).filter((l) => !l.isRead);
    for (const lead of unread) {
      const notif = {
        id: `notif-${lead.id}`,
        leadId: lead.id,
        title: 'Yangi so‘rov kelib tushdi',
        message: `${lead.fullName} (${lead.phone}) - ${lead.productName || 'Konsultatsiya'}`,
        createdAt: lead.createdAt,
        isRead: false,
      };
      await sql.query(
        `INSERT INTO notifications (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING`,
        [notif.id, JSON.stringify(notif)]
      );
    }
  }
}

async function seedIfEmpty(table: RowTable, rows: Record<string, unknown>[]): Promise<void> {
  const sql = getSql();
  const existing = (await sql.query(`SELECT 1 FROM ${table} LIMIT 1`)) as any[];
  if (existing.length > 0) return;
  for (const row of rows) {
    await sql.query(`INSERT INTO ${table} (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING`, [
      row.id,
      JSON.stringify(row),
    ]);
  }
}

/** Reads every row of a table as plain objects, in the given order. */
async function getAll<T = any>(table: RowTable, orderBy: string = 'seq ASC'): Promise<T[]> {
  const sql = getSql();
  const rows = await sql.query(`SELECT data FROM ${table} ORDER BY ${orderBy}`);
  return (rows as any[]).map((r) => r.data as T);
}

async function insertRow<T extends { id: string }>(table: RowTable, row: T): Promise<T> {
  const sql = getSql();
  await sql.query(`INSERT INTO ${table} (id, data) VALUES ($1, $2)`, [row.id, JSON.stringify(row)]);
  return row;
}

/** Merges `patch` into the existing row's data (shallow merge, like the old in-memory PATCH). */
async function patchRow<T = any>(table: RowTable, id: string, patch: Record<string, unknown>): Promise<T | null> {
  const sql = getSql();
  const rows = await sql.query(`SELECT data FROM ${table} WHERE id = $1`, [id]);
  if ((rows as any[]).length === 0) return null;
  const updated = { ...(rows as any[])[0].data, ...patch };
  await sql.query(`UPDATE ${table} SET data = $2 WHERE id = $1`, [id, JSON.stringify(updated)]);
  return updated as T;
}

async function deleteRow(table: RowTable, id: string): Promise<void> {
  const sql = getSql();
  await sql.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
}

async function getSettings<T = any>(): Promise<T> {
  const sql = getSql();
  const rows = await sql.query(`SELECT data FROM site_settings WHERE id = 'main'`);
  return (rows as any[])[0]?.data as T;
}

async function updateSettings<T = any>(patch: Record<string, unknown>): Promise<T> {
  const current = await getSettings<Record<string, unknown>>();
  const updated = { ...current, ...patch };
  const sql = getSql();
  await sql.query(`UPDATE site_settings SET data = $1 WHERE id = 'main'`, [JSON.stringify(updated)]);
  return updated as T;
}

/** Replaces the entire hero_banners table contents (matches the old PUT /api/banners semantics). */
async function replaceAllBanners<T extends { id: string }>(banners: T[]): Promise<T[]> {
  const sql = getSql();
  const statements = [
    sql.query('DELETE FROM hero_banners'),
    ...banners.map((banner) =>
      sql.query(`INSERT INTO hero_banners (id, data) VALUES ($1, $2)`, [banner.id, JSON.stringify(banner)])
    ),
  ];
  await sql.transaction(statements);
  return banners;
}

async function sendTelegramNotification(lead: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('[Telegram Notification Skipped] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured.');
    return;
  }

  const message = `☀️ <b>YANGI TANSO SOLAR SO‘ROVI</b>\n\n` +
    `👤 <b>Mijoz:</b> ${lead.fullName}\n` +
    `📞 <b>Telefon:</b> <code>${lead.phone}</code>\n` +
    `📦 <b>Mahsulot:</b> ${lead.productName || 'Umumiy konsultatsiya'}\n` +
    `🏷️ <b>Kategoriya:</b> ${lead.category || 'Konsultatsiya'}\n` +
    `🔢 <b>Soni:</b> ${lead.quantity || 1}\n` +
    `💬 <b>Izoh:</b> ${lead.comment || 'Izoh biriktirilmagan'}\n` +
    `🔗 <b>Manbaa:</b> ${lead.source || '/'}\n` +
    `🕒 <b>Vaqt:</b> ${new Date(lead.createdAt).toLocaleString('uz-UZ')}`;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const resJson = await response.json();
    if (resJson.ok) {
      console.log('[Telegram Notification Sent Successfully]');
    } else {
      console.error('[Telegram Notification Error]', resJson);
    }
  } catch (err) {
    console.error('[Telegram Notification Fetch Exception]', err);
  }
}

const app = express();
const PORT = 3000;

async function startServer() {
  app.use(express.json({ limit: '10mb' }));

  // Ensure the database is ready (tables created + seeded) before any
  // /api request is handled. Cheap after the first call: ensureDb()
  // memoizes its promise per running instance.
  app.use('/api', async (req, res, next) => {
    try {
      await ensureDb();
      next();
    } catch (err: any) {
      console.error('[DB Init Error]', err);
      res.status(500).json({ error: 'Database ulanishda xatolik yuz berdi.', detail: String(err?.message || err) });
    }
  });

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // LEADS API
  app.get('/api/leads', async (req, res) => {
    const leads = await getAll('leads', 'seq DESC');
    res.json(leads);
  });

  app.post('/api/leads', async (req, res) => {
    const { fullName, phone, productId, productName, category, quantity, comment, source, type } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ error: 'Ism va telefon raqami kiritilishi shart.' });
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      type: type || (productId ? 'product_request' : 'consultation'),
      fullName: fullName.trim(),
      phone: phone.trim(),
      productId: productId || undefined,
      productName: productName || undefined,
      category: category || undefined,
      quantity: quantity ? Number(quantity) : 1,
      comment: comment ? comment.trim() : '',
      source: source || '/',
      status: 'NEW' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isRead: false,
      adminNotes: ''
    };

    await insertRow('leads', newLead);

    // Create Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      leadId: newLead.id,
      title: 'Yangi so‘rov kelib tushdi',
      message: `${newLead.fullName} - ${newLead.productName || 'Konsultatsiya'}`,
      createdAt: newLead.createdAt,
      isRead: false
    };
    await insertRow('notifications', newNotif);

    // Trigger Telegram Notification asynchronously
    sendTelegramNotification(newLead);

    res.status(201).json({ success: true, lead: newLead });
  });

  app.patch('/api/leads/:id', async (req, res) => {
    const { id } = req.params;
    const { status, adminNotes, isRead } = req.body;

    const patch: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    if (status !== undefined) patch.status = status;
    if (adminNotes !== undefined) patch.adminNotes = adminNotes;
    if (isRead !== undefined) patch.isRead = isRead;

    const updated = await patchRow('leads', id, patch);
    if (!updated) {
      return res.status(404).json({ error: 'So‘rov topilmadi.' });
    }

    res.json({ success: true, lead: updated });
  });

  app.delete('/api/leads/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('leads', id);
    res.json({ success: true });
  });

  // PRODUCTS API
  app.get('/api/products', async (req, res) => {
    const products = await getAll('products', 'seq DESC');
    res.json(products);
  });

  app.post('/api/products', async (req, res) => {
    const product = {
      ...req.body,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await insertRow('products', product);
    res.status(201).json(product);
  });

  app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await patchRow('products', id, { ...req.body, updatedAt: new Date().toISOString() });
    if (!updated) return res.status(404).json({ error: 'Mahsulot topilmadi.' });
    res.json(updated);
  });

  app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('products', id);
    res.json({ success: true });
  });

  // CATEGORIES API
  app.get('/api/categories', async (req, res) => {
    const categories = await getAll('categories', `(data->>'sortOrder')::int NULLS LAST, seq ASC`);
    res.json(categories);
  });

  app.post('/api/categories', async (req, res) => {
    const category = {
      ...req.body,
      id: `cat-${Date.now()}`
    };
    await insertRow('categories', category);
    res.status(201).json(category);
  });

  app.put('/api/categories/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await patchRow('categories', id, req.body);
    if (!updated) return res.status(404).json({ error: 'Kategoriya topilmadi.' });
    res.json(updated);
  });

  app.delete('/api/categories/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('categories', id);
    res.json({ success: true });
  });

  // HERO BANNERS API
  app.get('/api/banners', async (req, res) => {
    const banners = await getAll('hero_banners', `(data->>'sortOrder')::int NULLS LAST, seq ASC`);
    res.json(banners);
  });

  app.put('/api/banners', async (req, res) => {
    const banners = await replaceAllBanners(req.body);
    res.json(banners);
  });

  // SERVICES API
  app.get('/api/services', async (req, res) => {
    const services = await getAll('services', `(data->>'sortOrder')::int NULLS LAST, seq ASC`);
    res.json(services);
  });

  app.post('/api/services', async (req, res) => {
    const service = { ...req.body, id: `serv-${Date.now()}` };
    await insertRow('services', service);
    res.status(201).json(service);
  });

  app.put('/api/services/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await patchRow('services', id, req.body);
    if (!updated) return res.status(404).json({ error: 'Xizmat topilmadi.' });
    res.json(updated);
  });

  app.delete('/api/services/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('services', id);
    res.json({ success: true });
  });

  // PROJECTS API
  app.get('/api/projects', async (req, res) => {
    const projects = await getAll('projects', 'seq DESC');
    res.json(projects);
  });

  app.post('/api/projects', async (req, res) => {
    const project = { ...req.body, id: `proj-${Date.now()}` };
    await insertRow('projects', project);
    res.status(201).json(project);
  });

  app.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await patchRow('projects', id, req.body);
    if (!updated) return res.status(404).json({ error: 'Loyiha topilmadi.' });
    res.json(updated);
  });

  app.delete('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('projects', id);
    res.json({ success: true });
  });

  // PARTNERS API
  app.get('/api/partners', async (req, res) => {
    const partners = await getAll('partners', `(data->>'sortOrder')::int NULLS LAST, seq ASC`);
    res.json(partners);
  });

  app.post('/api/partners', async (req, res) => {
    const partner = { ...req.body, id: `part-${Date.now()}` };
    await insertRow('partners', partner);
    res.status(201).json(partner);
  });

  app.put('/api/partners/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await patchRow('partners', id, req.body);
    if (!updated) return res.status(404).json({ error: 'Hamkor topilmadi.' });
    res.json(updated);
  });

  app.delete('/api/partners/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('partners', id);
    res.json({ success: true });
  });

  // SETTINGS API
  app.get('/api/settings', async (req, res) => {
    const settings = await getSettings();
    res.json(settings);
  });

  app.put('/api/settings', async (req, res) => {
    const settings = await updateSettings(req.body);
    res.json(settings);
  });

  // NOTIFICATIONS API
  app.get('/api/notifications', async (req, res) => {
    const notifications = await getAll('notifications', 'seq DESC');
    res.json(notifications);
  });

  app.patch('/api/notifications/read-all', async (req, res) => {
    const notifications = await getAll<{ id: string }>('notifications');
    await Promise.all(notifications.map((n) => patchRow('notifications', n.id, { isRead: true })));
    res.json({ success: true });
  });

  // Vite Middleware or Static Production Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (process.env.VERCEL !== '1') {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[TANSO SOLAR Server] Server listening on http://0.0.0.0:${PORT}`);
    });
  }
}

startServer();

export default app;
