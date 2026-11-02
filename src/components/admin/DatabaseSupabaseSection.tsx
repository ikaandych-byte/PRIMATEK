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
  FileText,
  Activity,
  Zap,
  Globe,
  Clock,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '../../lib/supabase';
import { useTheme } from '../../context/ThemeContext';

export const DatabaseSupabaseSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [copied, setCopied] = useState(false);
  const [copiedPingUrl, setCopiedPingUrl] = useState(false);
  const [copiedPingHeader, setCopiedPingHeader] = useState(false);
  const [copiedKeepAliveSql, setCopiedKeepAliveSql] = useState(false);
  const [copiedWorkflowYaml, setCopiedWorkflowYaml] = useState(false);
  const [testing, setTesting] = useState(false);
  const [isProjectPaused, setIsProjectPaused] = useState(false);
  const [pinging, setPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{
    success: boolean;
    latency: number;
    timestamp: string;
    detail?: string;
  } | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content-mapping' | 'sql-ddl' | 'keep-alive'>('content-mapping');

  const handlePingTest = async () => {
    setPinging(true);
    const start = performance.now();
    try {
      const { data: rpcData, error: rpcError } = await supabase.rpc('ping_keep_alive', {
        ping_source: 'admin-dashboard-manual',
      });
      const latency = Math.round(performance.now() - start);
      if (!rpcError) {
        setIsProjectPaused(false);
        setPingResult({
          success: true,
          latency,
          timestamp: new Date().toLocaleTimeString('id-ID'),
          detail: `Write RPC ping_keep_alive sukses (Total Ping: ${rpcData?.ping_count ?? 'OK'})`,
        });
        return;
      }

      const { error } = await supabase.from('categories').select('id').limit(1);
      if (error) {
        const msg = error.message || '';
        const paused =
          msg.toLowerCase().includes('failed to fetch') ||
          msg.toLowerCase().includes('network') ||
          msg.toLowerCase().includes('load failed');
        if (paused) setIsProjectPaused(true);
        setPingResult({
          success: false,
          latency,
          timestamp: new Date().toLocaleTimeString('id-ID'),
          detail: paused
            ? 'Project Supabase sedang PAUSED (DNS tidak dapat diakses). Klik Restore Project di Dashboard Supabase.'
            : msg,
        });
      } else {
        setIsProjectPaused(false);
        setPingResult({
          success: true,
          latency,
          timestamp: new Date().toLocaleTimeString('id-ID'),
          detail: 'Read tabel categories sukses (Jalankan SQL keep_alive_heartbeat untuk mengaktifkan Write RPC)',
        });
      }
    } catch (err: any) {
      setIsProjectPaused(true);
      setPingResult({
        success: false,
        latency: 0,
        timestamp: new Date().toLocaleTimeString('id-ID'),
        detail: 'Project Supabase sedang PAUSED (DNS tidak aktif). Silakan klik Restore Project di Dashboard Supabase.',
      });
    } finally {
      setPinging(false);
    }
  };

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
    rfq_submissions: { exists: false, count: 0, checking: false },
    keep_alive_heartbeat: { exists: false, count: 0, checking: false },
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
      'rfq_submissions',
      'keep_alive_heartbeat',
    ];

    const newStatus: any = {};
    let networkFailures = 0;

    for (const tbl of tables) {
      try {
        const { count, error } = await supabase
          .from(tbl)
          .select('*', { count: 'exact', head: true });

        if (error) {
          const msg = (error.message || '').toLowerCase();
          if (msg.includes('failed to fetch') || msg.includes('network') || msg.includes('load failed')) {
            networkFailures += 1;
          }
          newStatus[tbl] = { exists: false, count: 0, checking: false };
        } else {
          newStatus[tbl] = { exists: true, count: count || 0, checking: false };
        }
      } catch (err) {
        networkFailures += 1;
        newStatus[tbl] = { exists: false, count: 0, checking: false };
      }
    }

    setTableStatus(newStatus);
    setTesting(false);
    const availableCount = Object.values(newStatus).filter((s: any) => s.exists).length;
    if (networkFailures >= tables.length) {
      setIsProjectPaused(true);
      setStatusMessage(
        'PERINGATAN: Project Supabase saat ini berstatus PAUSED (DNS yclzqhvvbejrouknnilj.supabase.co tidak aktif). Klik "Restore Project di Supabase" terlebih dahulu.'
      );
    } else if (availableCount === 0) {
      setIsProjectPaused(false);
      setStatusMessage(
        'Koneksi endpoint aktif. Tabel di database Supabase belum dibuat, jalankan SQL query di bawah pada SQL Editor Supabase.'
      );
    } else {
      setIsProjectPaused(false);
      setStatusMessage(`Berhasil terhubung! ${availableCount} dari ${tables.length} tabel aktif di Supabase.`);
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

-- 9. Table: rfq_submissions (Form Permintaan Penawaran Harga RFQ dari Calon Klien)
CREATE TABLE IF NOT EXISTS public.rfq_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    rfq_number TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    pic_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    industry TEXT,
    material TEXT,
    tolerance TEXT,
    target_timeline TEXT,
    estimated_qty TEXT,
    drawing_link TEXT,
    notes TEXT,
    items JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'pending', -- 'pending', 'under_review', 'quoted', 'converted_to_project', 'rejected'
    source TEXT DEFAULT 'web_portal',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rfq_number ON public.rfq_submissions(rfq_number);
CREATE INDEX IF NOT EXISTS idx_rfq_created_at ON public.rfq_submissions(created_at DESC);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facility_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plant_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manufacturing_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients_and_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_submissions ENABLE ROW LEVEL SECURITY;

-- Izinkan publik (Anon key) membaca data (SELECT) untuk website
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Machines" ON public.machines FOR SELECT USING (true);
CREATE POLICY "Public Read Facility Tools" ON public.facility_tools FOR SELECT USING (true);
CREATE POLICY "Public Read Plant Pillars" ON public.plant_pillars FOR SELECT USING (true);
CREATE POLICY "Public Read Manufacturing Workflows" ON public.manufacturing_workflows FOR SELECT USING (true);
CREATE POLICY "Public Read Home Capabilities" ON public.home_capabilities FOR SELECT USING (true);
CREATE POLICY "Public Read Clients and Partners" ON public.clients_and_partners FOR SELECT USING (true);
CREATE POLICY "Public Read Company Settings" ON public.company_settings FOR SELECT USING (true);

-- Izinkan publik anonim / klien submit (INSERT) formulir RFQ
CREATE POLICY "Public Can Submit RFQ" ON public.rfq_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Izinkan Admin / Service Role akses penuh
CREATE POLICY "Admin Full Access Categories" ON public.categories FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Machines" ON public.machines FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Facility Tools" ON public.facility_tools FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Plant Pillars" ON public.plant_pillars FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Workflows" ON public.manufacturing_workflows FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Home Capabilities" ON public.home_capabilities FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Clients" ON public.clients_and_partners FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Settings" ON public.company_settings FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access RFQ Submissions" ON public.rfq_submissions FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

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

  const KEEPALIVE_SQL_PATCH = `-- ==============================================================================
-- SQL ANTI-PAUSE SUPABASE (WRITE HEARTBEAT TABLE + RPC)
-- Jalankan 1x di Supabase SQL Editor setelah klik "Restore Project"
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.keep_alive_heartbeat (
    id INT PRIMARY KEY DEFAULT 1,
    last_pinged_at TIMESTAMPTZ DEFAULT NOW(),
    ping_count BIGINT DEFAULT 1,
    source TEXT DEFAULT 'github-actions'
);

ALTER TABLE public.keep_alive_heartbeat ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Heartbeat Access" ON public.keep_alive_heartbeat;
CREATE POLICY "Public Heartbeat Access" ON public.keep_alive_heartbeat
    FOR ALL TO anon, authenticated
    USING (id = 1)
    WITH CHECK (id = 1);

INSERT INTO public.keep_alive_heartbeat (id, last_pinged_at, ping_count, source)
VALUES (1, NOW(), 1, 'initial-seed')
ON CONFLICT (id) DO UPDATE SET last_pinged_at = NOW();

CREATE OR REPLACE FUNCTION public.ping_keep_alive(ping_source TEXT DEFAULT 'github-actions')
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_count BIGINT;
BEGIN
    INSERT INTO public.keep_alive_heartbeat (id, last_pinged_at, ping_count, source)
    VALUES (1, NOW(), 1, ping_source)
    ON CONFLICT (id) DO UPDATE
    SET last_pinged_at = NOW(),
        ping_count = public.keep_alive_heartbeat.ping_count + 1,
        source = EXCLUDED.source
    RETURNING ping_count INTO new_count;

    RETURN jsonb_build_object('ok', true, 'ping_count', new_count, 'timestamp', NOW());
END;
$$;

GRANT EXECUTE ON FUNCTION public.ping_keep_alive(TEXT) TO anon, authenticated;`;

  const GITHUB_WORKFLOW_YAML = `name: Supabase Keep-Alive Heartbeat

on:
  schedule:
    # Berjalan otomatis 2x sehari (setiap 12 jam: 00:00 & 12:00 UTC)
    - cron: '0 */12 * * *'
  workflow_dispatch:

jobs:
  keep-alive:
    name: Ping Supabase REST API
    runs-on: ubuntu-latest
    steps:
      - name: Send Write & Read Heartbeat to Supabase
        env:
          SUPABASE_URL: \${{ secrets.SUPABASE_URL || '${SUPABASE_URL}' }}
          SUPABASE_KEY: \${{ secrets.SUPABASE_ANON_KEY || '${SUPABASE_ANON_KEY}' }}
        run: |
          set +e
          READ_OUTPUT=$(curl -sS --retry 3 --retry-delay 5 --connect-timeout 15 \\
            -o /tmp/read_body.json -w "%{http_code}|%{time_total}" \\
            -X GET "$SUPABASE_URL/rest/v1/categories?select=id,name_id&limit=5" \\
            -H "apikey: $SUPABASE_KEY" \\
            -H "Authorization: Bearer $SUPABASE_KEY" \\
            -H "Cache-Control: no-cache, no-store" 2>/tmp/curl_err.txt)
          CURL_EXIT=$?
          READ_STATUS=$(echo "$READ_OUTPUT" | cut -d'|' -f1)

          if [ "$CURL_EXIT" -ne 0 ] || [ "$READ_STATUS" = "000" ]; then
            echo "Project Supabase sedang PAUSED! Buka Dashboard Supabase -> klik Restore Project."
            cat /tmp/curl_err.txt
            exit 1
          fi

          WRITE_STATUS=$(curl -s --retry 2 --connect-timeout 15 -o /tmp/write_body.json -w "%{http_code}" \\
            -X POST "$SUPABASE_URL/rest/v1/rpc/ping_keep_alive" \\
            -H "apikey: $SUPABASE_KEY" \\
            -H "Authorization: Bearer $SUPABASE_KEY" \\
            -H "Content-Type: application/json" \\
            -d '{"ping_source":"github-actions-cron"}')

          echo "Read HTTP: $READ_STATUS | Write RPC HTTP: $WRITE_STATUS"
          [ "$READ_STATUS" -ge 200 ] && [ "$READ_STATUS" -lt 300 ] && exit 0 || exit 1`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${FULL_SQL_SCRIPT}\n\n${KEEPALIVE_SQL_PATCH}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Alert Khusus Jika Project Terdeteksi PAUSED */}
      {isProjectPaused && (
        <div
          className={`p-5 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDark
              ? 'bg-rose-950/35 border-rose-500/50 text-rose-200'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="font-black text-sm text-rose-300">
                Project Supabase Saat Ini Berstatus PAUSED (Penyebab GitHub Actions Failed!)
              </div>
              <p className="leading-relaxed opacity-90">
                Saat project Supabase masuk mode <strong>Paused</strong>, DNS <code>yclzqhvvbejrouknnilj.supabase.co</code> dimatikan oleh Supabase sehingga GitHub Actions gagal dalam 2 detik (<em>All jobs have failed</em>). Script otomatis tidak bisa membangunkan project yang sudah terlanjur tidur — Anda wajib klik <strong>Restore project</strong> 1x secara manual, lalu jalankan patch SQL Write Heartbeat di tab <strong>Solusi Anti-Pause</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://supabase.com/dashboard/project/yclzqhvvbejrouknnilj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-rose-500/20 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>1. Buka &amp; Restore Project</span>
            </a>
            <button
              type="button"
              onClick={() => setActiveTab('keep-alive')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-black cursor-pointer"
            >
              2. Lihat Langkah Perbaikan
            </button>
          </div>
        </div>
      )}

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
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase tracking-wider ${
                  isProjectPaused
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}
              >
                {isProjectPaused ? 'Supabase Project Paused' : 'Supabase PostgreSQL Connected'}
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
              . Frontend telah dilengkapi fallback cerdas sehingga website tetap tampil mulus baik saat offline maupun setelah tabel Supabase aktif.
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
              href="https://supabase.com/dashboard/project/yclzqhvvbejrouknnilj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Dashboard Supabase</span>
            </a>
          </div>
        </div>

        {statusMessage && (
          <div
            className={`mt-4 pt-3 border-t flex items-center gap-2 text-xs font-mono ${
              isProjectPaused
                ? 'border-rose-500/30 text-rose-300'
                : 'border-emerald-500/20 text-emerald-300'
            }`}
          >
            {isProjectPaused ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
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
        <button
          onClick={() => setActiveTab('keep-alive')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all ${
            activeTab === 'keep-alive'
              ? 'bg-emerald-500 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Solusi Anti-Pause Supabase (Keep-Alive)</span>
        </button>
      </div>

      {/* TAB 1: Content Mapping Detail */}
      {activeTab === 'content-mapping' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Halaman Beranda (Home) */}
          <div
            className={`p-5 rounded-3xl border space-y-4 ${
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

          {/* 4. Form RFQ & Dokumen Penawaran */}
          <div
            className={`p-5 rounded-3xl border space-y-4 ${
              isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-inherit">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-black font-display text-slate-100">4. Form &amp; Dokumen RFQ</h4>
                <span className="text-[10px] font-mono text-neutral-400">Permintaan Penawaran Klien</span>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-neutral-300">
              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-emerald-400 block">Pengajuan RFQ &amp; PIC</span>
                <p className="text-[11px] text-neutral-400">
                  Tabel: <code className="text-emerald-400 font-mono">rfq_submissions</code>
                </p>
                <p className="text-[11px]">
                  Perusahaan, PIC, email, telp/WA, material, toleransi presisi, timeline, link drawing CAD.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-emerald-400 block">Daftar Item &amp; Kuantiti</span>
                <p className="text-[11px] text-neutral-400">
                  Kolom: <code className="text-emerald-400 font-mono">items (JSONB), status</code>
                </p>
                <p className="text-[11px]">
                  Rincian item mesin &amp; kuantiti yang dipilih di cart serta status antrean estimasi ('pending', 'quoted').
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
                <span className="font-bold text-emerald-400 block">Integrasi Pihak Ketiga</span>
                <p className="text-[11px] text-neutral-400">
                  Channel: <code className="text-emerald-400 font-mono">WhatsApp WA.me &amp; Print PDF</code>
                </p>
                <p className="text-[11px]">
                  Generate surat resmi RFQ cetak A4 dan otomatis forward via WhatsApp Sales PTT instan.
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

      {/* TAB 3: Solusi Supabase Anti-Pause (Keep-Alive Guide) */}
      {activeTab === 'keep-alive' && (
        <div className="space-y-6">
          {/* Main Info Banner */}
          <div
            className={`p-6 sm:p-7 rounded-3xl border space-y-4 ${
              isDark
                ? 'bg-gradient-to-br from-emerald-950/20 via-[#0c131a] to-[#080d12] border-emerald-500/30'
                : 'bg-emerald-50/70 border-emerald-200 shadow-sm'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Solusi Supabase Free Tier Tetap Aktif 24/7</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black font-display text-slate-100">
                  Cara Mencegah Supabase Masuk Status "PAUSED" Selamanya
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                  Supabase versi Free memberlakukan kebijakan jeda otomatis (<em>Auto-Pause</em>) jika sebuah project <strong>sama sekali tidak menerima request REST API atau koneksi database selama 7 hari berturut-turut</strong>.
                  Dengan mengirimkan 1 panggilan ringan (<em>heartbeat</em>) secara otomatis setiap 1–3 hari, project Supabase Anda <strong>dijamin akan terus aktif selamanya tanpa perlu membayar biaya langganan bulanan</strong>.
                </p>
              </div>

              {/* Live Ping Button */}
              <div className="shrink-0 self-start md:self-center">
                <button
                  type="button"
                  onClick={handlePingTest}
                  disabled={pinging}
                  className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-neutral-950 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Play className={`w-4 h-4 fill-current ${pinging ? 'animate-spin' : ''}`} />
                  <span>{pinging ? 'Mengirim Ping...' : 'Test Ping Database Sekarang'}</span>
                </button>
              </div>
            </div>

            {/* Ping Result Feedback */}
            {pingResult && (
              <div
                className={`p-3.5 rounded-2xl border text-xs font-mono flex items-center justify-between ${
                  pingResult.success
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                      : 'bg-emerald-100 border-emerald-300 text-emerald-900'
                    : isDark
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : 'bg-rose-100 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  {pingResult.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  )}
                  <span>
                    {pingResult.success ? (
                      <>
                        <strong>Respon Sukses 200 OK</strong> — {pingResult.detail} (Latency: {pingResult.latency} ms | {pingResult.timestamp})
                      </>
                    ) : (
                      <>
                        <strong>Ping Gagal</strong> — {pingResult.detail} ({pingResult.timestamp})
                      </>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Panduan Perbaikan Tuntas 4 Langkah (Unpause + Write Heartbeat + GitHub Actions v2) */}
          <div
            className={`p-6 rounded-3xl border space-y-5 ${
              isDark ? 'bg-[#0f141f] border-purple-500/40' : 'bg-white border-purple-300 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-inherit">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-purple-400">
                  Panduan Mengatasi Error Email &quot;All jobs have failed&quot; &amp; Project Paused
                </span>
                <h4 className="text-base font-black font-display text-slate-100 mt-0.5">
                  4 Langkah Agar GitHub Actions Hijau Kembali &amp; Supabase Tidak Pernah Paused Lagi
                </h4>
              </div>
              <a
                href="https://github.com/ikaandych-byte/PRIMATEK/actions"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl border border-purple-500/40 bg-purple-500/15 hover:bg-purple-500 text-purple-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors self-start"
              >
                <span>Buka GitHub Actions PRIMATEK</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Kolom Kiri: SQL Patch Write Heartbeat */}
              <div className="space-y-3">
                <div className="text-xs text-neutral-300 space-y-1">
                  <div className="font-bold text-emerald-400">
                    Langkah 1 &amp; 2: Restore Project di Supabase + Jalankan SQL Write Heartbeat
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Mengapa kemarin masih terkena <em>Paused</em>? Karena request <code>GET</code> (baca saja) setiap 2 hari terdeteksi sebagai <em>Low Activity</em> oleh Supabase. Fungsi RPC <code>ping_keep_alive</code> di bawah mencatat <strong>transaksi TULIS (UPDATE) nyata ke PostgreSQL</strong> pada 1 baris saja tanpa memenuhi kapasitas database.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400">SQL Patch (Jalankan di SQL Editor):</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(KEEPALIVE_SQL_PATCH);
                      setCopiedKeepAliveSql(true);
                      setTimeout(() => setCopiedKeepAliveSql(false), 2500);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKeepAliveSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKeepAliveSql ? 'SQL Tersalin!' : 'Salin SQL Heartbeat'}</span>
                  </button>
                </div>

                <pre className="p-3.5 rounded-2xl bg-black/80 text-emerald-400 text-[11px] font-mono overflow-x-auto max-h-60 border border-neutral-800 leading-relaxed">
                  <code>{KEEPALIVE_SQL_PATCH}</code>
                </pre>
              </div>

              {/* Kolom Kanan: GitHub Actions YAML v2 */}
              <div className="space-y-3">
                <div className="text-xs text-neutral-300 space-y-1">
                  <div className="font-bold text-purple-400">
                    Langkah 3 &amp; 4: Update File Workflow GitHub Actions (Setiap 12 Jam + Write RPC)
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    File <code>.github/workflows/supabase-keepalive.yml</code> di proyek ini sudah diperbarui menjadi jadwal <strong>setiap 12 jam (2x sehari)</strong> dengan transaksi <code>POST /rpc/ping_keep_alive</code>. Push perubahan ke GitHub (atau salin isi di bawah ke repo <code>ikaandych-byte/PRIMATEK</code>), lalu klik <strong>Run workflow</strong>.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400">.github/workflows/supabase-keepalive.yml:</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(GITHUB_WORKFLOW_YAML);
                      setCopiedWorkflowYaml(true);
                      setTimeout(() => setCopiedWorkflowYaml(false), 2500);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedWorkflowYaml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWorkflowYaml ? 'YAML Tersalin!' : 'Salin Workflow YAML'}</span>
                  </button>
                </div>

                <pre className="p-3.5 rounded-2xl bg-black/80 text-purple-300 text-[11px] font-mono overflow-x-auto max-h-60 border border-neutral-800 leading-relaxed">
                  <code>{GITHUB_WORKFLOW_YAML}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* 3 Strategi Anti-Pause Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Opsi 1: Cron-Job.org */}
            <div
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
                isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 pb-3 border-b border-inherit">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                      Metode Cadangan (Backup)
                    </span>
                    <h4 className="text-sm font-black font-display text-slate-100">
                      Cron-Job.org (Zero-Code)
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  Bisa dipakai bersamaan dengan GitHub Actions sebagai cadangan berlapis (<em>double protection</em>), terutama jika repo GitHub tidak ada commit baru selama &gt;60 hari.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-neutral-400">1. URL Target Ping (POST RPC):</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(`${SUPABASE_URL}/rest/v1/rpc/ping_keep_alive`);
                          setCopiedPingUrl(true);
                          setTimeout(() => setCopiedPingUrl(false), 2000);
                        }}
                        className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedPingUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPingUrl ? 'Tersalin' : 'Salin URL'}</span>
                      </button>
                    </div>
                    <code className="text-[10px] font-mono text-emerald-400 break-all block">
                      {SUPABASE_URL}/rest/v1/rpc/ping_keep_alive
                    </code>
                  </div>

                  <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-neutral-400">2. Request Header (apikey):</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(`apikey: ${SUPABASE_ANON_KEY}`);
                          setCopiedPingHeader(true);
                          setTimeout(() => setCopiedPingHeader(false), 2000);
                        }}
                        className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedPingHeader ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPingHeader ? 'Tersalin' : 'Salin Header'}</span>
                      </button>
                    </div>
                    <code className="text-[10px] font-mono text-cyan-400 truncate block">
                      apikey: {SUPABASE_ANON_KEY.slice(0, 25)}...
                    </code>
                  </div>
                </div>
              </div>

              <a
                href="https://cron-job.org"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Buka Cron-Job.org</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Opsi 2: GitHub Actions Workflow */}
            <div
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
                isDark
                  ? 'bg-gradient-to-b from-[#151226] to-[#0f141f] border-purple-500/40 ring-1 ring-purple-500/20'
                  : 'bg-purple-50/50 border-purple-300 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 pb-3 border-b border-inherit">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 uppercase font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                      Metode Terpilih (v2 Write + Read)
                    </span>
                    <h4 className="text-sm font-black font-display text-slate-100">
                      GitHub Actions (Setiap 12 Jam)
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  Diperbarui di <code className="text-purple-300">.github/workflows/supabase-keepalive.yml</code> menggunakan transaksi <strong>WRITE + READ</strong>.
                </p>

                <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs">
                  <div className="font-bold text-purple-400 font-mono text-[11px]">
                    Jadwal Cron Otomatis Baru:
                  </div>
                  <code className="text-[11px] font-mono text-emerald-400 block bg-black/50 p-2 rounded-lg">
                    schedule: '0 */12 * * *'
                  </code>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    Berjalan 2x sehari (07:00 &amp; 19:00 WIB) melakukan <code>UPDATE</code> ke tabel <code>keep_alive_heartbeat</code> + multi-table <code>SELECT</code> agar tidak pernah dianggap <em>Low Activity</em>.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-purple-400" />
                <span>Catatan: GitHub menonaktifkan cron jika repo 60 hari tanpa aktivitas/push.</span>
              </div>
            </div>

            {/* Opsi 3: Pengunjung Website Organik */}
            <div
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
                isDark ? 'bg-[#0f141f] border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 pb-3 border-b border-inherit">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                      Metode 3 (Fallback Pintar)
                    </span>
                    <h4 className="text-sm font-black font-display text-slate-100">
                      Proteksi Tampilan Website
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  Meskipun database Supabase sempat masuk kondisi Paused, seluruh halaman publik website PT. Prima Teknik Trada tetap berjalan normal tanpa layar error berkat fallback data lokal pada:
                </p>

                <div className="space-y-1.5 text-xs font-mono text-[11px] text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>getMachinesFromDb()</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>getFacilityToolsFromDb()</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>getPlantPillarsFromDb()</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Generate PDF &amp; WhatsApp RFQ</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] leading-relaxed">
                Segera klik Restore Project agar penyimpanan form RFQ ke cloud kembali aktif.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
