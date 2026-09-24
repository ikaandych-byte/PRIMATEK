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
  Layers,
  Sparkles,
} from 'lucide-react';
import { RfqItem, MachineItem } from '../types';
import { COMPANY_INFO } from '../data/company';
import { MACHINES_DATA } from '../data/machines';

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
  const [formData, setFormData] = useState({
    companyName: '',
    picName: '',
    email: '',
    phone: '',
    industry: 'Automotive',
    material: 'SPCC / Mild Steel',
    tolerance: '±0.01 mm',
    targetTimeline: '1-2 Bulan',
    estimatedQty: '100 - 1.000 pcs',
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
        : '• Diskusi Customized Machine / Tooling Baru';

    const msg = `*PERMINTAAN PENAWARAN HARGA (RFQ)*
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

Dikirim melalui Web Portal PT. PRIMA TEKNIK TRADA (www.ptt-id.com)`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(
      `[RFQ PT PRIMA TEKNIK TRADA] ${formData.companyName || 'Inquiry'} - ${rfqRefNumber || 'Penawaran Harga'}`
    );
    const body = encodeURIComponent(
      `Yth. Tim Estimasi & Penjualan PT. PRIMA TEKNIK TRADA,\n\nBerikut kami sampaikan permintaan penawaran harga (Request for Quotation):\n\nPerusahaan: ${formData.companyName}\nPIC: ${formData.picName}\nKontak: ${formData.phone} / ${formData.email}\nIndustri: ${formData.industry}\nMaterial: ${formData.material}\nToleransi: ${formData.tolerance}\nEstimasi Volume: ${formData.estimatedQty}\nTarget Waktu: ${formData.targetTimeline}\nLink Drawing: ${formData.drawingLink}\n\nItem Permintaan:\n${rfqItems.map((i) => `- ${i.machineName} (${i.quantity} unit/part)`).join('\n')}\n\nCatatan:\n${formData.notes}\n\nTerima kasih.`
    );
    window.location.href = `mailto:${COMPANY_INFO.emailPrimary},${COMPANY_INFO.emailSecondary}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="kontak" className="py-20 bg-neutral-900/50 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs font-mono uppercase tracking-wider text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Respon Cepat Tim Engineering &amp; Estimasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Formulir Penawaran Harga Langsung (RFQ)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-300">
            Kirimkan rincian kebutuhan mesin kustom, jig fixture, cetakan dies, atau suku cadang produksi massal. Tim teknis PT. Prima Teknik Trada siap memberikan kalkulasi teknis dan penawaran kompetitif.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: RFQ Items Cart & Quick Picker (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white font-display">
                    Daftar Mesin / Part Terpilih ({rfqItems.length})
                  </h3>
                </div>
                {rfqItems.length > 0 && (
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    Siap Dikalkulasi
                  </span>
                )}
              </div>

              {/* Items List */}
              <div className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                {rfqItems.length === 0 ? (
                  <div className="py-8 text-center text-xs text-neutral-400 space-y-2">
                    <p>Belum ada mesin yang ditambahkan dari katalog.</p>
                    <p className="text-[11px] text-neutral-500">
                      Pilih dari rekomendasi cepat di bawah atau isi langsung formulir di samping.
                    </p>
                  </div>
                ) : (
                  rfqItems.map((item) => (
                    <div
                      key={item.machineId}
                      className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-white truncate font-display">
                          {item.machineName}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          {item.categoryName}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded-md">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.machineId, -1)}
                            className="px-2 py-0.5 text-neutral-300 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 font-mono text-white text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.machineId, 1)}
                            className="px-2 py-0.5 text-neutral-300 hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.machineId)}
                          className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                          title="Hapus Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Quick Add Recommendations from catalog */}
              <div className="mt-4 pt-3 border-t border-neutral-800">
                <div className="text-[11px] text-neutral-400 font-mono mb-2">
                  + Tambahkan Cepat Mesin Populer:
                </div>
                <div className="space-y-1.5">
                  {MACHINES_DATA.slice(0, 3).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onAddQuickItem(m)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800/70 border border-neutral-800/60 text-xs text-neutral-300 hover:text-white flex items-center justify-between group transition-colors"
                    >
                      <span className="truncate max-w-[200px]">{m.name}</span>
                      <Plus className="w-3 h-3 text-amber-400 group-hover:scale-110" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-5 text-xs text-neutral-300 space-y-3">
              <div className="font-bold text-white font-display text-sm">
                Kontak Langsung Divisi Penjualan
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{COMPANY_INFO.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{COMPANY_INFO.emailPrimary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{COMPANY_INFO.emailSecondary}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
                Jam Operasional: Senin – Jumat 08.00 – 17.00 WIB
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form & Live Quotation Slip (8 cols) */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl">
              
              {/* Tab selector: Form vs Preview Slip */}
              <div className="flex items-center justify-between pb-5 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'form'
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    1. Rincian Penawaran &amp; Kontak
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    2. Preview Slip Permintaan (RFQ Slip)
                  </button>
                </div>

                {submitted && (
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Terverifikasi: {rfqRefNumber}</span>
                  </div>
                )}
              </div>

              {activeTab === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Nama Perusahaan / Klien *
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="PT. Nama Perusahaan Anda"
                          className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* PIC Name */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Nama PIC / Purchasing / Engineering *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          name="picName"
                          value={formData.picName}
                          onChange={handleChange}
                          placeholder="Nama Lengkap Penanggung Jawab"
                          className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Email Resmi Perusahaan *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="purchasing@company.co.id"
                          className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Nomor Telepon / WhatsApp PIC *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+62 812-XXXX-XXXX"
                          className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Technical Parameters */}
                  <div className="pt-2 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Sektor Industri
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
                      >
                        <option value="Automotive OEM 2W/4W">Automotive OEM 2W / 4W</option>
                        <option value="Electronics & Precision">Elektronik &amp; Presisi</option>
                        <option value="Pharmaceutical & Medical">Farmasi &amp; Medis</option>
                        <option value="Heavy Machinery">Heavy Machinery &amp; Fabrikasi</option>
                        <option value="General Industrial">Manufaktur Umum</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Material Benda Kerja
                      </label>
                      <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        placeholder="Contoh: SPCC, SUS304, SKD11, Al7075"
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Target Toleransi Presisi
                      </label>
                      <input
                        type="text"
                        name="tolerance"
                        value={formData.tolerance}
                        onChange={handleChange}
                        placeholder="Contoh: ±0.01 mm / ±0.005 mm"
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Estimasi Kebutuhan / Volume
                      </label>
                      <input
                        type="text"
                        name="estimatedQty"
                        value={formData.estimatedQty}
                        onChange={handleChange}
                        placeholder="Contoh: 1 Unit Mesin / 50.000 part/bulan"
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Target Timeline Selesai
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          name="targetTimeline"
                          value={formData.targetTimeline}
                          onChange={handleChange}
                          placeholder="Contoh: 4-6 Minggu / Q4 2026"
                          className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Drawing Link */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Tautan Gambar Teknik / CAD File (Google Drive / OneDrive / Dropbox)
                    </label>
                    <input
                      type="url"
                      name="drawingLink"
                      value={formData.drawingLink}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/... (atau cantumkan catatan jika akan dikirim via email)"
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Catatan Tambahan / Spesifikasi Khusus Mesin
                    </label>
                    <textarea
                      rows={3}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Jelaskan kebutuhan operasional khusus, siklus waktu (cycle time) yang diinginkan, atau standar keselamatan yang diwajibkan..."
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Buat &amp; Tinjau Slip Penawaran Harga (RFQ)</span>
                    </button>
                    <span className="text-xs text-neutral-500">
                      Gratis konsultasi teknis awal tanpa komitmen.
                    </span>
                  </div>
                </form>
              ) : (
                /* Live RFQ Slip Preview */
                <div className="space-y-6 animate-fade-slide">
                  <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs font-mono space-y-4">
                    {/* Header Slip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-2">
                      <div>
                        <div className="text-sm font-bold text-amber-400 font-display">
                          PT. PRIMA TEKNIK TRADA
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Kawasan Industri MM2100 Cibitung, Bekasi · {COMPANY_INFO.iso}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-white">
                          LEMBAR PERMINTAAN PENAWARAN (RFQ)
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Ref: {rfqRefNumber || 'DRAFT-INQUIRY'} · {new Date().toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </div>

                    {/* Client & Specs Meta */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-b border-neutral-800">
                      <div>
                        <div className="text-[10px] uppercase text-neutral-500">Perusahaan Klien:</div>
                        <div className="text-white font-semibold">{formData.companyName || '(Belum diisi)'}</div>
                        <div className="text-neutral-400">PIC: {formData.picName || '-'}</div>
                        <div className="text-neutral-400">Email: {formData.email || '-'}</div>
                        <div className="text-neutral-400">Tel: {formData.phone || '-'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-neutral-500">Parameter Manufaktur:</div>
                        <div className="text-neutral-300">Industri: {formData.industry}</div>
                        <div className="text-neutral-300">Material: {formData.material}</div>
                        <div className="text-neutral-300">Toleransi: {formData.tolerance}</div>
                        <div className="text-neutral-300">Volume: {formData.estimatedQty}</div>
                        <div className="text-neutral-300">Target Waktu: {formData.targetTimeline}</div>
                      </div>
                    </div>

                    {/* Items table */}
                    <div>
                      <div className="text-[10px] uppercase text-neutral-500 mb-2">Item Spesifikasi Yang Diminta:</div>
                      {rfqItems.length === 0 ? (
                        <div className="p-3 rounded bg-neutral-900 text-neutral-400">
                          Pengajuan perancangan kustom / konsultasi teknis baru.
                        </div>
                      ) : (
                        <div className="divide-y divide-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                          {rfqItems.map((item, idx) => (
                            <div key={item.machineId} className="p-2.5 bg-neutral-900/60 flex items-center justify-between">
                              <span className="text-white">
                                {idx + 1}. {item.machineName}
                              </span>
                              <span className="text-amber-400 font-bold">Qty: {item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {formData.notes && (
                      <div>
                        <div className="text-[10px] uppercase text-neutral-500">Catatan Khusus:</div>
                        <div className="text-neutral-300 italic">{formData.notes}</div>
                      </div>
                    )}
                  </div>

                  {/* Submission Triggers */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('form')}
                      className="px-4 py-2.5 text-xs text-neutral-400 hover:text-white transition-colors"
                    >
                      &larr; Ubah Rincian Data
                    </button>

                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="flex-1 sm:flex-initial px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Kirim Langsung via WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleEmailSend}
                        className="flex-1 sm:flex-initial px-5 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                      >
                        <Send className="w-4 h-4" />
                        <span>Kirim Surat RFQ via Email Resmi</span>
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
