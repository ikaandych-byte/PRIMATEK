import React from 'react';
import { COMPANY_INFO } from '../../data/company';
import { DepartmentMeta } from '../../utils/departmentDataUtils';
import { Printer, X } from 'lucide-react';
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
  if (!isOpen) return null;

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
      <div className="bg-white dark:bg-[#0d101a] text-slate-900 dark:text-neutral-100 rounded-3xl border border-slate-300 dark:border-neutral-700 w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Toolbar Header (Hidden when printing) */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between print:hidden bg-slate-50 dark:bg-[#121622]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Pratinjau Cetak Laporan Departemen</h3>
              <p className="text-xs text-neutral-400">Format resmi rekapitulasi data departemen {departmentMeta.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Cetak PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 bg-white dark:bg-[#0d101a] print:p-0 print:m-0">
          
          {/* Header Surat / Laporan (Kop Perusahaan Resmi) */}
          <div className="border-b-2 border-slate-900 dark:border-neutral-100 pb-5 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <PrimatechLogo forceDark={false} className="h-12 w-auto max-w-[200px] dark:brightness-200" />
              </div>
              <div className="space-y-0.5">
                <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase font-display">
                  {COMPANY_INFO.name}
                </h1>
                <p className="text-[11px] text-slate-600 dark:text-neutral-300 font-mono">
                  {COMPANY_INFO.address}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-neutral-300 font-mono">
                  Tel: {COMPANY_INFO.phone} | Email: {COMPANY_INFO.emailPrimary} | Web: {COMPANY_INFO.website}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0 space-y-1 font-mono text-xs">
              <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-neutral-800 font-bold text-slate-800 dark:text-neutral-200 inline-block border border-slate-300 dark:border-neutral-700">
                REKAP LAPORAN DEPARTEMEN
              </div>
              <div className="text-[11px] text-slate-500 dark:text-neutral-400">
                Tanggal: {currentDate}
              </div>
            </div>
          </div>

          {/* Title Departemen */}
          <div className="text-center space-y-1 py-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-display">
              LAPORAN KEMAJUAN &amp; REKAPITULASI {departmentMeta.label}
            </h2>
            <p className="text-xs text-slate-600 dark:text-neutral-400 font-mono">
              Cakupan Proyek: <span className="font-bold text-slate-900 dark:text-white">{selectedProjectName || 'Semua Proyek Aktif (All Projects)'}</span>
            </p>
          </div>

          {/* Data Summary Table */}
          <div className="border border-slate-300 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-neutral-900 text-slate-800 dark:text-neutral-200 font-mono uppercase tracking-wider border-b border-slate-300 dark:border-neutral-800">
                  <th className="p-3 font-bold w-12 text-center">No</th>
                  <th className="p-3 font-bold">Nama Proyek / PO</th>
                  <th className="p-3 font-bold">Rincian Pekerjaan / Task</th>
                  <th className="p-3 font-bold">PIC / Pelaksana</th>
                  <th className="p-3 font-bold">Target Tanggal</th>
                  <th className="p-3 font-bold text-center">Status / Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-neutral-800">
                {aggregatedItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-neutral-400 italic">
                      Belum ada data tercatat untuk departemen ini.
                    </td>
                  </tr>
                ) : (
                  aggregatedItems.map(({ project, item }, idx) => {
                    const taskName = item.taskName || item.componentName || item.itemName || item.docName || item.description || item.checkName || item.title || 'Pekerjaan Utama';
                    const picName = item.pic || item.designer || item.machinist || item.buyer || item.inspector || item.operator || item.assembler || item.driver || item.author || 'Tim Internal';
                    const deadline = item.targetDate || item.dueDate || item.deadline || item.date || '-';
                    const statusVal = item.status || item.verdict || 'Pending';

                    return (
                      <tr key={item.id || idx} className="hover:bg-slate-50/50 dark:hover:bg-neutral-950/50">
                        <td className="p-3 text-center font-mono text-neutral-500">{idx + 1}</td>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">
                          <div>{project.projectName}</div>
                          <div className="text-[10px] text-neutral-400 font-mono">{project.poNumber}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium text-slate-800 dark:text-neutral-200">{taskName}</div>
                          {item.notes && <div className="text-[10px] text-neutral-400 italic mt-0.5">{item.notes}</div>}
                        </td>
                        <td className="p-3 font-mono text-neutral-600 dark:text-neutral-300">{picName}</td>
                        <td className="p-3 font-mono text-neutral-600 dark:text-neutral-300">{deadline}</td>
                        <td className="p-3 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase ${
                            ['Approved', 'Completed', 'PASSED', 'FAT Approved', 'Delivered & Accepted'].includes(statusVal)
                              ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                          }`}>
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
                <p className="font-semibold text-slate-700 dark:text-neutral-300">Disetujui Oleh,</p>
                <p className="text-[10px] text-neutral-400 font-mono">Direktur Operasional</p>
              </div>
              <div className="font-bold underline text-slate-900 dark:text-white">Ir. Andi Hartono</div>
            </div>
            <div className="space-y-16">
              <div>
                <p className="font-semibold text-slate-700 dark:text-neutral-300">Diketahui Oleh,</p>
                <p className="text-[10px] text-neutral-400 font-mono">Kepala Pabrik (Plant Head)</p>
              </div>
              <div className="font-bold underline text-slate-900 dark:text-white">Dedi Setiawan, ST</div>
            </div>
            <div className="space-y-16">
              <div>
                <p className="font-semibold text-slate-700 dark:text-neutral-300">Dilaporkan Oleh,</p>
                <p className="text-[10px] text-neutral-400 font-mono">Kepala {departmentMeta.label}</p>
              </div>
              <div className="font-bold underline text-slate-900 dark:text-white">Tim Penanggung Jawab</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
