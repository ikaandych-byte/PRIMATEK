import React from 'react';
import { MILESTONES, COMPANY_INFO } from '../data/company';
import { Award, ShieldCheck, MapPin, Users, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface CompanyMilestonesProps {
  onOpenRfq: () => void;
}

export const CompanyMilestones: React.FC<CompanyMilestonesProps> = ({ onOpenRfq }) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <section id="tentang" className="py-14 sm:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-3 border ${
              isDark
                ? 'bg-amber-400/10 border-amber-400/25 text-amber-400'
                : 'bg-amber-50 border-amber-300 text-amber-700'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Track Record Since 1999' : 'Rekam Jejak Sejak 1999'}</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.about.milestonesTitle}
          </h2>
          <p className={`mt-2 text-xs sm:text-sm md:text-base ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
            {t.about.milestonesSubtitle}
          </p>
        </div>

        {/* Company Quick Credentials Cards - 1 col on HP, 2 cols on Tablet, 4 cols on PC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-14 sm:mb-16">
          <div
            className={`p-5 rounded-2xl border space-y-2 ${
              isDark
                ? 'bg-[#0e121a] border-neutral-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className={`flex items-center justify-between text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              <span>{t.about.statIsoCert}</span>
              <ShieldCheck className="w-4 h-4 text-amber-500" />
            </div>
            <div className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>ISO 9001:2015</div>
            <div className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Cert No: MD/PTT954 (IDCAB)</div>
          </div>

          <div
            className={`p-5 rounded-2xl border space-y-2 ${
              isDark
                ? 'bg-[#0e121a] border-neutral-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className={`flex items-center justify-between text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              <span>{language === 'en' ? 'Legal Entity (NIB)' : 'Legalitas Perusahaan'}</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {language === 'en' ? 'Registered NIB' : 'NIB Terdaftar'}
            </div>
            <div className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>NIB: {COMPANY_INFO.nib}</div>
          </div>

          <div
            className={`p-5 rounded-2xl border space-y-2 ${
              isDark
                ? 'bg-[#0e121a] border-neutral-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className={`flex items-center justify-between text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              <span>{t.about.statArea}</span>
              <MapPin className="w-4 h-4 text-amber-500" />
            </div>
            <div className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>MM2100 Cibitung</div>
            <div className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              {language === 'en' ? 'Land: 2,806 m² / Floor: 2,400 m²' : 'Tanah: 2.806 m² / Bangunan: 2.400 m²'}
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border space-y-2 ${
              isDark
                ? 'bg-[#0e121a] border-neutral-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className={`flex items-center justify-between text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              <span>{t.about.statWorkforce}</span>
              <Users className="w-4 h-4 text-amber-500" />
            </div>
            <div className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {language === 'en' ? '90 Personnel' : '90 Personil'}
            </div>
            <div className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              {language === 'en' ? 'Certified Engineers & Toolmakers' : 'Operator & Engineer Bersertifikasi'}
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div
          className={`relative border-l ml-3 sm:ml-28 space-y-8 sm:space-y-10 ${
            isDark ? 'border-neutral-800' : 'border-slate-300'
          }`}
        >
          {MILESTONES.map((item) => (
            <div key={item.year} className="relative pl-6 sm:pl-8 group">
              {/* Year Pill on Left for desktop */}
              <div
                className={`hidden sm:block absolute -left-28 top-0.5 text-right font-display font-black text-lg transition-colors font-mono ${
                  isDark ? 'text-amber-400 group-hover:text-amber-300' : 'text-amber-600 group-hover:text-amber-700'
                }`}
              >
                {item.year}
              </div>

              {/* Marker Dot */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all shadow-xs ${
                  isDark
                    ? 'bg-[#080a0f] border-amber-400 group-hover:bg-amber-400'
                    : 'bg-white border-amber-500 group-hover:bg-amber-500'
                }`}
              />

              {/* Content Box */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#0e121a] border-neutral-800 group-hover:border-neutral-700'
                    : 'bg-white border-slate-200 shadow-sm group-hover:border-slate-300'
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span
                    className={`sm:hidden font-mono font-bold text-sm ${
                      isDark ? 'text-amber-400' : 'text-amber-600'
                    }`}
                  >
                    {item.year} —
                  </span>
                  <h3 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'en' ? item.titleEn || item.title : item.title}
                  </h3>
                  <span className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                    ({language === 'en' ? item.subEn || item.sub : item.sub})
                  </span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                  {language === 'en' ? item.descEn || item.desc : item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout banner */}
        <div
          className={`mt-14 sm:mt-16 p-6 sm:p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 shadow-md ${
            isDark
              ? 'bg-gradient-to-r from-[#0e121a] via-[#121622] to-amber-950/20 border-neutral-800'
              : 'bg-gradient-to-r from-white via-slate-50 to-amber-50/50 border-slate-200'
          }`}
        >
          <div className="space-y-1 text-center md:text-left">
            <h3 className={`text-base sm:text-lg font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {language === 'en'
                ? 'Schedule a Factory Audit & Technical Visit?'
                : 'Ingin Menjadwalkan Factory Audit & Kunjungan Fasilitas?'}
            </h3>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
              {language === 'en'
                ? 'We warmly welcome engineering and procurement delegations to our MM2100 Cibitung facility.'
                : 'Kami menyambut hangat tim engineering dan purchasing Anda di Kawasan Industri MM2100 Cibitung, Bekasi.'}
            </p>
          </div>
          <button
            onClick={onOpenRfq}
            className="px-6 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>{language === 'en' ? 'Request Schedule & RFQ' : 'Ajukan Jadwal & Penawaran'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
