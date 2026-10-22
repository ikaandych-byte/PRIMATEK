-- ==============================================================================
-- DATABASE SCHEMA & SEED DATA UNTUK SUPABASE
-- PT. PRIMA TEKNIK TRADA (MANUFACTURING & ROBOTICS)
-- Supabase Project: https://yclzqhvvbejrouknnilj.supabase.co
-- Target Halaman: Beranda (Home), Machinery Catalog, Plant & Facilities
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. DDL TABLE DEFINITIONS
-- ==============================================================================

-- A. Table: categories (Kategori Mesin & Tooling pada Machinery Catalog)
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

-- B. Table: machines (Katalog Detail Seluruh Mesin, SPM, Dies, Jig & Spesifikasi)
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

-- C. Table: facility_tools (Inventaris 45+ Unit Mesin MM2100 di Halaman Plant & Facilities)
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

-- D. Table: plant_pillars (Pilar Utama & Metrik Lahan Pabrik MM2100)
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

-- E. Table: manufacturing_workflows (5 Tahap Alur Pengerjaan di Plant & Facilities)
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

-- F. Table: home_capabilities (4 Pilar Kapabilitas Manufaktur di Halaman Beranda)
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

-- G. Table: clients_and_partners (Klien OEM & Mitra Robotik pada Marquee Beranda)
CREATE TABLE IF NOT EXISTS public.clients_and_partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sector TEXT NOT NULL,
    category TEXT NOT NULL, -- 'automotive' atau 'partners'
    type_id TEXT NOT NULL,
    type_en TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Indonesia',
    logo_name TEXT,
    is_featured BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- H. Table: company_settings (Profil Legalitas & Kontak Perusahaan)
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

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facility_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plant_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manufacturing_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients_and_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- Izinkan publik (Anon key) membaca data (SELECT) untuk kebutuhan website
DROP POLICY IF EXISTS "Public Read Categories" ON public.categories;
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Machines" ON public.machines;
CREATE POLICY "Public Read Machines" ON public.machines FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Facility Tools" ON public.facility_tools;
CREATE POLICY "Public Read Facility Tools" ON public.facility_tools FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Plant Pillars" ON public.plant_pillars;
CREATE POLICY "Public Read Plant Pillars" ON public.plant_pillars FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Manufacturing Workflows" ON public.manufacturing_workflows;
CREATE POLICY "Public Read Manufacturing Workflows" ON public.manufacturing_workflows FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Home Capabilities" ON public.home_capabilities;
CREATE POLICY "Public Read Home Capabilities" ON public.home_capabilities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Clients and Partners" ON public.clients_and_partners;
CREATE POLICY "Public Read Clients and Partners" ON public.clients_and_partners FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Company Settings" ON public.company_settings;
CREATE POLICY "Public Read Company Settings" ON public.company_settings FOR SELECT USING (true);

-- Izinkan Administrator (Authenticated / Service Role) melakukan INSERT, UPDATE, DELETE
DROP POLICY IF EXISTS "Admin Full Access Categories" ON public.categories;
CREATE POLICY "Admin Full Access Categories" ON public.categories FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Full Access Machines" ON public.machines;
CREATE POLICY "Admin Full Access Machines" ON public.machines FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Full Access Facility Tools" ON public.facility_tools;
CREATE POLICY "Admin Full Access Facility Tools" ON public.facility_tools FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Full Access Plant Pillars" ON public.plant_pillars;
CREATE POLICY "Admin Full Access Plant Pillars" ON public.plant_pillars FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Full Access Workflows" ON public.manufacturing_workflows;
CREATE POLICY "Admin Full Access Workflows" ON public.manufacturing_workflows FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Full Access Home Capabilities" ON public.home_capabilities;
CREATE POLICY "Admin Full Access Home Capabilities" ON public.home_capabilities FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Full Access Clients" ON public.clients_and_partners;
CREATE POLICY "Admin Full Access Clients" ON public.clients_and_partners FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Full Access Settings" ON public.company_settings;
CREATE POLICY "Admin Full Access Settings" ON public.company_settings FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- ==============================================================================
-- 4. SEED DATA LENGKAP (PT. PRIMA TEKNIK TRADA)
-- ==============================================================================

