import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServicesSection } from '../components/ServicesSection';
import { ProcessSection } from '../components/ProcessSection';
import { ContactSection } from '../components/ContactSection';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-28">
      <ServicesSection onNavigate={onNavigate} onOpenConsultation={onOpenConsultation} />
      <ProcessSection />
      <ContactSection />
    </div>
  );
};
