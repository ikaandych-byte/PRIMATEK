export type MachineCategory =
  | 'all'
  | 'automation'
  | 'jig-fixture'
  | 'dies-moulds'
  | 'mass-production'
  | 'facility-tools';

export interface TechnicalSpec {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface MachineItem {
  id: string;
  name: string;
  category: MachineCategory;
  categoryName: string;
  shortDesc: string;
  detailedDesc: string;
  image: string;
  capacityOrTonnage: string;
  travelOrDimension: string;
  accuracyOrTolerance: string;
  processType: string;
  industryApplications: string[];
  keyFeatures: string[];
  specs: TechnicalSpec[];
  suitableFor: string;
  controlSystem?: string;
  unitsAvailable?: number;
}

export interface RfqItem {
  machineId: string;
  machineName: string;
  categoryName: string;
  quantity: number;
  customNotes?: string;
}

export interface RfqFormData {
  companyName: string;
  picName: string;
  email: string;
  phone: string;
  industry: string;
  targetTimeline: string;
  materialSpecification: string;
  drawingFileNotes: string;
  additionalDetails: string;
  selectedItems: RfqItem[];
}
