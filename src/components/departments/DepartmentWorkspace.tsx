import React, { useState } from 'react';
import {
  PenTool,
  Cpu,
  ShoppingCart,
  CheckCircle2,
  Factory,
  Wrench,
  Truck,
  FileSpreadsheet,
  Lock,
  ShieldCheck,
  Plus,
  Search,
  Filter,
  Printer,
  ChevronRight,
  Edit,
  Trash2,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  DeptKey,
  DEPT_LIST,
  DEPARTMENT_METAS,
  DepartmentMeta,
  mapDepartmentToKey,
  getProjectDepartmentData,
  syncProjectFromDepartmentUpdate,
  calculateOverallPhysicalProgress,
} from '../../utils/departmentDataUtils';
import { ProjectItem, DepartmentJobdesksData } from '../../types/backend';
import { DepartmentItemModal } from './DepartmentItemModal';

interface DepartmentWorkspaceProps {
  projects: ProjectItem[];
  currentUser: {
    name: string;
    email: string;
    department?: string;
    staffRole?: string;
  } | null;
  isAdmin: boolean;
  onUpdateProject: (projectId: string, data: Partial<ProjectItem>) => void;
}

export const DepartmentWorkspace: React.FC<DepartmentWorkspaceProps> = ({
  projects,
  currentUser,
  isAdmin,
  onUpdateProject,
}) => {
  const userDept = currentUser?.department;
  const isGeneralAdmin = userDept === 'General Admin';
  const canAccessAll = isAdmin || isGeneralAdmin;

  // Determine allowed department key for specific staff
  const staffDeptKey = mapDepartmentToKey(userDept);

  // Active department state (default to staff's own department or 'design' for admin/general admin)
  const [activeDeptKey, setActiveDeptKey] = useState<DeptKey>(() => {
    if (staffDeptKey && !canAccessAll) {
      return staffDeptKey;
    }
    return 'design';
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTargetProject, setModalTargetProject] = useState<ProjectItem | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Active department metadata
  const currentMeta: DepartmentMeta = DEPARTMENT_METAS[activeDeptKey] || DEPARTMENT_METAS.design;

  // Check if current user is allowed to access the activeDeptKey
  const isAccessAllowed = canAccessAll || activeDeptKey === staffDeptKey;

  // Handle department switch
  const handleSelectDept = (deptKey: DeptKey) => {
    if (!canAccessAll && deptKey !== staffDeptKey) {
      // restricted!
      return;
    }
    setActiveDeptKey(deptKey);
  };

  // Filter projects
  const relevantProjects =
    selectedProjectId === 'all'
      ? projects
      : projects.filter((p) => p.id === selectedProjectId);

  // Helper to get all items for the active department across relevant projects
  const getAggregatedItems = () => {
    const list: { project: ProjectItem; item: any }[] = [];

    relevantProjects.forEach((proj) => {
      const deptData = getProjectDepartmentData(proj);
      const items = (deptData as any)[activeDeptKey] || [];
      items.forEach((item: any) => {
        list.push({ project: proj, item });
      });
    });

    return list.filter(({ project, item }) => {
      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        project.projectName.toLowerCase().includes(q) ||
        project.poNumber.toLowerCase().includes(q) ||
        project.customerName.toLowerCase().includes(q) ||
        JSON.stringify(item).toLowerCase().includes(q);

      // Status filter
      const itemStatus = item.status || item.verdict || '';
      const matchStatus = statusFilter === 'all' || itemStatus === statusFilter;

      return matchSearch && matchStatus;
    });
  };

  const aggregatedItems = getAggregatedItems();

  // State for sync feedback notification
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Handle Save from Modal
  const handleSaveItem = (savedItem: any, attachedPhoto?: any) => {
    if (!modalTargetProject) return;

    const currentDeptData = getProjectDepartmentData(modalTargetProject);
    const existingList: any[] = [...((currentDeptData as any)[activeDeptKey] || [])];
    const idx = existingList.findIndex((it) => it.id === savedItem.id);

    // Call full real-time synchronization function
    const syncData = syncProjectFromDepartmentUpdate(
      modalTargetProject,
      activeDeptKey,
      savedItem,
      idx >= 0 ? 'edit' : 'add',
      currentUser,
      attachedPhoto
    );

    onUpdateProject(modalTargetProject.id, syncData);

    setSyncFeedback(
      `✓ Data ${currentMeta.label} berhasil disimpan! Client Portal telah terupdate real-time (Kemajuan Fisik, Milestone, Foto & Catatan Lapangan).`
    );
    setTimeout(() => setSyncFeedback(null), 4000);
  };

  // Handle Delete Item
  const handleDeleteItem = (project: ProjectItem, itemId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data jobdesk ini?')) return;

    const currentDeptData = getProjectDepartmentData(project);
    const existingList: any[] = [...((currentDeptData as any)[activeDeptKey] || [])];
    const filtered = existingList.filter((it) => it.id !== itemId);

    const updatedDeptData: DepartmentJobdesksData = {
      ...currentDeptData,
      [activeDeptKey]: filtered,
    };

    const tempProject = { ...project, departmentJobdesks: updatedDeptData };
    const { totalPercent } = calculateOverallPhysicalProgress(tempProject);

    onUpdateProject(project.id, {
      departmentJobdesks: updatedDeptData,
      progressPercent: totalPercent,
    });

    setSyncFeedback(`Data jobdesk berhasil dihapus dan progress fisik mesin disesuaikan.`);
    setTimeout(() => setSyncFeedback(null), 3000);
  };

  // Handle Quick Status Change
  const handleQuickStatusChange = (project: ProjectItem, itemId: string, newStatus: string) => {
    const currentDeptData = getProjectDepartmentData(project);
    const existingList: any[] = [...((currentDeptData as any)[activeDeptKey] || [])];
    const idx = existingList.findIndex((it) => it.id === itemId);
    if (idx < 0) return;

    const updatedItem = {
      ...existingList[idx],
      status: newStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    const syncData = syncProjectFromDepartmentUpdate(
      project,
      activeDeptKey,
      updatedItem,
      'quick-status',
      currentUser
    );

    onUpdateProject(project.id, syncData);

    setSyncFeedback(`✓ Status cepat ${currentMeta.deptName} diubah ke "${newStatus}". Client Portal otomatis tersinkronisasi.`);
    setTimeout(() => setSyncFeedback(null), 3500);
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    const target =
      selectedProjectId !== 'all'
        ? projects.find((p) => p.id === selectedProjectId) || projects[0]
        : projects[0];
    setModalTargetProject(target || null);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (project: ProjectItem, item: any) => {
    setModalTargetProject(project);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Render department icon helper
  const renderDeptIcon = (key: DeptKey, size = 'w-4 h-4') => {
    switch (key) {
      case 'design':
        return <PenTool className={size} />;
      case 'manufacturing':
        return <Cpu className={size} />;
      case 'purchasing':
        return <ShoppingCart className={size} />;
      case 'quality':
        return <CheckCircle2 className={size} />;
      case 'production':
        return <Factory className={size} />;
      case 'assembly':
        return <Wrench className={size} />;
      case 'ppic':
        return <Truck className={size} />;
      case 'generalAdmin':
        return <FileSpreadsheet className={size} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Real-time Sync Toast / Banner */}
      {syncFeedback && (
        <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in shadow-lg shadow-emerald-500/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{syncFeedback}</span>
          </div>
          <button
            onClick={() => setSyncFeedback(null)}
            className="p-1 rounded hover:bg-emerald-500/20 text-emerald-300 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Super-Access / Role Information Banner */}
      <div className="p-4 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/30">
            {canAccessAll ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono">
                {canAccessAll
                  ? isAdmin
                    ? 'Administrator Access'
                    : 'General Admin Access'
                  : `Departemen: ${currentUser?.department || 'Staff'}`}
              </span>
              <span className="text-xs text-neutral-400">
                Logged in: <strong>{currentUser?.name}</strong> ({currentUser?.email})
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-neutral-300 mt-0.5">
              {canAccessAll
                ? 'Otorisasi Super-Access Aktif: Administrator & General Admin dapat memantau, mengedit, dan memperbarui seluruh data 8 Departemen.'
                : `Akses Terbatas: Anda memiliki hak akses eksklusif untuk modul ${currentUser?.department} dan dibatasi dari departemen lainnya.`}
            </p>
          </div>
        </div>

        {canAccessAll && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
              8 Departemen Terbuka
            </span>
          </div>
        )}
      </div>

      {/* 8 Department Selector Bar */}
      <div className="bg-white dark:bg-[#0f141f] border border-slate-200 dark:border-neutral-800 rounded-3xl p-3 shadow-xs">
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-neutral-800/60 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
              Navigasi Modul Departemen (Company 8 Dept)
            </span>
          </div>
          {!canAccessAll && (
            <span className="text-xs text-amber-500 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Modul lain dikunci sesuai role</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {DEPT_LIST.map((key) => {
            const meta = DEPARTMENT_METAS[key];
            const isSelected = activeDeptKey === key;
            const isLocked = !canAccessAll && key !== staffDeptKey;

            return (
              <button
                key={key}
                disabled={isLocked}
                onClick={() => handleSelectDept(key)}
                className={`relative flex flex-col items-start p-3 rounded-2xl border text-left transition-all ${
                  isLocked
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-neutral-900/40 border-slate-200 dark:border-neutral-800 text-neutral-500'
                    : isSelected
                    ? 'bg-amber-400/10 border-amber-400 dark:border-amber-400 text-slate-900 dark:text-white shadow-md shadow-amber-400/10'
                    : 'bg-slate-50 dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 text-slate-700 dark:text-neutral-300 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                      isSelected
                        ? 'bg-amber-400 text-neutral-950 border-amber-400'
                        : `${meta.colorBg} ${meta.colorBorder} ${meta.colorText}`
                    }`}
                  >
                    {renderDeptIcon(key, 'w-3.5 h-3.5')}
                  </div>
                  {isLocked && <Lock className="w-3.5 h-3.5 text-neutral-500" />}
                </div>

                <div className="text-xs font-bold truncate w-full">{meta.label}</div>
                <div className="text-[10px] text-neutral-400 truncate w-full mt-0.5">
                  {meta.jobdesk.replace('Update ', '')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACCESS DENIED SHIELD (if somehow unauthorized) */}
      {!isAccessAllowed ? (
        <div className="p-12 text-center bg-white dark:bg-[#0f141f] border border-red-500/30 rounded-3xl space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 text-red-500 border border-red-500/30 flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Akses Departemen Terbatas
          </h3>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Akun Anda terdaftar di divisi <strong>{currentUser?.department || 'Staff'}</strong>.
            Sesuai kebijakan keamanan internal perusahaan, staf departemen hanya dapat mengakses
            dan mengupdate modul miliknya sendiri. Akun Administrator dan General Admin memiliki akses
            ke seluruh 8 departemen.
          </p>
          {staffDeptKey && (
            <button
              onClick={() => setActiveDeptKey(staffDeptKey)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs cursor-pointer hover:bg-amber-400"
            >
              Kembali ke Modul {currentUser?.department}
            </button>
          )}
        </div>
      ) : (
        /* MAIN DEPARTMENT VIEW BODY */
        <div className="space-y-6">
          {/* Active Department Header Banner */}
          <div
            className={`p-6 rounded-3xl border ${currentMeta.colorBg} ${currentMeta.colorBorder} bg-gradient-to-r from-transparent via-white/5 to-white/10 dark:from-transparent dark:via-neutral-900/20 dark:to-neutral-900/40`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-md ${currentMeta.colorBg} ${currentMeta.colorBorder} ${currentMeta.colorText}`}
                >
                  {renderDeptIcon(activeDeptKey, 'w-7 h-7')}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/80 dark:bg-neutral-900/80 border border-inherit text-slate-700 dark:text-neutral-300">
                      Modul Departemen {currentMeta.code}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-amber-500 text-neutral-950">
                      Jobdesk Utama: {currentMeta.jobdesk}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {currentMeta.label}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-neutral-300 mt-1 max-w-2xl">
                    {currentMeta.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Rekap</span>
                </button>
                <button
                  onClick={handleOpenCreateModal}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Data {currentMeta.label.replace(/^\d+\.\s*/, '')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Department KPI Quick Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0f141f]">
              <span className="text-[11px] font-mono font-bold uppercase text-neutral-400">
                Total Entri / Item
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {aggregatedItems.length}
              </div>
              <span className="text-[10px] text-neutral-400">Tercatat di sistem</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0f141f]">
              <span className="text-[11px] font-mono font-bold uppercase text-emerald-500">
                Status Selesai / Approved
              </span>
              <div className="text-2xl font-black text-emerald-500 mt-1">
                {
                  aggregatedItems.filter(({ item }) =>
                    ['Approved', 'Completed', 'Received & Warehoused', 'PASSED', 'FAT Approved', 'Delivered & Accepted', 'Signed & Approved'].includes(
                      item.status || item.verdict
                    )
                  ).length
                }
              </div>
              <span className="text-[10px] text-neutral-400">Verifikasi tuntas</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0f141f]">
              <span className="text-[11px] font-mono font-bold uppercase text-amber-500">
                Dalam Proses / Active
              </span>
              <div className="text-2xl font-black text-amber-500 mt-1">
                {
                  aggregatedItems.filter(({ item }) =>
                    ['In Progress', 'Machining', 'PO Placed', 'In Transit', 'Scheduled'].includes(
                      item.status || item.verdict
                    )
                  ).length
                }
              </div>
              <span className="text-[10px] text-neutral-400">Sedang berjalan</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0f141f]">
              <span className="text-[11px] font-mono font-bold uppercase text-blue-500">
                Cakupan Proyek
              </span>
              <div className="text-2xl font-black text-blue-500 mt-1">
                {new Set(aggregatedItems.map((a) => a.project.id)).size} / {projects.length}
              </div>
              <span className="text-[10px] text-neutral-400">Project terintegrasi</span>
            </div>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0f141f] border border-slate-200 dark:border-neutral-800">
            {/* Project Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-neutral-400 shrink-0">
                Filter Project:
              </span>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-xs text-slate-900 dark:text-white focus:outline-none max-w-xs font-mono"
              >
                <option value="all">Semua Project ({projects.length})</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.poNumber} - {p.customerName.slice(0, 25)}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder={`Cari data ${currentMeta.label.replace(/^\d+\.\s*/, '')}, part, PO...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2.5 py-1.5 text-xs text-neutral-400 hover:text-white"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Records Table */}
          <div className="bg-white dark:bg-[#0f141f] border border-slate-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xs">
            {aggregatedItems.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Belum Ada Data Ditemukan
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Belum ada catatan jobdesk untuk filter ini. Klik tombol di bawah untuk menambahkan
                  catatan pengerjaan baru.
                </p>
                <button
                  onClick={handleOpenCreateModal}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all cursor-pointer"
                >
                  + Tambah Data Pertama
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50 text-neutral-400 font-mono">
                      <th className="py-3.5 px-4 font-bold uppercase">Project & PO</th>
                      <th className="py-3.5 px-4 font-bold uppercase">Detail Item / Pekerjaan</th>
                      <th className="py-3.5 px-4 font-bold uppercase">Spesifikasi / Mesin / Software</th>
                      <th className="py-3.5 px-4 font-bold uppercase">Jadwal / Progres</th>
                      <th className="py-3.5 px-4 font-bold uppercase">Status & Verifikasi</th>
                      <th className="py-3.5 px-4 font-bold uppercase text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-neutral-800/60">
                    {aggregatedItems.map(({ project, item }) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50 dark:hover:bg-neutral-900/30 transition-colors"
                      >
                        {/* Project Info */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="font-mono font-bold text-blue-500">{project.poNumber}</div>
                          <div className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                            {project.customerName}
                          </div>
                          <div className="text-[10px] text-neutral-400 truncate max-w-[180px]">
                            {project.projectName}
                          </div>
                        </td>

                        {/* Detail Item depending on department */}
                        <td className="py-3.5 px-4 align-top">
                          {activeDeptKey === 'design' && (
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {item.stageName}
                              </div>
                              <div className="text-[11px] text-purple-500 font-mono">
                                Rev: {item.revision} | {item.drawingNumber || 'No DWG'}
                              </div>
                              {item.notes && (
                                <p className="text-[11px] text-neutral-400 mt-1 max-w-xs line-clamp-2">
                                  {item.notes}
                                </p>
                              )}
                            </div>
                          )}

                          {activeDeptKey === 'manufacturing' && (
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {item.partName} ({item.quantity} pcs)
                              </div>
                              <div className="text-[11px] text-orange-500 font-mono">
                                Part No: {item.partNumber}
                              </div>
                              {item.notes && (
                                <p className="text-[11px] text-neutral-400 mt-1 max-w-xs line-clamp-2">
                                  {item.notes}
                                </p>
                              )}
                            </div>
                          )}

                          {activeDeptKey === 'purchasing' && (
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {item.itemName} ({item.quantity} {item.unit})
                              </div>
                              <div className="text-[11px] text-amber-500 font-mono">
                                Vendor: {item.supplierName || '-'} | PO: {item.poSupplierNumber}
                              </div>
                              {item.notes && (
                                <p className="text-[11px] text-neutral-400 mt-1 max-w-xs line-clamp-2">
                                  {item.notes}
                                </p>
                              )}
                            </div>
                          )}

                          {activeDeptKey === 'quality' && (
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {item.partOrItem}
                              </div>
                              <div className="text-[11px] text-emerald-500 font-mono">
                                {item.parameterChecked}
                              </div>
                              {item.certificateNumber && (
                                <div className="text-[10px] text-neutral-400 font-mono">
                                  Cert: {item.certificateNumber}
                                </div>
                              )}
                              {item.notes && (
                                <p className="text-[11px] text-neutral-400 mt-1 max-w-xs line-clamp-2">
                                  {item.notes}
                                </p>
                              )}
                            </div>
                          )}

                          {activeDeptKey === 'production' && (
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {item.partOrSubAssy}
                              </div>
                              <div className="text-[11px] text-teal-500 font-mono">
                                {item.shift} | Line: {item.machineLine}
                              </div>
                              <div className="flex items-center gap-2 text-[11px] mt-1 font-mono">
                                <span>Target: {item.targetQty}</span>
                                <span className="text-emerald-500 font-bold">OK: {item.actualQty}</span>
                                {item.rejectQty > 0 && (
                                  <span className="text-red-500 font-bold">Reject: {item.rejectQty}</span>
                                )}
                              </div>
                            </div>
                          )}

                          {activeDeptKey === 'assembly' && (
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {item.assemblyModule}
                              </div>
                              <div className="text-[11px] text-blue-500 font-mono">
                                Lead: {item.leadTechnician}
                              </div>
                              {item.dryRunCyclesCompleted !== undefined && (
                                <div className="text-[11px] text-neutral-400">
                                  Dry Run: {item.dryRunCyclesCompleted} siklus
                                </div>
                              )}
                              {item.notes && (
                                <p className="text-[11px] text-neutral-400 mt-1 max-w-xs line-clamp-2">
                                  {item.notes}
                                </p>
                              )}
                            </div>
                          )}

                          {activeDeptKey === 'ppic' && (
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {item.deliveryStage}
                              </div>
                              <div className="text-[11px] text-cyan-500 font-mono">
                                Surat Jalan: {item.suratJalanNumber}
                              </div>
                              <div className="text-[10px] text-neutral-400 truncate max-w-xs">
                                Armada: {item.vehicleNumber} ({item.driverName})
                              </div>
                            </div>
                          )}

                          {activeDeptKey === 'generalAdmin' && (
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {item.documentTitle}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono">
                                Ref: {item.referenceNumber} | Kat: {item.category}
                              </div>
                              {item.attachmentName && (
                                <div className="text-[10px] text-blue-400 flex items-center gap-1 mt-0.5 font-mono">
                                  <span>Lampiran: {item.attachmentName}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Specifications / Hardware */}
                        <td className="py-3.5 px-4 align-top">
                          {activeDeptKey === 'design' && (
                            <div className="font-mono text-neutral-400">{item.software}</div>
                          )}
                          {activeDeptKey === 'manufacturing' && (
                            <div>
                              <div className="font-mono text-slate-900 dark:text-white">
                                {item.processType}
                              </div>
                              <div className="text-neutral-400 text-[11px]">{item.machineUsed}</div>
                              <div className="text-[10px] text-neutral-500">OP: {item.operator}</div>
                            </div>
                          )}
                          {activeDeptKey === 'purchasing' && (
                            <div>
                              <div className="font-mono text-slate-900 dark:text-white">
                                {item.itemCategory}
                              </div>
                              <div className="text-neutral-400 text-[11px]">
                                {item.specification || '-'}
                              </div>
                            </div>
                          )}
                          {activeDeptKey === 'quality' && (
                            <div>
                              <div className="font-mono text-[11px] text-slate-900 dark:text-white">
                                Tol: {item.toleranceSpec}
                              </div>
                              <div className="font-mono text-[11px] text-emerald-400 font-bold">
                                Hasil: {item.measuredResult}
                              </div>
                              <div className="text-[10px] text-neutral-400">
                                Alat: {item.measuringTool}
                              </div>
                            </div>
                          )}
                          {activeDeptKey === 'production' && (
                            <div>
                              <div className="font-mono text-neutral-300">
                                Cycle Time: {item.cycleTimeSec}s
                              </div>
                              <div className="text-[11px] text-emerald-400 font-mono">
                                Efisiensi: {item.efficiencyPercent || 100}%
                              </div>
                            </div>
                          )}
                          {activeDeptKey === 'assembly' && (
                            <div>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  item.safetyCheckPassed
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-500/10 text-red-400 border border-red-500/30'
                                }`}
                              >
                                {item.safetyCheckPassed ? 'Safety Passed' : 'Safety Pending'}
                              </span>
                            </div>
                          )}
                          {activeDeptKey === 'ppic' && (
                            <div>
                              <div className="text-neutral-300 font-mono">{item.expeditionPartner}</div>
                              {item.bastNumber && (
                                <div className="text-[11px] text-emerald-400 font-mono">
                                  BAST: {item.bastNumber}
                                </div>
                              )}
                            </div>
                          )}
                          {activeDeptKey === 'generalAdmin' && (
                            <div>
                              <div className="text-neutral-400 font-mono">PIC: {item.adminPic}</div>
                              <div className="text-[11px] text-neutral-500">Update: {item.updateDate}</div>
                            </div>
                          )}
                        </td>

                        {/* Dates & Progress */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="space-y-1">
                            {item.targetDate && (
                              <div className="text-neutral-400">
                                Target: <span className="font-mono text-slate-900 dark:text-white">{item.targetDate}</span>
                              </div>
                            )}
                            {item.targetDeliveryDate && (
                              <div className="text-neutral-400">
                                Target: <span className="font-mono text-slate-900 dark:text-white">{item.targetDeliveryDate}</span>
                              </div>
                            )}
                            {item.etaDate && (
                              <div className="text-neutral-400">
                                ETA: <span className="font-mono text-slate-900 dark:text-white">{item.etaDate}</span>
                              </div>
                            )}
                            {item.progressPercent !== undefined && (
                              <div className="w-28 space-y-1">
                                <div className="flex justify-between text-[10px] font-mono">
                                  <span>Progres</span>
                                  <span className="font-bold">{item.progressPercent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-amber-400 rounded-full"
                                    style={{ width: `${item.progressPercent}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 align-top">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase ${
                              ['Approved', 'Completed', 'Received & Warehoused', 'PASSED', 'FAT Approved', 'Delivered & Accepted', 'Signed & Approved'].includes(
                                item.status || item.verdict
                              )
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                : ['In Progress', 'Machining', 'PO Placed', 'In Transit', 'Scheduled'].includes(
                                    item.status || item.verdict
                                  )
                                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                                : 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30'
                            }`}
                          >
                            {item.status || item.verdict}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 align-top text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(project, item)}
                              className="p-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 transition-colors cursor-pointer"
                              title="Edit / Update Data"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(project, item.id)}
                              className="p-1.5 rounded-lg border border-red-500/30 hover:bg-red-500/10 text-red-500 transition-colors cursor-pointer"
                              title="Hapus Data"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit / Create Item Modal */}
      {modalTargetProject && (
        <DepartmentItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          deptKey={activeDeptKey}
          project={modalTargetProject}
          itemData={editingItem}
          onSave={handleSaveItem}
          currentUserEmail={currentUser?.email || 'staff@pttid.com'}
        />
      )}
    </div>
  );
};
