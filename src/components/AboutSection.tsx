import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Globe2, 
  Cpu, 
  Users,
  Calendar
} from 'lucide-react';
import { Language } from '../types';
import { timelineData } from '../data/mockData';
import { translations } from '../data/translations';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const certificates = [
    { name: 'ISO 9001:2015', desc: 'Sifat nazorati xalqaro standarti', org: 'TÜV Rheinland' },
    { name: 'CE Certification', desc: 'Yevropa xavfsizlik va sifat muvofiqligi', org: 'EU Compliant' },
    { name: 'IEC 61215 / 61730', desc: 'Quyosh panellarining fotoelektrik standarti', org: 'IEC Certified' },
    { name: 'TÜV Rheinland', desc: 'Germaniya sertifikatlashtirish laboratoriyasi', org: 'Germany Standard' }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background mesh */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-bold border border-cyan-200/50 backdrop-blur-md">
              <Building2 className="w-4 h-4 text-cyan-600" />
              <span>Innovatsion Kompaniya</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
              {t.aboutTitle}
            </h2>

            <p className="text-base text-slate-700 leading-relaxed">
              {t.aboutText1}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              {t.aboutText2}
            </p>

            {/* Quick Stats list */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#0E7490] text-white font-bold shadow-md">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900 font-display">12+ Region</p>
                  <p className="text-xs text-slate-500">O'zbekiston bo'ylab</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-emerald-600 text-white font-bold shadow-md">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900 font-display">Tier-1 BNEF</p>
                  <p className="text-xs text-slate-500">Rasmiy hamkorlik</p>
                </div>
              </div>
            </div>

          </div>

          {/* About Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/80">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80"
                alt="TANSO Engineers"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-[24px] bg-white/85 backdrop-blur-xl shadow-lg border border-white/80">
                <p className="text-xs font-bold text-cyan-800 uppercase tracking-wider">TANSO Missiyasi</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  "O'zbekistonda har bir xonadon va sanoat korxonasini toza, arzon va barqaror quyosh energiyasi bilan ta'minlash."
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Timeline Section */}
        <div className="mt-20 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-slate-900 font-display">
              {t.timelineTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1">TANSO rivojlanish va muvaffaqiyatlar xaritasi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineData.map((evt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative p-6 rounded-[28px] bg-white/75 backdrop-blur-xl border border-white/80 shadow-sm hover:shadow-lg transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-cyan-700 font-display">{evt.year}</span>
                  {evt.stat && (
                    <span className="px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] font-extrabold border border-emerald-200/50">
                      {evt.stat}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-slate-900">
                  {evt.title[currentLang]}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.description[currentLang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Row */}
        <div className="mt-20 pt-16 border-t border-slate-200/80">
          <div className="text-center mb-10">
            <h3 className="text-xl font-bold text-slate-900">
              {t.certsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificates.map((cert, idx) => (
              <div key={idx} className="p-5 rounded-[24px] bg-white/75 backdrop-blur-xl border border-white/80 flex items-center gap-4 shadow-sm">
                <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-700 font-bold shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{cert.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
