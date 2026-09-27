import React from 'react';
import { X, Layers, Plus, Check } from 'lucide-react';
import { MachineItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedMachine } from '../utils/localizedData';

interface MachineCompareModalProps {
  machines: MachineItem[];
  onClose: () => void;
  onAddToRfq: (machine: MachineItem) => void;
  rfqItemIds: string[];
}

export const MachineCompareModal: React.FC<MachineCompareModalProps> = ({
  machines: rawMachines,
  onClose,
  onAddToRfq,
  rfqItemIds,
}) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  if (rawMachines.length === 0) return null;

  const machines = rawMachines.map((m) => getLocalizedMachine(m, language));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-slide">
      <div
        className={`relative rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border ${
          isDark
            ? 'bg-[#0e121a] border-neutral-800 text-neutral-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
      >
        {/* Top Header */}
        <div
          className={`flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b ${
            isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <h2 className={`text-sm sm:text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.modal.compareTitle} ({machines.length} {language === 'en' ? 'Machines' : 'Mesin'})
            </h2>
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

        {/* Comparison Table */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs min-w-[500px]">
              <thead>
                <tr className={isDark ? 'border-b border-neutral-800' : 'border-b border-slate-200'}>
                  <th
                    scope="col"
                    className={`p-3 w-1/4 font-mono uppercase text-[11px] ${
                      isDark ? 'text-neutral-400 bg-neutral-900/50' : 'text-slate-500 bg-slate-100/70'
                    }`}
                  >
                    {t.modal.specMetric}
                  </th>
                  {machines.map((m, idx) => {
                    const rawM = rawMachines[idx];
                    return (
                      <th
                        key={m.id}
                        scope="col"
                        className={`p-3 w-1/3 ${
                          isDark ? 'bg-neutral-950/40' : 'bg-slate-50/50'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className={`aspect-[4/3] rounded-lg overflow-hidden border ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                            <img
                              src={m.image}
                              alt={m.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className={`font-bold text-xs sm:text-sm font-display leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {m.name}
                          </div>
                          <div className="text-[11px] text-amber-500 font-mono font-semibold">
                            {m.categoryName}
                          </div>
                          <button
                            onClick={() => onAddToRfq(rawM)}
                            className={`w-full py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                              rfqItemIds.includes(m.id)
                                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                                : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-xs'
                            }`}
                          >
                            {rfqItemIds.includes(m.id) ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>{t.catalog.inRfq}</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>+ {t.catalog.addToRfq}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-neutral-800' : 'divide-slate-200'}`}>
                <tr>
                  <td className={`p-3 font-semibold ${isDark ? 'text-neutral-400 bg-neutral-900/30' : 'text-slate-500 bg-slate-50'}`}>
                    {t.modal.capacityTonnage}
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className={`p-3 font-mono font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {m.capacityOrTonnage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className={`p-3 font-semibold ${isDark ? 'text-neutral-400 bg-neutral-900/30' : 'text-slate-500 bg-slate-50'}`}>
                    {t.modal.workingEnvelope}
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className={`p-3 font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {m.travelOrDimension}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className={`p-3 font-semibold ${isDark ? 'text-neutral-400 bg-neutral-900/30' : 'text-slate-500 bg-slate-50'}`}>
                    {t.modal.accuracyTolerance}
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className="p-3 text-amber-500 font-mono font-bold">
                      {m.accuracyOrTolerance}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className={`p-3 font-semibold ${isDark ? 'text-neutral-400 bg-neutral-900/30' : 'text-slate-500 bg-slate-50'}`}>
                    {t.modal.processType}
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className={`p-3 ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>
                      {m.processType}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className={`p-3 font-semibold ${isDark ? 'text-neutral-400 bg-neutral-900/30' : 'text-slate-500 bg-slate-50'}`}>
                    {language === 'en' ? 'Control System' : 'Sistem Kontrol'}
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className={`p-3 font-mono ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                      {m.controlSystem || (language === 'en' ? 'Pneumatic / Mechanical System' : 'Sistem Elektropneumatik Mekanis')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className={`p-3 font-semibold ${isDark ? 'text-neutral-400 bg-neutral-900/30' : 'text-slate-500 bg-slate-50'}`}>
                    {t.modal.suitableFor}
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className={`p-3 leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                      {m.suitableFor}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t flex items-center justify-end ${
            isDark ? 'border-neutral-800 bg-[#080a0f]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <button
            onClick={onClose}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
              isDark
                ? 'text-neutral-300 hover:text-white bg-neutral-800 border-neutral-700'
                : 'text-slate-700 hover:text-slate-900 bg-white border-slate-300 shadow-2xs'
            }`}
          >
            {t.modal.close}
          </button>
        </div>

      </div>
    </div>
  );
};
