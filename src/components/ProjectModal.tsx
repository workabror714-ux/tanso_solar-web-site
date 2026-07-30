import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, MapPin, Calendar, TrendingUp, Zap } from 'lucide-react';
import { Project, Language } from '../types';
import { translations } from '../data/translations';

interface ProjectModalProps {
  project: Project | null;
  currentLang: Language;
  onClose: () => void;
  onOpenContactWithSpec: (spec: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  currentLang,
  onClose,
  onOpenContactWithSpec
}) => {
  if (!project) return null;
  const t = translations[currentLang];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-white/90 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 sm:p-8 text-slate-900 shadow-2xl overflow-hidden my-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100/80 text-slate-500 hover:text-slate-900 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            <div className="relative rounded-[24px] overflow-hidden h-72 bg-slate-100">
              <img
                src={project.image}
                alt={project.title[currentLang]}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold">
                {project.categoryLabel[currentLang]}
              </span>

              <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow-md">
                ⚡ {project.capacity}
              </span>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-black font-display">
                  {project.title[currentLang]}
                </h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {project.location[currentLang]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    Topshirilgan: {project.year}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {project.description[currentLang]}
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-[20px] bg-white/70 border border-slate-200/80">
              <div>
                <p className="text-xs text-slate-500">Stansiya Quvvati</p>
                <p className="text-lg font-bold text-slate-900 font-display">{project.capacity}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Yillik Tejamkorlik</p>
                <p className="text-lg font-bold text-cyan-800 font-display">{project.annualSavings}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Loyiha Xususiyatlari:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.highlights[currentLang].map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-full bg-slate-100/80 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenContactWithSpec(`Ushbu loyiha bo'yicha shunga o'xshash stansiya taklifi kerak: ${project.title[currentLang]} (${project.capacity})`);
                }}
                className="w-full py-3.5 px-6 rounded-full bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-xs shadow-lg shadow-cyan-900/20 transition-all"
              >
                Shu Kabi Loyiha Narxini Hisoblash
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
