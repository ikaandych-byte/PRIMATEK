import React, { useState } from 'react';
import {
  Boxes,
  Truck,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Edit2,
  Trash2,
  Layers,
  ArrowUpRight,
  TrendingDown,
  Warehouse,
  Tag,
  Phone,
  Mail,
  MapPin,
  Star,
  ExternalLink,
  Package,
} from 'lucide-react';
import { useProjectData } from '../../context/ProjectDataContext';
import { useTheme } from '../../context/ThemeContext';
import { SupplierItem, InventoryStockItem } from '../../types/backend';

export const SupplierAndStockSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const {
    suppliers,
    inventoryStocks,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addStockItem,
    updateStockItem,
    deleteStockItem,
  } = useProjectData();

  const [activeTab, setActiveTab] = useState<'stocks' | 'suppliers'>('stocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal States: Stock
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [editingStock, setEditingStock] = useState<InventoryStockItem | null>(null);

  // Modal States: Supplier
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierItem | null>(null);

  // Stock Form State
  const [stockForm, setStockForm] = useState<Omit<InventoryStockItem, 'id'>>({
    itemCode: '',
    itemName: '',
    category: 'Raw Material',
    specification: '',
    supplierName: '',
    stockQty: 10,
    unit: 'Pcs',
    minStockAlert: 5,
    unitCost: 500000,
    warehouseRack: 'RACK-A1',
    lastRestockDate: new Date().toISOString().split('T')[0],
  });

  // Supplier Form State
  const [supplierForm, setSupplierForm] = useState<Omit<SupplierItem, 'id'>>({
    supplierCode: '',
    supplierName: '',
    category: 'Raw Material',
    picName: '',
    phone: '+62 ',
    email: '',
    address: 'Cikarang / Jakarta',
    rating: 5,
    isActive: true,
  });

  // Filtered Stock
  const filteredStocks = inventoryStocks.filter((s) => {
    const matchSearch =
      s.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.supplierName && s.supplierName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCat = categoryFilter === 'all' || s.category === categoryFilter;
    return matchSearch && matchCat;
  });

  // Filtered Suppliers
  const filteredSuppliers = suppliers.filter((sup) => {
    const matchSearch =
      sup.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.supplierCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.picName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'all' || sup.category === categoryFilter;
    return matchSearch && matchCat;
  });

  // KPI Calculations
  const totalStockItems = inventoryStocks.length;
  const lowStockCount = inventoryStocks.filter((s) => s.stockQty <= s.minStockAlert).length;
  const totalInventoryValue = inventoryStocks.reduce((sum, s) => sum + s.stockQty * s.unitCost, 0);
  const totalActiveSuppliers = suppliers.filter((sup) => sup.isActive).length;

  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStock) {
      updateStockItem(editingStock.id, stockForm);
      setEditingStock(null);
    } else {
      addStockItem(stockForm);
    }
    setIsAddStockOpen(false);
  };

  const handleSupplierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSupplier) {
      updateSupplier(editingSupplier.id, supplierForm);
      setEditingSupplier(null);
    } else {
      addSupplier(supplierForm);
    }
    setIsAddSupplierOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-inherit">
        <div>
          <div className="flex items-center gap-2">
            <Warehouse className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-black font-display tracking-tight">
              Manajemen Logistik: Data Stock &amp; Data Supplier
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Pengendalian bahan baku material mesin, pneumatics, komponen PLC, dan mitra vendor terverifikasi PTT
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-2xl bg-neutral-900 border border-neutral-800">
            <button
              onClick={() => {
                setActiveTab('stocks');
                setCategoryFilter('all');
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'stocks'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Data Stock Gudang ({inventoryStocks.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('suppliers');
                setCategoryFilter('all');
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'suppliers'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Data Supplier &amp; Vendor ({suppliers.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">Total Item Stock</span>
            <Boxes className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-display text-cyan-400 mt-1.5">
            {totalStockItems}{' '}
            <span className="text-xs font-normal text-neutral-400">part/material</span>
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">Tersimpan di gudang MM2100</div>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">Total Nilai Inventaris</span>
            <Warehouse className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black font-display text-emerald-400 mt-1.5">
            Rp {totalInventoryValue.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">Valuasi stok berjalan</div>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">Peringatan Stok Menipis</span>
            <AlertTriangle className={`w-4 h-4 ${lowStockCount > 0 ? 'text-rose-500' : 'text-neutral-500'}`} />
          </div>
          <div
            className={`text-2xl font-black font-display mt-1.5 ${
              lowStockCount > 0 ? 'text-rose-500' : 'text-emerald-400'
            }`}
          >
            {lowStockCount} <span className="text-xs font-normal text-neutral-400">item perlu restock</span>
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">Di bawah batas minimum</div>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">Supplier Rekanan Aktif</span>
            <Truck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-display text-amber-400 mt-1.5">
            {totalActiveSuppliers}{' '}
            <span className="text-xs font-normal text-neutral-400">mitra vendor</span>
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">Kontrak tier-1 &amp; tier-2 PTT</div>
        </div>
      </div>

      {/* Action Bar: Search & Add */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={
                activeTab === 'stocks'
                  ? 'Cari nama material, kode part, rack gudang...'
                  : 'Cari nama supplier, PIC, kategori...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none ${
                isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-300'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'stocks' ? (
            <button
              onClick={() => {
                setStockForm({
                  itemCode: `MAT-${Date.now().toString().slice(-5)}`,
                  itemName: '',
                  category: 'Raw Material',
                  specification: '',
                  supplierName: suppliers[0]?.supplierName || '',
                  stockQty: 10,
                  unit: 'Pcs',
                  minStockAlert: 5,
                  unitCost: 500000,
                  warehouseRack: 'RACK-A1',
                  lastRestockDate: new Date().toISOString().split('T')[0],
                });
                setEditingStock(null);
                setIsAddStockOpen(true);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Stock Item Baru</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setSupplierForm({
                  supplierCode: `SUP-${Date.now().toString().slice(-4)}`,
                  supplierName: '',
                  category: 'Raw Material',
                  picName: '',
                  phone: '+62 ',
                  email: '',
                  address: 'Cikarang / Jakarta',
                  rating: 5,
                  isActive: true,
                });
                setEditingSupplier(null);
                setIsAddSupplierOpen(true);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Supplier Rekanan</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB CONTENT 1: DATA STOCK */}
      {activeTab === 'stocks' && (
        <div
          className={`rounded-3xl border overflow-hidden ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/60 text-neutral-400 border-b border-inherit font-mono">
                <tr>
                  <th className="py-3 px-4">Kode &amp; Nama Part</th>
                  <th className="py-3 px-4">Kategori &amp; Rak</th>
                  <th className="py-3 px-4">Vendor Supplier</th>
                  <th className="py-3 px-4 text-right">Sisa Stok</th>
                  <th className="py-3 px-4 text-right">Harga Satuan</th>
                  <th className="py-3 px-4 text-right">Total Nilai</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {filteredStocks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-neutral-500">
                      Tidak ada data stock yang sesuai pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredStocks.map((item) => {
                    const isLow = item.stockQty <= item.minStockAlert;
                    const totalVal = item.stockQty * item.unitCost;
                    return (
                      <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-100">{item.itemName}</div>
                          <div className="text-[11px] font-mono text-cyan-400">{item.itemCode}</div>
                          {item.specification && (
                            <div className="text-[10px] text-neutral-400 truncate max-w-xs">
                              {item.specification}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-800 text-neutral-300">
                            {item.category}
                          </span>
                          <div className="text-[11px] font-mono text-neutral-400 mt-1">
                            📍 {item.warehouseRack}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-neutral-300">
                          {item.supplierName || '-'}
                          <div className="text-[10px] text-neutral-500">
                            Restock: {item.lastRestockDate}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className={`font-mono font-bold ${isLow ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {item.stockQty} {item.unit}
                          </div>
                          <div className="text-[10px] text-neutral-500">Min: {item.minStockAlert}</div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-neutral-300">
                          Rp {item.unitCost.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-amber-400">
                          Rp {totalVal.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {isLow ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 border border-rose-500/30 text-rose-400 animate-pulse">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Restock</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Aman</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                setEditingStock(item);
                                setStockForm({
                                  itemCode: item.itemCode,
                                  itemName: item.itemName,
                                  category: item.category,
                                  specification: item.specification,
                                  supplierName: item.supplierName || '',
                                  stockQty: item.stockQty,
                                  unit: item.unit,
                                  minStockAlert: item.minStockAlert,
                                  unitCost: item.unitCost,
                                  warehouseRack: item.warehouseRack,
                                  lastRestockDate: item.lastRestockDate,
                                });
                                setIsAddStockOpen(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                              title="Edit Stock"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Hapus item ${item.itemName} dari stok?`)) {
                                  deleteStockItem(item.id);
                                }
                              }}
                              className="p-1.5 rounded-lg hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 cursor-pointer"
                              title="Hapus Stock"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: DATA SUPPLIER */}
      {activeTab === 'suppliers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.length === 0 ? (
            <div className="col-span-full py-8 text-center text-neutral-500">
              Tidak ada data supplier yang sesuai pencarian.
            </div>
          ) : (
            filteredSuppliers.map((sup) => (
              <div
                key={sup.id}
                className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 ${
                  isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-bold uppercase">
                        <span>{sup.supplierCode}</span>
                        <span>•</span>
                        <span>{sup.category}</span>
                      </div>
                      <h4 className="text-base font-black font-display text-slate-100 mt-1">
                        {sup.supplierName}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-lg text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{sup.rating}.0</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-neutral-300">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 w-16">PIC:</span>
                      <span className="font-semibold text-slate-200">{sup.picName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-500" />
                      <a href={`tel:${sup.phone}`} className="hover:text-amber-400 text-neutral-300">
                        {sup.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-500" />
                      <a href={`mailto:${sup.email}`} className="hover:text-amber-400 text-neutral-300 truncate">
                        {sup.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-400 text-[11px] leading-tight">{sup.address}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-inherit">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      sup.isActive
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {sup.isActive ? 'Vendor Aktif' : 'Non-Aktif'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingSupplier(sup);
                        setSupplierForm({
                          supplierCode: sup.supplierCode,
                          supplierName: sup.supplierName,
                          category: sup.category,
                          picName: sup.picName,
                          phone: sup.phone,
                          email: sup.email,
                          address: sup.address,
                          rating: sup.rating,
                          isActive: sup.isActive,
                        });
                        setIsAddSupplierOpen(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                      title="Edit Supplier"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus data supplier ${sup.supplierName}?`)) {
                          deleteSupplier(sup.id);
                        }
                      }}
                      className="p-1.5 rounded-lg hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 cursor-pointer"
                      title="Hapus Supplier"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* MODAL: Tambah/Edit Stock */}
      {isAddStockOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div
            className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 space-y-4 my-8 ${
              isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-inherit">
              <h3 className="text-base font-black font-display">
                {editingStock ? 'Edit Data Stock Material' : 'Tambah Data Stock Baru'}
              </h3>
              <button
                onClick={() => setIsAddStockOpen(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleStockSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kode Item / Part</label>
                  <input
                    type="text"
                    required
                    value={stockForm.itemCode}
                    onChange={(e) => setStockForm({ ...stockForm, itemCode: e.target.value })}
                    className={`w-full p-2 rounded-xl border font-mono ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Kategori Material</label>
                  <select
                    value={stockForm.category}
                    onChange={(e) => setStockForm({ ...stockForm, category: e.target.value as any })}
                    className={`w-full p-2 rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="Raw Material">Raw Material (Baja/Aluminium)</option>
                    <option value="Pneumatics">Pneumatics (Festo/SMC)</option>
                    <option value="Electrical">Electrical &amp; PLC</option>
                    <option value="Hardware">Hardware &amp; Linear Guide</option>
                    <option value="Cutting Tool">Cutting Tool &amp; Carbide</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Item / Spesifikasi Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="misal: Steel Plate SS400 t=20mm x 1500 x 3000"
                  value={stockForm.itemName}
                  onChange={(e) => setStockForm({ ...stockForm, itemName: e.target.value })}
                  className={`w-full p-2 rounded-xl border ${
                    isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Jumlah Stok</label>
                  <input
                    type="number"
                    required
                    value={stockForm.stockQty}
                    onChange={(e) => setStockForm({ ...stockForm, stockQty: Number(e.target.value) })}
                    className={`w-full p-2 rounded-xl border font-mono ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Satuan</label>
                  <input
                    type="text"
                    required
                    value={stockForm.unit}
                    onChange={(e) => setStockForm({ ...stockForm, unit: e.target.value })}
                    className={`w-full p-2 rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Min. Alert</label>
                  <input
                    type="number"
                    required
                    value={stockForm.minStockAlert}
                    onChange={(e) => setStockForm({ ...stockForm, minStockAlert: Number(e.target.value) })}
                    className={`w-full p-2 rounded-xl border font-mono ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Harga Satuan (IDR)</label>
                  <input
                    type="number"
                    required
                    value={stockForm.unitCost}
                    onChange={(e) => setStockForm({ ...stockForm, unitCost: Number(e.target.value) })}
                    className={`w-full p-2 rounded-xl border font-mono ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Lokasi Rak Gudang</label>
                  <input
                    type="text"
                    required
                    placeholder="misal: RACK-A-01"
                    value={stockForm.warehouseRack}
                    onChange={(e) => setStockForm({ ...stockForm, warehouseRack: e.target.value })}
                    className={`w-full p-2 rounded-xl border font-mono ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Supplier / Rekanan Pengadaan</label>
                <select
                  value={stockForm.supplierName}
                  onChange={(e) => setStockForm({ ...stockForm, supplierName: e.target.value })}
                  className={`w-full p-2 rounded-xl border ${
                    isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                  }`}
                >
                  <option value="">Pilih Supplier...</option>
                  {suppliers.map((sup) => (
                    <option key={sup.id} value={sup.supplierName}>
                      {sup.supplierName} ({sup.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-inherit">
                <button
                  type="button"
                  onClick={() => setIsAddStockOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 font-bold text-neutral-950 shadow-md"
                >
                  Simpan Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Tambah/Edit Supplier */}
      {isAddSupplierOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div
            className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 space-y-4 my-8 ${
              isDark ? 'bg-[#0f141f] border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-inherit">
              <h3 className="text-base font-black font-display">
                {editingSupplier ? 'Edit Data Supplier' : 'Tambah Supplier Baru'}
              </h3>
              <button
                onClick={() => setIsAddSupplierOpen(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleSupplierSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kode Supplier</label>
                  <input
                    type="text"
                    required
                    value={supplierForm.supplierCode}
                    onChange={(e) => setSupplierForm({ ...supplierForm, supplierCode: e.target.value })}
                    className={`w-full p-2 rounded-xl border font-mono ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Kategori Produk</label>
                  <select
                    value={supplierForm.category}
                    onChange={(e) => setSupplierForm({ ...supplierForm, category: e.target.value as any })}
                    className={`w-full p-2 rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="Raw Material">Raw Material (Baja/Logam)</option>
                    <option value="Pneumatics">Pneumatics (Festo/SMC)</option>
                    <option value="Electrical & PLC">Electrical &amp; PLC</option>
                    <option value="Motion & Tooling">Motion &amp; Tooling (THK/Mitutoyo)</option>
                    <option value="Subcon Services">Subcon Services (Plating/Heat Treat)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Perusahaan Supplier</label>
                <input
                  type="text"
                  required
                  placeholder="misal: PT. Krakatau Steel & Special Metal"
                  value={supplierForm.supplierName}
                  onChange={(e) => setSupplierForm({ ...supplierForm, supplierName: e.target.value })}
                  className={`w-full p-2 rounded-xl border ${
                    isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Nama PIC Supplier</label>
                  <input
                    type="text"
                    required
                    value={supplierForm.picName}
                    onChange={(e) => setSupplierForm({ ...supplierForm, picName: e.target.value })}
                    className={`w-full p-2 rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">No. Telp / WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={supplierForm.phone}
                    onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })}
                    className={`w-full p-2 rounded-xl border ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Email Perusahaan</label>
                <input
                  type="email"
                  required
                  value={supplierForm.email}
                  onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })}
                  className={`w-full p-2 rounded-xl border font-mono ${
                    isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Alamat Kantor / Pabrik Supplier</label>
                <textarea
                  rows={2}
                  value={supplierForm.address}
                  onChange={(e) => setSupplierForm({ ...supplierForm, address: e.target.value })}
                  className={`w-full p-2 rounded-xl border ${
                    isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-inherit">
                <button
                  type="button"
                  onClick={() => setIsAddSupplierOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 font-bold text-neutral-950 shadow-md"
                >
                  Simpan Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