-- A. Categories Seed
INSERT INTO public.categories (id, name_id, name_en, icon_name, description_id, description_en, display_order)
VALUES
('automation', 'Automation & Customized Machines', 'Automation & Customized Machines', 'Cpu', 'Mesin perakitan otomatis, robotic welding cell, SPM leak test & konveyor terpadu.', 'Customized turnkey automated assembly lines, robotic welding cells, and SPM leak testing.', 1),
('jig-fixture', 'Precision Jig & Fixture Tooling', 'Precision Jig & Fixture Tooling', 'Layers', 'Workholding jig klem hidrolik Pascal/Kosmek dan checking fixture bersertifikasi akurasi ±0.005mm.', 'High-precision hydraulic clamping fixtures and ISO certified checking fixtures.', 2),
('dies-moulds', 'Dies & Moulds Heavy Duty', 'Dies & Moulds Heavy Duty', 'Wrench', 'Progressive, transfer & tandem stamping dies 110T-250T untuk plat baja hingga ketebalan 6mm.', 'Progressive, transfer & tandem stamping dies rated up to 250T for sheet metal up to 6mm.', 3),
('mass-production', 'Parts Mass Production', 'Parts Mass Production', 'Cog', 'Fabrikasi massal suku cadang otomotif, bushing presisi, dan bearing spacer >100.000 pcs/bulan.', 'High-volume production of automotive precision bushings, spacers, and metal brackets.', 4),
('facility-tools', 'Plant Fleet & CMM Metrology', 'Plant Fleet & CMM Metrology', 'Building', 'Armada 45+ mesin pabrik MM2100: CNC Double Column 3 meter, Press Stamping 250T & 3D CMM Mitutoyo.', 'Plant fleet of 45+ machines: 3M Double Column CNC, 250T presses, and 3D CMM lab.', 5)
ON CONFLICT (id) DO UPDATE SET
    name_id = EXCLUDED.name_id,
    name_en = EXCLUDED.name_en;

