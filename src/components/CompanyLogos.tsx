import React from 'react';

// Maps company or partner name to recognized logo ID
export const getLogoIdFromName = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('daihatsu')) return 'daihatsu';
  if (n.includes('honda')) return 'honda';
  if (n.includes('yamaha')) return 'yamaha';
  if (n.includes('mitsubishi')) return 'mitsubishi';
  if (n.includes('kalbe')) return 'kalbe';
  if (n.includes('nsk')) return 'nsk';
  if (n.includes('epson')) return 'epson';
  if (n.includes('yaskawa')) return 'yaskawa';
  if (n.includes('keyence')) return 'keyence';
  if (n.includes('bosch') || n.includes('rexroth')) return 'bosch';
  if (n.includes('omron')) return 'omron';
  if (n.includes('hiwin')) return 'hiwin';
  if (n.includes('chuhatsu')) return 'chuhatsu';
  if (n.includes('yutaka')) return 'yutaka';
  if (n.includes('akashi')) return 'akashi';
  if (n.includes('bintang')) return 'bintangtoedjoe';
  if (n.includes('ferron')) return 'ferron';
  if (n.includes('hexpharm')) return 'hexpharm';
  if (n.includes('matsumoto')) return 'indomatsumoto';
  if (n.includes('sugity')) return 'sugity';
  if (n.includes('aks')) return 'aks';
  if (n.includes('vision')) return 'visionease';
  if (n.includes('asalta')) return 'asalta';
  return 'default';
};

