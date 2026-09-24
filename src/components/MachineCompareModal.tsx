import React from 'react';
import { X, Layers, Plus, Check } from 'lucide-react';
import { MachineItem } from '../types';

interface MachineCompareModalProps {
  machines: MachineItem[];
  onClose: () => void;
  onAddToRfq: (machine: MachineItem) => void;
  rfqItemIds: string[];
}

export const MachineCompareModal: React.FC<MachineCompareModalProps> = ({
  machines,
  onClose,
  onAddToRfq,
  rfqItemIds,
}) => {
  if (machines.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-slide">
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display">
              Komparasi Spesifikasi Teknis Mesin ({machines.length} Mesin)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-y-auto p-6 flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-neutral-800">
              <thead>
                <tr>
                  <th scope="col" className="p-3 w-1/4 text-neutral-400 font-mono uppercase bg-neutral-950/60">
                    Parameter Teknis
                  </th>
                  {machines.map((m) => (
                    <th key={m.id} scope="col" className="p-3 w-1/3 bg-neutral-950/40">
                      <div className="space-y-2">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden border border-neutral-800">
                          <img
                            src={m.image}
                            alt={m.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-bold text-white text-sm font-display leading-tight">
                          {m.name}
                        </div>
                        <div className="text-[11px] text-amber-400/90 font-mono">
                          {m.categoryName}
                        </div>
                        <button
                          onClick={() => onAddToRfq(m)}
                          className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                            rfqItemIds.includes(m.id)
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
                          }`}
                        >
                          {rfqItemIds.includes(m.id) ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Di RFQ</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>+ RFQ</span>
                            </>
                          )}
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/30">
                    Kapasitas / Tonase
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className="p-3 text-white font-mono font-medium">
                      {m.capacityOrTonnage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/30">
                    Travel / Dimensi Kerja
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className="p-3 text-white font-mono">
                      {m.travelOrDimension}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/30">
                    Akurasi &amp; Toleransi
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className="p-3 text-amber-300 font-mono font-bold">
                      {m.accuracyOrTolerance}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/30">
                    Tipe Proses
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className="p-3 text-neutral-200">
                      {m.processType}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/30">
                    Sistem Kontrol
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className="p-3 text-neutral-300 font-mono">
                      {m.controlSystem || 'Sistem Elektropneumatik Mekanis'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/30">
                    Kesesuaian Aplikasi
                  </td>
                  {machines.map((m) => (
                    <td key={m.id} className="p-3 text-neutral-300 leading-relaxed">
                      {m.suitableFor}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 rounded-lg transition-colors"
          >
            Tutup Komparasi
          </button>
        </div>

      </div>
    </div>
  );
};
