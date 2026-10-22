import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Mail,
  Phone,
  Building,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../../context/ThemeContext';
import { COMPANY_INFO } from '../../data/company';

export interface RfqSubmissionItem {
  id: string;
  rfq_number: string;
  company_name: string;
  pic_name: string;
  email: string;
  phone: string;
  industry: string;
  material: string;
  tolerance: string;
  target_timeline: string;
  estimated_qty: string;
  drawing_link?: string;
  notes?: string;
  items: Array<{
    machineId: string;
    machineName: string;
    categoryName: string;
    quantity: number;
  }>;
  status: 'pending' | 'under_review' | 'quoted' | 'converted_to_project' | 'rejected';
  created_at: string;
}

// Fallback mock submissions jika tabel Supabase belum di-seed
const MOCK_FALLBACK_RFQS: RfqSubmissionItem[] = [
  {
    id: 'rfq-demo-1',
    rfq_number: 'PTT-RFQ-2026-8941',
    company_name: 'PT. Astra Honda Motor (Plant Cikarang)',
    pic_name: 'Budi Santoso, S.T.',
    email: 'budi.santoso@ahm.co.id',
    phone: '081289123456',
    industry: 'Automotive OEM 2W / 4W',
    material: 'SPCC / High Tensile Steel 2.3 mm',
    tolerance: '±0.01 mm',
    target_timeline: '6-8 Minggu',
    estimated_qty: '1 Lini SPM (5 Workstations)',
    drawing_link: 'https://drive.google.com/drive/folders/ahm-cad-dwg-sample',
    notes: 'Kebutuhan mesin otomatis assembly cover crankcase dengan robotic sealing dispenser.',
    items: [
      { machineId: 'spm-assembly-line', machineName: 'Automated Assembly & Packaging Line Machine', categoryName: 'Automation', quantity: 1 },
      { machineId: 'jig-clamping', machineName: 'Hydraulic Auto Clamping Fixture', categoryName: 'Jig & Fixture', quantity: 2 },
    ],
    status: 'under_review',
    created_at: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
  },
  {
    id: 'rfq-demo-2',
    rfq_number: 'PTT-RFQ-2026-7215',
    company_name: 'PT. Yamaha Indonesia Motor Mfg',
    pic_name: 'Ir. Hendra Wijaya',
    email: 'hendra.wijaya@yamaha-motor.co.id',
    phone: '081399887766',
    industry: 'Automotive OEM 2W / 4W',
    material: 'Aluminium Die Casting ADC12',
    tolerance: '±0.005 mm',
    target_timeline: 'Q4 2026',
    estimated_qty: '50.000 parts/bulan',
    drawing_link: '',
    notes: 'Mohon penawaran dies progressive & checking fixture 3D CMM report.',
    items: [
      { machineId: 'dies-moulds', machineName: 'Stamping Press Progressive Dies 250T', categoryName: 'Dies & Moulds', quantity: 1 },
    ],
    status: 'quoted',
    created_at: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
  },
];