-- B. Facility Tools Seed (Daftar 45+ Mesin Pabrik MM2100)
INSERT INTO public.facility_tools (name, machine_type, count_units, brand_or_model, travel_dimension, display_order)
VALUES
('CNC MACHINING CENTRE DOUBLE COLOUMN 3000X2000X1000MM TRAVEL', 'CNC Machining', 1, 'Double Column Heavy Center', '3.000 x 2.000 x 1.000 mm', 1),
('CNC MACHINING CENTRE DOUBLE COLOUMN 3000X2000X700MM TRAVEL', 'CNC Machining', 1, 'Double Column Heavy Center', '3.000 x 2.000 x 700 mm', 2),
('CNC MACHINING CENTRE 1350X680X600MM TRAVEL', 'CNC Machining', 1, 'Vertical Machining Center', '1.350 x 680 x 600 mm', 3),
('CNC MACHINING CENTRE 1050X510X500MM TRAVEL', 'CNC Machining', 1, 'Vertical Machining Center', '1.050 x 510 x 500 mm', 4),
('CNC MACHINING CENTRE 850X500X500MM TRAVEL', 'CNC Machining', 1, 'Vertical Machining Center', '850 x 500 x 500 mm', 5),
('CNC MACHINING CENTRE 1160 X 600 INCL 4TH AXIS ROTARY TABLE', 'CNC Machining', 1, '4-Axis Rotary VMC', '1.160 x 600 mm', 6),
('CNC DRILLING & TAPPING CENTRE 500X400X400MM TRAVEL', 'CNC Machining', 2, 'High Speed Tapping Center', '500 x 400 x 400 mm', 7),
('CNC MACHINING CENTRE DOUBLE PALLET 600X400X500MM TRAVEL', 'CNC Machining', 3, 'Double Pallet APC', '600 x 400 x 500 mm', 8),
('CNC LATHE DIA.CHUCK 8"-10" INCLUDE 4TH AXIS TYPE', 'CNC Lathe', 7, 'Slant Bed 4-Axis Turning', 'Chuck 8"-10"', 9),
('MANUAL MILLING 800X300X600MM TRAVEL', 'Manual Milling', 1, 'Turret Milling', '800 x 300 x 600 mm', 10),
('EDM 60A', 'EDM', 1, 'Die Sinking EDM 60A', 'Precision Spark Gap', 11),
('SURFACE GRINDING 900X450X500MM', 'Grinding', 1, 'Hydraulic Surface Grinder', '900 x 450 x 500 mm', 12),
('SURFACE GRINDING 600X300X400MM', 'Grinding', 1, 'Precision Surface Grinder', '600 x 300 x 400 mm', 13),
('CYLINDRICAL GRINDING DIA. 200X500MM', 'Grinding', 1, 'Universal Cylindrical Grinder', 'Dia 200 x 500 mm', 14),
('RADIAL DRILL NT50-2500MM', 'Drilling', 2, 'Heavy Radial Drill', 'Arm Reach 2.500 mm', 15),
('BANDSAW MACHINE 800X800MM & 500X500MM', 'Cutting', 2, 'Horizontal Billet Bandsaw', '800 x 800 mm', 16),
('MANUAL LATHE (DIA. 400X1000, 500X1500, 600X2000MM)', 'Manual Lathe', 3, 'Heavy Duty Center Lathe', 'Max Dia 600 x 2.000 mm', 17),
('WELDING MACHINE: PLASMA, CO2, ARGON', 'Welding', 10, 'Inverter Multi-Process', 'Plasma, MIG/CO2, TIG Argon', 18),
('CMM 750X500X500MM', 'Quality Metrology', 1, 'Mitutoyo 3D Bridge CMM', '750 x 500 x 500 mm', 19),
('CMM 6AXIS PORTABLE R2500', 'Quality Metrology', 2, 'Articulated Portable Arm', 'Radius 2.500 mm', 20),
('SHIEH YIEH DOUBLE CRANK PRESS 250T INCL. UNCOILER FEEDER', 'Stamping Press', 1, 'SEYI Double Crank 250T', 'Bed Area 2.500 x 1.200 mm', 21),
('AMADA DOUBLE CRANK MECHANICAL PRESS 200T INCL. UNCOILER FEEDER', 'Stamping Press', 1, 'AMADA 200T Crank Press', 'Bed Area 2.200 x 1.100 mm', 22),
('AUTOMA DOUBLE CRANK MECHANICAL PRESS 200T INCL. UNCOILER FEEDER', 'Stamping Press', 1, 'AUTOMA 200T Feeder', 'Bed Area 2.000 x 1.000 mm', 23),
('KOMATSU MECHANICAL PRESS 200T INCL. UNCOILER FEEDER', 'Stamping Press', 1, 'KOMATSU 200T Stamping', 'Bed Area 2.000 x 1.000 mm', 24),
('FUKUI DOUBLE CRANK MECHANICAL PRESS 200T', 'Stamping Press', 1, 'FUKUI Double Crank 200T', 'Bed Area 2.000 x 1.000 mm', 25),
('AIDA MECHANICAL PRESS 200T', 'Stamping Press', 1, 'AIDA 200T High Rigid', 'Bed Area 1.800 x 900 mm', 26),
('AAA MECHANICAL PRESS 200T', 'Stamping Press', 1, 'AAA Press 200T', 'Bed Area 1.800 x 900 mm', 27),
('WORLD MECHANICAL PRESS 200T', 'Stamping Press', 2, 'WORLD 200T Mechanical', 'Bed Area 1.800 x 900 mm', 28),
('AIDA MECHANICAL PRESS 150T', 'Stamping Press', 1, 'AIDA 150T Mechanical', 'Bed Area 1.600 x 800 mm', 29),
('AIDA MECHANICAL PRESS 110T', 'Stamping Press', 1, 'AIDA 110T Mechanical', 'Bed Area 1.400 x 700 mm', 30),
('KOMATSU MECHANICAL PRESS 150T', 'Stamping Press', 2, 'KOMATSU 150T Mechanical', 'Bed Area 1.600 x 800 mm', 31);

