import React from 'react';
import { COMPANY_INFO } from '../data/company';
import { MapPin, Phone, Mail, Globe, ArrowUp } from 'lucide-react';
import { AppPage } from './Navbar';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onSelectPage: (page: AppPage) => void;
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage, onOpenRfq }) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: AppPage) => {
    onSelectPage(page);
    scrollToTop();
  };

  return (
    <footer
      className={`border-t text-xs transition-colors duration-300 ${
        isDark
          ? 'bg-[#06080c] border-neutral-800/90 text-neutral-400'
          : 'bg-[#0b0f19] border-slate-800 text-slate-300'
      }`}
    >
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#0c0e14] border-2 border-amber-500/85 flex items-center justify-center font-display font-black text-amber-500 text-sm tracking-wide shadow-md shrink-0">
                PTT
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base text-white tracking-tight leading-tight">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-neutral-400 font-semibold mt-0.5">
                  SYSTEM INTEGRATOR &amp; AUTOMATION
                </span>
              </div>
            </div>
            
            <p className="text-neutral-400 leading-relaxed text-xs max-w-sm">
              {language === 'en'
                ? 'Your reliable sourcing for Customized Machine & Automation Systems, Precision Parts, Jig & Fixtures, Dies & Molds, and Mass Production. Serving tier-1 automotive and global manufacturers since 1999 from MM2100 Cibitung, Indonesia.'
                : 'Your reliable sourcing for Customized Machine & Automation System – Precision Parts, Jig & Fixture – Dies & Molds – Parts Mass Production. Beroperasi sejak 1999 di MM2100 Cibitung, Indonesia.'}
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-neutral-300 font-mono text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{language === 'en' ? COMPANY_INFO.addressEn : COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Tel: {COMPANY_INFO.phoneDisplay} · Fax: {COMPANY_INFO.fax}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.emailPrimary} · {COMPANY_INFO.emailSecondary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.website}</span>
              </div>
            </div>
          </div>

          {/* Nav Links Column 1: Catalog */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold font-display tracking-tight text-sm">
              {language === 'en' ? 'Catalog & Specs' : 'Katalog & Spesifikasi'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handlePageClick('katalog')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Automation &amp; Custom Machines
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('katalog')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {language === 'en' ? 'Precision Jig & Fixture' : 'Jig & Fixture Presisi'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('katalog')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {language === 'en' ? 'Stamping Dies & Moulds' : 'Dies & Moulds Stamping'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('katalog')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {language === 'en' ? 'Mass Production Parts' : 'Parts Mass Production'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('katalog')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {language === 'en' ? 'Technical Machine Specs' : 'Spesifikasi Teknis Mesin'}
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2: Company */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold font-display tracking-tight text-sm">
              {language === 'en' ? 'Company & Plant' : 'Perusahaan & Pabrik'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handlePageClick('tentang')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {language === 'en' ? 'Profile & History Since 1999' : 'Profil & Sejarah Sejak 1999'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('fasilitas')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {language === 'en' ? 'MM2100 Cibitung Plant Facilities' : 'Fasilitas Pabrik MM2100 Cibitung'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('beranda')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {language === 'en' ? 'Automotive Clients & Robotics Partners' : 'Klien Otomotif & Mitra Robotik'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('tentang')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {language === 'en' ? 'Contact, Location & Plant Map' : 'Kontak, Lokasi & Peta Pabrik'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRfq}
                  className="text-amber-400 font-semibold hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Request for Quotation (RFQ)' : 'Permintaan Penawaran (RFQ)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 3: Quality Credentials */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold font-display tracking-tight text-sm">
              {language === 'en' ? 'Quality Standards' : 'Standarisasi Mutu'}
            </h4>
            <div className="p-3.5 rounded-xl bg-black/40 border border-neutral-800 space-y-2 text-xs">
              <div className="text-white font-bold font-display">ISO 9001:2015</div>
              <div className="text-[11px] text-neutral-400 font-mono">
                {language === 'en' ? 'Certificate No: ' : 'No. Sertifikat: '}MD/PTT954
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">
                {language === 'en' ? 'Accreditation: ' : 'Akreditasi: '}IDCAB MANDALA
              </div>
              <div className="pt-1 text-[11px] text-neutral-400 font-mono">
                NIB: {COMPANY_INFO.nib}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. {language === 'en' ? 'All Rights Reserved.' : 'Hak Cipta Dilindungi Undang-Undang.'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title={language === 'en' ? 'Back to top' : 'Kembali ke atas'}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
