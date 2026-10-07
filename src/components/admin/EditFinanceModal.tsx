import React, { useState } from 'react';
import {
  X,
  DollarSign,
  TrendingUp,
  Receipt,
  FileSpreadsheet,
  Building,
  CheckCircle2,
  Clock,
  Save,
  HelpCircle,
} from 'lucide-react';
import { ProjectItem, ProjectFinancialItem } from '../../types/backend';
import { useTheme } from '../../context/ThemeContext';
import { getProjectFinancialDetails } from '../../utils/financeUtils';

interface EditFinanceModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSave: (projectId: string, financial: ProjectFinancialItem) => void;
}

export const EditFinanceModal: React.FC<EditFinanceModalProps> = ({
  project,
  onClose,
  onSave,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!project) return null;

  const currentFin = getProjectFinancialDetails(project);

  // Form states
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(currentFin.downPaymentPercent);
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(currentFin.downPaymentAmount);
  const [downPaymentStatus, setDownPaymentStatus] = useState<'Received' | 'Pending' | 'Overdue'>(
    currentFin.downPaymentStatus
  );
  const [downPaymentDate, setDownPaymentDate] = useState<string>(
    currentFin.downPaymentDate || new Date().toISOString().split('T')[0]
  );

  const [finalPaymentPercent, setFinalPaymentPercent] = useState<number>(currentFin.finalPaymentPercent);
  const [finalPaymentAmount, setFinalPaymentAmount] = useState<number>(currentFin.finalPaymentAmount);
  const [finalPaymentStatus, setFinalPaymentStatus] = useState<'Received' | 'Pending' | 'Not Invoiced'>(
    currentFin.finalPaymentStatus
  );
  const [finalPaymentDate, setFinalPaymentDate] = useState<string>(
    currentFin.finalPaymentDate || project.targetCompletionDate
  );

  // Cost outflow states
  const [materialCost, setMaterialCost] = useState<number>(currentFin.materialCost);
  const [machiningCost, setMachiningCost] = useState<number>(currentFin.machiningCost);
  const [subconCost, setSubconCost] = useState<number>(currentFin.subconCost);
  const [assemblyLaborCost, setAssemblyLaborCost] = useState<number>(currentFin.assemblyLaborCost);
  const [logisticsCost, setLogisticsCost] = useState<number>(currentFin.logisticsCost);
  const [otherCost, setOtherCost] = useState<number>(currentFin.otherCost);

  // Tax states
  const [taxPpnPercent, setTaxPpnPercent] = useState<number>(currentFin.taxPpnPercent);
  const [taxPph23Percent, setTaxPph23Percent] = useState<number>(currentFin.taxPph23Percent);
  const [fakturPajakNumber, setFakturPajakNumber] = useState<string>(currentFin.fakturPajakNumber);
  const [bankAccountDestination, setBankAccountDestination] = useState<string>(currentFin.bankAccount);
  const [financeNotes, setFinanceNotes] = useState<string>(currentFin.notes || '');

  // Computed live metrics
  const liveTotalCost =
    materialCost + machiningCost + subconCost + assemblyLaborCost + logisticsCost + otherCost;
  const liveTaxPph23 = Math.round((project.contractValue * taxPph23Percent) / 100);
  const liveTaxPpn = Math.round((project.contractValue * taxPpnPercent) / 100);
  const liveNetProfit = project.contractValue - liveTotalCost - liveTaxPph23;
  const liveMarginPct =
    project.contractValue > 0
      ? Number(((liveNetProfit / project.contractValue) * 100).toFixed(1))
      : 0;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleDpPercentChange = (pct: number) => {
    setDownPaymentPercent(pct);
    setDownPaymentAmount(Math.round((project.contractValue * pct) / 100));
    const remPct = Math.max(0, 100 - pct);
    setFinalPaymentPercent(remPct);
    setFinalPaymentAmount(Math.round((project.contractValue * remPct) / 100));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ProjectFinancialItem = {
      downPaymentPercent,
      downPaymentAmount,
      downPaymentStatus,
      downPaymentDate,
      finalPaymentPercent,
      finalPaymentAmount,
      finalPaymentStatus,
      finalPaymentDate,
      materialCost,
      machiningCost,
      subconCost,
      assemblyLaborCost,
      logisticsCost,
      otherCost,
      taxPpnPercent,
      taxPpnAmount: liveTaxPpn,
      taxPph23Percent,
      taxPph23Amount: liveTaxPph23,
      fakturPajakNumber,
      bankAccountDestination,
      financeNotes,
    };
    onSave(project.id, payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-4xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 my-8 transition-all ${
          isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-inherit">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black font-display">Kontrol Finansial &amp; Rugi Laba Project</h3>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <span className="font-mono font-bold text-amber-500">{project.poNumber}</span>
              <span>•</span>
              <span className="font-semibold text-slate-200">{project.projectName}</span>
              <span>•</span>
              <span className="text-neutral-400">{project.customerName}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Metrics Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">Nilai Kontrak PO</span>
            <span className="text-sm sm:text-base font-black font-display text-emerald-400">
              {formatRupiah(project.contractValue)}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">Total HPP &amp; Biaya</span>
            <span className="text-sm sm:text-base font-black font-display text-red-400">
              {formatRupiah(liveTotalCost)}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">Pajak (PPN 11% + PPh 2%)</span>
            <span className="text-sm sm:text-base font-black font-display text-amber-400">
              {formatRupiah(liveTaxPpn + liveTaxPph23)}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">Netto Laba Bersih</span>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-sm sm:text-base font-black font-display ${
                  liveNetProfit >= 0 ? 'text-emerald-400' : 'text-red-500'
                }`}
              >
                {formatRupiah(liveNetProfit)}
              </span>
              <span
                className={`text-[11px] font-mono font-bold px-1.5 py-0.2 rounded ${
                  liveMarginPct >= 20
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : liveMarginPct > 0
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {liveMarginPct}%
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: FLOW KEUANGAN MASUK (CASH INFLOW) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span>1. Flow Keuangan Masuk (Cash Inflow &amp; Termin Pembayaran Klien)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Termin 1 (DP) */}
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 font-display">Termin 1: Down Payment (DP)</span>
                  <div className="flex items-center gap-1">
                    {[30, 40, 50].map((pct) => (
                      <button
                        type="button"
                        key={pct}
                        onClick={() => handleDpPercentChange(pct)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-all ${
                          downPaymentPercent === pct
                            ? 'bg-amber-400 text-neutral-950'
                            : 'bg-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Nominal DP ({downPaymentPercent}%)</label>
                    <input
                      type="number"
                      value={downPaymentAmount}
                      onChange={(e) => setDownPaymentAmount(Number(e.target.value))}
                      className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-mono ${
                        isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Status Pembayaran</label>
                    <select
                      value={downPaymentStatus}
                      onChange={(e) =>
                        setDownPaymentStatus(e.target.value as 'Received' | 'Pending' | 'Overdue')
                      }
                      className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-bold ${
                        downPaymentStatus === 'Received'
                          ? 'text-emerald-400'
                          : downPaymentStatus === 'Overdue'
                          ? 'text-red-400'
                          : 'text-amber-400'
                      } ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'}`}
                    >
                      <option value="Received">✓ Diterima / Lunas</option>
                      <option value="Pending">○ Menunggu Pembayaran</option>
                      <option value="Overdue">⚠ Jatuh Tempo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Tanggal Diterima / Estimasi</label>
                  <input
                    type="date"
                    value={downPaymentDate}
                    onChange={(e) => setDownPaymentDate(e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-mono ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              {/* Termin 2 (Pelunasan) */}
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-display">
                    Termin 2: Pelunasan ({finalPaymentPercent}%)
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">Setelah FAT &amp; BAST</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">
                      Nominal Pelunasan ({finalPaymentPercent}%)
                    </label>
                    <input
                      type="number"
                      value={finalPaymentAmount}
                      onChange={(e) => setFinalPaymentAmount(Number(e.target.value))}
                      className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-mono ${
                        isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Status Pelunasan</label>
                    <select
                      value={finalPaymentStatus}
                      onChange={(e) =>
                        setFinalPaymentStatus(e.target.value as 'Received' | 'Pending' | 'Not Invoiced')
                      }
                      className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-bold ${
                        finalPaymentStatus === 'Received'
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      } ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'}`}
                    >
                      <option value="Received">✓ Diterima / Lunas</option>
                      <option value="Pending">○ Menunggu Pelunasan</option>
                      <option value="Not Invoiced">○ Belum Ditagihkan (Mesin Berjalan)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Target / Tanggal Pelunasan</label>
                  <input
                    type="date"
                    value={finalPaymentDate}
                    onChange={(e) => setFinalPaymentDate(e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-mono ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: FLOW PENGELUARAN BIAYA (HPP / COST OUTFLOW) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-red-400">
                <FileSpreadsheet className="w-4 h-4" />
                <span>2. Flow Pengeluaran Biaya (HPP &amp; Biaya Produksi Manufaktur)</span>
              </div>
              <span className="text-xs font-mono font-bold text-red-400">
                Total Biaya: {formatRupiah(liveTotalCost)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                  Material Baja, Sensor &amp; PLC
                </label>
                <input
                  type="number"
                  value={materialCost}
                  onChange={(e) => setMaterialCost(Number(e.target.value))}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-mono ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                  placeholder="Rp 0"
                />
                <span className="text-[10px] text-neutral-500 font-mono">
                  {formatRupiah(materialCost)}
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                  Machining CNC, Tooling &amp; Listrik
                </label>
                <input
                  type="number"
                  value={machiningCost}
                  onChange={(e) => setMachiningCost(Number(e.target.value))}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-mono ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                  placeholder="Rp 0"
                />
                <span className="text-[10px] text-neutral-500 font-mono">
                  {formatRupiah(machiningCost)}
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                  Sub-kontraktor (Hardening/Plating)
                </label>
                <input
                  type="number"
                  value={subconCost}
                  onChange={(e) => setSubconCost(Number(e.target.value))}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-mono ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                  placeholder="Rp 0"
                />
                <span className="text-[10px] text-neutral-500 font-mono">
                  {formatRupiah(subconCost)}
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                  Manpower Perakitan, Wiring &amp; QC
                </label>
                <input
                  type="number"
                  value={assemblyLaborCost}
                  onChange={(e) => setAssemblyLaborCost(Number(e.target.value))}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-mono ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                  placeholder="Rp 0"
                />
                <span className="text-[10px] text-neutral-500 font-mono">
                  {formatRupiah(assemblyLaborCost)}
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                  Ekspedisi, Packing &amp; Logistik
                </label>
                <input
                  type="number"
                  value={logisticsCost}
                  onChange={(e) => setLogisticsCost(Number(e.target.value))}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-mono ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                  placeholder="Rp 0"
                />
                <span className="text-[10px] text-neutral-500 font-mono">
                  {formatRupiah(logisticsCost)}
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                  Operasional Lainnya / Konsumsi
                </label>
                <input
                  type="number"
                  value={otherCost}
                  onChange={(e) => setOtherCost(Number(e.target.value))}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-mono ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                  placeholder="Rp 0"
                />
                <span className="text-[10px] text-neutral-500 font-mono">
                  {formatRupiah(otherCost)}
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 3: PAJAK & FAKTUR PAJAK */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-400">
              <Receipt className="w-4 h-4" />
              <span>3. Flow Perpajakan (PPN 11% &amp; PPh 23)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                  PPN 11% Faktur Keluaran
                </label>
                <div
                  className={`px-3 py-2 text-xs rounded-xl border font-mono flex items-center justify-between ${
                    isDark ? 'bg-neutral-900/60 border-neutral-800 text-amber-400' : 'bg-slate-100 border-slate-300'
                  }`}
                >
                  <span>11%</span>
                  <span className="font-bold">{formatRupiah(liveTaxPpn)}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                  PPh 23 Jasa Teknik (Dipotong Klien)
                </label>
                <div
                  className={`px-3 py-2 text-xs rounded-xl border font-mono flex items-center justify-between ${
                    isDark ? 'bg-neutral-900/60 border-neutral-800 text-red-400' : 'bg-slate-100 border-slate-300'
                  }`}
                >
                  <span>2%</span>
                  <span className="font-bold">{formatRupiah(liveTaxPph23)}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                  Nomor Seri Faktur Pajak (NSFP)
                </label>
                <input
                  type="text"
                  value={fakturPajakNumber}
                  onChange={(e) => setFakturPajakNumber(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-mono ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                  placeholder="010.002-26.XXXXXXXX"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: REKENING & CATATAN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                Rekening Bank Tujuan Penerimaan
              </label>
              <input
                type="text"
                value={bankAccountDestination}
                onChange={(e) => setBankAccountDestination(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                Catatan Arus Keuangan Proyek
              </label>
              <input
                type="text"
                value={financeNotes}
                onChange={(e) => setFinanceNotes(e.target.value)}
                placeholder="Misal: Material besi SS400 naik 5%, pembayaran DP tepat waktu"
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-inherit flex items-center justify-between">
            <div className="text-xs text-neutral-400 font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Otorisasi Administrator: Perubahan tersinkronisasi realtime</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-neutral-700 hover:border-neutral-500 text-neutral-300 text-xs font-bold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Kontrol Finansial</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
