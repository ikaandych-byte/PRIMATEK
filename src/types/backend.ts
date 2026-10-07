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
  inspectionPassed?: boolean;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  detail: string;
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
}
