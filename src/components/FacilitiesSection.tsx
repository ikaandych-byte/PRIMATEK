import React, { useState } from 'react';
import { MACHINE_FACILITY_LIST } from '../data/machines';
import { Wrench, Search, Gauge } from 'lucide-react';
import facilityImg from '../assets/images/hero_industrial_automation_1790239853481.jpg';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const FacilitiesSection: React.FC = () => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const types = [
    { id: 'all', label: language === 'en' ? 'All Workshop Machinery' : 'Semua Mesin Pabrik' },
    { id: 'CNC Machining', label: 'CNC Machining & Double Column' },
    { id: 'Stamping Press', label: 'Stamping Press (110T-250T)' },
    { id: 'CNC Lathe', label: 'CNC Lathe 4-Axis' },
    { id: 'Grinding', label: 'Surface & Cylindrical Grinding' },
    { id: 'Quality Metrology', label: language === 'en' ? 'CMM & Metrology Lab' : 'CMM & Laboratorium Ukur' },
  ];

  const filteredTools = MACHINE_FACILITY_LIST.filter((tool) => {
    if (filterType !== 'all' && tool.type !== filterType) return false;
    if (
      searchTerm.trim() !== '' &&
      !tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const totalUnits = MACHINE_FACILITY_LIST.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <section id="fasilitas" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end pb-8 border-b ${
            isDark ? 'border-neutral-800' : 'border-slate-200'
          }`}
        >
          <div className="lg:col-span-8">
            <div
              className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2 ${
                isDark ? 'text-amber-400' : 'text-amber-600 font-semibold'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{t.facilities.badge}</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t.facilities.title}
            </h2>
            <p className={`mt-2 text-xs sm:text-sm md:text-base leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
              {language === 'en' ? (
                <>
                  Operating on 2,806 m² of industrial land (2,400 m² plant floor) in MM2100 Cibitung, equipped with over{' '}
                  <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{totalUnits}+ units</strong> of high-precision machine tools: including 3-meter Double Column CNCs, mechanical stamping presses up to 250 tons, and temperature-controlled 3D CMM inspection.
                </>
              ) : (
                <>
                  Pabrik kami di Kawasan Industri MM2100 Cibitung berdiri di atas lahan 2.806 m² (bangunan 2.400 m²), dilengkapi total{' '}
                  <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{totalUnits} unit</strong> mesin presisi tinggi: mulai dari CNC Double Column ukuran 3 meter, jajaran mechanical press hingga 250 ton, dan mesin ukur CMM 3D.
                </>
              )}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                isDark
                  ? 'bg-[#0e121a] border-neutral-800'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>
                {language === 'en' ? 'Core Machine Fleet:' : 'Total Mesin Utama:'}
              </span>
              <span className="font-bold text-amber-500 font-mono text-sm">{totalUnits}+ Units Ready</span>
            </div>
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                isDark
                  ? 'bg-[#0e121a] border-neutral-800'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>
                {language === 'en' ? 'Quality Standard:' : 'Standar Mutu:'}
              </span>
              <span className={`font-bold font-mono text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>ISO 9001:2015</span>
            </div>
          </div>
        </div>

        {/* Plant Overview Highlight Banner */}
        <div
          className={`my-8 rounded-2xl overflow-hidden border grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-md ${
            isDark
              ? 'border-neutral-800 bg-[#0e121a]'
              : 'border-slate-200 bg-white shadow-slate-200'
          }`}
        >
          <div className="lg:col-span-5 aspect-[16/10] overflow-hidden bg-neutral-900">
            <img
              src={facilityImg}
              alt="Pabrik PT Prima Teknik Trada MM2100"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div
              className={`flex items-center gap-2 text-xs font-mono ${
                isDark ? 'text-amber-400' : 'text-amber-600 font-semibold'
              }`}
            >
              <Gauge className="w-4 h-4" />
              <span>
                {language === 'en' ? 'Heavy Machinery Capabilities' : 'Kapabilitas Pengerjaan Mesin Berat'}
              </span>
            </div>
            <h3
              className={`text-xl sm:text-2xl font-bold font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {language === 'en'
                ? 'Large-Scale Machining Centers & High-Speed Mass Production'
                : 'Pusat Permesinan Skala Besar & Produksi Massal Berkecepatan Tinggi'}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
              {language === 'en'
                ? 'Featuring 2 CNC Double Column centers with working strokes up to 3,000 x 2,000 mm, we machine massive progressive die bases and structural assembly frames that exceed standard workshop capacity. All machining, assembly, tryout, and CMM metrology take place under one unified roof in MM2100 Cibitung.'
                : 'Dengan 2 unit CNC Machining Centre Double Column berkapasitas stroke hingga 3.000 x 2.000 mm, kami mampu mengerjakan die base cetakan otomotif dan bed frame mesin perakitan yang tidak dapat ditangani bengkel pemesinan standar. Seluruh proses perakitan, tryout dies, hingga inspeksi CMM berada di bawah satu atap fasilitas MM2100 Cibitung.'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 text-xs font-mono">
              <div
                className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>Stamping Press</div>
                <div className={`font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>12 Units (110T-250T)</div>
              </div>
              <div
                className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>CNC Machining</div>
                <div className={`font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>10+ CNC Centers</div>
              </div>
              <div
                className={`p-2.5 rounded-lg border col-span-2 sm:col-span-1 ${
                  isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>Metrology CMM</div>
                <div className="text-amber-500 font-bold mt-0.5">3 Bridge &amp; Arm Units</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar for Facilities Table */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilterType(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                  filterType === t.id
                    ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                    : isDark
                      ? 'bg-neutral-900 text-neutral-300 hover:text-white border-neutral-800'
                      : 'bg-white text-slate-700 hover:text-slate-950 border-slate-200 shadow-2xs'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'en' ? 'Search facility machinery...' : 'Cari mesin fasilitas...'}
              className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                isDark
                  ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-2xs'
              }`}
            />
          </div>
        </div>

        {/* Machines List Grid - 1 col on HP, 2 cols on Tablet, 3 cols on PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredTools.map((tool, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-colors flex items-center justify-between gap-3 ${
                isDark
                  ? 'bg-[#0e121a] border-neutral-800 hover:border-amber-400/40'
                  : 'bg-white border-slate-200 hover:border-amber-500/40 shadow-2xs'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-bold font-mono leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {tool.name}
                </div>
                <div className={`text-[11px] mt-1 flex items-center gap-1.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{tool.type}</span>
                </div>
              </div>
              <div
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold whitespace-nowrap border ${
                  isDark
                    ? 'bg-[#080a0f] border-neutral-800 text-amber-400'
                    : 'bg-slate-50 border-slate-200 text-amber-700'
                }`}
              >
                {tool.count} {tool.count > 1 ? 'Units' : 'Unit'}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
