import React from 'react';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { AppPage } from '../components/Navbar';
import {
  Building,
  ShieldCheck,
  Gauge,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface FacilitiesPageProps {
  onSelectPage: (page: AppPage) => void;
  onOpenRfq: () => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({
  onSelectPage,
  onOpenRfq,
}) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  const facilityPillars = [
    {
      title: language === 'en' ? 'Land & Plant Footprint' : 'Lahan & Area Workshop',
      val: '2,806 m²',
      sub: language === 'en' ? 'Built Manufacturing Area 2,400 m²' : 'Bangunan Produksi 2.400 m²',
      desc:
        language === 'en'
          ? 'Strategically situated in MM2100 Industrial Estate Cibitung, Bekasi with 40ft container trailer access.'
          : 'Terletak strategis di Kawasan Industri MM2100 Cibitung Bekasi dengan akses kontainer 40ft.',
    },
    {
      title: language === 'en' ? 'Production Machinery Fleet' : 'Armada Mesin Produksi',
      val: '45+ Units',
      sub: language === 'en' ? 'High-Rigidity Machine Tools' : 'Mesin Presisi Berkapasitas Tinggi',
      desc:
        language === 'en'
          ? '3-Meter CNC Double Column centers, 110T-250T mechanical stamping presses, 4-axis CNC lathes, and precision grinding.'
          : 'CNC Machining Double Column 3 meter, Press Stamping 110T-250T, CNC Lathe 4-Axis, dan Grinding.',
    },
    {
      title: language === 'en' ? 'Heavy Crane Capacity' : 'Kapasitas Angkat Berat',
      val: '10 Ton Crane',
      sub: language === 'en' ? 'Dual Overhead Cranes' : 'Overhead Crane Ganda',
      desc:
        language === 'en'
          ? 'Safe overhead material handling for massive stamping die shoes, machine frames, and heavy structural castings.'
          : 'Penanganan aman untuk die base cetakan besar, frame mesin otomatis, dan material berat.',
    },
    {
      title: language === 'en' ? '3D CMM Metrology Lab' : 'Laboratorium Metrologi CMM',
      val: '±0.002 mm',
      sub: language === 'en' ? 'Climate-Controlled Cleanroom' : 'Clean Room Suhu Konstan',
      desc:
        language === 'en'
          ? 'Calibrated Mitutoyo 3D Bridge CMM and portable articulating arms for sub-micron GD&T dimensional validation.'
          : 'CMM Mitutoyo terkalibrasi untuk inspeksi koordinat 3D dan validasi toleransi sub-mikron.',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: language === 'en' ? 'Engineering & 3D CAD/CAM' : 'Engineering & 3D CAD/CAM',
      desc:
        language === 'en'
          ? 'Solid model 3D CAD drafting, finite element analysis (FEA), and CAM toolpath simulation prior to machining.'
          : 'Pemodelan solid model 3D, finite element analysis (FEA), dan simulasi jalur potong CNC sebelum pengerjaan.',
    },
    {
      step: '02',
      title: language === 'en' ? 'Roughing & Double Column CNC' : 'Roughing & Double Column CNC',
      desc:
        language === 'en'
          ? 'Heavy roughing and surface milling of alloy steel billets and die bases on 3,000 mm stroke Double Column CNCs.'
          : 'Pemesinan balok baja paduan dan die base menggunakan CNC Double Column stroke 3.000 mm.',
    },
    {
      step: '03',
      title: language === 'en' ? 'Precision Machining & Grinding' : 'Precision Machining & Grinding',
      desc:
        language === 'en'
          ? 'Micro-feature profiling on 4-axis milling centers, precision wire EDM, and surface grinding to sub-micron limits.'
          : 'Pengerjaan profil mikro pada CNC Milling 4-axis serta surface grinding untuk toleransi sub-mikron.',
    },
    {
      step: '04',
      title: language === 'en' ? 'Assembly & PLC/Robotics' : 'Assembly & PLC/Robotics',
      desc:
        language === 'en'
          ? 'Mechanical assembly, Pascal/Kosmek hydraulic integration, pneumatic lines, panel wiring, and PLC/Robot programming.'
          : 'Perakitan mekanik, instalasi hidrolik/pneumatik Pascal/Kosmek, kabel panel, dan pemrograman PLC/Robot.',
    },
    {
      step: '05',
      title: language === 'en' ? 'Tryout & CMM Inspection' : 'Tryout & CMM Inspection',
      desc:
        language === 'en'
          ? 'Continuous load tryout under production press conditions and 3D CMM dimensional verification per ISO 9001:2015.'
          : 'Pengujian beban kerja kontinu di pabrik dan verifikasi dimensi 3D CMM berstandar ISO 9001:2015.',
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen pb-20 transition-colors duration-300 ${
        isDark ? 'bg-[#080a0f]' : 'bg-[#f8fafc]'
      }`}
    >
      {/* 1. Simple, Clean & Attractive Hero Section for Facilities Page */}
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
              {language === 'en' ? 'MM2100 Plant & Facilities' : 'Fasilitas Pabrik MM2100'}
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
                <Building className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                <span className="uppercase tracking-wider">
                  {language === 'en' ? 'Manufacturing Infrastructure & Assets' : 'Fasilitas & Infrastruktur Produksi'}
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
                    Plant Facilities &amp;{' '}
                    <span
                      className={`bg-clip-text text-transparent ${
                        isDark
                          ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200'
                          : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600'
                      }`}
                    >
                      Precision Fleet
                    </span>
                  </>
                ) : (
                  <>
                    Fasilitas Pabrik &amp;{' '}
                    <span
                      className={`bg-clip-text text-transparent ${
                        isDark
                          ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200'
                          : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600'
                      }`}
                    >
                      Armada Mesin Presisi
                    </span>
                  </>
                )}
              </h1>

              <p
                className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${
                  isDark ? 'text-neutral-300' : 'text-slate-600'
                }`}
              >
                {t.facilities.desc}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
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

              <button
                onClick={() => scrollToSection('alur-produksi')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer border ${
                  isDark
                    ? 'text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border-neutral-800'
                    : 'text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border-slate-300 shadow-2xs'
                }`}
              >
                {language === 'en' ? 'Quality Workflow' : 'Alur Proses Produksi'}
              </button>
            </div>
          </div>

          {/* 4 Pillars Metric Cards - Responsive on HP, Tablet, PC */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4 border-t ${
              isDark ? 'border-neutral-800/80' : 'border-slate-200'
            }`}
          >
            {facilityPillars.map((p, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border space-y-1.5 transition-colors ${
                  isDark
                    ? 'bg-[#0e121a] border-neutral-800/80 hover:border-amber-400/40'
                    : 'bg-white border-slate-200 shadow-sm hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                    {p.title}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-500 font-display">
                  {p.val}
                </div>
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.sub}</div>
                <p className={`text-[11px] leading-normal pt-1 font-sans ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Main Facilities Component (Daftar Armada Mesin, Filter & CMM Spec) */}
      <section className="pt-8">
        <FacilitiesSection />
      </section>

      {/* 3. Operational Workflow Section */}
      <section
        id="alur-produksi"
        className={`py-16 border-t mt-12 transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-[#0e121a] via-[#121624] to-[#0a0d14] border-neutral-800/80'
            : 'bg-gradient-to-b from-slate-100 via-white to-slate-100 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-2 border ${
                isDark
                  ? 'bg-amber-400/10 border-amber-400/25 text-amber-400'
                  : 'bg-amber-50 border-amber-300 text-amber-700'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>{t.facilities.workflowBadge}</span>
            </div>
            <h2
              className={`text-xl sm:text-2xl lg:text-3xl font-extrabold font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t.facilities.workflowTitle}
            </h2>
            <p className={`mt-2 text-xs sm:text-sm ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              {t.facilities.workflowDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {workflowSteps.map((step) => (
              <div
                key={step.step}
                className={`p-5 rounded-xl border space-y-2.5 relative group transition-all duration-300 ${
                  isDark
                    ? 'bg-[#10141f] border-neutral-800/90 hover:border-amber-400/50'
                    : 'bg-white border-slate-200 hover:border-amber-500 shadow-sm'
                }`}
              >
                <div className="text-2xl font-black text-amber-500 font-display">
                  {step.step}
                </div>
                <h3 className={`text-xs sm:text-sm font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </h3>
                <p className={`text-[11px] leading-relaxed font-sans ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Plant Visit & Quality Audit Banner */}
          <div
            className={`mt-12 p-6 sm:p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${
              isDark
                ? 'bg-[#10141f] border-neutral-800'
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
                  {language === 'en'
                    ? 'Plant Audit & Factory Acceptance Test (FAT)'
                    : 'Kunjungan Pabrik & Factory Acceptance Test (FAT)'}
                </span>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {language === 'en'
                  ? 'Planning a Facility Audit or Technical Review at MM2100?'
                  : 'Ingin Mengadakan Audit Fasilitas atau Meninjau Mesin di Workshop MM2100?'}
              </h3>
              <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                {language === 'en'
                  ? 'We welcome procurement, engineering, and QA delegations from prospective clients to evaluate our MM2100 tooling and machining capacity in person.'
                  : 'Kami mengundang tim procurement, engineering, dan QA calon klien untuk meninjau kapabilitas workshop MM2100 kami secara langsung.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  onSelectPage('tentang');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                {language === 'en' ? 'Schedule Visit & RFQ' : 'Jadwalkan Kunjungan & RFQ'}
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
                className={`px-4 py-3 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 border ${
                  isDark
                    ? 'text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border-neutral-700'
                    : 'text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border-slate-300'
                }`}
              >
                <PhoneCall className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                <span>{language === 'en' ? 'Call Office' : 'Hubungi Kantor'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
