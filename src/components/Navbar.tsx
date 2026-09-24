import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export type AppPage = 'beranda' | 'katalog' | 'fasilitas' | 'tentang';

interface NavbarProps {
  activePage: AppPage;
  rfqCount: number;
  onSelectPage: (page: AppPage) => void;
  onOpenRfqModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  rfqCount,
  onSelectPage,
  onOpenRfqModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: AppPage }[] = [
    { label: 'Beranda', page: 'beranda' },
    { label: 'Katalog Mesin', page: 'katalog' },
    { label: 'Fasilitas Pabrik', page: 'fasilitas' },
    { label: 'Tentang Kami', page: 'tentang' },
  ];

  const handleNavClick = (page: AppPage) => {
    setMobileMenuOpen(false);
    onSelectPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-neutral-950/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-display font-black text-amber-500 text-sm tracking-wider group-hover:border-amber-400 transition-colors">
              PTT
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
              PT. PRIMA TEKNIK TRADA
            </span>
          </button>

          {/* Clean 4-Item Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`transition-colors cursor-pointer text-left whitespace-nowrap focus:outline-none relative py-1 ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Direct Phone / Contact quick action for desktop */}
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap"
              title="Hubungi Kantor MM2100"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>(021) 8980378</span>
            </a>

            {/* Primary RFQ Action */}
            <button
              onClick={onOpenRfqModal}
              className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-lg transition-all shadow-md shadow-amber-500/10 whitespace-nowrap focus:outline-none cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Minta Penawaran (RFQ)</span>
              {rfqCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] font-bold text-white bg-neutral-950 rounded-full">
                  {rfqCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-neutral-800/80 bg-neutral-950/98 rounded-2xl p-4 shadow-xl backdrop-blur-xl animate-fade-slide">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activePage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-400/15 text-amber-300 font-semibold border border-amber-400/30'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-neutral-800/80 flex flex-col gap-2">
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-lg"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Telepon: +62 21 8980378</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
