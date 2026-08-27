import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export const PartnersSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { partners } = useData();
  const activePartners = partners.filter((p) => p.active).sort((a, b) => a.sortOrder - b.sortOrder);

  // Do not show a fake/empty partner strip. It becomes visible automatically
  // as soon as real partner records are added from Admin.
  if (activePartners.length < 2) return null;

  return (
    <section className="py-16 bg-[var(--teal-tint)] text-[var(--ink)]">
      <div className="tanso-container">
        <div className="text-center mb-8">
          <div className="kicker justify-center">HAMKORLAR</div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em]">{t('partners')}</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {activePartners.map((partner) => (
            <a
              key={partner.id}
              href={partner.websiteUrl || '#'}
              target={partner.websiteUrl ? '_blank' : undefined}
              rel={partner.websiteUrl ? 'noopener noreferrer' : undefined}
              className="h-20 min-w-[180px] px-6 rounded-[14px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center hover:border-[var(--teal)] transition-colors"
            >
              {partner.logoUrl ? <img src={partner.logoUrl} alt={partner.name} className="max-h-10 max-w-[150px] object-contain" /> : <span className="text-xs font-extrabold text-[var(--muted)]">{partner.name}</span>}
            </a>
          ))}
        </div>
        <p className="sr-only">{language === 'ru' ? 'Партнеры TANSO' : 'TANSO hamkorlari'}</p>
      </div>
    </section>
  );
};
