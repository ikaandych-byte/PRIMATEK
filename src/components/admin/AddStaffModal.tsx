import React, { useState } from 'react';
import { X, ShieldPlus, Mail, User, Phone, Briefcase, Sparkles, Key } from 'lucide-react';
import { InternalStaff, StaffRole } from '../../types/backend';
import { useTheme } from '../../context/ThemeContext';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<InternalStaff, 'id'>) => void;
  generatePassword: () => string;
}

const DEPARTMENTS = [
  'Design',
  'Manufacturing Process',
  'Purchasing',
  'Quality',
  'Production',
  'Assembly',
  'PPIC',
  'General Admin',
  'Executive Management',
];

const AVATAR_COLORS = [
  'from-blue-600 to-indigo-700',
  'from-purple-600 to-violet-800',
  'from-orange-500 to-amber-600',
  'from-amber-600 to-yellow-600',
  'from-emerald-500 to-green-700',
  'from-teal-600 to-cyan-700',
  'from-rose-600 to-red-700',
  'from-slate-600 to-slate-800',
];

export const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  generatePassword,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Design');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<StaffRole>('Staff Access');
  const [password, setPassword] = useState('PTT-Staff#2026!');
  const [phone, setPhone] = useState('+62 21-8980378');
  const [avatarBg, setAvatarBg] = useState(AVATAR_COLORS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      department,
      email: email.toLowerCase().trim(),
      role,
      password,
      phone,
      avatarBg,
    });
    // Reset form
    setName('');
    setEmail('');
    setPassword('PTT-Staff#2026!');
    onClose();
  };

  const handleGenerate = () => {
    const newPass = generatePassword();
    setPassword(newPass);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-5 my-8 transition-all ${
          isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-inherit">
          <div>
            <div className="flex items-center gap-2">
              <ShieldPlus className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-black font-display">Tambah Staf Karyawan Baru</h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Tambahkan akun staf baru ke 8 Departemen / Administrator PT. Prima Teknik Trada
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Nama Lengkap Karyawan</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                required
                placeholder="misal: Wahyu Pratama (Design CAD Lead)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Departemen Kerja</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <select
                  value={department}
                  onChange={(e) => {
                    const dept = e.target.value;
                    setDepartment(dept);
                    if (!email) {
                      const prefix = dept.toLowerCase().replace(/\s+/g, '');
                      setEmail(`${prefix}@pttid.com`);
                    }
                  }}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Tingkat Hak Akses</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as StaffRole)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              >
                <option value="Staff Access">Staff Access (Departemen Tertentu)</option>
                <option value="Administrator Full Access">Administrator Full Access (Semua Akses)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Email Resmi Staf (@pttid.com)</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder="staf@pttid.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Nomor Telepon / WhatsApp</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold">Kata Sandi (Password Akun Staf)</label>
              <button
                type="button"
                onClick={handleGenerate}
                className="text-[11px] font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Generate Random</span>
              </button>
            </div>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-amber-400 font-bold' : 'bg-white border-slate-300 text-amber-600 font-bold'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5">Warna Avatar Profil</label>
            <div className="flex items-center gap-2 flex-wrap">
              {AVATAR_COLORS.map((bg) => (
                <button
                  type="button"
                  key={bg}
                  onClick={() => setAvatarBg(bg)}
                  className={`w-7 h-7 rounded-full bg-gradient-to-br ${bg} transition-all cursor-pointer ${
                    avatarBg === bg ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-inherit">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <ShieldPlus className="w-4 h-4" />
              <span>Simpan &amp; Daftarkan Staf</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
