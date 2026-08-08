import React from 'react';
import { Hero } from '../components/Hero';
import { StatsSection } from '../components/StatsSection';
import { CategorySection } from '../components/CategorySection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { ProcessSection } from '../components/ProcessSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { WhyTanso } from '../components/WhyTanso';
import { PartnersSection } from '../components/PartnersSection';
import { ContactSection } from '../components/ContactSection';
import { Product } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: (product?: Product | null) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Hero onNavigate={onNavigate} onOpenConsultation={() => onOpenConsultation(null)} />
      <StatsSection />
      <CategorySection onNavigate={onNavigate} />
      <FeaturedProducts onNavigate={onNavigate} onOpenLead={(prod) => onOpenConsultation(prod)} />
      <AboutSection onNavigate={onNavigate} />
      <ServicesSection onNavigate={onNavigate} onOpenConsultation={() => onOpenConsultation(null)} />
      <ProcessSection />
      <ProjectsSection onNavigate={onNavigate} />
      <WhyTanso />
      <PartnersSection />
      <ContactSection />
    </div>
  );
};
