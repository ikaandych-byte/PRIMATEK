import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface LanguageToggleProps {
  variant?: 'pill' | 'full';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'pill',
  className = '',
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'full') {
    return (
      <div
        className={`w-full p-1.5 rounded-xl border flex items-center justify-between gap-1 transition-all ${
          isDark
            ? 'bg-neutral-900 border-neutral-800'
            : 'bg-slate-100 border-slate-200'
        } ${className}`}
      >
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            language === 'en'
              ? isDark
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                : 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
              : isDark
                ? 'text-neutral-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          <span className="font-mono text-[11px] font-bold">EN</span>
          <span>English</span>
        </button>

        <button
          type="button"
          onClick={() => setLanguage('id')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            language === 'id'
              ? isDark
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                : 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
              : isDark
                ? 'text-neutral-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          <span className="font-mono text-[11px] font-bold">ID</span>
          <span>Indonesia</span>
        </button>
      </div>
    );
  }

  // Pill variant for Desktop & Tablet Navbar
  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-lg border text-xs transition-all ${
        isDark
          ? 'bg-neutral-900/90 border-neutral-800'
          : 'bg-white border-slate-200 shadow-xs'
      } ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer ${
          language === 'en'
            ? isDark
              ? 'bg-amber-400/25 text-amber-300 border border-amber-400/40 shadow-xs'
              : 'bg-amber-400 text-neutral-950 shadow-xs'
            : isDark
              ? 'text-neutral-400 hover:text-neutral-200'
              : 'text-slate-500 hover:text-slate-900'
        }`}
        title="Switch to English"
        aria-label="Switch to English"
      >
        <Globe className="w-3 h-3" />
        <span>EN</span>
      </button>

      <span
        aria-hidden="true"
        className={`px-0.5 text-[10px] select-none ${
          isDark ? 'text-neutral-700' : 'text-slate-300'
        }`}
      >
        |
      </span>

      <button
        type="button"
        onClick={() => setLanguage('id')}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer ${
          language === 'id'
            ? isDark
              ? 'bg-amber-400/25 text-amber-300 border border-amber-400/40 shadow-xs'
              : 'bg-amber-400 text-neutral-950 shadow-xs'
            : isDark
              ? 'text-neutral-400 hover:text-neutral-200'
              : 'text-slate-500 hover:text-slate-900'
        }`}
        title="Beralih ke Bahasa Indonesia"
        aria-label="Beralih ke Bahasa Indonesia"
      >
        <span>ID</span>
      </button>
    </div>
  );
};
