import React from 'react';
import { HeroVideo } from '../components/HeroVideo';
import { ClientMarquee } from '../components/ClientMarquee';
import { AppPage } from '../components/Navbar';
import { MachineCategory } from '../types';
import {
  Cpu,
  Layers,
  Wrench,
  Cog,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  PhoneCall,
  FileText,
} from 'lucide-react';
import facilityImg from '../assets/images/hero_industrial_automation_1790239853481.jpg';
import { COMPANY_INFO } from '../data/company';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onSelectPage: (page: AppPage) => void;
  onSelectCategory: (category: MachineCategory) => void;
  onOpenRfq: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectPage,
  onSelectCategory,
  onOpenRfq,
}) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  const capabilities = [
    {
      category: 'automation' as MachineCategory,
      title: language === 'en' ? 'Customized Machine & Automation' : 'Customized Machine & Automation',
      subtitle: language === 'en' ? 'Robotic Automation & Special Purpose Machines' : 'Sistem Otomasi Robotik & Mesin Khusus',
      desc:
        language === 'en'
          ? 'Turnkey design and manufacturing of automated assembly lines (SPM), robotic welding cells, high-sensitivity leak testing machines, conveyor systems, and integrated PLC/SCADA control panels.'
          : 'Perancangan dan fabrikasi mesin perakitan otomatis (SPM), robot cell welding, automated leak testing, conveyor packaging, dan PLC/SCADA control panel.',
      highlights:
        language === 'en'
          ? ['SCARA & 6-Axis Robot Integration', 'Optimized Rapid Cycle Time', 'Leak Test Sensitivity to 0.1 Pa']
          : ['Integrasi Robot SCARA & 6-Axis', 'Cycle Time Lebih Cepat', 'Sensitivitas Leak Test 0.1 kPa'],
      icon: Cpu,
      color: 'from-amber-500/20 to-transparent',
    },
    {
      category: 'jig-fixture' as MachineCategory,
      title: language === 'en' ? 'Precision Jig & Fixture Tooling' : 'Precision Jig & Fixture Tooling',
      subtitle: language === 'en' ? 'Hydraulic Clamping & Metrology Checking Fixtures' : 'Hydraulic Clamping & Checking Fixtures',
      desc:
        language === 'en'
          ? 'High-precision workholding fixtures for multi-axis CNC machining centers and accredited metrology checking fixtures for automotive sheet metal and chassis inspection.'
          : 'Tooling jig presisi tinggi untuk machining center dan checking fixture metrologi untuk inspeksi dimensi bodi & sasis otomotif bersertifikasi.',
      highlights:
        language === 'en'
          ? ['Manufacturing Accuracy ±0.005 mm', 'Pascal / Kosmek Hydraulic Clamping', 'Zero-Play Hardened SKD11 Bushings']
          : ['Akurasi Dimensi ±0.005 mm', 'Sistem Klem Hidrolik Pascal/Kosmek', 'Zero-Play Bushing Hardened SKD11'],
      icon: Layers,
      color: 'from-blue-500/20 to-transparent',
    },
    {
      category: 'dies-moulds' as MachineCategory,
      title: language === 'en' ? 'Heavy Duty Dies & Moulds' : 'Heavy Duty Dies & Moulds',
      subtitle: language === 'en' ? 'Progressive, Transfer & Tandem Stamping Dies' : 'Progressive, Transfer & Tandem Dies',
      desc:
        language === 'en'
          ? 'Custom metal stamping dies for high-tensile sheet metal up to 6mm thickness, plus precision injection mould tooling for automotive structural parts and industrial electronics.'
          : 'Pembuatan cetakan stamping logam plat tebal hingga 6mm dan dies presisi untuk komponen struktural otomotif, electrical parts, dan peralatan industri.',
      highlights:
        language === 'en'
          ? ['Press Tonnage Rating 110T – 250T', 'Max Die Base 3,000 x 2,000 mm', 'Premium Tool Steel DIN 1.2379 / SKD11']
          : ['Kapasitas Mesin Press 110T – 250T', 'Maksimal Die Base 3.000 x 2.000 mm', 'Material Tool Steel DIN 1.2379 / SKD11'],
      icon: Wrench,
      color: 'from-emerald-500/20 to-transparent',
    },
    {
      category: 'mass-production' as MachineCategory,
      title: language === 'en' ? 'Mass Production Parts Machining' : 'Mass Production Parts Machining',
      subtitle: language === 'en' ? 'High-Volume Stamping & 4-Axis CNC Turning' : 'Stamping & CNC Machining Volume Tinggi',
      desc:
        language === 'en'
          ? 'Continuous mass production line for automotive powertrain components, bearing spacers, precision bushings, and structural brackets with strict ISO 9001:2015 quality assurance.'
          : 'Lini produksi massal komponen presisi otomotif, bearing spacer, bushing, shaft, dan braket logam dengan jaminan mutu konsisten bersertifikat ISO 9001:2015.',
      highlights:
        language === 'en'
          ? ['Monthly Output >100,000 pcs', 'In-Line Quality Control & CMM Audit', 'Established Tier-1 Automotive Supply']
          : ['Output >100.000 pcs / bulan', 'In-Line Quality Control & CMM', 'Supply Chain Tier-1 Otomotif'],
      icon: Cog,
      color: 'from-purple-500/20 to-transparent',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroVideo
        onOpenRfq={onOpenRfq}
        onExploreCatalog={() => {
          onSelectPage('katalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          onSelectCategory(cat as MachineCategory);
          onSelectPage('katalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Client & Technical Partner Logos Section */}
      <ClientMarquee />

      {/* 3. Core Manufacturing Pillars Section - Subtle Distinct Shading */}
      <section
        className={`py-16 sm:py-20 border-b relative transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-[#0c0f17] via-[#101420] to-[#0d1018] border-neutral-800/80'
            : 'bg-gradient-to-b from-white via-slate-50 to-white border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-2 border ${
                  isDark
                    ? 'bg-amber-400/10 border-amber-400/25 text-amber-400'
                    : 'bg-amber-50 border-amber-300 text-amber-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.home.pillarsBadge}</span>
              </div>
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {t.home.pillarsTitle}
              </h2>
              <p
                className={`mt-2 text-xs sm:text-sm md:text-base max-w-2xl ${
                  isDark ? 'text-neutral-300' : 'text-slate-600'
                }`}
              >
                {t.home.pillarsDesc}
              </p>
            </div>

            <button
              onClick={() => {
                onSelectPage('katalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md self-start md:self-auto cursor-pointer"
            >
              <span>{t.home.viewFullCatalog}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cards Grid - 1 Col on HP, 2 Cols on Tablet & PC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.category}
                  className={`group p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-md relative overflow-hidden ${
                    isDark
                      ? 'bg-[#0e121a]/95 border-neutral-800/90 hover:border-amber-400/50 hover:shadow-amber-500/5'
                      : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-slate-200 hover:shadow-lg'
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${item.color} rounded-bl-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity`}
                  />

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                          isDark
                            ? 'bg-amber-400/10 border-amber-400/30 text-amber-400'
                            : 'bg-amber-50 border-amber-300 text-amber-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span
                          className={`text-[11px] font-mono uppercase tracking-wider block ${
                            isDark ? 'text-amber-400' : 'text-amber-700'
                          }`}
                        >
                          {item.subtitle}
                        </span>
                        <h3
                          className={`text-lg sm:text-xl font-bold font-display ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                        isDark ? 'text-neutral-300' : 'text-slate-600'
                      }`}
                    >
                      {item.desc}
                    </p>

                    <div className="space-y-2 mb-6">
                      {item.highlights.map((h, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2 text-xs ${
                            isDark ? 'text-neutral-200' : 'text-slate-700'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`pt-4 border-t flex items-center justify-between ${
                      isDark ? 'border-neutral-800/80' : 'border-slate-200'
                    }`}
                  >
                    <button
                      onClick={() => {
                        onSelectCategory(item.category);
                        onSelectPage('katalog');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`text-xs font-semibold flex items-center gap-1.5 cursor-pointer group-hover:underline ${
                        isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'
                      }`}
                    >
                      <span>{t.home.viewMachineSpecs}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={onOpenRfq}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-md border cursor-pointer transition-colors ${
                        isDark
                          ? 'text-neutral-400 hover:text-white bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                          : 'text-slate-600 hover:text-slate-950 bg-slate-100 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {t.home.requestEstimate}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Plant Teaser / Facility Preview Banner - Subtle Contrast */}
      <section
        className={`py-16 sm:py-20 border-b transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-[#0d1018] via-[#131724] to-[#0e1119] border-neutral-800/80'
            : 'bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-3xl border overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center shadow-xl ${
              isDark
                ? 'border-neutral-800/90 bg-[#10141f]/90'
                : 'border-slate-200 bg-white shadow-slate-200'
            }`}
          >
            <div className="lg:col-span-5 relative aspect-[16/11] lg:aspect-auto lg:h-full bg-neutral-900">
              <img
                src={facilityImg}
                alt="Fasilitas Pabrik MM2100 Cibitung PT Prima Teknik Trada"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 lg:hidden ${
                  isDark
                    ? 'bg-gradient-to-t from-[#10141f]/90 via-transparent to-transparent'
                    : 'bg-gradient-to-t from-white/90 via-transparent to-transparent'
                }`}
              />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-5 sm:space-y-6">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${
                  isDark
                    ? 'bg-amber-400/10 border-amber-400/25 text-amber-400'
                    : 'bg-amber-50 border-amber-300 text-amber-700'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{t.home.facilityTeaserBadge}</span>
              </div>

              <h2
                className={`text-2xl sm:text-3xl font-extrabold font-display tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {t.home.facilityTeaserTitle}
              </h2>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-neutral-300' : 'text-slate-600'
                }`}
              >
                {t.home.facilityTeaserDesc}
              </p>

              {/* Quick Facility Metric Badges - 2 cols on HP, 3 cols on Tablet & PC */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 font-mono text-xs">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-[#090c12] border-neutral-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>
                    {t.home.buildingAreaLabel}
                  </div>
                  <div className={`font-bold text-sm mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    2,400 m²
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-[#090c12] border-neutral-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>
                    {t.home.doubleColumnStrokeLabel}
                  </div>
                  <div className="text-amber-500 font-bold text-sm mt-0.5">
                    3,000 mm
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl border col-span-2 sm:col-span-1 ${
                    isDark ? 'bg-[#090c12] border-neutral-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>
                    {t.home.certificationLabel}
                  </div>
                  <div className={`font-bold text-sm mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    ISO 9001:2015
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    onSelectPage('fasilitas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                >
                  <span>{t.home.openFacilitiesPage}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onSelectPage('tentang');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-4 py-3 text-xs font-semibold rounded-xl transition-all cursor-pointer border ${
                    isDark
                      ? 'text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border-neutral-700'
                      : 'text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border-slate-300'
                  }`}
                >
                  {t.home.aboutAndContact}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Ready to Quote - Rich Warm Amber Glow Blend */}
      <section
        className={`py-16 sm:py-20 transition-colors duration-300 relative ${
          isDark
            ? 'bg-gradient-to-b from-[#0e1119] via-[#161a28] to-[#080a0f]'
            : 'bg-gradient-to-b from-white via-amber-50/50 to-slate-100'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${
              isDark
                ? 'bg-amber-400/10 border-amber-400/25 text-amber-400'
                : 'bg-amber-50 border-amber-300 text-amber-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.home.ctaBadge}</span>
          </div>

          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.home.ctaTitle}
          </h2>

          <p
            className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
              isDark ? 'text-neutral-300' : 'text-slate-600'
            }`}
          >
            {t.home.ctaDesc}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                onSelectPage('tentang');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <FileText className="w-4 h-4" />
              <span>{t.home.ctaRfqBtn}</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className={`px-5 py-3.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 border ${
                isDark
                  ? 'text-white bg-neutral-900 hover:bg-neutral-800 border-neutral-700'
                  : 'text-slate-900 bg-white hover:bg-slate-50 border-slate-300 shadow-xs'
              }`}
            >
              <PhoneCall className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              <span>{t.home.ctaCallBtn}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
