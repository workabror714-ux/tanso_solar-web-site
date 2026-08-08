import React from 'react';
import { MapPin, Calendar, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const { language, t, getLoc } = useLanguage();
  const { projects } = useData();

  const activeProjects = projects.filter(p => p.active);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">
            OUR PORTFOLIO
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight mt-2">
            {t('projects')}
          </h1>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            {language === 'ru'
              ? 'Объекты различной сложности, оснащенные гелиосистемами и солнечными батареями TANSO SOLAR'
              : 'O’zbekiston bo’ylab muvaffaqiyatli topshirilgan quyosh suv isitish va elektr stantsiya obyektlari'}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-500/50 transition-all shadow-xl group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.imageUrl || '/images/products/tanso-showroom-wide.png'} 
                  alt={getLoc(project, 'title')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-zinc-950/80 border border-zinc-800 text-amber-400 text-xs font-bold px-3 py-1 rounded-md backdrop-blur-md">
                  {project.capacity}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-semibold">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {getLoc(project, 'location') || project.locationUz || 'O‘zbekiston'}
                  </span>
                  <span>•</span>
                  <span>{project.capacity}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {getLoc(project, 'title')}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {getLoc(project, 'description')}
                </p>

                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                  <span>Yil: {project.year}</span>
                  <button 
                    onClick={onOpenConsultation}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Shunga o‘xshash loyiha
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
