import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { PrimatechLogo } from './PrimatechLogo';

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
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

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
          {/* Brand Logo & Wordmark - Official Primatech PT. Prima Teknik Trada Identity */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="group flex items-center text-left focus:outline-none cursor-pointer shrink-0 py-0.5"
            aria-label="PT. Prima Teknik Trada Home"
          >
            <PrimatechLogo className="h-9 sm:h-11 w-auto max-w-[170px] sm:max-w-[210px] transition-transform duration-200 group-hover:scale-102" />
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
            {/* LOGIN / LOGOUT Button for Desktop & Tablet */}
            {!isAuthenticated ? (
              <button
                onClick={() => openAuthModal('login')}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap border cursor-pointer ${
                  isDark
                    ? 'text-amber-300 hover:text-neutral-950 bg-amber-400/10 hover:bg-amber-400 border-amber-400/30 hover:border-amber-400 shadow-xs'
                    : 'text-amber-800 hover:text-neutral-950 bg-amber-50 hover:bg-amber-400 border-amber-300 hover:border-amber-400 shadow-2xs'
                }`}
                title={language === 'en' ? 'Client Portal Login' : 'Login Portal Klien'}
              >
                <LogIn className="w-3.5 h-3.5 text-amber-500 group-hover:text-neutral-950" />
                <span>LOGIN</span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap border cursor-pointer ${
                  isDark
                    ? 'text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 border-rose-500/30 hover:border-rose-600 shadow-xs'
                    : 'text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 border-rose-200 hover:border-rose-600 shadow-2xs'
                }`}
                title={language === 'en' ? 'Click to view profile or Logout' : 'Klik untuk kelola akun atau Logout'}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="max-w-[90px] truncate">{user?.name.split(' ')[0]}</span>
                <span className="opacity-40">/</span>
                <LogOut className="w-3.5 h-3.5" />
                <span>LOGOUT</span>
              </button>
            )}

            {/* Language Switcher (EN | ID) */}
            <LanguageToggle />

            {/* Dark Mode / Light Mode Toggle Button */}
            <ThemeToggle />

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
                {!isAuthenticated ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      isDark
                        ? 'text-amber-300 bg-amber-400/15 hover:bg-amber-400 hover:text-neutral-950 border-amber-400/40'
                        : 'text-amber-800 bg-amber-50 hover:bg-amber-400 hover:text-neutral-950 border-amber-300'
                    }`}
                  >
                    <LogIn className="w-4 h-4 text-amber-500" />
                    <span>LOGIN / SIGN UP</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal();
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs flex items-center justify-between border cursor-pointer ${
                        isDark
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-200'
                          : 'bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-bold truncate">{user?.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-500 truncate max-w-[120px]">
                        {user?.company.replace('PT. ', '')}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl text-white bg-rose-600 hover:bg-rose-500 transition-all cursor-pointer shadow-md shadow-rose-600/20"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>LOGOUT</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
