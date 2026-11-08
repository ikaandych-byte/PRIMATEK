import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { COMPANY_INFO } from '../../data/company';
import { ProjectItem } from '../../types/backend';
import {
  getProjectFinancialDetails,
  calculateAggregateFinancials,
} from '../../utils/financeUtils';
import { Printer, X, ChevronLeft, ChevronRight, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { PrimatechLogo } from '../PrimatechLogo';

interface FinanceReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
}

export const FinanceReportPrintModal: React.FC<FinanceReportPrintModalProps> = ({
  isOpen,
  onClose,
  projects,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [printScope, setPrintScope] = useState<'current' | 'all'>('current');
  const itemsPerPage = 7; // Tepat 7 baris proyek per halaman + ringkasan finansial agar 100% muat pas dalam 1 lembar A4 portrait tanpa scroll/overflow

  // Sinkronisasi class body untuk isolasi cetak CSS (menyembunyikan #root agar dashboard tidak ikut tercetak)
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('has-print-modal-open');
    } else {
      document.body.classList.remove('has-print-modal-open');
    }
    return () => {
      document.body.classList.remove('has-print-modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const aggregates = calculateAggregateFinancials(projects);
  const totalPages = Math.ceil(projects.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Render satu lembar A4 untuk rentang data proyek tertentu
  const renderA4Sheet = (
    items: ProjectItem[],
    pageIndex: number,
    totalPg: number,
    isBreakAfter: boolean = false
  ) => {
    return (
      <div
        key={`finance-page-${pageIndex}`}
        className={`print-sheet bg-white text-neutral-900 p-8 sm:p-10 font-sans text-xs ${
          isBreakAfter ? 'print-sheet-break' : ''
        }`}
      >
        {/* Header Kop Perusahaan Resmi (Sama dengan Departemen) */}
        <div className="border-b-2 border-neutral-900 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <PrimatechLogo forceDark={false} className="h-11 w-auto max-w-[190px]" />
            </div>
            <div className="space-y-0.5">
              <h1 className="text-lg font-black tracking-tight text-neutral-900 uppercase font-display leading-tight">
                {COMPANY_INFO.name}
              </h1>
              <p className="text-[10px] text-neutral-700 font-mono">
                {COMPANY_INFO.address}
              </p>
              <p className="text-[10px] text-neutral-700 font-mono">
                Tel: {COMPANY_INFO.phone} | Email: {COMPANY_INFO.emailPrimary} | Web: {COMPANY_INFO.website}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0 space-y-1 font-mono">
            <div className="px-2.5 py-1 rounded bg-neutral-100 font-bold text-neutral-950 inline-block border border-neutral-400 text-[10px] tracking-wider">
              REKAPITULASI LABA RUGI
            </div>
            <div className="text-[10px] text-neutral-600">
              Tanggal: {currentDate}
            </div>
            <div className="text-[10px] text-neutral-700 font-bold">
              Hal {pageIndex} dari {totalPg}
            </div>
          </div>
        </div>

        {/* Title Dokumen: Bersih dan Standar Resmi */}
        <div className="text-center py-2.5 space-y-0.5">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-neutral-900 font-display">
            LAPORAN REKAPITULASI KEUANGAN, ARUS KAS &amp; LABA RUGI PROYEK
          </h2>
          <p className="text-[11px] text-neutral-600 font-mono">
            Cakupan: Seluruh Proyek Manufaktur &amp; Otomasi Aktif | PT. Prima Teknik Trada
          </p>
        </div>

        {/* Ringkasan Finansial Eksekutif (Baris Ringkasan Arus Kas & Laba Rugi) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 my-2 p-2.5 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-900">
          <div className="border-r border-neutral-300 pr-2">
            <div className="text-[9px] font-mono text-neutral-600 uppercase">Total Omzet Kontrak</div>
            <div className="text-xs font-black font-mono text-neutral-950 truncate">
              {formatRupiah(aggregates.totalContractValue)}
            </div>
          </div>
          <div className="border-r border-neutral-300 pr-2">
            <div className="text-[9px] font-mono text-neutral-600 uppercase">Kas Masuk (Realized)</div>
            <div className="text-xs font-black font-mono text-neutral-950 truncate">
              {formatRupiah(aggregates.totalCashInflow)}
            </div>
          </div>
          <div className="border-r border-neutral-300 pr-2">
            <div className="text-[9px] font-mono text-neutral-600 uppercase">Piutang Outstanding</div>
            <div className="text-xs font-black font-mono text-neutral-950 truncate">
              {formatRupiah(aggregates.totalReceivables)}
            </div>
          </div>
          <div className="border-r border-neutral-300 pr-2">
            <div className="text-[9px] font-mono text-neutral-600 uppercase">Total Beban HPP</div>
            <div className="text-xs font-black font-mono text-neutral-950 truncate">
              {formatRupiah(aggregates.totalHppCost)}
            </div>
          </div>
          <div className="border-r border-neutral-300 pr-2">
            <div className="text-[9px] font-mono text-neutral-600 uppercase">Beban PPh 23 (2%)</div>
            <div className="text-xs font-black font-mono text-neutral-950 truncate">
              {formatRupiah(aggregates.totalTaxPph23)}
            </div>
          </div>
          <div>
            <div className="text-[9px] font-mono text-neutral-600 uppercase">Netto Laba Bersih</div>
            <div className="text-xs font-black font-mono text-neutral-950 truncate">
              {formatRupiah(aggregates.totalNetProfit)} ({aggregates.avgNetProfitMargin}%)
            </div>
          </div>
        </div>

        {/* Tabel Data Rekap Proyek Finansial (Maksimal 7 Baris per Lembar) */}
        <div className="border border-neutral-400 rounded-lg overflow-hidden my-2">
          <table className="w-full text-left border-collapse text-[10.5px]">
            <thead>
              <tr className="bg-neutral-100 text-neutral-950 font-mono uppercase tracking-wider border-b-2 border-neutral-900">
                <th className="p-2 font-bold w-9 text-center border-r border-neutral-300">No</th>
                <th className="p-2 font-bold w-44 border-r border-neutral-300">Nama Proyek &amp; PO</th>
                <th className="p-2 font-bold w-32 border-r border-neutral-300">Klien / Customer</th>
                <th className="p-2 font-bold w-28 text-right border-r border-neutral-300">Nilai PO (IDR)</th>
                <th className="p-2 font-bold w-28 text-right border-r border-neutral-300">Kas Masuk (IDR)</th>
                <th className="p-2 font-bold w-24 text-right border-r border-neutral-300">Beban HPP (IDR)</th>
                <th className="p-2 font-bold w-28 text-right border-r border-neutral-300">Netto Laba</th>
                <th className="p-2 font-bold w-20 text-center">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-300">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-neutral-500 italic">
                    Belum ada data proyek terdaftar.
                  </td>
                </tr>
              ) : (
                items.map((project, idx) => {
                  const actualIdx = (pageIndex - 1) * itemsPerPage + idx + 1;
                  const fin = getProjectFinancialDetails(project);
                  const isProfit = fin.netProfit >= 0;

                  return (
                    <tr key={project.id || idx} className="hover:bg-neutral-50">
                      <td className="p-2 text-center font-mono text-neutral-700 border-r border-neutral-200">
                        {actualIdx}
                      </td>
                      <td className="p-2 border-r border-neutral-200">
                        <div className="font-semibold text-neutral-900 line-clamp-1">{project.projectName}</div>
                        <div className="text-[9px] text-neutral-600 font-mono font-normal">
                          {project.poNumber}
                        </div>
                      </td>
                      <td className="p-2 text-neutral-800 border-r border-neutral-200">
                        <div className="line-clamp-1">{project.customerName || '-'}</div>
                      </td>
                      <td className="p-2 text-right font-mono font-medium text-neutral-900 border-r border-neutral-200">
                        {formatRupiah(fin.contractValue)}
                      </td>
                      <td className="p-2 text-right font-mono text-neutral-900 border-r border-neutral-200">
                        <div>{formatRupiah(fin.totalCashInflowReceived)}</div>
                        <div className="text-[8.5px] text-neutral-500 font-mono">
                          {fin.downPaymentStatus === 'Received' && fin.finalPaymentStatus === 'Received'
                            ? 'Lunas 100%'
                            : fin.downPaymentStatus === 'Received'
                            ? `DP (${fin.downPaymentPercent}%)`
                            : 'Belum DP'}
                        </div>
                      </td>
                      <td className="p-2 text-right font-mono text-neutral-900 border-r border-neutral-200">
                        {formatRupiah(fin.totalCostOutflow)}
                      </td>
                      <td className="p-2 text-right font-mono font-bold text-neutral-950 border-r border-neutral-200">
                        {formatRupiah(fin.netProfit)}
                      </td>
                      <td className="p-2 text-center font-mono">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded border text-[9px] font-bold ${
                            isProfit
                              ? 'border-neutral-400 bg-neutral-100 text-neutral-950'
                              : 'border-red-400 bg-red-50 text-red-700'
                          }`}
                        >
                          {fin.netProfitMargin}%
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Tanda Tangan 3 Kolom Resmi Perusahaan (Disetujui, Diketahui, Dilaporkan) */}
        <div className="pt-5 grid grid-cols-3 gap-6 text-center text-xs page-break-inside-avoid">
          <div className="space-y-12">
            <div>
              <p className="font-semibold text-neutral-900">Disetujui Oleh,</p>
              <p className="text-[10px] text-neutral-600 font-mono">Direktur Operasional</p>
            </div>
            <div className="font-bold underline text-neutral-900">Ir. Andi Hartono</div>
          </div>
          <div className="space-y-12">
            <div>
              <p className="font-semibold text-neutral-900">Diketahui Oleh,</p>
              <p className="text-[10px] text-neutral-600 font-mono">Finance &amp; Accounting Head</p>
            </div>
            <div className="font-bold underline text-neutral-900">Linda Kusuma, SE</div>
          </div>
          <div className="space-y-12">
            <div>
              <p className="font-semibold text-neutral-900">Dilaporkan Oleh,</p>
              <p className="text-[10px] text-neutral-600 font-mono">Staff Keuangan &amp; Pajak</p>
            </div>
            <div className="font-bold underline text-neutral-900">Tim Keuangan PT. PTT</div>
          </div>
        </div>

        {/* Footer Dokumen Fisik */}
        <div className="mt-6 pt-2.5 border-t border-neutral-200 flex justify-between items-center text-[9px] text-neutral-500 font-mono">
          <span>PT. PRIMA TEKNIK TRADA - Dokumen Resmi Keuangan &amp; Laba Rugi Perusahaan</span>
          <span>Halaman {pageIndex} dari {totalPg}</span>
        </div>
      </div>
    );
  };

  // Potong data proyek per halaman
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const currentItems = projects.slice(startIndex, startIndex + itemsPerPage);

  // Potong semua data per 7 baris untuk opsi cetak 'all'
  const allPagesChunks: ProjectItem[][] = [];
  for (let i = 0; i < projects.length; i += itemsPerPage) {
    allPagesChunks.push(projects.slice(i, i + itemsPerPage));
  }
  if (allPagesChunks.length === 0) {
    allPagesChunks.push([]);
  }

  // Gunakan createPortal ke document.body agar element ini berdiri terpisah di luar #root.
  // Saat cetak, #root disembunyikan sepenuhnya (display: none !important) sehingga tidak ada
  // elemen admin, kartu navigasi, atau background dashboard yang tercetak!
  return createPortal(
    <div id="finance-print-portal" className="department-print-portal">
      <div className="department-print-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto">
        
        {/* Container Utama Cetak A4 */}
        <div className="print-report-container bg-white text-neutral-900 rounded-3xl border border-neutral-300 w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
          
          {/* Toolbar Header (Disembunyikan saat mencetak fisik / print:hidden) */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 print:hidden bg-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold shadow-xs">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Format Cetak Resmi A4 (Rekapitulasi Keuangan &amp; Laba Rugi)</h3>
                <p className="text-xs text-neutral-600">
                  Halaman {safeCurrentPage} dari {totalPages} ({projects.length} Total Proyek)
                </p>
              </div>
            </div>

            {/* Kontrol Navigasi & Opsi Cetak */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Opsi Cakupan Cetak: Halaman Aktif vs Semua Halaman */}
              <div className="flex items-center bg-white p-1 rounded-xl border border-neutral-300 text-xs">
                <button
                  type="button"
                  onClick={() => setPrintScope('current')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    printScope === 'current'
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  title="Cetak hanya halaman yang sedang dilihat (1 Lembar A4)"
                >
                  Halaman Ini (Hal {safeCurrentPage})
                </button>
                {totalPages > 1 && (
                  <button
                    type="button"
                    onClick={() => setPrintScope('all')}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      printScope === 'all'
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                    title={`Cetak seluruh ${totalPages} halaman data secara berurutan`}
                  >
                    Semua ({totalPages} Lembar)
                  </button>
                )}
              </div>

              {/* Tombol Paginasi Halaman Sebelumnya / Berikutnya */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-neutral-300">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={safeCurrentPage === 1}
                    className="p-1 rounded-lg hover:bg-neutral-100 disabled:opacity-30 text-neutral-800 cursor-pointer"
                    title="Halaman Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono font-bold px-1.5 text-neutral-800">
                    {safeCurrentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={safeCurrentPage === totalPages}
                    className="p-1 rounded-lg hover:bg-neutral-100 disabled:opacity-30 text-neutral-800 cursor-pointer"
                    title="Halaman Berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Tombol Aksi Cetak PDF */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Cetak PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
                  title="Tutup Pratinjau"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Area Lembar Cetak Dokumen Resmi */}
          <div className="overflow-y-auto flex-1 bg-neutral-200 print:bg-white print:overflow-visible">
            {/* Pada mode cetak browser: jika printScope === 'all', cetak semua lembar; jika 'current', hanya lembar aktif */}
            <div className="print:hidden">
              {/* Tampilan Pratinjau On-screen: Menampilkan halaman aktif */}
              {renderA4Sheet(currentItems, safeCurrentPage, totalPages, false)}
            </div>

            <div className="hidden print:block">
              {/* Tampilan Cetak Fisik & PDF */}
              {printScope === 'all'
                ? allPagesChunks.map((chunk, idx) =>
                    renderA4Sheet(chunk, idx + 1, totalPages, idx < allPagesChunks.length - 1)
                  )
                : renderA4Sheet(currentItems, safeCurrentPage, totalPages, false)}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
