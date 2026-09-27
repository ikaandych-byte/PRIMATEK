import React, { useState } from 'react';
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
} from 'lucide-react';
import { RfqItem, MachineItem } from '../types';
import { COMPANY_INFO } from '../data/company';
import { MACHINES_DATA } from '../data/machines';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedMachine } from '../utils/localizedData';

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

  const [formData, setFormData] = useState({
    companyName: '',
    picName: '',
    email: '',
    phone: '',
    industry: 'Automotive OEM 2W / 4W',
    material: 'SPCC / Mild Steel',
    tolerance: '±0.01 mm',
    targetTimeline: '1-2 Months',
    estimatedQty: '100 - 1,000 pcs',
    drawingLink: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [rfqRefNumber, setRfqRefNumber] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = generateRfqRef();
    setRfqRefNumber(ref);
    setSubmitted(true);
    setActiveTab('preview');
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
                      className="w-full sm:w-auto px-7 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t.rfq.submitBtn}</span>
                    </button>
                    <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>
                      {language === 'en'
                        ? 'Complimentary technical consultation with zero commitment.'
                        : 'Gratis konsultasi teknis awal tanpa komitmen.'}
                    </span>
                  </div>
                </form>
              ) : (
                /* Live RFQ Slip Preview */
                <div className="space-y-6 animate-fade-slide">
                  <div
                    className={`p-6 rounded-2xl border text-xs font-mono space-y-4 ${
                      isDark ? 'bg-[#080a0f] border-neutral-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {/* Header Slip */}
                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-2 ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                      <div>
                        <div className="text-sm font-bold text-amber-500 font-display">
                          PT. PRIMA TEKNIK TRADA
                        </div>
                        <div className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                          MM2100 Industrial Estate Cibitung, Bekasi · {COMPANY_INFO.iso}
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {language === 'en' ? 'REQUEST FOR QUOTATION (RFQ)' : 'LEMBAR PERMINTAAN PENAWARAN (RFQ)'}
                        </div>
                        <div className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                          Ref: {rfqRefNumber || 'DRAFT-INQUIRY'} · {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID')}
                        </div>
                      </div>
                    </div>

                    {/* Client & Specs Meta */}
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-b ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                      <div>
                        <div className={`text-[10px] uppercase ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
                          {language === 'en' ? 'Client Company:' : 'Perusahaan Klien:'}
                        </div>
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{formData.companyName || '(Unspecified)'}</div>
                        <div className={isDark ? 'text-neutral-400' : 'text-slate-600'}>PIC: {formData.picName || '-'}</div>
                        <div className={isDark ? 'text-neutral-400' : 'text-slate-600'}>Email: {formData.email || '-'}</div>
                        <div className={isDark ? 'text-neutral-400' : 'text-slate-600'}>Tel: {formData.phone || '-'}</div>
                      </div>
                      <div>
                        <div className={`text-[10px] uppercase ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
                          {language === 'en' ? 'Technical Specifications:' : 'Parameter Manufaktur:'}
                        </div>
                        <div className={isDark ? 'text-neutral-300' : 'text-slate-700'}>Industry: {formData.industry}</div>
                        <div className={isDark ? 'text-neutral-300' : 'text-slate-700'}>Material: {formData.material}</div>
                        <div className={isDark ? 'text-neutral-300' : 'text-slate-700'}>Tolerance: {formData.tolerance}</div>
                        <div className={isDark ? 'text-neutral-300' : 'text-slate-700'}>Volume: {formData.estimatedQty}</div>
                        <div className={isDark ? 'text-neutral-300' : 'text-slate-700'}>Timeline: {formData.targetTimeline}</div>
                      </div>
                    </div>

                    {/* Items table */}
                    <div>
                      <div className={`text-[10px] uppercase mb-2 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
                        {language === 'en' ? 'Requested Systems / Parts:' : 'Item Spesifikasi Yang Diminta:'}
                      </div>
                      {rfqItems.length === 0 ? (
                        <div className={`p-3 rounded ${isDark ? 'bg-neutral-900 text-neutral-400' : 'bg-white text-slate-500 border border-slate-200'}`}>
                          {language === 'en'
                            ? 'Custom machine design / technical engineering consultation.'
                            : 'Pengajuan perancangan kustom / konsultasi teknis baru.'}
                        </div>
                      ) : (
                        <div className={`divide-y rounded-lg overflow-hidden border ${isDark ? 'divide-neutral-900 border-neutral-800' : 'divide-slate-200 border-slate-200'}`}>
                          {rfqItems.map((item, idx) => (
                            <div
                              key={item.machineId}
                              className={`p-2.5 flex items-center justify-between ${
                                isDark ? 'bg-neutral-900/60' : 'bg-white'
                              }`}
                            >
                              <span className={isDark ? 'text-white' : 'text-slate-900'}>
                                {idx + 1}. {item.machineName}
                              </span>
                              <span className="text-amber-500 font-bold">Qty: {item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {formData.notes && (
                      <div>
                        <div className={`text-[10px] uppercase ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
                          {language === 'en' ? 'Special Project Notes:' : 'Catatan Khusus:'}
                        </div>
                        <div className={`italic ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>{formData.notes}</div>
                      </div>
                    )}
                  </div>

                  {/* Submission Triggers */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('form')}
                      className={`px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                        isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      &larr; {language === 'en' ? 'Edit RFQ Data' : 'Ubah Rincian Data'}
                    </button>

                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="flex-1 sm:flex-initial px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{t.rfq.sendViaWaBtn}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleEmailSend}
                        className="flex-1 sm:flex-initial px-5 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>{language === 'en' ? 'Send Official RFQ via Email' : 'Kirim Surat RFQ via Email Resmi'}</span>
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
