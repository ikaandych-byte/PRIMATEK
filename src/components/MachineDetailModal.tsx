import React from 'react';
import { X, Check, FileText, MessageSquare, Printer, CheckCircle, Cpu, Cog } from 'lucide-react';
import { MachineItem } from '../types';
import { COMPANY_INFO } from '../data/company';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedMachine } from '../utils/localizedData';

interface MachineDetailModalProps {
  machine: MachineItem | null;
  onClose: () => void;
  onAddToRfq: (machine: MachineItem) => void;
  isAddedToRfq: boolean;
  onDirectQuote: (machine: MachineItem) => void;
}

export const MachineDetailModal: React.FC<MachineDetailModalProps> = ({
  machine: rawMachine,
  onClose,
  onAddToRfq,
  isAddedToRfq,
  onDirectQuote,
}) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  if (!rawMachine) return null;

  const machine = getLocalizedMachine(rawMachine, language);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const text =
      language === 'en'
        ? encodeURIComponent(
            `Hello PT. PRIMA TEKNIK TRADA, I am interested in technical details and quotation for:\n*${machine.name}*\nCategory: ${machine.categoryName}\nCapacity: ${machine.capacityOrTonnage}\nTolerance: ${machine.accuracyOrTolerance}\nPlease share availability or technical consultation schedule. Thank you.`
          )
        : encodeURIComponent(
            `Halo PT. PRIMA TEKNIK TRADA, saya tertarik untuk meminta informasi teknis dan penawaran harga untuk mesin:\n*${machine.name}*\nKategori: ${machine.categoryName}\nKapasitas: ${machine.capacityOrTonnage}\nAkurasi: ${machine.accuracyOrTolerance}\nMohon informasi ketersediaan atau jadwal diskusi teknis. Terima kasih.`
          );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-slide">
      <div
        className={`relative rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border ${
          isDark
            ? 'bg-[#0e121a] border-neutral-800 text-neutral-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
      >
        {/* Modal Top Bar */}
        <div
          className={`flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b ${
            isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-amber-500 font-bold">{machine.categoryName}</span>
            <span aria-hidden="true" className={isDark ? 'text-neutral-600' : 'text-slate-400'}>·</span>
            <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>ID: {machine.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark
                ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
            aria-label={t.modal.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          {/* Machine Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div
              className={`md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border ${
                isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <img
                src={machine.image}
                alt={machine.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute bottom-2 left-2 right-2 backdrop-blur-sm px-2.5 py-1.5 rounded-md border flex items-center justify-between text-[11px] font-mono shadow-xs ${
                  isDark ? 'bg-[#080a0f]/90 border-neutral-800 text-neutral-300' : 'bg-white/95 border-slate-200 text-slate-800'
                }`}
              >
                <span>{language === 'en' ? 'Tolerance Rating:' : 'Toleransi Presisi:'}</span>
                <span className="text-amber-500 font-bold">{machine.accuracyOrTolerance}</span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight font-display ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {machine.name}
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                {machine.detailedDesc}
              </p>

              {/* Highlights cards */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                <div
                  className={`p-2.5 rounded-lg border ${
                    isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className={`text-[10px] uppercase font-mono ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>
                    {t.modal.capacityTonnage}
                  </div>
                  <div className={`text-sm font-bold font-mono mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {machine.capacityOrTonnage}
                  </div>
                </div>
                <div
                  className={`p-2.5 rounded-lg border ${
                    isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className={`text-[10px] uppercase font-mono ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>
                    {t.modal.workingEnvelope}
                  </div>
                  <div className="text-sm font-bold text-amber-500 font-mono mt-0.5">
                    {machine.travelOrDimension}
                  </div>
                </div>
              </div>

              {machine.controlSystem && (
                <div className={`flex items-center gap-2 text-xs pt-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                  <Cpu className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-mono">
                    {language === 'en' ? 'Control System: ' : 'Sistem Kontrol: '}
                    {machine.controlSystem}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Key Features & Applications */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
            <div>
              <h3 className={`text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-1.5 ${isDark ? 'text-amber-400' : 'text-amber-600 font-bold'}`}>
                <Cog className="w-3.5 h-3.5" />
                <span>{t.modal.keyFeatures}</span>
              </h3>
              <ul className={`space-y-2 text-xs ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                {machine.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-1.5 ${isDark ? 'text-amber-400' : 'text-amber-600 font-bold'}`}>
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Target Applications' : 'Rekomendasi Aplikasi Komponen'}</span>
              </h3>
              <div
                className={`p-3.5 rounded-xl border text-xs space-y-3 ${
                  isDark ? 'bg-[#080a0f] border-neutral-800 text-neutral-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <p className="leading-relaxed">
                  <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                    {language === 'en' ? 'Suitable for: ' : 'Kesesuaian: '}
                  </strong>
                  {machine.suitableFor}
                </p>
                <div>
                  <div className={`text-[11px] mb-1.5 font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                    {t.modal.applications}:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {machine.industryApplications.map((app, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                          isDark
                            ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                            : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
                        }`}
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Detailed Specification Table */}
          <div className={`pt-4 border-t ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
            <h3 className={`text-xs font-mono uppercase tracking-wider mb-3 ${isDark ? 'text-amber-400' : 'text-amber-600 font-bold'}`}>
              {language === 'en' ? 'Technical Data Sheet' : 'Lembar Spesifikasi Rinci (Technical Data Sheet)'}
            </h3>
            <div
              className={`rounded-xl border overflow-hidden ${
                isDark ? 'border-neutral-800 bg-[#080a0f]' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <table className="w-full text-left text-xs">
                <tbody className={`divide-y ${isDark ? 'divide-neutral-800/80' : 'divide-slate-200'}`}>
                  {machine.specs.map((sp, idx) => (
                    <tr
                      key={idx}
                      className={isDark ? 'hover:bg-white/5' : 'hover:bg-white'}
                    >
                      <td className={`px-4 py-2.5 font-medium w-1/3 font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                        {sp.label}
                      </td>
                      <td
                        className={`px-4 py-2.5 font-mono ${
                          sp.highlight ? 'text-amber-500 font-bold' : isDark ? 'text-neutral-200' : 'text-slate-800'
                        }`}
                      >
                        {sp.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div
          className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-3 ${
            isDark ? 'border-neutral-800 bg-[#080a0f]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer border ${
                isDark
                  ? 'text-neutral-300 hover:text-white bg-neutral-900 border-neutral-800 hover:bg-neutral-800'
                  : 'text-slate-700 hover:text-slate-900 bg-white border-slate-300 hover:bg-slate-100 shadow-2xs'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.modal.printSpec}</span>
            </button>
            <button
              onClick={handleWhatsApp}
              className="px-3 py-2 text-xs font-semibold text-emerald-500 hover:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.modal.sendWaInquiry}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddToRfq(rawMachine)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                isAddedToRfq
                  ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40'
                  : isDark
                    ? 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-2xs'
              }`}
            >
              {isAddedToRfq ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.catalog.inRfq}</span>
                </>
              ) : (
                <span>+ {t.catalog.addToRfq}</span>
              )}
            </button>

            <button
              onClick={() => onDirectQuote(rawMachine)}
              className="px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-500/10 cursor-pointer"
            >
              {language === 'en' ? 'Request RFQ Now →' : 'Minta Penawaran Sekarang →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
