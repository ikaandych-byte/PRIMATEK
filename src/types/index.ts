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
  nameEn?: string;
  category: MachineCategory;
  categoryName: string;
  categoryNameEn?: string;
  shortDesc: string;
  shortDescEn?: string;
  detailedDesc: string;
  detailedDescEn?: string;
  image: string;
  capacityOrTonnage: string;
  capacityOrTonnageEn?: string;
  travelOrDimension: string;
  accuracyOrTolerance: string;
  processType: string;
  processTypeEn?: string;
  industryApplications: string[];
  industryApplicationsEn?: string[];
  keyFeatures: string[];
  keyFeaturesEn?: string[];
  specs: TechnicalSpec[];
  specsEn?: TechnicalSpec[];
  suitableFor: string;
  suitableForEn?: string;
  controlSystem?: string;
  unitsAvailable?: number;
}

export interface MachineFacilityItem {
  id: string;
  name: string;
  nameEn?: string;
  type: string;
  typeEn?: string;
  makerCountry: string;
  count: number;
  capacitySpecs: string;
  capacitySpecsEn?: string;
  primaryApplication: string;
  primaryApplicationEn?: string;
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
