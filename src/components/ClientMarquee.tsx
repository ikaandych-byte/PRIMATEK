import React, { useState } from 'react';
import { CLIENT_LOGOS, TECHNICAL_PARTNERS, OVERSEAS_MARKETS } from '../data/company';
import { Globe, Cpu, ShieldCheck } from 'lucide-react';
import { CompanyLogo, CompanyMiniLogo, getLogoIdFromName } from './CompanyLogos';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const ClientMarquee: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'all' | 'automotive' | 'partners'>('all');

  const ALL_CARDS = [
    {
      id: 'daihatsu',
      name: 'PT. Astra Daihatsu Motor',
      sector: 'Automotive 4W OEM',
      category: 'automotive',
      typeEn: 'Assembly Jig & Stamping Dies',
      typeId: 'Assembly Jig & Stamping Dies',
      country: 'Indonesia',
    },
    {
      id: 'honda',
      name: 'PT. Astra Honda Motor (AHM)',
      sector: 'Automotive 2W OEM',
      category: 'automotive',
      typeEn: 'Special Purpose Machine & Jig',
      typeId: 'Special Purpose Machine & Jig',
      country: 'Indonesia',
    },
    {
      id: 'yamaha',
      name: 'PT. Yamaha Indonesia Motor',
      sector: 'Automotive 2W OEM',
      category: 'automotive',
      typeEn: 'Robotic Welding & Inspection',
      typeId: 'Robotic Welding & Inspection',
      country: 'Indonesia',
    },
    {
      id: 'mitsubishi',
      name: 'PT. Mitsubishi Motors KRM',
      sector: 'Automotive 4W OEM',
      category: 'automotive',
      typeEn: 'Heavy Stamping Press Dies',
      typeId: 'Heavy Stamping Press Dies',
      country: 'Indonesia',
    },
    {
      id: 'kalbe',
      name: 'PT. Kalbe Farma Tbk',
      sector: 'Pharmaceutical & Healthcare',
      category: 'automotive',
      typeEn: 'Automated Packaging & Conveyor',
      typeId: 'Automated Packaging & Conveyor',
      country: 'Indonesia',
    },
    {
      id: 'nsk',
      name: 'PT. NSK Bearing Mfg Indonesia',
      sector: 'Precision Bearing & Motion',
      category: 'automotive',
      typeEn: 'Ultra-Precision Tooling & Fixture',
      typeId: 'Ultra-Precision Tooling & Fixture',
      country: 'Indonesia',
    },
    {
      id: 'epson',
      name: 'EPSON ROBOTICS',
      sector: 'Official Robot System Integrator',
      category: 'partners',
      typeEn: 'SCARA & 6-Axis High Speed Assembly',
      typeId: 'Perakitan SCARA & 6-Axis Berkecepatan Tinggi',
      country: 'Japan',
    },
    {
      id: 'yaskawa',
      name: 'YASKAWA MOTOMAN',
      sector: 'Robotic Welding & Handling Partner',
      category: 'partners',
      typeEn: 'Arc Welding & Heavy Robot Cells',
      typeId: 'Sel Robotik Welding & Heavy Handling',
      country: 'Japan',
    },
    {
      id: 'keyence',
      name: 'KEYENCE INDONESIA',
      sector: 'Vision & Laser Metrology Partner',
      category: 'partners',
      typeEn: 'High Accuracy Inline Vision QA',
      typeId: 'Inspeksi Kamera Visi & Sensor Presisi',
      country: 'Japan',
    },
    {
      id: 'bosch',
      name: 'BOSCH REXROTH',
      sector: 'Motion & Hydraulics Technology',
      category: 'partners',
      typeEn: 'Proportional Valves & Linear Guide',
      typeId: 'Sistem Hidrolik & Linear Motion',
      country: 'Germany',
    },
    {
      id: 'omron',
      name: 'OMRON AUTOMATION',
      sector: 'Industrial Controller & Safety PLC',
      category: 'partners',
      typeEn: 'Sysmac Controller & Safety Array',
      typeId: 'PLC Sysmac & Sensor Keselamatan',
      country: 'Japan',
    },
    {
      id: 'hiwin',
      name: 'HIWIN MOTION',
      sector: 'Linear Motion & Actuator Systems',
      category: 'partners',
      typeEn: 'Precision Ballscrews & Linear Guide',
      typeId: 'Ballscrew Presisi & Linear Guide Rail',
      country: 'Taiwan',
    },
  ];

  const displayedCards =
    activeTab === 'automotive'
      ? ALL_CARDS.filter((c) => c.category === 'automotive')
      : activeTab === 'partners'
      ? ALL_CARDS.filter((c) => c.category === 'partners')
      : ALL_CARDS.slice(0, 6);

  const FEATURED_PARTNERS = [
    {
      id: 'epson',
      name: 'EPSON ROBOTICS',
      role: 'Official Robot System Integrator',
      desc: 'SCARA & 6-Axis High Speed Assembly',
    },
    {
      id: 'yaskawa',
      name: 'YASKAWA MOTOMAN',
      role: 'Robotic Welding & Handling Partner',
      desc: 'Arc Welding & Heavy Robot Cells',
    },
    {
      id: 'keyence',
      name: 'KEYENCE INDONESIA',
      role: 'Vision & Laser Metrology Partner',
      desc: 'High Accuracy Inline Vision QA',
    },
    {
      id: 'bosch',
      name: 'BOSCH REXROTH',
      role: 'Motion & Hydraulics Technology',
      desc: 'Proportional Valves & Linear Guide',
    },
    {
      id: 'omron',
      name: 'OMRON AUTOMATION',
      role: 'Industrial Controller & Safety PLC',
      desc: 'Sysmac Controller & Sensor Array',
    },
    {
      id: 'hiwin',
      name: 'HIWIN MOTION',
      role: 'Linear Motion & Actuator Systems',
      desc: 'Ballscrew Presisi & Linear Guide Rail',
    },
  ];

  return (
    <section
      id="klien"
      className={`py-14 sm:py-16 border-y overflow-hidden relative transition-colors duration-300 ${
        isDark
          ? 'bg-[#0e121a] border-neutral-800/80'
          : 'bg-slate-100/90 border-slate-200'
      }`}
    >
      {/* Background Accent Mesh */}
      <div className={`absolute inset-0 ${isDark ? 'bg-radial-gradient opacity-30' : 'bg-radial-gradient opacity-20'} pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${
            isDark ? 'border-neutral-800/80' : 'border-slate-200'
          }`}
        >
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-2 border ${
                isDark
                  ? 'bg-amber-400/10 border-amber-400/25 text-amber-400'
                  : 'bg-amber-50 border-amber-300 text-amber-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {language === 'en'
                  ? 'Trusted by Global Automotive & Industrial Leaders'
                  : 'Kepercayaan Industri Otomotif & Pabrikan Global'}
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {language === 'en'
                ? 'Strategic Industry Clients & Robotics Partners'
                : 'Klien Industri & Mitra Robotika Terkemuka'}
            </h2>
            <p className={`mt-1 text-xs sm:text-sm max-w-2xl ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              {language === 'en'
                ? 'PT. Prima Teknik Trada is trusted continuously by Tier-1 automotive and pharmaceutical principals since 1999, powered by leading global robotics integration.'
                : 'PT. Prima Teknik Trada dipercaya secara berkelanjutan oleh para prinsipal Tier-1 otomotif dan farmasi sejak 1999 dengan dukungan teknologi integrasi robotika dunia.'}
            </p>
          </div>

          {/* Tab Filter Button Controls */}
          <div
            className={`flex items-center gap-1.5 p-1 rounded-xl self-start md:self-auto shrink-0 border ${
              isDark
                ? 'bg-neutral-900/90 border-neutral-800'
                : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                  : isDark
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? 'All Clients' : 'Semua Logo'}
            </button>
            <button
              onClick={() => setActiveTab('automotive')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'automotive'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                  : isDark
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? 'Tier-1 Automotive' : 'Klien Otomotif Tier-1'}
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'partners'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                  : isDark
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? 'Robotics Partners' : 'Mitra Robotik'}
            </button>
          </div>
        </div>

        {/* Highlighted Grid of Company Logos - Responsive for Mobile (2 cols), Tablet (3 cols), PC (6 cols) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-8">
          {displayedCards.map((card) => (
            <div
              key={card.id}
              className={`group p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between items-center text-center shadow-sm hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#121622]/90 hover:bg-[#151b2a] border-neutral-800/90 hover:border-amber-400/50'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-500/50 shadow-slate-200'
              }`}
            >
              <div className="h-16 w-full flex items-center justify-center py-1 px-2 opacity-95 group-hover:opacity-100 transition-opacity">
                <CompanyLogo
                  id={card.id}
                  className={`h-11 w-auto max-w-[130px] ${isDark ? 'text-white' : 'text-slate-900'}`}
                />
              </div>
              <div
                className={`w-full pt-3 border-t mt-2 ${
                  isDark ? 'border-neutral-800/80' : 'border-slate-200'
                }`}
              >
                <div
                  className={`text-xs font-bold truncate font-display ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {card.name.replace('PT. ', '')}
                </div>
                <div
                  className={`text-[10px] font-mono mt-0.5 truncate ${
                    isDark ? 'text-amber-400/90' : 'text-amber-700'
                  }`}
                >
                  {card.sector}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Partners Spotlight Strip */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border mb-8 ${
            isDark
              ? 'bg-gradient-to-r from-[#121622] via-[#0f131d] to-[#121622] border-neutral-800'
              : 'bg-gradient-to-r from-slate-200/70 via-white to-slate-200/70 border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <Cpu className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              <span
                className={`text-xs font-bold font-mono uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {language === 'en'
                  ? 'Official Robot & PLC Integration Partners:'
                  : 'Mitra Resmi Integrasi Robot & PLC:'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {FEATURED_PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all ${
                    isDark
                      ? 'bg-neutral-900/90 border-neutral-800 hover:border-amber-400/40 text-neutral-300'
                      : 'bg-white border-slate-200 hover:border-amber-500/40 text-slate-700 shadow-2xs'
                  }`}
                >
                  <CompanyMiniLogo id={partner.id} className="w-5 h-5 shrink-0 rounded-md" />
                  <span className={`text-xs font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {partner.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono hidden sm:inline px-1.5 py-0.5 rounded ${
                      isDark ? 'bg-neutral-800 text-amber-400/90' : 'bg-slate-100 text-amber-700'
                    }`}
                  >
                    · {partner.role.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Carousel for All 18+ Corporate Clients */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex items-center gap-3 sm:gap-4 py-2">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className={`shrink-0 flex items-center gap-3 px-3.5 py-2 rounded-xl border transition-all cursor-default ${
                isDark
                  ? 'bg-[#111520] border-neutral-800/90 hover:border-amber-400/40 hover:bg-[#151b28]'
                  : 'bg-white border-slate-200 hover:border-amber-500/40 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <CompanyMiniLogo id={getLogoIdFromName(client.name)} className="w-5 h-5 shrink-0 rounded-md" />
              <div>
                <div
                  className={`text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap ${
                    isDark ? 'text-neutral-200' : 'text-slate-900'
                  }`}
                >
                  {client.name}
                </div>
                <div className={`text-[10px] font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {client.sector} · {client.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overseas Market Strip */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-5 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
          isDark ? 'border-neutral-800/80 text-neutral-400' : 'border-slate-200 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-2">
          <Globe className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <span className={`font-medium ${isDark ? 'text-neutral-300' : 'text-slate-800'}`}>
            {language === 'en'
              ? 'International Export Destinations:'
              : 'Jangkauan Ekspor Klien Mancanegara:'}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 font-mono text-[11px]">
          {OVERSEAS_MARKETS.map((m) => (
            <div
              key={m.code}
              className={`inline-flex items-center gap-1.5 ${
                isDark ? 'text-neutral-300' : 'text-slate-700'
              }`}
            >
              <span className="text-sm">{m.flag}</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {language === 'en' ? m.countryEn || m.country : m.country}
              </span>
              <span className={isDark ? 'text-neutral-500' : 'text-slate-400'}>
                ({language === 'en' ? m.noteEn || m.note : m.note})
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
