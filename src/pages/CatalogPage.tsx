import React from 'react';
import { CatalogSection } from '../components/CatalogSection';
import { MachineItem, MachineCategory } from '../types';
import { AppPage } from '../components/Navbar';
import {
  TableProperties,
  Cpu,
  Layers,
  Wrench,
  Cog,
  Building,
  ArrowRight,
  ShieldCheck,
  Filter,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import catalogHeroImg from '../assets/images/cat_automation_machines_1790239867045.jpg';

interface CatalogPageProps {
  selectedCategory: MachineCategory;
  onSelectCategory: (category: MachineCategory) => void;
  onOpenMachineDetail: (machine: MachineItem) => void;
  onAddToRfq: (machine: MachineItem) => void;
  rfqItemIds: string[];
  onOpenCompare: (machines: MachineItem[]) => void;
  onSelectPage: (page: AppPage) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenMachineDetail,
  onAddToRfq,
  rfqItemIds,
  onOpenCompare,
  onSelectPage,
}) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  const categoryPills: { id: MachineCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: language === 'en' ? 'All Machinery & Tooling' : 'Semua Mesin & Tooling', icon: Filter },
    { id: 'automation', label: 'Automation & Custom Machines', icon: Cpu },
    { id: 'jig-fixture', label: language === 'en' ? 'Precision Jig & Fixture' : 'Jig & Fixture Presisi', icon: Layers },
    { id: 'dies-moulds', label: 'Dies & Moulds Heavy Duty', icon: Wrench },
    { id: 'mass-production', label: 'Parts Mass Production', icon: Cog },
    { id: 'facility-tools', label: language === 'en' ? 'Plant Fleet & CMM' : 'Armada Mesin & CMM', icon: Building },
  ];

  return (
    <div
      className={`min-h-screen pb-20 transition-colors duration-300 ${
        isDark ? 'bg-[#080a0f]' : 'bg-[#f8fafc]'
      }`}
    >
      {/* 1. Simple, Clean & Attractive Hero Section for Catalog Page */}
      <section
        className={`pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 relative overflow-hidden border-b transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-[#080a0f] via-[#0d1017] to-[#0a0d14] border-neutral-800/80'
            : 'bg-gradient-to-b from-slate-100 via-white to-slate-50 border-slate-200'
        }`}
      >
        {/* 1. Hero Background Machinery Image (Always clearly visible in both light & dark modes) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            src={catalogHeroImg}
            alt="PT. PRIMA TEKNIK TRADA Industrial Machinery & Robotics Catalog"
            className={`w-full h-full object-cover object-center scale-100 sm:scale-105 transition-all duration-700 ${
              isDark
                ? 'opacity-70 brightness-95 contrast-110 saturate-[1.15]'
                : 'opacity-65 brightness-100 contrast-105 saturate-[1.1]'
            }`}
          />
          {/* Readability Vignette Gradient */}
          <div
            className={`absolute inset-0 transition-colors duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-[#080a0f]/95 via-[#080a0f]/80 to-[#080a0f]/45'
                : 'bg-gradient-to-r from-slate-100/95 via-white/82 to-slate-100/50'
            }`}
          />
          <div
            className={`absolute inset-0 transition-colors duration-300 ${
              isDark
                ? 'bg-gradient-to-b from-[#080a0f]/75 via-transparent to-[#080a0f]/90'
                : 'bg-gradient-to-b from-white/70 via-transparent to-slate-100/85'
            }`}
          />
        </div>

        {/* 2. Soft Ambient Glowing Accents - Precision Cyan / Electric Sky */}
        <div
          className={`absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full blur-[140px] pointer-events-none ${
            isDark ? 'bg-cyan-500/15' : 'bg-cyan-400/15'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-28 w-[420px] h-[420px] rounded-full blur-[150px] pointer-events-none ${
            isDark ? 'bg-sky-500/15' : 'bg-sky-400/15'
          }`}
        />

        {/* 3. Subtle Tech Grid Pattern */}
        <div
          className="absolute inset-0 bg-tech-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none opacity-20"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div
            className={`flex items-center gap-2 text-xs font-mono mb-4 ${
              isDark ? 'text-neutral-400' : 'text-slate-500'
            }`}
          >
            <button
              onClick={() => onSelectPage('beranda')}
              className={`hover:underline cursor-pointer ${
                isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-600'
              }`}
            >
              {t.nav.home}
            </button>
            <span className={isDark ? 'text-neutral-600' : 'text-slate-300'}>/</span>
            <span className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
              {language === 'en' ? 'Catalog & Technical Specifications' : 'Katalog & Spesifikasi Teknis'}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
            <div className="max-w-3xl space-y-3">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border backdrop-blur-md shadow-xs ${
                  isDark
                    ? 'bg-neutral-900/90 border-cyan-500/30 text-cyan-300'
                    : 'bg-white/95 border-cyan-400/40 text-cyan-800 shadow-2xs'
                }`}
              >
                <TableProperties className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <span className="uppercase tracking-wider font-semibold">
                  {language === 'en' ? 'Machinery & Engineering Catalog' : 'Katalog Produk & Rekayasa Presisi'}
                </span>
                <span className={isDark ? 'text-neutral-600' : 'text-slate-300'}>|</span>
                <span className={`font-mono font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  MM2100 CIBITUNG
                </span>
              </div>

              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {language === 'en' ? (
                  <>
                    Industrial Machinery &amp;{' '}
                    <span
                      className={`bg-clip-text text-transparent ${
                        isDark
                          ? 'bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-300'
                          : 'bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700'
                      }`}
                    >
                      Technical Specs
                    </span>
                  </>
                ) : (
                  <>
                    Katalog Mesin &amp;{' '}
                    <span
                      className={`bg-clip-text text-transparent ${
                        isDark
                          ? 'bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-300'
                          : 'bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700'
                      }`}
                    >
                      Spesifikasi Teknis
                    </span>
                  </>
                )}
              </h1>

              <p
                className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${
                  isDark ? 'text-neutral-300' : 'text-slate-600'
                }`}
              >
                {language === 'en'
                  ? 'Explore our full spectrum of high-precision CNC machinery, turnkey automation systems (SPM), hydraulic machining fixtures, progressive stamping dies, and mass-machined automotive parts adhering to ISO 9001:2015 standards.'
                  : 'Jelajahi seluruh lini produk permesinan presisi tinggi, mesin otomasi kustom (SPM), hydraulic jig fixture, cetakan stamping dies, hingga komponen produksi massal dengan standar toleransi sub-mikron ISO 9001:2015.'}
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  onSelectPage('tentang');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 text-xs font-bold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-400/25 cursor-pointer flex items-center gap-1.5"
              >
                <span>{t.home.ctaRfqBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Category Switcher Pills - Responsive Horizontal Pan */}
          <div
            className={`pt-4 border-t flex items-center gap-2 overflow-x-auto no-scrollbar py-2 ${
              isDark ? 'border-neutral-800/80' : 'border-slate-200'
            }`}
          >
            <span
              className={`text-xs font-mono uppercase tracking-wider whitespace-nowrap mr-1 hidden sm:inline-block ${
                isDark ? 'text-neutral-400' : 'text-slate-500'
              }`}
            >
              {language === 'en' ? 'Category Filter:' : 'Filter Kategori:'}
            </span>
            <div className="flex items-center gap-2">
              {categoryPills.map((pill) => {
                const Icon = pill.icon;
                const isActive = selectedCategory === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => onSelectCategory(pill.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-cyan-400 text-neutral-950 font-bold border-cyan-400 shadow-md shadow-cyan-400/20'
                        : isDark
                          ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800 hover:border-neutral-700'
                          : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 border-slate-200 shadow-2xs'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive
                          ? 'text-neutral-950'
                          : isDark
                            ? 'text-cyan-400'
                            : 'text-cyan-600'
                      }`}
                    />
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Technical Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-4 font-mono text-xs">
            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#0e121a] border-neutral-800/80' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] block ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {language === 'en' ? 'Tolerance & Accuracy' : 'Akurasi & Toleransi'}
              </span>
              <span className="font-bold text-amber-500 text-sm">±0.005 mm</span>
            </div>
            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#0e121a] border-neutral-800/80' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] block ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {t.home.doubleColumnStrokeLabel}
              </span>
              <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                3,000 mm
              </span>
            </div>
            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#0e121a] border-neutral-800/80' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] block ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {language === 'en' ? 'Stamping Press Range' : 'Kapasitas Stamping Press'}
              </span>
              <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                110T – 250T
              </span>
            </div>
            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#0e121a] border-neutral-800/80' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] block ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {language === 'en' ? 'Control Standard' : 'Standar Kontrol Otomasi'}
              </span>
              <span className="font-bold text-amber-500 text-sm">PLC &amp; Robotics</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Catalog & Technical Specifications Section */}
      <section className="pt-8">
        <CatalogSection
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          onOpenMachineDetail={onOpenMachineDetail}
          onAddToRfq={onAddToRfq}
          rfqItemIds={rfqItemIds}
          onOpenCompare={onOpenCompare}
        />
      </section>

      {/* 3. Custom Engineering Inquiry Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div
          className={`p-6 sm:p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${
            isDark
              ? 'bg-[#0e121a]/95 border-neutral-800'
              : 'bg-white border-slate-200 shadow-slate-200'
          }`}
        >
          <div className="space-y-1.5 text-center md:text-left">
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider ${
                isDark ? 'text-amber-400' : 'text-amber-600 font-semibold'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {language === 'en' ? 'Custom Special Purpose Machine (SPM)' : 'Special Purpose Machine (SPM) Kustom'}
              </span>
            </div>
            <h3
              className={`text-lg sm:text-xl font-bold font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {language === 'en'
                ? 'Need a Custom Machine Built to Your 2D/3D CAD Drawing?'
                : 'Membutuhkan Mesin Khusus Sesuai Gambar CAD 2D/3D Anda?'}
            </h3>
            <p
              className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
                isDark ? 'text-neutral-400' : 'text-slate-600'
              }`}
            >
              {language === 'en'
                ? 'Our engineering specialists are ready to turn your concept into reality with custom automation, hydraulic fixtures, and stamping dies tailored for your production facility.'
                : 'Tim rekayasa kami siap merealisasikan mesin otomasi, hydraulic fixture, dan dies sesuai spesifikasi operasional di pabrik Anda.'}
            </p>
          </div>

          <button
            onClick={() => {
              onSelectPage('tentang');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-lg shadow-amber-500/20 shrink-0"
          >
            <span>{language === 'en' ? 'Technical Consultation & RFQ' : 'Konsultasi Teknis & RFQ'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
