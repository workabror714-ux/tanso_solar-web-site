import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sun, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ArrowUp, 
  ShieldCheck, 
  Award, 
  CheckCircle2 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E7490] to-[#14B8A6] flex items-center justify-center text-white shadow-lg">
                <Sun className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight font-display">
                  TANSO<span className="text-cyan-400">ENERGY</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://t.me/tansogroup" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-400 flex items-center justify-center text-slate-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href="tel:+998712000022" 
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-400 flex items-center justify-center text-slate-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:info@tanso.gl.uz" 
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-400 flex items-center justify-center text-slate-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-cyan-400 transition-colors">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('calculator')} className="hover:text-cyan-400 transition-colors">
                  {t.navCalc}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products')} className="hover:text-cyan-400 transition-colors">
                  {t.navProducts}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">
                  {t.navServices}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('projects')} className="hover:text-cyan-400 transition-colors">
                  {t.navProjects}
                </button>
              </li>
            </ul>
          </div>

          {/* Products & Tech */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Yechimlar va Mahsulotlar
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Sanoat quyosh stansiyalari (1MW+)</li>
              <li>• Tijorat gibrid stansiyalari</li>
              <li>• LONGi N-Type TOPCon panellari</li>
              <li>• Huawei Smart String inverterlari</li>
              <li>• TANSO LFP Energiya saqlash batareyalari</li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              {t.newsletterTitle}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.newsletterDesc}
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rahmat! Obuna muvaffaqiyatli amalga oshirildi.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletterPlaceholder}
                  className="w-full px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-xs transition-all shadow-md"
                >
                  {t.subscribeBtn}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Rights & Back to Top */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 TANSO Renewable Energy Group. {t.rightsReserved}</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">{t.privacyPolicy}</span>
            <span className="hover:text-slate-400 cursor-pointer">{t.termsOfService}</span>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            >
              <span>{t.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
