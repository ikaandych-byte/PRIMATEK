import React, { useState } from 'react';
import { MACHINE_FACILITY_LIST } from '../data/machines';
import { COMPANY_INFO } from '../data/company';
import { Wrench, Shield, CheckCircle, Search, Gauge } from 'lucide-react';
import facilityImg from '../assets/images/hero_industrial_automation_1790239853481.jpg';

export const FacilitiesSection: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const types = [
    { id: 'all', label: 'Semua Mesin Pabrik' },
    { id: 'CNC Machining', label: 'CNC Machining & Double Column' },
    { id: 'Stamping Press', label: 'Stamping Press (110T-250T)' },
    { id: 'CNC Lathe', label: 'CNC Lathe 4-Axis' },
    { id: 'Grinding', label: 'Surface & Cylindrical Grinding' },
    { id: 'Quality Metrology', label: 'CMM & Laboratorium Ukur' },
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
    <section id="fasilitas" className="py-20 bg-neutral-950 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b border-neutral-800">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>Sumber Daya &amp; Fasilitas Manufaktur</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Fasilitas Mesin Produksi &amp; Laboratorium Metrologi
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-300">
              Pabrik kami di Kawasan Industri MM2100 Cibitung berdiri di atas lahan 2.806 m² (bangunan 2.400 m²), dilengkapi total <strong className="text-white font-mono">{totalUnits} unit</strong> mesin presisi tinggi: mulai dari CNC Double Column ukuran 3 meter, jajaran mechanical press hingga 250 ton, dan mesin ukur CMM 3D.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Total Mesin Utama:</span>
              <span className="font-bold text-amber-400 font-mono text-sm">{totalUnits}+ Units Ready</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Standar Mutu:</span>
              <span className="font-bold text-white font-mono text-xs">ISO 9001:2015</span>
            </div>
          </div>
        </div>

        {/* Plant Overview Highlight Banner */}
        <div className="my-8 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 aspect-[16/10] overflow-hidden bg-neutral-950">
            <img
              src={facilityImg}
              alt="Pabrik PT Prima Teknik Trada MM2100"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Gauge className="w-4 h-4" />
              <span>Kapabilitas Pengerjaan Mesin Berat</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Pusat Permesinan Skala Besar &amp; Produksi Massal Berkecepatan Tinggi
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Dengan 2 unit CNC Machining Centre Double Column berkapasitas stroke hingga 3.000 x 2.000 mm, kami mampu mengerjakan die base cetakan otomotif dan bed frame mesin perakitan yang tidak dapat ditangani bengkel pemesinan standar. Seluruh proses perakitan, tryout dies, hingga inspeksi CMM berada di bawah satu atap fasilitas MM2100 Cibitung.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-500 text-[10px]">Stamping Press</div>
                <div className="text-white font-bold mt-0.5">12 Unit (110T-250T)</div>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-500 text-[10px]">CNC Machining</div>
                <div className="text-white font-bold mt-0.5">10+ Unit Pusat CNC</div>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-500 text-[10px]">Metrology CMM</div>
                <div className="text-amber-400 font-bold mt-0.5">3 Unit Bridge &amp; Arm</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar for Facilities Table */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilterType(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterType === t.id
                    ? 'bg-amber-400 text-neutral-950 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari mesin fasilitas..."
              className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Machines List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredTools.map((tool, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white font-mono leading-snug">
                  {tool.name}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{tool.type}</span>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-xs font-mono font-bold text-amber-400 whitespace-nowrap">
                {tool.count} {tool.count > 1 ? 'Units' : 'Unit'}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
