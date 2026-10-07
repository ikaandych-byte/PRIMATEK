import React, { useState } from 'react';
import { X, FolderKanban, Calendar, DollarSign, User, Tag, FileText } from 'lucide-react';
import { ProjectItem, CustomerAccount, ProjectStatus } from '../../types/backend';
import { useTheme } from '../../context/ThemeContext';

interface EditProjectModalProps {
  project: ProjectItem | null;
  customers: CustomerAccount[];
  onClose: () => void;
  onSave: (projectId: string, updatedData: Partial<ProjectItem>) => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  project,
  customers,
  onClose,
  onSave,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!project) return null;

  const [poNumber, setPoNumber] = useState(project.poNumber);
  const [projectName, setProjectName] = useState(project.projectName);
  const [customerId, setCustomerId] = useState(project.customerId);
  const [category, setCategory] = useState(project.category);
  const [contractValue, setContractValue] = useState(project.contractValue);
  const [startDate, setStartDate] = useState(project.startDate);
  const [targetCompletionDate, setTargetCompletionDate] = useState(project.targetCompletionDate);
  const [picEngineer, setPicEngineer] = useState(project.picEngineer);
  const [status, setStatus] = useState<ProjectStatus>(project.status);
  const [description, setDescription] = useState(project.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCust = customers.find((c) => c.id === customerId);

    onSave(project.id, {
      poNumber,
      projectName,
      customerId,
      customerName: selectedCust ? selectedCust.companyName : project.customerName,
      customerEmail: selectedCust ? selectedCust.email : project.customerEmail,
      category,
      contractValue: Number(contractValue),
      startDate,
      targetCompletionDate,
      picEngineer,
      status,
      description,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-5 my-8 transition-all ${
          isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-inherit">
          <div>
            <div className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-black font-display">Edit Data Project &amp; Manufaktur</h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Sunting spesifikasi order, target timeline dan nilai kontrak (Khusus Administrator)
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Nomor PO Customer</label>
              <input
                type="text"
                required
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                className={`w-full px-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-amber-400' : 'bg-white border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Mitra Customer</label>
              <select
                required
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.companyName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Nama Project Mesin / Alat</label>
            <input
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={`w-full px-3 py-2 text-xs font-bold rounded-xl border outline-none ${
                isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Kategori Mesin</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              >
                <option value="Special Purpose Machine">Special Purpose Machine</option>
                <option value="Automation Line">Automation Line</option>
                <option value="Jig & Fixture">Jig &amp; Fixture</option>
                <option value="Stamping Dies">Stamping Dies</option>
                <option value="Precision Parts">Precision Parts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Status Tahapan</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className={`w-full px-3 py-2 text-xs font-semibold rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-amber-400' : 'bg-white border-slate-300'
                }`}
              >
                <option value="Engineering Design">Engineering Design</option>
                <option value="Fabrication & Machining">Fabrication &amp; Machining</option>
                <option value="Assembly & Integration">Assembly &amp; Integration</option>
                <option value="Testing & FAT">Testing &amp; FAT</option>
                <option value="Delivery & Commissioning">Delivery &amp; Commissioning</option>
                <option value="Completed">Completed (100% Selesai)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Nilai Kontrak (IDR)</label>
              <div className="relative">
                <DollarSign className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-emerald-400" />
                <input
                  type="number"
                  required
                  value={contractValue}
                  onChange={(e) => setContractValue(Number(e.target.value))}
                  className={`w-full pl-8 pr-2.5 py-2 text-xs font-mono font-bold rounded-xl border outline-none text-emerald-400 ${
                    isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Tanggal Mulai</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`w-full px-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Target Selesai</label>
              <input
                type="date"
                required
                value={targetCompletionDate}
                onChange={(e) => setTargetCompletionDate(e.target.value)}
                className={`w-full px-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">PIC Engineer</label>
              <input
                type="text"
                required
                value={picEngineer}
                onChange={(e) => setPicEngineer(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Deskripsi Spesifikasi Teknis Mesin</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-xl border outline-none leading-relaxed ${
                isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
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
              Simpan Perubahan Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
