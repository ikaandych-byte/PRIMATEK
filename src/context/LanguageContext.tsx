import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'id';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    catalog: string;
    facilities: string;
    about: string;
    rfq: string;
    rfqShort: string;
    callOffice: string;
    menu: string;
    closeMenu: string;
  };

  // Hero Section
  hero: {
    isoBadge: string;
    locationBadge: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    subheadline: string;
    subheadlinePrefix: string;
    rfqCta: string;
    catalogCta: string;
    videoBgLabel: string;
    experienceYears: string;
    experienceSub: string;
    isoVerified: string;
    statPressTonnage: string;
    statDoubleColumn: string;
    statPersonnel: string;
    tagOperational: string;
    tagIso: string;
    tagLandArea: string;
    cardRfqShortcut: string;
    featuredClients: string;
    clientsSubtitle: string;
    exportNote: string;
    partnersNote: string;
    categoryAccess: string;
  };

  // Home Page
  home: {
    pillarsBadge: string;
    pillarsTitle: string;
    pillarsDesc: string;
    viewFullCatalog: string;
    viewMachineSpecs: string;
    requestEstimate: string;
    facilityTeaserBadge: string;
    facilityTeaserTitle: string;
    facilityTeaserDesc: string;
    buildingAreaLabel: string;
    doubleColumnStrokeLabel: string;
    certificationLabel: string;
    openFacilitiesPage: string;
    aboutAndContact: string;
    ctaBadge: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaRfqBtn: string;
    ctaCallBtn: string;
  };

  // Catalog Section & Page
  catalog: {
    badge: string;
    title: string;
    desc: string;
    searchPlaceholder: string;
    allCategories: string;
    filterProcess: string;
    filterTonnage: string;
    viewGrid: string;
    viewTable: string;
    resetFilters: string;
    showingResults: string;
    totalMachines: string;
    unitReady: string;
    compareBtn: string;
    addToRfq: string;
    inRfq: string;
    viewDetail: string;
    compareTitle: string;
    clearCompare: string;
    startCompare: string;
    noResultsTitle: string;
    noResultsDesc: string;
    tableThImage: string;
    tableThName: string;
    tableThCategory: string;
    tableThCapacity: string;
    tableThDimension: string;
    tableThAccuracy: string;
    tableThAction: string;
  };

  // Facilities Page & Section
  facilities: {
    badge: string;
    title: string;
    desc: string;
    totalUnitsReady: string;
    totalArea: string;
    handlingCapacity: string;
    searchEquipment: string;
    filterAll: string;
    workflowBadge: string;
    workflowTitle: string;
    workflowDesc: string;
    tableThMachine: string;
    tableThBrandOrigin: string;
    tableThQty: string;
    tableThSpec: string;
    tableThApplication: string;
    downloadCatalog: string;
    contactFacility: string;
  };

  // About Page
  about: {
    breadcrumbHome: string;
    breadcrumbAbout: string;
    heroBadge: string;
    heroTitle: string;
    heroDesc: string;
    quickStatsBadge: string;
    statEstablished: string;
    statArea: string;
    statWorkforce: string;
    statIsoCert: string;
    storyBadge: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    milestonesTitle: string;
    milestonesSubtitle: string;
    visionTitle: string;
    visionDesc: string;
    missionTitle: string;
    missionDesc: string;
    contactBadge: string;
    contactTitle: string;
    contactDesc: string;
    officeAddress: string;
    operatingHours: string;
    operatingHoursVal: string;
    googleMapsBtn: string;
    whatsappDirectBtn: string;
  };

  // RFQ Form & Modal
  rfq: {
    modalTitle: string;
    modalSubtitle: string;
    tabForm: string;
    tabPreview: string;
    selectedItemsBadge: string;
    noItemsSelected: string;
    addFromCatalogHint: string;
    fieldCompany: string;
    fieldCompanyPlaceholder: string;
    fieldPic: string;
    fieldPicPlaceholder: string;
    fieldEmail: string;
    fieldEmailPlaceholder: string;
    fieldPhone: string;
    fieldPhonePlaceholder: string;
    fieldIndustry: string;
    fieldMaterial: string;
    fieldMaterialPlaceholder: string;
    fieldTolerance: string;
    fieldTimeline: string;
    fieldVolume: string;
    fieldDrawingLink: string;
    fieldDrawingHint: string;
    fieldNotes: string;
    fieldNotesPlaceholder: string;
    submitBtn: string;
    sendViaWaBtn: string;
    successTitle: string;
    successDesc: string;
    refNumberLabel: string;
    printSummary: string;
    backToCatalog: string;
  };

  // Machine Detail & Compare Modals
  modal: {
    machineId: string;
    close: string;
    directQuote: string;
    printSpec: string;
    sendWaInquiry: string;
    processType: string;
    capacityTonnage: string;
    accuracyTolerance: string;
    workingEnvelope: string;
    suitableFor: string;
    keyFeatures: string;
    technicalSpecs: string;
    applications: string;
    compareTitle: string;
    compareSubtitle: string;
    specMetric: string;
    removeCompare: string;
  };

  // Footer
  footer: {
    brandTagline: string;
    colCatalogTitle: string;
    colCompanyTitle: string;
    colLegalTitle: string;
    copyright: string;
    backToTop: string;
    officialWebsite: string;
  };

  // Language & Theme switcher tooltips
  ui: {
    langSwitchLabel: string;
    themeSwitchLabel: string;
    darkActive: string;
    lightActive: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      catalog: 'Machinery Catalog',
      facilities: 'Plant & Facilities',
      about: 'About Us',
      rfq: 'Request Quotation (RFQ)',
      rfqShort: 'RFQ',
      callOffice: '(021) 8980378',
      menu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      isoBadge: 'ISO 9001:2015 CERTIFIED',
      locationBadge: 'MM2100 CIBITUNG',
      headlinePart1: 'Industrial Precision Machinery & ',
      headlineHighlight: 'Robotic Automation Systems',
      headlinePart2: 'For Global Manufacturing',
      subheadlinePrefix: 'A premier engineering and manufacturing partner in MM2100 Industrial Estate since 1999.',
      subheadline: 'Delivering end-to-end turnkey solutions: Customized Machines, Precision Jig & Fixture, Heavy-Duty Stamping Dies & Moulds, through to High-Volume Stamping & CNC Machining mass production.',
      rfqCta: 'Request a Quotation (RFQ)',
      catalogCta: 'Explore Machine Catalog',
      videoBgLabel: 'Live Footage:',
      experienceYears: '25+ Years of Excellence',
      experienceSub: 'MM2100 Industrial Estate, Cibitung, Bekasi',
      isoVerified: '100% Audited & Verified',
      statPressTonnage: 'Press Tonnage',
      statDoubleColumn: 'Double Column',
      statPersonnel: 'Specialists',
      tagOperational: 'MM2100 OPERATIONAL',
      tagIso: 'CERTIFIED ISO 9001:2015',
      tagLandArea: 'LAND 2,806 m²',
      cardRfqShortcut: 'Submit CAD Drawing & RFQ Specs',
      featuredClients: 'Featured Clients & Partners',
      clientsSubtitle: 'Automotive · Robotics',
      exportNote: 'Exports: JP · MY · PH · TH',
      partnersNote: 'Partners: Epson · Yaskawa · Hiwin',
      categoryAccess: 'Quick Categories:',
    },
    home: {
      pillarsBadge: 'Integrated Manufacturing Solutions',
      pillarsTitle: '4 Core Pillars of Engineering & Tooling Capabilities',
      pillarsDesc: 'From 3D CAD/CAM research, machining simulations, precision assembly, to complete factory tryouts at our self-owned plant in MM2100 Industrial Estate Cibitung.',
      viewFullCatalog: 'Explore Complete Catalog',
      viewMachineSpecs: 'View Technical Specifications',
      requestEstimate: 'Request Estimate',
      facilityTeaserBadge: 'Integrated Facility Hub MM2100',
      facilityTeaserTitle: '2,806 m² Facility with 45+ Units of Precision & Heavy Double Column Machinery',
      facilityTeaserDesc: 'Strategically located in MM2100 Industrial Estate Cibitung, Bekasi. Equipped with dual 10-Ton overhead cranes, temperature-controlled CMM metrology cleanroom, and mechanical stamping presses from 110T to 250T.',
      buildingAreaLabel: 'Building Area',
      doubleColumnStrokeLabel: 'Double Column Stroke',
      certificationLabel: 'Quality Standard',
      openFacilitiesPage: 'Explore Plant & Facilities',
      aboutAndContact: 'Company Profile & Contact',
      ctaBadge: 'Long-Term Strategic Partner',
      ctaTitle: 'Ready to Discuss Your Machinery or Request a Quotation?',
      ctaDesc: 'Send us your 2D/3D CAD drawings or discuss your assembly line automation challenges with our engineering specialists.',
      ctaRfqBtn: 'Open RFQ Submission Form',
      ctaCallBtn: 'Call Office: (021) 8980378',
    },
    catalog: {
      badge: 'Product Portfolio & Machinery Lineup',
      title: 'Industrial Machinery & Precision Tooling Catalog',
      desc: 'Browse our complete specifications for automation lines, jigs & fixtures, stamping dies, mass-produced automotive parts, and heavy workshop equipment.',
      searchPlaceholder: 'Search machine model, process type, or specifications...',
      allCategories: 'All Categories',
      filterProcess: 'Process Type',
      filterTonnage: 'Capacity / Tonnage',
      viewGrid: 'Grid View',
      viewTable: 'Table View',
      resetFilters: 'Reset Filter',
      showingResults: 'Showing',
      totalMachines: 'Machines & Systems Available',
      unitReady: 'Units In-House',
      compareBtn: 'Compare',
      addToRfq: 'Add to RFQ',
      inRfq: 'In RFQ List',
      viewDetail: 'View Details',
      compareTitle: 'Compare Machines',
      clearCompare: 'Clear Selection',
      startCompare: 'Compare Selected Items',
      noResultsTitle: 'No Matching Machines Found',
      noResultsDesc: 'Try adjusting your search keywords or reset filter criteria.',
      tableThImage: 'Image',
      tableThName: 'Machine Name & Model',
      tableThCategory: 'Category',
      tableThCapacity: 'Capacity / Tonnage',
      tableThDimension: 'Working Envelope',
      tableThAccuracy: 'Tolerance / Repeatability',
      tableThAction: 'Action',
    },
    facilities: {
      badge: 'Manufacturing Infrastructure & Resources',
      title: 'Production Plant Facilities & Metrology Quality Lab',
      desc: 'Our modern manufacturing facility in MM2100 Cibitung encompasses 2,806 m² of land (2,400 m² floor space), operating over 45 units of high-precision machine tools including 3-meter Double Column CNCs, 250T Stamping Presses, and 3D CMM metrology inspection.',
      totalUnitsReady: 'Primary Machine Units Ready',
      totalArea: 'Total Facility Area',
      handlingCapacity: 'Overhead Crane Capacity',
      searchEquipment: 'Search machinery, brand, or model...',
      filterAll: 'All Equipment',
      workflowBadge: 'Rigorous Quality Workflow',
      workflowTitle: '5-Stage Engineering & Manufacturing Process',
      workflowDesc: 'Ensuring zero-defect manufacturing from initial CAD simulation to final CMM verification.',
      tableThMachine: 'Machine Description',
      tableThBrandOrigin: 'Maker & Origin',
      tableThQty: 'Qty',
      tableThSpec: 'Technical Specifications',
      tableThApplication: 'Core Production Application',
      downloadCatalog: 'Download Catalog',
      contactFacility: 'Schedule a Factory Visit',
    },
    about: {
      breadcrumbHome: 'Home',
      breadcrumbAbout: 'About Us & MM2100 Contact',
      heroBadge: 'Corporate Profile & Proven Track Record',
      heroTitle: 'Pioneering Industrial Automation & Precision Engineering Since 1999',
      heroDesc: 'PT. PRIMA TEKNIK TRADA is a trusted Tier-1 partner for leading automotive, electronics, and pharmaceutical manufacturers across Indonesia and international export markets.',
      quickStatsBadge: 'Factory MM2100 Key Metrics',
      statEstablished: 'Established Year',
      statArea: 'Plant Land Area',
      statWorkforce: 'Engineers & Staff',
      statIsoCert: 'Quality Management',
      storyBadge: 'Our Journey',
      storyTitle: 'Quarter Century of Precision Engineering Excellence',
      storyP1: 'Founded in 1999 in Bekasi, PT. PRIMA TEKNIK TRADA originated as a specialized engineering workshop for customized machinery and mechanical tooling.',
      storyP2: 'Over 25 years of steady expansion led to our strategic relocation to Jababeka-1 and subsequently to our comprehensive, self-owned manufacturing complex in MM2100 Industrial Estate Cibitung.',
      storyP3: 'Today, backed by certified ISO 9001:2015 quality management and strategic technical integration with global robotics leaders including EPSON and YASKAWA, we deliver mission-critical solutions for high-precision manufacturing.',
      milestonesTitle: 'Milestones & Corporate Journey',
      milestonesSubtitle: 'Track record of sustained investment in machinery, technology, and engineering capacity.',
      visionTitle: 'Our Vision',
      visionDesc: 'To be the most reliable and innovative precision engineering partner in Southeast Asia, advancing industrial automation, dies & moulds, and zero-defect mass production.',
      missionTitle: 'Our Mission',
      missionDesc: 'Deliver superior accuracy, competitive lead times, and steadfast engineering support to help our clients achieve world-class production efficiency.',
      contactBadge: 'Get in Touch',
      contactTitle: 'Factory Location & Direct Contact',
      contactDesc: 'Visit our manufacturing plant in MM2100 Cibitung or consult with our engineering team for technical inquiries.',
      officeAddress: 'Head Office & Factory',
      operatingHours: 'Operating Hours',
      operatingHoursVal: 'Monday – Friday: 08:00 – 17:00 WIB',
      googleMapsBtn: 'Open in Google Maps',
      whatsappDirectBtn: 'Chat via WhatsApp',
    },
    rfq: {
      modalTitle: 'Request for Quotation (RFQ)',
      modalSubtitle: 'Submit your technical specifications or CAD drawings for accurate cost & lead time estimation.',
      tabForm: 'RFQ Form',
      tabPreview: 'Review & Send',
      selectedItemsBadge: 'Items in RFQ',
      noItemsSelected: 'No machines pre-selected. You can specify custom requirements below.',
      addFromCatalogHint: 'Tip: You can add specific machines directly from the Machinery Catalog.',
      fieldCompany: 'Company Name',
      fieldCompanyPlaceholder: 'e.g., PT. Astra Daihatsu Motor / PT. Example Corp',
      fieldPic: 'Contact Person (PIC)',
      fieldPicPlaceholder: 'Your full name and title',
      fieldEmail: 'Work Email',
      fieldEmailPlaceholder: 'pic.purchasing@company.com',
      fieldPhone: 'Telephone / WhatsApp',
      fieldPhonePlaceholder: '+62 812-xxxx-xxxx / 021-xxxx',
      fieldIndustry: 'Industry Sector',
      fieldMaterial: 'Workpiece Material',
      fieldMaterialPlaceholder: 'e.g., SKD11, SS400, S50C, SUS304, Aluminum 6061',
      fieldTolerance: 'Required Tolerance',
      fieldTimeline: 'Target Delivery Timeline',
      fieldVolume: 'Estimated Batch Volume',
      fieldDrawingLink: 'CAD Drawing Link (Google Drive / OneDrive / Dropbox)',
      fieldDrawingHint: 'Share viewable link or send files directly via email to primatech@centrin.net.id',
      fieldNotes: 'Project Details & Technical Scope',
      fieldNotesPlaceholder: 'Describe your required process, cycle time target, clamping mechanism, or specific tolerances...',
      submitBtn: 'Generate Official RFQ Document',
      sendViaWaBtn: 'Send via WhatsApp to Engineering PIC',
      successTitle: 'RFQ Form Generated Successfully',
      successDesc: 'Your request has been compiled into an official RFQ reference. You can now send it directly to our team via WhatsApp or email.',
      refNumberLabel: 'Reference Number',
      printSummary: 'Print Summary',
      backToCatalog: 'Continue Browsing Catalog',
    },
    modal: {
      machineId: 'MACHINE SPECIFICATION',
      close: 'Close',
      directQuote: 'Direct RFQ',
      printSpec: 'Print Spec Sheet',
      sendWaInquiry: 'Inquire via WhatsApp',
      processType: 'Process Type',
      capacityTonnage: 'Capacity / Tonnage',
      accuracyTolerance: 'Accuracy / Tolerance',
      workingEnvelope: 'Working Dimension / Travel',
      suitableFor: 'Target Applications',
      keyFeatures: 'Key Engineering Features',
      technicalSpecs: 'Technical Specifications Table',
      applications: 'Industry Applications',
      compareTitle: 'Compare Machinery Specifications',
      compareSubtitle: 'Side-by-side comparison of dimensions, capacity, and tolerance specs.',
      specMetric: 'Technical Metric',
      removeCompare: 'Remove',
    },
    footer: {
      brandTagline: 'Your reliable sourcing for Customized Machine & Automation System, Precision Parts, Jig & Fixture, Dies & Moulds, and Parts Mass Production. Operating in MM2100 Cibitung, Indonesia since 1999.',
      colCatalogTitle: 'Machinery & Solutions',
      colCompanyTitle: 'Company & Facility',
      colLegalTitle: 'Quality Standard',
      copyright: 'PT. PRIMA TEKNIK TRADA. All rights reserved.',
      backToTop: 'Back to Top',
      officialWebsite: 'Official Web: www.pttid.com',
    },
    ui: {
      langSwitchLabel: 'Switch language to Indonesian',
      themeSwitchLabel: 'Toggle dark / light mode',
      darkActive: 'Dark Mode (Active)',
      lightActive: 'Light Mode (Active)',
    },
  },
  id: {
    nav: {
      home: 'Beranda',
      catalog: 'Katalog Mesin',
      facilities: 'Fasilitas Pabrik',
      about: 'Tentang Kami',
      rfq: 'Minta Penawaran (RFQ)',
      rfqShort: 'RFQ',
      callOffice: '(021) 8980378',
      menu: 'Buka menu navigasi',
      closeMenu: 'Tutup menu navigasi',
    },
    hero: {
      isoBadge: 'SERTIFIKASI ISO 9001:2015',
      locationBadge: 'MM2100 CIBITUNG',
      headlinePart1: 'Presisi Mesin Industri & ',
      headlineHighlight: 'Sistem Otomasi Robotik',
      headlinePart2: 'Taraf Pabrikan Global',
      subheadlinePrefix: 'Mitra manufaktur rekayasa teknik terkemuka di Kawasan Industri MM2100 Cibitung sejak 1999.',
      subheadline: 'Menyediakan solusi terpadu Customized Machines, Jig & Fixture, Dies & Moulds, hingga Produksi Massal Stamping & Machining.',
      rfqCta: 'Minta Penawaran Harga (RFQ)',
      catalogCta: 'Lihat Katalog Produk & Mesin',
      videoBgLabel: 'Latar Video:',
      experienceYears: '25+ Tahun Berkarya',
      experienceSub: 'Pabrik MM2100 Cibitung, Bekasi',
      isoVerified: '100% Terverifikasi',
      statPressTonnage: 'Tonase Press',
      statDoubleColumn: 'Double Column',
      statPersonnel: 'Personil Ahli',
      tagOperational: 'MM2100 OPERASIONAL',
      tagIso: 'BERSERTIFIKAT ISO 9001:2015',
      tagLandArea: 'LAHAN 2.806 m²',
      cardRfqShortcut: 'Kirim Gambar Teknik & Permintaan Harga',
      featuredClients: 'Featured Clients & Partners',
      clientsSubtitle: 'Otomotif · Robotika',
      exportNote: 'Ekspor: JP · MY · PH · TH',
      partnersNote: 'Mitra: Epson · Yaskawa · Hiwin',
      categoryAccess: 'Akses Kategori:',
    },
    home: {
      pillarsBadge: 'Solusi Manufaktur Terintegrasi',
      pillarsTitle: '4 Pilar Kapabilitas Rekayasa Mesin & Tooling',
      pillarsDesc: 'Dari riset desain CAD/CAM 3D, simulasi permesinan, perakitan hingga try-out di pabrik sendiri di Kawasan Industri MM2100 Cibitung.',
      viewFullCatalog: 'Buka Katalog Lengkap',
      viewMachineSpecs: 'Lihat Spesifikasi Mesin',
      requestEstimate: 'Minta Estimasi',
      facilityTeaserBadge: 'Pusat Fasilitas Terintegrasi MM2100',
      facilityTeaserTitle: 'Lahan 2.806 m² dengan 45+ Unit Mesin Presisi & Heavy Double Column',
      facilityTeaserDesc: 'Terletak strategis di Kawasan Industri MM2100 Cibitung Bekasi. Dilengkapi kapasitas handling 10 Ton dengan Overhead Crane ganda, laboratorium metrologi CMM suhu konstan, serta deretan mesin Stamping Press mekanik 110T hingga 250T.',
      buildingAreaLabel: 'Luas Bangunan',
      doubleColumnStrokeLabel: 'Stroke Double Column',
      certificationLabel: 'Sertifikasi Mutu',
      openFacilitiesPage: 'Buka Halaman Fasilitas Pabrik',
      aboutAndContact: 'Tentang Perusahaan & Kontak',
      ctaBadge: 'Kemitraan Jangka Panjang',
      ctaTitle: 'Butuh Penawaran Harga atau Konsultasi Spesifikasi Mesin?',
      ctaDesc: 'Kirimkan rancangan gambar kerja (2D/3D CAD) atau diskusikan kebutuhan otomatisasi lini produksi pabrik Anda bersama tim teknisi kami.',
      ctaRfqBtn: 'Isi Formulir Penawaran (RFQ)',
      ctaCallBtn: 'Hubungi Kantor: (021) 8980378',
    },
    catalog: {
      badge: 'Portofolio Mesin & Peralatan Presisi',
      title: 'Katalog Mesin Industri & Precision Tooling',
      desc: 'Spesifikasi lengkap lini otomasi, jig & fixture, stamping dies, mass production suku cadang otomotif, hingga armada mesin pabrik MM2100.',
      searchPlaceholder: 'Cari tipe mesin, proses pengerjaan, atau nomor model...',
      allCategories: 'Semua Kategori',
      filterProcess: 'Tipe Proses Pengerjaan',
      filterTonnage: 'Kapasitas / Tonase',
      viewGrid: 'Tampilan Grid',
      viewTable: 'Tampilan Tabel',
      resetFilters: 'Reset Filter',
      showingResults: 'Menampilkan',
      totalMachines: 'Mesin & Sistem Tersedia',
      unitReady: 'Unit In-House',
      compareBtn: 'Bandingkan',
      addToRfq: 'Tambah ke RFQ',
      inRfq: 'Dalam Daftar RFQ',
      viewDetail: 'Lihat Detail',
      compareTitle: 'Komparasi Mesin',
      clearCompare: 'Hapus Pilihan',
      startCompare: 'Bandingkan Mesin Terpilih',
      noResultsTitle: 'Tidak Ada Mesin yang Cocok',
      noResultsDesc: 'Silakan sesuaikan kata kunci pencarian atau reset filter kategori.',
      tableThImage: 'Foto',
      tableThName: 'Nama Mesin & Model',
      tableThCategory: 'Kategori',
      tableThCapacity: 'Kapasitas / Tonase',
      tableThDimension: 'Dimensi Kerja / Travel',
      tableThAccuracy: 'Toleransi & Akurasi',
      tableThAction: 'Aksi',
    },
    facilities: {
      badge: 'Sumber Daya & Fasilitas Manufaktur',
      title: 'Fasilitas Mesin Produksi & Laboratorium Metrologi',
      desc: 'Pabrik kami di Kawasan Industri MM2100 Cibitung berdiri di atas lahan 2.806 m² (bangunan 2.400 m²), dilengkapi total 45+ unit mesin presisi tinggi: mulai dari CNC Double Column ukuran 3 meter, jajaran mechanical press hingga 250 ton, dan mesin ukur CMM 3D.',
      totalUnitsReady: 'Total Mesin Utama Siap Operasi',
      totalArea: 'Total Luas Fasilitas',
      handlingCapacity: 'Kapasitas Angkat Overhead Crane',
      searchEquipment: 'Cari nama mesin, merk, atau spesifikasi...',
      filterAll: 'Semua Mesin Pabrik',
      workflowBadge: 'Standar Mutu Terpadu',
      workflowTitle: '5 Tahapan Alur Rekayasa Manufaktur',
      workflowDesc: 'Memastikan zero defect dari perancangan simulasi 3D hingga pengujian akhir dengan CMM terkalibrasi.',
      tableThMachine: 'Deskripsi Mesin',
      tableThBrandOrigin: 'Brand / Asal Negara',
      tableThQty: 'Jml',
      tableThSpec: 'Spesifikasi Teknis',
      tableThApplication: 'Aplikasi Produksi Utama',
      downloadCatalog: 'Unduh Brosur',
      contactFacility: 'Jadwalkan Kunjungan Pabrik',
    },
    about: {
      breadcrumbHome: 'Beranda',
      breadcrumbAbout: 'Tentang Kami & Kontak MM2100',
      heroBadge: 'Profil Perusahaan & Rekam Jejak',
      heroTitle: 'Pelopor Rekayasa Presisi & Otomasi Mesin Industri Sejak 1999',
      heroDesc: 'PT. PRIMA TEKNIK TRADA adalah mitra Tier-1 terpercaya bagi industri manufaktur otomotif, elektronika, dan farmasi di Indonesia serta pasar ekspor internasional.',
      quickStatsBadge: 'Data Fasilitas MM2100',
      statEstablished: 'Tahun Berdiri',
      statArea: 'Luas Lahan Pabrik',
      statWorkforce: 'Karyawan & Ahli',
      statIsoCert: 'Manajemen Mutu',
      storyBadge: 'Perjalanan Kami',
      storyTitle: 'Seperempat Abad Menjaga Mutu & Presisi',
      storyP1: 'Didirikan pada tahun 1999 di Bekasi, PT. PRIMA TEKNIK TRADA berawal dari workshop rekayasa teknik khusus untuk customized machine dan perkakas mekanik.',
      storyP2: 'Melalui dedikasi selama lebih dari 25 tahun, perusahaan terus berekspansi ke Jababeka-1 dan kini mengoperasikan fasilitas pabrik terpadu milik sendiri di Kawasan Industri MM2100 Cibitung.',
      storyP3: 'Didukung sertifikasi sistem mutu ISO 9001:2015 serta kemitraan teknis resmi sebagai System Integrator EPSON dan YASKAWA Robot, kami senantiasa siap melayani kebutuhan industri manufaktur berpresisi tinggi.',
      milestonesTitle: 'Milestone & Sejarah Perusahaan',
      milestonesSubtitle: 'Rekam jejak investasi berkesinambungan pada teknologi permesinan dan sumber daya manusia.',
      visionTitle: 'Visi Perusahaan',
      visionDesc: 'Menjadi mitra rekayasa presisi paling andal dan inovatif di Asia Tenggara dalam penyediaan sistem otomasi industri, tooling dies & moulds, dan mass production berstandar zero defect.',
      missionTitle: 'Misi Perusahaan',
      missionDesc: 'Memberikan akurasi terbaik, ketepatan waktu pengiriman (lead time), serta dukungan rekayasa berkelanjutan guna meningkatkan efisiensi dan daya saing produksi mitra kami.',
      contactBadge: 'Hubungi Kami',
      contactTitle: 'Lokasi Pabrik & Kontak Langsung',
      contactDesc: 'Kunjungi fasilitas pabrik kami di Kawasan Industri MM2100 Cibitung atau hubungi tim teknis kami untuk konsultasi proyek.',
      officeAddress: 'Kantor & Pabrik Utama',
      operatingHours: 'Jam Operasional',
      operatingHoursVal: 'Senin – Jumat: 08:00 – 17:00 WIB',
      googleMapsBtn: 'Buka di Google Maps',
      whatsappDirectBtn: 'Hubungi via WhatsApp',
    },
    rfq: {
      modalTitle: 'Permintaan Penawaran Harga (RFQ)',
      modalSubtitle: 'Kirimkan rincian spesifikasi teknis atau gambar CAD untuk mendapatkan estimasi biaya dan jadwal pengerjaan yang akurat.',
      tabForm: 'Formulir RFQ',
      tabPreview: 'Cek & Kirim',
      selectedItemsBadge: 'Item Dipilih',
      noItemsSelected: 'Belum ada mesin yang dipilih dari katalog. Anda tetap dapat memasukkan kebutuhan kustom di bawah.',
      addFromCatalogHint: 'Tip: Anda bisa memilih dan menambahkan mesin spesifik langsung dari halaman Katalog.',
      fieldCompany: 'Nama Perusahaan / Organisasi',
      fieldCompanyPlaceholder: 'Contoh: PT. Astra Daihatsu Motor / PT. Klien Manufaktur',
      fieldPic: 'Nama Penanggung Jawab (PIC)',
      fieldPicPlaceholder: 'Nama lengkap dan jabatan Anda',
      fieldEmail: 'Email Kantor / Resmi',
      fieldEmailPlaceholder: 'pic.purchasing@perusahaan.co.id',
      fieldPhone: 'Nomor Telepon / WhatsApp',
      fieldPhonePlaceholder: '+62 812-xxxx-xxxx / 021-xxxx',
      fieldIndustry: 'Sektor Industri',
      fieldMaterial: 'Spesifikasi Material Produk',
      fieldMaterialPlaceholder: 'Contoh: SKD11, SS400, S50C, SUS304, Aluminium 6061',
      fieldTolerance: 'Toleransi Akurasi yang Dibutuhkan',
      fieldTimeline: 'Target Waktu Penyelesaian',
      fieldVolume: 'Estimasi Volume Batch',
      fieldDrawingLink: 'Link File Gambar CAD (Google Drive / OneDrive / Dropbox)',
      fieldDrawingHint: 'Pastikan link dapat diakses atau kirim file langsung via email ke primatech@centrin.net.id',
      fieldNotes: 'Rincian Kebutuhan & Catatan Teknis',
      fieldNotesPlaceholder: 'Jelaskan proses kerja, target cycle time, mekanisme pencekaman, atau toleransi kritis yang diinginkan...',
      submitBtn: 'Buat Dokumen RFQ Resmi',
      sendViaWaBtn: 'Kirim via WhatsApp ke Tim Engineering',
      successTitle: 'Dokumen RFQ Siap Diteruskan',
      successDesc: 'Data penawaran Anda telah tersusun lengkap dengan nomor referensi unik. Silakan kirimkan langsung ke tim teknis kami melalui WhatsApp atau email.',
      refNumberLabel: 'Nomor Referensi RFQ',
      printSummary: 'Cetak Ringkasan',
      backToCatalog: 'Lanjut Lihat Katalog',
    },
    modal: {
      machineId: 'SPESIFIKASI MESIN',
      close: 'Tutup',
      directQuote: 'Minta RFQ Mesin Ini',
      printSpec: 'Cetak Lembar Spesifikasi',
      sendWaInquiry: 'Tanya via WhatsApp',
      processType: 'Tipe Proses',
      capacityTonnage: 'Kapasitas / Tonase',
      accuracyTolerance: 'Akurasi & Toleransi',
      workingEnvelope: 'Dimensi Kerja / Travel',
      suitableFor: 'Aplikasi yang Sesuai',
      keyFeatures: 'Fitur Utama Rekayasa',
      technicalSpecs: 'Tabel Spesifikasi Teknis',
      applications: 'Penerapan di Industri',
      compareTitle: 'Perbandingan Spesifikasi Mesin',
      compareSubtitle: 'Bandingkan dimensi, kapasitas, dan toleransi mesin secara berdampingan.',
      specMetric: 'Parameter Spesifikasi',
      removeCompare: 'Hapus',
    },
    footer: {
      brandTagline: 'Mitra terpercaya untuk Customized Machine & Automation System, Precision Parts, Jig & Fixture, Dies & Moulds, dan Parts Mass Production. Beroperasi sejak 1999 di MM2100 Cibitung, Indonesia.',
      colCatalogTitle: 'Katalog & Solusi',
      colCompanyTitle: 'Perusahaan & Pabrik',
      colLegalTitle: 'Standarisasi Mutu',
      copyright: 'PT. PRIMA TEKNIK TRADA. Hak Cipta Dilindungi Undang-Undang.',
      backToTop: 'Kembali ke Atas',
      officialWebsite: 'Situs Resmi: www.pttid.com / www.pttid.com',
    },
    ui: {
      langSwitchLabel: 'Ganti bahasa ke Bahasa Inggris',
      themeSwitchLabel: 'Ganti mode tema gelap / terang',
      darkActive: 'Mode Gelap (Aktif)',
      lightActive: 'Mode Terang (Aktif)',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('ptt_language') as Language | null;
      if (savedLang === 'en' || savedLang === 'id') {
        return savedLang;
      }
    }
    return 'en'; // Default primary language English as requested
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    localStorage.setItem('ptt_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
