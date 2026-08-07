import React from 'react';
import { Sun, Phone, Send, MapPin, Clock, Instagram, Facebook, Youtube, Shield, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  const { language, setLanguage, t, getLoc } = useLanguage();
  const { settings, categories } = useData();

  return (
    <footer className="bg-[#1A1A1A] text-zinc-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => onNavigate('/')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 bg-[#064E3B] text-white flex items-center justify-center">
                <Sun className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <span className="font-editorial text-2xl font-light tracking-wider text-white uppercase block leading-none italic">
                  TANSO <span className="text-[#F59E0B] font-normal">SOLAR</span>
                </span>
                <span className="text-[9px] tracking-[0.3em] text-zinc-400 font-bold uppercase block mt-1">
                  UZBEKISTAN
                </span>
              </div>
            </button>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-light">
              {language === 'ru' 
                ? 'Инновационные решения в сфере солнечного водонагрева и возобновляемой энергетики для частных домов, гостиниц и бизнеса по всему Узбекистану.'
                : 'O’zbekistonda quyosh suv isitish tizimlari hamda fotoelektrik qayta tiklanuvchi energiya echimlarini yetkazib berish va montaj qilish.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 hover:border-[#064E3B] text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 hover:border-[#064E3B] text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 hover:border-[#064E3B] text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 hover:border-[#064E3B] text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4 border-l-2 border-[#064E3B] pl-2">
              {language === 'ru' ? 'Навигация' : 'Navigatsiya'}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-[#F59E0B] transition-colors">
                  {t('home')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/catalog')} className="hover:text-[#F59E0B] transition-colors">
                  {t('catalog')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-[#F59E0B] transition-colors">
                  {t('about')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-[#F59E0B] transition-colors">
                  {t('services')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projects')} className="hover:text-[#F59E0B] transition-colors">
                  {t('projects')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-[#F59E0B] transition-colors">
                  {t('contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Catalog Categories */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4 border-l-2 border-[#064E3B] pl-2">
              {t('categories')}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onNavigate(`/catalog/${cat.slug}`)}
                    className="hover:text-[#F59E0B] transition-colors text-left truncate max-w-[180px]"
                  >
                    {getLoc(cat, 'name')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4 border-l-2 border-[#064E3B] pl-2">
              {t('contact')}
            </h4>
            <div className="space-y-3 text-xs text-zinc-400 font-light">
              <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="flex items-start gap-2.5 hover:text-[#F59E0B] transition-colors">
                <Phone className="w-4 h-4 text-[#064E3B] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-zinc-200 font-bold">{settings.phone1}</span>
                  <span className="text-[11px] text-zinc-500">{settings.phone2}</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#064E3B] flex-shrink-0 mt-0.5" />
                <span>{getLoc(settings, 'address')}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#064E3B] flex-shrink-0 mt-0.5" />
                <span>{getLoc(settings, 'workingHours')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {settings.companyName}. {t('copyright')}</p>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('/admin')}
              className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1 uppercase tracking-wider text-[10px]"
            >
              <span>Admin Dashboard</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('uz')}
                className={`hover:text-white ${language === 'uz' ? 'text-[#F59E0B] font-bold' : ''}`}
              >
                O‘zbekcha
              </button>
              <span>•</span>
              <button
                onClick={() => setLanguage('ru')}
                className={`hover:text-white ${language === 'ru' ? 'text-[#F59E0B] font-bold' : ''}`}
              >
                Русский
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
