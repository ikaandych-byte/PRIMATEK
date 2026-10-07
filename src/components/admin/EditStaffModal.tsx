import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Mail, User, Phone, Briefcase } from 'lucide-react';
import { InternalStaff, StaffRole } from '../../types/backend';
import { useTheme } from '../../context/ThemeContext';

interface EditStaffModalProps {
  staff: InternalStaff | null;
  onClose: () => void;
  onSave: (staffId: string, updatedData: Partial<InternalStaff>) => void;
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

export const EditStaffModal: React.FC<EditStaffModalProps> = ({
  staff,
  onClose,
  onSave,
  generatePassword,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!staff) return null;

  const [name, setName] = useState(staff.name);
  const [department, setDepartment] = useState(staff.department);
  const [email, setEmail] = useState(staff.email);
  const [role, setRole] = useState<StaffRole>(staff.role);
  const [password, setPassword] = useState(staff.password);
  const [phone, setPhone] = useState(staff.phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(staff.id, {
      name,
      department,
      email,
      role,
      password,
      phone,
    });
    onClose();
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
              <ShieldCheck className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-black font-display">Edit Akses Karyawan</h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Kelola data staf dan hak akses (Khusus Administrator PTT)
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
                  onChange={(e) => setDepartment(e.target.value)}
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
                <option value="Staff Access">Staff Access (Departemen)</option>
                <option value="Administrator Full Access">Administrator Full Access</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Email Perusahaan</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">No. Kontak / Ext</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold">Password Sistem Akun</label>
              <button
                type="button"
                onClick={() => setPassword(generatePassword())}
                className="text-[11px] font-mono text-amber-500 hover:underline cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Generate Password Baru</span>
              </button>
            </div>
            <input
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                isDark ? 'bg-neutral-900 border-neutral-800 text-amber-400' : 'bg-white border-slate-300 text-amber-600'
              }`}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-inherit">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer transition-all"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
