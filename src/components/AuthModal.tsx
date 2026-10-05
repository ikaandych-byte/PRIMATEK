import React, { useState } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Building2,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  LogOut,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  KeyRound,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProjectData } from '../context/ProjectDataContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { PrimatechLogo } from './PrimatechLogo';

interface AuthModalProps {
  onNavigateHome?: () => void;
  onNavigateToRfq?: () => void;
  onOpenBackendAdmin?: () => void;
  onOpenCustomerPortal?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onNavigateHome,
  onNavigateToRfq,
  onOpenBackendAdmin,
  onOpenCustomerPortal,
}) => {
  const {
    user,
    isAuthenticated,
    isInternalStaff,
    isAdmin,
    isAuthModalOpen,
    authModalMode,
    authModalTab,
    closeAuthModal,
    loginStaff,
    loginCustomer,
    registerCustomer,
    logout,
  } = useAuth();

  const { generateRandomPassword } = useProjectData();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';

  // State
  const [realmTab, setRealmTab] = useState<'customer' | 'staff'>(authModalTab || 'customer');
  const [customerMode, setCustomerMode] = useState<'login' | 'signup'>(authModalMode || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Customer Login Form State
  const [custEmail, setCustEmail] = useState('');
  const [custPassword, setCustPassword] = useState('');

  // Customer Signup Form State
  const [signupForm, setSignupForm] = useState({
    companyName: '',
    picName: '',
    email: '',
    password: '',
    companyAddress: '',
    phone: '',
    contactPerson: '',
    industrySector: 'Automotive OEM 2W / 4W',
  });

  // Staff Login Form State
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');

  if (!isAuthModalOpen) return null;

  // Handle Customer Login
  const handleCustomerLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await loginCustomer(custEmail, custPassword);
      if (!res.success) {
        setErrorMsg(res.error || 'Gagal login customer.');
      } else {
        if (onOpenCustomerPortal) {
          onOpenCustomerPortal();
        }
      }
    } catch {
      setErrorMsg('Terjadi kesalahan saat masuk.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Customer Signup
  const handleCustomerSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (
      !signupForm.companyName.trim() ||
      !signupForm.picName.trim() ||
      !signupForm.email.trim() ||
      !signupForm.phone.trim() ||
      !signupForm.companyAddress.trim()
    ) {
      setErrorMsg('Mohon lengkapi semua kolom wajib (Perusahaan, PIC, Email, Telp, Alamat).');
      return;
    }

    const finalPass = signupForm.password || generateRandomPassword(signupForm.companyName);

    setIsLoading(true);
    try {
      const res = await registerCustomer({
        ...signupForm,
        password: finalPass,
        contactPerson: signupForm.contactPerson || `${signupForm.picName} (${signupForm.phone})`,
      });

      if (!res.success) {
        setErrorMsg(res.error || 'Gagal mendaftar.');
      } else {
        if (onOpenCustomerPortal) {
          onOpenCustomerPortal();
        }
      }
    } catch {
      setErrorMsg('Terjadi kesalahan saat pendaftaran.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Staff Login
  const handleStaffLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await loginStaff(staffEmail, staffPassword);
      if (!res.success) {
        setErrorMsg(res.error || 'Gagal login staf internal.');
      } else {
        if (onOpenBackendAdmin) {
          onOpenBackendAdmin();
        }
      }
    } catch {
      setErrorMsg('Terjadi kesalahan saat login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={closeAuthModal}
    >
      <div
        className={`relative w-full max-w-xl rounded-3xl border shadow-2xl transition-all my-8 overflow-hidden ${
          isDark
            ? 'bg-[#0f141f] border-neutral-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className={`absolute top-4 right-4 p-2 rounded-xl border transition-colors cursor-pointer z-10 ${
            isDark
              ? 'border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
              : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Logo Header */}
          <div className="flex flex-col gap-1.5 mb-6">
            <PrimatechLogo className="h-9 sm:h-11 w-auto max-w-[210px]" />
            <div className="text-[11px] font-mono tracking-wider uppercase text-amber-500 font-bold mt-1">
              {isAuthenticated
                ? isInternalStaff
                  ? 'Portal Internal Staf & Administrator'
                  : 'Portal Klien & Monitoring Orderan'
                : 'Pusat Akses Sistem & Portal Terpadu'}
            </div>
          </div>

          {/* IF USER IS LOGGED IN ALREADY */}
          {isAuthenticated && user ? (
            <div className="space-y-6">
              <div
                className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-red-600 text-neutral-950 flex items-center justify-center font-extrabold text-lg shadow-md font-display">
                      {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="text-base font-bold font-display">{user.name}</div>
                      <div className="text-xs text-amber-500 font-semibold">{user.company}</div>
                      <div className={`text-[11px] font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                        {user.role} {user.department ? `• ${user.department}` : ''}
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Aktif</span>
                  </div>
                </div>

                <div
                  className={`pt-3 border-t grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono ${
                    isDark ? 'border-neutral-800 text-neutral-300' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Shortcuts based on role */}
              <div className="space-y-2.5">
                {isInternalStaff && onOpenBackendAdmin && (
                  <button
                    onClick={() => {
                      closeAuthModal();
                      onOpenBackendAdmin();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-500 text-white transition-all shadow-md shadow-red-600/20 cursor-pointer"
                  >
                    <span>Masuk ke Dashboard Backend Internal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {!isInternalStaff && onOpenCustomerPortal && (
                  <button
                    onClick={() => {
                      closeAuthModal();
                      onOpenCustomerPortal();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all shadow-md shadow-amber-400/20 cursor-pointer"
                  >
                    <span>Buka Portal Monitoring Orderan Saya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {onNavigateToRfq && (
                  <button
                    onClick={() => {
                      closeAuthModal();
                      onNavigateToRfq();
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isDark
                        ? 'border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>Formulir Permintaan Penawaran (RFQ)</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    logout();
                    closeAuthModal();
                    window.location.hash = '';
                    if (onNavigateHome) onNavigateHome();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all cursor-pointer border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout / Keluar Sesi</span>
                </button>
              </div>
            </div>
          ) : (
            /* IF USER IS NOT LOGGED IN */
            <div className="space-y-5">
              {/* Primary Realm Tabs: Customer vs Staff Internal */}
              <div
                className={`grid grid-cols-2 p-1 rounded-2xl border ${
                  isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setRealmTab('customer');
                    setErrorMsg('');
                  }}
                  className={`py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    realmTab === 'customer'
                      ? 'bg-amber-400 text-neutral-950 shadow-sm shadow-amber-400/20'
                      : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Portal Klien / Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRealmTab('staff');
                    setErrorMsg('');
                  }}
                  className={`py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    realmTab === 'staff'
                      ? 'bg-red-600 text-white shadow-sm shadow-red-600/20'
                      : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Internal Staff</span>
                </button>
              </div>

              {/* Error Message Alert */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5 animate-fade-in">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{errorMsg}</span>
                </div>
              )}

              {/* ================= REALM 1: CUSTOMER ================= */}
              {realmTab === 'customer' && (
                <div className="space-y-4">
                  {/* Customer Login Form */}
                  {customerMode === 'login' && (
                    <form onSubmit={handleCustomerLoginSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5">
                          Email Perusahaan Terdaftar
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                          <input
                            type="email"
                            required
                            placeholder="nama@perusahaan.com"
                            value={custEmail}
                            onChange={(e) => setCustEmail(e.target.value)}
                            className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none ${
                              isDark
                                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                                : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1.5">Kata Sandi Customer</label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="••••••••"
                            value={custPassword}
                            onChange={(e) => setCustPassword(e.target.value)}
                            className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border outline-none ${
                              isDark
                                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                                : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all shadow-md shadow-amber-400/20 cursor-pointer disabled:opacity-50"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>{isLoading ? 'Memverifikasi...' : 'MASUK KE PORTAL MONITORING PROJECT'}</span>
                      </button>

                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setCustomerMode('signup');
                            setErrorMsg('');
                          }}
                          className="text-xs text-amber-500 hover:text-amber-400 font-semibold cursor-pointer transition-colors"
                        >
                          Perusahaan Anda belum terdaftar? Daftar akun baru di sini →
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Customer Signup Form */}
                  {customerMode === 'signup' && (
                    <div className="space-y-4">
                      {/* Signup Header & Back to Login */}
                      <div className="flex items-center justify-between pb-2 border-b border-inherit">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-100 font-display">
                            Pendaftaran Akun Perusahaan Baru
                          </h4>
                          <p className="text-[11px] text-neutral-400">
                            Isi data resmi perusahaan untuk akses portal tracking orderan
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomerMode('login');
                            setErrorMsg('');
                          }}
                          className="text-xs font-semibold text-amber-500 hover:text-amber-400 cursor-pointer flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg border border-amber-400/30 bg-amber-400/10 transition-colors"
                        >
                          <span>← Kembali ke Login</span>
                        </button>
                      </div>

                      <form onSubmit={handleCustomerSignupSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold mb-1">Nama Perusahaan (PT / CV) *</label>
                            <input
                              type="text"
                              required
                              placeholder="PT. Nama Perusahaan"
                              value={signupForm.companyName}
                              onChange={(e) => setSignupForm({ ...signupForm, companyName: e.target.value })}
                              className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                                isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1">Nama PIC / Penanggung Jawab *</label>
                            <input
                              type="text"
                              required
                              placeholder="Nama Lengkap PIC"
                              value={signupForm.picName}
                              onChange={(e) => setSignupForm({ ...signupForm, picName: e.target.value })}
                              className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                                isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold mb-1">Email Perusahaan (Akun Login) *</label>
                            <input
                              type="email"
                              required
                              placeholder="email@perusahaan.com"
                              value={signupForm.email}
                              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                              className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                                isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1">No. Telp / WhatsApp *</label>
                            <input
                              type="tel"
                              required
                              placeholder="+62 812-xxxx-xxxx"
                              value={signupForm.phone}
                              onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                              className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                                isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">Contact Person (Jabatan &amp; Dept)</label>
                          <input
                            type="text"
                            placeholder="Manager Procurement & Tooling Engineering"
                            value={signupForm.contactPerson}
                            onChange={(e) => setSignupForm({ ...signupForm, contactPerson: e.target.value })}
                            className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                              isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">Alamat Lengkap Perusahaan / Plant *</label>
                          <textarea
                            rows={2}
                            required
                            placeholder="Kawasan Industri / Alamat Kantor / Pabrik..."
                            value={signupForm.companyAddress}
                            onChange={(e) => setSignupForm({ ...signupForm, companyAddress: e.target.value })}
                            className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                              isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                            }`}
                          />
                        </div>

                        {/* Password Generated (Bisa diganti sendiri) */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-semibold">
                              Password Akun (Generate &amp; Bisa Diganti Sendiri)
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                setSignupForm({
                                  ...signupForm,
                                  password: generateRandomPassword(signupForm.companyName),
                                })
                              }
                              className="text-[11px] font-mono text-amber-500 hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>Generate Acak</span>
                            </button>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="Ketik password atau klik Generate Acak di atas"
                              value={signupForm.password}
                              onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                              className={`w-full px-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                                isDark ? 'bg-neutral-900 border-neutral-800 text-amber-400' : 'bg-white border-slate-300'
                              }`}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all shadow-md shadow-amber-400/20 cursor-pointer disabled:opacity-50 mt-2"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>{isLoading ? 'Mendaftarkan Perusahaan...' : 'DAFTAR & BUKA PORTAL ORDERAN'}</span>
                        </button>

                        <div className="text-center pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setCustomerMode('login');
                              setErrorMsg('');
                            }}
                            className="text-xs text-neutral-400 hover:text-amber-400 font-medium cursor-pointer transition-colors"
                          >
                            Sudah memiliki akun? Masuk di sini →
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* ================= REALM 2: INTERNAL STAFF ================= */}
              {realmTab === 'staff' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Hanya diperuntukkan untuk staf resmi internal PT. Prima Teknik Trada.</span>
                  </div>

                  <form onSubmit={handleStaffLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5">Email Staf</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="email"
                          required
                          placeholder="nama@pttid.com"
                          value={staffEmail}
                          onChange={(e) => setStaffEmail(e.target.value)}
                          className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl border outline-none ${
                            isDark
                              ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-red-500'
                              : 'bg-white border-slate-300 text-slate-900 focus:border-red-600'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={staffPassword}
                          onChange={(e) => setStaffPassword(e.target.value)}
                          className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm font-mono rounded-xl border outline-none ${
                            isDark
                              ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-red-500'
                              : 'bg-white border-slate-300 text-slate-900 focus:border-red-600'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-500 text-white transition-all shadow-md shadow-red-600/20 cursor-pointer disabled:opacity-50"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>{isLoading ? 'Mengautentikasi...' : 'MASUK KE BACKEND ADMINISTRATOR'}</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
