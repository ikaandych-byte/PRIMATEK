import React, { useState } from 'react';
import { CLIENT_LOGOS, TECHNICAL_PARTNERS, OVERSEAS_MARKETS } from '../data/company';
import { Globe, Cpu, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CompanyLogo } from './CompanyLogos';

export const ClientMarquee: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'automotive' | 'partners'>('all');

  // Featured company list with dedicated visual logos
  const FEATURED_CLIENT_CARDS = [
    {
      id: 'daihatsu',
      name: 'PT. Astra Daihatsu Motor',
      sector: 'Automotive 4W OEM',
      type: 'Assembly Jig & Stamping Dies',
      country: 'Indonesia',
    },
    {
      id: 'honda',
      name: 'PT. Astra Honda Motor (AHM)',
      sector: 'Automotive 2W OEM',
      type: 'Special Purpose Machine & Jig',
      country: 'Indonesia',
    },
    {
      id: 'yamaha',
      name: 'PT. Yamaha Indonesia Motor',
      sector: 'Automotive 2W OEM',
      type: 'Robotic Welding & Inspection',
      country: 'Indonesia',
    },
    {
      id: 'mitsubishi',
      name: 'PT. Mitsubishi Motors KRM',
      sector: 'Automotive 4W OEM',
      type: 'Heavy Stamping Press Dies',
      country: 'Indonesia',
    },
    {
      id: 'kalbe',
      name: 'PT. Kalbe Farma Tbk',
      sector: 'Pharmaceutical & Healthcare',
      type: 'Automated Packaging & Conveyor',
      country: 'Indonesia',
    },
    {
      id: 'nsk',
      name: 'PT. NSK Bearing Mfg Indonesia',
      sector: 'Precision Bearing & Motion',
      type: 'Ultra-Precision Tooling & Fixture',
      country: 'Indonesia',
    },
  ];

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
  ];

  return (
    <section id="klien" className="py-16 bg-neutral-950 border-y border-neutral-800/80 overflow-hidden relative">
      {/* Background Accent Mesh */}
      <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Kepercayaan Industri Otomotif &amp; Pabrikan Global</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
              Klien Industri &amp; Mitra Robotika Terkemuka
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
              PT. Prima Teknik Trada dipercaya secara berkelanjutan oleh para prinsipal Tier-1 otomotif dan farmasi sejak 1999 dengan dukungan teknologi integrasi robotika dunia.
            </p>
          </div>

          {/* Tab Filter Button Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Semua Logo
            </button>
            <button
              onClick={() => setActiveTab('automotive')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'automotive'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Klien Otomotif Tier-1
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'partners'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Mitra Robotik
            </button>
          </div>
        </div>

        {/* Highlighted Grid of Company Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-8">
          {FEATURED_CLIENT_CARDS.map((card) => (
            <div
              key={card.id}
              className="group p-4 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/90 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between items-center text-center shadow-lg hover:-translate-y-1"
            >
              <div className="h-12 w-full flex items-center justify-center py-1 opacity-90 group-hover:opacity-100 transition-opacity">
                <CompanyLogo id={card.id} className="h-9 w-auto max-w-[140px] text-white" />
              </div>
              <div className="w-full pt-3 border-t border-neutral-800/60 mt-2">
                <div className="text-xs font-semibold text-white truncate font-display">
                  {card.name.replace('PT. ', '')}
                </div>
                <div className="text-[10px] text-amber-400/90 font-mono mt-0.5 truncate">
                  {card.sector}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Partners Spotlight Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-neutral-900/90 border border-neutral-800 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Official Robot &amp; PLC Integration Partners:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {FEATURED_PARTNERS.map((partner) => (
                <div key={partner.id} className="flex items-center gap-2 text-neutral-300">
                  <CompanyLogo id={partner.id} className="h-6 w-auto text-neutral-200" />
                  <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
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
        <div className="animate-marquee flex items-center gap-4 py-2">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800/90 hover:border-amber-400/40 hover:bg-neutral-800 transition-all cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-neutral-200 tracking-tight whitespace-nowrap">
                  {client.name}
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  {client.sector} · {client.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overseas Market Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-5 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-400" />
          <span className="font-medium text-neutral-300">Jangkauan Ekspor Klien Mancanegara:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 font-mono text-[11px]">
          {OVERSEAS_MARKETS.map((m) => (
            <div key={m.code} className="inline-flex items-center gap-1.5 text-neutral-300">
              <span className="text-sm">{m.flag}</span>
              <span className="font-semibold text-white">{m.country}</span>
              <span className="text-neutral-500">({m.note})</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