export const RfqInquiriesSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [rfqs, setRfqs] = useState<RfqSubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchRfqs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rfq_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setRfqs(MOCK_FALLBACK_RFQS);
        setIsCloudConnected(false);
      } else {
        setRfqs(data as RfqSubmissionItem[]);
        setIsCloudConnected(true);
      }
    } catch (err) {
      setRfqs(MOCK_FALLBACK_RFQS);
      setIsCloudConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRfqs();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: RfqSubmissionItem['status']) => {
    // Optimistic UI update
    setRfqs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );

    try {
      await supabase
        .from('rfq_submissions')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
    } catch (err) {
      console.warn('Update RFQ status in DB:', err);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredRfqs = rfqs.filter((r) => {
    const matchesSearch =
      r.rfq_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.pic_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.material.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: RfqSubmissionItem['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Inquiry Baru (Pending)',
          badge: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
        };
      case 'under_review':
        return {
          label: 'Dalam Analisa Engineering',
          badge: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
        };
      case 'quoted':
        return {
          label: 'Penawaran Terkirim (Quoted)',
          badge: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
        };
      case 'converted_to_project':
        return {
          label: 'Deal / SPK Project Diterbitkan',
          badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
        };
      case 'rejected':
        return {
          label: 'Ditolak / Batal',
          badge: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
        };
      default:
        return {
          label: status,
          badge: 'bg-neutral-800 border-neutral-700 text-neutral-300',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Status Banner */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border ${
          isDark
            ? 'bg-gradient-to-br from-[#0c1017] via-[#0f141f] to-[#0a0d14] border-neutral-800'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                Pusat Inquiry Klien
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  isCloudConnected
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                }`}
              >
                {isCloudConnected ? '● Live Supabase Sync' : '○ Standby / Fallback Cache'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-slate-100 mt-2">
              Daftar Permintaan Penawaran Masuk (RFQ Inquiries)
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Data formulir "RFQ Details & Contact" yang dikirimkan calon klien dari website portal PT. Prima Teknik Trada.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchRfqs}
              disabled={loading}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                isDark
                  ? 'border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-200'
                  : 'border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-inherit">
          <div className={`p-3 rounded-2xl border ${isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono text-neutral-400 uppercase">Total RFQ Masuk</span>
            <div className="text-xl font-bold font-mono text-slate-100 mt-0.5">{rfqs.length}</div>
          </div>
          <div className={`p-3 rounded-2xl border ${isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <span className="text-[10px] font-mono text-amber-400 uppercase">Perlu Dihitung (Pending)</span>
            <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
              {rfqs.filter((r) => r.status === 'pending' || r.status === 'under_review').length}
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${isDark ? 'bg-blue-950/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
            <span className="text-[10px] font-mono text-blue-400 uppercase">Penawaran Diberikan</span>
            <div className="text-xl font-bold font-mono text-blue-400 mt-0.5">
              {rfqs.filter((r) => r.status === 'quoted').length}
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'}`}>
            <span className="text-[10px] font-mono text-emerald-400 uppercase">Deal Jadi Project</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
              {rfqs.filter((r) => r.status === 'converted_to_project').length}
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Ref RFQ, Perusahaan, PIC, Material..."
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
              isDark
                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
          <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          {['all', 'pending', 'under_review', 'quoted', 'converted_to_project'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                statusFilter === st
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : isDark
                  ? 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {st === 'all'
                ? 'Semua Status'
                : st === 'pending'
                ? 'Pending'
                : st === 'under_review'
                ? 'Under Review'
                : st === 'quoted'
                ? 'Quoted'
                : 'Deal Project'}
            </button>
          ))}
        </div>
      </div>

      {/* RFQ Cards List */}
      <div className="space-y-4">
        {filteredRfqs.length === 0 ? (
          <div
            className={`p-10 rounded-3xl border text-center space-y-2 ${
              isDark ? 'bg-neutral-900/40 border-neutral-800 text-neutral-400' : 'bg-white border-slate-200 text-slate-500'
            }`}
          >
            <FileText className="w-8 h-8 mx-auto opacity-50" />
            <div className="font-bold text-sm">Tidak ada permintaan RFQ yang cocok</div>
            <p className="text-xs">Ubah filter status atau kata kunci pencarian Anda.</p>
          </div>
        ) : (
          filteredRfqs.map((rfq) => {
            const isExpanded = expandedId === rfq.id;
            const statusMeta = getStatusBadge(rfq.status);

            return (
              <div
                key={rfq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isDark
                    ? 'bg-[#0c1017] border-neutral-800 hover:border-neutral-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Header Summary Row */}
                <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-amber-400">
                          {rfq.rfq_number}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border font-semibold ${statusMeta.badge}`}>
                          {statusMeta.label}
                        </span>
                        <span className="text-[10px] font-mono opacity-60">
                          {new Date(rfq.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold font-display text-slate-100 truncate mt-1">
                        {rfq.company_name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-neutral-400 mt-0.5 flex-wrap">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-amber-500" />
                          <span>{rfq.pic_name}</span>
                        </span>
                        <span>•</span>
                        <span>{rfq.phone}</span>
                        <span>•</span>
                        <span>{rfq.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    {/* Direct WA Button to Customer */}
                    <button
                      type="button"
                      onClick={() => {
                        const cleanPhone = rfq.phone.replace(/[^0-9]/g, '');
                        const intlPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
                        const msg = `Halo ${rfq.pic_name} (${rfq.company_name}), kami dari Tim Engineering & Sales PT. Prima Teknik Trada. Terkait dokumen Permintaan Penawaran (RFQ) Ref: ${rfq.rfq_number}, kami telah menerima data dan siap memproses kalkulasi teknis penawarannya.`;
                        window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Hubungi PIC via WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat PIC</span>
                    </button>

                    {/* Email to Customer */}
                    <a
                      href={`mailto:${rfq.email}?subject=Konfirmasi Permintaan Penawaran RFQ [${rfq.rfq_number}] - PT Prima Teknik Trada`}
                      className="px-3 py-1.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      title="Kirim Email ke PIC"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </a>

                    {/* Expand Detail Toggle */}
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : rfq.id)}
                      className="p-1.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white cursor-pointer transition-colors"
                      title={isExpanded ? 'Tutup Detail' : 'Buka Detail Spesifikasi'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Accordion */}
                {isExpanded && (
                  <div className={`p-5 border-t text-xs space-y-4 ${isDark ? 'bg-neutral-950/70 border-neutral-800/80' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Parameter Teknis */}
                      <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200'}`}>
                        <div className="font-bold text-amber-400 font-mono text-[11px] uppercase">
                          Parameter Manufaktur &amp; Toleransi
                        </div>
                        <div className="space-y-1 text-[11px]">
                          <div><span className="opacity-70">Material Benda:</span> <span className="font-semibold text-slate-200">{rfq.material}</span></div>
                          <div><span className="opacity-70">Target Toleransi:</span> <span className="font-semibold text-amber-400">{rfq.tolerance}</span></div>
                          <div><span className="opacity-70">Estimasi Volume:</span> <span>{rfq.estimated_qty}</span></div>
                          <div><span className="opacity-70">Target Timeline:</span> <span>{rfq.target_timeline}</span></div>
                          <div><span className="opacity-70">Sektor Industri:</span> <span>{rfq.industry}</span></div>
                          {rfq.drawing_link && (
                            <div className="pt-1">
                              <span className="opacity-70 block mb-0.5">Link Drawing CAD / 3D:</span>
                              <a
                                href={rfq.drawing_link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-cyan-400 hover:underline flex items-center gap-1 font-mono break-all"
                              >
                                <ExternalLink className="w-3 h-3 shrink-0" />
                                <span>{rfq.drawing_link}</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Items Yang Diminta */}
                      <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200'}`}>
                        <div className="font-bold text-amber-400 font-mono text-[11px] uppercase">
                          Daftar Mesin / Fabrikasi ({rfq.items?.length || 0})
                        </div>
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {rfq.items && rfq.items.length > 0 ? (
                            rfq.items.map((item, idx) => (
                              <div
                                key={idx}
                                className={`p-2 rounded-lg border text-[11px] flex items-center justify-between ${
                                  isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-50 border-slate-200'
                                }`}
                              >
                                <div className="truncate mr-2">
                                  <span className="font-bold text-slate-100">{item.machineName}</span>
                                  <span className="text-[10px] text-neutral-400 block">{item.categoryName}</span>
                                </div>
                                <span className="font-mono font-bold text-amber-500 whitespace-nowrap">
                                  Qty: {item.quantity}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="text-neutral-400 text-[11px]">Konsultasi Customized Machine</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {rfq.notes && (
                      <div className={`p-3 rounded-xl border ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-slate-200'}`}>
                        <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                          Catatan Khusus Klien:
                        </span>
                        <p className="text-xs text-neutral-300 italic">"{rfq.notes}"</p>
                      </div>
                    )}

                    {/* Status Changer Toolbar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-inherit">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-neutral-400">Update Status RFQ:</span>
                        {(['pending', 'under_review', 'quoted', 'converted_to_project'] as const).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleUpdateStatus(rfq.id, st)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                              rfq.status === st
                                ? 'bg-amber-400 text-neutral-950'
                                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                            }`}
                          >
                            {st === 'pending'
                              ? 'Pending'
                              : st === 'under_review'
                              ? 'Review'
                              : st === 'quoted'
                              ? 'Quoted'
                              : 'Deal Project'}
                          </button>
                        ))}
                      </div>

                      <div className="text-[10px] font-mono opacity-60">
                        ID: {rfq.id}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
