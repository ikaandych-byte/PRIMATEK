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
  CheckCircle2,
} from 'lucide-react';

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
  const categoryPills: { id: MachineCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: 'Semua Mesin & Tooling', icon: Filter },
    { id: 'automation', label: 'Automation & Custom Machines', icon: Cpu },
    { id: 'jig-fixture', label: 'Jig & Fixture Presisi', icon: Layers },
    { id: 'dies-moulds', label: 'Dies & Moulds Heavy Duty', icon: Wrench },
    { id: 'mass-production', label: 'Parts Mass Production', icon: Cog },
    { id: 'facility-tools', label: 'Armada Mesin & CMM', icon: Building },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* 1. Simple, Clean & Attractive Hero Section for Catalog Page */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 relative overflow-hidden bg-neutral-950 border-b border-neutral-800/80">
        {/* Subtle Background Lighting & Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
            <button
              onClick={() => onSelectPage('beranda')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Beranda
            </button>
            <span className="text-neutral-600">/</span>
            <span className="text-amber-400 font-semibold">Katalog &amp; Spesifikasi Teknis</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700/80 text-[11px] font-mono text-neutral-300">
                <TableProperties className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase tracking-wider">Katalog Produk &amp; Rekayasa Presisi</span>
                <span className="text-neutral-600">|</span>
                <span className="text-amber-400 font-medium">MM2100 CIBITUNG</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
                Katalog Mesin &amp;{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                  Spesifikasi Teknis
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                Jelajahi seluruh lini produk permesinan presisi tinggi, mesin otomasi kustom (SPM), hydraulic jig fixture, cetakan stamping dies, hingga komponen produksi massal dengan standar toleransi sub-mikron ISO 9001:2015.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  onSelectPage('tentang');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
              >
                <span>Minta RFQ Penawaran</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Category Switcher Pills */}
          <div className="pt-4 border-t border-neutral-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider whitespace-nowrap mr-1 hidden sm:inline-block">
              Filter Kategori:
            </span>
            <div className="flex items-center gap-2">
              {categoryPills.map((pill) => {
                const Icon = pill.icon;
                const isActive = selectedCategory === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => onSelectCategory(pill.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-950' : 'text-amber-400'}`} />
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Technical Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 font-mono text-xs">
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
              <span className="text-neutral-400 text-[10px] block">Akurasi &amp; Toleransi</span>
              <span className="font-bold text-amber-400 text-sm">±0.005 mm</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
              <span className="text-neutral-400 text-[10px] block">Stroke Double Column</span>
              <span className="font-bold text-white text-sm">3.000 mm</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
              <span className="text-neutral-400 text-[10px] block">Kapasitas Stamping Press</span>
              <span className="font-bold text-white text-sm">110T – 250T</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
              <span className="text-neutral-400 text-[10px] block">Standar Kontrol Otomasi</span>
              <span className="font-bold text-amber-400 text-sm">PLC &amp; Robotik</span>
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
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-mono uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Special Purpose Machine (SPM) Kustom</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              Membutuhkan Mesin Khusus Sesuai Gambar CAD 2D/3D Anda?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Tim rekayasa kami siap merealisasikan mesin otomasi, hydraulic fixture, dan dies sesuai spesifikasi operasional di pabrik Anda.
            </p>
          </div>

          <button
            onClick={() => {
              onSelectPage('tentang');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-lg shadow-amber-500/20 shrink-0"
          >
            <span>Konsultasi Teknis &amp; RFQ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
