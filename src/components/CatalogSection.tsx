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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProcess, setSelectedProcess] = useState<string>('all');
  const [selectedTonnage, setSelectedTonnage] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [compareList, setCompareList] = useState<MachineItem[]>([]);

  // Unique process options
  const processOptions = [
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

  const tonnageOptions = [
    { value: 'all', label: 'Semua Kapasitas/Tonase' },
    { value: 'heavy', label: 'Tonase Besar (200T – 250T)' },
    { value: 'medium', label: 'Tonase Menengah (110T – 150T)' },
    { value: 'high-accuracy', label: 'Presisi Sub-Mikron (±0.005mm)' },
    { value: 'large-travel', label: 'Travel Ekstra Panjang (3.000mm)' },
  ];

  // Filtering Logic
  const filteredMachines = useMemo(() => {
    return MACHINES_DATA.filter((item) => {
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
            item.accuracyOrTolerance.includes('Mikron');
          if (!isAccurate) return false;
        } else if (selectedTonnage === 'large-travel') {
          const isLarge =
            item.travelOrDimension.includes('3.000') ||
            item.name.includes('3000');
          if (!isLarge) return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, selectedProcess, selectedTonnage]);

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
        // Replace oldest
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
    <section id="katalog" className="py-20 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Katalog Interaktif Mesin &amp; Tooling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Showcase Mesin, Jig Fixture &amp; Dies Presisi
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">
              Telusuri kapabilitas permesinan dan lini produk kami. Gunakan filter spesifikasi teknis untuk menemukan mesin yang sesuai dengan toleransi, tonase, dan kebutuhan manufaktur Anda.
            </p>
          </div>

          {/* View mode toggle: Grid vs Table */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Kartu Visual
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Tabel Spesifikasi
              </button>
            </div>
          </div>
        </div>

        {/* Category Segmented Buttons */}
        <div className="py-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
            }`}
          >
            Semua Kategori ({MACHINES_DATA.length})
          </button>
          <button
            onClick={() => onSelectCategory('automation')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'automation'
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
            }`}
          >
            Automation &amp; Custom Machines
          </button>
          <button
            onClick={() => onSelectCategory('jig-fixture')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'jig-fixture'
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
            }`}
          >
            Jig &amp; Fixture Presisi
          </button>
          <button
            onClick={() => onSelectCategory('dies-moulds')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'dies-moulds'
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
            }`}
          >
            Dies &amp; Moulds
          </button>
          <button
            onClick={() => onSelectCategory('mass-production')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'mass-production'
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
            }`}
          >
            Parts Mass Production
          </button>
          <button
            onClick={() => onSelectCategory('facility-tools')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'facility-tools'
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
            }`}
          >
            Armada Mesin &amp; CMM
          </button>
        </div>

        {/* Technical Filter Bar (Search + Dropdowns + Reset) */}
        <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-2xl p-4 mb-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari mesin, akurasi, tonase, atau proses (contoh: 250T, CMM, Robot)..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400/80 transition-colors"
              />
            </div>

            {/* Process Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedProcess}
                  onChange={(e) => setSelectedProcess(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-medium text-neutral-200 focus:outline-none focus:border-amber-400/80 appearance-none pr-8 cursor-pointer"
                >
                  {processOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-neutral-900 text-white">
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
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-medium text-neutral-200 focus:outline-none focus:border-amber-400/80 appearance-none pr-8 cursor-pointer"
                >
                  {tonnageOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-neutral-900 text-white">
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
                title="Reset Filter"
                className={`w-full md:w-auto p-2.5 rounded-xl border flex items-center justify-center transition-colors ${
                  isFilterActive
                    ? 'border-amber-500/40 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                    : 'border-neutral-800 text-neutral-600 bg-neutral-950 cursor-not-allowed'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Status Text */}
          <div className="mt-3 pt-3 border-t border-neutral-800/60 flex flex-wrap items-center justify-between text-xs text-neutral-400">
            <div>
              Menampilkan <span className="font-semibold text-white font-mono">{filteredMachines.length}</span> dari {MACHINES_DATA.length} item teknis
            </div>
            {isFilterActive && (
              <span className="text-amber-400/90 font-mono text-[11px]">
                Filter aktif diterapkan
              </span>
            )}
          </div>
        </div>

        {/* Catalog Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMachines.map((machine) => {
              const isAddedToRfq = rfqItemIds.includes(machine.id);
              const isCompared = compareList.some((m) => m.id === machine.id);

              return (
                <div
                  key={machine.id}
                  className="group rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl"
                >
                  {/* Image Container with Zoom effect */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                    <img
                      src={machine.image}
                      alt={machine.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80" />
                    
                    {/* Quiet Top Metadata (NO PILLS: clean unboxed text) */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-300 font-mono bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-neutral-800">
                      <span>{machine.categoryName}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-amber-400 font-semibold">{machine.accuracyOrTolerance}</span>
                    </div>

                    {/* Quick Hover Action Overlay */}
                    <button
                      onClick={() => onOpenMachineDetail(machine)}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-900/90 hover:bg-neutral-800 text-white rounded-lg border border-neutral-700 backdrop-blur-md transition-all shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Spesifikasi</span>
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3
                        onClick={() => onOpenMachineDetail(machine)}
                        className="text-lg font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors cursor-pointer font-display leading-snug"
                      >
                        {machine.name}
                      </h3>
                      <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {machine.shortDesc}
                      </p>
                    </div>

                    {/* Technical Specification Matrix */}
                    <div className="space-y-1.5 pt-2 border-t border-neutral-800/80 text-xs">
                      <div className="flex items-center justify-between text-neutral-300 font-mono">
                        <span className="text-neutral-500">Kapasitas / Tonase</span>
                        <span className="font-semibold text-white truncate max-w-[170px] text-right">
                          {machine.capacityOrTonnage}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-300 font-mono">
                        <span className="text-neutral-500">Travel / Dimensi</span>
                        <span className="text-white truncate max-w-[170px] text-right">
                          {machine.travelOrDimension}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-300 font-mono">
                        <span className="text-neutral-500">Tipe Proses</span>
                        <span className="text-amber-300/90 truncate max-w-[170px] text-right">
                          {machine.processType}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center gap-2">
                      <button
                        onClick={() => onAddToRfq(machine)}
                        className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isAddedToRfq
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold active:scale-98 shadow-sm'
                        }`}
                      >
                        {isAddedToRfq ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Tersimpan di RFQ</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Minta Penawaran</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleToggleCompare(machine)}
                        className={`p-2 rounded-lg border text-xs transition-colors ${
                          isCompared
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
                        }`}
                        title={isCompared ? 'Hapus dari perbandingan' : 'Bandingkan spesifikasi'}
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

        {/* Detailed Table View for Technical Spec Comparison */}
        {viewMode === 'table' && (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900 text-neutral-400 uppercase tracking-wider font-mono border-b border-neutral-800">
                  <tr>
                    <th scope="col" className="px-4 py-3.5">Nama Mesin / Produk</th>
                    <th scope="col" className="px-4 py-3.5">Kategori</th>
                    <th scope="col" className="px-4 py-3.5">Tonase / Kapasitas</th>
                    <th scope="col" className="px-4 py-3.5">Travel / Dimensi</th>
                    <th scope="col" className="px-4 py-3.5">Akurasi &amp; Toleransi</th>
                    <th scope="col" className="px-4 py-3.5">Tipe Proses</th>
                    <th scope="col" className="px-4 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {filteredMachines.map((m) => {
                    const isAdded = rfqItemIds.includes(m.id);
                    return (
                      <tr key={m.id} className="hover:bg-neutral-800/50 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-white font-display">
                          <button
                            onClick={() => onOpenMachineDetail(m)}
                            className="hover:text-amber-400 transition-colors text-left"
                          >
                            {m.name}
                          </button>
                        </td>
                        <td className="px-4 py-3.5 text-neutral-400">{m.categoryName}</td>
                        <td className="px-4 py-3.5 text-white font-mono">{m.capacityOrTonnage}</td>
                        <td className="px-4 py-3.5 text-neutral-300 font-mono">{m.travelOrDimension}</td>
                        <td className="px-4 py-3.5 text-amber-300 font-mono font-semibold">{m.accuracyOrTolerance}</td>
                        <td className="px-4 py-3.5 text-neutral-400">{m.processType}</td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => onOpenMachineDetail(m)}
                              className="px-2.5 py-1 text-xs rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                            >
                              Detail
                            </button>
                            <button
                              onClick={() => onAddToRfq(m)}
                              className={`px-2.5 py-1 text-xs rounded font-semibold transition-colors ${
                                isAdded
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
                              }`}
                            >
                              {isAdded ? 'Tersimpan' : '+ RFQ'}
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
          <div className="py-16 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800/80 p-8">
            <p className="text-lg font-bold text-white font-display">
              Tidak ada mesin yang sesuai dengan filter pencarian
            </p>
            <p className="mt-1 text-sm text-neutral-400">
              Silakan sesuaikan kata kunci pencarian atau reset filter untuk melihat katalog lengkap.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        )}

        {/* Floating Compare Action Bar if machines selected */}
        {compareList.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/95 border border-amber-400/40 rounded-2xl px-5 py-3 shadow-2xl backdrop-blur-xl flex items-center gap-4 max-w-lg w-[92vw]">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white font-display flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Bandingkan Mesin ({compareList.length}/3)</span>
              </div>
              <div className="text-[11px] text-neutral-400 truncate">
                {compareList.map((m) => m.name).join(' · ')}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenCompare(compareList)}
                className="px-3.5 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg whitespace-nowrap transition-colors"
              >
                Lihat Komparasi
              </button>
              <button
                onClick={() => setCompareList([])}
                className="text-xs text-neutral-400 hover:text-white px-1.5"
              >
                Batal
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
