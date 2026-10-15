export type StaffRole = 'Administrator Full Access' | 'Staff Access';

export type DepartmentType =
  | 'Executive Management'
  | 'Design'
  | 'Manufacturing Process'
  | 'Purchasing'
  | 'Quality'
  | 'Production'
  | 'Assembly'
  | 'PPIC'
  | 'General Admin';

export interface InternalStaff {
  id: string;
  email: string;
  name: string;
  department: string;
  role: StaffRole;
  password: string;
  phone: string;
  avatarBg: string;
}

export interface CustomerAccount {
  id: string;
  companyName: string;
  picName: string;
  email: string;
  password: string;
  companyAddress: string;
  phone: string;
  contactPerson: string;
  industrySector: string;
  registeredAt: string;
  status: 'active' | 'verified';
}

export type ProjectStatus =
  | 'Engineering Design'
  | 'Fabrication & Machining'
  | 'Assembly & Integration'
  | 'Testing & FAT'
  | 'Delivery & Commissioning'
  | 'Completed';

export interface ProjectMilestone {
  id: string;
  title: string;
  department?: string; // Design | Manufacturing Process | Purchasing | Quality | Production | Assembly | PPIC | General Admin
  targetDate: string;
  completedDate?: string;
  status: 'completed' | 'in-progress' | 'pending';
  notes?: string;
  order?: number;
}

export interface ProjectPhoto {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  category: '3D CAD Design' | 'CNC Machining' | 'Assembly Line' | 'Testing & FAT' | 'Final Product';
  imageUrl: string;
  caption: string;
  uploadedAt: string;
  uploadedBy: string;
  department?: string; // e.g. 'Design' | 'Manufacturing Process' | 'Purchasing' | 'Quality' | 'Production' | 'Assembly' | 'PPIC' | 'General Admin'
  inspectionPassed?: boolean;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  detail: string;
  department?: string; // department name for real update filtering
}

export interface InvoiceDetails {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  finalPaymentAmount: number;
  status: 'Unpaid' | 'DP Paid' | 'Paid Full';
  bankName: string;
  bankAccount: string;
  accountHolder: string;
  paidAt?: string;
}

export interface DeliveryDetails {
  doNumber: string; // Delivery Order / Surat Jalan
  deliveryDate: string;
  expedition: string;
  vehicleNumber?: string;
  driverName: string;
  driverPhone: string;
  deliveryAddress: string;
  status: 'Packaging & QC Checked' | 'In Transit' | 'Delivered' | 'Installed & BAST Signed';
  bastNumber: string;
  receivedBy: string;
  receivedDate?: string;
}

export interface ProjectFinancialItem {
  // Cash Inflow (Termin Pembayaran)
  downPaymentPercent: number; // default 50
  downPaymentAmount: number;
  downPaymentStatus: 'Received' | 'Pending' | 'Overdue';
  downPaymentDate?: string;
  finalPaymentPercent: number; // default 50
  finalPaymentAmount: number;
  finalPaymentStatus: 'Received' | 'Pending' | 'Not Invoiced';
  finalPaymentDate?: string;

  // Cost Outflow (HPP & Biaya Produksi Manufaktur)
  materialCost: number; // Biaya Material (Baja, Sensor, Pneumatic, PLC, Rel, Bearing)
  machiningCost: number; // Biaya Mesin CNC/Milling, Tooling & Listrik Pabrik
  subconCost: number; // Biaya Subkontraktor (Hard Chrome, Anodize, Heat Treatment)
  assemblyLaborCost: number; // Biaya Manpower, Perakitan & Quality Control
  logisticsCost: number; // Biaya Ekspedisi, Packing Kayu & Delivery Lapangan
  otherCost?: number; // Biaya Operasional / Konsumsi Lapangan

  // Taxes (Perpajakan)
  taxPpnPercent: number; // default 11 (PPN 11%)
  taxPpnAmount?: number;
  taxPph23Percent: number; // default 2 (PPh 23 Jasa Teknik 2%)
  taxPph23Amount?: number;
  fakturPajakNumber?: string;

  // Internal Notes & Bank
  bankAccountDestination?: string;
  financeNotes?: string;
}

// 1. Design : update schedule
export interface DesignScheduleItem {
  id: string;
  stageName: string;
  software: string;
  designerPic: string;
  startDate: string;
  targetDate: string;
  actualDate?: string;
  revision: string;
  status: 'Scheduled' | 'In Progress' | 'Under Review' | 'Approved' | 'Delayed';
  drawingNumber?: string;
  notes: string;
  lastUpdated: string;
}

// 2. Manufacturing Process : update proses pekerjaan manufaktur
export interface ManufacturingProcessItem {
  id: string;
  processType: 'CNC Milling' | 'CNC Lathe' | 'Wire Cut EDM' | 'Surface Grinding' | 'Heat Treatment' | 'Laser Cutting & Bending' | 'Benchwork / Fitting';
  partName: string;
  partNumber: string;
  quantity: number;
  machineUsed: string;
  operator: string;
  startDate: string;
  targetDate: string;
  actualFinishDate?: string;
  progressPercent: number;
  status: 'Queued' | 'Machining' | 'Post-Process' | 'Completed' | 'Hold';
  notes: string;
  lastUpdated: string;
}

