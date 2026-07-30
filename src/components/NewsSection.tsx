import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  X,
  BookOpen
} from 'lucide-react';
import { NewsItem, Language } from '../types';
import { newsData } from '../data/mockData';
import { translations } from '../data/translations';

interface NewsSectionProps {
  currentLang: Language;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  return (
    <section id="news" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background mesh */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-bold mb-4 border border-cyan-200/50 backdrop-blur-md">
            <Newspaper className="w-4 h-4 text-cyan-600" />
            <span>Yangiliklar va Maqolalar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            {t.newsTitle}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {t.newsSubtitle}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsData.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer rounded-[28px] bg-white/75 backdrop-blur-xl border border-white/80 hover:border-cyan-300 hover:bg-white/90 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title[currentLang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-semibold">
                    {article.category[currentLang]}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-600" />
                      {article.readTime} {t.readTimeLabel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-cyan-700 transition-colors font-display">
                    {article.title[currentLang]}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.summary[currentLang]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-cyan-700 group-hover:text-cyan-800">
                <span>{t.readFullArticle}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-white/90 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 sm:p-10 text-slate-900 shadow-2xl overflow-hidden my-8"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100/80 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <span className="px-3.5 py-1 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-extrabold uppercase border border-cyan-200/50">
                  {selectedArticle.category[currentLang]}
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight font-display">
                  {selectedArticle.title[currentLang]}
                </h2>

                <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
                  <span className="flex items-center gap-1 font-medium">
                    <User className="w-4 h-4 text-cyan-600" />
                    {selectedArticle.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-cyan-600" />
                    {selectedArticle.date}
                  </span>
                </div>

                <div className="rounded-[24px] overflow-hidden h-64">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title[currentLang]}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
                  <p className="font-semibold text-slate-900 text-base">
                    {selectedArticle.summary[currentLang]}
                  </p>
                  <p>
                    {selectedArticle.content[currentLang]}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2.5 rounded-full bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-xs shadow-md"
                  >
                    Yopish
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
