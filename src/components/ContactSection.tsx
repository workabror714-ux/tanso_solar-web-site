import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Language, QuoteFormData } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  currentLang: Language;
  initialSpec?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang, initialSpec }) => {
  const t = translations[currentLang];

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'home',
    monthlyBill: '1500000',
    region: 'Toshkent',
    comments: initialSpec || '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background mesh */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-bold mb-4 border border-cyan-200/50 backdrop-blur-md">
            <MessageSquare className="w-4 h-4 text-cyan-600" />
            <span>Bepul Konsultatsiya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            {t.contactTitle}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Info Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office Address Card */}
            <div className="p-6 rounded-[28px] bg-white/75 backdrop-blur-xl border border-white/80 shadow-sm flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-50 text-cyan-700 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t.officeAddress}
                </h4>
                <p className="text-sm font-bold text-slate-900 mt-1 leading-snug font-display">
                  {t.officeAddressVal}
                </p>
                <p className="text-xs text-slate-500 mt-1">Mo'ljal: Yunusobod Business Hub</p>
              </div>
            </div>

            {/* Phones Card */}
            <div className="p-6 rounded-[28px] bg-white/75 backdrop-blur-xl border border-white/80 shadow-sm flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-700 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t.contactPhone}
                </h4>
                <div className="mt-1 space-y-0.5">
                  <a href="tel:+998712000022" className="block text-sm font-bold text-slate-900 hover:text-cyan-700 transition-colors font-display">
                    +998 (71) 200-00-22
                  </a>
                  <a href="tel:+998901234567" className="block text-xs text-slate-600 hover:text-cyan-700 transition-colors">
                    +998 (90) 123-45-67 (24/7 Qo'llab-quvvatlash)
                  </a>
                </div>
              </div>
            </div>

            {/* Email & Telegram Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-[28px] bg-white/75 backdrop-blur-xl border border-white/80 shadow-sm">
                <Mail className="w-5 h-5 text-cyan-600 mb-2" />
                <h4 className="text-[11px] font-bold text-slate-400 uppercase">{t.contactEmail}</h4>
                <a href="mailto:info@tanso.gl.uz" className="text-xs font-bold text-slate-900 hover:text-cyan-700 font-display">
                  info@tanso.gl.uz
                </a>
              </div>

              <div className="p-5 rounded-[28px] bg-white/75 backdrop-blur-xl border border-white/80 shadow-sm">
                <Send className="w-5 h-5 text-teal-600 mb-2" />
                <h4 className="text-[11px] font-bold text-slate-400 uppercase">{t.contactTelegram}</h4>
                <a href="https://t.me/tansogroup" target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-900 hover:text-cyan-700 font-display">
                  @tansogroup
                </a>
              </div>
            </div>

            {/* Interactive Map Container */}
            <div className="rounded-[28px] overflow-hidden border border-white/80 shadow-sm h-56 relative bg-slate-200">
              <iframe
                title="TANSO Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47942.50294101188!2d69.240562!3d41.3275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5 cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[32px] bg-white/75 backdrop-blur-xl border border-white/80 shadow-2xl shadow-cyan-900/5 relative">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 font-display">
                      {t.formSuccessTitle}
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      {t.formSuccessDesc}
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          propertyType: 'home',
                          monthlyBill: '1500000',
                          region: 'Toshkent',
                          comments: '',
                        });
                      }}
                      className="px-6 py-3 rounded-full bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-xs shadow-md"
                    >
                      Yangi murojaat qoldirish
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 font-display">
                        Loyiha So'rovnomasini To'ldiring
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Mutaxassislarimiz 15 daqiqa ichida siz bilan bog'lanib, bepul 3D hisob-kitobni taqdim etishadi.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          {t.formFullName} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="F.I.O. kiriting"
                          className="w-full px-4 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 transition-all shadow-sm"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          {t.formPhone} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+998 (90) 123-45-67"
                          className="w-full px-4 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Property Category */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          {t.calcPropertyType}
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                          className="w-full px-4 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 transition-all shadow-sm"
                        >
                          <option value="home">{t.calcPropertyHome}</option>
                          <option value="business">{t.calcPropertyBusiness}</option>
                          <option value="industrial">{t.calcPropertyIndustrial}</option>
                          <option value="agriculture">{t.calcPropertyAgri}</option>
                        </select>
                      </div>

                      {/* Region */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          Joylashgan Viloyat
                        </label>
                        <select
                          value={formData.region}
                          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 transition-all shadow-sm"
                        >
                          <option value="Toshkent">Toshkent shahri va viloyati</option>
                          <option value="Samarqand">Samarqand viloyati</option>
                          <option value="Fargona">Farg'ona vodiysi (Farg'ona, Andijon, Namangan)</option>
                          <option value="Navoiy">Navoiy / Buxoro viloyatlari</option>
                          <option value="Qashqadaryo">Qashqadaryo / Surxondaryo</option>
                          <option value="Xorazm">Xorazm / Qoraqalpog'iston</option>
                        </select>
                      </div>
                    </div>

                    {/* Comments or Calculated Specs */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        {t.formMessage}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        placeholder="Obyekt maydoni, taxminiy quvvat yoki qo'shimcha talablaringiz..."
                        className="w-full px-4 py-3.5 rounded-[24px] bg-white/80 backdrop-blur-md border border-slate-200/80 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 transition-all shadow-sm"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-full bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-sm shadow-xl shadow-cyan-900/20 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Yuborilmoqda...' : t.formSubmit}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Shaxsiy ma'lumotlaringiz maxfiyligi kafolatlanadi.</span>
                    </div>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
