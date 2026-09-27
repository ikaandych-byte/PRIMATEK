import { MachineItem, MachineCategory } from '../types';
import { MACHINES_DATA } from '../data/machines';
import { Language } from '../context/LanguageContext';

export interface LocalizedCategory {
  id: MachineCategory;
  label: string;
  countBadge: string;
}

export const getLocalizedCategories = (lang: Language): LocalizedCategory[] => {
  if (lang === 'en') {
    return [
      { id: 'all', label: 'All Categories', countBadge: '11 Systems' },
      { id: 'automation', label: 'Automation & Custom Machines', countBadge: '3 Systems' },
      { id: 'jig-fixture', label: 'Jig – Fixture – Precision', countBadge: 'Sub-Micron' },
      { id: 'dies-moulds', label: 'Dies & Moulds Heavy Duty', countBadge: '110T – 250T' },
      { id: 'mass-production', label: 'Parts Mass Production', countBadge: 'Press & Lathe' },
      { id: 'facility-tools', label: 'Machinery Fleet & CMM', countBadge: 'Double Column' },
    ];
  }
  return [
    { id: 'all', label: 'Semua Kategori', countBadge: '11 Sistem' },
    { id: 'automation', label: 'Automation & Custom Machines', countBadge: '3 Sistem' },
    { id: 'jig-fixture', label: 'Jig – Fixture – Precision', countBadge: 'Sub-Mikron' },
    { id: 'dies-moulds', label: 'Dies & Moulds Heavy Duty', countBadge: '110T – 250T' },
    { id: 'mass-production', label: 'Parts Mass Production', countBadge: 'Press & Lathe' },
    { id: 'facility-tools', label: 'Armada Mesin & CMM', countBadge: 'Double Column' },
  ];
};

