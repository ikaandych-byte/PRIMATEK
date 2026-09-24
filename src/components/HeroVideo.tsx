import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  Factory,
  Award,
  Target,
  Sparkles,
  Layers,
} from 'lucide-react';
import heroPoster from '../assets/images/hero_industrial_automation_1790239853481.jpg';
import { COMPANY_INFO, CLIENT_LOGOS, TECHNICAL_PARTNERS } from '../data/company';

interface HeroVideoProps {
  onExploreCatalog: () => void;
  onOpenRfq: () => void;
  onSelectCategory: (category: string) => void;
}

const VIDEO_CLIPS = [
  {
    id: 'industrial-robotics',
    title: 'Automated Robotics & Machining',
    url: 'https://cdn.coverr.co/videos/coverr-robotic-arm-working-in-a-factory-6782/1080p.mp4',
    altUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'cnc-manufacturing',
    title: 'Precision CNC Machining',
    url: 'https://cdn.coverr.co/videos/coverr-automated-machinery-operating-5683/1080p.mp4',
    altUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  },
];

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onExploreCatalog,
  onOpenRfq,
  onSelectCategory,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const switchVideo = (index: number) => {
    setActiveClipIndex(index);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const categories = [
    { id: 'automation', label: 'Automation & Custom Machines', count: '3 Sistem' },
    { id: 'jig-fixture', label: 'Jig – Fixture – Precision', count: 'Sub-Mikron' },
    { id: 'dies-moulds', label: 'Dies & Moulds Heavy Duty', count: '110T – 250T' },
    { id: 'mass-production', label: 'Parts Mass Production', count: 'Press & Lathe' },
    { id: 'facility-tools', label: 'Armada Mesin & CMM', count: 'Double Column' },
  ];

  // Selected marquee items from clients and partners
  const marqueeItems = [
    'Astra Daihatsu Motor',
    'Astra Honda Motor (AHM)',
    'Yamaha Indonesia Motor',
    'Mitsubishi Motors',
    'Kalbe Farma',
    'EPSON ROBOT Partner',
    'YASKAWA Robotics',
    'NSK Bearing',
    'BOSCH Rexroth',
    'KEYENCE Vision',
  ];

  return (
    <section
      id="hero"
      className="pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 relative overflow-hidden bg-neutral-950 border-b border-neutral-800/80"
    >
      {/* Background Accent Gradients & Grid Pattern (Clean Industrial Theme, No Human Silhouette) */}
      <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-[480px] h-[480px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-28 w-[420px] h-[420px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Real Factory Machinery Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-20 mix-blend-screen">
        {!videoError ? (
          <video
            ref={videoRef}
            key={VIDEO_CLIPS[activeClipIndex].url}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover scale-105 transition-opacity duration-1000"
          >
            <source src={VIDEO_CLIPS[activeClipIndex].url} type="video/mp4" />
            <source src={VIDEO_CLIPS[activeClipIndex].altUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroPoster}
            alt="PT Prima Teknik Trada Facility MM2100"
            className="w-full h-full object-cover scale-105"
          />
        )}
        <div className="absolute inset-0 bg-neutral-950/70" />
      </div>

      {/* Main Grid Container */}
      <div className="lg:px-8 md:mt-4 md:mb-12 sm:px-6 max-w-7xl mx-auto pr-4 pl-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Content (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Top Pill Badge */}
            <div className="animate-fade-slide">
              <div className="inline-flex bg-neutral-900/90 border border-neutral-700/80 rounded-full py-1.5 px-3 sm:px-4 backdrop-blur-md gap-x-2 sm:gap-x-2.5 items-center shadow-lg">
                <span className="text-[10px] sm:text-xs tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 font-mono text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  {COMPANY_INFO.iso}
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                </span>
                <span className="text-neutral-600">|</span>
                <span className="text-[10px] sm:text-xs text-amber-400 font-mono font-medium">MM2100 CIBITUNG</span>
              </div>
            </div>

            {/* Main Headline (Scaled down appropriately to not dominate) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[2.9rem] leading-[1.18] font-extrabold tracking-tight font-display text-white">
              Presisi Mesin Industri &amp;{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                Sistem Otomasi Robotik
              </span>{' '}
              Taraf Pabrikan Global
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-sans leading-relaxed">
              Mitra manufaktur rekayasa teknik terkemuka di Kawasan Industri MM2100 Cibitung sejak 1999.
              Menyediakan solusi terpadu <strong className="text-white font-semibold">Customized Machines</strong>,{' '}
              <strong className="text-white font-semibold">Jig &amp; Fixture</strong>,{' '}
              <strong className="text-white font-semibold">Dies &amp; Moulds</strong>, hingga{' '}
              <strong className="text-white font-semibold">Produksi Massal Stamping &amp; Machining</strong>.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 pt-1">
              <button
                onClick={onOpenRfq}
                className="group inline-flex transition-all duration-300 hover:shadow-lg hover:bg-amber-300 active:scale-98 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-400 rounded-xl py-3 px-5 sm:px-6 shadow-md shadow-amber-500/20 gap-x-2 items-center justify-center cursor-pointer"
              >
                <span>Minta Penawaran Harga (RFQ)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="group inline-flex hover:text-white transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/80 text-xs sm:text-sm font-semibold text-neutral-200 border border-neutral-700 bg-neutral-900/90 rounded-xl py-3 px-5 sm:px-6 gap-x-2 items-center justify-center cursor-pointer"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Lihat Katalog Produk &amp; Mesin</span>
              </button>
            </div>

            {/* Video Background Control Bar */}
            <div className="pt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
              <span className="text-neutral-500 font-mono text-[11px] uppercase tracking-wider">
                Latar Video:
              </span>
              <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full p-1 gap-1 backdrop-blur-md">
                {VIDEO_CLIPS.map((clip, idx) => (
                  <button
                    key={clip.id}
                    onClick={() => switchVideo(idx)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                      activeClipIndex === idx
                        ? 'bg-amber-400/25 text-amber-300 border border-amber-400/40'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {clip.title}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                  title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                  title={isMuted ? 'Unmute Video' : 'Mute Video'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column Stats & Featured Clients (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            {/* Top Card: Plant MM2100 Stats & Verified Metrics */}
            <div
              className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-br from-white/10 via-white/0 to-white/10 w-full h-fit rounded-2xl sm:rounded-3xl relative border border-white/15 shadow-[2.8px_2.8px_2.2px_rgba(0,_0,_0,_0.034),_6.7px_6.7px_5.3px_rgba(0,_0,_0,_0.048),_12.5px_12.5px_10px_rgba(0,_0,_0,_0.06),_22.3px_22.3px_17.9px_rgba(0,_0,_0,_0.072),_41.8px_41.8px_33.4px_rgba(0,_0,_0,_0.086),_100px_100px_80px_rgba(0,_0,_0,_0.12)]"
              style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            >
              <div className="pt-6 sm:pt-8 pr-6 sm:pr-8 pb-6 sm:pb-8 pl-6 sm:pl-8 relative text-left">
                
                {/* Header with Target/Factory Icon */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ring-1 flex items-center justify-center bg-white/10 ring-white/20 text-white shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      className="text-white sm:w-6 sm:h-6"
                    >
                      <path
                        fill="currentColor"
                        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                        opacity=".5"
                      />
                      <path
                        fill="currentColor"
                        d="M9.25 12a.75.75 0 0 1 .75-.75h1.25V10a.75.75 0 0 1 1.5 0v1.25H14a.75.75 0 0 1 0 1.5h-1.25V14a.75.75 0 0 1-1.5 0v-1.25H10a.75.75 0 0 1-.75-.75m-7.222.75a10 10 0 0 1 0-1.5H5a.75.75 0 0 1 0 1.5zm10.722 9.222a10 10 0 0 1-1.5 0V19a.75.75 0 0 1 1.5 0zm9.222-10.722a10 10 0 0 1 0 1.5H19a.75.75 0 0 1 0-1.5zM12.75 2.028V5a.75.75 0 0 1-1.5 0V2.028a10 10 0 0 1 1.5 0"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl tracking-tighter font-manrope font-medium text-white">
                      25+ Tahun
                    </div>
                    <div className="text-xs sm:text-sm text-white/70 font-sans">
                      Pabrik MM2100 Cibitung, Bekasi
                    </div>
                  </div>
                </div>

                {/* ISO Standard Progress Meter */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-white/70 font-sans">Standar Mutu ISO 9001:2015</span>
                    <span className="text-white font-mono font-semibold">100% Terverifikasi</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r rounded-full from-amber-400 via-amber-200 to-white"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent my-3 sm:my-4" />

                {/* Three Metrics with Dividers */}
                <div className="flex justify-between mb-3 sm:mb-4 gap-2">
                  <div className="text-center px-1 sm:px-2 cursor-pointer transition-all duration-300 rounded-xl sm:rounded-2xl hover:bg-white/5 hover:-translate-y-0.5 flex-1">
                    <div className="text-xl sm:text-2xl leading-tight bg-gradient-to-r from-white/95 to-neutral-200/80 bg-clip-text text-transparent font-sans font-medium">
                      250T
                    </div>
                    <div className="text-[10px] sm:text-xs opacity-70 uppercase tracking-wide font-sans text-neutral-300">
                      Tonase Press
                    </div>
                  </div>
                  <div className="w-px h-10 sm:h-12 my-auto bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                  <div className="text-center px-1 sm:px-2 cursor-pointer transition-all duration-300 rounded-xl sm:rounded-2xl hover:bg-white/5 hover:-translate-y-0.5 flex-1">
                    <div className="text-xl sm:text-2xl leading-tight bg-gradient-to-r from-white/95 to-neutral-200/80 bg-clip-text text-transparent font-sans font-medium">
                      3.0m
                    </div>
                    <div className="text-[10px] sm:text-xs opacity-70 uppercase tracking-wide font-sans text-neutral-300">
                      Double Column
                    </div>
                  </div>
                  <div className="w-px h-10 sm:h-12 my-auto bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                  <div className="text-center px-1 sm:px-2 cursor-pointer transition-all duration-300 rounded-xl sm:rounded-2xl hover:bg-white/5 hover:-translate-y-0.5 flex-1">
                    <div className="text-xl sm:text-2xl leading-tight bg-gradient-to-r from-white/95 to-neutral-200/80 bg-clip-text text-transparent font-sans font-medium">
                      90+
                    </div>
                    <div className="text-[10px] sm:text-xs opacity-70 uppercase tracking-wide font-sans text-neutral-300">
                      Personil
                    </div>
                  </div>
                </div>

                {/* Bottom Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-zinc-300 font-sans">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                    OPERATIONAL MM2100
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-zinc-300 font-sans">
                    <Award className="w-3 h-3 text-amber-300" />
                    CERTIFIED ISO
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-zinc-300 font-sans">
                    <ShieldCheck className="w-3 h-3 text-white" />
                    LAHAN 2.806 m²
                  </span>
                </div>

                {/* Fast RFQ Shortcut inside Card */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <button
                    onClick={onOpenRfq}
                    className="w-full py-2 px-3 text-xs font-semibold text-amber-300 hover:text-white bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Kirim Gambar Teknik &amp; Permintaan Harga</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Bottom Card: Featured Clients & Technical Partners Marquee */}
            <div
              className="overflow-hidden transition-all duration-300 bg-gradient-to-br from-white/10 via-white/0 to-white/10 w-full h-fit rounded-2xl sm:rounded-3xl relative border border-white/15 shadow-[4px_4px_6px_rgba(0,_0,_0,_0.049),_9.6px_9.6px_7.6px_rgba(0,_0,_0,_0.069),_18px_18px_14.3px_rgba(0,_0,_0,_0.086),_32px_32px_25.6px_rgba(0,_0,_0,_0.103),_60px_60px_47.8px_rgba(0,_0,_0,_0.123),_143px_143px_114.3px_rgba(0,_0,_0,_0.172)]"
              style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            >
              <div className="pt-6 sm:pt-7 pr-6 sm:pr-8 pb-6 sm:pb-7 pl-6 sm:pl-8 relative text-left">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-sans text-white font-medium">
                    Featured Clients &amp; Partners
                  </h3>
                  <span className="text-[11px] font-mono text-white/50">
                    Otomotif · Robotika
                  </span>
                </div>

                {/* Looping Marquee */}
                <div className="overflow-hidden relative">
                  <div
                    style={{
                      maskImage:
                        'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                      WebkitMaskImage:
                        'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    }}
                    className="overflow-hidden py-1"
                  >
                    <div className="animate-marquee flex gap-3 sm:gap-4 will-change-transform">
                      {/* First set */}
                      <div className="flex gap-3 sm:gap-4 shrink-0">
                        {marqueeItems.map((item, idx) => (
                          <div
                            key={`m1-${idx}`}
                            className="inline-flex items-center justify-center px-3.5 py-1.5 bg-white/5 border border-white/10 hover:border-amber-400/40 rounded-xl text-xs font-medium text-neutral-200 whitespace-nowrap backdrop-blur-md transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>

                      {/* Duplicate set for seamless infinite loop */}
                      <div className="flex gap-3 sm:gap-4 shrink-0">
                        {marqueeItems.map((item, idx) => (
                          <div
                            key={`m2-${idx}`}
                            className="inline-flex items-center justify-center px-3.5 py-1.5 bg-white/5 border border-white/10 hover:border-amber-400/40 rounded-xl text-xs font-medium text-neutral-200 whitespace-nowrap backdrop-blur-md transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-white/50 font-mono">
                  <span>Ekspor: JP · MY · PH · TH</span>
                  <span>Mitra: Epson · Yaskawa · Hiwin</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Intuitive Quick Category Navigation Bar at bottom of Hero */}
      <div className="relative z-10 border-t border-white/10 bg-neutral-950/80 backdrop-blur-md mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1">
            <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider whitespace-nowrap hidden sm:inline-block">
              Akses Kategori:
            </span>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="group flex-1 sm:flex-initial inline-flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer whitespace-nowrap focus:outline-none"
                >
                  <span className="group-hover:text-amber-400 transition-colors">{cat.label}</span>
                  <span className="text-[10px] text-neutral-400 group-hover:text-neutral-300 font-mono">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

