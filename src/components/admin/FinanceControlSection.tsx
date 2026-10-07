import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Receipt,
  FileSpreadsheet,
  Building,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  Search,
  Printer,
  ChevronDown,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Edit,
  Sliders,
  Percent,
  CreditCard,
  Banknote,
  PiggyBank,
  Check,
} from 'lucide-react';
import { ProjectItem, ProjectFinancialItem } from '../../types/backend';
import { useTheme } from '../../context/ThemeContext';
import {
  getProjectFinancialDetails,
  calculateAggregateFinancials,
  CalculatedProjectFinance,
} from '../../utils/financeUtils';
import { EditFinanceModal } from './EditFinanceModal';

interface FinanceControlSectionProps {
  projects: ProjectItem[];
  isAdmin: boolean;
  onUpdateProject: (projectId: string, data: Partial<ProjectItem>) => void;
}

export const FinanceControlSection: React.FC<FinanceControlSectionProps> = ({
  projects,
  isAdmin,
  onUpdateProject,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPayment, setFilterPayment] = useState<'all' | 'paid' | 'pending_final' | 'pending_dp'>('all');
  const [selectedProjectForEdit, setSelectedProjectForEdit] = useState<ProjectItem | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (!isAdmin) {
    return (
      <div
        className={`p-10 rounded-3xl border text-center space-y-4 max-w-2xl mx-auto my-12 ${
          isDark ? 'bg-[#0f141f] border-red-500/30 text-white' : 'bg-red-50/50 border-red-200 text-slate-900'
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-500 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black font-display text-red-500">
          Akses Finansial Dibatasi — Khusus Administrator
        </h3>
        <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
          Hak akses untuk memonitor nilai uang, arus kas masuk (termin PO), rincian pengeluaran biaya HPP,
          beban perpajakan (PPN/PPh), dan kalkulasi laba-rugi hanya diizinkan untuk akun Administrator
          PT. Prima Teknik Trada.
        </p>
      </div>
    );
  }

  // Calculate high-level aggregates
  const aggregates = calculateAggregateFinancials(projects);

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const fin = getProjectFinancialDetails(p);
    const matchesSearch =
      p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterPayment === 'paid') {
      return fin.downPaymentStatus === 'Received' && fin.finalPaymentStatus === 'Received';
    }
    if (filterPayment === 'pending_final') {
      return fin.downPaymentStatus === 'Received' && fin.finalPaymentStatus !== 'Received';
    }
    if (filterPayment === 'pending_dp') {
      return fin.downPaymentStatus !== 'Received';
    }
    return true;
  });

  const handleSaveFinance = (projectId: string, financial: ProjectFinancialItem) => {
    onUpdateProject(projectId, { financial });
  };

  const handleQuickMarkDpReceived = (project: ProjectItem) => {
    const current = getProjectFinancialDetails(project);
    const updatedFin: ProjectFinancialItem = {
      ...(project.financial || {}),
      downPaymentPercent: current.downPaymentPercent,
      downPaymentAmount: current.downPaymentAmount,
      downPaymentStatus: 'Received',
      downPaymentDate: new Date().toISOString().split('T')[0],
      finalPaymentPercent: current.finalPaymentPercent,
      finalPaymentAmount: current.finalPaymentAmount,
      finalPaymentStatus: current.finalPaymentStatus,
      materialCost: current.materialCost,
      machiningCost: current.machiningCost,
      subconCost: current.subconCost,
      assemblyLaborCost: current.assemblyLaborCost,
      logisticsCost: current.logisticsCost,
      taxPpnPercent: current.taxPpnPercent,
      taxPph23Percent: current.taxPph23Percent,
    };
    onUpdateProject(project.id, { financial: updatedFin });
  };

  const handleQuickMarkFinalReceived = (project: ProjectItem) => {
    const current = getProjectFinancialDetails(project);
    const updatedFin: ProjectFinancialItem = {
      ...(project.financial || {}),
      downPaymentPercent: current.downPaymentPercent,
      downPaymentAmount: current.downPaymentAmount,
      downPaymentStatus: 'Received',
      finalPaymentPercent: current.finalPaymentPercent,
      finalPaymentAmount: current.finalPaymentAmount,
      finalPaymentStatus: 'Received',
      finalPaymentDate: new Date().toISOString().split('T')[0],
      materialCost: current.materialCost,
      machiningCost: current.machiningCost,
      subconCost: current.subconCost,
      assemblyLaborCost: current.assemblyLaborCost,
      logisticsCost: current.logisticsCost,
      taxPpnPercent: current.taxPpnPercent,
      taxPph23Percent: current.taxPph23Percent,
    };
    onUpdateProject(project.id, { financial: updatedFin });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Banknote className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-display">
              Kontrol Keuangan, Arus Kas &amp; Rugi Laba
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Monitoring otorisasi penuh: Arus kas masuk (termin PO), pengeluaran biaya produksi (HPP),
            pajak (PPN 11% &amp; PPh 23), dan netto rugi-laba per project.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPrintModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-700 hover:border-amber-400 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Rekap Cetak Laba Rugi</span>
          </button>
        </div>
      </div>

      {/* KPI Cards: Flow Keuangan Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {/* Card 1: Total Omzet Kontrak */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">Total Omzet Kontrak</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-base sm:text-lg font-black font-display text-emerald-400 truncate">
            {formatRupiah(aggregates.totalContractValue)}
          </div>
          <div className="mt-1 text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
            <span>{projects.length} Project Aktif</span>
          </div>
        </div>

        {/* Card 2: Arus Kas Masuk (Realized) */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">Kas Masuk (Inflow)</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-base sm:text-lg font-black font-display text-emerald-300 truncate">
            {formatRupiah(aggregates.totalCashInflow)}
          </div>
          <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1 font-mono font-semibold">
            <span>
              {aggregates.totalContractValue > 0
                ? `${Math.round((aggregates.totalCashInflow / aggregates.totalContractValue) * 100)}% Terealisasi`
                : '0%'}
            </span>
          </div>
        </div>

        {/* Card 3: Piutang Berjalan */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">Piutang Berjalan</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-base sm:text-lg font-black font-display text-amber-400 truncate">
            {formatRupiah(aggregates.totalReceivables)}
          </div>
          <div className="mt-1 text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
            <span>Menunggu Pelunasan</span>
          </div>
        </div>

        {/* Card 4: Biaya HPP Outflow */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">Total HPP &amp; Biaya</span>
            <ArrowDownRight className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-base sm:text-lg font-black font-display text-red-400 truncate">
            {formatRupiah(aggregates.totalHppCost)}
          </div>
          <div className="mt-1 text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
            <span>Material &amp; Machining</span>
          </div>
        </div>

        {/* Card 5: Pajak PPN & PPh */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">Pajak (PPN &amp; PPh)</span>
            <Receipt className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-base sm:text-lg font-black font-display text-purple-400 truncate">
            {formatRupiah(aggregates.totalTaxPpn + aggregates.totalTaxPph23)}
          </div>
          <div className="mt-1 text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
            <span>PPN 11% + PPh 2%</span>
          </div>
        </div>

        {/* Card 6: Netto Laba Bersih */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#0f141f] border-emerald-500/40' : 'bg-emerald-50/50 border-emerald-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">Netto Laba Bersih</span>
            <PiggyBank className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-base sm:text-lg font-black font-display text-emerald-400 truncate">
            {formatRupiah(aggregates.totalNetProfit)}
          </div>
          <div className="mt-1 text-[11px] font-bold text-emerald-400 flex items-center gap-1 font-mono">
            <span>Margin: {aggregates.avgNetProfitMargin}%</span>
          </div>
        </div>
      </div>

      {/* Filter Ribbon & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'all', label: `Semua Project (${projects.length})` },
            { id: 'paid', label: 'Lunas Penuh (100%)' },
            { id: 'pending_final', label: 'Menunggu Pelunasan (DP Selesai)' },
            { id: 'pending_dp', label: 'Menunggu DP (Termin 1)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterPayment(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterPayment === tab.id
                  ? 'bg-amber-400 text-neutral-950 shadow-xs'
                  : isDark
                  ? 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Cari PO / Mesin / Klien..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-8 pr-3 py-1.5 text-xs rounded-xl border outline-none ${
              isDark
                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500'
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>
      </div>

      {/* Project Financial Cards Grid */}
      <div className="space-y-4">
        {filteredProjects.map((proj) => {
          const fin = getProjectFinancialDetails(proj);
          const isFullPaid = fin.downPaymentStatus === 'Received' && fin.finalPaymentStatus === 'Received';

          return (
            <div
              key={proj.id}
              className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-[#0f141f] border-neutral-800 hover:border-neutral-700' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-inherit">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">{proj.poNumber}</span>
                    <span className="text-neutral-500 text-xs">•</span>
                    <span className="text-xs font-semibold text-slate-300">{proj.customerName}</span>
                    <span className="text-neutral-500 text-xs">•</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400">
                      {proj.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-100">{proj.projectName}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">Nilai Kontrak Proyek</span>
                    <span className="text-lg font-black font-display text-emerald-400">
                      {formatRupiah(proj.contractValue)}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedProjectForEdit(proj)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-md shadow-amber-400/20 cursor-pointer transition-all"
                    title="Ubah & Kontrol Finansial Project"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Kontrol Finansial</span>
                  </button>
                </div>
              </div>

              {/* 4-Column Breakdown: Inflow, Cost, Tax, Net P&L */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {/* 1. Cash Inflow */}
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-2.5 ${
                    isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[11px] uppercase text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Flow Kas Masuk
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                        isFullPaid
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {isFullPaid ? 'Lunas 100%' : 'Termin Berjalan'}
                    </span>
                  </div>

                  {/* Termin 1 */}
                  <div className="p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-300">DP ({fin.downPaymentPercent}%)</span>
                      <span className="font-mono font-bold text-slate-100">{formatRupiah(fin.downPaymentAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span
                        className={`font-mono font-semibold ${
                          fin.downPaymentStatus === 'Received' ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {fin.downPaymentStatus === 'Received' ? '✓ Diterima' : '○ Menunggu'}
                      </span>
                      {fin.downPaymentStatus !== 'Received' && (
                        <button
                          onClick={() => handleQuickMarkDpReceived(proj)}
                          className="text-[10px] text-amber-400 hover:underline font-mono cursor-pointer"
                        >
                          Tandai Terima
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Termin 2 */}
                  <div className="p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-300">Pelunasan ({fin.finalPaymentPercent}%)</span>
                      <span className="font-mono font-bold text-slate-100">{formatRupiah(fin.finalPaymentAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span
                        className={`font-mono font-semibold ${
                          fin.finalPaymentStatus === 'Received' ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {fin.finalPaymentStatus === 'Received' ? '✓ Diterima' : '○ Menunggu'}
                      </span>
                      {fin.finalPaymentStatus !== 'Received' && (
                        <button
                          onClick={() => handleQuickMarkFinalReceived(proj)}
                          className="text-[10px] text-amber-400 hover:underline font-mono cursor-pointer"
                        >
                          Tandai Terima
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-inherit">
                    <span>Kas Masuk:</span>
                    <span className="font-bold text-emerald-400">{formatRupiah(fin.totalCashInflowReceived)}</span>
                  </div>
                </div>

                {/* 2. Flow Pengeluaran Biaya (HPP) */}
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                    isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[11px] uppercase text-red-400 flex items-center gap-1">
                      <FileSpreadsheet className="w-3.5 h-3.5" /> Flow Biaya (HPP)
                    </span>
                    <span className="text-[11px] font-mono text-red-400 font-bold">
                      {Math.round((fin.totalCostOutflow / (proj.contractValue || 1)) * 100)}% Nilai PO
                    </span>
                  </div>

                  <div className="space-y-1 font-mono text-[11px] text-neutral-300">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Material &amp; PLC:</span>
                      <span>{formatRupiah(fin.materialCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Machining &amp; Listrik:</span>
                      <span>{formatRupiah(fin.machiningCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Sub-kontraktor:</span>
                      <span>{formatRupiah(fin.subconCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Manpower &amp; QC:</span>
                      <span>{formatRupiah(fin.assemblyLaborCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Logistik &amp; Ekspedisi:</span>
                      <span>{formatRupiah(fin.logisticsCost)}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono border-t border-inherit">
                    <span className="text-neutral-400">Total HPP:</span>
                    <span className="font-bold text-red-400">{formatRupiah(fin.totalCostOutflow)}</span>
                  </div>
                </div>

                {/* 3. Pajak (Taxes) */}
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-2.5 ${
                    isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[11px] uppercase text-purple-400 flex items-center gap-1">
                      <Receipt className="w-3.5 h-3.5" /> Pajak (PPN &amp; PPh)
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">Faktur Standar</span>
                  </div>

                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/80">
                      <div className="flex justify-between text-neutral-400">
                        <span>PPN Keluaran ({fin.taxPpnPercent}%):</span>
                        <span className="font-bold text-purple-300">{formatRupiah(fin.taxPpnAmount)}</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-0.5 truncate">
                        NSFP: {fin.fakturPajakNumber}
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/80">
                      <div className="flex justify-between text-neutral-400">
                        <span>PPh 23 Jasa ({fin.taxPph23Percent}%):</span>
                        <span className="font-bold text-red-400">-{formatRupiah(fin.taxPph23Amount)}</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">Dipotong pihak klien</div>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-inherit">
                    <span>Beban Pajak Proyek:</span>
                    <span className="font-bold text-purple-300">{formatRupiah(fin.taxPph23Amount)}</span>
                  </div>
                </div>

                {/* 4. Netto Rugi Laba (Net Profit & Loss) */}
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-2.5 ${
                    isDark
                      ? fin.netProfit >= 0
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-red-950/20 border-red-500/30'
                      : 'bg-emerald-50/50 border-emerald-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[11px] uppercase text-emerald-400 flex items-center gap-1">
                      <PiggyBank className="w-3.5 h-3.5" /> Netto Rugi Laba
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        fin.profitStatus === 'Sangat Sehat'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : fin.profitStatus === 'Defisit'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {fin.profitStatus}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 block">Laba Bersih Setelah Biaya &amp; Pajak</span>
                    <div
                      className={`text-lg sm:text-xl font-black font-display ${
                        fin.netProfit >= 0 ? 'text-emerald-400' : 'text-red-500'
                      }`}
                    >
                      {formatRupiah(fin.netProfit)}
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-400">Net Profit Margin:</span>
                      <span className="font-black text-emerald-400">{fin.netProfitMargin}%</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          fin.netProfitMargin >= 25
                            ? 'bg-emerald-500'
                            : fin.netProfitMargin > 15
                            ? 'bg-amber-400'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(5, fin.netProfitMargin))}%` }}
                      />
                    </div>
                  </div>

                  {fin.notes && (
                    <div className="text-[10px] text-neutral-400 italic border-t border-inherit pt-1 truncate">
                      "{fin.notes}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rekapitulasi Tabel Finansial Terperinci */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="p-4 border-b border-inherit flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-display">Tabel Rekapitulasi Arus Kas &amp; P&amp;L Semua Project</h3>
            <p className="text-xs text-neutral-400">Tinjauan komprehensif kas masuk, biaya, pajak, dan profit bersih</p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-500">
            Total {projects.length} Project Tercatat
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead
              className={`border-b text-[10px] font-mono uppercase tracking-wider ${
                isDark ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <tr>
                <th className="py-3 px-3">No. PO &amp; Project</th>
                <th className="py-3 px-3">Klien</th>
                <th className="py-3 px-3 text-right">Nilai Kontrak</th>
                <th className="py-3 px-3 text-right">Kas Masuk (Realized)</th>
                <th className="py-3 px-3 text-right">Sisa Piutang</th>
                <th className="py-3 px-3 text-right">Total HPP Biaya</th>
                <th className="py-3 px-3 text-right">PPh 23 (2%)</th>
                <th className="py-3 px-3 text-right">Netto Laba</th>
                <th className="py-3 px-3 text-center">Margin</th>
                <th className="py-3 px-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {projects.map((proj) => {
                const fin = getProjectFinancialDetails(proj);
                return (
                  <tr
                    key={proj.id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-neutral-900/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-amber-400">{proj.poNumber}</div>
                      <div className="text-[11px] text-slate-300 font-semibold truncate max-w-[180px]">
                        {proj.projectName}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-neutral-300 text-[11px]">
                      {proj.customerName.replace('PT. ', '')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-100">
                      {formatRupiah(proj.contractValue)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400 font-semibold">
                      {formatRupiah(fin.totalCashInflowReceived)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-amber-400">
                      {formatRupiah(fin.totalReceivablesOutstanding)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-red-400">
                      {formatRupiah(fin.totalCostOutflow)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-purple-400">
                      {formatRupiah(fin.taxPph23Amount)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                      {formatRupiah(fin.netProfit)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          fin.netProfitMargin >= 25
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : fin.netProfitMargin >= 15
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {fin.netProfitMargin}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => setSelectedProjectForEdit(proj)}
                        className="px-2 py-1 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-neutral-950 font-bold text-[11px] cursor-pointer transition-all"
                        title="Edit Finansial Project"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Table Footer Totals */}
            <tfoot
              className={`border-t font-bold font-mono text-xs ${
                isDark ? 'bg-neutral-900/90 text-white' : 'bg-slate-100 text-slate-900'
              }`}
            >
              <tr>
                <td colSpan={2} className="py-3 px-3 uppercase tracking-wider">
                  Total Akumulasi
                </td>
                <td className="py-3 px-3 text-right text-emerald-400">
                  {formatRupiah(aggregates.totalContractValue)}
                </td>
                <td className="py-3 px-3 text-right text-emerald-300">
                  {formatRupiah(aggregates.totalCashInflow)}
                </td>
                <td className="py-3 px-3 text-right text-amber-400">
                  {formatRupiah(aggregates.totalReceivables)}
                </td>
                <td className="py-3 px-3 text-right text-red-400">
                  {formatRupiah(aggregates.totalHppCost)}
                </td>
                <td className="py-3 px-3 text-right text-purple-400">
                  {formatRupiah(aggregates.totalTaxPph23)}
                </td>
                <td className="py-3 px-3 text-right text-emerald-400 text-sm font-black">
                  {formatRupiah(aggregates.totalNetProfit)}
                </td>
                <td className="py-3 px-3 text-center text-emerald-400 font-black">
                  {aggregates.avgNetProfitMargin}%
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Edit Finance Modal */}
      {selectedProjectForEdit && (
        <EditFinanceModal
          project={selectedProjectForEdit}
          onClose={() => setSelectedProjectForEdit(null)}
          onSave={handleSaveFinance}
        />
      )}

      {/* Print / Export Report Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div
            className={`w-full max-w-3xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 my-8 ${
              isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-inherit">
              <div>
                <h3 className="text-lg font-black font-display">Laporan Rekapitulasi Arus Kas &amp; Laba Rugi</h3>
                <p className="text-xs text-neutral-400">
                  PT. Prima Teknik Trada — Industrial Engineering &amp; Machinery Automation
                </p>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Total Omzet Nilai PO (Revenue):</span>
                <span className="font-bold text-emerald-400">{formatRupiah(aggregates.totalContractValue)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Total Kas Masuk Diterima (Realized Inflow):</span>
                <span className="font-bold text-emerald-300">{formatRupiah(aggregates.totalCashInflow)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Total Piutang Outstanding:</span>
                <span className="font-bold text-amber-400">{formatRupiah(aggregates.totalReceivables)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Total Beban Biaya Produksi (HPP):</span>
                <span className="font-bold text-red-400">{formatRupiah(aggregates.totalHppCost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Beban Pajak PPh 23 (2%):</span>
                <span className="font-bold text-purple-400">{formatRupiah(aggregates.totalTaxPph23)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-black text-emerald-400 border-t-2 border-emerald-500/50">
                <span>NETTO LABA BERSIH PERUSAHAAN:</span>
                <span>{formatRupiah(aggregates.totalNetProfit)} ({aggregates.avgNetProfitMargin}%)</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-inherit">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-xl border border-neutral-700 text-xs font-bold cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold shadow-md shadow-amber-400/20 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Cetak PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
