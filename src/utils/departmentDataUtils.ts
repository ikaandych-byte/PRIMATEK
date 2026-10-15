import {
  ProjectItem,
  DepartmentJobdesksData,
  DesignScheduleItem,
  ManufacturingProcessItem,
  PurchasingItem,
  QualityCheckItem,
  ProductionOutputItem,
  AssemblyProgressItem,
  DeliveryUpdateItem,
  GeneralAdminDataItem,
} from '../types/backend';

export type DeptKey =
  | 'design'
  | 'manufacturing'
  | 'purchasing'
  | 'quality'
  | 'production'
  | 'assembly'
  | 'ppic'
  | 'generalAdmin';

export interface DepartmentMeta {
  key: DeptKey;
  deptName: string; // Exactly matching staff.department
  label: string;
  code: string;
  jobdesk: string;
  iconName: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  badge: string;
  description: string;
}

export const DEPARTMENT_METAS: Record<DeptKey, DepartmentMeta> = {
  design: {
    key: 'design',
    deptName: 'Design',
    label: '1. Design',
    code: 'DES',
    jobdesk: 'Update Schedule & CAD Engineering Milestones',
    iconName: 'PenTool',
    colorBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    colorBorder: 'border-purple-500/30',
    colorText: 'text-purple-600 dark:text-purple-400',
    badge: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    description: 'Manajemen jadwal engineering 3D CAD/CAM, rilis gambar kerja 2D fabrication, verifikasi BOM, dan persetujuan revisi desain customer.',
  },
  manufacturing: {
    key: 'manufacturing',
    deptName: 'Manufacturing Process',
    label: '2. Manufacturing Process',
    code: 'MFG',
    jobdesk: 'Update Proses Pekerjaan Manufaktur (CNC, EDM, Grinding)',
    iconName: 'Cpu',
    colorBg: 'bg-orange-500/10 dark:bg-orange-500/20',
    colorBorder: 'border-orange-500/30',
    colorText: 'text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-800',
    description: 'Monitoring routing pengerjaan komponen mesin CNC Milling 3/5-axis, Bubut CNC Lathe, Wire Cut EDM, Grinding, dan Heat Treatment.',
  },
  purchasing: {
    key: 'purchasing',
    deptName: 'Purchasing',
    label: '3. Purchasing',
    code: 'PUR',
    jobdesk: 'Update Pembelian Material & Standard Parts',
    iconName: 'ShoppingCart',
    colorBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    colorBorder: 'border-amber-500/30',
    colorText: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    description: 'Pengadaan raw material baja S45C/SKD11/SUS304, komponen pneumatik Festo/SMC, PLC Omron, Linear Guide THK, dan jasa subkontraktor.',
  },
  quality: {
    key: 'quality',
    deptName: 'Quality',
    label: '4. Quality',
    code: 'QC',
    jobdesk: 'Update Hasil Cek Quality (CMM, Toleransi & Laporan NCR)',
    iconName: 'CheckCircle2',
    colorBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    colorBorder: 'border-emerald-500/30',
    colorText: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    description: 'Inspeksi dimensi dengan mesin CMM Mitutoyo, pengujian kekerasan Rockwell HRC, kekasaran permukaan Ra, sertifikat QC dan pengendalian NCR.',
  },
  production: {
    key: 'production',
    deptName: 'Production',
    label: '5. Production',
    code: 'PROD',
    jobdesk: 'Update Hasil Produksi & Daily Output Shift',
    iconName: 'Factory',
    colorBg: 'bg-teal-500/10 dark:bg-teal-500/20',
    colorBorder: 'border-teal-500/30',
    colorText: 'text-teal-600 dark:text-teal-400',
    badge: 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-800',
    description: 'Pencatatan kuantitas hasil produksi harian, status WIP, perbandingan target vs aktual per shift kerja, cycle time mesin, dan scrap rate.',
  },
  assembly: {
    key: 'assembly',
    deptName: 'Assembly',
    label: '6. Assembly',
    code: 'ASSY',
    jobdesk: 'Update Progress Pekerjaan Assembly (Wiring, Pneumatik, FAT)',
    iconName: 'Wrench',
    colorBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    colorBorder: 'border-blue-500/30',
    colorText: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    description: 'Perakitan mekanikal rangka, piping & tubing pneumatik, panel wiring control box, dry run cycling test 100 siklus, dan persiapan FAT internal.',
  },
  ppic: {
    key: 'ppic',
    deptName: 'PPIC',
    label: '7. PPIC',
    code: 'PPIC',
    jobdesk: 'Update Delivery, Ekspedisi, Surat Jalan & BAST',
    iconName: 'Truck',
    colorBg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    colorBorder: 'border-cyan-500/30',
    colorText: 'text-cyan-600 dark:text-cyan-400',
    badge: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800',
    description: 'Manajemen jadwal pengiriman lapangan, packing peti kayu (crating), pembuatan Surat Jalan (Delivery Order), tracking armada, dan serah terima BAST.',
  },
  generalAdmin: {
    key: 'generalAdmin',
    deptName: 'General Admin',
    label: '8. General Admin',
    code: 'ADM',
    jobdesk: 'Update Data Lain-lainnya (Kontrak, Izin Safety, Manual & MOM)',
    iconName: 'FileSpreadsheet',
    colorBg: 'bg-slate-500/10 dark:bg-slate-500/20',
    colorBorder: 'border-slate-500/30',
    colorText: 'text-slate-600 dark:text-slate-300',
    badge: 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    description: 'Penyimpanan dokumen kontrak PO resmi, izin kerja K3/CSMS di lokasi pabrik customer, buku manual pengoperasian mesin, notulen MOM, dan memo internal.',
  },
};

