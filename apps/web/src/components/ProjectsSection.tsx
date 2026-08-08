import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
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
    <section id="projects-home" className="scroll-mt-28 py-20 bg-[#F8FAF9] border-b border-[#E2E8E6] text-[#0F1514]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#E2E8E6] pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#08B4A5]/10 rounded-full border border-[#08B4A5]/20 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F6852D]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#08B4A5]">
                AMALGA OSHIRILGAN LOYIHALAR
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F1514] uppercase">
              {language === 'ru' ? 'Bыполненные объекты' : 'Bajarilgan loyihalar'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-xl">
              {language === 'ru'
                ? 'Примеры установок и объектов с оборудованием TANSO'
                : 'TANSO uskunalari o‘rnatilgan obyekt va montajlardan namunalar'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#08B4A5] hover:text-[#038a7c] transition-colors group"
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
              className="group bg-[#0F1514] text-white rounded-2xl overflow-hidden border border-[#222E2B] hover:border-[#08B4A5] transition-all cursor-pointer shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.imageUrl || '/images/products/tanso-showroom-wide.png'} 
                  alt={getLoc(project, 'title')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 bg-[#08B4A5] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg shadow-md">
                  {project.capacity}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#F6852D] flex-shrink-0" />
                  <span>{getLoc(project, 'location') || project.locationUz || 'O‘zbekiston'}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="text-base font-extrabold text-white group-hover:text-[#08B4A5] transition-colors line-clamp-2 uppercase">
                  {getLoc(project, 'title')}
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
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

