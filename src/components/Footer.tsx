import React from 'react';
import { COMPANY_INFO } from '../data/company';
import { MapPin, Phone, Mail, Globe, ArrowUp } from 'lucide-react';
import { AppPage } from './Navbar';

interface FooterProps {
  onSelectPage: (page: AppPage) => void;
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage, onOpenRfq }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: AppPage) => {
    onSelectPage(page);
    scrollToTop();
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-display font-black text-amber-500 text-sm">
                PTT
              </div>
              <span className="font-display font-bold text-base text-white tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>
            
            <p className="text-neutral-400 leading-relaxed text-xs max-w-sm">
              Your reliable sourcing for Customized Machine &amp; Automation System – Precision Parts, Jig &amp; Fixture – Dies &amp; Molds – Parts Mass Production. Beroperasi sejak 1999 di MM2100 Cibitung, Indonesia.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-neutral-300 font-mono text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
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
                <span>{COMPANY_INFO.website} ({COMPANY_INFO.websiteAlias})</span>
              </div>
            </div>
          </div>

          {/* Nav Links Column 1: Katalog */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold font-display tracking-tight text-sm">
              Katalog &amp; Spesifikasi
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
                  Jig &amp; Fixture Presisi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('katalog')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Dies &amp; Moulds Stamping
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('katalog')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Parts Mass Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('katalog')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Spesifikasi Teknis Mesin
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2: Perusahaan */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold font-display tracking-tight text-sm">
              Perusahaan &amp; Pabrik
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handlePageClick('tentang')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Profil &amp; Sejarah Sejak 1999
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('fasilitas')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Fasilitas Pabrik MM2100 Cibitung
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('beranda')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Klien Otomotif &amp; Mitra Robotik
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('tentang')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Kontak, Lokasi &amp; Peta Pabrik
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRfq}
                  className="text-amber-400 font-semibold hover:underline cursor-pointer"
                >
                  Permintaan Penawaran (RFQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 3: Legal & Credentials */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold font-display tracking-tight text-sm">
              Standarisasi Mutu
            </h4>
            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 text-xs">
              <div className="text-white font-bold font-display">ISO 9001:2015</div>
              <div className="text-[11px] text-neutral-400 font-mono">
                No. Sertifikat: MD/PTT954
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">
                Akreditasi: IDCAB MANDALA
              </div>
              <div className="pt-1 text-[11px] text-neutral-400 font-mono">
                NIB: {COMPANY_INFO.nib}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <span>Situs Resmi: www.ptt-id.com / www.pttid.com</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