// MINI LOGO: Standalone crisp brand mark icon for pills, marquee tags, and compact cards
export const CompanyMiniLogo: React.FC<{ id: string; className?: string }> = ({
  id,
  className = 'w-5 h-5',
}) => {
  const normalizedId = id.includes(' ') || id.startsWith('PT.') ? getLogoIdFromName(id) : id.toLowerCase();

  switch (normalizedId) {
    case 'daihatsu':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Daihatsu Mini Logo">
          <rect width="36" height="36" rx="6" fill="#E60012" />
          {/* White Daihatsu Aerodynamic D */}
          <path
            d="M8 10h11c6 0 10.5 4 10.5 8s-4.5 8-10.5 8H8V10zm4.5 12.5h6.5c3.5 0 6-2 6-4.5s-2.5-4.5-6-4.5h-6.5v9z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'honda':
      return (
        <svg viewBox="0 0 40 36" fill="none" className={className} aria-label="Honda Mini Logo">
          {/* Red Honda Motorcycle Wing with 4 feathers */}
          <g fill="#E4002B">
            <path d="M 6 32 C 8 24 13 14 22 9 C 28 6 34 5 38 6 L 37 8 C 30 8 24 10 19 14 C 15 17 12 21 9 27 Z" />
            <path d="M 7 32 C 10 24 15 18 21 15 C 26 13 30 13 34 14 L 33 16 C 27 16 22 18 18 21 C 14 24 11 27 9 32 Z" />
            <path d="M 9 32 C 12 26 17 21 22 19 C 26 18 28 18 31 19 L 30 21 C 25 21 21 23 17 26 C 14 28 12 30 10 32 Z" />
            <path d="M 11 32 C 14 28 18 24 23 23 C 25 22 27 22 28 23 L 27 24 C 23 24 20 26 17 28 C 15 30 13 31 12 32 Z" />
          </g>
        </svg>
      );

    case 'yamaha':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Yamaha Mini Logo">
          {/* Circular red emblem with silver rim */}
          <circle cx="18" cy="18" r="17" fill="#D71920" stroke="#E5E7EB" strokeWidth="2" />
          <circle cx="18" cy="18" r="14.5" fill="#E60012" />
          {/* Center hub */}
          <circle cx="18" cy="18" r="2.5" fill="#FFFFFF" />
          {/* 3 Tuning Forks with Fork 1 pointing UP to 12 o'clock */}
          <g fill="#FFFFFF" transform="translate(18, 18)">
            {/* Fork 1: straight UP (12 o'clock) */}
            <path d="M -1.2 0 L -1.2 -8 L -3.8 -10 L -3.8 -14 L -2 -13 L -1.2 -10 L 1.2 -10 L 2 -13 L 3.8 -14 L 3.8 -10 L 1.2 -8 L 1.2 0 Z" />
            {/* Fork 2: 120 degrees (bottom-right) */}
            <path
              d="M -1.2 0 L -1.2 -8 L -3.8 -10 L -3.8 -14 L -2 -13 L -1.2 -10 L 1.2 -10 L 2 -13 L 3.8 -14 L 3.8 -10 L 1.2 -8 L 1.2 0 Z"
              transform="rotate(120)"
            />
            {/* Fork 3: 240 degrees (bottom-left) */}
            <path
              d="M -1.2 0 L -1.2 -8 L -3.8 -10 L -3.8 -14 L -2 -13 L -1.2 -10 L 1.2 -10 L 2 -13 L 3.8 -14 L 3.8 -10 L 1.2 -8 L 1.2 0 Z"
              transform="rotate(240)"
            />
          </g>
        </svg>
      );

    case 'mitsubishi':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Mitsubishi Mini Logo">
          <rect width="36" height="36" rx="6" fill="#18181B" />
          {/* Three Red Diamonds meeting at center */}
          <g fill="#ED1B2D" transform="translate(18, 18)">
            <polygon points="0,0 6.5,-11.5 0,-23 -6.5,-11.5" transform="scale(0.65)" />
            <polygon points="0,0 6.5,-11.5 0,-23 -6.5,-11.5" transform="scale(0.65) rotate(120)" />
            <polygon points="0,0 6.5,-11.5 0,-23 -6.5,-11.5" transform="scale(0.65) rotate(240)" />
          </g>
        </svg>
      );

    case 'kalbe':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Kalbe Mini Logo">
          <rect width="36" height="36" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          {/* Intertwined green DNA figures */}
          <g transform="translate(18, 18) scale(0.42) translate(-25, -42)">
            {/* Upper figure (Light Green) */}
            <circle cx="28" cy="14" r="5" fill="#4BB144" />
            <path
              d="M 23 23 C 28 17 37 19 40 27 C 42 34 37 42 30 47 C 23 52 19 59 18 68 C 20 59 26 52 32 47 C 40 40 45 32 43 23 C 40 14 30 11 21 16 Z"
              fill="#4BB144"
            />
            {/* Lower figure (Forest Green) */}
            <circle cx="18" cy="38" r="5" fill="#006937" />
            <path
              d="M 14 47 C 19 42 28 44 30 52 C 32 59 27 67 20 72 C 14 77 9 84 7 92 C 7 83 11 76 17 71 C 24 65 28 58 26 50 C 24 43 17 41 11 44 Z"
              fill="#006937"
            />
          </g>
        </svg>
      );

    case 'nsk':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="NSK Mini Logo">
          <rect width="36" height="36" rx="6" fill="#E60012" />
          <text
            x="18"
            y="24"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="900"
            fontStyle="italic"
            fontFamily="Impact, Arial Black, sans-serif"
            letterSpacing="0.8"
          >
            NSK
          </text>
        </svg>
      );

    case 'epson':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Epson Mini Logo">
          <rect width="36" height="36" rx="6" fill="#003399" />
          <text
            x="18"
            y="20"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="9"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
            letterSpacing="0.5"
          >
            EPSON
          </text>
          <rect x="7" y="23" width="22" height="4" rx="2" fill="#F59E0B" />
        </svg>
      );

    case 'yaskawa':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Yaskawa Mini Logo">
          <rect width="36" height="36" rx="6" fill="#005BBB" />
          <rect x="8" y="10" width="10" height="10" rx="2" fill="#FFFFFF" />
          <rect x="18" y="16" width="10" height="10" rx="2" fill="#FFB81C" />
        </svg>
      );

    case 'keyence':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Keyence Mini Logo">
          <rect width="36" height="36" rx="6" fill="#DE001A" />
          <polygon points="10,10 20,10 27,18 20,26 10,26 17,18" fill="#FFFFFF" />
        </svg>
      );

    case 'bosch':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Bosch Rexroth Mini Logo">
          <rect width="36" height="36" rx="6" fill="#E20015" />
          <circle cx="18" cy="18" r="10" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <path d="M11 14h14M11 22h14M13 14v8M23 14v8" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      );

    case 'omron':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Omron Mini Logo">
          <rect width="36" height="36" rx="6" fill="#005AA0" />
          <circle cx="18" cy="18" r="8" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" fill="none" />
          <circle cx="18" cy="18" r="4" fill="#FFFFFF" />
        </svg>
      );

    case 'hiwin':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Hiwin Mini Logo">
          <rect width="36" height="36" rx="6" fill="#008837" />
          <rect x="7" y="11" width="22" height="14" rx="3" fill="#E30613" />
          <rect x="11" y="14" width="14" height="8" rx="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'chuhatsu':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Chuhatsu Mini Logo">
          <rect width="36" height="36" rx="6" fill="#0055A5" />
          <path
            d="M8 20c0-6 4-10 10-10s10 4 10 10-4 10-10 10"
            stroke="#FFB81C"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="18" cy="20" r="3.5" fill="#FFFFFF" />
        </svg>
      );

    case 'yutaka':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Yutaka Mini Logo">
          <rect width="36" height="36" rx="6" fill="#0066B3" />
          <circle cx="18" cy="18" r="11" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <path d="M18 7v22M7 18h22M10 10l16 16M10 26L26 10" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx="18" cy="18" r="4.5" fill="#FFB81C" />
        </svg>
      );

    case 'akashi':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Akashi Mini Logo">
          <rect width="36" height="36" rx="6" fill="#1E293B" />
          <circle cx="14" cy="18" r="7" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
          <circle cx="23" cy="18" r="6" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
          <circle cx="14" cy="18" r="2.5" fill="#38BDF8" />
          <circle cx="23" cy="18" r="2" fill="#F59E0B" />
        </svg>
      );

    case 'bintangtoedjoe':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Bintang Toedjoe Mini Logo">
          <rect width="36" height="36" rx="6" fill="#107C41" />
          <path
            d="M18 6l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2-4.5-4.4 6.2-.9z"
            fill="#FBB034"
          />
          <text x="18" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900">
            7
          </text>
        </svg>
      );

    case 'ferron':
    case 'hexpharm':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Pharma Mini Logo">
          <rect width="36" height="36" rx="6" fill="#0083CA" />
          <polygon points="18,7 27,12 27,24 18,29 9,24 9,12" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <path d="M18 12v12M12 18h12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'indomatsumoto':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Matsumoto Mini Logo">
          <rect width="36" height="36" rx="6" fill="#334155" />
          <path d="M8 10h20v5l-4 4v7h-12v-7l-4-4v-5z" fill="#F59E0B" />
          <rect x="11" y="27" width="14" height="3" rx="1" fill="#FFFFFF" />
        </svg>
      );

    case 'sugity':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Sugity Mini Logo">
          <rect width="36" height="36" rx="6" fill="#DC2626" />
          <path d="M9 13h18l-5 10H14l-5-10z" fill="#FFFFFF" />
          <circle cx="18" cy="18" r="3" fill="#DC2626" />
        </svg>
      );

    case 'aks':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="AKS Bearing Ball Mini Logo">
          <rect width="36" height="36" rx="6" fill="#0F172A" />
          <circle cx="18" cy="18" r="11" fill="url(#steelBallGradMini)" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="14" cy="14" r="3" fill="#FFFFFF" opacity="0.8" />
          <defs>
            <linearGradient id="steelBallGradMini" x1="10" y1="10" x2="26" y2="26">
              <stop stopColor="#94A3B8" />
              <stop offset="0.5" stopColor="#475569" />
              <stop offset="1" stopColor="#1E293B" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'visionease':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Vision Ease Mini Logo">
          <rect width="36" height="36" rx="6" fill="#0284C7" />
          <circle cx="18" cy="18" r="10" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <circle cx="18" cy="18" r="4.5" fill="#FFFFFF" />
          <path d="M7 18h4M25 18h4" stroke="#F59E0B" strokeWidth="2.5" />
        </svg>
      );

    case 'asalta':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Asalta Mini Logo">
          <rect width="36" height="36" rx="6" fill="#D97706" />
          <polygon points="18,8 26,13 26,23 18,28 10,23 10,13" fill="#FFFFFF" />
          <circle cx="18" cy="18" r="4" fill="#D97706" />
        </svg>
      );

    default:
      return (
        <div className={`rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-500 text-[10px] ${className}`}>
          {id.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};

// FULL LOGO: Normalized 150x85 dimension SVG logos matching the exact uploaded graphics
export const CompanyLogo: React.FC<{ id: string; className?: string }> = ({
  id,
  className = 'h-11 w-auto max-w-[135px]',
}) => {
  const normalizedId = id.includes(' ') || id.startsWith('PT.') ? getLogoIdFromName(id) : id.toLowerCase();

  switch (normalizedId) {
    // 1. DAIHATSU: Red rectangle banner with white D mark + red DAIHATSU text below
    case 'daihatsu':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Daihatsu Logo">
          {/* Red rectangle badge */}
          <rect x="24" y="6" width="102" height="46" rx="3" fill="#E60012" />
          {/* White stylized Daihatsu D */}
          <path
            d="M 46 16 L 78 16 C 96 16 109 22 109 29 C 109 36 96 42 78 42 L 57 42 L 53 42 L 46 16 Z"
            fill="#FFFFFF"
          />
          {/* Inner cutout of D showing red background */}
          <path
            d="M 57 23 L 64 35 L 77 35 C 88 35 94 32.5 94 29 C 94 25.5 88 23 77 23 L 57 23 Z"
            fill="#E60012"
          />
          {/* DAIHATSU bold typography */}
          <text
            x="75"
            y="74"
            textAnchor="middle"
            fill="#E60012"
            fontSize="16.5"
            fontWeight="900"
            letterSpacing="3"
            fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
          >
            DAIHATSU
          </text>
        </svg>
      );

    // 2. HONDA: Exact Honda Wing with 4 feathers on top + official HONDA serif wordmark below
    case 'honda':
      return (
        <svg viewBox="0 0 150 88" fill="none" className={className} aria-label="Honda Logo">
          {/* Official Honda Motorcycle Wing with 4 feather tiers */}
          <g fill="#E4002B">
            {/* Top feather sweeping all the way to apex */}
            <path d="M 24 53 C 28 39 39 23 58 14 C 74 7 96 5 130 6 L 128 8.5 C 100 8.5 80 12 65 19 C 50 25 38 36 29 49 Z" />
            {/* Feather 2 */}
            <path d="M 28 53 C 35 39 48 27 67 22 C 84 17 101 17 118 19 L 115 21.5 C 96 21 80 23 66 29 C 51 35 40 43 33 53 Z" />
            {/* Feather 3 */}
            <path d="M 34 53 C 42 42 57 33 74 30 C 88 28 100 29 109 31 L 106 33.5 C 94 33 82 35 70 40 C 58 45 47 50 40 54 Z" />
            {/* Feather 4 (Bottom) */}
            <path d="M 42 53 C 51 46 65 41 80 40 C 90 39 98 40 102 42 L 99 44 C 88 44 78 47 68 51 C 60 54 53 55 48 55 Z" />
            {/* Bottom Tail Base */}
            <polygon points="24,53 48,55 99,44 102,42 98,47 65,55 35,55" />

            {/* Official HONDA Typography with Classic Serifs */}
            {/* Letter 'H' */}
            <path d="M 16 64 h 8 v 2 h -2.5 v 6 h 7 v -6 h -2.5 v -2 h 8 v 2 h -2.5 v 15 h 2.5 v 2 h -8 v -2 h 2.5 v -6 h -7 v 6 h 2.5 v 2 h -8 v -2 h 2.5 v -15 h -2.5 z" />
            {/* Letter 'O' */}
            <path
              fillRule="evenodd"
              d="M 52 64 c 6.5 0 11 4.2 11 9.5 s -4.5 9.5 -11 9.5 s -11 -4.2 -11 -9.5 s 4.5 -9.5 11 -9.5 z m 0 3.8 c -3.8 0 -5.8 2.6 -5.8 5.7 s 2 5.7 5.8 5.7 s 5.8 -2.6 5.8 -5.7 s -2 -5.7 -5.8 -5.7 z"
            />
            {/* Letter 'N' */}
            <path d="M 68 64 h 7 v 2 h -2 v 7.5 l 8.5 -9.5 h 5 v 2 h -1.8 v 15 h 1.8 v 2 h -6.5 v -2 h 1.8 v -7.5 l -8.8 9.5 h -5 v -2 h 2 v -15 h -2 z" />
            {/* Letter 'D' */}
            <path
              fillRule="evenodd"
              d="M 94 64 h 9 c 6.5 0 10.5 3.8 10.5 9.5 s -4 9.5 -10.5 9.5 h -9 v -2 h 2.2 v -15 h -2.2 z m 5.2 3.8 v 11.4 h 3.5 c 4 0 6.5 -2.2 6.5 -5.7 s -2.5 -5.7 -6.5 -5.7 z"
            />
            {/* Letter 'A' */}
            <path
              fillRule="evenodd"
              d="M 127 64 h 5 l 8.5 17 h 2.2 v 2 h -8 v -2 h 2.5 l -1.8 -4 h -7.8 l -1.8 4 h 2.5 v 2 h -8 v -2 h 2.2 z m 2.5 4.5 l -2.8 6.5 h 5.6 z"
            />
          </g>
        </svg>
      );

    // 3. YAMAHA: Official Yamaha Circular Emblem with 3 tuning forks pointing to 12 o'clock, 120°, 240° + tall bold red YAMAHA
    case 'yamaha':
      return (
        <svg viewBox="0 0 150 90" fill="none" className={className} aria-label="Yamaha Logo">
          <defs>
            {/* Chrome metallic ring gradient */}
            <linearGradient id="yamahaChromeRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#D1D5DB" />
              <stop offset="70%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#4B5563" />
            </linearGradient>
            <linearGradient id="yamahaDiscRed" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E60012" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>

          {/* Top Circular Emblem */}
          <g transform="translate(75, 27)">
            {/* Outer embossed metallic ring */}
            <circle cx="0" cy="0" r="23" fill="url(#yamahaChromeRing)" />
            {/* Red inner disc */}
            <circle cx="0" cy="0" r="19.5" fill="url(#yamahaDiscRed)" stroke="#B91C1C" strokeWidth="1" />
            {/* Center silver hub */}
            <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="0.8" />

            {/* Three Tuning Forks: Fork 1 points STRAIGHT UP (12 o'clock / 0 deg), Fork 2 at 120 deg, Fork 3 at 240 deg */}
            <g fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5">
              {/* Fork 1: Straight UP (12 o'clock) */}
              <path d="M -1.5 0 L -1.5 -10 L -4.5 -12.5 L -4.5 -17.5 L -2.2 -16 L -1.5 -12 L 1.5 -12 L 2.2 -16 L 4.5 -17.5 L 4.5 -12.5 L 1.5 -10 L 1.5 0 Z" />
              {/* Fork 2: 120 degrees (bottom-right) */}
              <path
                d="M -1.5 0 L -1.5 -10 L -4.5 -12.5 L -4.5 -17.5 L -2.2 -16 L -1.5 -12 L 1.5 -12 L 2.2 -16 L 4.5 -17.5 L 4.5 -12.5 L 1.5 -10 L 1.5 0 Z"
                transform="rotate(120)"
              />
              {/* Fork 3: 240 degrees (bottom-left) */}
              <path
                d="M -1.5 0 L -1.5 -10 L -4.5 -12.5 L -4.5 -17.5 L -2.2 -16 L -1.5 -12 L 1.5 -12 L 2.2 -16 L 4.5 -17.5 L 4.5 -12.5 L 1.5 -10 L 1.5 0 Z"
                transform="rotate(240)"
              />
            </g>
          </g>

          {/* Bottom Wordmark: Official Tall Condensed YAMAHA in Red */}
          <g fill="#D71920">
            {/* 'Y' */}
            <path d="M 23 63 L 28 71.5 V 82 H 31 V 71.5 L 36 63 H 32.5 L 29.5 68.5 L 26.5 63 Z" />
            {/* 'A' */}
            <path d="M 44.5 63 L 40 82 H 43 L 44 77.5 H 49 L 50 82 H 53 L 48.5 63 Z M 46.5 67 L 48.2 75 H 44.8 Z" />
            {/* 'M' */}
            <path d="M 57 63 V 82 H 60 V 69 L 63.5 78.5 H 65.5 L 69 69 V 82 H 72 V 63 H 69.5 L 64.5 74.5 L 59.5 63 Z" />
            {/* 'A' */}
            <path d="M 80.5 63 L 76 82 H 79 L 80 77.5 H 85 L 86 82 H 89 L 84.5 63 Z M 82.5 67 L 84.2 75 H 80.8 Z" />
            {/* 'H' */}
            <path d="M 94 63 V 82 H 97 V 74 H 103 V 82 H 106 V 63 H 103 V 71 H 97 V 63 Z" />
            {/* 'A' */}
            <path d="M 115.5 63 L 111 82 H 114 L 115 77.5 H 120 L 121 82 H 124 L 119.5 63 Z M 117.5 67 L 119.2 75 H 115.8 Z" />
          </g>
        </svg>
      );

    // 4. MITSUBISHI: Three Red Diamonds on top + MITSUBISHI MOTORS below
    case 'mitsubishi':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Mitsubishi Motors Logo">
          {/* Three Red Diamonds meeting at origin */}
          <g fill="#E60012" transform="translate(75, 27)">
            {/* Top Diamond */}
            <polygon points="0,0 7.8,-13.5 0,-27 -7.8,-13.5" />
            {/* Bottom-right Diamond */}
            <polygon points="0,0 7.8,-13.5 0,-27 -7.8,-13.5" transform="rotate(120)" />
            {/* Bottom-left Diamond */}
            <polygon points="0,0 7.8,-13.5 0,-27 -7.8,-13.5" transform="rotate(240)" />
          </g>
          {/* MITSUBISHI MOTORS Typography */}
          <text
            x="75"
            y="63"
            textAnchor="middle"
            fill="currentColor"
            fontSize="12.5"
            fontWeight="900"
            letterSpacing="1.8"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            MITSUBISHI
          </text>
          <text
            x="75"
            y="76"
            textAnchor="middle"
            fill="currentColor"
            fontSize="10"
            fontWeight="800"
            letterSpacing="2.5"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            MOTORS
          </text>
        </svg>
      );

    // 5. KALBE FARMA: Horizontal layout with intertwined green DNA human figures on left + bold rounded KALBE text on right
    case 'kalbe':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Kalbe Farma Logo">
          {/* Left Side: Official Kalbe Intertwined Human/Leaf DNA Figures */}
          <g transform="translate(8, 4)">
            {/* Upper Figure: Light Vibrant Green (#4BB144) */}
            <circle cx="28" cy="14" r="5" fill="#4BB144" />
            <path
              d="M 23 23 C 28 17 37 19 40 27 C 42 34 37 42 30 47 C 23 52 19 59 18 68 C 20 59 26 52 32 47 C 40 40 45 32 43 23 C 40 14 30 11 21 16 Z"
              fill="#4BB144"
            />

            {/* Lower Figure: Dark Forest Green (#006937) */}
            <circle cx="18" cy="38" r="5" fill="#006937" />
            <path
              d="M 14 47 C 19 42 28 44 30 52 C 32 59 27 67 20 72 C 14 77 9 84 7 92 C 7 83 11 76 17 71 C 24 65 28 58 26 50 C 24 43 17 41 11 44 Z"
              fill="#006937"
            />
          </g>

          {/* Right Side: Official KALBE Typography with Distinct Flat-Top 'A' and Curved Terminals */}
          <g fill="currentColor" transform="translate(56, 32)">
            {/* 'K' */}
            <path d="M 0 0 H 4.5 V 24 H 0 Z M 13.5 0 H 18.5 L 7 13 L 19 24 H 13 L 3.5 13.5 L 13.5 0 Z" />
            {/* 'A' (Flat top and rounded corners matching Kalbe Farma logo) */}
            <path d="M 26 0 H 30 L 37.5 24 H 33 L 31.2 18 H 24.8 L 23 24 H 18.5 Z M 28 4.5 L 25.8 14.5 H 30.2 Z" />
            {/* 'L' */}
            <path d="M 42 0 H 46.5 V 20 H 54 V 24 H 42 Z" />
            {/* 'B' */}
            <path
              fillRule="evenodd"
              d="M 58 0 H 66 C 69.5 0 72 2.2 72 5.5 C 72 8 70.2 9.8 67.5 10.5 C 70.8 11.2 73 13.2 73 16.5 C 73 21 69.5 24 65.5 24 H 58 Z M 62.5 4 V 9.8 H 65.5 C 67 9.8 68 8.8 68 6.9 C 68 5 67 4 65.5 4 Z M 62.5 14 V 20 H 66 C 67.8 20 69 18.8 69 17 C 69 15.2 67.8 14 66 14 Z"
            />
            {/* 'E' */}
            <path d="M 77 0 H 88 V 4.2 H 81.5 V 9.8 H 87 V 14 H 81.5 V 19.8 H 88 V 24 H 77 Z" />
          </g>
        </svg>
      );

    // 6. NSK: Iconic bold italic red NSK typography
    case 'nsk':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="NSK Logo">
          <text
            x="75"
            y="56"
            textAnchor="middle"
            fill="#E60012"
            fontSize="45"
            fontWeight="900"
            fontStyle="italic"
            fontFamily="Impact, 'Arial Black', sans-serif"
            letterSpacing="2.5"
          >
            NSK
          </text>
        </svg>
      );

    // Partners (EPSON, YASKAWA, KEYENCE, BOSCH, OMRON, HIWIN) normalized to matching 150x85 dimensions
    case 'epson':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Epson Robot Logo">
          <rect x="58" y="8" width="34" height="28" rx="6" fill="#003399" />
          <text x="75" y="27" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900">
            E
          </text>
          <text
            x="75"
            y="54"
            textAnchor="middle"
            fill="#003399"
            className="dark:fill-[#38BDF8]"
            fontSize="18"
            fontWeight="900"
            letterSpacing="1.5"
            fontFamily="system-ui, sans-serif"
          >
            EPSON
          </text>
          <text
            x="75"
            y="69"
            textAnchor="middle"
            fill="#F59E0B"
            fontSize="9"
            fontWeight="800"
            letterSpacing="2"
            fontFamily="system-ui, sans-serif"
          >
            ROBOTICS
          </text>
        </svg>
      );

    case 'yaskawa':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Yaskawa Motoman Logo">
          <g transform="translate(75, 24)">
            <rect x="-14" y="-12" width="13" height="13" rx="2" fill="#005BBB" />
            <rect x="1" y="-5" width="13" height="13" rx="2" fill="#FFB81C" />
          </g>
          <text
            x="75"
            y="60"
            textAnchor="middle"
            fill="currentColor"
            fontSize="16.5"
            fontWeight="900"
            letterSpacing="1.5"
            fontFamily="system-ui, sans-serif"
          >
            YASKAWA
          </text>
          <text
            x="75"
            y="73"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1.5"
            fontFamily="system-ui, sans-serif"
          >
            MOTOMAN ROBOTICS
          </text>
        </svg>
      );

    case 'keyence':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Keyence Logo">
          <polygon points="62,10 78,10 88,22 78,34 62,34 72,22" fill="#DE001A" />
          <text
            x="75"
            y="58"
            textAnchor="middle"
            fill="currentColor"
            fontSize="16.5"
            fontWeight="900"
            letterSpacing="1.5"
            fontFamily="system-ui, sans-serif"
          >
            KEYENCE
          </text>
          <text
            x="75"
            y="72"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1.5"
            fontFamily="system-ui, sans-serif"
          >
            VISION &amp; SENSORS
          </text>
        </svg>
      );

    case 'bosch':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Bosch Rexroth Logo">
          <g transform="translate(75, 22)">
            <circle cx="0" cy="0" r="14" stroke="#E20015" strokeWidth="2.5" fill="none" />
            <path d="M-9 -4h18M-9 4h18M-5 -4v8M5 -4v8" stroke="#E20015" strokeWidth="1.8" />
          </g>
          <text
            x="75"
            y="56"
            textAnchor="middle"
            fill="currentColor"
            fontSize="15"
            fontWeight="900"
            letterSpacing="1.2"
            fontFamily="system-ui, sans-serif"
          >
            REXROTH
          </text>
          <text
            x="75"
            y="70"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="1.5"
            fontFamily="system-ui, sans-serif"
          >
            A BOSCH COMPANY
          </text>
        </svg>
      );

    case 'omron':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Omron Logo">
          <g transform="translate(75, 22)">
            <circle cx="0" cy="0" r="13" stroke="#005AA0" strokeWidth="2" strokeDasharray="4 2.5" fill="none" />
            <circle cx="0" cy="0" r="6" fill="#005AA0" />
          </g>
          <text
            x="75"
            y="58"
            textAnchor="middle"
            fill="#005AA0"
            className="dark:fill-[#38BDF8]"
            fontSize="18"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="system-ui, sans-serif"
          >
            OMRON
          </text>
          <text
            x="75"
            y="72"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1.5"
            fontFamily="system-ui, sans-serif"
          >
            AUTOMATION
          </text>
        </svg>
      );

    case 'hiwin':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Hiwin Logo">
          <g transform="translate(75, 20)">
            <rect x="-18" y="-10" width="36" height="20" rx="3" fill="#008837" />
            <rect x="-12" y="-6" width="24" height="12" rx="2" fill="#E30613" />
            <rect x="-8" y="-3" width="16" height="6" rx="1" fill="#FFFFFF" />
          </g>
          <text
            x="75"
            y="58"
            textAnchor="middle"
            fill="currentColor"
            fontSize="17"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="system-ui, sans-serif"
          >
            HIWIN
          </text>
          <text
            x="75"
            y="72"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1.5"
            fontFamily="system-ui, sans-serif"
          >
            MOTION TECHNOLOGY
          </text>
        </svg>
      );

    case 'chuhatsu':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Chuhatsu Logo">
          <g transform="translate(75, 24)">
            <circle cx="0" cy="0" r="14" stroke="#0055A5" strokeWidth="2.5" fill="none" />
            <path d="M-8 0c0-4.5 3.5-8 8-8s8 3.5 8 8-3.5 8-8 8" stroke="#FFB81C" strokeWidth="3" fill="none" />
          </g>
          <text
            x="75"
            y="58"
            textAnchor="middle"
            fill="currentColor"
            fontSize="15"
            fontWeight="900"
            letterSpacing="1.5"
            fontFamily="system-ui, sans-serif"
          >
            CHUHATSU
          </text>
        </svg>
      );

    case 'yutaka':
      return (
        <svg viewBox="0 0 150 85" fill="none" className={className} aria-label="Yutaka Logo">
          <g transform="translate(75, 24)">
            <circle cx="0" cy="0" r="14" stroke="#0066B3" strokeWidth="2.5" fill="none" />
            <circle cx="0" cy="0" r="5" fill="#FFB81C" />
          </g>
          <text
            x="75"
            y="58"
            textAnchor="middle"
            fill="currentColor"
            fontSize="16"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="system-ui, sans-serif"
          >
            YUTAKA
          </text>
        </svg>
      );

    default:
      return (
        <div className="flex flex-col items-center justify-center gap-1.5 py-1">
          <CompanyMiniLogo id={normalizedId} className="w-8 h-8" />
          <span className="font-bold text-xs tracking-wide">{id.replace('PT. ', '')}</span>
        </div>
      );
  }
};
