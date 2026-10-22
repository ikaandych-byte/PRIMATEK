import React, { useState, useEffect } from 'react';
import {
  FileText,
  Send,
  MessageSquare,
  Trash2,
  Plus,
  CheckCircle,
  Building,
  User,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { RfqItem, MachineItem } from '../types';
import { COMPANY_INFO } from '../data/company';
import { MACHINES_DATA } from '../data/machines';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getLocalizedMachine } from '../utils/localizedData';
import { supabase } from '../lib/supabase';

interface RfqFormProps {
  rfqItems: RfqItem[];
  onRemoveItem: (machineId: string) => void;
  onUpdateQuantity: (machineId: string, delta: number) => void;
  onAddQuickItem: (machine: MachineItem) => void;
}

export const RfqForm: React.FC<RfqFormProps> = ({
  rfqItems,
  onRemoveItem,
  onUpdateQuantity,
  onAddQuickItem,
}) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    companyName: user?.company || '',
    picName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    industry: user?.sector || 'Automotive OEM 2W / 4W',
    material: 'SPCC / Mild Steel',
    tolerance: '±0.01 mm',
    targetTimeline: '1-2 Months',
    estimatedQty: '100 - 1,000 pcs',
    drawingLink: '',
    notes: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        companyName: prev.companyName || user.company,
        picName: prev.picName || user.name,
        email: prev.email || user.email,
        phone: prev.phone || user.phone,
        industry: prev.industry === 'Automotive OEM 2W / 4W' && user.sector ? user.sector : prev.industry,
      }));
    }
  }, [user]);

  const [submitted, setSubmitted] = useState(false);
  const [rfqRefNumber, setRfqRefNumber] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbSaved, setDbSaved] = useState<boolean | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateRfqRef = () => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `PTT-RFQ-${new Date().getFullYear()}-${rand}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ref = rfqRefNumber || generateRfqRef();
    setRfqRefNumber(ref);

    try {
      // Simpan isian form RFQ ke tabel Supabase public.rfq_submissions
      const { data, error } = await supabase.from('rfq_submissions').insert([
        {
          rfq_number: ref,
          company_name: formData.companyName,
          pic_name: formData.picName,
          email: formData.email,
          phone: formData.phone,
          industry: formData.industry,
          material: formData.material,
          tolerance: formData.tolerance,
          target_timeline: formData.targetTimeline,
          estimated_qty: formData.estimatedQty,
          drawing_link: formData.drawingLink || null,
          notes: formData.notes || null,
          items: rfqItems,
          status: 'pending',
          source: 'web_portal',
        },
      ]);

      if (error) {
        console.warn('Supabase RFQ insert notice:', error.message);
        setDbSaved(false);
        setDbError(error.message);
      } else {
        setDbSaved(true);
        setDbError(null);
      }
    } catch (err: any) {
      console.warn('Network or DB error saving RFQ:', err);
      setDbSaved(false);
      setDbError(err?.message || 'Gagal menyimpan ke database cloud');
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setActiveTab('preview');
    }
  };

  const handlePrintDocument = () => {
    window.print();
  };

  const handleCopyRef = () => {
    if (rfqRefNumber) {
      navigator.clipboard.writeText(rfqRefNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleDownloadSummary = () => {
    const dateStr = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID');
    const itemsText =
      rfqItems.length > 0
        ? rfqItems.map((i, idx) => `${idx + 1}. ${i.machineName} | Kategori: ${i.categoryName} | Qty: ${i.quantity} Unit`).join('\n')
        : '- Diskusi Custom Machine / SPM / Dies Tooling Baru';

    const content = `========================================================================
PT. PRIMA TEKNIK TRADA - MANUFACTURING & AUTOMATION
MM2100 Industrial Estate Cibitung, Bekasi | ISO 9001:2015 Registered
Tel: ${COMPANY_INFO.phoneDisplay} | Email: ${COMPANY_INFO.emailPrimary} | Web: www.pttid.com
========================================================================

OFFICIAL REQUEST FOR QUOTATION (RFQ) INQUIRY SLIP
No. Referensi RFQ : ${rfqRefNumber || 'PTT-RFQ-2026-DRAFT'}
Tanggal Dokumen   : ${dateStr}
Status Sistem     : ${dbSaved ? 'TERCATAT RESMI DI DATABASE PTT' : 'DRAF RESMI DITERBITKAN'}

