import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CalendarClock,
  Images,
  ShieldCheck,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  LogOut,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Tag,
  ChevronRight,
  Upload,
  Trash2,
  Edit,
  Eye,
  ExternalLink,
  Lock,
  Copy,
  Check,
  Sliders,
  Send,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProjectData } from '../context/ProjectDataContext';
import { useTheme } from '../context/ThemeContext';
import { PrimatechLogo } from '../components/PrimatechLogo';
import {
  ProjectItem,
  ProjectStatus,
  CustomerAccount,
  ProjectPhoto,
  InternalStaff,
} from '../types/backend';

interface BackendAdminPageProps {
  onBackToHome: () => void;
  onOpenCustomerPortal?: () => void;
}

type AdminTab = 'overview' | 'customers' | 'projects' | 'schedule' | 'gallery' | 'staff';

export const BackendAdminPage: React.FC<BackendAdminPageProps> = ({
  onBackToHome,
  onOpenCustomerPortal,
}) => {
  const { user, logout, isAdmin } = useAuth();
  const {
    staffAccounts,
    customers,
    projects,
    allPhotos,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addProject,
    updateProject,
    deleteProject,
    updateProjectProgress,
    addProjectPhoto,
    deleteProjectPhoto,
    generateRandomPassword,
  } = useProjectData();

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Modal States
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<ProjectItem | null>(null);
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState<ProjectPhoto | null>(null);

  // New Customer Form State
  const [newCustForm, setNewCustForm] = useState({
    companyName: '',
    picName: '',
    email: '',
    password: '',
    companyAddress: '',
    phone: '',
    contactPerson: '',
    industrySector: 'Automotive OEM 2W / 4W',
  });

  // New Project Form State
  const [newProjForm, setNewProjForm] = useState({
    poNumber: '',
    projectName: '',
    customerId: '',
    category: 'Special Purpose Machine' as ProjectItem['category'],
    contractValue: 250000000,
    startDate: new Date().toISOString().split('T')[0],
    targetCompletionDate: '',
    status: 'Engineering Design' as ProjectStatus,
    progressPercent: 10,
    picEngineer: user?.email || 'engmc@pttid.com',
    description: '',
  });

  // New Photo Form State
  const [newPhotoForm, setNewPhotoForm] = useState({
    projectId: '',
    title: '',
    category: 'Assembly Line' as ProjectPhoto['category'],
    imageUrl: '',
    caption: '',
  });

  // Progress Update Form State
  const [selectedProjectForProgress, setSelectedProjectForProgress] = useState<ProjectItem | null>(null);
  const [newProgressVal, setNewProgressVal] = useState(50);
  const [newStatusVal, setNewStatusVal] = useState<ProjectStatus>('Assembly & Integration');
  const [progressLogNote, setProgressLogNote] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // KPIs
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  const inProgressProjects = totalProjects - completedProjects;
  const totalContractVal = projects.reduce((acc, curr) => acc + (curr.contractValue || 0), 0);
  const avgProgress = Math.round(
    projects.reduce((acc, curr) => acc + curr.progressPercent, 0) / (totalProjects || 1)
  );

  // Preset Photos
  const PRESET_PHOTO_URLS = [
    {
      title: 'CNC Vertical Machining Center Setup',
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Assembly Station & Pneumatic Manifold',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'PLC Control Panel & Cable Harness',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Stainless Steel Frame Fabrication',
      url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Robot Cell & Safety Interlock Enclosure',
      url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Precision CMM 3D Coordinate Inspection',
      url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const handleCreateCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedPass = newCustForm.password || generateRandomPassword(newCustForm.companyName);
    addCustomer({
      ...newCustForm,
      password: generatedPass,
      contactPerson: newCustForm.contactPerson || `${newCustForm.picName} (${newCustForm.phone})`,
    });
    setIsAddCustomerOpen(false);
    setNewCustForm({
      companyName: '',
      picName: '',
      email: '',
      password: '',
      companyAddress: '',
      phone: '',
      contactPerson: '',
      industrySector: 'Automotive OEM 2W / 4W',
    });
  };

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === newProjForm.customerId);
    if (!cust) return;

    addProject({
      ...newProjForm,
      customerName: cust.companyName,
      customerEmail: cust.email,
    });

    setIsAddProjectOpen(false);
    setNewProjForm({
      poNumber: '',
      projectName: '',
      customerId: '',
      category: 'Special Purpose Machine',
      contractValue: 250000000,
      startDate: new Date().toISOString().split('T')[0],
      targetCompletionDate: '',
      status: 'Engineering Design',
      progressPercent: 10,
      picEngineer: user?.email || 'engmc@pttid.com',
      description: '',
    });
  };

  const handleCreatePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find((p) => p.id === newPhotoForm.projectId);
    if (!proj) return;

    addProjectPhoto({
      projectId: proj.id,
      projectName: proj.projectName,
      title: newPhotoForm.title,
      category: newPhotoForm.category,
      imageUrl: newPhotoForm.imageUrl || PRESET_PHOTO_URLS[0].url,
      caption: newPhotoForm.caption,
      uploadedBy: user?.name || 'Staff Engineer',
    });

    setIsAddPhotoOpen(false);
    setNewPhotoForm({
      projectId: '',
      title: '',
      category: 'Assembly Line',
      imageUrl: '',
      caption: '',
    });
  };

  const handleUpdateProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectForProgress) return;

    updateProjectProgress(
      selectedProjectForProgress.id,
      newProgressVal,
      newStatusVal,
      progressLogNote || `Update progress ke ${newProgressVal}% (${newStatusVal})`,
      user?.name || 'Staff Engineer'
    );

    setSelectedProjectForProgress(null);
    setProgressLogNote('');
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
      {/* Top Navbar for Internal Backend */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md ${
          isDark ? 'bg-[#0c101a]/95 border-neutral-800' : 'bg-white/95 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Back */}
            <div className="flex items-center gap-3 sm:gap-6">
              <button
                onClick={onBackToHome}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                }`}
                title="Kembali ke Halaman Utama Website"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Website Utama</span>
              </button>

              <div className="flex items-center gap-2">
                <PrimatechLogo className="h-8 w-auto max-w-[150px]" />
                <span
                  className={`hidden md:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold tracking-wider ${
                    isAdmin
                      ? 'bg-red-500/15 border border-red-500/30 text-red-400'
                      : 'bg-amber-400/15 border border-amber-400/30 text-amber-400'
                  }`}
                >
                  {isAdmin ? 'Admin Console' : 'Staff Portal'}
                </span>
              </div>
            </div>

            {/* User Session & Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              {onOpenCustomerPortal && (
                <button
                  onClick={onOpenCustomerPortal}
                  className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                    isDark
                      ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white'
                      : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900'
                  }`}
                  title="Lihat Tampilan Dashboard dari Sisi Customer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                  <span>Preview Portal Customer</span>
                </button>
              )}

              <div
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border ${
                  isDark ? 'border-neutral-800 bg-neutral-900/70' : 'border-slate-200 bg-slate-100/70'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-xs font-bold text-white uppercase font-mono">
                  {user?.email.slice(0, 2) || 'ST'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold leading-tight truncate max-w-[140px]">
                    {user?.name || 'Staff User'}
                  </div>
                  <div className="text-[10px] font-mono text-amber-500 truncate max-w-[140px]">
                    {user?.email || 'staff@pttid.com'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  window.location.hash = '';
                  onBackToHome();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
                title="Keluar dari Dashboard Internal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-inherit overflow-x-auto scrollbar-none">
          <nav className="flex space-x-1 sm:space-x-2 py-2">
            {[
              { id: 'overview', label: 'Ringkasan / KPI', icon: LayoutDashboard },
              { id: 'customers', label: `Data Customer (${customers.length})`, icon: Users },
              { id: 'projects', label: `Data Project (${projects.length})`, icon: FolderKanban },
              { id: 'schedule', label: 'Schedule & Progress', icon: CalendarClock },
              { id: 'gallery', label: `Foto Hasil Project (${allPhotos.length})`, icon: Images },
              { id: 'staff', label: `Akses Staff (${staffAccounts.length})`, icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-amber-400 text-neutral-950 shadow-sm shadow-amber-400/20'
                        : 'bg-red-600 text-white shadow-sm shadow-red-600/20'
                      : isDark
                      ? 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ======================= TAB 1: OVERVIEW ======================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase text-neutral-400">Total Project</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                    <FolderKanban className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-display">{totalProjects}</div>
                <div className="mt-2 text-xs flex items-center gap-1.5 text-emerald-500">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{inProgressProjects} project sedang berjalan</span>
                </div>
              </div>

              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase text-neutral-400">Mitra Customer</span>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-display">{customers.length}</div>
                <div className="mt-2 text-xs text-neutral-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Tier-1 Otomotif, Farmasi &amp; Robotik</span>
                </div>
              </div>

              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase text-neutral-400">Rata-rata Progress</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-display">{avgProgress}%</div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-red-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${avgProgress}%` }}
                  />
                </div>
              </div>

              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase text-neutral-400">Nilai Kontrak Aktif</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-lg sm:text-xl font-black font-display truncate">
                  {formatRupiah(totalContractVal)}
                </div>
                <div className="mt-2 text-xs text-neutral-400">
                  <span>{completedProjects} Project selesai &amp; serah terima</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Live Project Status Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Active Projects Table (2 Cols) */}
              <div
                className={`lg:col-span-2 p-6 rounded-2xl border ${
                  isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-base font-bold font-display">Status Pengerjaan Project Terkini</h3>
                    <p className="text-xs text-neutral-400">Pantau progres manufaktur dan milestone tim permesinan</p>
                  </div>
                  <button
                    onClick={() => setIsAddProjectOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-red-600/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Project Baru</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-amber-500">{proj.poNumber}</span>
                            <span className="text-neutral-400 text-xs">•</span>
                            <span className="text-xs font-semibold">{proj.customerName}</span>
                          </div>
                          <div className="text-sm font-bold font-display mt-0.5">{proj.projectName}</div>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold self-start sm:self-auto bg-amber-400/10 border border-amber-400/30 text-amber-400">
                          <span>{proj.status}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs font-mono mb-1 text-neutral-400">
                          <span>Target: {proj.targetCompletionDate}</span>
                          <span className="font-bold text-slate-100">{proj.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              proj.progressPercent >= 100
                                ? 'bg-emerald-500'
                                : proj.progressPercent > 50
                                ? 'bg-gradient-to-r from-amber-500 to-red-600'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${proj.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-inherit text-xs">
                        <span className="text-[11px] text-neutral-400 font-mono">
                          PIC: {proj.picEngineer.split(' ')[0]}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedProjectForProgress(proj);
                              setNewProgressVal(proj.progressPercent);
                              setNewStatusVal(proj.status);
                            }}
                            className="text-amber-500 hover:text-amber-400 font-semibold cursor-pointer"
                          >
                            Update Progress
                          </button>
                          <span className="text-neutral-500">•</span>
                          <button
                            onClick={() => setSelectedProjectForDetail(proj)}
                            className="text-neutral-400 hover:text-white cursor-pointer"
                          >
                            Detail Lengkap
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed & Quick Links (1 Col) */}
              <div className="space-y-6">
                {/* Recent Photo Uploads */}
                <div
                  className={`p-6 rounded-2xl border ${
                    isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold font-display">Foto Project Terkini</h3>
                    <button
                      onClick={() => setIsAddPhotoOpen(true)}
                      className="text-xs font-bold text-amber-500 hover:underline cursor-pointer"
                    >
                      + Tambah Foto
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {allPhotos.slice(0, 4).map((ph) => (
                      <div
                        key={ph.id}
                        onClick={() => setSelectedPhotoPreview(ph)}
                        className="group relative rounded-xl overflow-hidden aspect-video bg-neutral-900 border border-neutral-800 cursor-pointer"
                      >
                        <img
                          src={ph.imageUrl}
                          alt={ph.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                          <span className="text-[10px] text-white font-medium truncate">{ph.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Internal Team Quick Info */}
                <div
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider text-amber-500">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Akses Internal Terhubung</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Sistem ini mengelola data terpusat antara bengkel permesinan MM2100 dan portal monitoring pelanggan secara real-time.
                  </p>
                  <div className="pt-2 border-t border-inherit flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Total Akun Staf:</span>
                    <span className="font-mono font-bold text-amber-400">{staffAccounts.length} Akun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: DATA CUSTOMER ======================= */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold font-display">Data Pelanggan &amp; Akun Klien</h2>
                <p className="text-xs text-neutral-400">
                  Daftar perusahaan rekanan yang terdaftar untuk akses portal orderan dan tracking progress
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Cari PT / Nama PIC..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-9 pr-3.5 py-2 text-xs rounded-xl border outline-none ${
                      isDark
                        ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  onClick={() => setIsAddCustomerOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Customer</span>
                </button>
              </div>
            </div>

            {/* Customer Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {customers
                .filter(
                  (c) =>
                    c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.picName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((cust) => {
                  const custProjects = projects.filter(
                    (p) => p.customerId === cust.id || p.customerEmail.toLowerCase() === cust.email.toLowerCase()
                  );

                  return (
                    <div
                      key={cust.id}
                      className={`p-5 rounded-2xl border flex flex-col justify-between transition-all hover:border-amber-400/50 ${
                        isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-red-600 text-neutral-950 flex items-center justify-center font-bold text-sm font-display shadow-xs">
                              {cust.companyName.replace('PT. ', '').slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold font-display leading-tight">{cust.companyName}</h4>
                              <span className="text-[10px] font-mono text-amber-500">{cust.industrySector}</span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                            Aktif
                          </span>
                        </div>

                        <div
                          className={`p-3 rounded-xl border text-xs space-y-2 ${
                            isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div>
                            <span className="text-neutral-400 block text-[10px]">Contact Person (PIC):</span>
                            <span className="font-semibold">{cust.picName}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[10px]">Email Login:</span>
                            <span className="font-mono text-amber-400 truncate block">{cust.email}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[10px]">No. Telepon / WA:</span>
                            <span className="font-mono">{cust.phone}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[10px]">Alamat Pabrik / Kantor:</span>
                            <span className="text-[11px] text-neutral-300 line-clamp-2">{cust.companyAddress}</span>
                          </div>
                        </div>

                        {/* Password helper */}
                        <div
                          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between font-mono ${
                            isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-slate-100 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-neutral-400" />
                            <span className="text-neutral-400 text-[11px]">Pass:</span>
                            <span className="font-bold text-amber-500">{cust.password}</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(cust.password)}
                            className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                            title="Salin Password"
                          >
                            {copiedText === cust.password ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="mt-4 pt-3 border-t border-inherit flex items-center justify-between text-xs">
                        <span className="text-neutral-400 font-mono text-[11px]">
                          {custProjects.length} Project Terhubung
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (confirm(`Hapus data customer ${cust.companyName}?`)) {
                                deleteCustomer(cust.id);
                              }
                            }}
                            className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                            title="Hapus Customer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ======================= TAB 3: DATA PROJECT ======================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold font-display">Data Project &amp; Manufaktur</h2>
                <p className="text-xs text-neutral-400">
                  Kelola orderan mesin khusus, automasi, jig fixture dan progres pabrikasi
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                >
                  <option value="all">Semua Status</option>
                  <option value="Engineering Design">Engineering Design</option>
                  <option value="Fabrication & Machining">Fabrication &amp; Machining</option>
                  <option value="Assembly & Integration">Assembly &amp; Integration</option>
                  <option value="Testing & FAT">Testing &amp; FAT</option>
                  <option value="Delivery & Commissioning">Delivery &amp; Commissioning</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => setIsAddProjectOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Project Baru</span>
                </button>
              </div>
            </div>

            {/* Project List */}
            <div className="space-y-4">
              {projects
                .filter((p) => (statusFilter === 'all' ? true : p.status === statusFilter))
                .map((proj) => (
                  <div
                    key={proj.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Info */}
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-amber-400/15 border border-amber-400/30 text-amber-400">
                            {proj.poNumber}
                          </span>
                          <span className="text-xs font-bold text-neutral-400 font-display">
                            {proj.customerName}
                          </span>
                          <span className="text-neutral-500">•</span>
                          <span className="text-xs font-mono text-neutral-400">{proj.category}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-black font-display text-slate-100">
                          {proj.projectName}
                        </h3>

                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>

                      {/* Right: Progress & Status */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                        <div className="text-left lg:text-right">
                          <span className="text-[11px] font-mono text-neutral-400 block">Nilai Kontrak:</span>
                          <span className="text-sm sm:text-base font-black font-display text-emerald-400">
                            {formatRupiah(proj.contractValue)}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/15 border border-red-500/30 text-red-400">
                          <span>{proj.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Dates */}
                    <div className="mt-5 pt-4 border-t border-inherit grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                          <span className="text-neutral-400">Progres Pengerjaan Fisik</span>
                          <span className="font-bold text-amber-400">{proj.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${proj.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-xs font-mono">
                        <span className="text-neutral-400 block text-[10px]">Target Selesai:</span>
                        <span className="font-semibold text-slate-200">{proj.targetCompletionDate}</span>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedProjectForProgress(proj);
                            setNewProgressVal(proj.progressPercent);
                            setNewStatusVal(proj.status);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs cursor-pointer shadow-xs transition-all"
                        >
                          Update Progress
                        </button>

                        <button
                          onClick={() => setSelectedProjectForDetail(proj)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                            isDark
                              ? 'border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ======================= TAB 4: SCHEDULE & PROGRESS ======================= */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-extrabold font-display">Schedule &amp; Progress Milestone Project</h2>
              <p className="text-xs text-neutral-400">
                Tahapan rinci pengerjaan per project: Desain CAD, Fabrikasi CNC, Assembly, Pengujian FAT, dan Delivery
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className={`p-6 rounded-2xl border flex flex-col justify-between ${
                    isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-mono text-amber-500 font-bold">{proj.poNumber}</span>
                        <h4 className="text-base font-bold font-display mt-0.5">{proj.projectName}</h4>
                        <span className="text-xs text-neutral-400">{proj.customerName}</span>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg border border-amber-400/30">
                        {proj.progressPercent}%
                      </span>
                    </div>

                    {/* Milestone Timeline */}
                    <div className="space-y-3 pt-2">
                      {proj.milestones.map((m, idx) => (
                        <div key={m.id} className="flex items-start gap-2.5 text-xs">
                          <div className="mt-0.5">
                            {m.status === 'completed' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : m.status === 'in-progress' ? (
                              <Clock className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-neutral-600 flex items-center justify-center text-[9px] text-neutral-500">
                                {idx + 1}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div
                              className={`font-semibold ${
                                m.status === 'completed'
                                  ? 'text-neutral-300'
                                  : m.status === 'in-progress'
                                  ? 'text-amber-400'
                                  : 'text-neutral-500'
                              }`}
                            >
                              {m.title}
                            </div>
                            {m.notes && <div className="text-[11px] text-neutral-400 mt-0.5">{m.notes}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button to update progress */}
                  <div className="mt-5 pt-4 border-t border-inherit">
                    <button
                      onClick={() => {
                        setSelectedProjectForProgress(proj);
                        setNewProgressVal(proj.progressPercent);
                        setNewStatusVal(proj.status);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all shadow-md shadow-red-600/20 cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Update Schedule &amp; Progress</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB 5: FOTO-FOTO HASIL PROJECT ======================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold font-display">Galeri Dokumentasi &amp; Foto Hasil Project</h2>
                <p className="text-xs text-neutral-400">
                  Foto-foto hasil pengerjaan project mesin, perakitan, dan pengujian kualitas yang dapat dilihat customer
                </p>
              </div>

              <button
                onClick={() => setIsAddPhotoOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Foto Project</span>
              </button>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all hover:border-amber-400/50 ${
                    isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div
                    className="relative aspect-video bg-neutral-900 cursor-pointer overflow-hidden group"
                    onClick={() => setSelectedPhotoPreview(photo)}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-black/75 backdrop-blur-md text-amber-400 border border-white/10">
                        {photo.category}
                      </span>
                    </div>
                    {photo.inspectionPassed && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-600/90 text-white flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> QC Passed
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="text-[10px] font-mono text-neutral-400 truncate">{photo.projectName}</div>
                    <h4 className="text-sm font-bold font-display leading-tight">{photo.title}</h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{photo.caption}</p>

                    <div className="pt-2 border-t border-inherit flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                      <span>{photo.uploadedAt}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus foto "${photo.title}"?`)) {
                            deleteProjectPhoto(photo.id);
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        title="Hapus Foto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB 6: AKSES STAF INTERNAL ======================= */}
        {activeTab === 'staff' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold font-display">Akses Login Karyawan &amp; Administrator</h2>
                <p className="text-xs text-neutral-400">
                  Daftar 11 akun resmi internal PT. Prima Teknik Trada dengan sistem password tergenerate
                </p>
              </div>
            </div>

            {/* Staff Table */}
            <div
              className={`rounded-2xl border overflow-hidden ${
                isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead
                    className={`border-b text-[11px] font-mono uppercase tracking-wider ${
                      isDark ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    <tr>
                      <th className="py-3 px-4">Nama / Departemen</th>
                      <th className="py-3 px-4">Email Perusahaan</th>
                      <th className="py-3 px-4">Tingkat Hak Akses</th>
                      <th className="py-3 px-4">Password Sistem</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    {staffAccounts.map((staff) => (
                      <tr
                        key={staff.id}
                        className={`transition-colors ${
                          isDark ? 'hover:bg-neutral-900/40' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-100">{staff.name}</div>
                          <div className="text-[11px] text-neutral-400">{staff.department}</div>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-amber-500">
                          {staff.email}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold ${
                              staff.role === 'Administrator Full Access'
                                ? 'bg-red-500/15 border border-red-500/30 text-red-400'
                                : 'bg-blue-500/15 border border-blue-500/30 text-blue-400'
                            }`}
                          >
                            {staff.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-200">
                          {staff.password}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => copyToClipboard(`${staff.email} | ${staff.password}`)}
                            className="px-2.5 py-1 rounded-lg border border-neutral-700 hover:border-amber-400 text-neutral-300 hover:text-white cursor-pointer transition-colors"
                            title="Salin Kredensial"
                          >
                            {copiedText === `${staff.email} | ${staff.password}` ? 'Tersalin!' : 'Salin'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================= MODAL: TAMBAH CUSTOMER ======================= */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-5 ${
              isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-inherit">
              <div>
                <h3 className="text-lg font-black font-display">Tambah Data Customer Baru</h3>
                <p className="text-xs text-neutral-400">Buat akun akses dan data profil perusahaan pelanggan</p>
              </div>
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomerSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold mb-1">Nama Perusahaan (PT / CV)</label>
                <input
                  type="text"
                  required
                  placeholder="PT. Astra Daihatsu Motor"
                  value={newCustForm.companyName}
                  onChange={(e) => setNewCustForm({ ...newCustForm, companyName: e.target.value })}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Nama Contact Person (PIC)</label>
                  <input
                    type="text"
                    required
                    placeholder="Bpk. Wahyu Nugroho"
                    value={newCustForm.picName}
                    onChange={(e) => setNewCustForm({ ...newCustForm, picName: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Email Perusahaan (Login)</label>
                  <input
                    type="email"
                    required
                    placeholder="wahyu@daihatsu.co.id"
                    value={newCustForm.email}
                    onChange={(e) => setNewCustForm({ ...newCustForm, email: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">No. Telepon / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+62 812-3456-7890"
                    value={newCustForm.phone}
                    onChange={(e) => setNewCustForm({ ...newCustForm, phone: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Password Sistem (Generate)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Auto generated"
                      value={newCustForm.password}
                      onChange={(e) => setNewCustForm({ ...newCustForm, password: e.target.value })}
                      className={`w-full px-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                        isDark ? 'bg-neutral-900 border-neutral-800 text-amber-400' : 'bg-white border-slate-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setNewCustForm({
                          ...newCustForm,
                          password: generateRandomPassword(newCustForm.companyName),
                        })
                      }
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 shrink-0 cursor-pointer"
                    >
                      Gen
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Alamat Lengkap Perusahaan / Plant</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Kawasan Industri Suryacipta Karawang Timur..."
                  value={newCustForm.companyAddress}
                  onChange={(e) => setNewCustForm({ ...newCustForm, companyAddress: e.target.value })}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer"
                >
                  Simpan Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: TAMBAH PROJECT ======================= */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div
            className={`w-full max-w-xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-5 my-8 ${
              isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-inherit">
              <div>
                <h3 className="text-lg font-black font-display">Buat Order Project Baru</h3>
                <p className="text-xs text-neutral-400">Tambahkan project baru untuk dimonitoring tim dan customer</p>
              </div>
              <button
                onClick={() => setIsAddProjectOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Nomor PO Customer</label>
                  <input
                    type="text"
                    required
                    placeholder="PO/AHM-ENG/2026/0999"
                    value={newProjForm.poNumber}
                    onChange={(e) => setNewProjForm({ ...newProjForm, poNumber: e.target.value })}
                    className={`w-full px-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Pilih Customer</label>
                  <select
                    required
                    value={newProjForm.customerId}
                    onChange={(e) => setNewProjForm({ ...newProjForm, customerId: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="">-- Pilih Customer --</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.companyName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Nama Project / Mesin</label>
                <input
                  type="text"
                  required
                  placeholder="Automated Cylinder Head Assembly Machine"
                  value={newProjForm.projectName}
                  onChange={(e) => setNewProjForm({ ...newProjForm, projectName: e.target.value })}
                  className={`w-full px-3 py-2 text-xs font-bold rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Kategori Mesin</label>
                  <select
                    value={newProjForm.category}
                    onChange={(e) =>
                      setNewProjForm({ ...newProjForm, category: e.target.value as ProjectItem['category'] })
                    }
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
                  <label className="block text-xs font-semibold mb-1">Nilai Kontrak (IDR)</label>
                  <input
                    type="number"
                    required
                    value={newProjForm.contractValue}
                    onChange={(e) => setNewProjForm({ ...newProjForm, contractValue: Number(e.target.value) })}
                    className={`w-full px-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    required
                    value={newProjForm.startDate}
                    onChange={(e) => setNewProjForm({ ...newProjForm, startDate: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Target Selesai</label>
                  <input
                    type="date"
                    required
                    value={newProjForm.targetCompletionDate}
                    onChange={(e) => setNewProjForm({ ...newProjForm, targetCompletionDate: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Deskripsi Spesifikasi Teknis</label>
                <textarea
                  rows={2}
                  placeholder="Spesifikasi cycle time, kapasitas, toleransi..."
                  value={newProjForm.description}
                  onChange={(e) => setNewProjForm({ ...newProjForm, description: e.target.value })}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer"
                >
                  Simpan Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: UPDATE PROGRESS ======================= */}
      {selectedProjectForProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-7 space-y-4 ${
              isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-inherit">
              <div>
                <h3 className="text-base font-black font-display">Update Progress &amp; Milestone</h3>
                <p className="text-xs text-amber-500 font-mono">{selectedProjectForProgress.poNumber}</p>
              </div>
              <button
                onClick={() => setSelectedProjectForProgress(null)}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateProgressSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span>Persentase Pengerjaan Fisik</span>
                  <span className="font-mono text-base font-extrabold text-amber-400">{newProgressVal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={newProgressVal}
                  onChange={(e) => setNewProgressVal(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between gap-1 mt-2">
                  {[25, 50, 75, 100].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setNewProgressVal(val)}
                      className={`px-2 py-1 text-[11px] font-mono rounded-lg border cursor-pointer ${
                        newProgressVal === val
                          ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                          : 'border-neutral-700 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Status Tahapan Saat Ini</label>
                <select
                  value={newStatusVal}
                  onChange={(e) => setNewStatusVal(e.target.value as ProjectStatus)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                >
                  <option value="Engineering Design">Engineering Design</option>
                  <option value="Fabrication & Machining">Fabrication &amp; Machining</option>
                  <option value="Assembly & Integration">Assembly &amp; Integration</option>
                  <option value="Testing & FAT">Testing &amp; FAT</option>
                  <option value="Delivery & Commissioning">Delivery &amp; Commissioning</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Catatan Log Update (Akan dilihat Customer)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh: Perakitan pneumatic Festo selesai 100%, persiapan FAT bersama tim customer..."
                  value={progressLogNote}
                  onChange={(e) => setProgressLogNote(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProjectForProgress(null)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer"
                >
                  Simpan &amp; Publikasikan Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: UPLOAD FOTO PROJECT ======================= */}
      {isAddPhotoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div
            className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-7 space-y-4 my-8 ${
              isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-inherit">
              <div>
                <h3 className="text-base font-black font-display">Tambah Foto Dokumentasi Project</h3>
                <p className="text-xs text-neutral-400">Foto akan tampil di galeri admin dan portal customer</p>
              </div>
              <button
                onClick={() => setIsAddPhotoOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePhotoSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold mb-1">Pilih Project Terkait</label>
                <select
                  required
                  value={newPhotoForm.projectId}
                  onChange={(e) => setNewPhotoForm({ ...newPhotoForm, projectId: e.target.value })}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                >
                  <option value="">-- Pilih Project --</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.poNumber} - {p.projectName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Judul Foto</label>
                  <input
                    type="text"
                    required
                    placeholder="Inspeksi CMM Base Plate"
                    value={newPhotoForm.title}
                    onChange={(e) => setNewPhotoForm({ ...newPhotoForm, title: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Kategori Tahap</label>
                  <select
                    value={newPhotoForm.category}
                    onChange={(e) =>
                      setNewPhotoForm({ ...newPhotoForm, category: e.target.value as ProjectPhoto['category'] })
                    }
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="3D CAD Design">3D CAD Design</option>
                    <option value="CNC Machining">CNC Machining</option>
                    <option value="Assembly Line">Assembly Line</option>
                    <option value="Testing & FAT">Testing &amp; FAT</option>
                    <option value="Final Product">Final Product</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Pilih Template Gambar Dokumentasi</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {PRESET_PHOTO_URLS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => setNewPhotoForm({ ...newPhotoForm, imageUrl: preset.url, title: newPhotoForm.title || preset.title })}
                      className={`relative aspect-video rounded-lg overflow-hidden border cursor-pointer ${
                        newPhotoForm.imageUrl === preset.url ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-neutral-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Atau masukkan URL foto kustom (https://...)"
                  value={newPhotoForm.imageUrl}
                  onChange={(e) => setNewPhotoForm({ ...newPhotoForm, imageUrl: e.target.value })}
                  className={`w-full px-3 py-2 text-xs font-mono rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Keterangan / Caption Foto</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Catatan hasil inspeksi, toleransi, atau kemajuan perakitan..."
                  value={newPhotoForm.caption}
                  onChange={(e) => setNewPhotoForm({ ...newPhotoForm, caption: e.target.value })}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPhotoOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer"
                >
                  Upload &amp; Simpan
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
