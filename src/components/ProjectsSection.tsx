import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  MapPin, 
  Zap, 
  Calendar, 
  TrendingUp, 
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Project, Language } from '../types';
import { projectsData } from '../data/mockData';
import { translations } from '../data/translations';

interface ProjectsSectionProps {
  currentLang: Language;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  currentLang,
  onSelectProject
}) => {
  const t = translations[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.projAll },
    { id: 'industrial', label: t.projIndustrial },
    { id: 'residential', label: t.projResidential },
    { id: 'commercial', label: t.projCommercial },
    { id: 'agriculture', label: t.projAgri }
  ];

  const filteredProjects = projectsData.filter((project) => {
    return selectedCategory === 'all' || project.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background mesh */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-bold mb-3 border border-cyan-200/50 backdrop-blur-md">
              <Building className="w-3.5 h-3.5 text-cyan-600" />
              <span>Bajarilgan Portfoliolar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
              {t.projectsTitle}
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              {t.projectsSubtitle}
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0E7490] text-white shadow-md'
                    : 'bg-white/80 backdrop-blur-md hover:bg-white text-slate-700 border border-slate-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group rounded-[32px] bg-white/75 backdrop-blur-xl border border-white/80 hover:border-cyan-500/50 shadow-sm hover:shadow-2xl hover:shadow-cyan-900/5 transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image banner */}
                  <div className="relative h-72 overflow-hidden bg-slate-100">
                    <img
                      src={project.image}
                      alt={project.title[currentLang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Capacity Badge */}
                    <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow-lg">
                      ⚡ {project.capacity}
                    </span>

                    {/* Category */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold border border-slate-700">
                      {project.categoryLabel[currentLang]}
                    </span>

                    {/* Title overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold leading-tight group-hover:text-cyan-300 transition-colors font-display">
                        {project.title[currentLang]}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-300">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          {project.location[currentLang]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {project.description[currentLang]}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {project.highlights[currentLang].map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100/80 mt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Tejamkorlik: <span className="text-cyan-800">{project.annualSavings}</span></span>
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>{t.viewProject}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
