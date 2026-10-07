import React, { useState } from 'react';
import {
  FolderKanban,
  CalendarClock,
  Images,
  ArrowLeft,
  LogOut,
  Building2,
  Clock,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  MapPin,
  Lock,
  MessageSquare,
  KeyRound,
  ExternalLink,
  ChevronRight,
  Eye,
  Download,
  Truck,
  Receipt,
  Printer,
  DollarSign,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProjectData } from '../context/ProjectDataContext';
import { useTheme } from '../context/ThemeContext';
import { PrimatechLogo } from '../components/PrimatechLogo';
import { ProjectItem, ProjectPhoto } from '../types/backend';
import { COMPANY_INFO } from '../data/company';

interface CustomerPortalPageProps {
  onBackToHome: () => void;
  onOpenBackendAdmin?: () => void;
}

export const CustomerPortalPage: React.FC<CustomerPortalPageProps> = ({
  onBackToHome,
  onOpenBackendAdmin,
}) => {
  const { user, logout, updatePassword, isInternalStaff } = useAuth();
  const { projects, getProjectsByCustomer, updateCustomerPassword } = useProjectData();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // State
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState<ProjectPhoto | null>(null);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [finishModalTab, setFinishModalTab] = useState<'invoice' | 'delivery'>('invoice');
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filter projects for the logged-in customer and sort by newest order first
  const customerEmailOrId = user?.email || user?.id || '';
  const rawProjects = user?.userType === 'customer'
    ? getProjectsByCustomer(customerEmailOrId)
    : projects; // if staff views this preview, show all projects

  // Sort by newest order first (startDate descending)
  const myProjects = [...rawProjects].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const [activeProjectId, setActiveProjectId] = useState<string>('');
  const activeProject = myProjects.find((p) => p.id === activeProjectId) || myProjects[0];
  const isProjectFinished = Boolean(
    activeProject && (activeProject.progressPercent >= 100 || activeProject.status === 'Completed')
  );

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPasswordVal.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Kata sandi minimal 6 karakter.' });
      return;
    }

    if (newPasswordVal !== confirmPasswordVal) {
      setPasswordMsg({ type: 'error', text: 'Konfirmasi kata sandi tidak cocok.' });
      return;
    }

    if (user?.id) {
      updateCustomerPassword(user.id, newPasswordVal);
      await updatePassword(newPasswordVal);
      setPasswordMsg({ type: 'success', text: 'Kata sandi berhasil diperbarui!' });
      setTimeout(() => {
        setIsChangePasswordOpen(false);
        setNewPasswordVal('');
        setConfirmPasswordVal('');
        setPasswordMsg(null);
      }, 1500);
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-[#080b11] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Navbar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md ${
          isDark ? 'bg-[#0c101a]/95 border-neutral-800' : 'bg-white/95 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 sm:gap-6">
              <button
                onClick={onBackToHome}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                }`}
                title="Kembali ke Website Utama"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Website Utama</span>
              </button>

              <div className="flex items-center gap-2">
                <PrimatechLogo className="h-8 w-auto max-w-[150px]" />
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  Client Portal
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {isInternalStaff && onOpenBackendAdmin && (
                <button
                  onClick={onOpenBackendAdmin}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold cursor-pointer hover:bg-amber-500 hover:text-neutral-950 transition-colors"
                >
                  <span>Buka Backend Admin</span>
                </button>
              )}

              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900'
                }`}
                title="Ganti Password Akun Customer"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                <span>Ganti Password</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  window.location.hash = '';
                  onBackToHome();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
                title="Keluar dari Portal Customer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
        {/* Customer Welcome & Identity Card */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
            isDark
              ? 'bg-gradient-to-br from-[#0f141f] via-[#0c101a] to-[#080b11] border-neutral-800'
              : 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border-slate-200 shadow-md'
          }`}
        >
          {/* Subtle Top Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-red-600 text-neutral-950 flex items-center justify-center font-black text-xl font-display shadow-lg shadow-red-600/20 shrink-0">
                {user?.company.replace('PT. ', '').slice(0, 2).toUpperCase() || 'CU'}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-amber-500">
                    Akun Rekanan Klien Terverifikasi
                  </span>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Aktif
                  </div>
                </div>
                <h1 className="text-xl sm:text-2xl font-black font-display text-slate-100">
                  {user?.company || 'PT. Customer Partner'}
                </h1>
                <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <span>PIC: {user?.name || 'Contact Person'}</span>
                  <span>•</span>
                  <span>{user?.sector || 'Industrial Manufacturing'}</span>
                </p>
              </div>
            </div>

            {/* Quick Contact & Password Helper */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className={`p-3 rounded-2xl border text-xs space-y-1 ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{user?.phone || '+62 812-xxxx-xxxx'}</span>
                </div>
              </div>

              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="px-4 py-2.5 rounded-xl border border-neutral-700 hover:border-amber-400 text-xs font-bold text-neutral-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Ganti Password</span>
              </button>
            </div>
          </div>
        </div>

        {/* Project Selector Tabs if customer has multiple projects */}
        {myProjects.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-black font-display">
                  Orderan Project Manufaktur Anda ({myProjects.length})
                </h2>
                <p className="text-xs text-neutral-400">
                  Pilih project untuk melihat live status pengerjaan, milestone schedule dan foto terupdate
                </p>
              </div>
            </div>

            {/* Project Tabs Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {myProjects.map((p) => {
                const isSelected = p.id === activeProject?.id;
                const isDone = p.progressPercent >= 100 || p.status === 'Completed';

                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveProjectId(p.id)}
                    className={`p-3.5 rounded-2xl border text-left min-w-[250px] sm:min-w-[290px] transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? isDark
                          ? 'bg-[#121826] border-red-500 shadow-md ring-1 ring-red-500/30'
                          : 'bg-white border-red-600 shadow-md ring-1 ring-red-600/30'
                        : isDark
                        ? 'bg-[#0f141f] border-neutral-800 opacity-70 hover:opacity-100'
                        : 'bg-white border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="font-bold text-amber-500">{p.poNumber}</span>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Finish 100%
                        </span>
                      ) : (
                        <span className="font-extrabold text-slate-100">{p.progressPercent}%</span>
                      )}
                    </div>
                    <div className="text-xs font-bold font-display truncate text-slate-100">
                      {p.projectName}
                    </div>
                    <div className="mt-2 w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDone
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-amber-400 to-red-600'
                        }`}
                        style={{ width: `${p.progressPercent}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Banner Finish (100% Selesai: Tampilkan Tagihan Invoice & Pengiriman) */}
            {activeProject && isProjectFinished && (
              <div
                className={`p-5 sm:p-6 rounded-3xl border relative overflow-hidden transition-all ${
                  isDark
                    ? 'bg-gradient-to-r from-emerald-950/40 via-[#0d161d] to-[#0f141f] border-emerald-500/50 shadow-xl shadow-emerald-950/20'
                    : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-emerald-400 shadow-lg'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500" />
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-neutral-950 flex items-center justify-center font-black text-2xl shadow-md shadow-emerald-500/30 shrink-0">
                      ✓
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 uppercase tracking-wide">
                          STATUS 100% SELESAI
                        </span>
                        <span className="text-xs text-neutral-400 font-mono">
                          Factory Acceptance Test &amp; Commissioning Lulus
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-black font-display text-slate-100">
                        Orderan Telah Selesai 100% &amp; Siap / Telah Diserahterimakan
                      </h4>
                      <p className="text-xs text-neutral-300 max-w-xl leading-relaxed">
                        Faktur invoice pelunasan pembayaran PT. Prima Teknik Trada dan dokumen surat jalan proses pengiriman barang (DO &amp; BAST) telah resmi diterbitkan.
                      </p>
                    </div>
                  </div>

                  {/* Tombol Finish */}
                  <div className="flex flex-wrap sm:flex-nowrap gap-2.5 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setFinishModalTab('invoice');
                        setIsFinishModalOpen(true);
                      }}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/30 cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Receipt className="w-4 h-4 text-neutral-950" />
                      <span>Tagihan Invoice</span>
                    </button>
                    <button
                      onClick={() => {
                        setFinishModalTab('delivery');
                        setIsFinishModalOpen(true);
                      }}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500 hover:text-neutral-950 text-emerald-300 font-black text-xs uppercase tracking-wider transition-all cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Proses Pengiriman</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Active Project Detail Section */}
            {activeProject && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Status, Progress & Milestones */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Project Overview Card */}
                  <div
                    className={`p-6 sm:p-7 rounded-3xl border space-y-5 ${
                      isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-500">
                            {activeProject.poNumber}
                          </span>
                          <span className="text-neutral-500">•</span>
                          <span className="text-xs text-neutral-400 font-mono">{activeProject.category}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black font-display text-slate-100 mt-1">
                          {activeProject.projectName}
                        </h3>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto bg-amber-400/15 border border-amber-400/30 text-amber-400">
                        <span>{activeProject.status}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {activeProject.description}
                    </p>

                    {/* Progress Bar & Key Dates */}
                    <div
                      className={`p-4 rounded-2xl border space-y-3 ${
                        isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-400">Kemajuan Pengerjaan Fisik Mesin</span>
                        <span className="text-base font-black text-amber-400 font-display">
                          {activeProject.progressPercent}% Selesai
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 h-full rounded-full transition-all duration-700"
                          style={{ width: `${activeProject.progressPercent}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px] font-mono text-neutral-400">
                        <div>
                          <span>Mulai Pengerjaan:</span>
                          <div className="font-bold text-slate-200">{activeProject.startDate}</div>
                        </div>
                        <div>
                          <span>Target Pengiriman:</span>
                          <div className="font-bold text-slate-200">{activeProject.targetCompletionDate}</div>
                        </div>
                        <div>
                          <span>PIC Engineer PTT:</span>
                          <div className="font-bold text-amber-500 truncate">{activeProject.picEngineer.split(' ')[0]}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Progress Milestones Timeline */}
                  <div
                    className={`p-6 sm:p-7 rounded-3xl border space-y-4 ${
                      isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold font-display">Tahapan &amp; Milestone Pengerjaan</h4>
                        <p className="text-xs text-neutral-400">Alur manufaktur dari approval desain hingga FAT &amp; pengiriman</p>
                      </div>
                      <CalendarClock className="w-5 h-5 text-amber-500" />
                    </div>

                    <div className="space-y-4 pt-2">
                      {activeProject.milestones.map((m, idx) => (
                        <div key={m.id} className="flex items-start gap-3.5">
                          <div className="mt-0.5">
                            {m.status === 'completed' ? (
                              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                            ) : m.status === 'in-progress' ? (
                              <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400 animate-pulse">
                                <Clock className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border border-neutral-700 flex items-center justify-center text-[10px] font-mono text-neutral-500">
                                {idx + 1}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 pb-3 border-b border-inherit">
                            <div className="flex flex-wrap items-center justify-between gap-1">
                              <span
                                className={`text-xs font-bold ${
                                  m.status === 'completed'
                                    ? 'text-slate-100'
                                    : m.status === 'in-progress'
                                    ? 'text-amber-400'
                                    : 'text-neutral-500'
                                }`}
                              >
                                {m.title}
                              </span>
                              <span className="text-[10px] font-mono text-neutral-400">
                                {m.completedDate ? `Selesai: ${m.completedDate}` : `Target: ${m.targetDate}`}
                              </span>
                            </div>
                            {m.notes && (
                              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                                {m.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dokumen Tagihan Invoice & Pengiriman Barang (Jika Status 100% Selesai) */}
                  {isProjectFinished && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Card Tagihan Invoice */}
                      <div
                        className={`p-5 sm:p-6 rounded-3xl border ${
                          isDark ? 'bg-[#0f141f] border-emerald-500/30' : 'bg-white border-emerald-300 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                            <Receipt className="w-4 h-4" />
                            <span>TAGIHAN INVOICE RESMI</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                            {activeProject.invoice?.status || 'Paid Full'}
                          </span>
                        </div>
                        <div className="space-y-1.5 text-xs font-mono">
                          <div className="flex justify-between text-neutral-400">
                            <span>No. Invoice:</span>
                            <span className="font-bold text-slate-200">
                              {activeProject.invoice?.invoiceNumber || 'INV/PTT/2026/09-0781'}
                            </span>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Nilai Kontrak:</span>
                            <span className="font-bold text-emerald-400">
                              {formatRupiah(activeProject.contractValue)}
                            </span>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Rekening PTT:</span>
                            <span className="text-slate-300">BCA 542-089-7700</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setFinishModalTab('invoice');
                            setIsFinishModalOpen(true);
                          }}
                          className="w-full mt-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 text-emerald-400 hover:text-neutral-950 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Rincian Tagihan Invoice Lengkap →</span>
                        </button>
                      </div>

                      {/* Card Pengiriman Barang */}
                      <div
                        className={`p-5 sm:p-6 rounded-3xl border ${
                          isDark ? 'bg-[#0f141f] border-blue-500/30' : 'bg-white border-blue-300 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs font-mono">
                            <Truck className="w-4 h-4" />
                            <span>SURAT JALAN &amp; DO</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/15 border border-blue-500/30 text-blue-400">
                            Delivered &amp; BAST
                          </span>
                        </div>
                        <div className="space-y-1.5 text-xs font-mono">
                          <div className="flex justify-between text-neutral-400">
                            <span>No. Surat Jalan:</span>
                            <span className="font-bold text-slate-200">
                              {activeProject.delivery?.doNumber || 'DO/PTT-LOG/2026/09-088'}
                            </span>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Armada PTT:</span>
                            <span className="text-slate-300 truncate max-w-[150px]">
                              {activeProject.delivery?.expedition || 'Truk Towing PTT Logistics'}
                            </span>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Driver:</span>
                            <span className="text-slate-300">
                              {activeProject.delivery?.driverName || 'Sutrisno'}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setFinishModalTab('delivery');
                            setIsFinishModalOpen(true);
                          }}
                          className="w-full mt-4 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500 border border-blue-500/30 text-blue-400 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Rincian Surat Jalan &amp; BAST →</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Activity Log from Engineering Team */}
                  {activeProject.activityLogs && activeProject.activityLogs.length > 0 && (
                    <div
                      className={`p-6 rounded-3xl border space-y-3 ${
                        isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
                      }`}
                    >
                      <h4 className="text-sm font-bold font-display">Catatan Progres Lapangan Terkini</h4>
                      <div className="space-y-2.5">
                        {activeProject.activityLogs.map((log) => (
                          <div
                            key={log.id}
                            className={`p-3 rounded-xl border text-xs space-y-1 ${
                              isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                              <span className="text-amber-500 font-bold">{log.actor}</span>
                              <span>{log.timestamp}</span>
                            </div>
                            <div className="font-semibold text-slate-200">{log.action}</div>
                            <div className="text-neutral-400 text-[11px]">{log.detail}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right 1 Col: Live Updated Project Photos & Support */}
                <div className="space-y-6">
                  {/* Project Photos Card */}
                  <div
                    className={`p-6 rounded-3xl border space-y-4 ${
                      isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold font-display">Foto Hasil Pengerjaan</h4>
                        <p className="text-xs text-neutral-400">Dokumentasi fisik mesin terupdate</p>
                      </div>
                      <Images className="w-5 h-5 text-amber-500" />
                    </div>

                    {activeProject.photos && activeProject.photos.length > 0 ? (
                      <div className="space-y-3">
                        {activeProject.photos.map((photo) => (
                          <div
                            key={photo.id}
                            onClick={() => setSelectedPhotoPreview(photo)}
                            className="group relative rounded-2xl overflow-hidden aspect-video bg-neutral-900 border border-neutral-800 cursor-pointer"
                          >
                            <img
                              src={photo.imageUrl}
                              alt={photo.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                                {photo.category}
                              </span>
                              <h5 className="text-xs font-bold font-display truncate">{photo.title}</h5>
                              <p className="text-[10px] text-neutral-300 line-clamp-1">{photo.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-neutral-400 text-xs rounded-2xl border border-dashed border-neutral-800">
                        Foto dokumentasi pengerjaan sedang disiapkan oleh tim engineering.
                      </div>
                    )}
                  </div>

                  {/* Dedicated Support Card */}
                  <div
                    className={`p-6 rounded-3xl border space-y-4 ${
                      isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider text-amber-500">
                      <MessageSquare className="w-4 h-4" />
                      <span>Hubungi Tim Engineering PTT</span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Memerlukan koordinasi teknis atau jadwal FAT langsung di workshop MM2100 Cibitung?
                    </p>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=${encodeURIComponent(
                        `Halo PT. Prima Teknik Trada, saya ${user?.name} dari ${user?.company} ingin mendiskusikan update project PO: ${activeProject.poNumber} (${activeProject.projectName}). Mohon informasi jadwal teknis. Terima kasih.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Diskusi via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl border border-dashed border-neutral-800 space-y-4">
            <FolderKanban className="w-12 h-12 text-neutral-600 mx-auto" />
            <h3 className="text-lg font-bold font-display">Belum Ada Project Aktif Terhubung</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Akun perusahaan Anda ({user?.company}) telah terdaftar resmi. Project baru yang diterbitkan akan otomatis muncul di sini.
            </p>
          </div>
        )}
      </main>

      {/* ======================= MODAL: GANTI PASSWORD ======================= */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-7 space-y-4 ${
              isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-inherit">
              <div>
                <h3 className="text-base font-black font-display">Ganti Kata Sandi Akun</h3>
                <p className="text-xs text-neutral-400">Atur password kustom untuk login customer</p>
              </div>
              <button
                onClick={() => setIsChangePasswordOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {passwordMsg && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  passwordMsg.type === 'success'
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/15 border border-red-500/30 text-red-400'
                }`}
              >
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold mb-1">Kata Sandi Baru</label>
                <input
                  type="password"
                  required
                  placeholder="Minimal 6 karakter"
                  value={newPasswordVal}
                  onChange={(e) => setNewPasswordVal(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Ulangi Kata Sandi Baru</label>
                <input
                  type="password"
                  required
                  placeholder="Ketik ulang kata sandi"
                  value={confirmPasswordVal}
                  onChange={(e) => setConfirmPasswordVal(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer"
                >
                  Simpan Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: LIGHTBOX FOTO PREVIEW ======================= */}
      {selectedPhotoPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhotoPreview(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhotoPreview(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/60 text-white hover:bg-black/90 cursor-pointer"
            >
              ✕
            </button>
            <img
              src={selectedPhotoPreview.imageUrl}
              alt={selectedPhotoPreview.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="p-5 space-y-1.5 bg-neutral-900/90 border-t border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-500">{selectedPhotoPreview.category}</span>
                <span className="text-neutral-500">•</span>
                <span className="text-xs text-neutral-400 font-mono">{selectedPhotoPreview.uploadedAt}</span>
              </div>
              <h3 className="text-base font-bold font-display">{selectedPhotoPreview.title}</h3>
              <p className="text-xs text-neutral-300">{selectedPhotoPreview.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL: FINISH DOKUMEN (TAGIHAN INVOICE & PENGIRIMAN) ======================= */}
      {isFinishModalOpen && activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setIsFinishModalOpen(false)}
        >
          <div
            className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-6 transition-all flex flex-col max-h-[92vh] ${
              isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Ribbon */}
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 shrink-0" />

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-inherit flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    {activeProject.poNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300">
                    ✓ Selesai 100% (Finish)
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black font-display text-slate-100">
                  Dokumen Serah Terima &amp; Faktur Tagihan
                </h3>
                <p className="text-xs text-neutral-400">
                  {activeProject.projectName} — {activeProject.customerName}
                </p>
              </div>

              <button
                onClick={() => setIsFinishModalOpen(false)}
                className="p-1.5 rounded-xl border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Sub-tabs: Invoice vs Delivery */}
            <div className="px-6 pt-3 pb-2 border-b border-inherit flex gap-2 shrink-0">
              <button
                onClick={() => setFinishModalTab('invoice')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  finishModalTab === 'invoice'
                    ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                    : isDark
                    ? 'bg-neutral-900 text-neutral-400 hover:text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-950'
                }`}
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>Tagihan Invoice Pembayaran</span>
              </button>

              <button
                onClick={() => setFinishModalTab('delivery')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  finishModalTab === 'delivery'
                    ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                    : isDark
                    ? 'bg-neutral-900 text-neutral-400 hover:text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-950'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Proses Pengiriman &amp; Surat Jalan (DO)</span>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin">
              {finishModalTab === 'invoice' ? (
                /* TAB 1: INVOICE PEMBAYARAN */
                <div className="space-y-6">
                  {/* Letterhead */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-inherit bg-neutral-900/40">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <PrimatechLogo className="h-7 w-auto max-w-[140px]" />
                        <span className="text-[10px] font-mono uppercase font-bold text-amber-500 px-1.5 py-0.5 rounded bg-amber-500/10">
                          Official Billing
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono">
                        PT. PRIMA TEKNIK TRADA • Industrial Machinery &amp; Automation
                      </p>
                      <p className="text-[10px] text-neutral-500">
                        Kawasan Industri MM2100 Cibitung, Bekasi | Telp: +62 21-8980378
                      </p>
                    </div>

                    <div className="text-left sm:text-right font-mono text-xs space-y-1">
                      <div className="text-neutral-400">NO. FAKTUR / INVOICE:</div>
                      <div className="font-extrabold text-amber-400 text-sm">
                        {activeProject.invoice?.invoiceNumber || `INV/PTT/2026/09-${activeProject.poNumber.slice(-4)}`}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Tanggal: {activeProject.invoice?.invoiceDate || '2026-09-15'}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Jatuh Tempo: {activeProject.invoice?.dueDate || '2026-10-15'}
                      </div>
                    </div>
                  </div>

                  {/* Bill To & PO */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-inherit text-xs font-mono">
                    <div>
                      <span className="text-neutral-400 text-[10px] uppercase font-bold block mb-1">
                        Ditagihkan Kepada (Customer):
                      </span>
                      <div className="font-bold text-slate-100 text-sm">{activeProject.customerName}</div>
                      <div className="text-neutral-300 mt-0.5">{user?.companyAddress || 'Kawasan Industri Cikarang Barat / Cibitung'}</div>
                      <div className="text-neutral-400 text-[11px] mt-1">
                        UP: {user?.name || 'Ir. Hendra Wijaya'} ({user?.phone || '+62 812-8899-2341'})
                      </div>
                    </div>

                    <div>
                      <span className="text-neutral-400 text-[10px] uppercase font-bold block mb-1">
                        Referensi Pesanan / PO:
                      </span>
                      <div className="text-amber-400 font-bold">{activeProject.poNumber}</div>
                      <div className="text-neutral-300 mt-1">Kategori: {activeProject.category}</div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mt-2">
                        <CheckCircle2 className="w-3 h-3" /> Status: LUNAS / PAID FULL
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="rounded-xl border border-inherit overflow-hidden">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-neutral-900/80 border-b border-inherit text-neutral-400 text-[10px] uppercase">
                        <tr>
                          <th className="p-3">Deskripsi Pekerjaan Manufaktur</th>
                          <th className="p-3 text-center">Qty</th>
                          <th className="p-3 text-right">Nominal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-inherit">
                        <tr>
                          <td className="p-3">
                            <div className="font-bold text-slate-100">{activeProject.projectName}</div>
                            <div className="text-[11px] text-neutral-400 mt-0.5">{activeProject.description}</div>
                          </td>
                          <td className="p-3 text-center">1 Unit</td>
                          <td className="p-3 text-right font-bold text-slate-100">
                            {formatRupiah(activeProject.contractValue)}
                          </td>
                        </tr>
                        <tr className="bg-neutral-900/20">
                          <td className="p-2.5 pl-6 text-neutral-300">
                            • Termin 1: Down Payment (50%) - Telah Diterima
                          </td>
                          <td className="p-2.5 text-center text-emerald-400 font-bold">LUNAS</td>
                          <td className="p-2.5 text-right text-neutral-300">
                            {formatRupiah(activeProject.contractValue * 0.5)}
                          </td>
                        </tr>
                        <tr className="bg-neutral-900/20">
                          <td className="p-2.5 pl-6 text-neutral-300">
                            • Termin 2: Pelunasan Akhir FAT (50%) - Telah Diterima
                          </td>
                          <td className="p-2.5 text-center text-emerald-400 font-bold">LUNAS</td>
                          <td className="p-2.5 text-right text-neutral-300">
                            {formatRupiah(activeProject.contractValue * 0.5)}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className="border-t-2 border-inherit bg-neutral-900/60 font-bold">
                        <tr>
                          <td colSpan={2} className="p-3 text-right uppercase text-neutral-400">
                            Total Tagihan &amp; Pelunasan:
                          </td>
                          <td className="p-3 text-right text-emerald-400 text-sm">
                            {formatRupiah(activeProject.contractValue)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Bank Account Info & Paid Stamp */}
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-emerald-400 font-mono text-[11px]">
                        REKENING RESMI PERUSAHAAN (BCA):
                      </span>
                      <div className="font-mono text-slate-200">
                        Bank Central Asia (BCA) KCP MM2100 Cikarang
                      </div>
                      <div className="font-mono font-bold text-amber-400">
                        No. Rek: 542-089-7700 | a.n. PT. PRIMA TEKNIK TRADA
                      </div>
                    </div>

                    <div className="border border-emerald-500/40 rounded-xl p-2.5 text-center bg-emerald-500/10">
                      <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                        VERIFIKASI FINANCE PTT
                      </div>
                      <div className="text-xs font-black text-emerald-300 font-mono">
                        LUNAS (PAID IN FULL)
                      </div>
                      <div className="text-[9px] text-neutral-400 font-mono mt-0.5">
                        {activeProject.invoice?.paidAt || '2026-09-20'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* TAB 2: PROSES PENGIRIMAN & SURAT JALAN (DO) */
                <div className="space-y-6">
                  {/* DO Letterhead */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-inherit bg-neutral-900/40">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-blue-400" />
                        <h4 className="text-base font-black font-display text-slate-100">
                          SURAT JALAN &amp; DELIVERY ORDER (DO)
                        </h4>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono">
                        Divisi Logistik &amp; Ekspedisi PT. Prima Teknik Trada
                      </p>
                    </div>

                    <div className="text-left sm:text-right font-mono text-xs space-y-1">
                      <div className="text-neutral-400">NO. SURAT JALAN:</div>
                      <div className="font-bold text-amber-400">
                        {activeProject.delivery?.doNumber || 'DO/PTT-LOG/2026/09-088'}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        No. BAST: {activeProject.delivery?.bastNumber || 'BAST/AHM-PTT/2026/09-142'}
                      </div>
                    </div>
                  </div>

                  {/* Logistics & Driver Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-inherit text-xs font-mono">
                    <div className="space-y-2">
                      <div>
                        <span className="text-neutral-400 text-[10px] uppercase block">Armada Angkutan:</span>
                        <div className="font-bold text-slate-100">
                          {activeProject.delivery?.expedition || 'Truk Towing & Flatbed Dedicated PTT Logistics'}
                        </div>
                        <div className="text-amber-400 mt-0.5">
                          Plat Nomor: {activeProject.delivery?.vehicleNumber || 'B 9821 PTT'}
                        </div>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-[10px] uppercase block">Driver / Pengawal Unit:</span>
                        <div className="text-slate-200">
                          {activeProject.delivery?.driverName || 'Sutrisno (PTT Logistics Lead)'}
                        </div>
                        <div className="text-neutral-400 text-[11px]">
                          Kontak: {activeProject.delivery?.driverPhone || '+62 813-8890-1122'}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-neutral-400 text-[10px] uppercase block">Tujuan Pengiriman:</span>
                        <div className="text-slate-200">
                          {activeProject.delivery?.deliveryAddress || 'PT. Astra Honda Motor Plant 3 Cikarang Barat, MM2100 Blok LL'}
                        </div>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-[10px] uppercase block">Penerima &amp; Tanda Tangan:</span>
                        <div className="text-emerald-400 font-bold">
                          {activeProject.delivery?.receivedBy || 'Ir. Hendra Wijaya (Lead Tooling AHM)'}
                        </div>
                        <div className="text-neutral-400 text-[11px]">
                          Tanggal Terima: {activeProject.delivery?.receivedDate || '2026-09-16'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4-Stage Delivery Tracking Steps */}
                  <div className="p-4 rounded-2xl border border-inherit space-y-3">
                    <span className="text-xs font-bold font-mono uppercase text-blue-400">
                      Tracking Tahapan Proses Pengiriman:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                      {[
                        { title: '1. QC & Packing', desc: 'Selesai di Workshop PTT' },
                        { title: '2. Loading Flatbed', desc: 'Armada Siap Berangkat' },
                        { title: '3. Ekspedisi', desc: 'Transit ke Plant Klien' },
                        { title: '4. BAST Signing', desc: 'Terpasang & Diterima' },
                      ].map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1 text-xs"
                        >
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{step.title}</span>
                          </div>
                          <p className="text-[11px] text-neutral-400">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer with Print and Close */}
            <div className="p-4 sm:p-5 border-t border-inherit flex items-center justify-between shrink-0 bg-neutral-900/20">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-700 hover:border-white text-xs font-bold cursor-pointer transition-colors text-neutral-200 hover:text-white"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / Simpan Dokumen</span>
              </button>

              <button
                onClick={() => setIsFinishModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