export const DEPT_LIST: DeptKey[] = [
  'design',
  'manufacturing',
  'purchasing',
  'quality',
  'production',
  'assembly',
  'ppic',
  'generalAdmin',
];

// Helper to map staff.department string to DeptKey
export const mapDepartmentToKey = (deptName?: string): DeptKey | null => {
  if (!deptName) return null;
  const match = Object.values(DEPARTMENT_METAS).find(
    (m) => m.deptName.toLowerCase() === deptName.toLowerCase()
  );
  return match ? match.key : null;
};

// Generates sensible, highly realistic default jobdesk data for a project if not yet defined
export const getDefaultDepartmentDataForProject = (project: ProjectItem): DepartmentJobdesksData => {
  const pName = project.projectName;
  const startDate = project.startDate || '2026-08-20';
  const targetDate = project.targetCompletionDate || '2026-10-25';

  return {
    design: [
      {
        id: `des-${project.id}-1`,
        stageName: 'Konsep 3D CAD & Master Layout SolidWorks',
        software: 'SolidWorks 2024 Professional',
        designerPic: 'design@pttid.com (R&D Lead)',
        startDate: startDate,
        targetDate: '2026-08-28',
        actualDate: '2026-08-26',
        revision: 'Rev 1.0 (Approved)',
        status: 'Approved',
        drawingNumber: `DWG-${project.poNumber.slice(-4)}-01`,
        notes: `Modeling struktur rangka & mekanisme pneumatik ${pName} telah disetujui engineering customer.`,
        lastUpdated: '2026-08-27',
      },
      {
        id: `des-${project.id}-2`,
        stageName: 'Detailing Gambar Kerja 2D Fabrikasi & Toleransi Presisi',
        software: 'AutoCAD Mechanical 2024',
        designerPic: 'design@pttid.com',
        startDate: '2026-08-29',
        targetDate: '2026-09-08',
        actualDate: '2026-09-07',
        revision: 'Rev 1.2',
        status: 'Approved',
        drawingNumber: `DWG-${project.poNumber.slice(-4)}-02/03`,
        notes: 'Semua part machining CNC dan wire-cut telah diberi anotasi toleransi JIS B 0401 (H7/g6).',
        lastUpdated: '2026-09-08',
      },
      {
        id: `des-${project.id}-3`,
        stageName: 'Rilis Bill of Material (BOM) & Review Komponen Standar',
        software: 'SolidWorks BOM & Excel ERP',
        designerPic: 'design@pttid.com',
        startDate: '2026-09-09',
        targetDate: targetDate,
        actualDate: '2026-09-12',
        revision: 'Final Approved',
        status: project.progressPercent > 50 ? 'Approved' : 'In Progress',
        drawingNumber: `BOM-${project.poNumber.slice(-4)}`,
        notes: 'Daftar part silinder pneumatik SMC, sensor Keyence, rel THK, dan PLC telah diserahkan ke Purchasing.',
        lastUpdated: '2026-09-13',
      },
    ],
    manufacturing: [
      {
        id: `mfg-${project.id}-1`,
        processType: 'CNC Milling',
        partName: `Main Base Bed Plate (${pName})`,
        partNumber: `PTT-BASE-01`,
        quantity: 1,
        machineUsed: 'Makino F5 High-Speed CNC',
        operator: 'engmc@pttid.com (Triyono)',
        startDate: '2026-09-10',
        targetDate: '2026-09-16',
        actualFinishDate: '2026-09-15',
        progressPercent: 100,
        status: 'Completed',
        notes: 'Material Plat SS400 tebal 35mm milling pocketing, facing rata, dan tap hole M12 selesai presisi.',
        lastUpdated: '2026-09-15',
      },
      {
        id: `mfg-${project.id}-2`,
        processType: 'Wire Cut EDM',
        partName: 'Guide Pin & Precision Clamping Jaw',
        partNumber: 'PTT-JAW-02A',
        quantity: 4,
        machineUsed: 'Sodick AL400G Wire EDM',
        operator: 'engmc@pttid.com (Roni)',
        startDate: '2026-09-17',
        targetDate: '2026-09-22',
        actualFinishDate: '2026-09-21',
        progressPercent: 100,
        status: 'Completed',
        notes: 'Material Tool Steel SKD11 dipotong wire cut dengan akurasi profil kontur ±0.005mm.',
        lastUpdated: '2026-09-22',
      },
      {
        id: `mfg-${project.id}-3`,
        processType: 'Heat Treatment',
        partName: 'Clamping Insert & Wear Plates',
        partNumber: 'PTT-WP-04',
        quantity: 8,
        machineUsed: 'Vacuum Quenching Furnace Subcon',
        operator: 'engmc@pttid.com (Subcon Track)',
        startDate: '2026-09-23',
        targetDate: '2026-09-28',
        actualFinishDate: '2026-09-27',
        progressPercent: 100,
        status: 'Completed',
        notes: 'Proses hardening vacuum quenching mencapai target kekerasan 58-62 HRC.',
        lastUpdated: '2026-09-28',
      },
    ],
    purchasing: [
      {
        id: `pur-${project.id}-1`,
        itemCategory: 'Raw Material',
        itemName: 'Baja Tool Steel SKD11 & Plat SS400',
        specification: 'SKD11 Balok 200x120x60mm & SS400 1200x800x35mm',
        supplierName: 'PT. Metal Sarana Tama Mandiri',
        poSupplierNumber: 'PO-PUR/2026/08/112',
        quantity: 2,
        unit: 'Lot',
        orderDate: '2026-08-22',
        etaDate: '2026-08-28',
        actualArrivalDate: '2026-08-27',
        status: 'Received & Warehoused',
        picPurchasing: 'purchasing@pttid.com (Dewi)',
        estimatedCost: 28500000,
        notes: 'Sertifikat material mill sheet terlampir, dimensi dan kelurusan plat telah diverifikasi gudang.',
        lastUpdated: '2026-08-28',
      },
      {
        id: `pur-${project.id}-2`,
        itemCategory: 'Pneumatics',
        itemName: 'SMC Pneumatic Compact Cylinders & Valve Island',
        specification: 'SMC CDQ2B50-30DZ & Solenoid Manifold SY5120-5LZD',
        supplierName: 'PT. SMC Pneumatics Indonesia',
        poSupplierNumber: 'PO-PUR/2026/09/045',
        quantity: 6,
        unit: 'Set',
        orderDate: '2026-09-02',
        etaDate: '2026-09-12',
        actualArrivalDate: '2026-09-11',
        status: 'Received & Warehoused',
        picPurchasing: 'purchasing@pttid.com',
        estimatedCost: 19800000,
        notes: 'Semua komponen pneumatik original Jepang dengan garansi resmi 12 bulan.',
        lastUpdated: '2026-09-12',
      },
      {
        id: `pur-${project.id}-3`,
        itemCategory: 'Electrical & PLC',
        itemName: 'Omron Sysmac PLC & Touchscreen HMI 7-Inch',
        specification: 'Omron CP1H-X40DT-D & HMI NB7W-TW00B Ethernet',
        supplierName: 'PT. Omron Electronic Authorized Distributor',
        poSupplierNumber: 'PO-PUR/2026/09/088',
        quantity: 1,
        unit: 'Set',
        orderDate: '2026-09-08',
        etaDate: '2026-09-18',
        actualArrivalDate: '2026-09-17',
        status: 'Received & Warehoused',
        picPurchasing: 'purchasing@pttid.com',
        estimatedCost: 32000000,
        notes: 'Diserahkan ke divisi Assembly untuk pemrograman PLC ladder logic.',
        lastUpdated: '2026-09-18',
      },
    ],
    quality: [
      {
        id: `qc-${project.id}-1`,
        inspectionType: 'CMM 3D Metrology',
        partOrItem: 'Base Fixture Jig & Locating Pin Holes',
        parameterChecked: 'True Position Pin Hole & Center Distance',
        toleranceSpec: 'Pitch 180.00 ± 0.010 mm, Diam. Hole 16.000 H7 (+0.018/0)',
        measuredResult: 'Pitch 180.004 mm, Diam. 16.008 mm (OK)',
        verdict: 'PASSED',
        measuringTool: 'Mitutoyo Crysta-Apex S544 3D CNC CMM',
        inspector: 'quality@pttid.com (Rahmat / QC Lead)',
        inspectionDate: '2026-09-18',
        certificateNumber: `QC-CERT/CMM/${project.poNumber.slice(-4)}/01`,
        notes: 'Hasil pengukuran metrologi koordinat 3D sesuai standar toleransi tinggi, tidak ada deviasi.',
        lastUpdated: '2026-09-18',
      },
      {
        id: `qc-${project.id}-2`,
        inspectionType: 'Hardness Test HRC',
        partOrItem: 'Clamping Wear Plate SKD11',
        parameterChecked: 'Kekerasan Material Setelah Vacuum Heat Treatment',
        toleranceSpec: 'Target 58.0 - 62.0 HRC',
        measuredResult: 'Titik 1: 60.5 HRC, Titik 2: 60.8 HRC, Titik 3: 61.0 HRC (OK)',
        verdict: 'PASSED',
        measuringTool: 'Rockwell Digital Hardness Tester HR-150A',
        inspector: 'quality@pttid.com',
        inspectionDate: '2026-09-28',
        certificateNumber: `QC-CERT/HR/${project.poNumber.slice(-4)}/02`,
        notes: 'Tingkat kekerasan merata tanpa retak mikro pada permukaan kontak clamping.',
        lastUpdated: '2026-09-28',
      },
      {
        id: `qc-${project.id}-3`,
        inspectionType: 'Final Assembly & FAT',
        partOrItem: 'Leak Testing Pressure Sensor Calibration & Cycle Timing',
        parameterChecked: 'Repeatability Test Sensor Tekanan Digital & Waktu Siklus',
        toleranceSpec: 'Cycle time <= 18.0 detik, Deviasi uji < 0.5%',
        measuredResult: 'Rata-rata 17.6 detik, Deviasi 0.12% (OK)',
        verdict: project.progressPercent >= 85 ? 'PASSED' : 'PENDING',
        measuringTool: 'Digital Pressure Calibrator Druck DPI & Stopwatch Digital',
        inspector: 'quality@pttid.com',
        inspectionDate: '2026-10-10',
        certificateNumber: `QC-FAT/PTT/${project.poNumber.slice(-4)}/03`,
        notes: 'Uji kontinuitas 50 part simulasi tanpa false reject. Siap untuk FAT bersama tim customer.',
        lastUpdated: '2026-10-10',
      },
    ],
    production: [
      {
        id: `prod-${project.id}-1`,
        productionDate: '2026-09-18',
        shift: 'Shift 1 (Pagi)',
        partOrSubAssy: 'Machining Bracket Sensor & Cylinder Mount',
        targetQty: 12,
        actualQty: 12,
        wipQty: 0,
        rejectQty: 0,
        machineLine: 'Milling Line Bay 2',
        operatorPic: 'budianto@pttid.com (Production Lead)',
        cycleTimeSec: 420,
        efficiencyPercent: 100,
        status: 'On Target',
        notes: 'Target harian 12 unit bracket selesai 100% tanpa kendala mesin.',
        lastUpdated: '2026-09-18',
      },
      {
        id: `prod-${project.id}-2`,
        productionDate: '2026-09-25',
        shift: 'Shift 2 (Siang)',
        partOrSubAssy: 'Fabrication Frame Aluminium Profile 45x45 & Polycarbonate Cover',
        targetQty: 1,
        actualQty: 1,
        wipQty: 0,
        rejectQty: 0,
        machineLine: 'Assembly Bay 1',
        operatorPic: 'budianto@pttid.com',
        cycleTimeSec: 3600,
        efficiencyPercent: 98,
        status: 'Ahead of Plan',
        notes: 'Rangka safety enclosure terpasang rapi lengkap dengan engsel pintu servis.',
        lastUpdated: '2026-09-25',
      },
    ],
    assembly: [
      {
        id: `assy-${project.id}-1`,
        assemblyModule: 'Mechanical Base & Structure',
        leadTechnician: 'sutiknyo@pttid.com (Plant Assembly Lead)',
        progressPercent: 100,
        startDate: '2026-09-22',
        targetFinishDate: '2026-09-28',
        actualFinishDate: '2026-09-27',
        status: 'FAT Approved',
        safetyCheckPassed: true,
        notes: 'Pemasangan main plate ke rangka base, perataan waterpass, dan leveling pad selesai.',
        lastUpdated: '2026-09-27',
      },
      {
        id: `assy-${project.id}-2`,
        assemblyModule: 'Pneumatics Piping & Valve Island',
        leadTechnician: 'sutiknyo@pttid.com',
        progressPercent: 100,
        startDate: '2026-09-29',
        targetFinishDate: '2026-10-04',
        actualFinishDate: '2026-10-03',
        status: 'FAT Approved',
        safetyCheckPassed: true,
        notes: 'Selang pneumatik polyurethane 8mm teratur rapi dalam spiral wrap & cable chain.',
        lastUpdated: '2026-10-04',
      },
      {
        id: `assy-${project.id}-3`,
        assemblyModule: 'Dry Run 100 Cycles Test',
        leadTechnician: 'sutiknyo@pttid.com & riyan@pttid.com',
        progressPercent: 90,
        startDate: '2026-10-08',
        targetFinishDate: '2026-10-16',
        status: 'In Progress',
        dryRunCyclesCompleted: 85,
        safetyCheckPassed: true,
        notes: 'Uji kontinuitas otomatis 85 siklus sukses berturut-turut tanpa fault interlock.',
        lastUpdated: '2026-10-12',
      },
    ],
    ppic: [
      {
        id: `ppic-${project.id}-1`,
        deliveryStage: 'Packaging & Wooden Crating',
        suratJalanNumber: `SJ-PTT/2026/${project.poNumber.slice(-4)}`,
        targetDeliveryDate: targetDate,
        expeditionPartner: 'Internal Trucking PT. Prima Teknik Trada',
        vehicleNumber: 'B 9244 PTT',
        driverName: 'Pak Wahyudi (Driver Ekspedisi Khusus Mesin Presisi)',
        driverPhone: '+62 812-7889-1122',
        destinationAddress: project.customerName.includes('AHM')
          ? 'Kawasan Industri MM2100 Blok DD-1, Cikarang Barat, Bekasi'
          : 'Kawasan Industri Delta Silicon II / EJIP Cikarang',
        bastNumber: `BAST-PTT/2026/${project.poNumber.slice(-4)}`,
        recipientName: project.customerName,
        status: project.progressPercent >= 90 ? 'Preparing Packaging' : 'Preparing Packaging',
        notes: 'Peti kayu standar ekspor dilapisi bubble wrap anti-statik & silica gel anti lembab.',
        lastUpdated: '2026-10-12',
      },
    ],
    generalAdmin: [
      {
        id: `adm-${project.id}-1`,
        category: 'Legal Contract & PO Acceptance',
        documentTitle: `Surat Konfirmasi & Kontrak Kerja PO Resmi ${project.poNumber}`,
        referenceNumber: `KTR-PTT/2026/08-${project.poNumber.slice(-4)}`,
        adminPic: 'accounting@pttid.com (General Admin Lead)',
        updateDate: '2026-08-20',
        status: 'Signed & Approved',
        attachmentName: `Kontrak_PO_${project.poNumber.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        notes: 'Dokumen kontrak telah ditandatangani kedua belah pihak dengan materai elektronik sah.',
        lastUpdated: '2026-08-20',
      },
      {
        id: `adm-${project.id}-2`,
        category: 'Safety Permit / CSMS',
        documentTitle: 'Izin Kerja K3, CSMS & Formulir Job Safety Analysis (JSA)',
        referenceNumber: `CSMS-PERMIT/2026/X-${project.poNumber.slice(-4)}`,
        adminPic: 'info@pttid.com',
        updateDate: '2026-10-08',
        status: 'Sent to Customer',
        attachmentName: 'JSA_Installation_Commissioning.pdf',
        notes: 'Dokumen CSMS & APD teknisi telah diserahkan ke bagian Safety EHS pabrik customer.',
        lastUpdated: '2026-10-09',
      },
      {
        id: `adm-${project.id}-3`,
        category: 'Warranty Certificate',
        documentTitle: 'Sertifikat Garansi Resmi 12 Bulan & Maintenance Manual',
        referenceNumber: `WAR-PTT/2026/12M-${project.poNumber.slice(-4)}`,
        adminPic: 'accounting@pttid.com',
        updateDate: '2026-10-12',
        status: 'Draft',
        attachmentName: 'Buku_Manual_Pengoperasian_SPM.pdf',
        notes: 'Buku manual berbahasa Indonesia dan Inggris siap diserahkan saat commissioning selesai.',
        lastUpdated: '2026-10-12',
      },
    ],
  };
};

// Gets active department data for a project, falling back to rich defaults if missing
export const getProjectDepartmentData = (project: ProjectItem): DepartmentJobdesksData => {
  const existing = project.departmentJobdesks;
  const defaults = getDefaultDepartmentDataForProject(project);

  if (!existing) {
    return defaults;
  }

  return {
    design: existing.design && existing.design.length > 0 ? existing.design : defaults.design,
    manufacturing: existing.manufacturing && existing.manufacturing.length > 0 ? existing.manufacturing : defaults.manufacturing,
    purchasing: existing.purchasing && existing.purchasing.length > 0 ? existing.purchasing : defaults.purchasing,
    quality: existing.quality && existing.quality.length > 0 ? existing.quality : defaults.quality,
    production: existing.production && existing.production.length > 0 ? existing.production : defaults.production,
    assembly: existing.assembly && existing.assembly.length > 0 ? existing.assembly : defaults.assembly,
    ppic: existing.ppic && existing.ppic.length > 0 ? existing.ppic : defaults.ppic,
    generalAdmin: existing.generalAdmin && existing.generalAdmin.length > 0 ? existing.generalAdmin : defaults.generalAdmin,
  };
};

/**
 * Calculates real-time progress and summary for a single department's records
 */
export const calculateDepartmentProgress = (
  deptKey: DeptKey,
  items: any[]
): { percent: number; statusText: string; lastUpdated: string; activeLead: string; notes: string } => {
  if (!items || items.length === 0) {
    return {
      percent: 0,
      statusText: 'Belum Ada Data',
      lastUpdated: '-',
      activeLead: 'Tim PTT',
      notes: 'Menunggu input pengerjaan departemen.',
    };
  }

  const newest = items[0];
  const lastUpdated = newest.lastUpdated || newest.updateDate || newest.inspectionDate || newest.startDate || '-';

  switch (deptKey) {
    case 'design': {
      let total = 0;
      items.forEach((item: DesignScheduleItem) => {
        if (item.status === 'Approved') total += 100;
        else if (item.status === 'Under Review') total += 80;
        else if (item.status === 'In Progress') total += 50;
        else if (item.status === 'Delayed') total += 35;
        else total += 20; // Scheduled
      });
      const avg = Math.round(total / items.length);
      return {
        percent: Math.min(100, Math.max(0, avg)),
        statusText: newest.status || 'Design Active',
        lastUpdated,
        activeLead: newest.designerPic || 'design@pttid.com',
        notes: `Software: ${newest.software || 'SolidWorks'} (${newest.revision || 'Rev 1.0'}). Dwg: ${newest.drawingNumber || '-'}`,
      };
    }

    case 'manufacturing': {
      let total = 0;
      items.forEach((item: ManufacturingProcessItem) => {
        if (typeof item.progressPercent === 'number') {
          total += item.progressPercent;
        } else if (item.status === 'Completed') {
          total += 100;
        } else if (item.status === 'Post-Process') {
          total += 85;
        } else if (item.status === 'Machining') {
          total += 55;
        } else {
          total += 15;
        }
      });
      const avg = Math.round(total / items.length);
      return {
        percent: Math.min(100, Math.max(0, avg)),
        statusText: newest.status ? `Proses: ${newest.processType} (${newest.status})` : 'Machining Active',
        lastUpdated,
        activeLead: newest.operator || 'engmc@pttid.com',
        notes: `Mesin: ${newest.machineUsed}. Part: ${newest.partName} (${newest.partNumber}).`,
      };
    }

    case 'purchasing': {
      let total = 0;
      items.forEach((item: PurchasingItem) => {
        if (item.status === 'Received & Warehoused') total += 100;
        else if (item.status === 'In Transit') total += 75;
        else if (item.status === 'PO Placed') total += 50;
        else if (item.status === 'PR Submitted') total += 25;
        else total += 40; // Delayed
      });
      const avg = Math.round(total / items.length);
      return {
        percent: Math.min(100, Math.max(0, avg)),
        statusText: newest.status || 'PO Active',
        lastUpdated,
        activeLead: newest.picPurchasing || 'purchasing@pttid.com',
        notes: `Supplier: ${newest.supplierName || 'Vendor'}. Item: ${newest.itemName} (${newest.quantity} ${newest.unit}).`,
      };
    }

    case 'quality': {
      let total = 0;
      items.forEach((item: QualityCheckItem) => {
        if (item.verdict === 'PASSED') total += 100;
        else if (item.verdict === 'PASSED WITH NOTE') total += 85;
        else if (item.verdict === 'PENDING') total += 40;
        else total += 15; // REJECTED / NCR
      });
      const avg = Math.round(total / items.length);
      return {
        percent: Math.min(100, Math.max(0, avg)),
        statusText: `Verdict: ${newest.verdict}`,
        lastUpdated,
        activeLead: newest.inspector || 'quality@pttid.com',
        notes: `Alat ukur: ${newest.measuringTool}. Hasil: ${newest.measuredResult} (Tol: ${newest.toleranceSpec}).`,
      };
    }

    case 'production': {
      let total = 0;
      items.forEach((item: ProductionOutputItem) => {
        const qtyTarget = item.targetQty || 1;
        const actualRatio = Math.round(((item.actualQty || 0) / qtyTarget) * 100);
        const eff = item.efficiencyPercent || actualRatio;
        total += Math.min(100, eff);
      });
      const avg = Math.round(total / items.length);
      return {
        percent: Math.min(100, Math.max(0, avg)),
        statusText: `${newest.shift}: ${newest.status}`,
        lastUpdated,
        activeLead: newest.operatorPic || 'budianto@pttid.com',
        notes: `Output: ${newest.actualQty}/${newest.targetQty} pcs (${newest.efficiencyPercent}% efisiensi) pada ${newest.machineLine}.`,
      };
    }

    case 'assembly': {
      let total = 0;
      items.forEach((item: AssemblyProgressItem) => {
        if (typeof item.progressPercent === 'number') {
          total += item.progressPercent;
        } else if (item.status === 'FAT Approved') {
          total += 100;
        } else if (item.status === 'Dry Run Tested') {
          total += 85;
        } else if (item.status === 'In Progress') {
          total += 50;
        } else {
          total += 15;
        }
      });
      const avg = Math.round(total / items.length);
      return {
        percent: Math.min(100, Math.max(0, avg)),
        statusText: `Modul: ${newest.assemblyModule} (${newest.status})`,
        lastUpdated,
        activeLead: newest.leadTechnician || 'riyan@pttid.com',
        notes: `Uji Dry Run: ${newest.dryRunCyclesCompleted || 100} siklus. Safety check: ${newest.safetyCheckPassed ? 'Lolos' : 'Pending'}.`,
      };
    }

    case 'ppic': {
      let total = 0;
      items.forEach((item: DeliveryUpdateItem) => {
        if (item.status === 'Delivered & Accepted') total += 100;
        else if (item.status === 'Arrived on Site') total += 90;
        else if (item.status === 'In Transit') total += 75;
        else if (item.status === 'Dispatched') total += 60;
        else total += 30; // Preparing Packaging
      });
      const avg = Math.round(total / items.length);
      return {
        percent: Math.min(100, Math.max(0, avg)),
        statusText: `Status: ${newest.status}`,
        lastUpdated,
        activeLead: newest.driverName || 'PPIC Dispatch Lead',
        notes: `Surat Jalan: ${newest.suratJalanNumber}. Armada: ${newest.vehicleNumber} (${newest.expeditionPartner}).`,
      };
    }

    case 'generalAdmin': {
      let total = 0;
      items.forEach((item: GeneralAdminDataItem) => {
        if (item.status === 'Signed & Approved' || item.status === 'Archived') total += 100;
        else if (item.status === 'Sent to Customer') total += 75;
        else total += 35; // Draft
      });
      const avg = Math.round(total / items.length);
      return {
        percent: Math.min(100, Math.max(0, avg)),
        statusText: newest.status || 'Admin Verified',
        lastUpdated,
        activeLead: newest.adminPic || 'accounting@pttid.com',
        notes: `Dokumen: ${newest.documentTitle}. Ref: ${newest.referenceNumber}.`,
      };
    }

    default:
      return {
      percent: 50,
      statusText: 'In Progress',
      lastUpdated,
      activeLead: 'Tim PTT',
      notes: 'Pengerjaan berlangsung.',
    };
  }
};

/**
 * Calculates overall physical machine progress weighted across departments
 */
export const calculateOverallPhysicalProgress = (
  project: ProjectItem
): {
  totalPercent: number;
  breakdown: Record<
    DeptKey,
    { percent: number; statusText: string; lastUpdated: string; activeLead: string; notes: string; meta: DepartmentMeta }
  >;
} => {
  const deptData = getProjectDepartmentData(project);

  // Weights sum to 100%
  const weights: Record<DeptKey, number> = {
    design: 0.15, // 15%
    manufacturing: 0.25, // 25%
    purchasing: 0.10, // 10%
    quality: 0.10, // 10%
    production: 0.10, // 10%
    assembly: 0.20, // 20%
    ppic: 0.10, // 10%
    generalAdmin: 0.00, // 0% purely administrative documentation
  };

  const breakdown: any = {};
  let totalScore = 0;

  DEPT_LIST.forEach((key) => {
    const items = (deptData as any)[key] || [];
    const result = calculateDepartmentProgress(key, items);
    breakdown[key] = {
      ...result,
      meta: DEPARTMENT_METAS[key],
    };

    const weight = weights[key] || 0;
    totalScore += result.percent * weight;
  });

  const rounded = Math.round(totalScore);

  return {
    totalPercent: Math.min(100, Math.max(0, rounded)),
    breakdown,
  };
};

/**
 * Synchronizes project milestones, progress, activity logs, photos, and delivery
 * whenever any of the 8 departments saves an update.
 */
export const syncProjectFromDepartmentUpdate = (
  project: ProjectItem,
  deptKey: DeptKey,
  savedItem: any,
  actionType: 'add' | 'edit' | 'quick-status',
  currentUser: any,
  attachedPhoto?: { title: string; category?: any; imageUrl: string; caption?: string }
): Partial<ProjectItem> => {
  const meta = DEPARTMENT_METAS[deptKey];
  const currentDeptData = getProjectDepartmentData(project);
  const existingList: any[] = [...((currentDeptData as any)[deptKey] || [])];

  const idx = existingList.findIndex((it) => it.id === savedItem.id);
  if (idx >= 0) {
    existingList[idx] = savedItem;
  } else {
    existingList.unshift(savedItem);
  }

  const updatedDeptData: DepartmentJobdesksData = {
    ...currentDeptData,
    [deptKey]: existingList,
  };

  // 1. Calculate new department progress & overall progress
  const tempProject: ProjectItem = {
    ...project,
    departmentJobdesks: updatedDeptData,
  };
  const { totalPercent, breakdown } = calculateOverallPhysicalProgress(tempProject);
  const deptResult = breakdown[deptKey];

  // 2. Map & synchronize milestones
  const existingMilestones = [...(project.milestones || [])];

  // Define department-to-milestone mappings
  const milestoneMap: Record<DeptKey, { title: string; order: number }> = {
    design: { title: '1. Desain 3D CAD & Review Engineering', order: 1 },
    purchasing: { title: '2. Pengadaan Material & Standard Parts', order: 2 },
    manufacturing: { title: '3. Pemesinan CNC & Fabrikasi Presisi', order: 3 },
    production: { title: '4. Produksi Komponen & Machining Shift', order: 4 },
    quality: { title: '5. Quality Inspection & Pengujian CMM', order: 5 },
    assembly: { title: '6. Perakitan Mekanikal, Wiring & Dry Run', order: 6 },
    ppic: { title: '7. Factory Acceptance Test (FAT) & Pengiriman', order: 7 },
    generalAdmin: { title: '8. Dokumen Legal, BAST & Garansi Resmi', order: 8 },
  };

  const targetMapping = milestoneMap[deptKey];
  const msIndex = existingMilestones.findIndex(
    (m) =>
      (m.department && m.department.toLowerCase() === meta.deptName.toLowerCase()) ||
      m.title.toLowerCase().includes(meta.deptName.toLowerCase()) ||
      m.title.toLowerCase().includes(targetMapping.title.toLowerCase().slice(3))
  );

  const todayStr = new Date().toISOString().split('T')[0];
  const milestoneStatus: 'completed' | 'in-progress' | 'pending' =
    deptResult.percent >= 100 ? 'completed' : deptResult.percent > 0 ? 'in-progress' : 'pending';

  const milestoneNotes = `[Update ${meta.label}] ${deptResult.statusText} • ${deptResult.notes} (Lead: ${deptResult.activeLead.split('@')[0]})`;

  if (msIndex >= 0) {
    existingMilestones[msIndex] = {
      ...existingMilestones[msIndex],
      department: meta.deptName,
      status: milestoneStatus,
      completedDate: milestoneStatus === 'completed' ? (existingMilestones[msIndex].completedDate || todayStr) : undefined,
      notes: milestoneNotes,
    };
  } else {
    existingMilestones.push({
      id: `ms-${deptKey}-${Date.now()}`,
      title: targetMapping.title,
      department: meta.deptName,
      targetDate: project.targetCompletionDate || todayStr,
      completedDate: milestoneStatus === 'completed' ? todayStr : undefined,
      status: milestoneStatus,
      notes: milestoneNotes,
      order: targetMapping.order,
    });
  }

  // Sort milestones by order or id
  existingMilestones.sort((a, b) => (a.order || 99) - (b.order || 99));

  // 3. Activity Logs entry
  const updatedLogs = [...(project.activityLogs || [])];
  const summaryDetail = `${meta.jobdesk} → ${
    savedItem.stageName ||
    savedItem.partName ||
    savedItem.itemName ||
    savedItem.partOrItem ||
    savedItem.documentTitle ||
    savedItem.suratJalanNumber ||
    savedItem.assemblyModule ||
    'Data diperbarui'
  }: ${savedItem.status || savedItem.verdict || ''} (${deptResult.notes})`;

  updatedLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
    actor: `${currentUser?.name || 'Staff'} (${meta.deptName})`,
    action: `${actionType === 'add' ? 'Tambah Catatan' : 'Update'} ${meta.label}`,
    detail: summaryDetail,
    department: meta.deptName,
  });

  // 4. Photos sync
  const updatedPhotos = [...(project.photos || [])];
  if (attachedPhoto && attachedPhoto.imageUrl && attachedPhoto.imageUrl.trim() !== '') {
    updatedPhotos.unshift({
      id: `ph-${Date.now()}`,
      projectId: project.id,
      projectName: project.projectName,
      title: attachedPhoto.title || `Foto Dokumentasi ${meta.label}`,
      category: attachedPhoto.category || (deptKey === 'design' ? '3D CAD Design' : deptKey === 'assembly' ? 'Assembly Line' : 'CNC Machining'),
      imageUrl: attachedPhoto.imageUrl,
      caption: attachedPhoto.caption || summaryDetail,
      uploadedAt: todayStr,
      uploadedBy: `${currentUser?.name || 'Staff'} (${meta.deptName})`,
      department: meta.deptName,
      inspectionPassed: true,
    });
  }

  // 5. If PPIC updated delivery
  let updatedDelivery = project.delivery;
  if (deptKey === 'ppic') {
    const ppicItem: DeliveryUpdateItem = savedItem;
    updatedDelivery = {
      doNumber: ppicItem.suratJalanNumber || project.delivery?.doNumber || `SJ-PTT/2026`,
      deliveryDate: ppicItem.actualDeliveryDate || ppicItem.targetDeliveryDate || todayStr,
      expedition: ppicItem.expeditionPartner || project.delivery?.expedition || 'Internal Trucking PTT',
      vehicleNumber: ppicItem.vehicleNumber || project.delivery?.vehicleNumber || 'B 9244 PTT',
      driverName: ppicItem.driverName || project.delivery?.driverName || 'Driver PTT',
      driverPhone: ppicItem.driverPhone || project.delivery?.driverPhone || '+62 812-7889-1122',
      deliveryAddress: ppicItem.destinationAddress || project.delivery?.deliveryAddress || 'Kawasan Industri MM2100',
      status: ppicItem.status === 'Delivered & Accepted'
        ? 'Delivered'
        : ppicItem.status === 'In Transit'
        ? 'In Transit'
        : 'Packaging & QC Checked',
      bastNumber: ppicItem.bastNumber || project.delivery?.bastNumber || `BAST-PTT/2026`,
      receivedBy: ppicItem.recipientName || project.delivery?.receivedBy || project.customerName,
      receivedDate: ppicItem.actualDeliveryDate || project.delivery?.receivedDate,
    };
  }

  // 6. Overall project status determination
  let newProjectStatus = project.status;
  if (totalPercent >= 100) {
    newProjectStatus = 'Completed';
  } else if (totalPercent >= 85) {
    newProjectStatus = 'Testing & FAT';
  } else if (totalPercent >= 60) {
    newProjectStatus = 'Assembly & Integration';
  } else if (totalPercent >= 30) {
    newProjectStatus = 'Fabrication & Machining';
  } else {
    newProjectStatus = 'Engineering Design';
  }

  return {
    departmentJobdesks: updatedDeptData,
    progressPercent: totalPercent,
    status: newProjectStatus,
    milestones: existingMilestones,
    activityLogs: updatedLogs,
    photos: updatedPhotos,
    delivery: updatedDelivery,
    actualCompletionDate: totalPercent >= 100 ? (project.actualCompletionDate || todayStr) : undefined,
  };
};

