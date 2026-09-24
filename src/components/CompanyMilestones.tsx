import React from 'react';
import { MILESTONES, COMPANY_INFO } from '../data/company';
import { Award, ShieldCheck, MapPin, Users, Calendar, ArrowRight } from 'lucide-react';

interface CompanyMilestonesProps {
  onOpenRfq: () => void;
}

export const CompanyMilestones: React.FC<CompanyMilestonesProps> = ({ onOpenRfq }) => {
  return (
    <section id="tentang" className="py-20 bg-neutral-900/30 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs font-mono uppercase tracking-wider text-amber-400 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Rekam Jejak Sejak 1999</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Profil Perusahaan &amp; Perjalanan Inovasi
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-300">
            Perjalanan lebih dari seperempat abad PT. PRIMA TEKNIK TRADA dalam memajukan industri manufaktur presisi di Indonesia melalui penguasaan teknologi permesinan modern.
          </p>
        </div>

        {/* Company Quick Credentials Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Sertifikasi Mutu</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-white font-display">ISO 9001:2015</div>
            <div className="text-xs text-neutral-400 font-mono">No. Cert: MD/PTT954 (IDCAB)</div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Legalitas Perusahaan</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-white font-display">NIB Terdaftar</div>
            <div className="text-xs text-neutral-400 font-mono">NIB: {COMPANY_INFO.nib}</div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Fasilitas Kawasan</span>
              <MapPin className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-white font-display">MM2100 Cibitung</div>
            <div className="text-xs text-neutral-400 font-mono">Tanah: 2.806 m² / Bangunan: 2.400 m²</div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Sumber Daya Ahli</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-white font-display">90 Personil</div>
            <div className="text-xs text-neutral-400 font-mono">Operator &amp; Engineer Bersertifikasi</div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="relative border-l border-neutral-800 ml-4 sm:ml-32 space-y-10">
          {MILESTONES.map((item, idx) => (
            <div key={item.year} className="relative pl-6 sm:pl-8 group">
              {/* Year Pill on Left for desktop */}
              <div className="hidden sm:block absolute -left-28 top-0.5 text-right font-display font-black text-lg text-amber-400 group-hover:text-amber-300 transition-colors font-mono">
                {item.year}
              </div>

              {/* Marker Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-neutral-950 border-2 border-amber-400 group-hover:scale-125 group-hover:bg-amber-400 transition-all shadow-sm" />

              {/* Content Box */}
              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 group-hover:border-neutral-700 transition-all">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="sm:hidden font-mono font-bold text-amber-400 text-sm">
                    {item.year} —
                  </span>
                  <h3 className="text-base font-bold text-white font-display">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400">
                    ({item.sub})
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/30 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white font-display">
              Ingin Menjadwalkan Factory Audit &amp; Kunjungan Fasilitas?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Kami menyambut hangat tim engineering dan purchasing Anda di Kawasan Industri MM2100 Cibitung, Bekasi.
            </p>
          </div>
          <button
            onClick={onOpenRfq}
            className="px-6 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Ajukan Jadwal &amp; Penawaran</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
