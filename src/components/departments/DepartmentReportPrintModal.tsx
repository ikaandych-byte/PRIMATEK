import React, { useState } from 'react';
import { COMPANY_INFO } from '../../data/company';
import { DepartmentMeta } from '../../utils/departmentDataUtils';
import { Printer, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const itemsPerPage = 8; // Maksimal 8 baris per halaman A4 agar proporsional dan tidak terpotong

  if (!isOpen) return null;

  const totalPages = Math.ceil(aggregatedItems.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = aggregatedItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      {/* Container A4 standard berlatar putih bersih dengan teks hitam tegas */}
      <div className="bg-white text-neutral-900 rounded-3xl border border-neutral-300 w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Modal Toolbar Header & Pagination Controls (Hidden when printing) */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 print:hidden bg-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Format Cetak Resmi A4 (Laporan Departemen)</h3>
              <p className="text-xs text-neutral-600">Halaman {currentPage} dari {totalPages} ({aggregatedItems.length} Total Data)</p>
            </div>
          </div>

          {/* Pagination Prev / Next Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-neutral-300 shadow-2xs">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg hover:bg-neutral-100 disabled:opacity-30 text-neutral-800 cursor-pointer"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold px-2">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg hover:bg-neutral-100 disabled:opacity-30 text-neutral-800 cursor-pointer"
                title="Halaman Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Cetak PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-neutral-200 text-neutral-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Body (A4 Style, White bg, Black text, Exact pagination fit) */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-6 bg-white text-neutral-900 print:p-0 print:m-0 font-sans">
          
          {/* Header Kop Perusahaan */}
          <div className="border-b-2 border-neutral-900 pb-5 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <PrimatechLogo forceDark={false} className="h-12 w-auto max-w-[200px]" />
              </div>
              <div className="space-y-0.5">
                <h1 className="text-xl font-black tracking-tight text-neutral-900 uppercase font-display">
                  {COMPANY_INFO.name}
                </h1>
                <p className="text-[11px] text-neutral-700 font-mono">
                  {COMPANY_INFO.address}
                </p>
                <p className="text-[11px] text-neutral-700 font-mono">
                  Tel: {COMPANY_INFO.phone} | Email: {COMPANY_INFO.emailPrimary} | Web: {COMPANY_INFO.website}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0 space-y-1 font-mono text-xs">
              <div className="px-3 py-1 rounded-lg bg-neutral-100 font-bold text-neutral-900 inline-block border border-neutral-300">
                REKAPITULASI LAPORAN
              </div>
              <div className="text-[11px] text-neutral-600">
                Tanggal: {currentDate} | Hal: {currentPage} dari {totalPages}
              </div>
            </div>
          </div>

          {/* Title Departemen */}
          <div className="text-center space-y-1.5 py-3">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 font-display">
              LAPORAN KEMAJUAN &amp; REKAPITULASI {departmentMeta.label}
            </h2>
            <p className="text-xs text-neutral-600 font-mono">
              Cakupan Proyek: <span className="font-bold text-neutral-900">{selectedProjectName || 'Semua Proyek Aktif (All Projects)'}</span>
            </p>
          </div>

          {/* Data Summary Table (Paginated to fit exactly 1 A4 page layout per view) */}
          <div className="border border-neutral-300 rounded-xl overflow-hidden shadow-xs min-h-[320px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-100 text-neutral-900 font-mono uppercase tracking-wider border-b border-neutral-300">
                  <th className="p-3 font-bold w-12 text-center text-neutral-900">No</th>
                  <th className="p-3 font-bold text-neutral-900">Nama Proyek / PO</th>
                  <th className="p-3 font-bold text-neutral-900">Rincian Pekerjaan / Task</th>
                  <th className="p-3 font-bold text-neutral-900">PIC / Pelaksana</th>
                  <th className="p-3 font-bold text-neutral-900">Target Tanggal</th>
                  <th className="p-3 font-bold text-center text-neutral-900">Status / Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-neutral-500 italic">
                      Belum ada data tercatat untuk departemen ini.
                    </td>
                  </tr>
                ) : (
                  currentItems.map(({ project, item }, idx) => {
                    const actualIdx = (currentPage - 1) * itemsPerPage + idx + 1;
                    const taskName = item.taskName || item.componentName || item.itemName || item.docName || item.description || item.checkName || item.title || 'Pekerjaan Utama';
                    const picName = item.pic || item.designer || item.machinist || item.buyer || item.inspector || item.operator || item.assembler || item.driver || item.author || 'Tim Internal';
                    const deadline = item.targetDate || item.dueDate || item.deadline || item.date || '-';
                    const statusVal = item.status || item.verdict || 'Pending';

                    return (
                      <tr key={item.id || idx} className="hover:bg-neutral-50">
                        <td className="p-3 text-center font-mono text-neutral-700">{actualIdx}</td>
                        <td className="p-3 font-semibold text-neutral-900">
                          <div>{project.projectName}</div>
                          <div className="text-[10px] text-neutral-600 font-mono">{project.poNumber}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium text-neutral-900">{taskName}</div>
                          {item.notes && <div className="text-[10px] text-neutral-600 italic mt-0.5">{item.notes}</div>}
                        </td>
                        <td className="p-3 font-mono text-neutral-800">{picName}</td>
                        <td className="p-3 font-mono text-neutral-800">{deadline}</td>
                        <td className="p-3 text-center font-mono">
                          <span className="inline-block px-2.5 py-1 rounded border border-neutral-400 bg-neutral-100 text-neutral-900 font-bold text-[10px]">
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

          {/* Signature Block */}
          <div className="pt-10 grid grid-cols-3 gap-8 text-center text-xs page-break-inside-avoid">
            <div className="space-y-16">
              <div>
                <p className="font-semibold text-neutral-800">Disetujui Oleh,</p>
                <p className="text-[10px] text-neutral-600 font-mono">Direktur Operasional</p>
              </div>
              <div className="font-bold underline text-neutral-900">Ir. Andi Hartono</div>
            </div>
            <div className="space-y-16">
              <div>
                <p className="font-semibold text-neutral-800">Diketahui Oleh,</p>
                <p className="text-[10px] text-neutral-600 font-mono">Kepala Pabrik (Plant Head)</p>
              </div>
              <div className="font-bold underline text-neutral-900">Dedi Setiawan, ST</div>
            </div>
            <div className="space-y-16">
              <div>
                <p className="font-semibold text-neutral-800">Dilaporkan Oleh,</p>
                <p className="text-[10px] text-neutral-600 font-mono">Kepala {departmentMeta.label}</p>
              </div>
              <div className="font-bold underline text-neutral-900">Tim Penanggung Jawab</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
