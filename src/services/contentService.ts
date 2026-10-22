import { supabase } from '../lib/supabase';
import { MACHINES_DATA, MACHINE_FACILITY_LIST } from '../data/machines';
import { COMPANY_INFO, CLIENT_LOGOS, TECHNICAL_PARTNERS } from '../data/company';
import { MachineItem, MachineCategory } from '../types';

export interface CategoryRecord {
  id: MachineCategory | string;
  name_id: string;
  name_en: string;
  icon_name?: string;
  description_id?: string;
  description_en?: string;
  display_order: number;
}

export interface FacilityToolRecord {
  id: string;
  name: string;
  machine_type: string;
  count_units: number;
  brand_or_model?: string;
  travel_dimension?: string;
  status_condition?: string;
  display_order?: number;
}

export interface PlantPillarRecord {
  id: string;
  title_id: string;
  title_en: string;
  metric_value: string;
  sub_id: string;
  sub_en: string;
  desc_id: string;
  desc_en: string;
  display_order: number;
}

export interface ManufacturingWorkflowRecord {
  id: string;
  step_number: string;
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
  display_order: number;
}

export interface HomeCapabilityRecord {
  id: string;
  category_slug: MachineCategory;
  title_id: string;
  title_en: string;
  subtitle_id: string;
  subtitle_en: string;
  desc_id: string;
  desc_en: string;
  highlights_id: string[];
  highlights_en: string[];
  icon_name: string;
  color_gradient?: string;
  display_order: number;
}

export interface ClientPartnerRecord {
  id: string;
  name: string;
  sector: string;
  category: 'automotive' | 'partners';
  type_id: string;
  type_en: string;
  country: string;
  logo_name?: string;
  is_featured: boolean;
  display_order: number;
}

// 1. Fetch Machines Catalog
export async function getMachinesFromDb(): Promise<MachineItem[]> {
  try {
    const { data, error } = await supabase
      .from('machines')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return MACHINES_DATA;
    }

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      category: row.category_id as MachineCategory,
      categoryName: row.category_name,
      shortDesc: row.short_desc_id || row.short_desc_en,
      detailedDesc: row.detailed_desc_id || row.detailed_desc_en,
      image: row.image_url,
      capacityOrTonnage: row.capacity_or_tonnage,
      travelOrDimension: row.travel_or_dimension,
      accuracyOrTolerance: row.accuracy_or_tolerance,
      processType: row.process_type,
      industryApplications: Array.isArray(row.industry_applications)
        ? row.industry_applications
        : [],
      keyFeatures: Array.isArray(row.key_features) ? row.key_features : [],
      specs: Array.isArray(row.specs) ? row.specs : [],
      suitableFor: row.suitable_for_id || row.suitable_for_en,
      controlSystem: row.control_system,
      unitsAvailable: row.units_available,
    }));
  } catch (err) {
    console.warn('Supabase getMachinesFromDb fallback to local data:', err);
    return MACHINES_DATA;
  }
}

// 2. Fetch Facility Machine Fleet Tools
export async function getFacilityToolsFromDb(): Promise<{ name: string; count: number; type: string }[]> {
  try {
    const { data, error } = await supabase
      .from('facility_tools')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return MACHINE_FACILITY_LIST;
    }

    return data.map((row: any) => ({
      name: row.name,
      count: row.count_units || 1,
      type: row.machine_type,
    }));
  } catch (err) {
    console.warn('Supabase getFacilityToolsFromDb fallback to local data:', err);
    return MACHINE_FACILITY_LIST;
  }
}

