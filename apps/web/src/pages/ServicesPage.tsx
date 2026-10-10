import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServicesSection } from '../components/ServicesSection';
import { ProcessSection } from '../components/ProcessSection';
import { ContactSection } from '../components/ContactSection';
import { useSeo } from '../hooks/useSeo';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const { t } = useLanguage();

  useSeo({
    title: 'Xizmatlar — montaj va servis | Солнечный водонагреватель TANSO',
    description:
      'Солнечный водонагреватель TANSO монтажи, кафолат ва техник хизмат курсатиш. Профессиональная установка и обслуживание солнечных водонагревателей.',
    path: '/services',
  });

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-28">
      <ServicesSection onNavigate={onNavigate} onOpenConsultation={onOpenConsultation} />
      <ProcessSection />
      <ContactSection />
    </div>
  );
};
