import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Clock,
  Briefcase,
  Calendar,
  Layers,
} from 'lucide-react';
import { ProjectItem, ProjectMilestone } from '../../types/backend';
import { useTheme } from '../../context/ThemeContext';

interface ManageMilestonesModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSave: (projectId: string, milestones: ProjectMilestone[]) => void;
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
];

export const ManageMilestonesModal: React.FC<ManageMilestonesModalProps> = ({
  project,
  onClose,
  onSave,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!project) return null;

  const [milestones, setMilestones] = useState<ProjectMilestone[]>(
    project.milestones ? [...project.milestones] : []
  );

  const moveMilestone = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= milestones.length) return;

    const list = [...milestones];
    const temp = list[index];
    list[index] = list[newIdx];
    list[newIdx] = temp;
    setMilestones(list);
  };

  const updateItem = (index: number, patch: Partial<ProjectMilestone>) => {
    setMilestones((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  const removeMilestone = (index: number) => {
    setMilestones((prev) => prev.filter((_, i) => i !== index));
  };

  const addMilestone = () => {
    const newItem: ProjectMilestone = {
      id: `m-${Date.now()}`,
      title: 'Tahapan Pengerjaan Baru',
      department: 'Manufacturing Process',
      targetDate: project.targetCompletionDate || new Date().toISOString().split('T')[0],
      status: 'pending',
      notes: '',
      order: milestones.length + 1,
    };
    setMilestones((prev) => [...prev, newItem]);
  };

  const handleSave = () => {
    // Re-index orders
    const indexed = milestones.map((m, idx) => ({
      ...m,
      order: idx + 1,
    }));
    onSave(project.id, indexed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-6 transition-all max-h-[92vh] flex flex-col ${
          isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-inherit flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-black font-display text-slate-100">
                Kelola Urutan Schedule &amp; Milestone Pengerjaan
              </h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Project: <span className="text-amber-400 font-bold">{project.poNumber}</span> —{' '}
              {project.projectName} (Khusus Administrator)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Milestone List */}
        <div className="p-5 overflow-y-auto space-y-4 scrollbar-thin">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-mono">
              Total {milestones.length} Tahapan Alur Kerja
            </span>
            <button
              type="button"
              onClick={addMilestone}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Tahapan Baru</span>
            </button>
          </div>

          <div className="space-y-3">
            {milestones.map((m, idx) => (
              <div
                key={m.id || idx}
                className={`p-4 rounded-2xl border transition-all space-y-3 ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={m.title}
                      placeholder="Judul tahapan..."
                      onChange={(e) => updateItem(idx, { title: e.target.value })}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border outline-none w-full sm:w-80 ${
                        isDark ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-white border-slate-300'
                      }`}
                    />
                  </div>

                  {/* Move & Delete buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveMilestone(idx, 'up')}
                      className="p-1.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 disabled:opacity-30 cursor-pointer"
                      title="Pindah ke Atas"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === milestones.length - 1}
                      onClick={() => moveMilestone(idx, 'down')}
                      className="p-1.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 disabled:opacity-30 cursor-pointer"
                      title="Pindah ke Bawah"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeMilestone(idx)}
                      className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/20 cursor-pointer ml-1"
                      title="Hapus Tahapan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Departemen Pelaksana
                    </label>
                    <select
                      value={m.department || 'Manufacturing Process'}
                      onChange={(e) => updateItem(idx, { department: e.target.value })}
                      className={`w-full px-2.5 py-1.5 text-xs rounded-xl border outline-none ${
                        isDark ? 'bg-neutral-900 border-neutral-800 text-amber-400' : 'bg-white border-slate-300 text-amber-600'
                      }`}
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Target Tanggal Selesai
                    </label>
                    <input
                      type="date"
                      value={m.targetDate}
                      onChange={(e) => updateItem(idx, { targetDate: e.target.value })}
                      className={`w-full px-2.5 py-1.5 text-xs font-mono rounded-xl border outline-none ${
                        isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">Status Progres</label>
                    <select
                      value={m.status}
                      onChange={(e) =>
                        updateItem(idx, {
                          status: e.target.value as any,
                          completedDate:
                            e.target.value === 'completed'
                              ? new Date().toISOString().split('T')[0]
                              : undefined,
                        })
                      }
                      className={`w-full px-2.5 py-1.5 text-xs font-semibold rounded-xl border outline-none ${
                        m.status === 'completed'
                          ? 'text-emerald-400'
                          : m.status === 'in-progress'
                          ? 'text-amber-400'
                          : 'text-neutral-400'
                      } ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'}`}
                    >
                      <option value="pending">Pending (Belum Dimulai)</option>
                      <option value="in-progress">In-Progress (Sedang Dikerjakan)</option>
                      <option value="completed">Completed (Selesai)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={m.notes || ''}
                    placeholder="Catatan update / spesifikasi teknis untuk departemen ini..."
                    onChange={(e) => updateItem(idx, { notes: e.target.value })}
                    className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-300 placeholder-neutral-600' : 'bg-white border-slate-300 text-slate-700'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-inherit flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer transition-all"
          >
            Simpan Urutan &amp; Milestone
          </button>
        </div>
      </div>
    </div>
  );
};
