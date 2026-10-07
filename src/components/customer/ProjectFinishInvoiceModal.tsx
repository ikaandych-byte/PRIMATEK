import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Receipt,
  Truck,
  Printer,
  FileCheck,
  Building2,
  Calendar,
  CreditCard,
  MapPin,
  UserCheck,
  Download,
  AlertCircle,
} from 'lucide-react';
import { ProjectItem } from '../../types/backend';
import { useTheme } from '../../context/ThemeContext';

interface ProjectFinishInvoiceModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectFinishInvoiceModal: React.FC<ProjectFinishInvoiceModalProps> = ({
  project,
  onClose,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'invoice' | 'delivery'>('invoice');

  if (!project) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const invoice = project.invoice || {
    invoiceNumber: `INV/PTT/2026/${project.poNumber.split('/').pop() || '001'}`,
    invoiceDate: project.actualCompletionDate || project.targetCompletionDate,
    dueDate: project.targetCompletionDate,
    totalAmount: project.contractValue,
    downPaymentPercent: 50,
    downPaymentAmount: project.contractValue * 0.5,
    finalPaymentAmount: project.contractValue * 0.5,
    status: 'Paid Full' as const,
    bankName: 'Bank Central Asia (BCA)',
    bankAccount: '542-089-7700',
    accountHolder: 'PT. PRIMA TEKNIK TRADA',
    paidAt: project.actualCompletionDate || '2026-09-20',
  };

  const delivery = project.delivery || {
    doNumber: `DO/PTT-LOG/2026/${project.poNumber.split('/').pop() || '088'}`,
    deliveryDate: `${project.actualCompletionDate || project.targetCompletionDate} 09:30 WIB`,
    expedition: 'Truk Towing & Dedicated Flatbed PTT Logistics (Armada Internal)',
    vehicleNumber: 'B 9821 PTT',
    driverName: 'Sutrisno (PTT Logistics Lead)',
    driverPhone: '+62 813-8890-1122',
    deliveryAddress: project.customerName + ' — Factory Plant Tooling Bay',
    status: 'Installed & BAST Signed' as const,
    bastNumber: `BAST/PTT-${project.customerName.replace(/[^a-zA-Z]/g, '').slice(0, 3)}/2026/091`,
    receivedBy: `${project.customerName} Representative`,
    receivedDate: project.actualCompletionDate || project.targetCompletionDate,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-6 transition-all max-h-[92vh] flex flex-col ${
          isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent Banner */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 shrink-0" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-inherit flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% SELESAI &amp; SERAH TERIMA TUNTAS (FINISH)</span>
              </span>
              <span className="text-xs font-mono text-neutral-400">{project.poNumber}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black font-display text-slate-100">
              Dokumen Tagihan Invoice &amp; Proses Pengiriman Barang
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Project: <span className="text-slate-200 font-semibold">{project.projectName}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tab Switcher: Invoice vs Delivery */}
        <div className="flex border-b border-inherit px-6 pt-3 gap-3 bg-neutral-900/30 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('invoice')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'invoice'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-slate-200'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Tagihan Invoice Pembayaran</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('delivery')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'delivery'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Proses Pengiriman Barang (DO &amp; BAST)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 scrollbar-thin">
          {/* TAB 1: INVOICE PEMBAYARAN */}
          {activeTab === 'invoice' && (
            <div className="space-y-6 animate-fade-in">
              {/* Invoice Certificate Header */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark
                    ? 'bg-gradient-to-br from-emerald-950/30 to-neutral-900 border-emerald-500/30'
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Faktur Tagihan Resmi PT. Prima Teknik Trada
                    </span>
                    <h3 className="text-xl font-black font-mono text-slate-100 mt-0.5">
                      {invoice.invoiceNumber}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Diterbitkan untuk: <span className="text-slate-200 font-bold">{project.customerName}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{invoice.status === 'Paid Full' ? 'LUNAS (PAID IN FULL)' : 'BELUM LUNAS'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Invoice Breakdown Table */}
              <div
                className={`rounded-2xl border overflow-hidden ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="p-4 border-b border-inherit font-bold text-xs font-display flex items-center justify-between">
                  <span>Rincian Pembayaran Termin PO</span>
                  <span className="text-xs font-mono text-neutral-400">Jatuh Tempo: {invoice.dueDate}</span>
                </div>

                <div className="p-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-neutral-800">
                    <div>
                      <span className="font-bold text-slate-200 block">Termin 1: Down Payment (DP) 50%</span>
                      <span className="text-[11px] text-neutral-400">Saat Penerbitan Purchase Order &amp; Kick-off CAD</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-200 block">
                        {formatRupiah(invoice.downPaymentAmount)}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">Sudah Dibayar (Lunas)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-neutral-800">
                    <div>
                      <span className="font-bold text-slate-200 block">Termin 2: Pelunasan 50%</span>
                      <span className="text-[11px] text-neutral-400">Setelah Factory Acceptance Test (FAT) &amp; Serah Terima BAST</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-200 block">
                        {formatRupiah(invoice.finalPaymentAmount)}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">Sudah Dibayar (Lunas)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-bold text-slate-100">Total Nilai Tagihan Kontrak:</span>
                    <span className="text-base sm:text-lg font-black font-mono text-emerald-400">
                      {formatRupiah(invoice.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Bank Account Information */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-amber-500 font-bold">
                  <CreditCard className="w-4 h-4" />
                  <span>Rekening Bank Resmi Perusahaan PT. Prima Teknik Trada</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-neutral-300 font-mono text-xs">
                  <div className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-950/40">
                    <span className="text-neutral-400 block text-[10px]">{invoice.bankName}</span>
                    <span className="text-amber-400 font-bold text-sm">{invoice.bankAccount}</span>
                    <span className="text-neutral-400 block text-[10px] mt-0.5">a.n. {invoice.accountHolder}</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-950/40">
                    <span className="text-neutral-400 block text-[10px]">Bank Mandiri (Cabang Cikarang)</span>
                    <span className="text-amber-400 font-bold text-sm">156-00-1890-7711</span>
                    <span className="text-neutral-400 block text-[10px] mt-0.5">a.n. PT. PRIMA TEKNIK TRADA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROSES PENGIRIMAN BARANG (DO & BAST) */}
          {activeTab === 'delivery' && (
            <div className="space-y-6 animate-fade-in">
              {/* Delivery Status Card */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark
                    ? 'bg-gradient-to-br from-blue-950/30 to-neutral-900 border-blue-500/30'
                    : 'bg-blue-50/60 border-blue-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-bold block">
                      Surat Jalan &amp; Delivery Order (DO)
                    </span>
                    <h3 className="text-xl font-black font-mono text-slate-100 mt-0.5">
                      {delivery.doNumber}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Armada: <span className="text-slate-200 font-semibold">{delivery.expedition}</span> ({delivery.vehicleNumber})
                    </p>
                  </div>

                  <div>
                    <span className="px-3 py-1 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs">
                      <Truck className="w-4 h-4" />
                      <span>{delivery.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Details Grid */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-3 ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-neutral-400 block text-[11px] font-mono">Waktu Pengiriman Armada:</span>
                    <span className="font-bold text-slate-200 mt-0.5 block flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      {delivery.deliveryDate}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-400 block text-[11px] font-mono">Pengemudi / Driver PIC:</span>
                    <span className="font-bold text-slate-200 mt-0.5 block">
                      {delivery.driverName} ({delivery.driverPhone})
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-neutral-400 block text-[11px] font-mono">Alamat Tujuan Pengiriman:</span>
                    <span className="font-semibold text-slate-300 mt-0.5 block flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      {delivery.deliveryAddress}
                    </span>
                  </div>
                </div>
              </div>

              {/* BAST Certificate Box */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-xs">
                  <FileCheck className="w-4 h-4" />
                  <span>Berita Acara Serah Terima (BAST)</span>
                </div>
                <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-950/40 text-xs font-mono space-y-1">
                  <div>Nomor BAST: <span className="text-amber-400 font-bold">{delivery.bastNumber}</span></div>
                  <div>Penerima: <span className="text-slate-200">{delivery.receivedBy}</span></div>
                  <div>Tanggal Terima: <span className="text-slate-200">{delivery.receivedDate || delivery.deliveryDate}</span></div>
                  <div className="text-emerald-400 font-semibold pt-1">
                    ✓ Unit mesin telah diuji, dipasang di bay line produksi, dan berfungsi sesuai spesifikasi PO.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Print and Close */}
        <div className="p-4 sm:p-5 border-t border-inherit flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-700 hover:border-amber-400 text-xs font-bold text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-500" />
            <span>Cetak Dokumen Resmi</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
