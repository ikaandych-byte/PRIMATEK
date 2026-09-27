import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'full';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'icon', className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';

  const titleText = isDark
    ? language === 'en'
      ? 'Switch to Light Mode'
      : 'Beralih ke Mode Terang'
    : language === 'en'
      ? 'Switch to Dark Mode'
      : 'Beralih ke Mode Gelap';

  if (variant === 'full') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
          isDark
            ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
        } ${className}`}
        aria-label={titleText}
      >
        <div className="flex items-center gap-2">
          {isDark ? (
            <Moon className="w-4 h-4 text-amber-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-600" />
          )}
          <span>
            {isDark
              ? language === 'en'
                ? 'Dark Mode (Active)'
                : 'Mode Gelap (Aktif)'
              : language === 'en'
                ? 'Light Mode (Active)'
                : 'Mode Terang (Aktif)'}
          </span>
        </div>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
            isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-white text-slate-600 shadow-xs'
          }`}
        >
          {isDark
            ? language === 'en'
              ? 'Click for Light'
              : 'Klik untuk Terang'
            : language === 'en'
              ? 'Click for Dark'
              : 'Klik untuk Gelap'}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
        isDark
          ? 'bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-800'
          : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-amber-600 border border-slate-200 shadow-xs'
      } ${className}`}
      title={titleText}
      aria-label={titleText}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
};
