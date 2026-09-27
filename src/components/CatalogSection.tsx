import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Plus,
  Check,
  Eye,
  Layers,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { MACHINES_DATA } from '../data/machines';
import { MachineItem, MachineCategory } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedMachine } from '../utils/localizedData';

interface CatalogSectionProps {
  selectedCategory: MachineCategory;
  onSelectCategory: (cat: MachineCategory) => void;
  onOpenMachineDetail: (machine: MachineItem) => void;
  onAddToRfq: (machine: MachineItem) => void;
  rfqItemIds: string[];
  onOpenCompare: (machines: MachineItem[]) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenMachineDetail,
  onAddToRfq,
  rfqItemIds,
  onOpenCompare,
}) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProcess, setSelectedProcess] = useState<string>('all');
  const [selectedTonnage, setSelectedTonnage] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [compareList, setCompareList] = useState<MachineItem[]>([]);

  // Unique process options
  const processOptions = useMemo(() => {
    if (language === 'en') {
      return [
        { value: 'all', label: 'All Process Types' },
        { value: 'Assembly', label: 'Assembly & Packaging' },
        { value: 'Robotic', label: 'Robotic Welding & Tending' },
        { value: 'Leak Testing', label: 'Leak Testing & Inspection' },
        { value: 'Clamping', label: 'Hydraulic Jig & Tooling' },
        { value: 'Dimensional', label: 'Checking Fixture Metrology' },
        { value: 'Stamping', label: 'Metal Stamping & Dies' },
        { value: 'Turning', label: 'CNC Turning & Milling' },
        { value: 'Double Column', label: 'Heavy Double Column CNC' },
      ];
    }
    return [
      { value: 'all', label: 'Semua Tipe Proses' },
      { value: 'Assembly', label: 'Assembly & Packaging' },
      { value: 'Robotic', label: 'Robotic Welding & Tending' },
      { value: 'Leak Testing', label: 'Leak Testing & Inspection' },
      { value: 'Clamping', label: 'Hydraulic Jig & Tooling' },
      { value: 'Dimensional', label: 'Checking Fixture Metrology' },
      { value: 'Stamping', label: 'Metal Stamping & Dies' },
      { value: 'Turning', label: 'CNC Turning & Milling' },
      { value: 'Double Column', label: 'Heavy Double Column CNC' },
    ];
  }, [language]);

  const tonnageOptions = useMemo(() => {
    if (language === 'en') {
      return [
        { value: 'all', label: 'All Capacity / Tonnage' },
        { value: 'heavy', label: 'Heavy Tonnage (200T – 250T)' },
        { value: 'medium', label: 'Medium Tonnage (110T – 150T)' },
        { value: 'high-accuracy', label: 'Sub-Micron Precision (±0.005mm)' },
        { value: 'large-travel', label: 'Extra Long Travel (3,000mm)' },
      ];
    }
    return [
      { value: 'all', label: 'Semua Kapasitas/Tonase' },
      { value: 'heavy', label: 'Tonase Besar (200T – 250T)' },
      { value: 'medium', label: 'Tonase Menengah (110T – 150T)' },
      { value: 'high-accuracy', label: 'Presisi Sub-Mikron (±0.005mm)' },
      { value: 'large-travel', label: 'Travel Ekstra Panjang (3.000mm)' },
    ];
  }, [language]);

  // Filtering Logic
  const filteredMachines = useMemo(() => {
    return MACHINES_DATA.map((raw) => getLocalizedMachine(raw, language)).filter((item) => {
      // Category Filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.detailedDesc.toLowerCase().includes(q);
        const matchesSuitable = item.suitableFor.toLowerCase().includes(q);
        const matchesProcess = item.processType.toLowerCase().includes(q);
        const matchesApp = item.industryApplications.some((app) => app.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesSuitable && !matchesProcess && !matchesApp) {
          return false;
        }
      }

      // Process filter
      if (selectedProcess !== 'all') {
        if (!item.processType.toLowerCase().includes(selectedProcess.toLowerCase())) {
          return false;
        }
      }

      // Tonnage / Capacity Filter
      if (selectedTonnage !== 'all') {
        if (selectedTonnage === 'heavy') {
          const isHeavy =
            item.capacityOrTonnage.includes('250') ||
            item.capacityOrTonnage.includes('200') ||
            item.name.includes('250T') ||
            item.name.includes('200T');
          if (!isHeavy) return false;
        } else if (selectedTonnage === 'medium') {
          const isMedium =
            item.capacityOrTonnage.includes('110') ||
            item.capacityOrTonnage.includes('150') ||
            item.name.includes('110T') ||
            item.name.includes('150T');
          if (!isMedium) return false;
        } else if (selectedTonnage === 'high-accuracy') {
          const isAccurate =
            item.accuracyOrTolerance.includes('0.005') ||
            item.accuracyOrTolerance.includes('0.003') ||
            item.accuracyOrTolerance.includes('Mikron') ||
            item.accuracyOrTolerance.includes('Micron');
          if (!isAccurate) return false;
        } else if (selectedTonnage === 'large-travel') {
          const isLarge =
            item.travelOrDimension.includes('3.000') ||
            item.travelOrDimension.includes('3,000') ||
            item.name.includes('3000') ||
            item.name.includes('3,000');
          if (!isLarge) return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, selectedProcess, selectedTonnage, language]);

  const resetFilters = () => {
    onSelectCategory('all');
    setSearchQuery('');
    setSelectedProcess('all');
    setSelectedTonnage('all');
  };

  const handleToggleCompare = (machine: MachineItem) => {
    if (compareList.some((m) => m.id === machine.id)) {
      setCompareList(compareList.filter((m) => m.id !== machine.id));
    } else {
      if (compareList.length >= 3) {
        setCompareList([...compareList.slice(1), machine]);
      } else {
        setCompareList([...compareList, machine]);
      }
    }
  };

  const isFilterActive =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedProcess !== 'all' ||
    selectedTonnage !== 'all';

  return (
    <section id="katalog" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 sm:pb-8 border-b ${
            isDark ? 'border-neutral-800/80' : 'border-slate-200'
          }`}
        >
          <div>
            <div
              className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2 ${
                isDark ? 'text-amber-400' : 'text-amber-600 font-semibold'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.catalog.badge}</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t.catalog.title}
            </h2>
            <p className={`mt-2 text-xs sm:text-sm max-w-2xl ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              {t.catalog.desc}
            </p>
          </div>

          {/* View mode toggle: Grid vs Table */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div
              className={`flex items-center p-1 rounded-xl border ${
                isDark
                  ? 'bg-neutral-900 border-neutral-800'
                  : 'bg-slate-100 border-slate-200 shadow-2xs'
              }`}
            >
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? isDark
                      ? 'bg-neutral-800 text-white shadow-xs'
                      : 'bg-white text-slate-900 shadow-xs'
                    : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.catalog.viewGrid}
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? isDark
                      ? 'bg-neutral-800 text-white shadow-xs'
                      : 'bg-white text-slate-900 shadow-xs'
                    : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.catalog.viewTable}
              </button>
            </div>
          </div>
        </div>

        {/* Technical Filter Bar (Search + Dropdowns + Reset) */}
        <div
          className={`rounded-2xl p-4 my-6 sm:my-8 border backdrop-blur-sm ${
            isDark
              ? 'bg-[#0e121a]/90 border-neutral-800/80 shadow-md'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search
                className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isDark ? 'text-neutral-400' : 'text-slate-400'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.catalog.searchPlaceholder}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                  isDark
                    ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Process Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedProcess}
                  onChange={(e) => setSelectedProcess(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                    isDark
                      ? 'bg-neutral-950 border-neutral-800 text-neutral-200'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {processOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className={isDark ? 'bg-neutral-900 text-white' : 'bg-white text-slate-900'}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Tonnage / Dimension Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedTonnage}
                  onChange={(e) => setSelectedTonnage(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                    isDark
                      ? 'bg-neutral-950 border-neutral-800 text-neutral-200'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {tonnageOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className={isDark ? 'bg-neutral-900 text-white' : 'bg-white text-slate-900'}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Reset Button */}
            <div className="md:col-span-1 flex justify-end">
              <button
                onClick={resetFilters}
                disabled={!isFilterActive}
                title={t.catalog.resetFilters}
                className={`w-full md:w-auto p-2.5 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                  isFilterActive
                    ? isDark
                      ? 'border-amber-500/40 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                      : 'border-amber-400 text-amber-700 bg-amber-50 hover:bg-amber-100'
                    : isDark
                      ? 'border-neutral-800 text-neutral-600 bg-neutral-950 cursor-not-allowed'
                      : 'border-slate-200 text-slate-400 bg-slate-100 cursor-not-allowed'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Status Text */}
          <div
            className={`mt-3 pt-3 border-t flex flex-wrap items-center justify-between text-xs ${
              isDark ? 'border-neutral-800/60 text-neutral-400' : 'border-slate-200 text-slate-600'
            }`}
          >
            <div>
              {t.catalog.showingResults}{' '}
              <span className={`font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {filteredMachines.length}
              </span>{' '}
              {language === 'en' ? `of ${MACHINES_DATA.length} technical systems` : `dari ${MACHINES_DATA.length} item teknis`}
            </div>
            {isFilterActive && (
              <span className="text-amber-500 font-mono text-[11px] font-semibold">
                {language === 'en' ? 'Active filters applied' : 'Filter aktif diterapkan'}
              </span>
            )}
          </div>
        </div>

        {/* Catalog Grid View - 1 Col on HP, 2 Cols on Tablet, 3 Cols on PC */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredMachines.map((machine) => {
              const isAddedToRfq = rfqItemIds.includes(machine.id);
              const isCompared = compareList.some((m) => m.id === machine.id);

              return (
                <div
                  key={machine.id}
                  className={`group rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                    isDark
                      ? 'bg-[#0e121a] border-neutral-800 hover:border-amber-400/40'
                      : 'bg-white border-slate-200 hover:border-amber-500/40 shadow-slate-200'
                  }`}
                >
                  {/* Image Container with Zoom effect */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={machine.image}
                      alt={machine.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t opacity-80 ${
                        isDark
                          ? 'from-[#0e121a] via-[#0e121a]/30 to-transparent'
                          : 'from-slate-900/60 via-transparent to-transparent'
                      }`}
                    />
                    
                    {/* Quiet Top Metadata */}
                    <div
                      className={`absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono backdrop-blur-md px-2.5 py-1 rounded-lg border shadow-xs ${
                        isDark
                          ? 'bg-[#080a0f]/80 text-neutral-300 border-neutral-800'
                          : 'bg-white/90 text-slate-800 border-slate-200'
                      }`}
                    >
                      <span className="truncate max-w-[160px]">{machine.categoryName}</span>
                      <span aria-hidden="true" className={isDark ? 'text-neutral-600' : 'text-slate-400'}>·</span>
                      <span className="text-amber-500 font-bold">{machine.accuracyOrTolerance}</span>
                    </div>

                    {/* Quick Hover Action Overlay */}
                    <button
                      onClick={() => onOpenMachineDetail(machine)}
                      className={`absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border backdrop-blur-md transition-all shadow-md cursor-pointer ${
                        isDark
                          ? 'bg-neutral-900/90 hover:bg-neutral-800 text-white border-neutral-700'
                          : 'bg-white/95 hover:bg-white text-slate-900 border-slate-300 shadow-slate-900/10'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.catalog.viewDetail}</span>
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3
                        onClick={() => onOpenMachineDetail(machine)}
                        className={`text-base sm:text-lg font-bold tracking-tight transition-colors cursor-pointer font-display leading-snug ${
                          isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
                        }`}
                      >
                        {machine.name}
                      </h3>
                      <p className={`mt-2 text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                        {machine.shortDesc}
                      </p>
                    </div>

                    {/* Technical Specification Matrix */}
                    <div
                      className={`space-y-1.5 pt-3 border-t text-xs ${
                        isDark ? 'border-neutral-800/80' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono">
                        <span className={isDark ? 'text-neutral-500' : 'text-slate-500'}>
                          {t.modal.capacityTonnage}
                        </span>
                        <span className={`font-semibold truncate max-w-[170px] text-right ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {machine.capacityOrTonnage}
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-mono">
                        <span className={isDark ? 'text-neutral-500' : 'text-slate-500'}>
                          {t.modal.workingEnvelope}
                        </span>
                        <span className={`truncate max-w-[170px] text-right ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>
                          {machine.travelOrDimension}
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-mono">
                        <span className={isDark ? 'text-neutral-500' : 'text-slate-500'}>
                          {t.modal.processType}
                        </span>
                        <span className="text-amber-500 font-semibold truncate max-w-[170px] text-right">
                          {machine.processType}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div
                      className={`pt-3 border-t flex items-center gap-2 ${
                        isDark ? 'border-neutral-800/80' : 'border-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => onAddToRfq(machine)}
                        className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isAddedToRfq
                            ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                            : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 active:scale-98 shadow-xs'
                        }`}
                      >
                        {isAddedToRfq ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.catalog.inRfq}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{t.catalog.addToRfq}</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleToggleCompare(machine)}
                        className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                          isCompared
                            ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                            : isDark
                              ? 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
                              : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300'
                        }`}
                        title={isCompared ? 'Remove from compare' : 'Compare specifications'}
                      >
                        <Layers className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed Table View for Technical Spec Comparison - Responsive Scroll Wrapper */}
        {viewMode === 'table' && (
          <div
            className={`rounded-2xl border overflow-hidden shadow-xl ${
              isDark
                ? 'border-neutral-800 bg-[#0e121a]/90'
                : 'border-slate-200 bg-white shadow-slate-200'
            }`}
          >
            {/* Mobile Scroll Hint */}
            <div
              className={`p-2.5 text-center text-[11px] font-mono sm:hidden border-b ${
                isDark ? 'bg-neutral-900/80 text-neutral-400 border-neutral-800' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {language === 'en'
                ? '← Scroll horizontally to see full specifications table →'
                : '← Geser layar ke samping untuk melihat seluruh tabel spesifikasi →'}
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead
                  className={`uppercase tracking-wider font-mono border-b ${
                    isDark
                      ? 'bg-neutral-900 text-neutral-400 border-neutral-800'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <tr>
                    <th scope="col" className="px-4 py-3.5">{t.catalog.tableThName}</th>
                    <th scope="col" className="px-4 py-3.5">{t.catalog.tableThCategory}</th>
                    <th scope="col" className="px-4 py-3.5">{t.catalog.tableThCapacity}</th>
                    <th scope="col" className="px-4 py-3.5">{t.catalog.tableThDimension}</th>
                    <th scope="col" className="px-4 py-3.5">{t.catalog.tableThAccuracy}</th>
                    <th scope="col" className="px-4 py-3.5">{t.modal.processType}</th>
                    <th scope="col" className="px-4 py-3.5 text-right">{t.catalog.tableThAction}</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDark ? 'divide-neutral-800/80' : 'divide-slate-200'
                  }`}
                >
                  {filteredMachines.map((m) => {
                    const isAdded = rfqItemIds.includes(m.id);
                    return (
                      <tr
                        key={m.id}
                        className={`transition-colors ${
                          isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="px-4 py-3.5 font-bold font-display">
                          <button
                            onClick={() => onOpenMachineDetail(m)}
                            className={`transition-colors text-left cursor-pointer ${
                              isDark ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-amber-600'
                            }`}
                          >
                            {m.name}
                          </button>
                        </td>
                        <td className={`px-4 py-3.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>{m.categoryName}</td>
                        <td className={`px-4 py-3.5 font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{m.capacityOrTonnage}</td>
                        <td className={`px-4 py-3.5 font-mono ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>{m.travelOrDimension}</td>
                        <td className="px-4 py-3.5 text-amber-500 font-mono font-semibold">{m.accuracyOrTolerance}</td>
                        <td className={`px-4 py-3.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>{m.processType}</td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => onOpenMachineDetail(m)}
                              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                                isDark
                                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                              }`}
                            >
                              {t.catalog.viewDetail}
                            </button>
                            <button
                              onClick={() => onAddToRfq(m)}
                              className={`px-2.5 py-1 text-xs rounded font-bold transition-colors cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-500/20 text-emerald-500'
                                  : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
                              }`}
                            >
                              {isAdded ? (language === 'en' ? 'Saved' : 'Tersimpan') : '+ RFQ'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty state when no machines match search */}
        {filteredMachines.length === 0 && (
          <div
            className={`py-16 text-center rounded-2xl border p-8 ${
              isDark ? 'bg-neutral-900/40 border-neutral-800/80' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <p className={`text-lg font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.catalog.noResultsTitle}
            </p>
            <p className={`mt-1 text-xs sm:text-sm ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              {t.catalog.noResultsDesc}
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.catalog.resetFilters}</span>
            </button>
          </div>
        )}

        {/* Floating Compare Action Bar if machines selected */}
        {compareList.length > 0 && (
          <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 rounded-2xl px-5 py-3 shadow-2xl backdrop-blur-xl flex items-center gap-4 max-w-lg w-[92vw] border ${
              isDark
                ? 'bg-[#0e121a]/95 border-amber-400/40 text-white'
                : 'bg-white/95 border-amber-500/50 text-slate-900 shadow-slate-300'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div
                className={`text-xs font-bold font-display flex items-center gap-1.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {language === 'en'
                    ? `Compare Machines (${compareList.length}/3)`
                    : `Bandingkan Mesin (${compareList.length}/3)`}
                </span>
              </div>
              <div className={`text-[11px] truncate ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                {compareList.map((m) => m.name).join(' · ')}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenCompare(compareList)}
                className="px-3.5 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Open Comparison' : 'Lihat Komparasi'}
              </button>
              <button
                onClick={() => setCompareList([])}
                className={`text-xs px-1.5 cursor-pointer ${
                  isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {language === 'en' ? 'Cancel' : 'Batal'}
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
