import { Product, Service, Project, NewsItem, TimelineEvent, Advantage, Partner } from '../types';

export const productsData: Product[] = [
  {
    id: 'prod-1',
    name: 'LONGi Hi-MO 6 Explorer 585W N-Type TOPCon',
    category: 'panels',
    categoryLabel: {
      uz: 'Quyosh Panellari',
      ru: 'Солнечные Панели',
      en: 'Solar Panels'
    },
    description: {
      uz: 'HPBC innovatsion hujayra texnologiyasiga ega yuqori samaradorlikdagi N-Type quyosh paneli. Issiqlikka va changga chidamli.',
      ru: 'Высокоэффективная N-Type солнечная панель с инновационной технологией HPBC. Устойчива к нагреву и пыли.',
      en: 'High-efficiency N-Type solar panel featuring HPBC cell technology. Optimized for high temperature resilience.'
    },
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    badge: {
      uz: 'Top Sotuv',
      ru: 'Хит Продаж',
      en: 'Best Seller'
    },
    powerRating: '585 Watt',
    efficiency: '22.8%',
    warranty: '25 Yil / Years',
    isPopular: true,
    priceEstimate: '$125 - $140',
    specs: [
      { label: { uz: 'Hujayra turi', ru: 'Тип ячеек', en: 'Cell Type' }, value: 'N-Type TOPCon Monocrystalline' },
      { label: { uz: 'O\'lchamlari', ru: 'Размеры', en: 'Dimensions' }, value: '2278 x 1134 x 35 mm' },
      { label: { uz: 'Og\'irligi', ru: 'Вес', en: 'Weight' }, value: '27.5 kg' },
      { label: { uz: 'Himoya darajasi', ru: 'Класс защиты', en: 'Protection Class' }, value: 'IP68 Weatherproof' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Huawei SUN2000-50KTL-M2 Smart String Inverter',
    category: 'inverters',
    categoryLabel: {
      uz: 'Inverterlar',
      ru: 'Инверторы',
      en: 'Inverters'
    },
    description: {
      uz: 'Sanoat va tijorat stansiyalari uchun aqlli 3-fazali gibrid inverter. Sun\'iy intellekt xavfsizligi va AI-AFCI arc protection.',
      ru: 'Умный 3-фазный гибридный инвертор для коммерческих СЭС. Система защиты с ИИ AI-AFCI.',
      en: 'Smart 3-phase inverter for commercial solar plants with integrated AI-powered arc fault protection.'
    },
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    badge: {
      uz: 'AI Smart',
      ru: 'Умный ИИ',
      en: 'Smart AI'
    },
    powerRating: '50 kW Three-Phase',
    efficiency: '98.7%',
    warranty: '10 Yil / Years',
    isPopular: true,
    priceEstimate: '$2,800 - $3,200',
    specs: [
      { label: { uz: 'Maks. Kirish Kuchlanishi', ru: 'Макс. Входное Напряжение', en: 'Max Input Voltage' }, value: '1100 V' },
      { label: { uz: 'MPPT Trekerlar', ru: 'МРРТ Трекеры', en: 'MPPT Trackers' }, value: '4 Independent MPPTs' },
      { label: { uz: 'Aloqa', ru: 'Связь', en: 'Communication' }, value: 'RS485, WLAN, 4G, FusionSolar Cloud' },
      { label: { uz: 'Sovutish', ru: 'Охлаждение', en: 'Cooling' }, value: 'Smart Air Cooling' }
    ]
  },
  {
    id: 'prod-3',
    name: 'TANSO PowerWall 15.36 kWh LFP Storage',
    category: 'batteries',
    categoryLabel: {
      uz: 'Akkumulyatorlar',
      ru: 'Аккумуляторы',
      en: 'Storage Batteries'
    },
    description: {
      uz: 'Xonadonlar va offislar uchun premium LiFePO4 (Litiy-Temir-Fosfat) energiya saqlash batareyasi. 6000+ sikl davomiylik.',
      ru: 'Премиальная LiFePO4 батарея для домов и офисов. Более 6000 циклов заряда/разряда.',
      en: 'Premium wall-mounted LiFePO4 battery storage system engineered for 6,000+ deep cycles and 15+ year longevity.'
    },
    image: 'https://images.unsplash.com/photo-1558441719-67051675960a?auto=format&fit=crop&w=800&q=80',
    badge: {
      uz: '6000+ Sikl',
      ru: '6000+ Циклов',
      en: '6000+ Cycles'
    },
    powerRating: '15.36 kWh (51.2V 300Ah)',
    efficiency: '97.5%',
    warranty: '10 Yil / Years',
    isPopular: true,
    priceEstimate: '$2,400 - $2,900',
    specs: [
      { label: { uz: 'Hujayra Kimyosi', ru: 'Химия Ячеек', en: 'Cell Chemistry' }, value: 'LiFePO4 (Grade A EV Cells)' },
      { label: { uz: 'Parallel Ulanish', ru: 'Параллельное Подключение', en: 'Parallel Expansion' }, value: 'Up to 15 units (230kWh)' },
      { label: { uz: 'BMS Tizimi', ru: 'Система BMS', en: 'BMS System' }, value: 'Integrated Smart Touch BMS' },
      { label: { uz: 'Ishchi Harorat', ru: 'Рабочая Температура', en: 'Operating Temp' }, value: '-10°C to +55°C' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Sungrow SH10RT 10kW Hybrid Three-Phase Inverter',
    category: 'inverters',
    categoryLabel: {
      uz: 'Inverterlar',
      ru: 'Инверторы',
      en: 'Inverters'
    },
    description: {
      uz: 'Xususiy xonadonlar uchun ideal 10kW 3-fazali gibrid inverter. Elektr uzilganda 10ms ichida zaxira rejimga o\'tadi.',
      ru: 'Идеальный 10кВт 3-фазный гибридный инвертор для частных домов. Быстрое переключение 10мс.',
      en: 'High-performance 10kW hybrid inverter with seamless 10ms emergency backup transition.'
    },
    image: 'https://images.unsplash.com/photo-1548611716-300183b9c7cf?auto=format&fit=crop&w=800&q=80',
    powerRating: '10 kW Hybrid',
    efficiency: '98.4%',
    warranty: '10 Yil / Years',
    priceEstimate: '$1,350 - $1,600',
    specs: [
      { label: { uz: 'Zaxira O\'tish', ru: 'Время Переключения', en: 'Backup Switch' }, value: '<10 milliseconds' },
      { label: { uz: 'MPPT Diapazoni', ru: 'Диапазон MPPT', en: 'MPPT Range' }, value: '200V - 950V' },
      { label: { uz: 'Ilova', ru: 'Приложение', en: 'Mobile App' }, value: 'iSolarCloud' }
    ]
  },
  {
    id: 'prod-5',
    name: 'TANSO Solar Thermo 300L Pressure Water Heater',
    category: 'heaters',
    categoryLabel: {
      uz: 'Suv Isitgichlar',
      ru: 'Водонагреватели',
      en: 'Solar Water Heaters'
    },
    description: {
      uz: 'Bosim ostida ishlaydigan vakuum naychali quyosh suv isitgichi. Qishki sovuq haroratda ham samarali ishlaydi.',
      ru: 'Всесезонный вакуумный солнечный водонагреватель под давлением. Эффективен зимой.',
      en: 'Pressurized heat-pipe solar water heater designed for round-the-year operation in winter sub-zero temperatures.'
    },
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    powerRating: '300 Liter Capacity',
    efficiency: '95%',
    warranty: '5 Yil / Years',
    priceEstimate: '$650 - $800',
    specs: [
      { label: { uz: 'Naychalar Soni', ru: 'Кол-во Трубок', en: 'Tube Count' }, value: '30 Heat Pipe Tubes' },
      { label: { uz: 'Bak Materiali', ru: 'Материал Бака', en: 'Tank Material' }, value: 'SUS304-2B Stainless Steel' },
      { label: { uz: 'Izolyatsiya', ru: 'Изоляция', en: 'Insulation' }, value: '55mm Polyurethane Foam' }
    ]
  },
  {
    id: 'prod-6',
    name: 'TANSO Commercial Turnkey Solar Station 100kW',
    category: 'turnkey',
    categoryLabel: {
      uz: 'Tayyor Stansiyalar',
      ru: 'Готовые Станции',
      en: 'Turnkey Power Plants'
    },
    description: {
      uz: 'Tijorat obyekti uchun loyihalash, yetkazib berish, montaj va tarmoqqa ulashni o\'z ichiga olgan to\'liq tayyor majmua.',
      ru: 'Готовый комплекс 100кВт "под ключ" с проектированием, доставкой, монтажом и подключением к сети.',
      en: 'Complete 100kW commercial solar power system package including site engineering, delivery, and grid synchronization.'
    },
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
    badge: {
      uz: 'Tayyor Komplekt',
      ru: 'Под Ключ',
      en: 'Turnkey Package'
    },
    powerRating: '100 kW Grid-Tied',
    efficiency: '99.2%',
    warranty: '25 Yil Kafolat / Warranty',
    isPopular: true,
    priceEstimate: '$24,000 - $28,000',
    specs: [
      { label: { uz: 'Yillik Ishlab Chiqarish', ru: 'Годовая Выработка', en: 'Annual Generation' }, value: '~150,000 kWh' },
      { label: { uz: 'O\'zini Qoplash', ru: 'Окупаемость', en: 'Payback Period' }, value: '3.2 - 3.8 Years' },
      { label: { uz: 'Konstruksiya', ru: 'Конструкция', en: 'Structure' }, value: 'Hot-Dip Galvanized Steel Mounts' }
    ]
  }
];

export const servicesData: Service[] = [
  {
    id: 'srv-1',
    iconName: 'Compass',
    title: {
      uz: '3D Loyihalash va Injiniring',
      ru: '3D Проектирование и Инжиниринг',
      en: '3D Design & Engineering'
    },
    shortDesc: {
      uz: 'Obyektning insolatsiyasini 3D modellashtirish hamda optimal burchak va quvvat hisobini bajarish.',
      ru: '3D-моделирование инсоляции объекта, расчет оптимального угла наклона и точной мощности.',
      en: '3D solar irradiance modeling, shading simulation, and precise electrical engineering design.'
    },
    fullDesc: {
      uz: 'Bizning professional muhandislarimiz PVsyst va AutoCAD dasturlarida stansiyangizning 3D modelini va yillik elektr energiya hosilasi simulyatsiyasini amalga oshiradi.',
      ru: 'Наши инженеры разрабатывают 3D-модель станции в PVsyst и AutoCAD с симуляцией годовой выработки.',
      en: 'Our licensed engineers perform 3D site modeling using PVsyst and AutoCAD to maximize solar yield.'
    },
    features: {
      uz: ['3D Insolatsiya va soya simulyatsiyasi', 'Elektr sxemalari va bir chiziqli diagrammalar', 'Kabel va himoya avtomatlari hisobi'],
      ru: ['3D симуляция инсоляции и теней', 'Электрические однолинейные схемы', 'Расчет кабелей и защитной автоматики'],
      en: ['3D Irradiance & Shadow Analysis', 'Electrical Single-Line Diagrams', 'Cable & Protection System Calculation']
    }
  },
  {
    id: 'srv-2',
    iconName: 'Wrench',
    title: {
      uz: 'Kalit Topshirish Montaj',
      ru: 'Монтаж Под Ключ',
      en: 'Turnkey Installation'
    },
    shortDesc: {
      uz: 'Xalqaro sertifikatga ega montajchilarimiz tomonidan tez va xavfsiz o\'rnatish va sozlash.',
      ru: 'Быстрый и безопасный монтаж сертифицированными специалистами международной квалификации.',
      en: 'Rapid, compliant installation by certified solar master technicians.'
    },
    fullDesc: {
      uz: 'Tom va yer usti konstruksiyalarini mustahkam o\'rnatish, alyumin va galvanizli profillardan foydalanish hamda barcha elektr ulash ishlarini xavfsiz bajarish.',
      ru: 'Монтаж надежных кровельных и наземных конструкций из оцинкованной стали с полной гарантией безопасности.',
      en: 'Robust installation of roof and ground structures using hot-dip galvanized steel mounts.'
    },
    features: {
      uz: ['Mustahkam galvanizli konstruksiyalar', 'Sertifikatlangan DC/AC kabellar', 'Yerlashtirish (Zazemleniye) va chaqmoqdan himoya'],
      ru: ['Надежные оцинкованные конструкции', 'Сертифицированные DC/AC кабели', 'Заземление и молниезащита'],
      en: ['Galvanized Anti-Corrosion Racks', 'Certified Solar Rated DC Cables', 'Grounding & Surge Protection']
    }
  },
  {
    id: 'srv-3',
    iconName: 'Activity',
    title: {
      uz: '24/7 Smart Monitoring',
      ru: '24/7 Умный Мониторинг',
      en: '24/7 Smart Monitoring'
    },
    shortDesc: {
      uz: 'Mobil ilova va bulutli platforma orqali stansiyangiz ishlashini real vaqt rejimida kuzatish.',
      ru: 'Мониторинг работы вашей станции в реальном времени через мобильное приложение и облачную платформу.',
      en: 'Real-time telemetry and cloud monitoring via smartphone app.'
    },
    fullDesc: {
      uz: 'TANSO bulutli serverlari orqali stansiyangiz ishlab chiqarayotgan va iste\'mol qilayotgan har bir kilovatt energiyani masofadan kuzatishingiz va avtomatik bildirishnomalar olishingiz mumkin.',
      ru: 'Отслеживание выработки энергии и потребления с возможностью получения мгновенных уведомлений.',
      en: 'Track energy generation, battery status, and load trends directly from your phone.'
    },
    features: {
      uz: ['iOS va Android ilovasi', 'Nosozliklar haqida tezkor SMS va Push xabar', 'Oylik va yillik analitik hisobotlar'],
      ru: ['Приложение для iOS и Android', 'Мгновенные push-уведомления о сбоях', 'Ежемесячные аналитические отчеты'],
      en: ['iOS & Android Native Apps', 'Instant Fault Alerting System', 'Monthly Energy Analytics']
    }
  },
  {
    id: 'srv-4',
    iconName: 'ShieldCheck',
    title: {
      uz: 'Servis va Kafolatli Ta\'mirlash',
      ru: 'Сервис и Гарантийный Ремонт',
      en: 'Service & Warranty Support'
    },
    shortDesc: {
      uz: 'Rejali profilaktika, panellarni yuvish va ehtiyot qismlarni tezkor almashtirish.',
      ru: 'Плановая профилактика, мойка панелей и оперативная замена комплектующих.',
      en: 'Preventive maintenance, robotic panel washing, and rapid spare parts replacement.'
    },
    fullDesc: {
      uz: '25 yillik kafolat muddati davomida doimiy texnik ko\'rik, termovizor bilan tekshirish hamda 24 soat ichida yetib boruvchi tezkor avariyaning oldini olish xizmati.',
      ru: 'Технический осмотр, термографический контроль и выезд аварийной бригады в течение 24 часов.',
      en: 'Comprehensive thermal inspection, IV-curve testing, and emergency technician dispatch within 24 hours.'
    },
    features: {
      uz: ['Termovizorli diaqnostika', 'Panellarni professional yuvish', '24 soatlik tezkor chiqish bryigadasi'],
      ru: ['Тепловизионная диагностика', 'Профессиональная мойка панелей', 'Выезд службы поддержки за 24ч'],
      en: ['Thermographic Inspection', 'Professional Solar Panel Washing', '24-Hour Emergency Response']
    }
  }
];

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    title: {
      uz: 'Navoiy To\'qimachilik Sanoat Majmuasi',
      ru: 'Текстильный Промышленный Комплекс Навои',
      en: 'Navoi Textile Industrial Complex'
    },
    category: 'industrial',
    categoryLabel: {
      uz: 'Sanoat',
      ru: 'Промышленность',
      en: 'Industrial'
    },
    capacity: '1,200 kW (1.2 MW)',
    location: {
      uz: 'Navoiy viloyati',
      ru: 'Навоийская область',
      en: 'Navoi Region'
    },
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    year: '2025',
    annualSavings: '1.8 MLRD UZS',
    description: {
      uz: 'Sanoat korxonasining tom qismida o\'rnatilgan 1.2 megavattli tarmoqli quyosh elektr stansiyasi. Yillik 1.9 million kWh yashil energiya ishlab chiqaradi.',
      ru: 'Сетевая солнечная станция мощностью 1.2 МВт на крыше завода. Вырабатывает 1.9 млн кВтч энергии в год.',
      en: 'A 1.2 Megawatt roof-mounted commercial solar array supplying green energy to textile manufacturing lines.'
    },
    highlights: {
      uz: ['2050 dona LONGi 585W panellari', '24 dona Huawei SUN2000 inverterlari', '100% tarmoqqa sotish tizimi'],
      ru: ['2050 панелей LONGi 585W', '24 инвертора Huawei SUN2000', 'Продажа излишков в сеть'],
      en: ['2050 units LONGi 585W Panels', '24 units Huawei SUN2000 Inverters', 'Net-metering Grid Sync']
    }
  },
  {
    id: 'proj-2',
    title: {
      uz: 'Tashkent Business Tower Rooftop',
      ru: 'Бизнес Центр Ташкент',
      en: 'Tashkent Business Tower'
    },
    category: 'commercial',
    categoryLabel: {
      uz: 'Tijorat',
      ru: 'Коммерция',
      en: 'Commercial'
    },
    capacity: '250 kW Grid-Tied',
    location: {
      uz: 'Toshkent shahri',
      ru: 'г. Ташкент',
      en: 'Tashkent City'
    },
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    year: '2025',
    annualSavings: '380 MLN UZS',
    description: {
      uz: 'Zamonaviy biznes markazi uchun o\'rnatilgan quyosh stansiyasi va 100 kWh zaxira batareya tizimi. Offislar uchun uzluksiz elektr ta\'minoti.',
      ru: 'Солнечная станция 250 кВт с системой резервного питания 100 кВтч для современного бизнес-центра.',
      en: '250 kW solar installation integrated with 100 kWh battery backup guaranteeing uninterrupted computing power for office tenants.'
    },
    highlights: {
      uz: ['3-fazali gibrid tizim', '10ms tezlikda zaxiraga o\'tish', 'Aqlli energiya taqsimoti'],
      ru: ['3-фазная гибридная система', 'Переключение на батареи за 10мс', 'Умное распределение нагрузки'],
      en: ['3-Phase Hybrid Architecture', 'Instant 10ms UPS Transition', 'Smart Peak Shaving']
    }
  },
  {
    id: 'proj-3',
    title: {
      uz: 'Samarqand Agro Farm Suv Nasos Stansiyasi',
      ru: 'Агро Ферма Самарканд - Насосная Станция',
      en: 'Samarkand Agricultural Solar Irrigation'
    },
    category: 'agriculture',
    categoryLabel: {
      uz: 'Qishloq Xo\'jaligi',
      ru: 'Сельское Хозяйство',
      en: 'Agriculture'
    },
    capacity: '180 kW Off-Grid',
    location: {
      uz: 'Samarqand viloyati',
      ru: 'Самаркандская область',
      en: 'Samarkand Region'
    },
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    year: '2024',
    annualSavings: '290 MLN UZS',
    description: {
      uz: 'Markaziy elektr tarmog\'i yo\'q hududdagi 50 gektar bog\'larni sug\'orish uchun mo\'ljallangan avtonom quyosh suv nasos majmuasi.',
      ru: 'Автономная солнечная насосная станция для орошения 50 га садов в районе без центральной электросети.',
      en: 'Off-grid solar pumping station powering deep well pumps for 50 hectares of intensive orchard irrigation.'
    },
    highlights: {
      uz: ['Dizelsiz avtonom sug\'orish', 'Gidravlik avtomatlashtirish', 'Chaqmoqqa qarshi himoya'],
      ru: ['Автономный полив без дизеля', 'Гидравлическая автоматика', 'Полная молниезащита'],
      en: ['100% Zero-Diesel Operation', 'Solar Pump Frequency Inverter', 'Automatic Pressure Control']
    }
  },
  {
    id: 'proj-4',
    title: {
      uz: 'Farg\'ona Smart Residential Villa',
      ru: 'Умная Вилла Фергана',
      en: 'Fergana Smart Eco-Villa'
    },
    category: 'residential',
    categoryLabel: {
      uz: 'Xonadonlar',
      ru: 'Частный Сектор',
      en: 'Residential'
    },
    capacity: '30 kW Hybrid + 30 kWh LFP',
    location: {
      uz: 'Farg\'ona shahri',
      ru: 'г. Фергана',
      en: 'Fergana City'
    },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    year: '2026',
    annualSavings: '45 MLN UZS',
    description: {
      uz: 'Aholi xonadoniga o\'rnatilgan premium 30kW gibrid stansiya. Isitish, sovutish va elektromobil zaryadlash stansiyasi bilan integratsiyalashgan.',
      ru: 'Премиальная гибридная станция 30 кВт с интеграцией систем отопления, кондиционирования и зарядки электромобилей.',
      en: 'Premium 30kW home solar system complete with EV charger and smart home load optimization.'
    },
    highlights: {
      uz: ['EV Zaryadlash stansiyasi 22kW', 'Burchak va fasad panellari', 'Smart Home integratsiyasi'],
      ru: ['Зарядка для электромобиля 22кВт', 'Интеграция с умным домом', 'Полный автономный резерв'],
      en: ['Integrated 22kW EV Fast Charger', 'Home Automation Integration', 'Zero Grid Energy Bills']
    }
  }
];

export const timelineData: TimelineEvent[] = [
  {
    year: '2018',
    title: {
      uz: 'Kompaniya Tashkil Etilishi',
      ru: 'Основание Компании',
      en: 'Company Founding'
    },
    description: {
      uz: 'TANSO kompaniyasiga asos solindi va birinchi muqobil energiya loyihalari boshlandi.',
      ru: 'Основание компании TANSO и старт первых проектов в области альтернативной энергетики.',
      en: 'TANSO was founded as an innovative renewable energy engineering team in Tashkent.'
    },
    stat: '1-chi Loyiha'
  },
  {
    year: '2020',
    title: {
      uz: 'Xalqaro Sertifikatsiya va Tier-1 Hamkorlik',
      ru: 'Международная Сертификация и Tier-1',
      en: 'International Certification & Tier-1'
    },
    description: {
      uz: 'LONGi, Huawei va Sungrow kompaniyalari bilan rasmiy hamkorlik shartnomalari imzolandi.',
      ru: 'Подписание официальных партнерских соглашений с LONGi, Huawei и Sungrow.',
      en: 'Forged official distribution and service partnerships with LONGi, Huawei, and Sungrow.'
    },
    stat: 'ISO 9001'
  },
  {
    year: '2023',
    title: {
      uz: '10 Megavatt Chegarasidan O\'tish',
      ru: 'Преодоление Рубежа 10 Мегаватт',
      en: 'Crossing 10 Megawatts Installed'
    },
    description: {
      uz: 'O\'zbekiston bo\'yicha jami o\'rnatilgan stansiyalar quvvati 10 MW dan oshdi.',
      ru: 'Суммарная мощность установленных электростанций по Узбекистану превысила 10 МВт.',
      en: 'Cumulative deployed capacity surpassed 10 Megawatts across industrial and commercial clients.'
    },
    stat: '10+ MW'
  },
  {
    year: '2026',
    title: {
      uz: 'Raqamli Green Tech Platformasi',
      ru: 'Цифровая Платформа Зеленых Технологий',
      en: 'Digital Green Tech Platform'
    },
    description: {
      uz: 'AI-based smart monitoring va 24/7 bulutli boshqaruv markazi ishga tushirildi.',
      ru: 'Запуск интеллектуального центра AI-мониторинга и облачного управления 24/7.',
      en: 'Launched state-of-the-art AI cloud dispatching center monitoring 1,450+ active solar plants.'
    },
    stat: '18.5+ MW'
  }
];

export const advantagesData: Advantage[] = [
  {
    id: 'adv-1',
    icon: 'Award',
    title: {
      uz: 'Faqat Tier-1 Sertifikatlangan Uskunalar',
      ru: 'Только Оборудование Tier-1',
      en: 'Certified Tier-1 Equipment Only'
    },
    description: {
      uz: 'Bloomberg NEF reytingidagi top-10 talik ishlab chiqaruvchilarning quyosh panellari va inverterlari.',
      ru: 'Оборудование от производителей из топ-10 рейтинга Bloomberg NEF.',
      en: 'Direct procurement from Bloomberg NEF Tier-1 manufacturers ensuring top performance.'
    },
    highlight: 'Tier-1 BNEF'
  },
  {
    id: 'adv-2',
    icon: 'ShieldCheck',
    title: {
      uz: '25 Yillik Ishlash Kafolati',
      ru: '25 Лет Гарантии Выработки',
      en: '25-Year Linear Power Warranty'
    },
    description: {
      uz: 'Quyosh panellari 25 yildan so\'ng ham o\'z quvvatining kamida 84.8% qismini saqlab qolishiga kafolat beramiz.',
      ru: 'Гарантируем сохранение не менее 84.8% первоначальной мощности панелей через 25 лет.',
      en: 'Guaranteed linear power output retaining at least 84.8% original capacity after 25 years.'
    },
    highlight: '25 Years'
  },
  {
    id: 'adv-3',
    icon: 'TrendingUp',
    title: {
      uz: 'Tezkor O\'zini Qoplash (3-4 Yil)',
      ru: 'Быстрая Окупаемость (3-4 Года)',
      en: 'Rapid ROI (3-4 Years)'
    },
    description: {
      uz: 'Davlat tomonidan beriladigan soliq imtiyozlari va yashil tariflar tufayli tez investitsiya qaytishi.',
      ru: 'Быстрый возврат инвестиций благодаря государственным льготам и зеленым тарифам.',
      en: 'Fast payback backed by national green energy tax incentives and net-metering tariffs.'
    },
    highlight: '3-4 Yil ROI'
  },
  {
    id: 'adv-4',
    icon: 'Headphones',
    title: {
      uz: '24/7 Monitoring va Servis Xizmati',
      ru: '24/7 Мониторинг и Служба Сервиса',
      en: '24/7 Dispatch & Service Support'
    },
    description: {
      uz: 'Bulutli nazorat markazimiz va mobil servis brigadalarimiz uzluksiz ishlashni ta\'minlaydi.',
      ru: 'Круглосуточный диспетчерский центр и мобильные сервисные бригады для вашей безопасности.',
      en: 'Dedicated cloud monitoring operations center with rapid mobile field service dispatch.'
    },
    highlight: '24/7 Active'
  }
];

export const newsData: NewsItem[] = [
  {
    id: 'news-1',
    title: {
      uz: 'O\'zbekistonda Quyosh Energiyasi Bo\'yicha Soliq Imtiyozlari va Yashil Tariflar',
      ru: 'Налоговые Льготы и Зеленые Тарифы для Солнечной Энергетики в Узбекистане',
      en: 'Solar Subsidies & Green Electricity Feed-in Tariffs in Uzbekistan'
    },
    summary: {
      uz: 'Quyosh panellarini o\'rnatgan jismoniy va yuridik shaxslar uchun mol-mülk va yer soliqlaridan ozod etish shartlari.',
      ru: 'Условия освобождения от налога на имущество и земельного налога для владельцев СЭС.',
      en: 'Key tax exemptions and net-metering incentives introduced for residential and commercial solar owners.'
    },
    content: {
      uz: 'O\'zbekiston Respublikasi Prezidentining tegishli qaroriga ko\'ra, quyosh panellarini o\'rnatgan fuqarolar va tadbirkorlar 3 yildan 10 yilgacha mol-mülk va yer solig\'idan ozod qilinadi. Shuningdek, ortiqcha ishlab chiqarilgan elektr energiyasini davlat tarmoqlariga 1 kWh uchun belgilangan kafolatlangan narxda sotish imkoniyati yaratilgan.',
      ru: 'Согласно постановлению Президента Республики Узбекистан, владельцы солнечных электростанций освобождаются от налога на имущество и земельного налога на срок от 3 до 10 лет. Излишки электроэнергии можно продавать в единую энергосеть по гарантированному тарифу.',
      en: 'Under recent governmental resolutions, property and land tax exemptions apply for up to 10 years for solar adopters. Surplus power can be fed back into the national grid under guaranteed purchase agreements.'
    },
    category: {
      uz: 'Qonunchilik',
      ru: 'Законодательство',
      en: 'Legislation'
    },
    date: '2026-07-20',
    readTime: '4',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    author: 'TANSO Press Center',
    isFeatured: true
  },
  {
    id: 'news-2',
    title: {
      uz: 'N-Type TOPCon Texnologiyasi: Nima Uchun U P-Type Panellardan 12% Samaraliroq?',
      ru: 'Технология N-Type TOPCon: Почему Она на 12% Эффективнее P-Type?',
      en: 'N-Type TOPCon Technology: Why It Delivers 12% Higher Yield Than Traditional Modules'
    },
    summary: {
      uz: 'Yangi avlod quyosh panellaridagi micro-crack, degradasitya va issiqlik koeffitsientining afzalliklari tahlili.',
      ru: 'Анализ устойчивости к деградации и температурным коэффициентам в модулях нового поколения.',
      en: 'Technical comparison showing how TOPCon cells withstand extreme desert temperatures with minimal degradation.'
    },
    content: {
      uz: 'N-Type TOPCon panellari yuqori haroratda ham o\'z quvvatini yo\'qotmaydi. O\'zbekistonning yozgi issiq iqlimida bu texnologiya har bir kvadrat metrdan ko\'proq energiya olish imkonini beradi.',
      ru: 'Модули N-Type TOPCon сохраняют высокую выработку даже в летний зной. Это идеальное решение для горячего климата Узбекистана.',
      en: 'TOPCon cell architecture minimizes temperature coefficient losses, yielding up to 12% more kilowatt-hours during hot summer peak radiation.'
    },
    category: {
      uz: 'Texnologiyalar',
      ru: 'Технологии',
      en: 'Technology'
    },
    date: '2026-07-12',
    readTime: '6',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    author: 'Chief Engineer Olimov A.'
  }
];

export const partnersData: Partner[] = [
  { id: 'p1', name: 'LONGi Solar', logoText: 'LONGi', country: 'China', tier: 'Tier 1' },
  { id: 'p2', name: 'Huawei Digital Power', logoText: 'HUAWEI', country: 'Global', tier: 'Tier 1' },
  { id: 'p3', name: 'Sungrow Power Supply', logoText: 'SUNGROW', country: 'Global', tier: 'Tier 1' },
  { id: 'p4', name: 'JA Solar', logoText: 'JA SOLAR', country: 'China', tier: 'Tier 1' },
  { id: 'p5', name: 'Schneider Electric', logoText: 'Schneider', country: 'France', tier: 'Global Standard' },
  { id: 'p6', name: 'ABB Power', logoText: 'ABB', country: 'Switzerland', tier: 'Global Standard' },
  { id: 'p7', name: 'Trina Solar', logoText: 'TrinaSolar', country: 'China', tier: 'Tier 1' },
  { id: 'p8', name: 'Canadian Solar', logoText: 'CanadianSolar', country: 'Canada', tier: 'Tier 1' }
];