-- C. Plant Pillars Seed (Halaman Plant & Facilities)
INSERT INTO public.plant_pillars (id, title_id, title_en, metric_value, sub_id, sub_en, desc_id, desc_en, display_order)
VALUES
('land-footprint', 'Lahan & Area Workshop', 'Land & Plant Footprint', '2,806 m²', 'Bangunan Produksi 2.400 m²', 'Built Manufacturing Area 2,400 m²', 'Terletak strategis di Kawasan Industri MM2100 Cibitung Bekasi dengan akses kontainer trailer 40ft.', 'Strategically situated in MM2100 Industrial Estate Cibitung, Bekasi with 40ft container trailer access.', 1),
('machinery-fleet', 'Armada Mesin Produksi', 'Production Machinery Fleet', '45+ Units', 'Mesin Presisi Berkapasitas Tinggi', 'High-Rigidity Machine Tools', 'CNC Machining Double Column 3 meter, Press Stamping 110T-250T, CNC Lathe 4-Axis, dan Grinding.', '3-Meter CNC Double Column centers, 110T-250T mechanical stamping presses, 4-axis CNC lathes, and precision grinding.', 2),
('crane-capacity', 'Kapasitas Angkat Berat', 'Heavy Crane Capacity', '10 Ton Crane', 'Overhead Crane Ganda', 'Dual Overhead Cranes', 'Penanganan aman untuk die base cetakan besar, frame mesin otomatis, dan material struktural berat.', 'Safe overhead material handling for massive stamping die shoes, machine frames, and heavy structural castings.', 3),
('cmm-lab', 'Laboratorium Metrologi CMM', '3D CMM Metrology Lab', '±0.002 mm', 'Clean Room Suhu Konstan', 'Climate-Controlled Cleanroom', 'CMM Mitutoyo terkalibrasi untuk inspeksi koordinat 3D dan validasi toleransi sub-mikron.', 'Calibrated Mitutoyo 3D Bridge CMM and portable articulating arms for sub-micron GD&T dimensional validation.', 4)
ON CONFLICT (id) DO UPDATE SET
    metric_value = EXCLUDED.metric_value,
    desc_id = EXCLUDED.desc_id;

-- D. Manufacturing Workflows Seed (Tahap 01 - 05)
INSERT INTO public.manufacturing_workflows (id, step_number, title_id, title_en, desc_id, desc_en, display_order)
VALUES
('wf-01', '01', 'Engineering & 3D CAD/CAM', 'Engineering & 3D CAD/CAM', 'Pemodelan solid model 3D, finite element analysis (FEA), dan simulasi jalur potong CNC sebelum pengerjaan.', 'Solid model 3D CAD drafting, finite element analysis (FEA), and CAM toolpath simulation prior to machining.', 1),
('wf-02', '02', 'Roughing & Double Column CNC', 'Roughing & Double Column CNC', 'Pemesinan balok baja paduan dan die base menggunakan CNC Double Column stroke 3.000 mm.', 'Heavy roughing and surface milling of alloy steel billets and die bases on 3,000 mm stroke Double Column CNCs.', 2),
('wf-03', '03', 'Precision Machining & Grinding', 'Precision Machining & Grinding', 'Pengerjaan profil mikro pada CNC Milling 4-axis serta surface grinding untuk toleransi sub-mikron.', 'Micro-feature profiling on 4-axis milling centers, precision wire EDM, and surface grinding to sub-micron limits.', 3),
('wf-04', '04', 'Assembly & PLC/Robotics', 'Assembly & PLC/Robotics', 'Perakitan mekanik, instalasi hidrolik/pneumatik Pascal/Kosmek, kabel panel, dan pemrograman PLC/Robot.', 'Mechanical assembly, Pascal/Kosmek hydraulic integration, pneumatic lines, panel wiring, and PLC/Robot programming.', 4),
('wf-05', '05', 'Tryout & CMM Inspection', 'Tryout & CMM Inspection', 'Pengujian beban kerja kontinu di pabrik dan verifikasi dimensi 3D CMM berstandar ISO 9001:2015.', 'Continuous load tryout under production press conditions and 3D CMM dimensional verification per ISO 9001:2015.', 5)
ON CONFLICT (id) DO UPDATE SET
    title_id = EXCLUDED.title_id,
    desc_id = EXCLUDED.desc_id;

