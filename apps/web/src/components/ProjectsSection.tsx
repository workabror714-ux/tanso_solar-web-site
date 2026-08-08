import React from 'react';
import { MapPin, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface ProjectsSectionProps {
  onNavigate: (path: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  const { language, getLoc } = useLanguage();
  const { projects } = useData();

  const activeProjects = projects.filter(p => p.active).slice(0, 3);

  return (
    <section className="py-20 bg-[#F9F8F6] border-b border-[#1A1A1A]/10 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#1A1A1A]/10 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#064E3B]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#064E3B]">
                05. PORTFOLIO & CASE STUDIES
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light tracking-tight text-[#1A1A1A] italic">
              {language === 'ru' ? 'Bыполненные объекты' : 'Bajarilgan loyihalar'}
            </h2>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-3 max-w-xl">
              {language === 'ru'
                ? 'Реализованные солнечные системы в Ташкенте, Самарканде, Бухаре и других регионах'
                : 'Toshkent, Samarqand, Buxoro va boshqa viloyatlarda o’rnatilgan quyosh isitish va elektr stantsiyalari'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#064E3B] hover:text-[#064E3B]/80 transition-colors group"
          >
            <span>{language === 'ru' ? 'Bсе объекты' : 'Barcha loyihalar'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onNavigate('/projects')}
              className="group bg-[#1A1A1A] text-white overflow-hidden border border-[#1A1A1A]/10 hover:border-[#064E3B] transition-all cursor-pointer shadow-md"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.images?.[0] || project.imageUrl || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000'} 
                  alt={getLoc(project, 'title')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 bg-[#064E3B] text-[#F9F8F6] text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                  {project.capacity}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0" />
                  <span>{getLoc(project, 'location') || project.locationUz || 'O‘zbekiston'}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="font-editorial text-lg font-normal text-white group-hover:text-[#F59E0B] transition-colors line-clamp-2 italic">
                  {getLoc(project, 'title')}
                </h3>

                <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-light">
                  {getLoc(project, 'description')}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
