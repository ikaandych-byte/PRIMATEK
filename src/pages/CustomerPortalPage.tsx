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
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filter projects for the logged-in customer
  const customerEmailOrId = user?.email || user?.id || '';
  const myProjects = user?.userType === 'customer'
    ? getProjectsByCustomer(customerEmailOrId)
    : projects; // if staff views this preview, show all projects

  const [activeProjectId, setActiveProjectId] = useState<string>(myProjects[0]?.id || '');
  const activeProject = myProjects.find((p) => p.id === activeProjectId) || myProjects[0];

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
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveProjectId(p.id)}
                    className={`p-3.5 rounded-2xl border text-left min-w-[240px] sm:min-w-[280px] transition-all cursor-pointer shrink-0 ${
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
                      <span className="font-extrabold text-slate-100">{p.progressPercent}%</span>
                    </div>
                    <div className="text-xs font-bold font-display truncate text-slate-100">
                      {p.projectName}
                    </div>
                    <div className="mt-2 w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-red-600 h-full rounded-full"
                        style={{ width: `${p.progressPercent}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

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
    </div>
  );
};
