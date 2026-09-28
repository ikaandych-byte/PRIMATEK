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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { PrimatechLogo } from './PrimatechLogo';

interface AuthModalProps {
  onNavigateToRfq?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onNavigateToRfq }) => {
  const {
    user,
    isAuthenticated,
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    openAuthModal,
    login,
    signup,
    logout,
  } = useAuth();

  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(authModalMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupCompany, setSignupCompany] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupSector, setSignupSector] = useState('Automotive OEM 2W / 4W');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginEmail.trim()) {
      setErrorMsg(language === 'en' ? 'Please enter your corporate email' : 'Mohon masukkan email perusahaan Anda');
      return;
    }
    if (!loginPassword.trim()) {
      setErrorMsg(language === 'en' ? 'Please enter your password' : 'Mohon masukkan kata sandi');
      return;
    }

    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
    } catch {
      setErrorMsg(language === 'en' ? 'Failed to log in. Please check credentials.' : 'Gagal masuk. Silakan periksa kembali email & sandi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!signupName.trim() || !signupCompany.trim() || !signupEmail.trim() || !signupPhone.trim()) {
      setErrorMsg(language === 'en' ? 'Please fill in all required fields' : 'Mohon lengkapi semua kolom yang wajib diisi');
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMsg(language === 'en' ? 'Password must be at least 6 characters' : 'Kata sandi minimal 6 karakter');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg(language === 'en' ? 'Passwords do not match' : 'Konfirmasi kata sandi tidak cocok');
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        name: signupName,
        company: signupCompany.startsWith('PT.') || signupCompany.startsWith('CV.') ? signupCompany : `PT. ${signupCompany}`,
        email: signupEmail,
        phone: signupPhone,
        role: 'Procurement / Engineering PIC',
        sector: signupSector,
      });
    } catch {
      setErrorMsg(language === 'en' ? 'Failed to register account' : 'Gagal mendaftar akun');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={closeAuthModal}
    >
      <div
        className={`relative w-full max-w-lg rounded-3xl border shadow-2xl transition-all my-8 overflow-hidden ${
          isDark
            ? 'bg-[#0f141f] border-neutral-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon / Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400" />

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

        {/* Content Container */}
        <div className="p-6 sm:p-8">
          {/* Official Primatech Logo */}
          <div className="flex flex-col gap-2 mb-6">
            <PrimatechLogo className="h-10 sm:h-12 w-auto max-w-[210px]" />
            <h3 className="text-base font-extrabold font-display tracking-tight mt-1">
              {isAuthenticated
                ? language === 'en'
                  ? 'Client Portal Dashboard'
                  : 'Portal Klien & Mitra Rekayasa'
                : language === 'en'
                ? 'Client & Engineering Portal'
                : 'Portal Klien & Akses Penawaran (RFQ)'}
            </h3>
          </div>

          {/* IF USER IS LOGGED IN -> SHOW LOGGED IN PROFILE & LOGOUT */}
          {isAuthenticated && user ? (
            <div className="space-y-6">
              <div
                className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-neutral-950 flex items-center justify-center font-extrabold text-lg shadow-md font-display">
                      {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="text-base font-bold font-display">{user.name}</div>
                      <div className="text-xs text-amber-500 font-semibold">{user.company}</div>
                      <div className={`text-[11px] font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                        {user.role}
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Terverifikasi</span>
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
                  <div className="flex items-center gap-2 col-span-full">
                    <Briefcase className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Sektor: {user.sector}</span>
                  </div>
                </div>
              </div>

              {/* Actions for Logged in user */}
              <div className="space-y-3">
                {onNavigateToRfq && (
                  <button
                    onClick={() => {
                      closeAuthModal();
                      onNavigateToRfq();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all shadow-md shadow-amber-400/20 cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Create New RFQ with this Account' : 'Ajukan Penawaran Harga (RFQ) dengan Akun Ini'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => {
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 transition-all shadow-md shadow-rose-600/20 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{language === 'en' ? 'LOGOUT FROM PORTAL' : 'LOGOUT / KELUAR DARI AKUN'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* IF USER IS NOT LOGGED IN -> TABS FOR LOGIN & SIGN UP */
            <div>
              {/* Tabs Switcher */}
              <div
                className={`flex rounded-xl p-1 mb-6 border ${
                  isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-amber-400 text-neutral-950 shadow-xs'
                      : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>{language === 'en' ? 'Login' : 'Masuk / Login'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signup');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'signup'
                      ? 'bg-amber-400 text-neutral-950 shadow-xs'
                      : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{language === 'en' ? 'Sign Up' : 'Daftar Akun Baru'}</span>
                </button>
              </div>

              {/* Error Message Alert */}
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 animate-fade-in">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* LOGIN TAB FORM */}
              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">
                      {language === 'en' ? 'Corporate Email' : 'Email Perusahaan / Akun Klien'}
                    </label>
                    <div className="relative">
                      <Mail
                        className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                          isDark ? 'text-neutral-500' : 'text-slate-400'
                        }`}
                      />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="contoh: engineering@astra-honda.com"
                        className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border transition-colors outline-hidden ${
                          isDark
                            ? 'bg-neutral-900/90 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5">
                      {language === 'en' ? 'Password' : 'Kata Sandi'}
                    </label>
                    <div className="relative">
                      <Lock
                        className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                          isDark ? 'text-neutral-500' : 'text-slate-400'
                        }`}
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border transition-colors outline-hidden ${
                          isDark
                            ? 'bg-neutral-900/90 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                        }`}
                        required
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

                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded accent-amber-400"
                      />
                      <span className={isDark ? 'text-neutral-400' : 'text-slate-600'}>
                        {language === 'en' ? 'Remember login' : 'Ingat saya di perangkat ini'}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert(language === 'en' ? 'Password reset link will be sent to your corporate email.' : 'Tautan reset sandi akan dikirim ke email perusahaan terdaftar Anda.')}
                      className="text-amber-500 hover:underline cursor-pointer"
                    >
                      {language === 'en' ? 'Forgot password?' : 'Lupa sandi?'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all shadow-md shadow-amber-400/20 cursor-pointer disabled:opacity-50"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{isLoading ? 'Memproses...' : language === 'en' ? 'LOGIN TO PORTAL' : 'MASUK KE PORTAL KLIEN'}</span>
                  </button>
                </form>
              )}

              {/* SIGNUP TAB FORM */}
              {activeTab === 'signup' && (
                <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {language === 'en' ? 'Full Name (PIC)' : 'Nama Lengkap PIC'}
                      </label>
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="Bambang Suhendra"
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-colors outline-hidden ${
                          isDark
                            ? 'bg-neutral-900/90 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                        }`}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {language === 'en' ? 'Company Name' : 'Nama Perusahaan'}
                      </label>
                      <div className="relative">
                        <Building2
                          className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                            isDark ? 'text-neutral-500' : 'text-slate-400'
                          }`}
                        />
                        <input
                          type="text"
                          value={signupCompany}
                          onChange={(e) => setSignupCompany(e.target.value)}
                          placeholder="PT. Industri Otomotif Prima"
                          className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border transition-colors outline-hidden ${
                            isDark
                              ? 'bg-neutral-900/90 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                          }`}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {language === 'en' ? 'Corporate Email' : 'Email Kantor'}
                      </label>
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="pic@perusahaan.co.id"
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-colors outline-hidden ${
                          isDark
                            ? 'bg-neutral-900/90 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                        }`}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {language === 'en' ? 'WhatsApp / Phone' : 'No. WhatsApp / HP'}
                      </label>
                      <input
                        type="tel"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        placeholder="+62 812-xxxx-xxxx"
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-colors outline-hidden ${
                          isDark
                            ? 'bg-neutral-900/90 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {language === 'en' ? 'Industrial Sector' : 'Sektor Industri'}
                    </label>
                    <select
                      value={signupSector}
                      onChange={(e) => setSignupSector(e.target.value)}
                      className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-colors outline-hidden ${
                        isDark
                          ? 'bg-neutral-900/90 border-neutral-800 text-white focus:border-amber-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                      }`}
                    >
                      <option value="Automotive OEM 2W / 4W">Automotive OEM (2W / 4W)</option>
                      <option value="Pharmaceutical & Healthcare">Pharmaceutical & Healthcare</option>
                      <option value="Heavy Stamping & Stamping Dies">Heavy Stamping & Stamping Dies</option>
                      <option value="Precision Parts & Machining">Precision Parts & CNC Machining</option>
                      <option value="Electronics & Appliance">Electronics & Appliance</option>
                      <option value="Industrial Automation & Robotics">Industrial Automation & Robotics</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {language === 'en' ? 'Password' : 'Kata Sandi'}
                      </label>
                      <input
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-colors outline-hidden ${
                          isDark
                            ? 'bg-neutral-900/90 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                        }`}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {language === 'en' ? 'Confirm Password' : 'Ulangi Kata Sandi'}
                      </label>
                      <input
                        type="password"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        placeholder="Samakan kata sandi"
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-colors outline-hidden ${
                          isDark
                            ? 'bg-neutral-900/90 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all shadow-md shadow-amber-400/20 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isLoading ? 'Mendaftarkan...' : language === 'en' ? 'CREATE CLIENT ACCOUNT' : 'DAFTAR AKUN REKANAN KLIEN'}</span>
                  </button>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Data perusahaan Anda terenkripsi aman untuk keperluan verifikasi RFQ dan NDA manufaktur.</span>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
