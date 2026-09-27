import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
} from 'lucide-react';
import heroPoster from '../assets/images/hero_industrial_automation_1790239853481.jpg';
import { COMPANY_INFO } from '../data/company';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedCategories } from '../utils/localizedData';

interface HeroVideoProps {
  onExploreCatalog: () => void;
  onOpenRfq: () => void;
  onSelectCategory: (category: string) => void;
}

const VIDEO_CLIPS = [
  {
    id: 'industrial-robotics',
    titleEn: 'Automated Robotics & Machining',
    titleId: 'Robotika Industri & Permesinan',
    url: 'https://cdn.coverr.co/videos/coverr-robotic-arm-working-in-a-factory-6782/1080p.mp4',
    altUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'cnc-manufacturing',
    titleEn: 'Precision CNC Machining',
    titleId: 'Pemesinan Presisi CNC',
    url: 'https://cdn.coverr.co/videos/coverr-automated-machinery-operating-5683/1080p.mp4',
    altUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  },
];

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onExploreCatalog,
  onOpenRfq,
  onSelectCategory,
}) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

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

  const categories = getLocalizedCategories(language).filter((c) => c.id !== 'all');

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
      className={`pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 relative overflow-hidden border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#080a0f] border-neutral-800/80'
          : 'bg-slate-100 border-slate-200'
      }`}
    >
      {/* 1. Hero Background Facility & Machinery Image (Always clearly visible in both light & dark modes) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src={heroPoster}
          alt="PT. PRIMA TEKNIK TRADA Industrial Machinery & Robotics Facility"
          className={`w-full h-full object-cover object-center scale-100 sm:scale-105 transition-all duration-700 ${
            isDark
              ? 'opacity-70 brightness-95 contrast-110 saturate-[1.15]'
              : 'opacity-65 brightness-100 contrast-105 saturate-[1.1]'
          }`}
        />

        {/* Ambient Real Factory Machinery Video Layer (Overlaid smoothly when playing) */}
        {!videoError && isPlaying && activeClipIndex >= 0 && (
          <video
            ref={videoRef}
            key={VIDEO_CLIPS[activeClipIndex]?.url || VIDEO_CLIPS[0].url}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isDark ? 'opacity-30 mix-blend-screen' : 'opacity-20 mix-blend-multiply'
            }`}
          >
            <source src={VIDEO_CLIPS[activeClipIndex]?.url || VIDEO_CLIPS[0].url} type="video/mp4" />
            <source src={VIDEO_CLIPS[activeClipIndex]?.altUrl || VIDEO_CLIPS[0].altUrl} type="video/mp4" />
          </video>
        )}

        {/* Readability Vignette Gradient: Keeps left headline readable while letting right machinery shine through clearly */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-[#080a0f]/92 via-[#080a0f]/75 to-[#080a0f]/45'
              : 'bg-gradient-to-r from-slate-100/92 via-white/80 to-slate-100/50'
          }`}
        />

        {/* Vertical Transition Gradient */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-b from-[#080a0f]/75 via-transparent to-[#080a0f]/90'
              : 'bg-gradient-to-b from-white/70 via-transparent to-slate-100/85'
          }`}
        />
      </div>

      {/* 2. Soft Ambient Glowing Accents */}
      <div
        className={`absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full blur-[140px] pointer-events-none ${
          isDark ? 'bg-amber-500/15' : 'bg-amber-400/15'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-28 w-[420px] h-[420px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? 'bg-amber-600/10' : 'bg-amber-500/10'
        }`}
      />
      
      {/* 3. Subtle Tech Grid Pattern (accented so it doesn't obscure the machinery) */}
      <div
        className="absolute inset-0 bg-tech-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none opacity-20"
      />

      {/* Main Grid Container - Optimized for HP, Tablet, PC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Content (Mobile, Tablet, Desktop) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Top Badge */}
            <div className="animate-fade-slide">
              <div
                className={`inline-flex rounded-full py-1.5 px-3 sm:px-4 backdrop-blur-md gap-x-2 sm:gap-x-2.5 items-center shadow-sm border transition-colors ${
                  isDark
                    ? 'bg-neutral-900/90 border-neutral-700/80 text-neutral-300'
                    : 'bg-white/95 border-slate-300 text-slate-800 shadow-slate-200/50'
                }`}
              >
                <span className="text-[10px] sm:text-xs tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  {t.hero.isoBadge}
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                </span>
                <span className={isDark ? 'text-neutral-600' : 'text-slate-300'}>|</span>
                <span className={`text-[10px] sm:text-xs font-mono font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                  {t.hero.locationBadge}
                </span>
              </div>
            </div>

            {/* Main Headline - Responsive Typographic Scale */}
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[2.9rem] leading-[1.18] font-extrabold tracking-tight font-display transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t.hero.headlinePart1}
              <span
                className={`bg-clip-text text-transparent ${
                  isDark
                    ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200'
                    : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600'
                }`}
              >
                {t.hero.headlineHighlight}
              </span>{' '}
              {t.hero.headlinePart2}
            </h1>

            {/* Description */}
            <p
              className={`text-xs sm:text-sm md:text-base max-w-xl font-sans leading-relaxed transition-colors ${
                isDark ? 'text-neutral-300' : 'text-slate-700 font-normal'
              }`}
            >
              {t.hero.subheadlinePrefix}{' '}
              {language === 'en' ? (
                <>
                  Delivering integrated turnkey solutions:{' '}
                  <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-bold'}>
                    Customized Machines
                  </strong>
                  ,{' '}
                  <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-bold'}>
                    Precision Jig &amp; Fixture
                  </strong>
                  ,{' '}
                  <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-bold'}>
                    Dies &amp; Moulds
                  </strong>
                  , through to{' '}
                  <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-bold'}>
                    Mass Production Stamping &amp; Machining
                  </strong>
                  .
                </>
              ) : (
                <>
                  Menyediakan solusi terpadu{' '}
                  <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-bold'}>
                    Customized Machines
                  </strong>
                  ,{' '}
                  <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-bold'}>
                    Jig &amp; Fixture
                  </strong>
                  ,{' '}
                  <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-bold'}>
                    Dies &amp; Moulds
                  </strong>
                  , hingga{' '}
                  <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-bold'}>
                    Produksi Massal Stamping &amp; Machining
                  </strong>
                  .
                </>
              )}
            </p>

            {/* CTA Buttons Row - Mobile Stacks, Tablet/PC Row */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 pt-1">
              <button
                onClick={onOpenRfq}
                className="group inline-flex transition-all duration-300 hover:shadow-lg hover:bg-amber-300 active:scale-98 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-400 rounded-xl py-3 px-5 sm:px-6 shadow-md shadow-amber-500/20 gap-x-2 items-center justify-center cursor-pointer"
              >
                <span>{t.hero.rfqCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCatalog}
                className={`group inline-flex transition-all duration-300 text-xs sm:text-sm font-semibold rounded-xl py-3 px-5 sm:px-6 gap-x-2 items-center justify-center cursor-pointer border ${
                  isDark
                    ? 'hover:text-white hover:border-neutral-600 hover:bg-neutral-800/80 text-neutral-200 border-neutral-700 bg-neutral-900/90'
                    : 'hover:text-slate-950 hover:border-slate-400 hover:bg-slate-100 text-slate-800 border-slate-300 bg-white shadow-xs'
                }`}
              >
                <Layers className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                <span>{t.hero.catalogCta}</span>
              </button>
            </div>

            {/* Video Controls & Mode Indicator */}
            <div
              className={`pt-2 flex flex-wrap items-center gap-2.5 text-xs ${
                isDark ? 'text-neutral-300' : 'text-slate-700'
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
                {t.hero.videoBgLabel}
              </span>
              <div
                className={`inline-flex items-center rounded-full p-1 gap-1 backdrop-blur-md border ${
                  isDark ? 'bg-neutral-900/85 border-neutral-700/80' : 'bg-slate-200/80 border-slate-300'
                }`}
              >
                {VIDEO_CLIPS.map((clip, idx) => (
                  <button
                    key={clip.id}
                    onClick={() => switchVideo(idx)}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer ${
                      activeClipIndex === idx && isPlaying
                        ? isDark
                          ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                          : 'bg-amber-500 text-white font-semibold shadow-xs'
                        : isDark
                          ? 'text-neutral-300 hover:text-white'
                          : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {language === 'en' ? clip.titleEn : clip.titleId}
                  </button>
                ))}

                {/* HD Facility Photo Button */}
                <button
                  onClick={() => {
                    setActiveClipIndex(-1);
                    setIsPlaying(false);
                    if (videoRef.current) {
                      videoRef.current.pause();
                    }
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer ${
                    activeClipIndex === -1 || !isPlaying
                      ? isDark
                        ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                        : 'bg-amber-500 text-white font-semibold shadow-xs'
                      : isDark
                        ? 'text-neutral-300 hover:text-white'
                        : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {language === 'en' ? 'Facility Photo (HD)' : 'Foto Fasilitas (HD)'}
                </button>
              </div>

              {activeClipIndex >= 0 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={togglePlay}
                    className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border-neutral-700'
                        : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300 shadow-xs'
                    }`}
                    title={isPlaying ? 'Pause Video' : 'Play Video'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border-neutral-700'
                        : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300 shadow-xs'
                    }`}
                    title={isMuted ? 'Unmute Video' : 'Mute Video'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column Stats & Featured Clients (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            {/* Top Card: Plant MM2100 Stats & Verified Metrics */}
            <div
              className={`overflow-hidden transition-all duration-300 w-full h-fit rounded-2xl sm:rounded-3xl relative border shadow-xl ${
                isDark
                  ? 'bg-neutral-900/85 border-neutral-700/80 backdrop-blur-md'
                  : 'bg-white/95 border-slate-200/90 shadow-slate-200 backdrop-blur-md'
              }`}
            >
              <div className="p-5 sm:p-7 relative text-left">
                
                {/* Header with Factory Badge */}
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border ${
                      isDark
                        ? 'bg-amber-400/10 border-amber-400/30 text-amber-400'
                        : 'bg-amber-50 border-amber-300 text-amber-600'
                    }`}
                  >
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div
                      className={`text-xl sm:text-2xl tracking-tight font-display font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {t.hero.experienceYears}
                    </div>
                    <div className={`text-xs sm:text-sm ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                      {t.hero.experienceSub}
                    </div>
                  </div>
                </div>

                {/* ISO Standard Progress Meter */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? 'text-neutral-300' : 'text-slate-600'}>
                      {language === 'en' ? 'Quality Standard ISO 9001:2015' : 'Standar Mutu ISO 9001:2015'}
                    </span>
                    <span className={`font-mono font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                      {t.hero.isoVerified}
                    </span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-neutral-800' : 'bg-slate-200'}`}>
                    <div
                      className="h-full bg-gradient-to-r rounded-full from-amber-500 via-amber-400 to-amber-300"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                {/* Three Metrics Grid with Dividers */}
                <div
                  className={`grid grid-cols-3 gap-2 py-3 border-y my-3 ${
                    isDark ? 'border-neutral-800/80' : 'border-slate-200'
                  }`}
                >
                  <div className="text-center px-1">
                    <div
                      className={`text-lg sm:text-xl font-bold font-display ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      250T
                    </div>
                    <div className={`text-[10px] uppercase font-mono mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                      {t.hero.statPressTonnage}
                    </div>
                  </div>
                  <div
                    className={`text-center px-1 border-x ${
                      isDark ? 'border-neutral-800/80' : 'border-slate-200'
                    }`}
                  >
                    <div
                      className={`text-lg sm:text-xl font-bold font-display ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      3.0m
                    </div>
                    <div className={`text-[10px] uppercase font-mono mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                      {t.hero.statDoubleColumn}
                    </div>
                  </div>
                  <div className="text-center px-1">
                    <div
                      className={`text-lg sm:text-xl font-bold font-display ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      90+
                    </div>
                    <div className={`text-[10px] uppercase font-mono mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                      {t.hero.statPersonnel}
                    </div>
                  </div>
                </div>

                {/* Bottom Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs px-2.5 py-1 rounded-full border ${
                      isDark
                        ? 'bg-neutral-900/80 border-neutral-700/70 text-neutral-300'
                        : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t.hero.tagOperational}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-1 rounded-full border ${
                      isDark
                        ? 'bg-neutral-900/80 border-neutral-700/70 text-neutral-300'
                        : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    <Award className="w-3 h-3 text-amber-500" />
                    {t.hero.tagIso}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-1 rounded-full border ${
                      isDark
                        ? 'bg-neutral-900/80 border-neutral-700/70 text-neutral-300'
                        : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    {t.hero.tagLandArea}
                  </span>
                </div>

                {/* Fast RFQ Shortcut inside Card */}
                <div className={`mt-4 pt-3 border-t ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                  <button
                    onClick={onOpenRfq}
                    className={`w-full py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                      isDark
                        ? 'text-amber-300 hover:text-white bg-amber-400/10 hover:bg-amber-400/20 border-amber-400/30'
                        : 'text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 border-amber-300'
                    }`}
                  >
                    <span>{t.hero.cardRfqShortcut}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Bottom Card: Featured Clients & Technical Partners Marquee */}
            <div
              className={`overflow-hidden transition-all duration-300 w-full h-fit rounded-2xl sm:rounded-3xl relative border shadow-lg ${
                isDark
                  ? 'bg-neutral-900/85 border-neutral-700/80 backdrop-blur-md'
                  : 'bg-white/95 border-slate-200/90 shadow-slate-200 backdrop-blur-md'
              }`}
            >
              <div className="p-5 sm:p-6 relative text-left">
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className={`text-sm sm:text-base font-bold font-display ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {t.hero.featuredClients}
                  </h3>
                  <span className={`text-[10px] sm:text-[11px] font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                    {t.hero.clientsSubtitle}
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
                      <div className="flex gap-2.5 sm:gap-3 shrink-0">
                        {marqueeItems.map((item, idx) => (
                          <div
                            key={`m1-${idx}`}
                            className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border ${
                              isDark
                                ? 'bg-white/5 border-white/10 text-neutral-200'
                                : 'bg-slate-100 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>

                      {/* Duplicate set for seamless infinite loop */}
                      <div className="flex gap-2.5 sm:gap-3 shrink-0">
                        {marqueeItems.map((item, idx) => (
                          <div
                            key={`m2-${idx}`}
                            className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border ${
                              isDark
                                ? 'bg-white/5 border-white/10 text-neutral-200'
                                : 'bg-slate-100 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-3 flex items-center justify-between text-[11px] font-mono ${
                    isDark ? 'text-neutral-400' : 'text-slate-500'
                  }`}
                >
                  <span>{t.hero.exportNote}</span>
                  <span>{t.hero.partnersNote}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Category Navigation Bar at bottom of Hero - Touch Friendly on Mobile */}
      <div
        className={`relative z-10 border-t backdrop-blur-md mt-8 sm:mt-10 ${
          isDark
            ? 'border-neutral-800/80 bg-[#080a0f]/90'
            : 'border-slate-200 bg-white/90 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1">
            <span
              className={`text-xs font-mono uppercase tracking-wider whitespace-nowrap hidden sm:inline-block ${
                isDark ? 'text-neutral-400' : 'text-slate-500'
              }`}
            >
              {t.hero.categoryAccess}
            </span>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`group flex-1 sm:flex-initial inline-flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap focus:outline-none ${
                    isDark
                      ? 'text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border-white/10 hover:border-amber-400/30'
                      : 'text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border-slate-200 hover:border-amber-500/40 shadow-2xs'
                  }`}
                >
                  <span className={isDark ? 'group-hover:text-amber-400' : 'group-hover:text-amber-600'}>
                    {cat.label}
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      isDark ? 'text-neutral-400' : 'text-slate-500'
                    }`}
                  >
                    {cat.countBadge}
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
