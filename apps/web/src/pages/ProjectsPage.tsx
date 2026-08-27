import React from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenConsultation }) => {
  const { language, t, getLoc } = useLanguage();
  const { projects } = useData();

  const activeProjects = projects.filter(p => p.active);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pt-28 pb-20">
      <div className="tanso-container">

        <div className="max-w-3xl mb-12">
          <div className="kicker">BIZNING PORTFOLIOMIZ</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--ink)] tracking-[-0.02em] mt-4">
            {t('projects')}
          </h1>
          <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">
            {language === 'ru'
              ? 'Объекты различной сложности, оснащенные гелиосистемами и солнечными батареями TANSO SOLAR'
              : 'O‘zbekiston bo‘ylab muvaffaqiyatli topshirilgan quyosh suv isitish va elektr stantsiya obyektlari'}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="group card-interactive overflow-hidden"
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

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-[var(--muted)] font-semibold">
                  <span className="flex items-center gap-1 text-[var(--teal-dark)]">
                    <MapPin className="w-3.5 h-3.5" />
                    {getLoc(project, 'location') || project.locationUz || 'O‘zbekiston'}
                  </span>
                  <span>•</span>
                  <span className="font-mono-num">{project.capacity}</span>
                </div>

                <h3 className="text-lg font-extrabold text-[var(--ink)] group-hover:text-[var(--teal-dark)] transition-colors">
                  {getLoc(project, 'title')}
                </h3>

                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {getLoc(project, 'description')}
                </p>

                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted)]">
                  <span className="font-mono-num">{language === 'ru' ? 'Год' : 'Yil'}: {project.year}</span>
                  <button
                    onClick={onOpenConsultation}
                    className="text-[var(--teal-dark)] font-bold hover:underline"
                  >
                    {language === 'ru' ? 'Похожий проект' : 'Shunga o‘xshash loyiha'}
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
