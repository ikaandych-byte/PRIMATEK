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
  MessageSquare,
  ShieldCheck,
  Award,
  Send,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

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
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

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
    <div
      className={`min-h-screen pb-20 transition-colors duration-300 ${
        isDark ? 'bg-[#080a0f]' : 'bg-[#f8fafc]'
      }`}
    >
      {/* 1. Simple, Clean & Attractive Hero Section for About Page */}
      <section
        className={`pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 relative overflow-hidden border-b transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-[#080a0f] via-[#0d1017] to-[#0a0d14] border-neutral-800/80'
            : 'bg-gradient-to-b from-slate-100 via-white to-slate-50 border-slate-200'
        }`}
      >
        {/* Subtle Background Lighting & Grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-70 pointer-events-none" />
        <div
          className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[130px] pointer-events-none ${
            isDark ? 'bg-amber-500/10' : 'bg-amber-500/15'
          }`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div
            className={`flex items-center gap-2 text-xs font-mono mb-4 ${
              isDark ? 'text-neutral-400' : 'text-slate-500'
            }`}
          >
            <button
              onClick={() => onSelectPage('beranda')}
              className={`hover:underline cursor-pointer ${
                isDark ? 'hover:text-amber-400' : 'hover:text-amber-600'
              }`}
            >
              {t.nav.home}
            </button>
            <span className={isDark ? 'text-neutral-600' : 'text-slate-300'}>/</span>
            <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
              {t.about.breadcrumbAbout}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
            <div className="max-w-3xl space-y-3">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-700/80 text-neutral-300'
                    : 'bg-white border-slate-300 text-slate-700 shadow-2xs'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                <span className="uppercase tracking-wider">{t.about.heroBadge}</span>
                <span className={isDark ? 'text-neutral-600' : 'text-slate-300'}>|</span>
                <span className={`font-medium ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                  ISO 9001:2015
                </span>
              </div>

              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {language === 'en' ? (
                  <>
                    About Us &amp;{' '}
                    <span
                      className={`bg-clip-text text-transparent ${
                        isDark
                          ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200'
                          : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600'
                      }`}
                    >
                      Request Quotation (RFQ)
                    </span>
                  </>
                ) : (
                  <>
                    Tentang Kami &amp;{' '}
                    <span
                      className={`bg-clip-text text-transparent ${
                        isDark
                          ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200'
                          : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600'
                      }`}
                    >
                      Layanan Penawaran Harga (RFQ)
                    </span>
                  </>
                )}
              </h1>

              <p
                className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${
                  isDark ? 'text-neutral-300' : 'text-slate-600'
                }`}
              >
                {language === 'en'
                  ? 'Established in 1999 in MM2100 Industrial Estate Cibitung, PT. PRIMA TEKNIK TRADA is dedicated to being a premier precision engineering partner, combining integrated manufacturing assets, 3D CAD/CAM capability, and responsive RFQ service.'
                  : 'Didirikan pada tahun 1999 di Kawasan Industri MM2100 Cibitung, PT. PRIMA TEKNIK TRADA berdedikasi menjadi mitra strategis manufaktur presisi di Indonesia dengan fasilitas terintegrasi, rekayasa desain 3D CAD/CAM, dan respon penawaran harga langsung (RFQ).'}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={scrollToRfq}
                className="px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'RFQ Online Form' : 'Formulir Penawaran (RFQ)'}</span>
              </button>

              <button
                onClick={scrollToContact}
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isDark
                    ? 'text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border-neutral-800'
                    : 'text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border-slate-300 shadow-2xs'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                <span>{language === 'en' ? 'Factory Location & Map' : 'Lokasi & Peta Navigasi'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t font-mono text-xs ${
              isDark ? 'border-neutral-800/80' : 'border-slate-200'
            }`}
          >
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                isDark ? 'bg-[#0e121a] border-neutral-800/80' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' : 'bg-amber-50 border-amber-300 text-amber-600'
                }`}
              >
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-[10px] uppercase tracking-wider block ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {language === 'en' ? 'Industry Track Record' : 'Pengalaman Industri'}
                </span>
                <span className={`text-sm font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'en' ? '25+ Years (Since 1999)' : '25+ Tahun (Sejak 1999)'}
                </span>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                isDark ? 'bg-[#0e121a] border-neutral-800/80' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' : 'bg-amber-50 border-amber-300 text-amber-600'
                }`}
              >
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-[10px] uppercase tracking-wider block ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {language === 'en' ? 'Strategic Location' : 'Kawasan Strategis'}
                </span>
                <span className={`text-sm font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  MM2100 Cibitung, Bekasi
                </span>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                isDark ? 'bg-[#0e121a] border-neutral-800/80' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' : 'bg-amber-50 border-amber-300 text-amber-600'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-[10px] uppercase tracking-wider block ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {language === 'en' ? 'Accredited Quality Standard' : 'Sistem Mutu Internasional'}
                </span>
                <span className="text-sm font-bold text-amber-500 font-display">
                  ISO 9001:2015 Accredited
                </span>
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
      <section
        ref={contactSectionRef}
        id="kontak"
        className={`py-14 border-t transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-[#0a0d14] via-[#0f131f] to-[#0a0d14] border-neutral-800/80'
            : 'bg-gradient-to-b from-slate-100 via-white to-slate-100 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-2 border ${
                isDark
                  ? 'bg-amber-400/10 border-amber-400/25 text-amber-400'
                  : 'bg-amber-50 border-amber-300 text-amber-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.about.contactBadge}</span>
            </div>
            <h2
              className={`text-xl sm:text-2xl lg:text-3xl font-extrabold font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {language === 'en'
                ? 'Head Office & MM2100 Cibitung Manufacturing Plant'
                : 'Kantor Pusat & Fasilitas Manufaktur Cibitung'}
            </h2>
            <p className={`mt-2 text-xs sm:text-sm ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              {language === 'en'
                ? 'Rapid access via Jakarta-Cikampek Toll Road KM 24 (Cibitung MM2100 Exit).'
                : 'Akses cepat dari Tol Jakarta-Cikampek KM 24 (Gerbang Tol Cibitung MM2100).'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Contact Details Grid (5 cols) */}
            <div className="lg:col-span-5 space-y-3.5">
              
              {/* Alamat Fisik */}
              <div
                className={`p-5 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-[#0e121a] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
                    isDark ? 'text-amber-400' : 'text-amber-600 font-semibold'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{t.about.officeAddress}</span>
                </div>
                <div className={`font-bold font-display text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  PT. PRIMA TEKNIK TRADA
                </div>
                <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                  {language === 'en' ? COMPANY_INFO.addressEn : COMPANY_INFO.address}
                </p>
                <div className={`pt-1 text-[11px] font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  MM2100 Industrial Estate, Cikarang Barat, Bekasi 17520
                </div>
              </div>

              {/* Telepon & WhatsApp */}
              <div
                className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-[#0e121a] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
                    isDark ? 'text-amber-400' : 'text-amber-600 font-semibold'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>{language === 'en' ? 'Official Communications' : 'Saluran Komunikasi Resmi'}</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-neutral-400' : 'text-slate-600'}>
                      {language === 'en' ? 'Hunting Phone:' : 'Telepon Hunting:'}
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
                      className={`font-bold ${isDark ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-amber-600'}`}
                    >
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-neutral-400' : 'text-slate-600'}>Fax:</span>
                    <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>{COMPANY_INFO.fax}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-neutral-400' : 'text-slate-600'}>WhatsApp:</span>
                    <a
                      href="https://wa.me/6281288880378"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-500 font-bold hover:underline"
                    >
                      +62 812-8888-0378
                    </a>
                  </div>
                </div>
              </div>

              {/* Email & Website */}
              <div
                className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-[#0e121a] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
                    isDark ? 'text-amber-400' : 'text-amber-600 font-semibold'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>{language === 'en' ? 'Email Inquiries & RFQ' : 'Email Korespondensi & RFQ'}</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-neutral-400' : 'text-slate-600'}>Sales &amp; Inquiry:</span>
                    <a
                      href={`mailto:${COMPANY_INFO.emailPrimary}`}
                      className="text-amber-500 hover:underline font-semibold"
                    >
                      {COMPANY_INFO.emailPrimary}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-neutral-400' : 'text-slate-600'}>Engineering:</span>
                    <a
                      href={`mailto:${COMPANY_INFO.emailSecondary}`}
                      className="text-amber-500 hover:underline font-semibold"
                    >
                      {COMPANY_INFO.emailSecondary}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-neutral-400' : 'text-slate-600'}>
                      {language === 'en' ? 'Official Web:' : 'Situs Resmi:'}
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{COMPANY_INFO.website}</span>
                  </div>
                </div>
              </div>

              {/* Jam Operasional */}
              <div
                className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
                  isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {t.about.operatingHours}:
                  </div>
                  <div className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    {language === 'en'
                      ? 'Monday – Friday: 08:00 – 17:00 WIB · Saturday: 08:00 – 13:00 WIB'
                      : 'Senin – Jumat: 08:00 – 17:00 WIB · Sabtu: 08:00 – 13:00 WIB'}
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Map Visual (7 cols) */}
            <div className="lg:col-span-7">
              <div
                className={`rounded-2xl border overflow-hidden shadow-xl ${
                  isDark ? 'border-neutral-800 bg-[#0e121a]' : 'border-slate-200 bg-white shadow-slate-200'
                }`}
              >
                {/* Map Header Bar */}
                <div
                  className={`p-4 border-b flex items-center justify-between ${
                    isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className={`text-xs font-mono font-semibold ${isDark ? 'text-neutral-300' : 'text-slate-800'}`}>
                      {language === 'en'
                        ? 'Location: MM2100 Industrial Estate, Block C1 No. 17-18'
                        : 'Lokasi: MM2100 Industrial Estate, Blok C1 No. 17-18'}
                    </span>
                  </div>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-amber-500 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <span>{t.about.googleMapsBtn}</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>

                {/* Map Frame / Embedded Visual */}
                <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                  <iframe
                    title="Peta Lokasi PT Prima Teknik Trada MM2100 Cibitung"
                    src="https://maps.google.com/maps?q=Kawasan+Industri+MM2100+Cibitung+Bekasi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className={`w-full h-full border-0 transition-opacity ${
                      isDark
                        ? 'filter invert contrast-125 hue-rotate-180 brightness-95 opacity-85 hover:opacity-100'
                        : 'opacity-95 hover:opacity-100'
                    }`}
                    loading="lazy"
                    allowFullScreen
                  />

                  {/* Overlay Badge for MM2100 */}
                  <div
                    className={`absolute bottom-4 left-4 p-3 rounded-xl border backdrop-blur-md text-xs space-y-1 max-w-xs shadow-xl pointer-events-none ${
                      isDark
                        ? 'bg-[#080a0f]/90 border-neutral-800'
                        : 'bg-white/95 border-slate-200 shadow-slate-300'
                    }`}
                  >
                    <div className={`font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      PT. PRIMA TEKNIK TRADA
                    </div>
                    <div className="text-[11px] text-amber-500 font-mono font-semibold">
                      Jl. Flores 1 Blok C1 No. 17-18, MM2100
                    </div>
                    <div className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                      {language === 'en' ? '10 Mins from Cibitung Toll Gate KM 24' : '10 Menit dari Exit Tol Cibitung KM 24'}
                    </div>
                  </div>
                </div>

                {/* Direct Action Footer */}
                <div
                  className={`p-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
                    isDark ? 'bg-[#080a0f]/80 border-neutral-800 text-neutral-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span>
                    {language === 'en'
                      ? 'Direct 40ft container trailer access to factory loading dock.'
                      : 'Akses kontainer 40ft & truk tronton langsung ke loading dock pabrik.'}
                  </span>
                  <a
                    href="https://wa.me/6281288880378?text=Halo%20PT%20Prima%20Teknik%20Trada,%20saya%20ingin%20menanyakan%20lokasi%20dan%20jadwal%20kunjungan%20ke%20pabrik%20MM2100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t.about.whatsappDirectBtn}</span>
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
