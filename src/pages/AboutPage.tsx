import React, { useRef } from 'react';
import { CompanyMilestones } from '../components/CompanyMilestones';
import { RfqForm } from '../components/RfqForm';
import { AppPage } from '../components/Navbar';
import { RfqItem, MachineItem } from '../types';
import { COMPANY_INFO } from '../data/company';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Globe,
  MessageSquare,
  ShieldCheck,
  Award,
  Send,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface AboutPageProps {
  onSelectPage: (page: AppPage) => void;
  rfqItems: RfqItem[];
  onRemoveItem: (machineId: string) => void;
  onUpdateQuantity: (machineId: string, delta: number) => void;
  onAddQuickItem: (machine: MachineItem) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onSelectPage,
  rfqItems,
  onRemoveItem,
  onUpdateQuantity,
  onAddQuickItem,
}) => {
  const rfqSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const scrollToRfq = () => {
    rfqSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'PT Prima Teknik Trada Kawasan Industri MM2100 Cibitung Bekasi'
  )}`;

  return (
    <div className="min-h-screen bg-neutral-950 pb-20">
      {/* 1. Simple, Clean & Attractive Hero Section for About Page */}
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
            <span className="text-amber-400 font-semibold">Tentang Kami &amp; Kontak MM2100</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700/80 text-[11px] font-mono text-neutral-300">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase tracking-wider">Profil Perusahaan Sejak 1999</span>
                <span className="text-neutral-600">|</span>
                <span className="text-amber-400 font-medium">ISO 9001:2015</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
                Tentang Kami &amp;{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                  Layanan Penawaran Harga (RFQ)
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                Didirikan pada tahun 1999 di Kawasan Industri MM2100 Cibitung, PT. PRIMA TEKNIK TRADA berdedikasi menjadi mitra strategis manufaktur presisi di Indonesia dengan fasilitas terintegrasi, rekayasa desain 3D CAD/CAM, dan respon penawaran harga langsung (RFQ).
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={scrollToRfq}
                className="px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Formulir Penawaran (RFQ)</span>
              </button>

              <button
                onClick={scrollToContact}
                className="px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Lokasi &amp; Peta Navigasi</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-neutral-800/80 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Pengalaman Industri</span>
                <span className="text-sm font-bold text-white font-display">25+ Tahun (Sejak 1999)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Kawasan Strategis</span>
                <span className="text-sm font-bold text-white font-display">MM2100 Cibitung, Bekasi</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Sistem Mutu Internasional</span>
                <span className="text-sm font-bold text-amber-400 font-display">ISO 9001:2015 Terakreditasi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Company Milestones & Core Capabilities */}
      <section className="pt-6">
        <CompanyMilestones onOpenRfq={scrollToRfq} />
      </section>

      {/* 3. Contact & Location Showcase MM2100 */}
      <section ref={contactSectionRef} id="kontak" className="py-14 bg-neutral-900/30 border-t border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Lokasi Strategis Pusat Industri</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display">
              Kantor Pusat &amp; Fasilitas Manufaktur Cibitung
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400">
              Akses cepat dari Tol Jakarta-Cikampek KM 24 (Gerbang Tol Cibitung MM2100).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Contact Details Grid (5 cols) */}
            <div className="lg:col-span-5 space-y-3.5">
              
              {/* Alamat Fisik */}
              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Alamat Pabrik &amp; Workshop</span>
                </div>
                <div className="text-white font-bold font-display text-base">
                  PT. PRIMA TEKNIK TRADA
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {COMPANY_INFO.address}
                </p>
                <div className="pt-1 text-[11px] text-neutral-400 font-mono">
                  Kawasan Industri MM2100, Cikarang Barat, Bekasi 17520
                </div>
              </div>

              {/* Telepon & WhatsApp */}
              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider">
                  <Phone className="w-4 h-4" />
                  <span>Saluran Komunikasi Resmi</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Telepon Hunting:</span>
                    <a
                      href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-white font-bold hover:text-amber-400"
                    >
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Faksimili:</span>
                    <span className="text-neutral-400">{COMPANY_INFO.fax}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>WhatsApp Engineering:</span>
                    <a
                      href="https://wa.me/6281288880378"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      +62 812-8888-0378
                    </a>
                  </div>
                </div>
              </div>

              {/* Email & Website */}
              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>Email Korespondensi &amp; RFQ</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Sales &amp; Inquiry:</span>
                    <a
                      href={`mailto:${COMPANY_INFO.emailPrimary}`}
                      className="text-amber-400 hover:underline"
                    >
                      {COMPANY_INFO.emailPrimary}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Engineering:</span>
                    <a
                      href={`mailto:${COMPANY_INFO.emailSecondary}`}
                      className="text-amber-400 hover:underline"
                    >
                      {COMPANY_INFO.emailSecondary}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Situs Resmi:</span>
                    <span className="text-white">{COMPANY_INFO.website}</span>
                  </div>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-3 text-xs">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-neutral-300">
                  <div className="font-semibold text-white">Jam Operasional Workshop MM2100:</div>
                  <div className="text-[11px] text-neutral-400">
                    Senin – Jumat: 08:00 – 17:00 WIB · Sabtu: 08:00 – 13:00 WIB
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Map Visual (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900 shadow-xl">
                {/* Map Header Bar */}
                <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-neutral-300 font-semibold">
                      Lokasi: MM2100 Industrial Estate, Blok C1 No. 17-18
                    </span>
                  </div>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-amber-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Buka Rute Navigasi</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>

                {/* Map Frame / Embedded Visual */}
                <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                  <iframe
                    title="Peta Lokasi PT Prima Teknik Trada MM2100 Cibitung"
                    src="https://maps.google.com/maps?q=Kawasan+Industri+MM2100+Cibitung+Bekasi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter invert contrast-125 hue-rotate-180 brightness-95 opacity-85 hover:opacity-100 transition-opacity"
                    loading="lazy"
                    allowFullScreen
                  />

                  {/* Overlay Badge for MM2100 */}
                  <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-neutral-950/90 border border-neutral-800 backdrop-blur-md text-xs space-y-1 max-w-xs shadow-2xl pointer-events-none">
                    <div className="font-bold text-white font-display">PT. PRIMA TEKNIK TRADA</div>
                    <div className="text-[11px] text-amber-400 font-mono">Jl. Flores 1 Blok C1 No. 17-18, MM2100</div>
                    <div className="text-[10px] text-neutral-400">10 Menit dari Exit Tol Cibitung KM 24</div>
                  </div>
                </div>

                {/* Direct Action Footer */}
                <div className="p-4 bg-neutral-950/70 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-neutral-400">
                    Akses kontainer 40ft &amp; truk tronton langsung ke loading dock pabrik.
                  </span>
                  <a
                    href="https://wa.me/6281288880378?text=Halo%20PT%20Prima%20Teknik%20Trada,%20saya%20ingin%20menanyakan%20lokasi%20dan%20jadwal%20kunjungan%20ke%20pabrik%20MM2100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Konfirmasi Kunjungan via WA</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Form Penawaran Harga Langsung (RFQ) */}
      <div ref={rfqSectionRef} className="pt-6">
        <RfqForm
          rfqItems={rfqItems}
          onRemoveItem={onRemoveItem}
          onUpdateQuantity={onUpdateQuantity}
          onAddQuickItem={onAddQuickItem}
        />
      </div>
    </div>
  );
};