// 3. Fetch Plant Pillars (Metrik Pabrik)
export async function getPlantPillarsFromDb(): Promise<PlantPillarRecord[]> {
  const localFallback: PlantPillarRecord[] = [
    {
      id: 'land-footprint',
      title_id: 'Lahan & Area Workshop',
      title_en: 'Land & Plant Footprint',
      metric_value: '2,806 m²',
      sub_id: 'Bangunan Produksi 2.400 m²',
      sub_en: 'Built Manufacturing Area 2,400 m²',
      desc_id: 'Terletak strategis di Kawasan Industri MM2100 Cibitung Bekasi dengan akses kontainer 40ft.',
      desc_en: 'Strategically situated in MM2100 Industrial Estate Cibitung, Bekasi with 40ft container trailer access.',
      display_order: 1,
    },
    {
      id: 'machinery-fleet',
      title_id: 'Armada Mesin Produksi',
      title_en: 'Production Machinery Fleet',
      metric_value: '45+ Units',
      sub_id: 'Mesin Presisi Berkapasitas Tinggi',
      sub_en: 'High-Rigidity Machine Tools',
      desc_id: 'CNC Machining Double Column 3 meter, Press Stamping 110T-250T, CNC Lathe 4-Axis, dan Grinding.',
      desc_en: '3-Meter CNC Double Column centers, 110T-250T mechanical stamping presses, 4-axis CNC lathes, and precision grinding.',
      display_order: 2,
    },
    {
      id: 'crane-capacity',
      title_id: 'Kapasitas Angkat Berat',
      title_en: 'Heavy Crane Capacity',
      metric_value: '10 Ton Crane',
      sub_id: 'Overhead Crane Ganda',
      sub_en: 'Dual Overhead Cranes',
      desc_id: 'Penanganan aman untuk die base cetakan besar, frame mesin otomatis, dan material berat.',
      desc_en: 'Safe overhead material handling for massive stamping die shoes, machine frames, and heavy structural castings.',
      display_order: 3,
    },
    {
      id: 'cmm-lab',
      title_id: 'Laboratorium Metrologi CMM',
      title_en: '3D CMM Metrology Lab',
      metric_value: '±0.002 mm',
      sub_id: 'Clean Room Suhu Konstan',
      sub_en: 'Climate-Controlled Cleanroom',
      desc_id: 'CMM Mitutoyo terkalibrasi untuk inspeksi koordinat 3D dan validasi toleransi sub-mikron.',
      desc_en: 'Calibrated Mitutoyo 3D Bridge CMM and portable articulating arms for sub-micron GD&T dimensional validation.',
      display_order: 4,
    },
  ];

  try {
    const { data, error } = await supabase
      .from('plant_pillars')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return localFallback;
    }

    return data.map((row: any) => ({
      id: row.id,
      title_id: row.title_id,
      title_en: row.title_en,
      metric_value: row.metric_value,
      sub_id: row.sub_id,
      sub_en: row.sub_en,
      desc_id: row.desc_id,
      desc_en: row.desc_en,
      display_order: row.display_order || 0,
    }));
  } catch (err) {
    console.warn('Supabase getPlantPillarsFromDb fallback:', err);
    return localFallback;
  }
}

// 4. Fetch Workflows (01 - 05)
export async function getWorkflowsFromDb(): Promise<ManufacturingWorkflowRecord[]> {
  const localFallback: ManufacturingWorkflowRecord[] = [
    {
      id: 'wf-01',
      step_number: '01',
      title_id: 'Engineering & 3D CAD/CAM',
      title_en: 'Engineering & 3D CAD/CAM',
      desc_id: 'Pemodelan solid model 3D, finite element analysis (FEA), dan simulasi jalur potong CNC sebelum pengerjaan.',
      desc_en: 'Solid model 3D CAD drafting, finite element analysis (FEA), and CAM toolpath simulation prior to machining.',
      display_order: 1,
    },
    {
      id: 'wf-02',
      step_number: '02',
      title_id: 'Roughing & Double Column CNC',
      title_en: 'Roughing & Double Column CNC',
      desc_id: 'Pemesinan balok baja paduan dan die base menggunakan CNC Double Column stroke 3.000 mm.',
      desc_en: 'Heavy roughing and surface milling of alloy steel billets and die bases on 3,000 mm stroke Double Column CNCs.',
      display_order: 2,
    },
    {
      id: 'wf-03',
      step_number: '03',
      title_id: 'Precision Machining & Grinding',
      title_en: 'Precision Machining & Grinding',
      desc_id: 'Pengerjaan profil mikro pada CNC Milling 4-axis serta surface grinding untuk toleransi sub-mikron.',
      desc_en: 'Micro-feature profiling on 4-axis milling centers, precision wire EDM, and surface grinding to sub-micron limits.',
      display_order: 3,
    },
    {
      id: 'wf-04',
      step_number: '04',
      title_id: 'Assembly & PLC/Robotics',
      title_en: 'Assembly & PLC/Robotics',
      desc_id: 'Perakitan mekanik, instalasi hidrolik/pneumatik Pascal/Kosmek, kabel panel, dan pemrograman PLC/Robot.',
      desc_en: 'Mechanical assembly, Pascal/Kosmek hydraulic integration, pneumatic lines, panel wiring, and PLC/Robot programming.',
      display_order: 4,
    },
    {
      id: 'wf-05',
      step_number: '05',
      title_id: 'Tryout & CMM Inspection',
      title_en: 'Tryout & CMM Inspection',
      desc_id: 'Pengujian beban kerja kontinu di pabrik dan verifikasi dimensi 3D CMM berstandar ISO 9001:2015.',
      desc_en: 'Continuous load tryout under production press conditions and 3D CMM dimensional verification per ISO 9001:2015.',
      display_order: 5,
    },
  ];

  try {
    const { data, error } = await supabase
      .from('manufacturing_workflows')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return localFallback;
    }

    return data.map((row: any) => ({
      id: row.id,
      step_number: row.step_number,
      title_id: row.title_id,
      title_en: row.title_en,
      desc_id: row.desc_id,
      desc_en: row.desc_en,
      display_order: row.display_order || 0,
    }));
  } catch (err) {
    console.warn('Supabase getWorkflowsFromDb fallback:', err);
    return localFallback;
  }
}