-- E. Home Capabilities Seed (Pilar Beranda)
INSERT INTO public.home_capabilities (id, category_slug, title_id, title_en, subtitle_id, subtitle_en, desc_id, desc_en, highlights_id, highlights_en, icon_name, color_gradient, display_order)
VALUES
('automation', 'automation', 'Customized Machine & Automation', 'Customized Machine & Automation', 'Sistem Otomasi Robotik & Mesin Khusus', 'Robotic Automation & Special Purpose Machines', 'Perancangan dan fabrikasi mesin perakitan otomatis (SPM), robot cell welding, automated leak testing, conveyor packaging, dan PLC/SCADA control panel.', 'Turnkey design and manufacturing of automated assembly lines (SPM), robotic welding cells, high-sensitivity leak testing machines, conveyor systems, and integrated PLC/SCADA control panels.', '["Integrasi Robot SCARA & 6-Axis", "Cycle Time Lebih Cepat", "Sensitivitas Leak Test 0.1 kPa"]'::jsonb, '["SCARA & 6-Axis Robot Integration", "Optimized Rapid Cycle Time", "Leak Test Sensitivity to 0.1 Pa"]'::jsonb, 'Cpu', 'from-amber-500/20 to-transparent', 1),
('jig-fixture', 'jig-fixture', 'Precision Jig & Fixture Tooling', 'Precision Jig & Fixture Tooling', 'Hydraulic Clamping & Checking Fixtures', 'Hydraulic Clamping & Metrology Checking Fixtures', 'Tooling jig presisi tinggi untuk machining center dan checking fixture metrologi untuk inspeksi dimensi bodi & sasis otomotif bersertifikasi.', 'High-precision workholding fixtures for multi-axis CNC machining centers and accredited metrology checking fixtures for automotive sheet metal and chassis inspection.', '["Akurasi Dimensi ±0.005 mm", "Sistem Klem Hidrolik Pascal/Kosmek", "Zero-Play Bushing Hardened SKD11"]'::jsonb, '["Manufacturing Accuracy ±0.005 mm", "Pascal / Kosmek Hydraulic Clamping", "Zero-Play Hardened SKD11 Bushings"]'::jsonb, 'Layers', 'from-blue-500/20 to-transparent', 2),
('dies-moulds', 'dies-moulds', 'Heavy Duty Dies & Moulds', 'Heavy Duty Dies & Moulds', 'Progressive, Transfer & Tandem Dies', 'Progressive, Transfer & Tandem Stamping Dies', 'Pembuatan cetakan stamping logam plat tebal hingga 6mm dan dies presisi untuk komponen struktural otomotif, electrical parts, dan peralatan industri.', 'Custom metal stamping dies for high-tensile sheet metal up to 6mm thickness, plus precision injection mould tooling for automotive structural parts and industrial electronics.', '["Kapasitas Mesin Press 110T – 250T", "Maksimal Die Base 3.000 x 2.000 mm", "Material Tool Steel DIN 1.2379 / SKD11"]'::jsonb, '["Press Tonnage Rating 110T – 250T", "Max Die Base 3,000 x 2,000 mm", "Premium Tool Steel DIN 1.2379 / SKD11"]'::jsonb, 'Wrench', 'from-emerald-500/20 to-transparent', 3),
('mass-production', 'mass-production', 'Mass Production Parts Machining', 'Mass Production Parts Machining', 'Stamping & CNC Machining Volume Tinggi', 'High-Volume Stamping & 4-Axis CNC Turning', 'Lini produksi massal komponen presisi otomotif, bearing spacer, bushing, shaft, dan braket logam dengan jaminan mutu konsisten bersertifikat ISO 9001:2015.', 'Continuous mass production line for automotive powertrain components, bearing spacers, precision bushings, and structural brackets with strict ISO 9001:2015 quality assurance.', '["Output >100.000 pcs / bulan", "In-Line Quality Control & CMM", "Supply Chain Tier-1 Otomotif"]'::jsonb, '["Monthly Output >100,000 pcs", "In-Line Quality Control & CMM Audit", "Established Tier-1 Automotive Supply"]'::jsonb, 'Cog', 'from-purple-500/20 to-transparent', 4)
ON CONFLICT (id) DO UPDATE SET
    title_id = EXCLUDED.title_id,
    desc_id = EXCLUDED.desc_id;

