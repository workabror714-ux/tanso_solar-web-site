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
    <section id="projects-home" className="scroll-mt-28 py-20 sm:py-24 bg-[var(--paper)] text-[var(--ink)]">
      <div className="tanso-container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[var(--border)] pb-8">
          <div className="max-w-2xl">
            <div className="kicker">AMALGA OSHIRILGAN LOYIHALAR</div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
              {language === 'ru' ? 'Выполненные объекты' : 'Bajarilgan loyihalar'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-3 max-w-xl">
              {language === 'ru'
                ? 'Примеры установок и объектов с оборудованием TANSO'
                : 'TANSO uskunalari o‘rnatilgan obyekt va montajlardan namunalar'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--teal-dark)] hover:text-[var(--teal)] transition-colors group"
          >
            <span>{language === 'ru' ? 'Все объекты' : 'Barcha loyihalar'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onNavigate('/projects')}
              className="group card-interactive overflow-hidden cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden border-b border-[var(--border)]">
                <img
                  src={project.imageUrl || '/images/products/tanso-showroom-wide.png'}
                  alt={getLoc(project, 'title')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 badge bg-[var(--ink)] text-white border-none font-mono-num">
                  {project.capacity}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-[var(--muted)] font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[var(--amber)] flex-shrink-0" />
                  <span>{getLoc(project, 'location') || project.locationUz || 'O‘zbekiston'}</span>
                  <span>•</span>
                  <span className="font-mono-num">{project.year}</span>
                </div>

                <h3 className="text-base font-extrabold text-[var(--ink)] group-hover:text-[var(--teal-dark)] transition-colors line-clamp-2">
                  {getLoc(project, 'title')}
                </h3>

                <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
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
