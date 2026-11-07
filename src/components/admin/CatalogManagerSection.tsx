import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  ExternalLink,
  Layers,
  Image,
  Eye,
  Info,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { MachineItem, MachineCategory } from '../../types';
import { MACHINES_DATA } from '../../data/machines';
import { useTheme } from '../../context/ThemeContext';
import { parseGoogleDriveUrl, getSafeImageUrl } from '../../utils/googleDrive';

const CATEGORIES: { id: MachineCategory; name: string }[] = [
  { id: 'automation', name: 'Automation & Customized Machines' },
  { id: 'jig-fixture', name: 'Precision Jigs & Checking Fixtures' },
  { id: 'dies-moulds', name: 'Stamping Dies & Plastic Moulds' },
  { id: 'mass-production', name: 'Mass Production Machining Parts' },
  { id: 'facility-tools', name: 'Precision Plant Machine Fleet' },
];

const STORAGE_MACHINES_KEY = 'pttid_custom_catalog_machines_v1';

export const CatalogManagerSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [machines, setMachines] = useState<MachineItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MACHINES_KEY);
      return saved ? JSON.parse(saved) : MACHINES_DATA;
    } catch {
      return MACHINES_DATA;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<MachineItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<MachineItem>>({
    name: '',
    category: 'automation',
    categoryName: 'Automation & Customized Machines',
    shortDesc: '',
    detailedDesc: '',
    image: '',
    capacityOrTonnage: '',
    travelOrDimension: '',
    accuracyOrTolerance: '±0.01 mm',
    processType: '',
    suitableFor: '',
    controlSystem: '',
  });

  const saveToStorage = (updated: MachineItem[]) => {
    setMachines(updated);
    try {
      localStorage.setItem(STORAGE_MACHINES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenAdd = () => {
    setEditingMachine(null);
    setFormData({
      name: '',
      category: 'automation',
      categoryName: 'Automation & Customized Machines',
      shortDesc: '',
      detailedDesc: '',
      image: '',
      capacityOrTonnage: '',
      travelOrDimension: '',
      accuracyOrTolerance: '±0.01 mm',
      processType: '',
      suitableFor: '',
      controlSystem: 'OMRON / MITSUBISHI PLC',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: MachineItem) => {
    setEditingMachine(m);
    setFormData({ ...m });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus mesin "${name}" dari halaman Katalog Mesin?`)) {
      const updated = machines.filter((m) => m.id !== id);
      saveToStorage(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const catObj = CATEGORIES.find((c) => c.id === formData.category);
    const categoryName = catObj ? catObj.name : 'Custom Machinery';

    // Parse Google Drive if image is a GDrive link
    let finalImageUrl = formData.image || '';
    if (finalImageUrl) {
      const parsed = parseGoogleDriveUrl(finalImageUrl);
      if (parsed.isGoogleDrive && parsed.directImageUrl) {
        finalImageUrl = parsed.directImageUrl;
      }
    }

    if (editingMachine) {
      const updated = machines.map((m) =>
        m.id === editingMachine.id
          ? ({
              ...m,
              ...formData,
              categoryName,
              image: finalImageUrl,
            } as MachineItem)
          : m
      );
      saveToStorage(updated);
    } else {
      const newMachine: MachineItem = {
        id: `mach-${Date.now()}`,
        name: formData.name || 'Mesin Baru PTT',
        category: (formData.category as MachineCategory) || 'automation',
        categoryName,
        shortDesc: formData.shortDesc || '',
        detailedDesc: formData.detailedDesc || '',
        image:
          finalImageUrl ||
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
        capacityOrTonnage: formData.capacityOrTonnage || 'Standar PTT',
        travelOrDimension: formData.travelOrDimension || 'Custom Dimension',
        accuracyOrTolerance: formData.accuracyOrTolerance || '±0.01 mm',
        processType: formData.processType || 'Machining & Assembly',
        suitableFor: formData.suitableFor || 'Industrial Manufacturing',
        controlSystem: formData.controlSystem || 'PLC / Electrical System',
        industryApplications: ['Automotive OEM', 'Precision Manufacturing'],
        keyFeatures: ['Presisi tinggi standar JIS', 'Komponen teruji standar industri'],
        specs: [
          { label: 'Akurasi Toleransi', value: formData.accuracyOrTolerance || '±0.01 mm', highlight: true },
          { label: 'Kontrol Sistem', value: formData.controlSystem || 'PLC Terintegrasi', highlight: true },
        ],
      };
      saveToStorage([newMachine, ...machines]);
    }

    setIsModalOpen(false);
  };

  const filteredMachines = machines.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-inherit">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-black font-display tracking-tight">
              Manajemen Katalog Mesin (Khusus General Admin &amp; Administrator)
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Modul khusus untuk <strong>menambah (Add)</strong>, <strong>mengedit (Edit)</strong>, dan{' '}
            <strong>menghapus (Delete)</strong> artikel spesifikasi mesin pada halaman publik KATALOG MESIN.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-500 hover:bg-purple-400 text-white flex items-center gap-1.5 shadow-md shadow-purple-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Mesin / Produk Baru</span>
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs flex items-center gap-3">
        <Sparkles className="w-4 h-4 shrink-0 text-purple-400" />
        <div className="leading-relaxed">
          <strong>Kewenangan General Admin &amp; Administrator:</strong> Setiap perubahan produk di sini langsung
          terupdate secara realtime di halaman publik <em>Katalog Mesin &amp; Tooling</em> website, lengkap dengan foto, spesifikasi dimensi, toleransi, dan tombol Request RFQ.
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Cari nama mesin, sistem kontrol, kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
              isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
            }`}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            Semua ({machines.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {cat.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Mesin */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMachines.map((m) => {
          const safeImg = getSafeImageUrl(m.image);
          return (
            <div
              key={m.id}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all hover:border-purple-500/40 ${
                isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                  <img
                    src={safeImg}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as any).src =
                        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80';
                    }}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[10px] font-mono text-purple-300 font-bold uppercase border border-purple-500/30">
                    {m.categoryName.split('&')[0]}
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <h4 className="text-sm font-black font-display text-slate-100 line-clamp-1">{m.name}</h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{m.shortDesc}</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-inherit">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Toleransi:</span>
                      <span className="text-emerald-400 font-bold">{m.accuracyOrTolerance || '±0.01 mm'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Kontrol / Siklus:</span>
                      <span className="text-cyan-400 font-bold truncate block">
                        {m.capacityOrTonnage || m.controlSystem || 'Standard'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-inherit/40 mt-2">
                <span className="text-[10px] font-mono text-neutral-500">ID: {m.id}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(m)}
                    className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3 text-purple-400" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(m.id, m.name)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 cursor-pointer"
                    title="Hapus Produk"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Tambah / Edit Mesin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-5 my-8 ${
              isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-inherit">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-black font-display">
                  {editingMachine ? 'Edit Artikel Katalog Mesin' : 'Tambah Mesin Baru ke Katalog'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Nama Mesin / SPM</label>
                  <input
                    type="text"
                    required
                    placeholder="misal: Automated Leak Testing & Laser Marking SPM"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Kategori Mesin</label>
                  <select
                    value={formData.category || 'automation'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as MachineCategory,
                      })
                    }
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Deskripsi Singkat (Ringkasan)</label>
                <input
                  type="text"
                  required
                  placeholder="Ringkasan spesifikasi untuk kartu preview di halaman katalog..."
                  value={formData.shortDesc || ''}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Deskripsi Detail &amp; Keunggulan Teknis</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan alur operasional, kendali sensor Poka-Yoke, konstruksi rangka baja..."
                  value={formData.detailedDesc || ''}
                  onChange={(e) => setFormData({ ...formData, detailedDesc: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              {/* URL Gambar (Bisa Google Drive) */}
              <div>
                <label className="block font-semibold mb-1">
                  URL Foto Mesin (Mendukung Direct Link atau Google Drive Share Link)
                </label>
                <div className="relative">
                  <Image className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    required
                    placeholder="https://drive.google.com/file/d/1a2B3c.../view atau URL gambar biasa"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-purple-300' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                {formData.image && (
                  <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-neutral-900 border border-neutral-800">
                    <img
                      src={getSafeImageUrl(formData.image)}
                      alt="Preview"
                      className="w-16 h-12 object-cover rounded-lg bg-black"
                    />
                    <div className="text-[11px] text-neutral-400">
                      <span className="text-emerald-400 font-bold">✓ Preview Siap Tampil:</span>{' '}
                      {parseGoogleDriveUrl(formData.image).isGoogleDrive
                        ? 'Google Drive auto-converted ke direct CDN stream.'
                        : 'Web image URL valid.'}
                    </div>
                  </div>
                )}
              </div>

              {/* Spesifikasi Teknis */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kapasitas / Cycle Time</label>
                  <input
                    type="text"
                    placeholder="misal: 18 detik / part"
                    value={formData.capacityOrTonnage || ''}
                    onChange={(e) => setFormData({ ...formData, capacityOrTonnage: e.target.value })}
                    className={`w-full p-2 rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Akurasi Toleransi</label>
                  <input
                    type="text"
                    placeholder="misal: ±0.01 mm"
                    value={formData.accuracyOrTolerance || ''}
                    onChange={(e) => setFormData({ ...formData, accuracyOrTolerance: e.target.value })}
                    className={`w-full p-2 rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Sistem Kontrol</label>
                  <input
                    type="text"
                    placeholder="misal: Omron Sysmac PLC"
                    value={formData.controlSystem || ''}
                    onChange={(e) => setFormData({ ...formData, controlSystem: e.target.value })}
                    className={`w-full p-2 rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-inherit">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-500 font-bold text-white shadow-md shadow-purple-500/20"
                >
                  {editingMachine ? 'Perbarui Mesin' : 'Publikasikan ke Katalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
