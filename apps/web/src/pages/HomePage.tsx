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
import { Reveal } from '../components/Reveal';
import { Product } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: (product?: Product | null) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-hidden">
      <Hero onNavigate={onNavigate} onOpenConsultation={() => onOpenConsultation(null)} />
      <Reveal><StatsSection /></Reveal>
      <Reveal><CategorySection onNavigate={onNavigate} /></Reveal>
      <Reveal><FeaturedProducts onNavigate={onNavigate} onOpenLead={(prod) => onOpenConsultation(prod)} /></Reveal>
      <Reveal><AboutSection onNavigate={onNavigate} /></Reveal>
      <Reveal><ServicesSection onNavigate={onNavigate} onOpenConsultation={() => onOpenConsultation(null)} /></Reveal>
      <Reveal><ProcessSection /></Reveal>
      <Reveal><ProjectsSection onNavigate={onNavigate} /></Reveal>
      <Reveal><WhyTanso /></Reveal>
      <Reveal><PartnersSection /></Reveal>
      <Reveal><ContactSection /></Reveal>
    </div>
  );
};
