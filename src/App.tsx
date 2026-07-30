import React, { useState, useEffect } from 'react';
import { Language, Product, Project } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SolarCalculator } from './components/SolarCalculator';
import { ProductsSection } from './components/ProductsSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { NewsSection } from './components/NewsSection';
import { PartnersSection } from './components/PartnersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { ProjectModal } from './components/ProjectModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('uz');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactSpec, setContactSpec] = useState<string>('');

  useEffect(() => {
    const sections = ['hero', 'calculator', 'products', 'services', 'about', 'advantages', 'projects', 'news', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenContactWithSpec = (specDetails: string) => {
    setContactSpec(specDetails);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickQuote = (productName: string) => {
    handleOpenContactWithSpec(`Mahsulot bo'yicha narx so'rovi: ${productName}`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-500 selection:text-white">
      {/* Sticky Top Header */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenCalculator={handleOpenCalculator}
        onOpenContact={handleOpenContact}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main>
        <Hero
          currentLang={currentLang}
          onOpenCalculator={handleOpenCalculator}
          onOpenContact={handleOpenContact}
        />

        <SolarCalculator
          currentLang={currentLang}
          onOpenContactWithSpec={handleOpenContactWithSpec}
        />

        <ProductsSection
          currentLang={currentLang}
          onSelectProduct={setSelectedProduct}
          onQuickQuote={handleQuickQuote}
        />

        <ServicesSection
          currentLang={currentLang}
          onOpenContact={handleOpenContact}
        />

        <AboutSection
          currentLang={currentLang}
        />

        <AdvantagesSection
          currentLang={currentLang}
        />

        <ProjectsSection
          currentLang={currentLang}
          onSelectProject={setSelectedProject}
        />

        <NewsSection
          currentLang={currentLang}
        />

        <PartnersSection
          currentLang={currentLang}
        />

        <ContactSection
          currentLang={currentLang}
          initialSpec={contactSpec}
        />
      </main>

      {/* Dark Corporate Footer */}
      <Footer currentLang={currentLang} />

      {/* Detail Modals */}
      <ProductModal
        product={selectedProduct}
        currentLang={currentLang}
        onClose={() => setSelectedProduct(null)}
        onQuickQuote={handleQuickQuote}
      />

      <ProjectModal
        project={selectedProject}
        currentLang={currentLang}
        onClose={() => setSelectedProject(null)}
        onOpenContactWithSpec={handleOpenContactWithSpec}
      />
    </div>
  );
}