-- F. Clients & Partners Seed
INSERT INTO public.clients_and_partners (id, name, sector, category, type_id, type_en, country, is_featured, display_order)
VALUES
('daihatsu', 'PT. Astra Daihatsu Motor', 'Automotive 4W OEM', 'automotive', 'Assembly Jig & Stamping Dies', 'Assembly Jig & Stamping Dies', 'Indonesia', true, 1),
('honda', 'PT. Astra Honda Motor (AHM)', 'Automotive 2W OEM', 'automotive', 'Special Purpose Machine & Jig', 'Special Purpose Machine & Jig', 'Indonesia', true, 2),
('yamaha', 'PT. Yamaha Indonesia Motor', 'Automotive 2W OEM', 'automotive', 'Robotic Welding & Inspection', 'Robotic Welding & Inspection', 'Indonesia', true, 3),
('mitsubishi', 'PT. Mitsubishi Motors KRM', 'Automotive 4W OEM', 'automotive', 'Heavy Stamping Press Dies', 'Heavy Stamping Press Dies', 'Indonesia', true, 4),
('kalbe', 'PT. Kalbe Farma Tbk', 'Pharmaceutical & Healthcare', 'automotive', 'Automated Packaging & Conveyor', 'Automated Packaging & Conveyor', 'Indonesia', true, 5),
('nsk', 'PT. NSK Bearing Mfg Indonesia', 'Precision Bearing & Motion', 'automotive', 'Ultra-Precision Tooling & Fixture', 'Ultra-Precision Tooling & Fixture', 'Indonesia', true, 6),
('epson', 'EPSON ROBOTICS', 'Official Robot System Integrator', 'partners', 'Perakitan SCARA & 6-Axis Berkecepatan Tinggi', 'SCARA & 6-Axis High Speed Assembly', 'Japan', true, 7),
('yaskawa', 'YASKAWA MOTOMAN', 'Robotics Technical Partner', 'partners', 'Robot Las Industri & Penanganan Material', 'Industrial Welding & Material Handling Robots', 'Japan', true, 8),
('keyence', 'KEYENCE SENSORS', 'Machine Vision Partner', 'partners', 'Inspeksi Dimensi & Vision Guidance Otomatis', 'Automated Vision Guidance & Dimension Inspection', 'Japan', true, 9),
('omron', 'OMRON AUTOMATION', 'PLC & Safety Control Partner', 'partners', 'Sistem Kendali Terdistribusi & Safety Interlock', 'Distributed Control Systems & Machine Safety Interlocks', 'Japan', true, 10),
('bosch', 'BOSCH REXROTH', 'Pneumatics & Hydraulics', 'partners', 'Komponen Gerak Linier & Aktuator Hidrolik', 'Linear Motion & Hydraulic Actuation Systems', 'Germany', true, 11)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector;

-- G. Company Settings Seed
INSERT INTO public.company_settings (id, company_name, brand_name, tagline_id, tagline_en, address_street, address_city, address_estate, email_general, email_rfq, phone, whatsapp_number, operating_hours, iso_certification)
VALUES
('primary', 'PT. PRIMA TEKNIK TRADA', 'PRIMA TEKNIK TRADA', 'Pusat Manufaktur Mesin Presisi, Otomasi Industri & Robotika', 'Premier Precision Machinery, Robotics & Industrial Automation Center', 'Kawasan Industri MM2100, Jl. Selayar Blok B2 No. 1, Desa Mekarwangi, Kec. Cikarang Barat', 'Kabupaten Bekasi, Jawa Barat 17530', 'Kawasan Industri MM2100 Cibitung', 'sales@pttid.com', 'rfq@pttid.com', '+62 21 8998 3355', '6281289983355', 'Senin - Jumat: 08.00 - 17.00 WIB', 'ISO 9001:2015 Certified')
ON CONFLICT (id) DO UPDATE SET
    company_name = EXCLUDED.company_name,
    address_street = EXCLUDED.address_street;

