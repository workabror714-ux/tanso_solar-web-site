import React, { useState } from 'react';
import { ShieldCheck, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Certificate {
  id: string;
  image: string;
  titleUz: string;
  titleRu: string;
  subtitleUz: string;
  subtitleRu: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'business-license',
    image: '/images/certificates/business-license.jpg',
    titleUz: 'Biznes ro‘yxatga olish guvohnomasi',
    titleRu: 'Свидетельство о регистрации компании',
    subtitleUz: 'Ishlab chiqaruvchi — rasmiy ro‘yxatga olingan korxona',
    subtitleRu: 'Производитель — официально зарегистрированная компания',
  },
  {
    id: 'iso-9001',
    image: '/images/certificates/iso-9001-quality.jpg',
    titleUz: 'ISO 9001:2015',
    titleRu: 'ISO 9001:2015',
    subtitleUz: 'Sifat menejmenti tizimi sertifikati',
    subtitleRu: 'Сертификат системы менеджмента качества',
  },
  {
    id: 'iso-14001',
    image: '/images/certificates/iso-14001-environmental.jpg',
    titleUz: 'ISO 14001:2015',
    titleRu: 'ISO 14001:2015',
    subtitleUz: 'Ekologik menejment tizimi sertifikati',
    subtitleRu: 'Сертификат системы экологического менеджмента',
  },
  {
    id: 'iso-45001',
    image: '/images/certificates/iso-45001-occupational.jpg',
    titleUz: 'ISO 45001:2018',
    titleRu: 'ISO 45001:2018',
    subtitleUz: 'Mehnat muhofazasi va xavfsizlik tizimi sertifikati',
    subtitleRu: 'Сертификат системы охраны труда и безопасности',
  },
  {
    id: '3c-certificate',
    image: '/images/certificates/3c-certificate.jpg',
    titleUz: 'CCC (3C) sertifikati',
    titleRu: 'Сертификат CCC (3C)',
    subtitleUz: 'Xitoy milliy majburiy mahsulot sertifikati',
    subtitleRu: 'Национальный обязательный сертификат продукции Китая',
  },
  {
    id: 'eco-product',
    image: '/images/certificates/eco-product-certificate.jpg',
    titleUz: 'Ekologik mahsulot sertifikati',
    titleRu: 'Сертификат экологической продукции',
    subtitleUz: 'Xitoy ekologik mahsulot tasdiqnomasi',
    subtitleRu: 'Китайская сертификация экологической продукции',
  },
  {
    id: 'energy-saving',
    image: '/images/certificates/energy-saving-certificate.jpg',
    titleUz: 'Energiya tejamkorligi sertifikati',
    titleRu: 'Сертификат энергоэффективности',
    subtitleUz: 'Xitoy energiya tejamkor mahsulot tasdiqnomasi',
    subtitleRu: 'Китайская сертификация энергоэффективной продукции',
  },
];

// Duplicated once for a seamless infinite marquee loop (track scrolls exactly -50%).
const LOOP_ITEMS = [...CERTIFICATES, ...CERTIFICATES];

export const CertificatesSection: React.FC = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openAt = (id: string) => {
    const idx = CERTIFICATES.findIndex((c) => c.id === id);
    setActiveIndex(idx >= 0 ? idx : 0);
  };
  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + CERTIFICATES.length) % CERTIFICATES.length));
  const next = () => setActiveIndex((i) => (i === null ? null : (i + 1) % CERTIFICATES.length));

  const active = activeIndex !== null ? CERTIFICATES[activeIndex] : null;

  return (
    <section className="py-20 sm:py-24 bg-[var(--ink)] text-white overflow-hidden">
      <div className="tanso-container">
        <div className="max-w-2xl">
          <div className="kicker-dark">
            {language === 'ru' ? 'СЕРТИФИКАТЫ' : 'SERTIFIKATLAR'}
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.02em] leading-[1.1] text-white">
            {language === 'ru'
              ? 'Международные сертификаты качества и безопасности'
              : 'Xalqaro sifat va xavfsizlik sertifikatlari'}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--muted-dark)]">
            {language === 'ru'
              ? 'Продукция TANSO производится заводом, подтвердившим соответствие ISO 9001, ISO 14001, ISO 45001, а также национальным сертификатам качества и энергоэффективности Китая.'
              : 'TANSO mahsulotlari ISO 9001, ISO 14001, ISO 45001 xalqaro standartlariga, shuningdek Xitoyning milliy sifat va energiya tejamkorligi sertifikatlariga mos ishlab chiqariladi.'}
          </p>
        </div>
      </div>

      {/* Auto-sliding certificate marquee — full-bleed, edges faded with a gradient mask */}
      <div className="relative mt-12 sm:mt-14 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max gap-5 animate-cert-scroll">
          {LOOP_ITEMS.map((cert, i) => (
            <button
              key={`${cert.id}-${i}`}
              type="button"
              onClick={() => openAt(cert.id)}
              className="group relative w-[220px] sm:w-[250px] shrink-0 overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.03] text-left transition-all duration-300 hover:border-[var(--teal)] hover:bg-white/[0.06]"
              aria-label={language === 'ru' ? cert.titleRu : cert.titleUz}
            >
              <div className="relative h-[280px] sm:h-[320px] overflow-hidden bg-white">
                <img
                  src={cert.image}
                  alt={language === 'ru' ? cert.titleRu : cert.titleUz}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--ink)]/0 opacity-0 transition-opacity duration-300 group-hover:bg-[var(--ink)]/35 group-hover:opacity-100">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[var(--ink)]">
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[13px] font-extrabold leading-tight text-white">
                  {language === 'ru' ? cert.titleRu : cert.titleUz}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-[var(--muted-dark)] line-clamp-2">
                  {language === 'ru' ? cert.subtitleRu : cert.subtitleUz}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="tanso-container">
        <div className="mt-10 flex items-center gap-2.5 text-xs text-[var(--muted-dark)]">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--teal)]" />
          <span>
            {language === 'ru'
              ? 'Оригиналы сертификатов доступны по запросу.'
              : 'Sertifikatlarning asl nusxalari so‘rov bo‘yicha taqdim etiladi.'}
          </span>
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/85 p-4 py-10 backdrop-blur-sm animate-fade-in"
          onClick={close}
        >
          <div
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute -top-11 right-0 grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10"
              aria-label="Yopish"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-hidden rounded-[14px] border border-white/10 bg-white">
              <img
                src={active.image}
                alt={language === 'ru' ? active.titleRu : active.titleUz}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prev}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10"
                aria-label="Oldingi"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="text-center">
                <p className="text-sm font-extrabold text-white">{language === 'ru' ? active.titleRu : active.titleUz}</p>
                <p className="mt-0.5 text-xs text-[var(--muted-dark)]">{language === 'ru' ? active.subtitleRu : active.subtitleUz}</p>
              </div>

              <button
                type="button"
                onClick={next}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10"
                aria-label="Keyingi"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
