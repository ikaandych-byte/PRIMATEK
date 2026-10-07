import React, { useState } from 'react';
import { X, Sparkles, Building2, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { CustomerAccount } from '../../types/backend';
import { useTheme } from '../../context/ThemeContext';

interface EditCustomerModalProps {
  customer: CustomerAccount | null;
  onClose: () => void;
  onSave: (customerId: string, updatedData: Partial<CustomerAccount>) => void;
  generatePassword: (companyName?: string) => string;
}

export const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  customer,
  onClose,
  onSave,
  generatePassword,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!customer) return null;

  const [companyName, setCompanyName] = useState(customer.companyName);
  const [picName, setPicName] = useState(customer.picName);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [contactPerson, setContactPerson] = useState(customer.contactPerson || '');
  const [industrySector, setIndustrySector] = useState(customer.industrySector || '');
  const [companyAddress, setCompanyAddress] = useState(customer.companyAddress || '');
  const [password, setPassword] = useState(customer.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(customer.id, {
      companyName,
      picName,
      email,
      phone,
      contactPerson,
      industrySector,
      companyAddress,
      password,
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
              <Building2 className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-black font-display">Edit Data Pelanggan &amp; Akun Klien</h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Perbarui profil perusahaan &amp; kredensial akses customer (Khusus Administrator)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold mb-1">Nama Perusahaan (PT / CV)</label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Nama PIC (Penanggung Jawab)</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  required
                  value={picName}
                  onChange={(e) => setPicName(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Sektor Industri</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={industrySector}
                  onChange={(e) => setIndustrySector(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Email Perusahaan (Login Portal)</label>
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
              <label className="block text-xs font-semibold mb-1">No. Telp / WhatsApp</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="tel"
                  required
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
            <label className="block text-xs font-semibold mb-1">Detail Jabatan / Contact Person</label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Alamat Lengkap Perusahaan / Plant</label>
            <div className="relative">
              <textarea
                rows={2}
                required
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold">Password Akun Customer</label>
              <button
                type="button"
                onClick={() => setPassword(generatePassword(companyName))}
                className="text-[11px] font-mono text-amber-500 hover:underline cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Generate Acak</span>
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
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold shadow-md shadow-amber-400/20 cursor-pointer transition-all"
            >
              Simpan Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
