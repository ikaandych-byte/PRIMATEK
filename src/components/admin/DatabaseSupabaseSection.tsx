import React, { useState, useEffect } from 'react';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Table,
  Shield,
  Layers,
  Sparkles,
  Home,
  Wrench,
  Building,
} from 'lucide-react';
import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '../../lib/supabase';
import { useTheme } from '../../context/ThemeContext';

export const DatabaseSupabaseSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content-mapping' | 'sql-ddl' | 'sql-seed'>('content-mapping');

  const [tableStatus, setTableStatus] = useState<{
    [tableName: string]: { exists: boolean; count: number; checking: boolean };
  }>({
    categories: { exists: false, count: 0, checking: false },
    machines: { exists: false, count: 0, checking: false },
    facility_tools: { exists: false, count: 0, checking: false },
    plant_pillars: { exists: false, count: 0, checking: false },
    manufacturing_workflows: { exists: false, count: 0, checking: false },
    home_capabilities: { exists: false, count: 0, checking: false },
    clients_and_partners: { exists: false, count: 0, checking: false },
    company_settings: { exists: false, count: 0, checking: false },
  });

  const checkTables = async () => {
    setTesting(true);
    setStatusMessage('Menguji koneksi ke Supabase...');

    const tables = [
      'categories',
      'machines',
      'facility_tools',
      'plant_pillars',
      'manufacturing_workflows',
      'home_capabilities',
      'clients_and_partners',
      'company_settings',
    ];

    const newStatus: any = {};

    for (const tbl of tables) {
      try {
        const { data, count, error } = await supabase
          .from(tbl)
          .select('*', { count: 'exact', head: true });

        if (error) {
          newStatus[tbl] = { exists: false, count: 0, checking: false };
        } else {
          newStatus[tbl] = { exists: true, count: count || 0, checking: false };
        }
      } catch (err) {
        newStatus[tbl] = { exists: false, count: 0, checking: false };
      }
    }

    setTableStatus(newStatus);
    setTesting(false);
    const availableCount = Object.values(newStatus).filter((s: any) => s.exists).length;
    if (availableCount === 0) {
      setStatusMessage('Koneksi endpoint aktif. Tabel di database Supabase belum dibuat, jalankan SQL query di bawah pada SQL Editor Supabase.');
    } else {
      setStatusMessage(`Berhasil terhubung! ${availableCount} dari ${tables.length} tabel terdeteksi di Supabase.`);
    }
  };

  useEffect(() => {
    checkTables();
  }, []);

  const FULL_SQL_SCRIPT = `-- ==============================================================================
-- DATABASE SCHEMA & SEED DATA UNTUK SUPABASE
-- PT. PRIMA TEKNIK TRADA (MANUFACTURING & ROBOTICS)
-- Supabase Project: https://yclzqhvvbejrouknnilj.supabase.co
-- Target Halaman: Beranda (Home), Machinery Catalog, Plant & Facilities
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: categories (Kategori Mesin & Tooling pada Machinery Catalog)
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name_id TEXT NOT NULL,
    name_en TEXT NOT NULL,
    icon_name TEXT,
    description_id TEXT,
    description_en TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: machines (Katalog Detail Seluruh Mesin, SPM, Dies, Jig & Spesifikasi)
CREATE TABLE IF NOT EXISTS public.machines (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    short_desc_id TEXT NOT NULL,
    short_desc_en TEXT,
    detailed_desc_id TEXT,
    detailed_desc_en TEXT,
    image_url TEXT NOT NULL,
    capacity_or_tonnage TEXT,
    travel_or_dimension TEXT,
    accuracy_or_tolerance TEXT,
    process_type TEXT,
    control_system TEXT,
    suitable_for_id TEXT,
    suitable_for_en TEXT,
    industry_applications JSONB DEFAULT '[]'::jsonb,
    key_features JSONB DEFAULT '[]'::jsonb,
    specs JSONB DEFAULT '[]'::jsonb,
    units_available INT DEFAULT 1,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: facility_tools (Inventaris 45+ Unit Mesin MM2100 di Halaman Plant & Facilities)
CREATE TABLE IF NOT EXISTS public.facility_tools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    machine_type TEXT NOT NULL,
    count_units INT NOT NULL DEFAULT 1,
    brand_or_model TEXT,
    travel_dimension TEXT,
    status_condition TEXT DEFAULT 'Operational',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table: plant_pillars (Pilar Utama & Metrik Lahan Pabrik MM2100)
CREATE TABLE IF NOT EXISTS public.plant_pillars (
    id TEXT PRIMARY KEY,
    title_id TEXT NOT NULL,
    title_en TEXT NOT NULL,
    metric_value TEXT NOT NULL,
    sub_id TEXT NOT NULL,
    sub_en TEXT NOT NULL,
    desc_id TEXT NOT NULL,
    desc_en TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table: manufacturing_workflows (5 Tahap Alur Pengerjaan di Plant & Facilities)
CREATE TABLE IF NOT EXISTS public.manufacturing_workflows (
    id TEXT PRIMARY KEY,
    step_number TEXT NOT NULL,
    title_id TEXT NOT NULL,
    title_en TEXT NOT NULL,
    desc_id TEXT NOT NULL,
    desc_en TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Table: home_capabilities (4 Pilar Kapabilitas Manufaktur di Halaman Beranda)
CREATE TABLE IF NOT EXISTS public.home_capabilities (
    id TEXT PRIMARY KEY,
    category_slug TEXT NOT NULL,
    title_id TEXT NOT NULL,
    title_en TEXT NOT NULL,
    subtitle_id TEXT NOT NULL,
    subtitle_en TEXT NOT NULL,
    desc_id TEXT NOT NULL,
    desc_en TEXT NOT NULL,
    highlights_id JSONB DEFAULT '[]'::jsonb,
    highlights_en JSONB DEFAULT '[]'::jsonb,
    icon_name TEXT NOT NULL,
    color_gradient TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Table: clients_and_partners (Klien OEM & Mitra Robotik pada Marquee Beranda)
CREATE TABLE IF NOT EXISTS public.clients_and_partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sector TEXT NOT NULL,
    category TEXT NOT NULL,
    type_id TEXT NOT NULL,
    type_en TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Indonesia',
    logo_name TEXT,
    is_featured BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Table: company_settings (Profil Legalitas & Kontak Perusahaan)
CREATE TABLE IF NOT EXISTS public.company_settings (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    company_name TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    tagline_id TEXT,
    tagline_en TEXT,
    address_street TEXT,
    address_city TEXT,
    address_estate TEXT,
    email_general TEXT,
    email_rfq TEXT,
    phone TEXT,
    whatsapp_number TEXT,
    operating_hours TEXT,
    iso_certification TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facility_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plant_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manufacturing_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients_and_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- Izinkan publik (Anon key) membaca data (SELECT) untuk website
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Machines" ON public.machines FOR SELECT USING (true);
CREATE POLICY "Public Read Facility Tools" ON public.facility_tools FOR SELECT USING (true);
CREATE POLICY "Public Read Plant Pillars" ON public.plant_pillars FOR SELECT USING (true);
CREATE POLICY "Public Read Manufacturing Workflows" ON public.manufacturing_workflows FOR SELECT USING (true);
CREATE POLICY "Public Read Home Capabilities" ON public.home_capabilities FOR SELECT USING (true);
CREATE POLICY "Public Read Clients and Partners" ON public.clients_and_partners FOR SELECT USING (true);
CREATE POLICY "Public Read Company Settings" ON public.company_settings FOR SELECT USING (true);

-- Izinkan Admin / Service Role akses penuh
CREATE POLICY "Admin Full Access Categories" ON public.categories FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Machines" ON public.machines FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Facility Tools" ON public.facility_tools FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Plant Pillars" ON public.plant_pillars FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Workflows" ON public.manufacturing_workflows FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Home Capabilities" ON public.home_capabilities FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Clients" ON public.clients_and_partners FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Settings" ON public.company_settings FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- SEED DATA AWAL LENGKAP
INSERT INTO public.categories (id, name_id, name_en, icon_name, description_id, description_en, display_order)
VALUES
('automation', 'Automation & Customized Machines', 'Automation & Customized Machines', 'Cpu', 'Mesin perakitan otomatis, robotic welding cell, SPM leak test & konveyor terpadu.', 'Customized turnkey automated assembly lines, robotic welding cells, and SPM leak testing.', 1),
('jig-fixture', 'Precision Jig & Fixture Tooling', 'Precision Jig & Fixture Tooling', 'Layers', 'Workholding jig klem hidrolik Pascal/Kosmek dan checking fixture bersertifikasi akurasi ±0.005mm.', 'High-precision hydraulic clamping fixtures and ISO certified checking fixtures.', 2),
('dies-moulds', 'Dies & Moulds Heavy Duty', 'Dies & Moulds Heavy Duty', 'Wrench', 'Progressive, transfer & tandem stamping dies 110T-250T untuk plat baja hingga ketebalan 6mm.', 'Progressive, transfer & tandem stamping dies rated up to 250T for sheet metal up to 6mm.', 3),
('mass-production', 'Parts Mass Production', 'Parts Mass Production', 'Cog', 'Fabrikasi massal suku cadang otomotif, bushing presisi, dan bearing spacer >100.000 pcs/bulan.', 'High-volume production of automotive precision bushings, spacers, and metal brackets.', 4),
('facility-tools', 'Plant Fleet & CMM Metrology', 'Plant Fleet & CMM Metrology', 'Building', 'Armada 45+ mesin pabrik MM2100: CNC Double Column 3 meter, Press Stamping 250T & 3D CMM Mitutoyo.', 'Plant fleet of 45+ machines: 3M Double Column CNC, 250T presses, and 3D CMM lab.', 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.plant_pillars (id, title_id, title_en, metric_value, sub_id, sub_en, desc_id, desc_en, display_order)
VALUES
('land-footprint', 'Lahan & Area Workshop', 'Land & Plant Footprint', '2,806 m²', 'Bangunan Produksi 2.400 m²', 'Built Manufacturing Area 2,400 m²', 'Terletak strategis di Kawasan Industri MM2100 Cibitung Bekasi dengan akses kontainer trailer 40ft.', 'Strategically situated in MM2100 Industrial Estate Cibitung, Bekasi with 40ft container trailer access.', 1),
('machinery-fleet', 'Armada Mesin Produksi', 'Production Machinery Fleet', '45+ Units', 'Mesin Presisi Berkapasitas Tinggi', 'High-Rigidity Machine Tools', 'CNC Machining Double Column 3 meter, Press Stamping 110T-250T, CNC Lathe 4-Axis, dan Grinding.', '3-Meter CNC Double Column centers, 110T-250T mechanical stamping presses, 4-axis CNC lathes, and precision grinding.', 2),
('crane-capacity', 'Kapasitas Angkat Berat', 'Heavy Crane Capacity', '10 Ton Crane', 'Overhead Crane Ganda', 'Dual Overhead Cranes', 'Penanganan aman untuk die base cetakan besar, frame mesin otomatis, dan material struktural berat.', 'Safe overhead material handling for massive stamping die shoes, machine frames, and heavy structural castings.', 3),
('cmm-lab', 'Laboratorium Metrologi CMM', '3D CMM Metrology Lab', '±0.002 mm', 'Clean Room Suhu Konstan', 'Climate-Controlled Cleanroom', 'CMM Mitutoyo terkalibrasi untuk inspeksi koordinat 3D dan validasi toleransi sub-mikron.', 'Calibrated Mitutoyo 3D Bridge CMM and portable articulating arms for sub-micron GD&T dimensional validation.', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.manufacturing_workflows (id, step_number, title_id, title_en, desc_id, desc_en, display_order)
VALUES
('wf-01', '01', 'Engineering & 3D CAD/CAM', 'Engineering & 3D CAD/CAM', 'Pemodelan solid model 3D, finite element analysis (FEA), dan simulasi jalur potong CNC sebelum pengerjaan.', 'Solid model 3D CAD drafting, finite element analysis (FEA), and CAM toolpath simulation prior to machining.', 1),
('wf-02', '02', 'Roughing & Double Column CNC', 'Roughing & Double Column CNC', 'Pemesinan balok baja paduan dan die base menggunakan CNC Double Column stroke 3.000 mm.', 'Heavy roughing and surface milling of alloy steel billets and die bases on 3,000 mm stroke Double Column CNCs.', 2),
('wf-03', '03', 'Precision Machining & Grinding', 'Precision Machining & Grinding', 'Pengerjaan profil mikro pada CNC Milling 4-axis serta surface grinding untuk toleransi sub-mikron.', 'Micro-feature profiling on 4-axis milling centers, precision wire EDM, and surface grinding to sub-micron limits.', 3),
('wf-04', '04', 'Assembly & PLC/Robotics', 'Assembly & PLC/Robotics', 'Perakitan mekanik, instalasi hidrolik/pneumatik Pascal/Kosmek, kabel panel, dan pemrograman PLC/Robot.', 'Mechanical assembly, Pascal/Kosmek hydraulic integration, pneumatic lines, panel wiring, and PLC/Robot programming.', 4),
('wf-05', '05', 'Tryout & CMM Inspection', 'Tryout & CMM Inspection', 'Pengujian beban kerja kontinu di pabrik dan verifikasi dimensi 3D CMM berstandar ISO 9001:2015.', 'Continuous load tryout under production press conditions and 3D CMM dimensional verification per ISO 9001:2015.', 5)
ON CONFLICT (id) DO NOTHING;
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_SQL_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Supabase Connection Status */}
      <div
        className={`p-6 rounded-3xl border ${
          isDark
            ? 'bg-gradient-to-r from-emerald-950/30 via-[#0e1620] to-[#0c101a] border-emerald-500/30'
            : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-emerald-300 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                Supabase PostgreSQL Connected
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                Project ID: yclzqhvvbejrouknnilj
              </span>
            </div>
            <h3 className="text-xl font-black font-display text-slate-100 flex items-center gap-2.5">
              <Database className="w-5 h-5 text-emerald-400" />
              <span>Integrasi Supabase: Home, Machinery Catalog &amp; Facilities</span>
            </h3>
            <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
              Koneksi API Supabase publik terkonfigurasi pada URL{' '}
              <code className="text-emerald-400 font-mono text-[11px] bg-black/40 px-1.5 py-0.5 rounded">
                {SUPABASE_URL}
              </code>
              . Frontend telah dilengkapi fallback cerdas sehingga website tetap tampil mulus baik saat offline maupun setelah tabel Supabase diisi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={checkTables}
              disabled={testing}
              className="px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin text-amber-400' : ''}`} />
              <span>{testing ? 'Menguji...' : 'Uji Koneksi Supabase'}</span>
            </button>

            <a
              href="https://supabase.com/dashboard/project/yclzqhvvbejrouknnilj/sql"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka SQL Editor Supabase</span>
            </a>
          </div>
        </div>

        {statusMessage && (
          <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center gap-2 text-xs font-mono text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* Grid Status Tabel di Supabase */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(tableStatus).map(([tblName, stat]) => (
          <div
            key={tblName}
            className={`p-3.5 rounded-2xl border text-xs space-y-1.5 transition-all ${
              stat.exists
                ? isDark
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : isDark
                ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold truncate">{tblName}</span>
              {stat.exists ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  Ready ({stat.count})
                </span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                  Pending SQL
                </span>
              )}
            </div>
            <p className="text-[10px] opacity-80 truncate">
              {stat.exists ? 'Terkoneksi & Aktif di Supabase' : 'Tabel belum ada / belum di-seed'}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs Menu Navigation */}
      <div className="flex gap-2 border-b border-neutral-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('content-mapping')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all ${
            activeTab === 'content-mapping'
              ? 'bg-amber-500 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Pemetaan Konten (Bagian Mana yang Dikonekan)</span>
        </button>
        <button
          onClick={() => setActiveTab('sql-ddl')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all ${
            activeTab === 'sql-ddl'
              ? 'bg-amber-500 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Struktur Tabel &amp; RLS Query SQL</span>
        </button>
      </div>

      {/* TAB 1: Content Mapping Detail */}
      {activeTab === 'content-mapping' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Halaman Beranda (Home) */}
          <div
            className={`p-6 rounded-3xl border space-y-4 ${
              isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-inherit">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-black font-display text-slate-100">1. Halaman Beranda (Home)</h4>
                <span className="text-[10px] font-mono text-neutral-400">Pusat Informasi &amp; Showroom</span>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-neutral-300">
              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-amber-400 block">Pilar Kapabilitas Manufaktur</span>
                <p className="text-[11px] text-neutral-400">
                  Tabel: <code className="text-emerald-400 font-mono">home_capabilities</code>
                </p>
                <p className="text-[11px]">
                  4 pilar layanan: Customized Automation, Jig &amp; Fixture, Dies &amp; Moulds, dan Mass Production (judul, deskripsi, poin keunggulan &amp; ikon).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-amber-400 block">Klien OEM &amp; Partner Robotika</span>
                <p className="text-[11px] text-neutral-400">
                  Tabel: <code className="text-emerald-400 font-mono">clients_and_partners</code>
                </p>
                <p className="text-[11px]">
                  Logo klien Astra Honda, Daihatsu, Yamaha, Mitsubishi, Kalbe Farma, serta partner integrasi resmi EPSON, Yaskawa, Keyence, Omron.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-amber-400 block">Ringkasan Metrik Cepat Pabrik</span>
                <p className="text-[11px] text-neutral-400">
                  Tabel: <code className="text-emerald-400 font-mono">plant_pillars</code>
                </p>
                <p className="text-[11px]">
                  Angka metrik: 2.400 m² luas bangunan pabrik, 3.000 mm stroke CNC Double Column, dan sertifikasi ISO 9001:2015.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Halaman Machinery Catalog */}
          <div
            className={`p-6 rounded-3xl border space-y-4 ${
              isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-inherit">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-black font-display text-slate-100">2. Machinery Catalog</h4>
                <span className="text-[10px] font-mono text-neutral-400">Katalog Produk &amp; Mesin Custom</span>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-neutral-300">
              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-cyan-400 block">Kategori Mesin &amp; Filter Pills</span>
                <p className="text-[11px] text-neutral-400">
                  Tabel: <code className="text-emerald-400 font-mono">categories</code>
                </p>
                <p className="text-[11px]">
                  Kategori mesin: Automation SPM, Precision Jig &amp; Fixture, Dies &amp; Moulds, Mass Production, dan Plant Fleet.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-cyan-400 block">Detail Mesin, SPM &amp; Spesifikasi Teknis</span>
                <p className="text-[11px] text-neutral-400">
                  Tabel: <code className="text-emerald-400 font-mono">machines</code>
                </p>
                <p className="text-[11px]">
                  Nama mesin, gambar HD, kapasitas tonase, dimensi travel X/Y/Z, akurasi toleransi (±0.02mm), controller (Omron/Fanuc/Siemens), daftar spesifikasi JSON, serta fitur utama.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-cyan-400 block">Status Ketersediaan &amp; Unit Ready</span>
                <p className="text-[11px] text-neutral-400">
                  Kolom: <code className="text-emerald-400 font-mono">units_available, is_featured</code>
                </p>
                <p className="text-[11px]">
                  Jumlah unit mesin yang siap operasional atau kapasitas lini yang tersedia untuk pemesanan RFQ baru.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Halaman Plant & Facilities */}
          <div
            className={`p-6 rounded-3xl border space-y-4 ${
              isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-inherit">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-black font-display text-slate-100">3. Plant &amp; Facilities</h4>
                <span className="text-[10px] font-mono text-neutral-400">Fasilitas Pabrik MM2100 Cibitung</span>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-neutral-300">
              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-purple-400 block">Daftar 45+ Unit Mesin MM2100</span>
                <p className="text-[11px] text-neutral-400">
                  Tabel: <code className="text-emerald-400 font-mono">facility_tools</code>
                </p>
                <p className="text-[11px]">
                  Inventaris seluruh mesin di pabrik: CNC Double Column, Stamping Press Komatsu/Amada 110T-250T, CNC Lathe, Grinding, CMM Mitutoyo, Welding, dll.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-purple-400 block">Pilar Fasilitas (Lahan &amp; Crane)</span>
                <p className="text-[11px] text-neutral-400">
                  Tabel: <code className="text-emerald-400 font-mono">plant_pillars</code>
                </p>
                <p className="text-[11px]">
                  Luas lahan 2.806 m², bangunan 2.400 m², kapasitas overhead crane ganda 10 Ton, dan lab ukur CMM 3D suhu konstan.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-purple-400 block">5 Alur Tahapan Manufaktur</span>
                <p className="text-[11px] text-neutral-400">
                  Tabel: <code className="text-emerald-400 font-mono">manufacturing_workflows</code>
                </p>
                <p className="text-[11px]">
                  Tahapan 01 Engineering 3D CAD/CAM s/d 05 Tryout &amp; CMM Inspection berstandar ISO 9001:2015.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SQL DDL & Seed Ready To Copy */}
      {activeTab === 'sql-ddl' && (
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold font-display text-slate-100 flex items-center gap-2">
                <Table className="w-4 h-4 text-amber-500" />
                <span>Skrip SQL Schema &amp; Seed Data Supabase</span>
              </h4>
              <p className="text-xs text-neutral-400">
                Jalankan script ini di SQL Editor Supabase untuk langsung membuat semua tabel, RLS policy, dan data awal.
              </p>
            </div>

            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
                copied
                  ? 'bg-emerald-500 text-neutral-950'
                  : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Berhasil Disalin!' : 'Salin Seluruh Query SQL'}</span>
            </button>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-2xl bg-black/80 text-emerald-400 text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed border border-neutral-800">
              <code>{FULL_SQL_SCRIPT}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
