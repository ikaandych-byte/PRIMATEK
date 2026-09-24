import React from 'react';
import { X, Check, FileText, MessageSquare, Printer, CheckCircle, Cpu, Cog } from 'lucide-react';
import { MachineItem } from '../types';
import { COMPANY_INFO } from '../data/company';

interface MachineDetailModalProps {
  machine: MachineItem | null;
  onClose: () => void;
  onAddToRfq: (machine: MachineItem) => void;
  isAddedToRfq: boolean;
  onDirectQuote: (machine: MachineItem) => void;
}

export const MachineDetailModal: React.FC<MachineDetailModalProps> = ({
  machine,
  onClose,
  onAddToRfq,
  isAddedToRfq,
  onDirectQuote,
}) => {
  if (!machine) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo PT. PRIMA TEKNIK TRADA, saya tertarik untuk meminta informasi teknis dan penawaran harga untuk mesin:\n*${machine.name}*\nKategori: ${machine.categoryName}\nKapasitas: ${machine.capacityOrTonnage}\nAkurasi: ${machine.accuracyOrTolerance}\nMohon informasi ketersediaan atau jadwal diskusi teknis. Terima kasih.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-slide">
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/50">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-amber-400 font-semibold">{machine.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>ID: {machine.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Tutup Detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Machine Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
              <img
                src={machine.image}
                alt={machine.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-neutral-950/90 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                <span>Toleransi Presisi:</span>
                <span className="text-amber-400 font-bold">{machine.accuracyOrTolerance}</span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                {machine.name}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {machine.detailedDesc}
              </p>

              {/* Highlights pills */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800">
                  <div className="text-[10px] text-neutral-500 uppercase font-mono">Tonase / Kapasitas</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">{machine.capacityOrTonnage}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800">
                  <div className="text-[10px] text-neutral-500 uppercase font-mono">Travel / Dimensi</div>
                  <div className="text-sm font-bold text-amber-300 font-mono mt-0.5">{machine.travelOrDimension}</div>
                </div>
              </div>

              {machine.controlSystem && (
                <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono text-neutral-300">Sistem Kontrol: {machine.controlSystem}</span>
                </div>
              )}
            </div>
          </div>

          {/* Key Features & Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                <Cog className="w-3.5 h-3.5" />
                <span>Fitur Keunggulan Teknis</span>
              </h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                {machine.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Rekomendasi Aplikasi Komponen</span>
              </h3>
              <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs text-neutral-300 space-y-3">
                <p className="leading-relaxed">
                  <strong className="text-white font-semibold">Kesesuaian: </strong>
                  {machine.suitableFor}
                </p>
                <div>
                  <div className="text-[11px] text-neutral-400 mb-1.5 font-mono">Sektor Industri:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {machine.industryApplications.map((app, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-mono"
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
          <div className="pt-4 border-t border-neutral-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-3">
              Lembar Spesifikasi Rinci (Technical Data Sheet)
            </h3>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 overflow-hidden">
              <table className="w-full text-left text-xs divide-y divide-neutral-800">
                <tbody className="divide-y divide-neutral-800/60">
                  {machine.specs.map((sp, idx) => (
                    <tr key={idx} className="hover:bg-neutral-900/40">
                      <td className="px-4 py-2.5 font-medium text-neutral-400 w-1/3 font-mono">
                        {sp.label}
                      </td>
                      <td
                        className={`px-4 py-2.5 font-mono ${
                          sp.highlight ? 'text-amber-300 font-semibold' : 'text-neutral-200'
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
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak Dokumen</span>
            </button>
            <button
              onClick={handleWhatsApp}
              className="px-3 py-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Tanya WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddToRfq(machine)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                isAddedToRfq
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
              }`}
            >
              {isAddedToRfq ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Tersimpan di RFQ</span>
                </>
              ) : (
                <span>+ Simpan ke Keranjang RFQ</span>
              )}
            </button>

            <button
              onClick={() => onDirectQuote(machine)}
              className="px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-500/10"
            >
              Minta Penawaran Sekarang &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
