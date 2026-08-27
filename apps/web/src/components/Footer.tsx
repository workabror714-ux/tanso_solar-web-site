import React from 'react';
import { Phone, Send, MapPin, Clock, Instagram, Facebook, Youtube, LockKeyhole } from 'lucide-react';
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
    <footer className="bg-[var(--ink)] text-[var(--muted-dark)] pt-16 pb-10 border-t border-white/10">
      <div className="tanso-container">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">

          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-left block"
            >
              <TansoLogo variant="light" className="h-14 sm:h-16" showSubtitle />
            </button>

            <p className="text-xs leading-relaxed max-w-sm">
              {language === 'ru'
                ? 'Солнечные водонагреватели TANSO для дома и бизнеса: подбор, консультация и сервис.'
                : 'Uy va biznes uchun TANSO quyosh suv isitgichlari: tanlash, konsultatsiya va servis.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {settings.telegram && (
                <a href={settings.telegram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/12 hover:border-[var(--teal)] flex items-center justify-center transition-colors" title="Telegram">
                  <Send className="w-4 h-4 text-[var(--muted-dark)]" />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/12 hover:border-[var(--teal)] flex items-center justify-center transition-colors" title="Instagram">
                  <Instagram className="w-4 h-4 text-[var(--muted-dark)]" />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/12 hover:border-[var(--teal)] flex items-center justify-center transition-colors" title="Facebook">
                  <Facebook className="w-4 h-4 text-[var(--muted-dark)]" />
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-white/12 hover:border-[var(--teal)] flex items-center justify-center transition-colors" title="YouTube">
                  <Youtube className="w-4 h-4 text-[var(--muted-dark)]" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4">
              {language === 'ru' ? 'Навигация' : 'Navigatsiya'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
                  {t('home')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/catalog')} className="hover:text-white transition-colors">
                  {t('catalog')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  {t('about')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors">
                  {t('services')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projects')} className="hover:text-white transition-colors">
                  {t('projects')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">
                  {t('contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Catalog Categories */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4">
              {t('categories')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/catalog/${cat.slug}`)}
                    className="hover:text-white transition-colors text-left truncate max-w-[180px] block"
                  >
                    {getLoc(cat, 'name')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4">
              {t('contact')}
            </h4>
            <div className="space-y-3 text-xs">
              <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="flex items-start gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[var(--amber)] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-semibold font-mono-num">{settings.phone1}</span>
                  <span className="text-[11px] font-mono-num">{settings.phone2}</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--teal)] flex-shrink-0 mt-0.5" />
                <span>{getLoc(settings, 'address')}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[var(--teal)] flex-shrink-0 mt-0.5" />
                <span>{getLoc(settings, 'workingHours')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} {settings.companyName}. {t('copyright')}</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => window.location.assign('/admin')}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              title={language === 'ru' ? 'Админ-панель' : 'Admin panel'}
            >
              <LockKeyhole className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('uz')}
                className={`hover:text-white ${language === 'uz' ? 'text-[var(--amber)] font-bold' : ''}`}
              >
                O‘zbekcha
              </button>
              <span>•</span>
              <button
                onClick={() => setLanguage('ru')}
                className={`hover:text-white ${language === 'ru' ? 'text-[var(--amber)] font-bold' : ''}`}
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