------------------------------------------------------------------------
I. DATA KLIEN / PEMOHON
------------------------------------------------------------------------
Nama Perusahaan   : ${formData.companyName || '-'}
Nama PIC          : ${formData.picName || '-'}
Alamat Email      : ${formData.email || '-'}
Nomor Telp / WA   : ${formData.phone || '-'}
Sektor Industri   : ${formData.industry}

------------------------------------------------------------------------
II. PARAMETER TEKNIK & SPESIFIKASI MANUFAKTUR
------------------------------------------------------------------------
Material Benda    : ${formData.material}
Target Toleransi  : ${formData.tolerance}
Estimasi Volume   : ${formData.estimatedQty}
Target Timeline   : ${formData.targetTimeline}
Link Drawing CAD  : ${formData.drawingLink || 'Akan dikirim terpisah via email/cloud'}

------------------------------------------------------------------------
III. DAFTAR MESIN / ITEM PRODUKSI YANG DIMINTA
------------------------------------------------------------------------
${itemsText}

------------------------------------------------------------------------
IV. CATATAN TEKNIK TAMBAHAN
------------------------------------------------------------------------
${formData.notes || 'Mohon informasi estimasi penawaran harga resmi (Quotation Sheet) dan jadwal pengerjaan.'}

------------------------------------------------------------------------
V. PENGESAHAN DOKUMEN & VERIFIKASI
------------------------------------------------------------------------
Dokumen ini dibuat secara resmi melalui Portal Sistem PT. Prima Teknik Trada.
Tim Engineering & Estimasi akan meninjau kelayakan teknis drawing serta
menerbitkan surat penawaran harga (Formal Quotation) dalam 1 x 24 jam kerja.
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${rfqRefNumber || 'PTT-RFQ'}-Document-Summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleWhatsAppSend = () => {
    const itemsList =
      rfqItems.length > 0
        ? rfqItems.map((i) => `• ${i.machineName} (Qty: ${i.quantity})`).join('\n')
        : language === 'en'
          ? '• Custom Machine / New Tooling Discussion'
          : '• Diskusi Customized Machine / Tooling Baru';

    const msg =
      language === 'en'
        ? `*REQUEST FOR QUOTATION (RFQ)*
Ref: ${rfqRefNumber || generateRfqRef()}
Company: ${formData.companyName || '-'}
Contact Person: ${formData.picName || '-'}
Email: ${formData.email || '-'}
Phone/WA: ${formData.phone || '-'}
Industry: ${formData.industry}
Workpiece Material: ${formData.material}
Target Tolerance: ${formData.tolerance}
Est. Volume: ${formData.estimatedQty}
Target Timeline: ${formData.targetTimeline}
CAD Drawing Link: ${formData.drawingLink || 'Will send via email separately'}

*Requested Machinery / Parts:*
${itemsList}

*Additional Notes:*
${formData.notes || 'Please provide quotation estimate and technical schedule.'}

Submitted via PT. PRIMA TEKNIK TRADA Web Portal (www.pttid.com)`
        : `*PERMINTAAN PENAWARAN HARGA (RFQ)*
Ref: ${rfqRefNumber || generateRfqRef()}
Perusahaan: ${formData.companyName || '-'}
Nama PIC: ${formData.picName || '-'}
Email: ${formData.email || '-'}
Telepon/WA: ${formData.phone || '-'}
Industri: ${formData.industry}
Material: ${formData.material}
Toleransi: ${formData.tolerance}
Est. Volume: ${formData.estimatedQty}
Target Timeline: ${formData.targetTimeline}
Link Drawing / CAD: ${formData.drawingLink || 'Akan dikirim via email terpisah'}

*Item / Mesin Yang Diminta:*
${itemsList}

*Catatan Tambahan:*
${formData.notes || 'Mohon informasi estimasi penawaran harga dan waktu pengerjaan.'}

Dikirim melalui Web Portal PT. PRIMA TEKNIK TRADA (www.pttid.com)`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(
      `[RFQ PT PRIMA TEKNIK TRADA] ${formData.companyName || 'Inquiry'} - ${rfqRefNumber || 'Quotation'}`
    );
    const body = encodeURIComponent(
      language === 'en'
        ? `Dear PT. PRIMA TEKNIK TRADA Engineering & Estimation Team,\n\nPlease find our Request for Quotation (RFQ) below:\n\nCompany: ${formData.companyName}\nPIC: ${formData.picName}\nContact: ${formData.phone} / ${formData.email}\nIndustry: ${formData.industry}\nMaterial: ${formData.material}\nTolerance: ${formData.tolerance}\nEstimated Volume: ${formData.estimatedQty}\nTarget Timeline: ${formData.targetTimeline}\nDrawing Link: ${formData.drawingLink}\n\nRequested Items:\n${rfqItems.map((i) => `- ${i.machineName} (${i.quantity} units/parts)`).join('\n')}\n\nProject Notes:\n${formData.notes}\n\nThank you.`
        : `Yth. Tim Estimasi & Penjualan PT. PRIMA TEKNIK TRADA,\n\nBerikut kami sampaikan permintaan penawaran harga (Request for Quotation):\n\nPerusahaan: ${formData.companyName}\nPIC: ${formData.picName}\nKontak: ${formData.phone} / ${formData.email}\nIndustri: ${formData.industry}\nMaterial: ${formData.material}\nToleransi: ${formData.tolerance}\nEstimasi Volume: ${formData.estimatedQty}\nTarget Waktu: ${formData.targetTimeline}\nLink Drawing: ${formData.drawingLink}\n\nItem Permintaan:\n${rfqItems.map((i) => `- ${i.machineName} (${i.quantity} unit/part)`).join('\n')}\n\nCatatan:\n${formData.notes}\n\nTerima kasih.`
    );
    window.location.href = `mailto:${COMPANY_INFO.emailPrimary},${COMPANY_INFO.emailSecondary}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="kontak" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-3 border ${
              isDark
                ? 'bg-amber-400/10 border-amber-400/25 text-amber-400'
                : 'bg-amber-50 border-amber-300 text-amber-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'en'
                ? 'Rapid Response from Engineering & Estimation'
                : 'Respon Cepat Tim Engineering & Estimasi'}
            </span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.rfq.modalTitle}
          </h2>
          <p className={`mt-2 text-xs sm:text-sm md:text-base ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
            {t.rfq.modalSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: RFQ Items Cart & Quick Picker (4 cols) */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5">
            <div
              className={`rounded-2xl border p-4 sm:p-5 shadow-xl ${
                isDark ? 'bg-[#0e121a] border-neutral-800' : 'bg-white border-slate-200 shadow-slate-200'
              }`}
            >
              <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2">
                  <FileText className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  <h3 className={`text-sm font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {t.rfq.selectedItemsBadge} ({rfqItems.length})
                  </h3>
                </div>
                {rfqItems.length > 0 && (
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                      isDark ? 'text-amber-400 bg-amber-400/10' : 'text-amber-700 bg-amber-50'
                    }`}
                  >
                    {language === 'en' ? 'Ready to Quote' : 'Siap Dikalkulasi'}
                  </span>
                )}
              </div>

              {/* Items List */}
              <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {rfqItems.length === 0 ? (
                  <div className={`py-8 text-center text-xs space-y-1.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                    <p>{t.rfq.noItemsSelected}</p>
                    <p className="text-[11px] opacity-80">
                      {t.rfq.addFromCatalogHint}
                    </p>
                  </div>
                ) : (
                  rfqItems.map((item) => (
                    <div
                      key={item.machineId}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                        isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className={`font-semibold truncate font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {item.machineName}
                        </div>
                        <div className={`text-[11px] font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                          {item.categoryName}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div
                          className={`flex items-center rounded-md border ${
                            isDark ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.machineId, -1)}
                            className="px-2 py-0.5 hover:bg-black/10 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 font-mono text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.machineId, 1)}
                            className="px-2 py-0.5 hover:bg-black/10 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.machineId)}
                          className="p-1 text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Quick Add Recommendations from catalog */}
              <div className={`mt-4 pt-3 border-t ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                <div className={`text-[11px] font-mono mb-2 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  + {language === 'en' ? 'Quick Add Core Machines:' : 'Tambahkan Cepat Mesin Populer:'}
                </div>
                <div className="space-y-1.5">
                  {MACHINES_DATA.slice(0, 3).map((mRaw) => {
                    const m = getLocalizedMachine(mRaw, language);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => onAddQuickItem(mRaw)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg border text-xs flex items-center justify-between group transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-[#080a0f] hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate max-w-[200px]">{m.name}</span>
                        <Plus className="w-3 h-3 text-amber-500 group-hover:scale-110" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 text-xs space-y-3 ${
                isDark
                  ? 'bg-[#0e121a] border-neutral-800 text-neutral-300'
                  : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <div className={`font-bold font-display text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {language === 'en' ? 'Direct Sales & Technical Division' : 'Kontak Langsung Divisi Penjualan'}
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{COMPANY_INFO.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{COMPANY_INFO.emailPrimary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{COMPANY_INFO.emailSecondary}</span>
                </div>
              </div>
              <div className={`pt-2 border-t text-[11px] ${isDark ? 'border-neutral-800 text-neutral-400' : 'border-slate-200 text-slate-500'}`}>
                {t.about.operatingHoursVal}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form & Live Quotation Slip (8 cols) */}
          <div className="lg:col-span-8">
            <div
              className={`rounded-2xl border p-5 sm:p-8 shadow-2xl ${
                isDark ? 'bg-[#0e121a] border-neutral-800' : 'bg-white border-slate-200 shadow-slate-200'
              }`}
            >
              {/* Tab selector: Form vs Preview Slip */}
              <div className={`flex items-center justify-between pb-4 sm:pb-5 border-b mb-6 ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'form'
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : isDark
                          ? 'bg-neutral-800 text-neutral-400 hover:text-white'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {language === 'en' ? '1. RFQ Details & Contact' : '1. Rincian Penawaran & Kontak'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'preview'
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : isDark
                          ? 'bg-neutral-800 text-neutral-400 hover:text-white'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {language === 'en' ? '2. Review RFQ Document' : '2. Preview Slip Permintaan (RFQ)'}
                  </button>
                </div>

                {submitted && (
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-500 font-mono font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{t.rfq.refNumberLabel}: {rfqRefNumber}</span>
                  </div>
                )}
              </div>

              {activeTab === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* Company Name */}
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        {t.rfq.fieldCompany} *
                      </label>
                      <div className="relative">
                        <Building className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                        <input
                          type="text"
                          required
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder={t.rfq.fieldCompanyPlaceholder}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                            isDark
                              ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* PIC Name */}
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        {t.rfq.fieldPic} *
                      </label>
                      <div className="relative">
                        <User className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                        <input
                          type="text"
                          required
                          name="picName"
                          value={formData.picName}
                          onChange={handleChange}
                          placeholder={t.rfq.fieldPicPlaceholder}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                            isDark
                              ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        {t.rfq.fieldEmail} *
                      </label>
                      <div className="relative">
                        <Mail className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.rfq.fieldEmailPlaceholder}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                            isDark
                              ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        {t.rfq.fieldPhone} *
                      </label>
                      <div className="relative">
                        <Phone className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t.rfq.fieldPhonePlaceholder}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                            isDark
                              ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Technical Parameters */}
                  <div className={`pt-3 border-t grid grid-cols-1 sm:grid-cols-3 gap-3.5 ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        {t.rfq.fieldIndustry}
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                          isDark
                            ? 'bg-neutral-950 border-neutral-800 text-neutral-200'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <option value="Automotive OEM 2W / 4W">Automotive OEM 2W / 4W</option>
                        <option value="Electronics & Precision">
                          {language === 'en' ? 'Electronics & Precision' : 'Elektronik & Presisi'}
                        </option>
                        <option value="Pharmaceutical & Medical">
                          {language === 'en' ? 'Pharmaceutical & Medical' : 'Farmasi & Medis'}
                        </option>
                        <option value="Heavy Machinery">
                          {language === 'en' ? 'Heavy Machinery & Fabrication' : 'Heavy Machinery & Fabrikasi'}
                        </option>
                        <option value="General Industrial">
                          {language === 'en' ? 'General Manufacturing' : 'Manufaktur Umum'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        {t.rfq.fieldMaterial}
                      </label>
                      <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        placeholder={t.rfq.fieldMaterialPlaceholder}
                        className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                          isDark
                            ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        {t.rfq.fieldTolerance}
                      </label>
                      <input
                        type="text"
                        name="tolerance"
                        value={formData.tolerance}
                        onChange={handleChange}
                        placeholder="e.g. ±0.01 mm / ±0.005 mm"
                        className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                          isDark
                            ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        {t.rfq.fieldVolume}
                      </label>
                      <input
                        type="text"
                        name="estimatedQty"
                        value={formData.estimatedQty}
                        onChange={handleChange}
                        placeholder="e.g. 1 Unit SPM / 50,000 parts/month"
                        className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                          isDark
                            ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        {t.rfq.fieldTimeline}
                      </label>
                      <div className="relative">
                        <Calendar className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                        <input
                          type="text"
                          name="targetTimeline"
                          value={formData.targetTimeline}
                          onChange={handleChange}
                          placeholder="e.g. 4-6 Weeks / Q4 2026"
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                            isDark
                              ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Drawing Link */}
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                      {t.rfq.fieldDrawingLink}
                    </label>
                    <input
                      type="url"
                      name="drawingLink"
                      value={formData.drawingLink}
                      onChange={handleChange}
                      placeholder={t.rfq.fieldDrawingHint}
                      className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                        isDark
                          ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                      {t.rfq.fieldNotes}
                    </label>
                    <textarea
                      rows={3}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder={t.rfq.fieldNotesPlaceholder}
                      className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                        isDark
                          ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto px-7 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                          <span>
                            {language === 'en'
                              ? 'Saving & Generating Official RFQ Document...'
                              : 'Menyimpan & Menerbitkan Dokumen Resmi RFQ...'}
                          </span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4" />
                          <span>{t.rfq.submitBtn}</span>
                        </>
                      )}
                    </button>
                    <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>
                      {language === 'en'
                        ? 'Instant official document generation & saved to engineering inquiry database.'
                        : 'Penerbitan dokumen resmi instan & otomatis tercatat pada antrean estimasi engineering.'}
                    </span>
                  </div>
                </form>
              ) : (
                /* Live RFQ Slip Preview & Document View */
                <div className="space-y-6 animate-fade-slide">
                  {/* Print Stylesheet Hook */}
                  <style>{`
                    @media print {
                      body * {
                        visibility: hidden !important;
                      }
                      #printable-rfq-document, #printable-rfq-document * {
                        visibility: visible !important;
                      }
                      #printable-rfq-document {
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 24px !important;
                        background: #ffffff !important;
                        color: #0f172a !important;
                        border: 1px solid #cbd5e1 !important;
                        box-shadow: none !important;
                        font-size: 11pt !important;
                      }
                      .no-print {
                        display: none !important;
                      }
                    }
                  `}</style>

                  {/* Supabase Database Sync Status Banner */}
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      dbSaved === true
                        ? isDark
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : dbSaved === false
                        ? isDark
                          ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                          : 'bg-amber-50 border-amber-300 text-amber-800'
                        : isDark
                        ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {dbSaved === true ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                      )}
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          <span>
                            {dbSaved === true
                              ? language === 'en'
                                ? '✓ Verified & Stored in Supabase Database (Table: rfq_submissions)'
                                : '✓ Terverifikasi & Tersimpan di Database Supabase (Tabel: rfq_submissions)'
                              : language === 'en'
                              ? 'Official RFQ Document Generated'
                              : 'Dokumen Resmi RFQ Berhasil Diterbitkan'}
                          </span>
                        </div>
                        <div className="text-[11px] opacity-80">
                          {language === 'en'
                            ? `RFQ Reference Number: ${rfqRefNumber || 'DRAFT'}. Estimation queue is active.`
                            : `Nomor Referensi: ${rfqRefNumber || 'DRAFT'}. Antrean kalkulasi estimasi aktif.`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleCopyRef}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                          isDark
                            ? 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-200'
                            : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                        title="Salin Nomor Referensi"
                      >
                        {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedRef ? 'Tersalin' : rfqRefNumber}</span>
                      </button>
                    </div>
                  </div>

                  {/* Printable Official Document Slip */}
                  <div
                    id="printable-rfq-document"
                    className={`p-6 sm:p-8 rounded-2xl border text-xs font-mono space-y-5 relative overflow-hidden ${
                      isDark ? 'bg-[#080a0f] border-neutral-800 text-neutral-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {/* Watermark Logo Stamp */}
                    <div className="absolute right-6 top-8 opacity-5 pointer-events-none select-none text-right hidden sm:block">
                      <div className="text-6xl font-black font-display tracking-tighter">PRIMA TEKNIK TRADA</div>
                      <div className="text-xl font-mono">ISO 9001:2015 CERTIFIED</div>
                    </div>

                    {/* Official Letterhead Slip */}
                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 gap-3 ${isDark ? 'border-neutral-800' : 'border-slate-300'}`}>
                      <div>
                        <div className="text-base font-extrabold text-amber-500 font-display tracking-tight">
                          PT. PRIMA TEKNIK TRADA
                        </div>
                        <div className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                          Kawasan Industri MM2100 Cibitung, Bekasi · Jawa Barat 17530
                        </div>
                        <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>
                          Precision Machinery · Stamping Dies · SPM Automation · ISO 9001:2015
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="inline-block px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs">
                          {language === 'en' ? 'OFFICIAL RFQ INQUIRY SLIP' : 'SURAT PERMINTAAN PENAWARAN (RFQ)'}
                        </div>
                        <div className={`text-[11px] mt-1 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Ref: {rfqRefNumber || 'DRAFT-INQUIRY'}
                        </div>
                        <div className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                          {language === 'en' ? 'Issued:' : 'Diterbitkan:'} {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    {/* Client & Technical Specs Meta Grid */}
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                      <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200'}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                          {language === 'en' ? 'I. CLIENT COMPANY PROFILE' : 'I. IDENTITAS KLIEN PEMOHON'}
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex">
                            <span className="w-24 text-[11px] opacity-70">Perusahaan:</span>
                            <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{formData.companyName || '(Unspecified)'}</span>
                          </div>
                          <div className="flex">
                            <span className="w-24 text-[11px] opacity-70">Nama PIC:</span>
                            <span className="font-semibold">{formData.picName || '-'}</span>
                          </div>
                          <div className="flex">
                            <span className="w-24 text-[11px] opacity-70">Email:</span>
                            <span>{formData.email || '-'}</span>
                          </div>
                          <div className="flex">
                            <span className="w-24 text-[11px] opacity-70">Telepon / WA:</span>
                            <span>{formData.phone || '-'}</span>
                          </div>
                          <div className="flex">
                            <span className="w-24 text-[11px] opacity-70">Sektor:</span>
                            <span>{formData.industry}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200'}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                          {language === 'en' ? 'II. ENGINEERING SPECIFICATIONS' : 'II. PARAMETER MANUFAKTUR & TEKNIS'}
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex">
                            <span className="w-28 text-[11px] opacity-70">Material Benda:</span>
                            <span className="font-semibold">{formData.material}</span>
                          </div>
                          <div className="flex">
                            <span className="w-28 text-[11px] opacity-70">Target Toleransi:</span>
                            <span className="font-semibold text-amber-500">{formData.tolerance}</span>
                          </div>
                          <div className="flex">
                            <span className="w-28 text-[11px] opacity-70">Estimasi Volume:</span>
                            <span>{formData.estimatedQty}</span>
                          </div>
                          <div className="flex">
                            <span className="w-28 text-[11px] opacity-70">Target Timeline:</span>
                            <span>{formData.targetTimeline}</span>
                          </div>
                          <div className="flex truncate">
                            <span className="w-28 text-[11px] opacity-70">Link Drawing:</span>
                            <span className="truncate">{formData.drawingLink || 'Dikirim terpisah'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Requested Machinery Items Table */}
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                        {language === 'en' ? 'III. REQUESTED SYSTEMS & MACHINERY' : 'III. DAFTAR MESIN & PERMINTAAN SPESIFIKASI'}
                      </div>
                      {rfqItems.length === 0 ? (
                        <div className={`p-3.5 rounded-xl ${isDark ? 'bg-neutral-900 text-neutral-400' : 'bg-white text-slate-600 border border-slate-200'}`}>
                          {language === 'en'
                            ? 'Special consultation request for customized automation / special purpose machine design.'
                            : 'Permintaan perancangan khusus customized automation / special purpose machine (SPM) / dies baru.'}
                        </div>
                      ) : (
                        <div className={`overflow-hidden rounded-xl border ${isDark ? 'divide-neutral-800 border-neutral-800' : 'divide-slate-200 border-slate-200'}`}>
                          <table className="w-full text-left text-xs">
                            <thead className={isDark ? 'bg-neutral-900/80 text-neutral-400' : 'bg-slate-100 text-slate-700'}>
                              <tr>
                                <th className="p-2.5 font-bold w-12 text-center">No</th>
                                <th className="p-2.5 font-bold">Nama Mesin / Fabrikasi</th>
                                <th className="p-2.5 font-bold">Kategori</th>
                                <th className="p-2.5 font-bold text-right w-24">Jumlah</th>
                              </tr>
                            </thead>
                            <tbody className={`divide-y ${isDark ? 'divide-neutral-800/80' : 'divide-slate-200'}`}>
                              {rfqItems.map((item, idx) => (
                                <tr key={item.machineId} className={isDark ? 'bg-neutral-900/40' : 'bg-white'}>
                                  <td className="p-2.5 text-center font-mono opacity-80">{idx + 1}</td>
                                  <td className="p-2.5 font-bold text-slate-100">{item.machineName}</td>
                                  <td className="p-2.5 text-neutral-400">{item.categoryName}</td>
                                  <td className="p-2.5 text-right font-mono font-bold text-amber-500">{item.quantity} Unit</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Special Notes */}
                    {formData.notes && (
                      <div className={`p-3 rounded-xl border ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-slate-200'}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                          {language === 'en' ? 'IV. SPECIAL PROJECT DIRECTIVES & NOTES' : 'IV. CATATAN & ARAHAN KHUSUS PROYEK'}
                        </div>
                        <div className={`italic text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                          "{formData.notes}"
                        </div>
                      </div>
                    )}

                    {/* Terms & Authorization Sign-off Block */}
                    <div className={`pt-4 border-t-2 grid grid-cols-1 sm:grid-cols-2 gap-4 ${isDark ? 'border-neutral-800 text-neutral-400' : 'border-slate-300 text-slate-600'}`}>
                      <div className="space-y-1 text-[10px]">
                        <div className="font-bold uppercase text-amber-500">Ketentuan &amp; Alur Estimasi:</div>
                        <p>1. Surat RFQ ini telah tercatat secara sah pada antrean kalkulasi tim engineering PT. Prima Teknik Trada.</p>
                        <p>2. Tim Sales &amp; Estimasi akan menerbitkan Formal Quotation Sheet dalam 1x24 jam kerja setelah verifikasi drawing.</p>
                        <p>3. Standar toleransi dan jaminan mutu mengacu pada sistem manajemen mutu ISO 9001:2015.</p>
                      </div>

                      <div className="text-center sm:text-right flex flex-col justify-between pt-2 sm:pt-0">
                        <div className="text-[10px]">
                          Cikarang Barat, {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="py-2">
                          <div className="inline-block border-2 border-dashed border-amber-500/40 px-4 py-1.5 rounded-lg text-amber-500 text-[10px] font-bold">
                            PT. PRIMA TEKNIK TRADA<br />
                            <span className="text-[9px] font-mono font-normal">ENGINEERING INQUIRY ACKNOWLEDGED</span>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold text-slate-300">
                          Divisi Penjualan &amp; Estimasi Rekayasa
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission Triggers & Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('form')}
                      className={`px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                        isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      &larr; {language === 'en' ? 'Edit RFQ Form Data' : 'Ubah Rincian Formulir'}
                    </button>

                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                      {/* Print PDF Button */}
                      <button
                        type="button"
                        onClick={handlePrintDocument}
                        className="flex-1 sm:flex-initial px-4 py-3 text-xs font-bold text-neutral-900 bg-white hover:bg-slate-100 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-300 shadow-sm cursor-pointer"
                        title="Cetak atau Simpan sebagai PDF"
                      >
                        <Printer className="w-4 h-4 text-neutral-800" />
                        <span>{language === 'en' ? 'Print / PDF' : 'Cetak / PDF'}</span>
                      </button>

                      {/* Download Summary Text File */}
                      <button
                        type="button"
                        onClick={handleDownloadSummary}
                        className={`flex-1 sm:flex-initial px-4 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                          isDark
                            ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                        }`}
                        title="Unduh Salinan Dokumen (.txt)"
                      >
                        <Download className="w-4 h-4" />
                        <span>{language === 'en' ? 'Export Slip' : 'Unduh Draf'}</span>
                      </button>

                      {/* WhatsApp Direct Link */}
                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="flex-1 sm:flex-initial px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{t.rfq.sendViaWaBtn}</span>
                      </button>

                      {/* Official Email */}
                      <button
                        type="button"
                        onClick={handleEmailSend}
                        className="flex-1 sm:flex-initial px-5 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>{language === 'en' ? 'Send Official Email' : 'Kirim via Email Resmi'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
