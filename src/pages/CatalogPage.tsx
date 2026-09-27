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
        {/* Subtle Background Lighting & Grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-70 pointer-events-none" />
        <div
          className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[130px] pointer-events-none ${
            isDark ? 'bg-amber-500/10' : 'bg-amber-500/15'
          }`}
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
                isDark ? 'hover:text-amber-400' : 'hover:text-amber-600'
              }`}
            >
              {t.nav.home}
            </button>
            <span className={isDark ? 'text-neutral-600' : 'text-slate-300'}>/</span>
            <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
              {language === 'en' ? 'Catalog & Technical Specifications' : 'Katalog & Spesifikasi Teknis'}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
            <div className="max-w-3xl space-y-3">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-700/80 text-neutral-300'
                    : 'bg-white border-slate-300 text-slate-700 shadow-2xs'
                }`}
              >
                <TableProperties className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                <span className="uppercase tracking-wider">
                  {language === 'en' ? 'Machinery & Engineering Catalog' : 'Katalog Produk & Rekayasa Presisi'}
                </span>
                <span className={isDark ? 'text-neutral-600' : 'text-slate-300'}>|</span>
                <span className={`font-medium ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
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
                          ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200'
                          : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600'
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
                          ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200'
                          : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600'
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
                className="px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
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
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-md shadow-amber-400/20'
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
                            ? 'text-amber-400'
                            : 'text-amber-600'
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
