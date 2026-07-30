import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Zap, 
  TrendingUp, 
  Building, 
  Home, 
  Factory, 
  Sprout, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  DollarSign
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SolarCalculatorProps {
  currentLang: Language;
  onOpenContactWithSpec: (specDetails: string) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({
  currentLang,
  onOpenContactWithSpec
}) => {
  const t = translations[currentLang];

  // State
  const [monthlyBill, setMonthlyBill] = useState<number>(1500000); // 1.5M UZS default
  const [propertyType, setPropertyType] = useState<'home' | 'business' | 'industrial' | 'agriculture'>('home');

  // Calculations based on Uzbek solar irradiance & tariff dynamics
  // Average electricity tariff in UZS per kWh (approx 1,000 UZS/kWh for commercial/high tiers)
  const tariffPerKwh = propertyType === 'home' ? 900 : 1000;
  
  // Estimate monthly kWh consumed
  const monthlyKwh = Math.round(monthlyBill / tariffPerKwh);
  const annualKwh = monthlyKwh * 12;

  // Uzbekistan average solar yield per 1 kW installed capacity = ~1,500 kWh / year
  const kwhYieldPerKwYear = 1500;
  
  // Required kW to cover 90% of consumption
  const recommendedKw = Math.max(3, Math.round((annualKwh * 0.9) / kwhYieldPerKwYear));
  
  // Panel count (using ~580W panels)
  const panelCount = Math.ceil((recommendedKw * 1000) / 580);
  
  // Annual energy generated
  const estimatedAnnualGenKwh = Math.round(recommendedKw * kwhYieldPerKwYear);
  
  // Annual financial savings in UZS
  const annualSavingsUzs = Math.round(estimatedAnnualGenKwh * tariffPerKwh);
  
  // Turnkey cost estimate (~$750 - $850 per kW installed = ~9,500,000 UZS / kW)
  const estimatedTotalCostUzs = recommendedKw * 9500000;
  
  // Payback period
  const paybackYears = Math.max(2.8, Number((estimatedTotalCostUzs / annualSavingsUzs).toFixed(1)));

  // CO2 avoided (0.5 kg per kWh)
  const co2AvoidedTons = (estimatedAnnualGenKwh * 0.5 / 1000).toFixed(1);

  const propertyOptions = [
    { id: 'home', label: t.calcPropertyHome, icon: Home },
    { id: 'business', label: t.calcPropertyBusiness, icon: Building },
    { id: 'industrial', label: t.calcPropertyIndustrial, icon: Factory },
    { id: 'agriculture', label: t.calcPropertyAgri, icon: Sprout }
  ];

  const handleRequestQuote = () => {
    const specDetails = `Tavsiya etilgan quvvat: ${recommendedKw} kW (${panelCount} ta panel 580W). Yillik tejamkorlik: ${annualSavingsUzs.toLocaleString()} UZS/yil. Oylik to'lov: ${monthlyBill.toLocaleString()} UZS. Obyekt turi: ${propertyType}.`;
    onOpenContactWithSpec(specDetails);
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background mesh gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-bold mb-4 border border-cyan-200/50 backdrop-blur-md">
            <Calculator className="w-4 h-4 text-cyan-600" />
            <span>Aqlli Onlayn Kalkulyator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            {t.calcTitle}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {t.calcSubtitle}
          </p>
        </div>

        {/* Calculator Card Container */}
        <div className="bg-white/75 backdrop-blur-xl rounded-[32px] border border-white/80 shadow-2xl shadow-cyan-900/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Input Controls Column (Left) */}
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-8 bg-white/50 backdrop-blur-md">
              
              {/* Step 1: Property Type */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>1. {t.calcPropertyType}</span>
                  <span className="text-xs text-cyan-700 font-bold uppercase">{propertyType}</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {propertyOptions.map((opt) => {
                    const IconComponent = opt.icon;
                    const isSelected = propertyType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPropertyType(opt.id as any)}
                        className={`p-3.5 rounded-[20px] border text-left transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-cyan-100/60 border-cyan-600 text-slate-900 shadow-sm font-bold'
                            : 'border-slate-200/80 hover:border-slate-300 bg-white/80 text-slate-700 font-medium'
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-[#0E7490] text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-xs leading-snug">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Monthly Electricity Bill Slider & Presets */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900">
                    2. {t.calcMonthlyBill}
                  </label>
                  <span className="text-lg font-black text-cyan-800 font-display">
                    {monthlyBill.toLocaleString()} UZS
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="300000"
                  max="20000000"
                  step="100000"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200/80 rounded-lg appearance-none cursor-pointer accent-[#0E7490]"
                />

                {/* Quick Presets Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[500000, 1500000, 3000000, 7000000, 15000000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setMonthlyBill(val)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                        monthlyBill === val
                          ? 'bg-[#0F172A] text-white shadow-sm'
                          : 'bg-white/80 text-slate-600 border border-slate-200/60 hover:bg-slate-100'
                      }`}
                    >
                      {(val / 1000000).toFixed(1)}M UZS
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Note */}
              <div className="p-4 rounded-[20px] bg-white/70 border border-slate-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hisoblash O'zbekiston iqlim sharoitlari (o'rtacha 1,500 soat/yil quyosh nuri) hamda Tier-1 580W TOPCon panellarining unumdorlik ko'rsatkichlariga asoslangan.
                </p>
              </div>

            </div>

            {/* Calculations Result Column (Right) */}
            <div className="lg:col-span-6 p-6 sm:p-10 bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#0E7490] text-white space-y-8 flex flex-col justify-between rounded-[28px] lg:m-2 shadow-xl">
              
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                      Tavsiya etilgan yechim
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mt-1 font-display">
                      {recommendedKw} kW <span className="text-sm font-normal text-slate-300">Stansiya Quvvati</span>
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Zap className="w-6 h-6 text-slate-950" />
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 my-6">
                  
                  <div className="p-4 rounded-[20px] bg-white/10 backdrop-blur-md border border-white/10">
                    <p className="text-xs text-slate-300 mb-1">{t.calcPanelCount}</p>
                    <p className="text-2xl font-black text-white font-display">{panelCount} <span className="text-xs text-cyan-300 font-normal">dona</span></p>
                    <p className="text-[11px] text-slate-400 mt-1">LONGi 585W TOPCon</p>
                  </div>

                  <div className="p-4 rounded-[20px] bg-white/10 backdrop-blur-md border border-white/10">
                    <p className="text-xs text-slate-300 mb-1">{t.calcAnnualGen}</p>
                    <p className="text-2xl font-black text-emerald-300 font-display">{estimatedAnnualGenKwh.toLocaleString()}</p>
                    <p className="text-[11px] text-slate-400 mt-1">kWh / yil</p>
                  </div>

                  <div className="p-4 rounded-[20px] bg-white/10 backdrop-blur-md border border-white/10">
                    <p className="text-xs text-slate-300 mb-1">{t.calcAnnualSavings}</p>
                    <p className="text-xl font-black text-teal-200 font-display">~{(annualSavingsUzs / 1000000).toFixed(1)} MLN</p>
                    <p className="text-[11px] text-slate-400 mt-1">so'm / yil</p>
                  </div>

                  <div className="p-4 rounded-[20px] bg-white/10 backdrop-blur-md border border-white/10">
                    <p className="text-xs text-slate-300 mb-1">{t.calcPayback}</p>
                    <p className="text-2xl font-black text-cyan-200 font-display">{paybackYears} <span className="text-xs text-slate-300 font-normal">yil</span></p>
                    <p className="text-[11px] text-slate-400 mt-1">30 yillik xizmat</p>
                  </div>

                </div>

                {/* Environmental Benefit */}
                <div className="flex items-center gap-3 p-3.5 rounded-[20px] bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs backdrop-blur-md">
                  <TrendingUp className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Har yili atmosferaga <strong>{co2AvoidedTons} tonna</strong> CO2 zaharli gazlari chiqishining oldi olinadi.</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleRequestQuote}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#0E7490] hover:bg-[#0F766E] text-white font-bold text-sm shadow-xl shadow-cyan-950/40 active:scale-95 transition-all group"
              >
                <span>{t.calcRequestBtn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
