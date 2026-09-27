import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

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
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: AppPage }[] = [
    { label: t.nav.home, page: 'beranda' },
    { label: t.nav.catalog, page: 'katalog' },
    { label: t.nav.facilities, page: 'fasilitas' },
    { label: t.nav.about, page: 'tentang' },
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
          ? isDark
            ? 'bg-[#080a0f]/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3 sm:py-3.5'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-md py-3 sm:py-3.5'
          : isDark
            ? 'bg-gradient-to-b from-[#080a0f]/95 via-[#080a0f]/60 to-transparent py-4 sm:py-5'
            : 'bg-gradient-to-b from-white/95 via-white/60 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Wordmark - Responsive sizing for Mobile, Tablet, PC */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="group flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-display font-black text-amber-500 text-xs sm:text-sm tracking-wider group-hover:border-amber-400 transition-colors shadow-xs">
              PTT
            </div>
            <div className="flex flex-col">
              <span
                className={`font-display font-bold text-sm sm:text-base lg:text-lg tracking-tight transition-colors whitespace-nowrap ${
                  isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
                }`}
              >
                <span className="hidden sm:inline">PT. PRIMA TEKNIK TRADA</span>
                <span className="sm:hidden font-extrabold tracking-tight">PT. PRIMA TEKNIK TRADA</span>
              </span>
              <span
                className={`hidden md:block text-[9px] font-mono tracking-wider uppercase -mt-0.5 ${
                  isDark ? 'text-neutral-400' : 'text-slate-500'
                }`}
              >
                Precision Machinery &amp; Automation
              </span>
            </div>
          </button>

          {/* Clean 4-Item Navigation Menu for PC & Tablet (Large) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`transition-colors cursor-pointer text-left whitespace-nowrap focus:outline-none relative py-1 ${
                    isActive
                      ? isDark
                        ? 'text-amber-400 font-semibold'
                        : 'text-amber-600 font-bold'
                      : isDark
                        ? 'text-neutral-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-950 font-medium'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isDark ? 'bg-amber-400' : 'bg-amber-600'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Phone + Language Switcher + Dark/Light Toggle + RFQ + Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Direct Phone / Contact for Tablet and PC */}
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap border ${
                isDark
                  ? 'text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800'
                  : 'text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border-slate-200'
              }`}
              title={language === 'en' ? 'Call MM2100 Office' : 'Hubungi Kantor MM2100'}
            >
              <PhoneCall className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              <span>(021) 8980378</span>
            </a>

            {/* Language Switcher (EN | ID) */}
            <LanguageToggle />

            {/* Dark Mode / Light Mode Toggle Button */}
            <ThemeToggle />

            {/* Primary RFQ Action */}
            <button
              onClick={onOpenRfqModal}
              className={`relative inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 text-xs font-bold rounded-lg transition-all shadow-md active:scale-98 whitespace-nowrap focus:outline-none cursor-pointer ${
                isDark
                  ? 'text-neutral-950 bg-amber-400 hover:bg-amber-300 shadow-amber-500/15'
                  : 'text-neutral-950 bg-amber-400 hover:bg-amber-300 shadow-amber-500/20'
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{t.nav.rfq}</span>
              <span className="sm:hidden">{t.nav.rfqShort}</span>
              {rfqCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-extrabold text-white bg-neutral-950 rounded-full">
                  {rfqCount}
                </span>
              )}
            </button>

            {/* Mobile / Tablet Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'text-neutral-300 hover:text-white hover:bg-neutral-900 border-neutral-800'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 border-slate-200'
              }`}
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.menu}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden mt-3 pt-3 pb-4 border rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-fade-slide ${
              isDark
                ? 'bg-[#0b0e14]/98 border-neutral-800/90 text-white'
                : 'bg-white/98 border-slate-200 text-slate-900 shadow-slate-300/40'
            }`}
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activePage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? isDark
                          ? 'bg-amber-400/15 text-amber-300 font-bold border border-amber-400/30'
                          : 'bg-amber-50 text-amber-700 font-bold border border-amber-300'
                        : isDark
                          ? 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              {/* Language Switcher for Mobile Drawer */}
              <div className="pt-2">
                <LanguageToggle variant="full" />
              </div>

              {/* Full Width Theme Toggle for Mobile Drawer */}
              <div>
                <ThemeToggle variant="full" />
              </div>

              <div
                className={`pt-2 border-t flex flex-col gap-2 ${
                  isDark ? 'border-neutral-800/80' : 'border-slate-200'
                }`}
              >
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border ${
                    isDark
                      ? 'text-neutral-200 bg-neutral-900/90 border-neutral-800'
                      : 'text-slate-800 bg-slate-100 border-slate-200'
                  }`}
                >
                  <PhoneCall className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  <span>
                    {language === 'en' ? 'Call Office: ' : 'Hubungi Kantor: '}
                    {COMPANY_INFO.phone}
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
