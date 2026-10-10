import React from 'react';
import { Hero } from '../components/Hero';
import { CategorySection } from '../components/CategorySection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { WhyTanso } from '../components/WhyTanso';
import { PartnersSection } from '../components/PartnersSection';
import { ContactSection } from '../components/ContactSection';
import { Reveal } from '../components/Reveal';
import { Product } from '../types';
import { useSeo } from '../hooks/useSeo';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: (product?: Product | null) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenConsultation }) => {
  useSeo({
    title: 'Солнечный водонагреватель TANSO — quyosh suv isitgichlari Узбекистан',
    description:
      'TANSO — Ўзбекистондаги расмий солнечный водонагреватель провайдери. Bosimli, bosimsiz va SPLIT tizimlar. Напорные, безнапорные и SPLIT солнечные водонагреватели для дома и бизнеса в Узбекистане.',
    path: '/',
  });

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-hidden">
      <Hero onNavigate={onNavigate} onOpenConsultation={() => onOpenConsultation(null)} />
      <Reveal><CategorySection onNavigate={onNavigate} /></Reveal>
      <Reveal><FeaturedProducts onNavigate={onNavigate} onOpenLead={(prod) => onOpenConsultation(prod)} /></Reveal>
      <Reveal><AboutSection onNavigate={onNavigate} /></Reveal>
      <Reveal><ServicesSection onNavigate={onNavigate} onOpenConsultation={() => onOpenConsultation(null)} /></Reveal>
      <Reveal><ProjectsSection onNavigate={onNavigate} /></Reveal>
      <Reveal><WhyTanso /></Reveal>
      <Reveal><PartnersSection /></Reveal>
      <Reveal><ContactSection /></Reveal>
    </div>
  );
};