// 3. Purchasing : update pembelian material & parts
export interface PurchasingItem {
  id: string;
  itemCategory: 'Raw Material' | 'Pneumatics' | 'Electrical & PLC' | 'Motion & Linear Guide' | 'Hardware & Fasteners' | 'Subcon Service';
  itemName: string;
  specification: string;
  supplierName: string;
  poSupplierNumber: string;
  quantity: number;
  unit: string;
  orderDate: string;
  etaDate: string;
  actualArrivalDate?: string;
  status: 'PR Submitted' | 'PO Placed' | 'In Transit' | 'Received & Warehoused' | 'Delayed';
  picPurchasing: string;
  notes: string;
  estimatedCost?: number;
  lastUpdated: string;
}

// 4. Quality : update hasil cek quality
export interface QualityCheckItem {
  id: string;
  inspectionType: 'Incoming Material' | 'In-Process CNC Machining' | 'CMM 3D Metrology' | 'Hardness Test HRC' | 'Final Assembly & FAT';
  partOrItem: string;
  parameterChecked: string;
  toleranceSpec: string;
  measuredResult: string;
  verdict: 'PASSED' | 'PASSED WITH NOTE' | 'REJECTED / NCR' | 'PENDING';
  measuringTool: string;
  inspector: string;
  inspectionDate: string;
  ncrNumber?: string;
  certificateNumber?: string;
  notes: string;
  lastUpdated: string;
}

// 5. Production : update hasil produksi
export interface ProductionOutputItem {
  id: string;
  productionDate: string;
  shift: 'Shift 1 (Pagi)' | 'Shift 2 (Siang)' | 'Shift 3 (Malam)';
  partOrSubAssy: string;
  targetQty: number;
  actualQty: number;
  wipQty: number;
  rejectQty: number;
  machineLine: string;
  operatorPic: string;
  cycleTimeSec: number;
  efficiencyPercent: number;
  status: 'On Target' | 'Ahead of Plan' | 'Behind Schedule' | 'Critical Issue';
  notes: string;
  lastUpdated: string;
}

// 6. Assembly : update progress pekerjaan assembly
export interface AssemblyProgressItem {
  id: string;
  assemblyModule: 'Mechanical Base & Structure' | 'Pneumatics Piping & Valve Island' | 'Electrical Cabinet Wiring' | 'Sensor & Actuator Calibration' | 'PLC & HMI Programming' | 'Dry Run 100 Cycles Test';
  leadTechnician: string;
  progressPercent: number;
  startDate: string;
  targetFinishDate: string;
  actualFinishDate?: string;
  status: 'Pending' | 'In Progress' | 'Dry Run Tested' | 'FAT Approved';
  dryRunCyclesCompleted?: number;
  safetyCheckPassed: boolean;
  notes: string;
  lastUpdated: string;
}

// 7. PPIC : update delivery
export interface DeliveryUpdateItem {
  id: string;
  deliveryStage: 'Packaging & Wooden Crating' | 'Dispatched from Factory' | 'In Transit' | 'Arrived at Customer Site' | 'Installation & Handover BAST';
  suratJalanNumber: string;
  targetDeliveryDate: string;
  actualDeliveryDate?: string;
  expeditionPartner: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  destinationAddress: string;
  bastNumber?: string;
  recipientName?: string;
  status: 'Preparing Packaging' | 'Dispatched' | 'In Transit' | 'Arrived on Site' | 'Delivered & Accepted';
  notes: string;
  lastUpdated: string;
}

// 8. General Admin : update data lain-lainnya
export interface GeneralAdminDataItem {
  id: string;
  category: 'Legal Contract & PO Acceptance' | 'Safety Permit / CSMS' | 'Insurance & Shipping Letter' | 'Warranty Certificate' | 'Minutes of Meeting (MOM)' | 'Administrative Notes & Memo';
  documentTitle: string;
  referenceNumber: string;
  adminPic: string;
  updateDate: string;
  status: 'Draft' | 'Sent to Customer' | 'Signed & Approved' | 'Archived';
  attachmentName?: string;
  notes: string;
  lastUpdated: string;
}

export interface DepartmentJobdesksData {
  design?: DesignScheduleItem[];
  manufacturing?: ManufacturingProcessItem[];
  purchasing?: PurchasingItem[];
  quality?: QualityCheckItem[];
  production?: ProductionOutputItem[];
  assembly?: AssemblyProgressItem[];
  ppic?: DeliveryUpdateItem[];
  generalAdmin?: GeneralAdminDataItem[];
}

export interface ProjectItem {
  id: string;
  poNumber: string;
  projectName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  category: 'Special Purpose Machine' | 'Automation Line' | 'Jig & Fixture' | 'Stamping Dies' | 'Precision Parts';
  contractValue: number;
  startDate: string;
  targetCompletionDate: string;
  actualCompletionDate?: string;
  status: ProjectStatus;
  progressPercent: number; // 0 - 100
  picEngineer: string;
  description: string;
  milestones: ProjectMilestone[];
  photos: ProjectPhoto[];
  activityLogs: ActivityLogItem[];
  invoice?: InvoiceDetails;
  delivery?: DeliveryDetails;
  financial?: ProjectFinancialItem;
  departmentJobdesks?: DepartmentJobdesksData;
}
