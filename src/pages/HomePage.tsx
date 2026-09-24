import React from 'react';
import { HeroVideo } from '../components/HeroVideo';
import { ClientMarquee } from '../components/ClientMarquee';
import { AppPage } from '../components/Navbar';
import { MachineCategory } from '../types';
import {
  Cpu,
  Layers,
  Wrench,
  Cog,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  PhoneCall,
  FileText,
} from 'lucide-react';
import facilityImg from '../assets/images/hero_industrial_automation_1790239853481.jpg';
import { COMPANY_INFO } from '../data/company';

interface HomePageProps {
  onSelectPage: (page: AppPage) => void;
  onSelectCategory: (category: MachineCategory) => void;
  onOpenRfq: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectPage,
  onSelectCategory,
  onOpenRfq,
}) => {
  const capabilities = [
    {
      category: 'automation' as MachineCategory,
      title: 'Customized Machine & Automation',
      subtitle: 'Sistem Otomasi Robotik & Mesin Khusus',
      desc: 'Perancangan dan fabrikasi mesin perakitan otomatis (SPM), robot cell welding, automated leak testing, conveyor packaging, dan PLC/SCADA control panel.',
      highlights: ['Integrasi Robot SCARA & 6-Axis', 'Cycle Time Lebih Cepat', 'Sensitivitas Leak Test 0.1 kPa'],
      icon: Cpu,
      color: 'from-amber-500/20 to-transparent',
    },
    {
      category: 'jig-fixture' as MachineCategory,
      title: 'Precision Jig & Fixture Tooling',
      subtitle: 'Hydraulic Clamping & Checking Fixtures',
      desc: 'Tooling jig presisi tinggi untuk machining center dan checking fixture metrologi untuk inspeksi dimensi bodi & sasis otomotif bersertifikasi.',
      highlights: ['Akurasi Dimensi ±0.005 mm', 'Sistem Klem Hidrolik Pascal/Kosmek', 'Zero-Play Bushing Hardened SKD11'],
      icon: Layers,
      color: 'from-blue-500/20 to-transparent',
    },
    {
      category: 'dies-moulds' as MachineCategory,
      title: 'Heavy Duty Dies & Moulds',
      subtitle: 'Progressive, Transfer & Tandem Dies',
      desc: 'Pembuatan cetakan stamping logam plat tebal hingga 6mm dan dies presisi untuk komponen struktural otomotif, electrical parts, dan peralatan industri.',
      highlights: ['Kapasitas Mesin Press 110T – 250T', 'Maksimal Die Base 3.000 x 2.000 mm', 'Material Tool Steel DIN 1.2379 / SKD11'],
      icon: Wrench,
      color: 'from-emerald-500/20 to-transparent',
    },
    {
      category: 'mass-production' as MachineCategory,
      title: 'Mass Production Parts Machining',
      subtitle: 'Stamping & CNC Machining Volume Tinggi',
      desc: 'Lini produksi massal komponen presisi otomotif, bearing spacer, bushing, shaft, dan braket logam dengan jaminan mutu konsisten bersertifikat ISO 9001:2015.',
      highlights: ['Output >100.000 pcs / bulan', 'In-Line Quality Control & CMM', 'Supply Chain Tier-1 Otomotif'],
      icon: Cog,
      color: 'from-purple-500/20 to-transparent',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroVideo
        onOpenRfq={onOpenRfq}
        onExploreCatalog={() => {
          onSelectPage('katalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          onSelectCategory(cat as MachineCategory);
          onSelectPage('katalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Client & Technical Partner Logos Section (Kept visible on Home as requested) */}
      <ClientMarquee />

      {/* 3. Core Manufacturing Pillars Section */}
      <section className="py-20 bg-neutral-900/40 border-b border-neutral-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Solusi Manufaktur Terintegrasi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
                4 Pilar Kapabilitas Rekayasa Mesin &amp; Tooling
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl">
                Dari riset desain CAD/CAM 3D, simulasi permesinan, perakitan hingga try-out di pabrik sendiri di Kawasan Industri MM2100 Cibitung.
              </p>
            </div>

            <button
              onClick={() => {
                onSelectPage('katalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md self-start md:self-auto cursor-pointer"
            >
              <span>Buka Katalog Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.category}
                  className="group p-6 sm:p-8 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${item.color} rounded-bl-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity`}
                  />

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                          {item.subtitle}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    <div className="space-y-2 mb-6">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onSelectCategory(item.category);
                        onSelectPage('katalog');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer group-hover:underline"
                    >
                      <span>Lihat Spesifikasi Mesin</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={onOpenRfq}
                      className="text-[11px] font-mono text-neutral-400 hover:text-white px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer"
                    >
                      Minta Estimasi
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Plant Teaser / Facility Preview Banner */}
      <section className="py-20 bg-neutral-950 border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 relative aspect-[16/11] lg:aspect-auto lg:h-full bg-neutral-900">
              <img
                src={facilityImg}
                alt="Fasilitas Pabrik MM2100 Cibitung PT Prima Teknik Trada"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-mono uppercase tracking-wider text-amber-400">
                <Building2 className="w-3.5 h-3.5" />
                <span>Pusat Fasilitas Terintegrasi MM2100</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                Lahan 2.806 m² dengan 45+ Unit Mesin Presisi &amp; Heavy Double Column
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Terletak strategis di Kawasan Industri MM2100 Cibitung Bekasi, pabrik kami memiliki kapasitas handling hingga 10 Ton dengan Overhead Crane ganda, laboratorium metrologi CMM berpendingin suhu konstan, serta deretan mesin Stamping Press mekanik 110T hingga 250T.
              </p>

              {/* Quick Facility Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px]">Luas Bangunan</div>
                  <div className="text-white font-bold text-sm mt-0.5">2.400 m²</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px]">Stroke Double Column</div>
                  <div className="text-amber-400 font-bold text-sm mt-0.5">3.000 mm</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px]">Sertifikasi</div>
                  <div className="text-white font-bold text-sm mt-0.5">ISO 9001:2015</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    onSelectPage('fasilitas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                >
                  <span>Buka Halaman Fasilitas Pabrik</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onSelectPage('tentang');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-3 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 rounded-xl transition-all cursor-pointer"
                >
                  Tentang Perusahaan &amp; Kontak
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Ready to Quote */}
      <section className="py-16 bg-neutral-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-mono uppercase tracking-wider text-amber-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kemitraan Jangka Panjang</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
            Butuh Penawaran Harga atau Konsultasi Spesifikasi Mesin?
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Kirimkan rancangan gambar kerja (2D/3D CAD) atau diskusikan kebutuhan otomatisasi lini produksi pabrik Anda bersama tim teknisi kami.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                onSelectPage('tentang');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <FileText className="w-4 h-4" />
              <span>Isi Formulir Penawaran (RFQ)</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="px-5 py-3.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Hubungi Kantor: (021) 8980378</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
