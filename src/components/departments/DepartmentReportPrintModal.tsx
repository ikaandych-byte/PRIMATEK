import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { COMPANY_INFO } from '../../data/company';
import { DepartmentMeta } from '../../utils/departmentDataUtils';
import { Printer, X, ChevronLeft, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import { PrimatechLogo } from '../PrimatechLogo';

interface DepartmentReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentMeta: DepartmentMeta;
  aggregatedItems: { project: any; item: any }[];
  selectedProjectName?: string;
}

export const DepartmentReportPrintModal: React.FC<DepartmentReportPrintModalProps> = ({
  isOpen,
  onClose,
  departmentMeta,
  aggregatedItems,
  selectedProjectName,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [printScope, setPrintScope] = useState<'current' | 'all'>('current');
  const itemsPerPage = 8; // Tepat 8 baris per halaman agar 100% muat pas dalam 1 lembar A4 portrait tanpa scroll/overflow

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

  const totalPages = Math.ceil(aggregatedItems.length / itemsPerPage) || 1;

  // Pastikan currentPage dalam rentang valid
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Render satu lembar A4 untuk rentang data tertentu
  const renderA4Sheet = (
    items: { project: any; item: any }[],
    pageIndex: number,
    totalPg: number,
    isBreakAfter: boolean = false
  ) => {
    return (
      <div
        key={`page-${pageIndex}`}
        className={`print-sheet bg-white text-neutral-900 p-8 sm:p-10 font-sans text-xs ${
          isBreakAfter ? 'print-sheet-break' : ''
        }`}
      >
        {/* Header Kop Perusahaan Resmi */}
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
              REKAPITULASI LAPORAN
            </div>
            <div className="text-[10px] text-neutral-600">
              Tanggal: {currentDate}
            </div>
            <div className="text-[10px] text-neutral-700 font-bold">
              Hal {pageIndex} dari {totalPg}
            </div>
          </div>
        </div>

        {/* Title Departemen: Bersih hanya nama proses departemen tanpa 'REKAP CETAKLABARUGI&KEMAJUAN' */}
        <div className="text-center py-3 space-y-0.5">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-neutral-900 font-display">
            LAPORAN KEMAJUAN &amp; REKAPITULASI: {departmentMeta.label.toUpperCase()}
          </h2>
          <p className="text-[11px] text-neutral-600 font-mono">
            Cakupan Proyek: <span className="font-bold text-neutral-900">{selectedProjectName || 'Semua Proyek Aktif (All Projects)'}</span>
          </p>
        </div>

        {/* Tabel Data Rekap (Maksimal 8 Baris per Halaman) */}
        <div className="border border-neutral-400 rounded-lg overflow-hidden my-2">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-neutral-100 text-neutral-950 font-mono uppercase tracking-wider border-b-2 border-neutral-900">
                <th className="p-2 font-bold w-10 text-center border-r border-neutral-300">No</th>
                <th className="p-2 font-bold w-48 border-r border-neutral-300">Nama Proyek / PO</th>
                <th className="p-2 font-bold border-r border-neutral-300">Rincian Pekerjaan / Task</th>
                <th className="p-2 font-bold w-32 border-r border-neutral-300">PIC / Pelaksana</th>
                <th className="p-2 font-bold w-24 border-r border-neutral-300">Target</th>
                <th className="p-2 font-bold w-24 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-300">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500 italic">
                    Belum ada data pekerjaan untuk departemen ini.
                  </td>
                </tr>
              ) : (
                items.map(({ project, item }, idx) => {
                  const actualIdx = (pageIndex - 1) * itemsPerPage + idx + 1;
                  const taskName =
                    item.taskName ||
                    item.componentName ||
                    item.itemName ||
                    item.docName ||
                    item.description ||
                    item.checkName ||
                    item.title ||
                    'Pekerjaan Utama';
                  const picName =
                    item.pic ||
                    item.designer ||
                    item.machinist ||
                    item.buyer ||
                    item.inspector ||
                    item.operator ||
                    item.assembler ||
                    item.driver ||
                    item.author ||
                    'Tim Internal';
                  const deadline =
                    item.targetDate || item.dueDate || item.deadline || item.date || '-';
                  const statusVal = item.status || item.verdict || 'Pending';

                  return (
                    <tr key={item.id || idx} className="hover:bg-neutral-50">
                      <td className="p-2 text-center font-mono text-neutral-700 border-r border-neutral-200">
                        {actualIdx}
                      </td>
                      <td className="p-2 font-semibold text-neutral-900 border-r border-neutral-200">
                        <div className="line-clamp-1">{project.projectName}</div>
                        <div className="text-[9px] text-neutral-600 font-mono font-normal">
                          {project.poNumber}
                        </div>
                      </td>
                      <td className="p-2 border-r border-neutral-200">
                        <div className="font-medium text-neutral-900 line-clamp-1">{taskName}</div>
                        {item.notes && (
                          <div className="text-[9px] text-neutral-600 italic line-clamp-1 mt-0.5">
                            {item.notes}
                          </div>
                        )}
                      </td>
                      <td className="p-2 font-mono text-neutral-800 border-r border-neutral-200">
                        {picName}
                      </td>
                      <td className="p-2 font-mono text-neutral-800 border-r border-neutral-200">
                        {deadline}
                      </td>
                      <td className="p-2 text-center font-mono">
                        <span className="inline-block px-2 py-0.5 rounded border border-neutral-400 bg-neutral-100 text-neutral-900 font-bold text-[9px]">
                          {statusVal}
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
        <div className="pt-6 grid grid-cols-3 gap-6 text-center text-xs page-break-inside-avoid">
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
              <p className="text-[10px] text-neutral-600 font-mono">Kepala Pabrik (Plant Head)</p>
            </div>
            <div className="font-bold underline text-neutral-900">Dedi Setiawan, ST</div>
          </div>
          <div className="space-y-12">
            <div>
              <p className="font-semibold text-neutral-900">Dilaporkan Oleh,</p>
              <p className="text-[10px] text-neutral-600 font-mono">Kepala {departmentMeta.label}</p>
            </div>
            <div className="font-bold underline text-neutral-900">Tim Penanggung Jawab</div>
          </div>
        </div>

        {/* Footer Dokumen Fisik */}
        <div className="mt-8 pt-3 border-t border-neutral-200 flex justify-between items-center text-[9px] text-neutral-500 font-mono">
          <span>PT. PRIMA TEKNIK TRADA - Dokumen Resmi Departemen</span>
          <span>Halaman {pageIndex} dari {totalPg}</span>
        </div>
      </div>
    );
  };

  // Persiapan data yang akan dicetak
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const currentItems = aggregatedItems.slice(startIndex, startIndex + itemsPerPage);

  // Potong semua data per 8 baris jika opsi cetak 'all' dipilih
  const allPagesChunks: { project: any; item: any }[][] = [];
  for (let i = 0; i < aggregatedItems.length; i += itemsPerPage) {
    allPagesChunks.push(aggregatedItems.slice(i, i + itemsPerPage));
  }
  if (allPagesChunks.length === 0) {
    allPagesChunks.push([]);
  }

  // Gunakan createPortal ke document.body agar element ini berdiri terpisah di luar #root.
  // Saat cetak, #root disembunyikan sepenuhnya (display: none !important) sehingga tidak ada
  // elemen admin, kartu navigasi, atau background dashboard yang tercetak!
  return createPortal(
    <div id="department-print-portal" className="department-print-portal">
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
                <h3 className="text-base font-bold text-neutral-900">Format Cetak Resmi A4 (Laporan Departemen)</h3>
                <p className="text-xs text-neutral-600">
                  Halaman {safeCurrentPage} dari {totalPages} ({aggregatedItems.length} Total Baris)
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
