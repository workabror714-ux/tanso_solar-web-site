import React from 'react';
import { Phone, Send, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { TansoLogo } from './TansoLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, setLanguage, t, getLoc } = useLanguage();
  const { settings, categories } = useData();

  return (
    <footer className="bg-[#0F1514] text-zinc-300 pt-16 pb-12 border-t border-[#222E2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#222E2B]">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => onNavigate('/')}
              className="text-left group cursor-pointer block"
            >
              <TansoLogo variant="light" className="h-14 sm:h-16" showSubtitle />
            </button>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-normal">
              {language === 'ru'
                ? 'Солнечные водонагреватели TANSO для дома и бизнеса: подбор, консультация и сервис.'
                : 'Uy va biznes uchun TANSO quyosh suv isitgichlari: tanlash, konsultatsiya va servis.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {settings.telegram && (
                <a href={settings.telegram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/[0.035] border border-white/10 hover:border-[#08B4A5]/50 text-zinc-400 hover:text-white flex items-center justify-center transition-all" title="Telegram">
                  <Send className="w-4 h-4 text-[#08B4A5]" />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/[0.035] border border-white/10 hover:border-[#08B4A5]/50 text-zinc-400 hover:text-white flex items-center justify-center transition-all" title="Instagram">
                  <Instagram className="w-4 h-4 text-[#F58A36]" />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/[0.035] border border-white/10 hover:border-[#08B4A5]/50 text-zinc-400 hover:text-white flex items-center justify-center transition-all" title="Facebook">
                  <Facebook className="w-4 h-4 text-[#08B4A5]" />
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/[0.035] border border-white/10 hover:border-[#08B4A5]/50 text-zinc-400 hover:text-white flex items-center justify-center transition-all" title="YouTube">
                  <Youtube className="w-4 h-4 text-[#F58A36]" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4 border-l-2 border-[#04AF9D] pl-2">
              {language === 'ru' ? 'Навигация' : 'Navigatsiya'}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-normal">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-[#04AF9D] transition-colors">
                  {t('home')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/catalog')} className="hover:text-[#04AF9D] transition-colors">
                  {t('catalog')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-[#04AF9D] transition-colors">
                  {t('about')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-[#04AF9D] transition-colors">
                  {t('services')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projects')} className="hover:text-[#04AF9D] transition-colors">
                  {t('projects')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-[#04AF9D] transition-colors">
                  {t('contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Catalog Categories */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4 border-l-2 border-[#04AF9D] pl-2">
              {t('categories')}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-normal">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onNavigate(`/catalog/${cat.slug}`)}
                    className="hover:text-[#04AF9D] transition-colors text-left truncate max-w-[180px]"
                  >
                    {getLoc(cat, 'name')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4 border-l-2 border-[#04AF9D] pl-2">
              {t('contact')}
            </h4>
            <div className="space-y-3 text-xs text-zinc-400 font-normal">
              <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="flex items-start gap-2.5 hover:text-[#04AF9D] transition-colors">
                <Phone className="w-4 h-4 text-[#F6852D] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-zinc-200 font-bold">{settings.phone1}</span>
                  <span className="text-[11px] text-zinc-500">{settings.phone2}</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#04AF9D] flex-shrink-0 mt-0.5" />
                <span>{getLoc(settings, 'address')}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#04AF9D] flex-shrink-0 mt-0.5" />
                <span>{getLoc(settings, 'workingHours')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {settings.companyName}. {t('copyright')}</p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('uz')}
                className={`hover:text-white ${language === 'uz' ? 'text-[#F6852D] font-bold' : ''}`}
              >
                O‘zbekcha
              </button>
              <span>•</span>
              <button
                onClick={() => setLanguage('ru')}
                className={`hover:text-white ${language === 'ru' ? 'text-[#F6852D] font-bold' : ''}`}
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

