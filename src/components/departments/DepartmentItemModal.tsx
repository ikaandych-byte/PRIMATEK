import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  PenTool,
  Cpu,
  ShoppingCart,
  CheckCircle2,
  Factory,
  Wrench,
  Truck,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  Camera,
  Image,
} from 'lucide-react';
import { DeptKey, DEPARTMENT_METAS } from '../../utils/departmentDataUtils';
import { ProjectItem } from '../../types/backend';

interface DepartmentItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  deptKey: DeptKey;
  project: ProjectItem;
  itemData?: any; // If editing an existing item, or null for creating new
  onSave: (savedItem: any, attachedPhoto?: any) => void;
  currentUserEmail: string;
}

export const DepartmentItemModal: React.FC<DepartmentItemModalProps> = ({
  isOpen,
  onClose,
  deptKey,
  project,
  itemData,
  onSave,
  currentUserEmail,
}) => {
  const meta = DEPARTMENT_METAS[deptKey];
  const isEditing = Boolean(itemData && itemData.id);

  // Form states initialized according to department
  const [formData, setFormData] = useState<any>({});
  const [attachPhoto, setAttachPhoto] = useState(false);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (itemData) {
      setFormData({ ...itemData });
    } else {
      // Initialize fresh template for the active department
      const today = new Date().toISOString().split('T')[0];
      const targetDate = project.targetCompletionDate || today;

      switch (deptKey) {
        case 'design':
          setFormData({
            id: `des-${Date.now()}`,
            stageName: '',
            software: 'SolidWorks 2024 Professional',
            designerPic: currentUserEmail,
            startDate: today,
            targetDate: targetDate,
            actualDate: '',
            revision: 'Rev 0.1',
            status: 'In Progress',
            drawingNumber: `DWG-${project.poNumber.slice(-4)}-0${Math.floor(Math.random() * 9 + 1)}`,
            notes: '',
            lastUpdated: today,
          });
          break;
        case 'manufacturing':
          setFormData({
            id: `mfg-${Date.now()}`,
            processType: 'CNC Milling',
            partName: '',
            partNumber: `PTT-PRT-${Math.floor(Math.random() * 900 + 100)}`,
            quantity: 1,
            machineUsed: 'Makino F5 High-Speed CNC',
            operator: currentUserEmail,
            startDate: today,
            targetDate: targetDate,
            actualFinishDate: '',
            progressPercent: 0,
            status: 'Machining',
            notes: '',
            lastUpdated: today,
          });
          break;
        case 'purchasing':
          setFormData({
            id: `pur-${Date.now()}`,
            itemCategory: 'Raw Material',
            itemName: '',
            specification: '',
            supplierName: '',
            poSupplierNumber: `PO-PUR/2026/${Math.floor(Math.random() * 900 + 100)}`,
            quantity: 1,
            unit: 'Pcs',
            orderDate: today,
            etaDate: targetDate,
            actualArrivalDate: '',
            status: 'PO Placed',
            picPurchasing: currentUserEmail,
            estimatedCost: 5000000,
            notes: '',
            lastUpdated: today,
          });
          break;
        case 'quality':
          setFormData({
            id: `qc-${Date.now()}`,
            inspectionType: 'In-Process CNC Machining',
            partOrItem: '',
            parameterChecked: 'Dimensi Akurasi & Toleransi Presisi',
            toleranceSpec: '± 0.010 mm',
            measuredResult: '',
            verdict: 'PASSED',
            measuringTool: 'Mitutoyo Crysta-Apex S544 3D CNC CMM',
            inspector: currentUserEmail,
            inspectionDate: today,
            ncrNumber: '',
            certificateNumber: `QC-CERT/${project.poNumber.slice(-4)}/${Math.floor(Math.random() * 90 + 10)}`,
            notes: '',
            lastUpdated: today,
          });
          break;
        case 'production':
          setFormData({
            id: `prod-${Date.now()}`,
            productionDate: today,
            shift: 'Shift 1 (Pagi)',
            partOrSubAssy: '',
            targetQty: 10,
            actualQty: 10,
            wipQty: 0,
            rejectQty: 0,
            machineLine: 'Milling Line Bay 2',
            operatorPic: currentUserEmail,
            cycleTimeSec: 300,
            efficiencyPercent: 100,
            status: 'On Target',
            notes: '',
            lastUpdated: today,
          });
          break;
        case 'assembly':
          setFormData({
            id: `assy-${Date.now()}`,
            assemblyModule: 'Mechanical Base & Structure',
            leadTechnician: currentUserEmail,
            progressPercent: 50,
            startDate: today,
            targetFinishDate: targetDate,
            actualFinishDate: '',
            status: 'In Progress',
            dryRunCyclesCompleted: 0,
            safetyCheckPassed: true,
            notes: '',
            lastUpdated: today,
          });
          break;
        case 'ppic':
          setFormData({
            id: `ppic-${Date.now()}`,
            deliveryStage: 'Packaging & Wooden Crating',
            suratJalanNumber: `SJ-PTT/2026/${project.poNumber.slice(-4)}`,
            targetDeliveryDate: targetDate,
            actualDeliveryDate: '',
            expeditionPartner: 'Internal Trucking PT. Prima Teknik Trada',
            vehicleNumber: 'B 9244 PTT',
            driverName: 'Pak Wahyudi',
            driverPhone: '+62 812-7889-1122',
            destinationAddress: project.customerName,
            bastNumber: `BAST-PTT/2026/${project.poNumber.slice(-4)}`,
            recipientName: project.customerName,
            status: 'Preparing Packaging',
            notes: '',
            lastUpdated: today,
          });
          break;
        case 'generalAdmin':
          setFormData({
            id: `adm-${Date.now()}`,
            category: 'Legal Contract & PO Acceptance',
            documentTitle: '',
            referenceNumber: `DOC-PTT/2026/${project.poNumber.slice(-4)}`,
            adminPic: currentUserEmail,
            updateDate: today,
            status: 'Signed & Approved',
            attachmentName: '',
            notes: '',
            lastUpdated: today,
          });
          break;
      }
    }
  }, [isOpen, itemData, deptKey, project, currentUserEmail]);

  if (!isOpen) return null;

  const handleChange = (field: string, val: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...formData,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    let photoPayload = undefined;
    if (attachPhoto && photoUrl.trim()) {
      photoPayload = {
        title: photoTitle.trim() || `Dokumentasi Fisik ${meta.label}`,
        imageUrl: photoUrl.trim(),
        caption: photoCaption.trim() || formData.notes || `Update progres fisik dari ${meta.label}`,
        category:
          deptKey === 'design'
            ? '3D CAD Design'
            : deptKey === 'assembly'
            ? 'Assembly Line'
            : deptKey === 'quality'
            ? 'Testing & FAT'
            : 'CNC Machining',
      };
    }

    onSave(updated, photoPayload);
    onClose();
  };

  const renderIcon = () => {
    switch (deptKey) {
      case 'design':
        return <PenTool className="w-5 h-5" />;
      case 'manufacturing':
        return <Cpu className="w-5 h-5" />;
      case 'purchasing':
        return <ShoppingCart className="w-5 h-5" />;
      case 'quality':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'production':
        return <Factory className="w-5 h-5" />;
      case 'assembly':
        return <Wrench className="w-5 h-5" />;
      case 'ppic':
        return <Truck className="w-5 h-5" />;
      case 'generalAdmin':
        return <FileSpreadsheet className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f141f] border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${meta.colorBg} ${meta.colorBorder} ${meta.colorText}`}>
              {renderIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  {meta.label}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {project.poNumber}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isEditing ? 'Perbarui Data Jobdesk' : 'Tambah Catatan Jobdesk Baru'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Context Bar */}
        <div className="px-6 py-2.5 bg-amber-500/10 dark:bg-amber-500/5 border-b border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between">
          <span className="truncate max-w-md">
            <strong>Proyek:</strong> {project.projectName} ({project.customerName})
          </span>
          <span className="font-mono">Dept PIC: {currentUserEmail}</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* ===================== 1. DESIGN ===================== */}
          {deptKey === 'design' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                  Nama Tahap / Deliverable Desain CAD *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Detail 2D Drawing Fixture & Toleransi H7/g6"
                  value={formData.stageName || ''}
                  onChange={(e) => handleChange('stageName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Software CAD/CAM
                  </label>
                  <select
                    value={formData.software || 'SolidWorks 2024 Professional'}
                    onChange={(e) => handleChange('software', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="SolidWorks 2024 Professional">SolidWorks 2024 Professional</option>
                    <option value="AutoCAD Mechanical 2024">AutoCAD Mechanical 2024</option>
                    <option value="Mastercam 2024">Mastercam 2024 (CAM CNC)</option>
                    <option value="Autodesk Inventor 2024">Autodesk Inventor 2024</option>
                    <option value="Catia V5">Catia V5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Indeks Revisi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rev 1.0 (Approved)"
                    value={formData.revision || ''}
                    onChange={(e) => handleChange('revision', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Target Selesai *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.targetDate || ''}
                    onChange={(e) => handleChange('targetDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Status Jadwal
                  </label>
                  <select
                    value={formData.status || 'In Progress'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Scheduled">Scheduled (Terjadwal)</option>
                    <option value="In Progress">In Progress (Dikerjakan)</option>
                    <option value="Under Review">Under Review (Review Customer)</option>
                    <option value="Approved">Approved (Disetujui)</option>
                    <option value="Delayed">Delayed (Tertunda)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                  Nomor Gambar Kerja (Drawing Number)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: DWG-0942-02"
                  value={formData.drawingNumber || ''}
                  onChange={(e) => handleChange('drawingNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                />
              </div>
            </>
          )}

          {/* ===================== 2. MANUFACTURING PROCESS ===================== */}
          {deptKey === 'manufacturing' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Jenis Proses Manufaktur *
                  </label>
                  <select
                    value={formData.processType || 'CNC Milling'}
                    onChange={(e) => handleChange('processType', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="CNC Milling">CNC Milling (3-Axis / 5-Axis)</option>
                    <option value="CNC Lathe">CNC Lathe / Bubut Presisi</option>
                    <option value="Wire Cut EDM">Wire Cut EDM</option>
                    <option value="Surface Grinding">Surface Grinding / Poles Rata</option>
                    <option value="Heat Treatment">Heat Treatment & Hardening</option>
                    <option value="Laser Cutting & Bending">Laser Cutting & Bending</option>
                    <option value="Benchwork / Fitting">Benchwork / Manual Fitting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Mesin yang Digunakan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Makino F5 High Speed CNC"
                    value={formData.machineUsed || ''}
                    onChange={(e) => handleChange('machineUsed', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Nama Komponen / Part yang Dikerjakan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Base Bed Plate / Clamping Jaw"
                    value={formData.partName || ''}
                    onChange={(e) => handleChange('partName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Jumlah (Qty)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity || 1}
                    onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Progres Pengerjaan (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progressPercent || 0}
                      onChange={(e) => handleChange('progressPercent', parseInt(e.target.value) || 0)}
                      className="w-full accent-orange-500"
                    />
                    <span className="font-mono font-bold text-sm text-orange-500 min-w-10">
                      {formData.progressPercent || 0}%
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Status Pengerjaan
                  </label>
                  <select
                    value={formData.status || 'Machining'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Queued">Queued (Antrian Mesin)</option>
                    <option value="Machining">Machining (Sedang Dikerjakan)</option>
                    <option value="Post-Process">Post-Process (Finishing/Coating)</option>
                    <option value="Completed">Completed (Selesai)</option>
                    <option value="Hold">Hold (Ditahan)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Operator / PIC
                  </label>
                  <input
                    type="text"
                    value={formData.operator || ''}
                    onChange={(e) => handleChange('operator', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </>
          )}

          {/* ===================== 3. PURCHASING ===================== */}
          {deptKey === 'purchasing' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Kategori Material / Part *
                  </label>
                  <select
                    value={formData.itemCategory || 'Raw Material'}
                    onChange={(e) => handleChange('itemCategory', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Raw Material">Raw Material (Baja S45C, SKD11, SS400, Al7075)</option>
                    <option value="Pneumatics">Pneumatics (SMC, Festo, Mindman)</option>
                    <option value="Electrical & PLC">Electrical & PLC (Omron, Mitsubishi, Keyence)</option>
                    <option value="Motion & Linear Guide">Motion & Linear Guide (THK, Hiwin, MISUMI)</option>
                    <option value="Hardware & Fasteners">Hardware & Fasteners (Baut 12.9, Pin, Bearing)</option>
                    <option value="Subcon Service">Subcon Service (Anodize, Hard Chrome, Quenching)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Nomor PO Supplier
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PO-PUR/2026/09/110"
                    value={formData.poSupplierNumber || ''}
                    onChange={(e) => handleChange('poSupplierNumber', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                  Nama Item / Part yang Dibeli *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SMC Compact Cylinder CDQ2B50-30DZ"
                  value={formData.itemName || ''}
                  onChange={(e) => handleChange('itemName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Nama Supplier / Vendor
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PT. SMC Pneumatics Indonesia"
                    value={formData.supplierName || ''}
                    onChange={(e) => handleChange('supplierName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Estimasi Kedatangan (ETA)
                  </label>
                  <input
                    type="date"
                    value={formData.etaDate || ''}
                    onChange={(e) => handleChange('etaDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Status Pengadaan
                  </label>
                  <select
                    value={formData.status || 'PO Placed'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="PR Submitted">PR Submitted (Pengajuan)</option>
                    <option value="PO Placed">PO Placed (PO Terbit)</option>
                    <option value="In Transit">In Transit (Dalam Pengiriman)</option>
                    <option value="Received & Warehoused">Received & Warehoused (Diterima Gudang)</option>
                    <option value="Delayed">Delayed (Tertunda)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ===================== 4. QUALITY ===================== */}
          {deptKey === 'quality' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Jenis Inspeksi QC *
                  </label>
                  <select
                    value={formData.inspectionType || 'In-Process CNC Machining'}
                    onChange={(e) => handleChange('inspectionType', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Incoming Material">Incoming Material QC (Bahan Baku)</option>
                    <option value="In-Process CNC Machining">In-Process CNC Machining QC</option>
                    <option value="CMM 3D Metrology">CMM 3D Metrology (Mitutoyo Crysta)</option>
                    <option value="Hardness Test HRC">Hardness Test HRC (Uji Kekerasan)</option>
                    <option value="Final Assembly & FAT">Final Assembly & FAT Inspection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Hasil / Verdict QC *
                  </label>
                  <select
                    value={formData.verdict || 'PASSED'}
                    onChange={(e) => handleChange('verdict', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-bold text-slate-900 dark:text-white"
                  >
                    <option value="PASSED" className="text-emerald-500">PASSED (Lolos Sempurna)</option>
                    <option value="PASSED WITH NOTE" className="text-amber-500">PASSED WITH NOTE (Lolos Bersyarat)</option>
                    <option value="REJECTED / NCR" className="text-red-500">REJECTED / NCR (Ditolak / Terbitkan NCR)</option>
                    <option value="PENDING" className="text-neutral-400">PENDING (Menunggu Pengujian)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                  Nama Part atau Sub-Sistem yang Dicek *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Base Plate Jig & Hole Center Mitutoyo CMM"
                  value={formData.partOrItem || ''}
                  onChange={(e) => handleChange('partOrItem', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Spesifikasi Toleransi Standar
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 180.00 ± 0.010 mm / 58-62 HRC"
                    value={formData.toleranceSpec || ''}
                    onChange={(e) => handleChange('toleranceSpec', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Hasil Pengukuran Aktual
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 180.004 mm (OK Deviasi +0.004 mm)"
                    value={formData.measuredResult || ''}
                    onChange={(e) => handleChange('measuredResult', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Alat Ukur / Metrology Digunakan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Mitutoyo Crysta-Apex S544 3D CNC CMM"
                    value={formData.measuringTool || ''}
                    onChange={(e) => handleChange('measuringTool', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Nomor Sertifikat QC / NCR
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: QC-CERT/CMM/0942/01"
                    value={formData.certificateNumber || ''}
                    onChange={(e) => handleChange('certificateNumber', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            </>
          )}

          {/* ===================== 5. PRODUCTION ===================== */}
          {deptKey === 'production' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Tanggal Produksi
                  </label>
                  <input
                    type="date"
                    value={formData.productionDate || ''}
                    onChange={(e) => handleChange('productionDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Shift Kerja *
                  </label>
                  <select
                    value={formData.shift || 'Shift 1 (Pagi)'}
                    onChange={(e) => handleChange('shift', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Shift 1 (Pagi)">Shift 1 (Pagi 07:00 - 15:30)</option>
                    <option value="Shift 2 (Siang)">Shift 2 (Siang 15:30 - 23:30)</option>
                    <option value="Shift 3 (Malam)">Shift 3 (Malam 23:30 - 07:00)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Lini / Bay Mesin
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Milling Line Bay 2"
                    value={formData.machineLine || ''}
                    onChange={(e) => handleChange('machineLine', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                  Nama Komponen / Batch Produksi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Machining Bracket Sensor & Clamping Base"
                  value={formData.partOrSubAssy || ''}
                  onChange={(e) => handleChange('partOrSubAssy', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Target Qty
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.targetQty || 0}
                    onChange={(e) => handleChange('targetQty', parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    Aktual Selesai (OK)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.actualQty || 0}
                    onChange={(e) => handleChange('actualQty', parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-500/50 bg-white dark:bg-neutral-900 text-sm font-mono font-bold text-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                    WIP (Dalam Proses)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.wipQty || 0}
                    onChange={(e) => handleChange('wipQty', parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/50 bg-white dark:bg-neutral-900 text-sm font-mono text-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-red-600 dark:text-red-400 mb-1">
                    Reject / Scrap
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.rejectQty || 0}
                    onChange={(e) => handleChange('rejectQty', parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-red-500/50 bg-white dark:bg-neutral-900 text-sm font-mono text-red-500"
                  />
                </div>
              </div>
            </>
          )}

          {/* ===================== 6. ASSEMBLY ===================== */}
          {deptKey === 'assembly' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                  Modul / Bagian Perakitan (Assembly) *
                </label>
                <select
                  value={formData.assemblyModule || 'Mechanical Base & Structure'}
                  onChange={(e) => handleChange('assemblyModule', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                >
                  <option value="Mechanical Base & Structure">Mechanical Base & Structure (Rangka Mekanikal)</option>
                  <option value="Pneumatics Piping & Valve Island">Pneumatics Piping & Valve Island (Pneumatik)</option>
                  <option value="Electrical Cabinet Wiring">Electrical Cabinet Wiring (Panel Kelistrikan)</option>
                  <option value="Sensor & Actuator Calibration">Sensor & Actuator Calibration (Kalibrasi Sensor)</option>
                  <option value="PLC & HMI Programming">PLC & HMI Programming (Interlock PLC)</option>
                  <option value="Dry Run 100 Cycles Test">Dry Run 100 Cycles Test (Uji Siklus Tanpa Beban)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Progres Perakitan Modul (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progressPercent || 0}
                      onChange={(e) => handleChange('progressPercent', parseInt(e.target.value) || 0)}
                      className="w-full accent-blue-500"
                    />
                    <span className="font-mono font-bold text-sm text-blue-500 min-w-10">
                      {formData.progressPercent || 0}%
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Status Assembly
                  </label>
                  <select
                    value={formData.status || 'In Progress'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Pending">Pending (Belum Mulai)</option>
                    <option value="In Progress">In Progress (Sedang Dirakit)</option>
                    <option value="Dry Run Tested">Dry Run Tested (Uji Siklus Sukses)</option>
                    <option value="FAT Approved">FAT Approved (Lolos Uji FAT)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Siklus Dry Run Selesai (Cycles)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Contoh: 85 siklus"
                    value={formData.dryRunCyclesCompleted || 0}
                    onChange={(e) => handleChange('dryRunCyclesCompleted', parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-neutral-200">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.safetyCheckPassed)}
                      onChange={(e) => handleChange('safetyCheckPassed', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 accent-blue-500"
                    />
                    <span>Safety Interlock & Emergency Stop Passed</span>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* ===================== 7. PPIC ===================== */}
          {deptKey === 'ppic' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Tahap Pengiriman (Delivery Phase) *
                  </label>
                  <select
                    value={formData.deliveryStage || 'Packaging & Wooden Crating'}
                    onChange={(e) => handleChange('deliveryStage', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Packaging & Wooden Crating">Packaging & Wooden Crating (Packing Peti Kayu)</option>
                    <option value="Dispatched from Factory">Dispatched from Factory (Berangkat dari Workshop)</option>
                    <option value="In Transit">In Transit (Dalam Perjalanan ke Pabrik Customer)</option>
                    <option value="Arrived at Customer Site">Arrived at Customer Site (Tiba di Lokasi)</option>
                    <option value="Installation & Handover BAST">Installation & Handover BAST (Serah Terima BAST)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Nomor Surat Jalan (DO) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: SJ-PTT/2026/0942"
                    value={formData.suratJalanNumber || ''}
                    onChange={(e) => handleChange('suratJalanNumber', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Mitra Ekspedisi / Armada
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Internal Trucking PTT"
                    value={formData.expeditionPartner || ''}
                    onChange={(e) => handleChange('expeditionPartner', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Nomor Polisi Kendaraan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: B 9244 PTT"
                    value={formData.vehicleNumber || ''}
                    onChange={(e) => handleChange('vehicleNumber', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Nama & Kontak Driver
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Pak Wahyudi (+62 812-xxx)"
                    value={formData.driverName || ''}
                    onChange={(e) => handleChange('driverName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Tanggal Pengiriman (Delivery Date)
                  </label>
                  <input
                    type="date"
                    value={formData.targetDeliveryDate || ''}
                    onChange={(e) => handleChange('targetDeliveryDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Nomor BAST (Berita Acara Serah Terima)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: BAST-PTT/2026/0942"
                    value={formData.bastNumber || ''}
                    onChange={(e) => handleChange('bastNumber', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            </>
          )}

          {/* ===================== 8. GENERAL ADMIN ===================== */}
          {deptKey === 'generalAdmin' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Kategori Dokumen / Data *
                  </label>
                  <select
                    value={formData.category || 'Legal Contract & PO Acceptance'}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Legal Contract & PO Acceptance">Legal Contract & PO Acceptance (Kontrak Kerja Resmi)</option>
                    <option value="Safety Permit / CSMS">Safety Permit / CSMS / JSA (Izin K3 Pabrik)</option>
                    <option value="Insurance & Shipping Letter">Insurance & Shipping Letter (Asuransi Pengangkutan)</option>
                    <option value="Warranty Certificate">Warranty Certificate (Sertifikat Garansi & Manual Book)</option>
                    <option value="Minutes of Meeting (MOM)">Minutes of Meeting (Notulen Rapat Teknis / MOM)</option>
                    <option value="Administrative Notes & Memo">Administrative Notes & Memo (Catatan Arsip Internal)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Nomor Referensi Dokumen
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: KTR-PTT/2026/08-0942"
                    value={formData.referenceNumber || ''}
                    onChange={(e) => handleChange('referenceNumber', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                  Judul Dokumen / Catatan Administrasi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Surat Izin Kerja Panas & CSMS Teknisi Lapangan"
                  value={formData.documentTitle || ''}
                  onChange={(e) => handleChange('documentTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Status Dokumen
                  </label>
                  <select
                    value={formData.status || 'Signed & Approved'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Draft">Draft (Konsep)</option>
                    <option value="Sent to Customer">Sent to Customer (Terkirim ke Klien)</option>
                    <option value="Signed & Approved">Signed & Approved (Ditandatangani Sah)</option>
                    <option value="Archived">Archived (Diarsipkan)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Nama Lampiran File / Arsip
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: CSMS_Safety_Permit_Signed.pdf"
                    value={formData.attachmentName || ''}
                    onChange={(e) => handleChange('attachmentName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </>
          )}

          {/* Lampirkan Foto Hasil Pengerjaan (Real-Time Sync ke Client Portal) */}
          <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Lampirkan Foto Hasil Pengerjaan (Tampil Real-Time di Client Portal Customer)
                </span>
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={attachPhoto}
                  onChange={(e) => setAttachPhoto(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-500"
                />
                <span className="text-slate-700 dark:text-neutral-300">Aktifkan Lampiran Foto</span>
              </label>
            </div>

            {attachPhoto && (
              <div className="space-y-3 pt-2 border-t border-amber-500/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                      Judul Foto Dokumentasi
                    </label>
                    <input
                      type="text"
                      placeholder={`Contoh: Hasil Pengerjaan ${meta.deptName} - ${project.projectName.slice(0, 25)}`}
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                      Keterangan / Caption Foto
                    </label>
                    <input
                      type="text"
                      placeholder="Penjelasan ringkas kondisi fisik mesin di workshop..."
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    URL Foto / Gambar Dokumentasi Fisik
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white mb-2"
                  />

                  {/* Preset Quick Image Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-neutral-400 text-[10px]">Pilih Foto Contoh Workshop:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoUrl('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80');
                        if (!photoTitle) setPhotoTitle(`Rangka Assembly & Pneumatik - ${meta.deptName}`);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 transition-colors"
                    >
                      Pneumatik & Base Frame
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoUrl('https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80');
                        if (!photoTitle) setPhotoTitle(`Inspeksi CMM Presisi - ${meta.deptName}`);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 transition-colors"
                    >
                      Inspeksi CMM 3D
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoUrl('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80');
                        if (!photoTitle) setPhotoTitle(`Panel Listrik & Wiring HMI - ${meta.deptName}`);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 transition-colors"
                    >
                      Wiring Listrik & HMI
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoUrl('https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1000&q=80');
                        if (!photoTitle) setPhotoTitle(`Pemesinan CNC Milling 5-Axis - ${meta.deptName}`);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 transition-colors"
                    >
                      CNC Milling Workshop
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoUrl('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80');
                        if (!photoTitle) setPhotoTitle(`Pengiriman & Packing Truk - ${meta.deptName}`);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 transition-colors"
                    >
                      Ekspedisi Truk
                    </button>
                  </div>

                  {photoUrl && (
                    <div className="mt-2.5 flex items-center gap-3 p-2 rounded-xl border border-neutral-700 bg-black/40">
                      <img src={photoUrl} alt="Preview" className="w-16 h-12 object-cover rounded-lg" />
                      <div className="text-xs text-neutral-300">
                        <span className="font-bold text-amber-400">Preview Foto Siap Kirim ke Portal Klien</span>
                        <p className="text-[11px] text-neutral-400 truncate max-w-sm">{photoTitle || 'Tanpa judul'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Common Notes Field for all departments */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Catatan Teknis / Keterangan Tambahan
            </label>
            <textarea
              rows={3}
              placeholder="Tuliskan catatan teknis detail, instruksi pengerjaan, atau catatan approval..."
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 text-xs font-bold transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Simpan Perubahan' : 'Simpan Data Baru'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
