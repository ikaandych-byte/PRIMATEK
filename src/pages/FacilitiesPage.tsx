import React from 'react';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { AppPage } from '../components/Navbar';
import {
  Building,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  ArrowRight,
  PhoneCall,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface FacilitiesPageProps {
  onSelectPage: (page: AppPage) => void;
  onOpenRfq: () => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({
  onSelectPage,
  onOpenRfq,
}) => {
  const facilityPillars = [
    {
      title: 'Lahan & Area Workshop',
      val: '2.806 m²',
      sub: 'Bangunan Produksi 2.400 m²',
      desc: 'Terletak strategis di Kawasan Industri MM2100 Cibitung Bekasi dengan akses kontainer 40ft.',
    },
    {
      title: 'Armada Mesin Produksi',
      val: '45+ Unit',
      sub: 'Mesin Presisi Berkapasitas Tinggi',
      desc: 'CNC Machining Double Column 3 meter, Press Stamping 110T-250T, CNC Lathe 4-Axis, dan Grinding.',
    },
    {
      title: 'Kapasitas Angkat Berat',
      val: '10 Ton Crane',
      sub: 'Overhead Crane Ganda',
      desc: 'Penanganan aman untuk die base cetakan besar, frame mesin otomatis, dan material berat.',
    },
    {
      title: 'Laboratorium Metrologi CMM',
      val: '±0.002 mm',
      sub: 'Clean Room Suhu Konstan',
      desc: 'CMM Mitutoyo terkalibrasi untuk inspeksi koordinat 3D dan validasi toleransi sub-mikron.',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Engineering & 3D CAD/CAM',
      desc: 'Pemodelan solid model 3D, finite element analysis (FEA), dan simulasi jalur potong CNC sebelum pengerjaan.',
    },
    {
      step: '02',
      title: 'Roughing & Double Column CNC',
      desc: 'Pemesinan balok baja paduan dan die base menggunakan CNC Double Column stroke 3.000 mm.',
    },
    {
      step: '03',
      title: 'Precision Machining & Grinding',
      desc: 'Pengerjaan profil mikro pada CNC Milling 4-axis serta surface grinding untuk toleransi sub-mikron.',
    },
    {
      step: '04',
      title: 'Assembly & PLC/Robotics',
      desc: 'Perakitan mekanik, instalasi hidrolik/pneumatik Pascal/Kosmek, kabel panel, dan pemrograman PLC/Robot.',
    },
    {
      step: '05',
      title: 'Tryout & CMM Inspection',
      desc: 'Pengujian beban kerja kontinu di pabrik dan verifikasi dimensi 3D CMM berstandar ISO 9001:2015.',
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* 1. Simple, Clean & Attractive Hero Section for Facilities Page */}
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
            <span className="text-amber-400 font-semibold">Fasilitas Pabrik MM2100</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700/80 text-[11px] font-mono text-neutral-300">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase tracking-wider">Fasilitas &amp; Infrastruktur Produksi</span>
                <span className="text-neutral-600">|</span>
                <span className="text-amber-400 font-medium">MM2100 CIBITUNG</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
                Fasilitas Pabrik &amp;{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                  Armada Mesin Presisi
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                Didukung fasilitas seluas 2.806 m² dengan bangunan pabrik terintegrasi 2.400 m² di Kawasan Industri MM2100 Cibitung, PT. PRIMA TEKNIK TRADA memiliki kapabilitas permesinan lengkap untuk fabrikasi mesin industri berdimensi besar dan komponen berakurasi tinggi.
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
                <span>Minta Penawaran (RFQ)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollToSection('alur-produksi')}
                className="px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all cursor-pointer"
              >
                Alur Proses Produksi
              </button>
            </div>
          </div>

          {/* 4 Pillars Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4 border-t border-neutral-800/80">
            {facilityPillars.map((p, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800/80 space-y-1.5 hover:border-amber-400/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {p.title}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-display">
                  {p.val}
                </div>
                <div className="text-xs font-semibold text-white">{p.sub}</div>
                <p className="text-[11px] text-neutral-400 leading-normal pt-1 font-sans">
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
      <section id="alur-produksi" className="py-16 bg-neutral-900/30 border-t border-neutral-800/80 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Gauge className="w-3.5 h-3.5" />
              <span>Standar Operasional Produksi</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display">
              Alur Rekayasa &amp; Kontrol Kualitas Terintegrasi
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400">
              Setiap proyek dikawal ketat mulai dari telaah desain CAD/CAM hingga uji terima pabrik (FAT).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {workflowSteps.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 space-y-2.5 relative group hover:border-amber-400/50 transition-all duration-300"
              >
                <div className="text-2xl font-black text-amber-400 font-display">
                  {step.step}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white font-display">
                  {step.title}
                </h3>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Plant Visit & Quality Audit Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-mono uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Kunjungan Pabrik &amp; Factory Acceptance Test (FAT)</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                Ingin Mengadakan Audit Fasilitas atau Meninjau Mesin di Workshop MM2100?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                Kami mengundang tim procurement, engineering, dan QA calon klien untuk meninjau kapabilitas workshop MM2100 kami secara langsung.
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
                Jadwalkan Kunjungan &amp; RFQ
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
                className="px-4 py-3 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/90 hover:bg-neutral-800 border border-neutral-700 rounded-xl transition-all flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Hubungi Kantor</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