export const getLocalizedMachine = (machine: MachineItem, lang: Language): MachineItem => {
  if (lang === 'id') {
    return machine;
  }

  // English Localized Versions
  switch (machine.id) {
    case 'spm-assembly-line':
      return {
        ...machine,
        name: 'Automated Assembly & Packaging Line Machine',
        categoryName: 'Automation & Customized Machines',
        shortDesc: 'Multi-station automated assembly system with integrated indexed transfer, welding stations, pneumatic pick & place, and centralized PLC control architecture.',
        detailedDesc: 'Custom-engineered turnkey machine built to maximize factory throughput and assembly accuracy. Features precision 3D modeling, pneumatic actuators, torque-controlled tightening, and automated vision/photoelectric sensors from Omron and Keyence.',
        capacityOrTonnage: 'Cycle Time 4.5 sec / unit',
        processType: 'Assembly, In-Line Welding & Packaging',
        suitableFor: 'High-volume assembly of automotive transmission sub-assemblies, electrical switches, oil filters, and precision mechanisms.',
        keyFeatures: [
          'Multi-station index turntable & linear pallet transfer system',
          'Pneumatic & servo-driven pick-and-place precision mechanism',
          'Integrated digital torque tightening inspection & data logging',
          'Touchscreen HMI with fault alarm diagnostics & Poka-Yoke error proofing',
          'Heavy-duty structural steel frame with vibration dampening isolation',
        ],
        specs: [
          { label: 'Control Architecture', value: 'OMRON / MITSUBISHI PLC + Touchscreen HMI', highlight: true },
          { label: 'Target Cycle Time', value: '3 - 8 seconds (programmable per process)', highlight: true },
          { label: 'Operating Air Pressure', value: '0.5 – 0.7 MPa', highlight: false },
          { label: 'Power Supply', value: '3-Phase AC 380V, 50Hz, 12kW', highlight: false },
          { label: 'Placement Accuracy', value: '±0.02 mm', highlight: true },
          { label: 'Safety Enclosure', value: 'Interlocked Light Curtains & Polycarbonate Guard', highlight: false },
        ],
      };

    case 'robotic-cell-application':
      return {
        ...machine,
        name: 'Industrial Robotic Cell (Welding, Sealing & Tending)',
        categoryName: 'Automation & Customized Machines',
        shortDesc: 'Multi-axis articulated robotics cells for precision welding, automated sealant dispensing, machine tending, and fast material handling.',
        detailedDesc: 'Developed in official technical collaboration with EPSON ROBOT and YASKAWA ROBOT as a certified System Integrator. Equipped with vision guidance, teaching pendants, and CE/ISO safety interlock enclosures.',
        capacityOrTonnage: 'Payload 6 kg – 50 kg',
        processType: 'Robotic Welding, Painting, Sealing, Machine Tending',
        suitableFor: 'Automated robotic welding of automotive subframes, robotic seal dispensing, CNC lathe tending, and high-speed palletizing.',
        keyFeatures: [
          'Certified System Integrator for EPSON & YASKAWA Industrial Robots',
          'High-speed MIG/MAG, TIG, and Plasma precision welding integration',
          'Automated sealant dispensing nozzle with precision volumetric dosing',
          'Dual-station positioner for continuous operation with zero idle loading time',
          'Safety light curtains & CE/ISO certified safety PLC control architecture',
        ],
        specs: [
          { label: 'Robot Brand & Axes', value: 'EPSON (SCARA / 6-Axis) & YASKAWA Motoman', highlight: true },
          { label: 'Arm Reach Radius', value: '1,400 mm – 2,050 mm radius', highlight: true },
          { label: 'Pose Repeatability', value: '±0.03 mm', highlight: true },
          { label: 'Payload Capacity', value: 'Up to 50 kg heavy handling', highlight: false },
          { label: 'Welding Power Source', value: 'Digital Inverter Pulse MIG 350A / 500A', highlight: false },
          { label: 'Vision Integration', value: 'Keyence 2D/3D Positioning Camera Support', highlight: true },
        ],
      };

    case 'air-leak-tester':
      return {
        ...machine,
        name: 'Automated Air Leak Testing & Vision Inspection System',
        categoryName: 'Automation & Customized Machines',
        shortDesc: 'High-precision differential pressure air leak testing machine with Cosmo instruments and automated clamping tooling.',
        detailedDesc: 'Engineered for 100% in-line quality assurance on automotive powertrain castings, engine blocks, brake cylinders, and medical containers. Integrates quick-acting sealing plugs with automatic pass/fail sorting.',
        capacityOrTonnage: 'Differential Pressure 0.1 Pa Resolution',
        processType: 'Air Leak Testing, Pressure Decay & Vision QA',
        suitableFor: 'Leak inspection of water jackets, fuel manifolds, brake calipers, gearboxes, and sealed electrical enclosures.',
        keyFeatures: [
          'Integrated high-precision COSMO Instruments differential air tester',
          'Automated pneumatic/hydraulic sealing clamp designed for part geometry',
          'Automatic Pass / Fail rejection gate with Poka-Yoke part marking stamp',
          'Ethernet data logging for traceability and SPC statistical quality control',
          'Quick-change tooling fixture for multiple workpiece variants',
        ],
        specs: [
          { label: 'Measurement Instrument', value: 'COSMO Air Leak Tester (Japan) Differential Pressure', highlight: true },
          { label: 'Test Pressure Range', value: '20 kPa – 700 kPa (customizable)', highlight: true },
          { label: 'Leak Sensitivity', value: '0.1 mL/min (0.1 Pa)', highlight: true },
          { label: 'Test Cycle Time', value: '8 – 15 seconds (fill, balance, test, exhaust)', highlight: false },
          { label: 'Data Output', value: 'RS-232C, Ethernet Modbus / CSV Log Export', highlight: false },
        ],
      };

    case 'hydraulic-machining-fixture':
      return {
        ...machine,
        name: 'Multi-Station Hydraulic Machining Fixture Tooling',
        categoryName: 'Precision Jig & Fixture',
        shortDesc: 'Custom CNC milling fixture tooling with hydraulic sequencing clamps, Pascal/Kosmek rotary couplings, and SKD11 locating elements.',
        detailedDesc: 'Designed to eliminate workpiece deformation during heavy high-speed CNC milling. Delivers high clamping repeatability, fast loading/unloading cycle times, and automated pneumatic part seating verification.',
        capacityOrTonnage: 'Clamping Force 15 – 35 kN',
        processType: 'Precision CNC Milling Workholding',
        suitableFor: 'Multi-axis CNC milling of automotive engine brackets, knuckles, steering housings, and precision aluminum castings.',
        keyFeatures: [
          'Pascal / Kosmek hydraulic swing clamps and work supports',
          'Hardened locating pins and pads manufactured from heat-treated SKD11 (HRC 58-62)',
          'Integrated air-sensing seating check to confirm zero-gap part placement',
          'Heavy-duty cast iron / S50C subplate with precision ground reference surfaces',
          'Sub-micron repeatability across 500,000+ continuous clamping cycles',
        ],
        specs: [
          { label: 'Clamping System', value: 'Pascal / Kosmek Hydraulic Swing Clamp 7 MPa', highlight: true },
          { label: 'Locating Repeatability', value: '±0.005 mm (5 Microns)', highlight: true },
          { label: 'Base Plate Material', value: 'S50C Stabilized / Meehanite Cast Iron', highlight: false },
          { label: 'Locating Bushing Steel', value: 'SKD11 Vacuum Hardened HRC 60±2', highlight: true },
          { label: 'Part Seating Sensor', value: 'Built-in Pneumatic Gap Sensor (0.01 mm)', highlight: false },
        ],
      };

    case 'automotive-checking-fixture':
      return {
        ...machine,
        name: 'Automotive Body & Chassis Checking Fixture',
        categoryName: 'Precision Jig & Fixture',
        shortDesc: 'Certified checking fixture with dial gauge brackets, go/no-go pin feelers, and datum alignment to verify vehicle stamping parts.',
        detailedDesc: 'Critical metrology tooling for checking dimensional accuracy, flushness, and hole positions on stamped vehicle sheet metal and welded sub-assemblies. Calibrated with full 3D CMM inspection certificates.',
        capacityOrTonnage: 'Envelope up to 2,500 x 1,500 x 800 mm',
        processType: 'Metrology Inspection, GD&T Verification & Checking',
        suitableFor: 'Quality verification of automotive body panels, chassis brackets, bumper crossmembers, and structural door frames.',
        keyFeatures: [
          'Engineered directly from automotive OEM Master CAD 3D models',
          'Aircraft-grade 7075-T6 aluminum or stabilized resin body with steel datum points',
          'Digital dial indicator mounts and magnetic flush/gap gauge blocks',
          'Hardened guide bushings and spring-loaded Go / No-Go pins',
          'Accompanied by an official ISO 9001 accredited 3D CMM inspection report',
        ],
        specs: [
          { label: 'Manufacturing Tolerance', value: 'Datum Points ±0.01 mm | Profile ±0.05 mm', highlight: true },
          { label: 'Base Material', value: 'Alloy Plate 7075 / Normalized S50C Plate', highlight: false },
          { label: 'Inspection Certification', value: 'Mitutoyo 3D CMM Full Report Provided', highlight: true },
          { label: 'Checking Pin Hardness', value: 'SKD11 Heat Treated HRC 58-62', highlight: false },
          { label: 'Gauge Mount Standard', value: 'Digital Mitutoyo Indicator Dial Compatible', highlight: false },
        ],
      };

    case 'heavy-tandem-progressive-dies':
      return {
        ...machine,
        name: 'Heavy-Duty Progressive & Transfer Stamping Dies',
        categoryName: 'Dies & Moulds Heavy Duty',
        shortDesc: 'Precision metal stamping dies for sheet metal up to 6mm thickness, featuring progressive strip feed, carbide inserts, and nitrogen gas springs.',
        detailedDesc: 'Built in-house using heavy Double Column CNCs and wire EDM. Proven durability exceeding 1,000,000 strokes in Tier-1 automotive press plants (Astra Daihatsu, Yamaha, Suzuki, and Kramayuda).',
        capacityOrTonnage: 'Tonnage Rating 110T – 250T Press',
        processType: 'Progressive Stamping, Blanking, Piercing, Bending & Drawing',
        suitableFor: 'Mass production of automotive chassis brackets, seat hinges, motorcycle frame gussets, and motor laminations.',
        keyFeatures: [
          'Compatible with mechanical press lines from 110T up to 250T',
          'Die inserts crafted from premium tool steels (SKD11, DC53, Tungsten Carbide)',
          'KALLER / DADCO heavy nitrogen gas spring cylinders for consistent stripping force',
          'Integrated misfeed detection sensors and Poka-Yoke pilot guide pins',
          'In-house die tryout on 250T Shieh Yieh & Amada presses before customer delivery',
        ],
        specs: [
          { label: 'Die Dimension Capacity', value: 'Up to 3,000 mm x 1,800 mm x 900 mm', highlight: true },
          { label: 'Punch & Die Material', value: 'Bohler K110 / SKD11 / DC53 / Tungsten Carbide', highlight: true },
          { label: 'Sheet Thickness Range', value: '0.4 mm up to 6.0 mm (SPCC, SPHC, High-Tensile)', highlight: true },
          { label: 'Expected Tool Life', value: 'Over 1,000,000 strokes (with scheduled maintenance)', highlight: false },
          { label: 'Die Cushion Support', value: 'Hydraulic Cushion & Heavy Nitrogen Springs', highlight: false },
        ],
      };

    case 'precision-injection-moulds':
      return {
        ...machine,
        name: 'Precision Plastic Injection Moulds & Die Cast Tooling',
        categoryName: 'Dies & Moulds Heavy Duty',
        shortDesc: 'High-precision injection moulds and aluminum die-casting tools with mirror-finish EDM cavity polishing and hot-runner systems.',
        detailedDesc: 'Manufactured for engineering polymers and automotive under-hood components. Features optimized conformal cooling channels for shorter cycle times and zero shrinkage defects.',
        capacityOrTonnage: 'Mould Base up to 1,200 x 800 mm',
        processType: 'Plastic Injection Moulding & High-Pressure Die Casting',
        suitableFor: 'Production of automotive connector housings, sensor casings, pharmaceutical caps, and medical device enclosures.',
        keyFeatures: [
          'Core and cavity steels: NAK80, SKD61, and stainless STAVAX ESR',
          'High-speed CNC mirror-finish contouring and sub-micron Sodick EDM',
          'Balanced hot-runner system with individual zone temperature control',
          'Nitride-treated ejector pins and beryllium copper cooling inserts',
          'Complete mould tryout samples with 3D CMM dimensional verification',
        ],
        specs: [
          { label: 'Cavity Steel Grade', value: 'STAVAX ESR / NAK80 Pre-Hardened & SKD61', highlight: true },
          { label: 'Machining Tolerance', value: '±0.005 mm (Sub-Micron EDM finishing)', highlight: true },
          { label: 'Hot Runner System', value: 'YUDO / Mold-Masters Valve Gate System', highlight: false },
          { label: 'Cooling Design', value: 'Deep hole drilled baffle & conformal circuits', highlight: false },
          { label: 'Core Hardness', value: 'HRC 48 - 52 (Vacuum Quenched & Tempered)', highlight: false },
        ],
      };

    case 'stamping-press-mass-line':
      return {
        ...machine,
        name: '250T Press Stamping Line for Automotive Components',
        categoryName: 'Parts Mass Production',
        shortDesc: 'Automated stamping mass production line with Shieh Yieh 250T, Amada 200T, uncoiler feeder, straightener, and continuous quality control.',
        detailedDesc: 'Operating 2 shifts daily to deliver Tier-1 automotive stamping parts. Supported by in-house tool room maintenance, quick die change (QDC), and in-line dimensional inspection.',
        capacityOrTonnage: 'Shieh Yieh 250T & Amada 200T Mechanical Press',
        processType: 'Sheet Metal Stamping, Blanking, Deep Drawing, Secondary Bending',
        suitableFor: 'Mass manufacturing of engine mounting plates, seat recliner plates, muffler flanges, and structural brackets.',
        keyFeatures: [
          'High-rigidity double crank mechanical press lines (250T, 200T, 150T, 110T)',
          'Automated coil uncoiler, straightener, and precision servo roll feeder',
          'Quick Die Change (QDC) system minimizing setup downtime to under 20 minutes',
          'Certified ISO 9001:2015 quality assurance with statistical process control (SPC)',
          'In-house die maintenance workshop providing zero production stoppage',
        ],
        specs: [
          { label: 'Max Press Tonnage', value: '250 Ton (Double Crank) & 200 Ton Amada', highlight: true },
          { label: 'Bolster Bed Size', value: '2,500 x 1,200 mm Bolster Area', highlight: true },
          { label: 'Monthly Output Capacity', value: 'Over 250,000 parts per month', highlight: true },
          { label: 'Material Handling', value: 'Coil Width up to 600 mm, Thickness up to 4.5 mm', highlight: false },
          { label: 'Quality Control', value: '100% In-Line Gauging + Hourly CMM Audit', highlight: true },
        ],
      };

    case 'multi-axis-mass-machining':
      return {
        ...machine,
        name: 'High-Speed Multi-Axis CNC Mass Production Cell',
        categoryName: 'Parts Mass Production',
        shortDesc: 'Fleet of 7 CNC Lathes with 4th-axis rotary tables and CNC Machining Centers for high-volume automotive shafts, bushings, and spacers.',
        detailedDesc: 'High-accuracy continuous turning and milling of precision steel, brass, and aluminum parts. Certified zero-defect supply to Astra Honda Motor, NSK, and Yamaha Indonesia.',
        capacityOrTonnage: 'Chuck 8"–10" / Travel 1,160 x 600 mm',
        processType: '4-Axis CNC Turning, Milling, Drilling & Tapping',
        suitableFor: 'High-precision manufacturing of transmission shafts, bearing sleeves, precision bushings, and aerospace hydraulic fittings.',
        keyFeatures: [
          '7 units of 4-axis CNC lathes with 8"-10" power chucks and live tooling',
          'Automated bar feeder integration for 24/7 lights-out mass machining',
          'In-line pneumatic diameter gauging with real-time tool wear offset',
          'Rigid tapping and multi-face milling in a single setup',
          'Surface finish capability up to Ra 0.4 µm with ultra-precision inserts',
        ],
        specs: [
          { label: 'Machining Precision', value: 'OD/ID Tolerance ±0.005 mm (5 Microns)', highlight: true },
          { label: 'Max Turning Diameter', value: 'Dia. 320 mm x Length 600 mm', highlight: true },
          { label: 'Spindle Speed', value: 'Up to 5,000 RPM (High-Torque Ceramic Bearings)', highlight: false },
          { label: 'Repeatability', value: '±0.002 mm (Sub-Micron Precision)', highlight: true },
          { label: 'Monthly Machining Output', value: '80,000+ precision components', highlight: false },
        ],
      };

    case 'double-column-cnc-3000':
      return {
        ...machine,
        name: 'Heavy-Duty CNC Double Column Machining Centre (3,000 mm)',
        categoryName: 'Facility Machine Tools',
        shortDesc: 'Flagship Double Column CNC machining center with 3,000 x 2,000 x 1,000 mm envelope for massive stamping die bases and machinery frames.',
        detailedDesc: 'Heavy-duty bridge structure engineered for high-rigidity roughing and precision finishing of massive workpieces up to 10 tons. Located directly under dual 10-Ton overhead cranes in MM2100 Cibitung.',
        capacityOrTonnage: 'Table Load Capacity 10 Ton / 3.000 x 2.000 mm',
        processType: 'Heavy Double Column Machining, Face Milling, Boring & Profiling',
        suitableFor: 'Machining large progressive die shoes, machine frames, welding fixture bases, and heavy structural castings.',
        keyFeatures: [
          'Massive working envelope: X=3,000 mm, Y=2,000 mm, Z=1,000 mm',
          'High-torque geared spindle delivering massive chip removal on tough tool steels',
          'Rigid cast Meehanite bridge structure eliminating flex under extreme cuts',
          'Direct optical linear scale feedback ensuring high positioning repeatability',
          'Dedicated dual 10-Ton overhead crane for fast and safe workpiece setup',
        ],
        specs: [
          { label: 'Working Travel (X x Y x Z)', value: '3,000 x 2,000 x 1,000 mm', highlight: true },
          { label: 'Positioning Accuracy', value: '±0.01 mm over full 3-meter travel', highlight: true },
          { label: 'Spindle Taper', value: 'BT50 / 6,000 RPM High Torque Spindle', highlight: false },
          { label: 'Table Size & Load', value: '3,200 x 1,800 mm | Max Load 10,000 kg', highlight: true },
          { label: 'Linear Scale Feedback', value: 'Heidenhain Optical Absolute Encoders', highlight: false },
        ],
      };

    case 'cmm-metrology-inspection-fleet':
      return {
        ...machine,
        name: '3D CMM & 6-Axis Portable Metrology Inspection',
        categoryName: 'Facility Machine Tools',
        shortDesc: 'Precision metrology lab featuring 3D Bridge CMM (750x500x500 mm) and 2 units of 6-Axis Portable Arms (R2500) for certified quality verification.',
        detailedDesc: 'Guarantees that every stamping die, checking fixture, and mass-machined component strictly satisfies customer GD&T blueprints. Accompanied by official digital calibration inspection certificates.',
        capacityOrTonnage: 'Measuring Envelope R2,500 mm / 750x500x500 mm',
        processType: 'Coordinate Measuring, 3D Laser Scanning & Reverse Engineering',
        suitableFor: 'Final inspection of checking fixtures, die tryout panels, and dimension verification of mission-critical automotive parts.',
        keyFeatures: [
          '1 Unit Bridge CMM 750 x 500 x 500 mm in temperature-controlled cleanroom',
          '2 Units 6-Axis Portable Arm R2500 for on-the-spot shopfloor inspection',
          'Comprehensive GD&T verification (flatness, perpendicularity, cylindricity, contour)',
          'Official measurement inspection certificate generated for every tooling project',
          'Renishaw touch trigger probes delivering sub-micron repeatability',
        ],
        specs: [
          { label: 'Probe Resolution', value: '0.0001 mm (0.1 Micron)', highlight: true },
          { label: 'Arm Reach Radius', value: 'R2,500 mm (6-Axis Articulated)', highlight: true },
          { label: 'Calibration Standard', value: 'ISO 9001:2015 / IDCAB Accredited Calibration', highlight: true },
          { label: 'Metrology Software', value: '3D CAD-to-Part Direct Comparison Software', highlight: false },
        ],
      };

    default:
      return machine;
  }
};
