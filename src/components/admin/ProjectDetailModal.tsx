import React from 'react';
import {
  X,
  Calendar,
  Building2,
  Tag,
  CheckCircle2,
  Clock,
  Lock,
  DollarSign,
  FileText,
  User,
  History,
  Camera,
  Truck,
  Receipt,
} from 'lucide-react';
import { ProjectItem } from '../../types/backend';
import { useTheme } from '../../context/ThemeContext';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isAdmin: boolean;
  onClose: () => void;
  onOpenPhotoPreview?: (photo: any) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isAdmin,
  onClose,
  onOpenPhotoPreview,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!project) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-6 transition-all max-h-[92vh] flex flex-col ${
          isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 shrink-0" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-inherit flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-amber-400/15 border border-amber-400/30 text-amber-400">
                {project.poNumber}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
                {project.category}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                  project.status === 'Completed'
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/15 border border-red-500/30 text-red-400'
                }`}
              >
                {project.status}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black font-display text-slate-100">
              {project.projectName}
            </h2>
            <p className="text-xs text-neutral-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-500" />
              <span>{project.customerName}</span>
              <span>•</span>
              <span className="font-mono">{project.customerEmail}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 scrollbar-thin">
          {/* Progress Bar & Key Stats */}
          <div
            className={`p-4 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-4 ${
              isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-neutral-400">Progres Manufaktur</span>
                <span className="font-bold text-amber-400">{project.progressPercent}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-red-600 h-full rounded-full transition-all"
                  style={{ width: `${project.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="text-xs">
              <span className="text-neutral-400 block font-mono text-[11px]">Timeline Pengerjaan:</span>
              <div className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>Mulai: {project.startDate}</span>
              </div>
              <div className="text-neutral-400 text-[11px]">
                Target Selesai: <span className="text-amber-400 font-semibold">{project.targetCompletionDate}</span>
              </div>
            </div>

            <div className="text-xs">
              <span className="text-neutral-400 block font-mono text-[11px]">PIC Engineer Bertanggung Jawab:</span>
              <div className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span className="truncate">{project.picEngineer}</span>
              </div>
            </div>
          </div>

          {/* Financial Section - ONLY VISIBLE TO ADMINISTRATOR */}
          <div
            className={`p-4 rounded-2xl border ${
              isAdmin
                ? isDark
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-emerald-50 border-emerald-200'
                : isDark
                ? 'bg-neutral-900/40 border-neutral-800'
                : 'bg-slate-100 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isAdmin ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {isAdmin ? <DollarSign className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-300">
                    Nilai Kontrak &amp; Finansial Project
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    {isAdmin
                      ? 'Otorisasi Penuh Administrator (Full Access)'
                      : 'Akses Dibatasi — Hanya Administrator yang berhak melihat nilai nominal uang'}
                  </p>
                </div>
              </div>

              {isAdmin ? (
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">Total Nilai Kontrak PO</span>
                  <span className="text-lg sm:text-xl font-black font-display text-emerald-400">
                    {formatRupiah(project.contractValue)}
                  </span>
                </div>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>Enkripsi / Restricted</span>
                </span>
              )}
            </div>
          </div>

          {/* Description & Technical Specs */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Deskripsi Spesifikasi Teknis Mesin</span>
            </h4>
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                isDark ? 'bg-neutral-900/50 border-neutral-800 text-neutral-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {project.description}
            </div>
          </div>

          {/* Milestones Schedule */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Tahapan &amp; Milestone Pengerjaan Pabrik</span>
            </h4>
            <div className="space-y-2.5">
              {project.milestones.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                    m.status === 'completed'
                      ? 'border-emerald-500/20 bg-emerald-500/5'
                      : m.status === 'in-progress'
                      ? 'border-amber-500/30 bg-amber-500/5'
                      : isDark
                      ? 'border-neutral-800 bg-neutral-900/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {m.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : m.status === 'in-progress' ? (
                        <Clock className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-neutral-600 flex items-center justify-center text-[9px] text-neutral-500">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-slate-200 flex items-center gap-2">
                        <span>{m.title}</span>
                        {m.department && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-amber-400 border border-neutral-700">
                            Dept: {m.department}
                          </span>
                        )}
                      </div>
                      {m.notes && <p className="text-[11px] text-neutral-400 mt-1">{m.notes}</p>}
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono text-[11px]">
                    <span className="text-neutral-400 block">Target: {m.targetDate}</span>
                    {m.completedDate && (
                      <span className="text-emerald-400 block font-semibold">Selesai: {m.completedDate}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Photos */}
          {project.photos && project.photos.length > 0 && (
            <div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                <span>Dokumentasi Foto Pengerjaan ({project.photos.length})</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.photos.map((ph) => (
                  <div
                    key={ph.id}
                    onClick={() => onOpenPhotoPreview && onOpenPhotoPreview(ph)}
                    className="group relative rounded-xl overflow-hidden border border-neutral-800 aspect-video cursor-pointer"
                  >
                    <img
                      src={ph.imageUrl}
                      alt={ph.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                      <span className="text-[10px] font-mono text-amber-400 truncate">{ph.category}</span>
                      <p className="text-xs font-bold truncate">{ph.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery & Invoice Details if Completed */}
          {project.status === 'Completed' && (project.invoice || project.delivery) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.invoice && (
                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <Receipt className="w-4 h-4" />
                    <h5 className="text-xs font-bold font-mono uppercase">Status Invoice Tagihan</h5>
                  </div>
                  <div className="text-xs space-y-1 font-mono text-neutral-300">
                    <div>No. Invoice: <span className="text-amber-400 font-bold">{project.invoice.invoiceNumber}</span></div>
                    <div>Status: <span className="text-emerald-400 font-bold">{project.invoice.status}</span></div>
                    {isAdmin && <div>Nilai Pelunasan: {formatRupiah(project.invoice.totalAmount)}</div>}
                  </div>
                </div>
              )}

              {project.delivery && (
                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 text-blue-400">
                    <Truck className="w-4 h-4" />
                    <h5 className="text-xs font-bold font-mono uppercase">Pengiriman &amp; Surat Jalan (DO)</h5>
                  </div>
                  <div className="text-xs space-y-1 font-mono text-neutral-300">
                    <div>No. DO: <span className="text-amber-400 font-bold">{project.delivery.doNumber}</span></div>
                    <div>Armada: {project.delivery.expedition}</div>
                    <div>Status: <span className="text-emerald-400 font-bold">{project.delivery.status}</span></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Activity Logs */}
          {project.activityLogs && project.activityLogs.length > 0 && (
            <div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span>Riwayat Log Aktivitas Lapangan</span>
              </h4>
              <div className="space-y-2">
                {project.activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                      isDark ? 'bg-neutral-900/40 border-neutral-800/80' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-amber-500 shrink-0 mt-0.5">{log.timestamp}</span>
                    <div>
                      <span className="font-bold text-slate-200">{log.actor}: </span>
                      <span className="text-neutral-400">{log.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-inherit flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            Tutup Detail
          </button>
        </div>
      </div>
    </div>
  );
};