-- ==============================================================================
-- 5. CONTOH SEED SPESIMEN MESIN KATALOG (MACHINES)
-- ==============================================================================
INSERT INTO public.machines (
    id, name, category_id, category_name, short_desc_id, short_desc_en,
    detailed_desc_id, image_url, capacity_or_tonnage, travel_or_dimension,
    accuracy_or_tolerance, process_type, control_system, suitable_for_id,
    industry_applications, key_features, specs, units_available, is_featured, display_order
)
VALUES
(
    'spm-assembly-line',
    'Automated Assembly & Packaging Line Machine',
    'automation',
    'Automation & Customized Machines',
    'Sistem mesin perakitan otomatis multi-station dengan konveyor terintegrasi, welding station, pneumatic pick & place, dan kendali PLC terpusat.',
    'Turnkey multi-station automated assembly line with integrated conveyor, pneumatic pick & place, and centralized PLC.',
    'Dirancang dan diproduksi khusus (customized machine) untuk meningkatkan kapasitas produksi dan akurasi perakitan secara berkelanjutan. Menggabungkan 3D modeling tingkat tinggi, pneumatic actuators, torque-controlled tightening, serta sensor deteksi otomatis dari Omron / Keyence.',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    'Cycle Time 4.5 detik / unit',
    '6.000 x 1.800 x 2.100 mm',
    'Repeatability ±0.02 mm',
    'Assembly, Welding Line & Packaging',
    'Omron Sysmac / Mitsubishi iQ-R Series',
    'Lini perakitan massal komponen transmisi, switch elektrik, filter oli, dan sub-assy otomotif.',
    '["Automotive OEM", "Consumer Electronics", "Medical Devices", "Pharmaceutical"]'::jsonb,
    '["Multi-station index turntable & linear pallet transfer", "Pneumatic & servo-driven pick-and-place mechanism", "Integrated torque tightening inspection", "Touchscreen HMI dengan alarm diagnostics & Poka-Yoke error proofing"]'::jsonb,
    '[{"label": "Tipe Kontrol", "value": "OMRON / MITSUBISHI PLC + Touchscreen HMI", "highlight": true}, {"label": "Cycle Time Target", "value": "3 - 8 detik", "highlight": true}, {"label": "Akurasi Penempatan", "value": "±0.02 mm", "highlight": true}]'::jsonb,
    1, true, 1
),
(
    'robotic-cell-application',
    'Industrial Robotic Cell (Welding, Sealing & Tending)',
    'automation',
    'Automation & Customized Machines',
    'Sel robotika industri multi-sumbu untuk pengelasan presisi, aplikasi sealing perekat, loading/unloading mesin, dan penanganan material.',
    'Multi-axis robotic industrial cell for precision welding, automated adhesive sealing, and machine tending.',
    'Menggunakan kolaborasi teknis resmi dengan EPSON ROBOT dan YASKAWA ROBOT sebagai System Integrator terpilih. Dilengkapi vision guidance system, teaching pendant, serta perlindungan safety interlock berstandar internasional.',
    'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    'Payload 6 kg – 50 kg',
    'Reach Radius 1.400 – 2.050 mm',
    'Pose Repeatability ±0.03 mm',
    'Robotic Welding, Painting, Sealing, Machine Tending',
    'YRC1000 / Epson RC700-A Controller',
    'Pengelasan rangka motor/mobil, pengaplikasian lem kaca/mesin otomatis, dan otomasi loading mesin press/CNC.',
    '["Automotive 2W & 4W", "Metal Fabrication", "Chassis & Subframe", "Precision Optics"]'::jsonb,
    '["Mitra resmi System Integrator EPSON & YASKAWA Robot", "Integrasi las MIG/MAG, TIG, dan Plasma berkecepatan tinggi", "Automated sealant dispensing nozzle dengan kendali debit akurat"]'::jsonb,
    '[{"label": "Merek Robot", "value": "YASKAWA Motoman / EPSON 6-Axis", "highlight": true}, {"label": "Jumlah Sumbu", "value": "6-Axis Articulated", "highlight": true}]'::jsonb,
    1, true, 2
),
(
    'double-column-cnc-3000',
    'CNC Machining Centre Double Column 3000 x 2000 mm',
    'facility-tools',
    'Plant Fleet & CMM Metrology',
    'Mesin CNC Double Column berkapasitas ekstra besar dengan jarak tempuh X: 3.000 mm, Y: 2.000 mm, Z: 1.000 mm untuk permesinan balok die cetakan baja berat.',
    'Extra large heavy-duty CNC Double Column machining center with 3,000 x 2,000 mm stroke.',
    'Tulang punggung permesinan presisi PT. Prima Teknik Trada di MM2100 Cibitung. Mampu memproses balok baja cor struktural, mold base raksasa, dan frame robotika dengan kekakuan maksimal dan getaran minimal.',
    'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    'Beban Meja Max 10.000 kg (10 Ton)',
    '3.000 x 2.000 x 1.000 mm',
    'Akurasi Posisi ±0.008 mm',
    'Heavy Roughing, 3D Contouring & Deep Cavity Milling',
    'FANUC 31i-MB / Mitsubishi M80 CNC Controller',
    'Pemesinan die shoe cetakan stamping, bolster plate, dan rangka mesin otomatis berukuran besar.',
    '["Automotive Stamping Dies", "Heavy Machinery Base", "Die Casting Molds"]'::jsonb,
    '["Konstruksi bridge gantry double column ultra-rigid", "Spindle BT50 gear-head torsi tinggi 6.000 RPM", "Automatic Tool Changer (ATC) 40 Tools"]'::jsonb,
    '[{"label": "Ukuran Meja Kerja", "value": "3.200 x 1.800 mm", "highlight": true}, {"label": "Spindle Taper", "value": "BT-50 High Torque", "highlight": true}]'::jsonb,
    2, true, 3
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    short_desc_id = EXCLUDED.short_desc_id;
