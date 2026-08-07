import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export const PartnersSection: React.FC = () => {
  const { t } = useLanguage();
  const { partners } = useData();

  const activePartners = partners.filter(p => p.active).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="py-16 bg-[#1A1A1A] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] font-bold tracking-[0.3em] uppercase text-[#F59E0B] mb-8">
          07. {t('partners')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {activePartners.map((partner) => (
            <a
              key={partner.id}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/5 border border-white/10 hover:border-[#064E3B] transition-all flex items-center justify-center text-zinc-300 font-bold text-xs uppercase tracking-widest hover:text-[#F59E0B]"
            >
              <span>{partner.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
