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
          <rect width="36" height="36" rx="8" fill="#E60012" />
          <path
            d="M11 9h8c5 0 9 3.8 9 9s-4 9-9 9h-8V9zm4.5 14.5h3.5c2.6 0 4.5-2.2 4.5-5.5s-1.9-5.5-4.5-5.5h-3.5v11z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'honda':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Honda Mini Logo">
          <rect width="36" height="36" rx="8" fill="#E4002B" />
          {/* Honda Wing emblem */}
          <path
            d="M8 12c5 1 9 4.5 12 10.5l-3 1.2c-2.4-4.8-5.6-7.8-9-9.2v-2.5zm-2 7c6 1.8 11.5 6.5 15 13.5l-3 1.2c-3-6-7.2-9.8-12-11.8v-2.9zm-2 7.5c7.5 2 13.5 7.5 17 17l-3 1c-3-7.5-8-12.5-14-14.8v-3.2z"
            fill="#FFFFFF"
            transform="scale(0.8) translate(3, -2)"
          />
        </svg>
      );

    case 'yamaha':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Yamaha Mini Logo">
          <rect width="36" height="36" rx="8" fill="#D71920" />
          {/* Yamaha 3 Tuning Forks */}
          <circle cx="18" cy="18" r="13" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <circle cx="18" cy="18" r="3" fill="#FFFFFF" />
          <path
            d="M18 5v10M18 21v10M7 11.5l8.7 5M20.3 19.5l8.7 5M7 24.5l8.7-5M20.3 16.5l8.7-5"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'mitsubishi':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Mitsubishi Mini Logo">
          <rect width="36" height="36" rx="8" fill="#18181B" />
          {/* Mitsubishi Three Red Diamonds */}
          <g fill="#ED1B2D" transform="translate(18, 18) scale(0.65) translate(-18, -18)">
            {/* Top diamond */}
            <polygon points="18,3 24,14 18,25 12,14" />
            {/* Bottom left diamond */}
            <polygon points="18,25 12,14 2,31 8,33" />
            {/* Bottom right diamond */}
            <polygon points="18,25 24,14 34,31 28,33" />
          </g>
        </svg>
      );

    case 'kalbe':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Kalbe Mini Logo">
          <rect width="36" height="36" rx="8" fill="#009639" />
          {/* Kalbe human/leaf leaping figure */}
          <path
            d="M10 12c0 10 9 18 19 18 0-10-9-18-19-18z"
            fill="#FFFFFF"
          />
          <circle cx="17" cy="25" r="5" fill="#FBB034" />
        </svg>
      );

    case 'nsk':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="NSK Mini Logo">
          <rect width="36" height="36" rx="8" fill="#C41230" />
          {/* NSK bold letters */}
          <text
            x="18"
            y="23"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
            letterSpacing="1"
          >
            NSK
          </text>
        </svg>
      );

    case 'epson':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Epson Mini Logo">
          <rect width="36" height="36" rx="8" fill="#003399" />
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
          <rect width="36" height="36" rx="8" fill="#005BBB" />
          {/* Motoman robotic dynamic blocks */}
          <rect x="8" y="10" width="10" height="10" rx="2" fill="#FFFFFF" />
          <rect x="18" y="16" width="10" height="10" rx="2" fill="#FFB81C" />
        </svg>
      );

    case 'keyence':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Keyence Mini Logo">
          <rect width="36" height="36" rx="8" fill="#DE001A" />
          {/* Keyence precision polygon */}
          <polygon points="10,10 20,10 27,18 20,26 10,26 17,18" fill="#FFFFFF" />
        </svg>
      );

    case 'bosch':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Bosch Rexroth Mini Logo">
          <rect width="36" height="36" rx="8" fill="#E20015" />
          {/* Bosch armature ring */}
          <circle cx="18" cy="18" r="10" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <path d="M11 14h14M11 22h14M13 14v8M23 14v8" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      );

    case 'omron':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Omron Mini Logo">
          <rect width="36" height="36" rx="8" fill="#005AA0" />
          <circle cx="18" cy="18" r="8" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" fill="none" />
          <circle cx="18" cy="18" r="4" fill="#FFFFFF" />
        </svg>
      );

    case 'hiwin':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Hiwin Mini Logo">
          <rect width="36" height="36" rx="8" fill="#008837" />
          {/* Hiwin Linear guide block */}
          <rect x="7" y="11" width="22" height="14" rx="3" fill="#E30613" />
          <rect x="11" y="14" width="14" height="8" rx="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'chuhatsu':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Chuhatsu Mini Logo">
          <rect width="36" height="36" rx="8" fill="#0055A5" />
          {/* Precision suspension coil */}
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
          <rect width="36" height="36" rx="8" fill="#0066B3" />
          {/* Disc brake & exhaust turbine */}
          <circle cx="18" cy="18" r="11" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <path d="M18 7v22M7 18h22M10 10l16 16M10 26L26 10" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx="18" cy="18" r="4.5" fill="#FFB81C" />
        </svg>
      );

    case 'akashi':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Akashi Mini Logo">
          <rect width="36" height="36" rx="8" fill="#1E293B" />
          {/* Transmission gear pair */}
          <circle cx="14" cy="18" r="7" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
          <circle cx="23" cy="18" r="6" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
          <circle cx="14" cy="18" r="2.5" fill="#38BDF8" />
          <circle cx="23" cy="18" r="2" fill="#F59E0B" />
        </svg>
      );

    case 'bintangtoedjoe':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Bintang Toedjoe Mini Logo">
          <rect width="36" height="36" rx="8" fill="#107C41" />
          {/* Star 7 */}
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
          <rect width="36" height="36" rx="8" fill="#0083CA" />
          {/* Pharma hexagon molecule capsule */}
          <polygon points="18,7 27,12 27,24 18,29 9,24 9,12" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <path d="M18 12v12M12 18h12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'indomatsumoto':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Matsumoto Mini Logo">
          <rect width="36" height="36" rx="8" fill="#334155" />
          {/* Stamping press die */}
          <path d="M8 10h20v5l-4 4v7h-12v-7l-4-4v-5z" fill="#F59E0B" />
          <rect x="11" y="27" width="14" height="3" rx="1" fill="#FFFFFF" />
        </svg>
      );

    case 'sugity':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Sugity Mini Logo">
          <rect width="36" height="36" rx="8" fill="#DC2626" />
          <path d="M9 13h18l-5 10H14l-5-10z" fill="#FFFFFF" />
          <circle cx="18" cy="18" r="3" fill="#DC2626" />
        </svg>
      );

    case 'aks':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="AKS Bearing Ball Mini Logo">
          <rect width="36" height="36" rx="8" fill="#0F172A" />
          {/* Mirror steel ball */}
          <circle cx="18" cy="18" r="11" fill="url(#steelBallGrad)" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="14" cy="14" r="3" fill="#FFFFFF" opacity="0.8" />
          <defs>
            <linearGradient id="steelBallGrad" x1="10" y1="10" x2="26" y2="26">
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
          <rect width="36" height="36" rx="8" fill="#0284C7" />
          <circle cx="18" cy="18" r="10" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <circle cx="18" cy="18" r="4.5" fill="#FFFFFF" />
          <path d="M7 18h4M25 18h4" stroke="#F59E0B" strokeWidth="2.5" />
        </svg>
      );

    case 'asalta':
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-label="Asalta Mini Logo">
          <rect width="36" height="36" rx="8" fill="#D97706" />
          {/* Hex head precision fastener */}
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

// FULL LOGO: High-fidelity horizontal SVG banner logo with accurate company mark + official typography
export const CompanyLogo: React.FC<{ id: string; className?: string }> = ({
  id,
  className = 'h-8 w-auto',
}) => {
  const normalizedId = id.includes(' ') || id.startsWith('PT.') ? getLogoIdFromName(id) : id.toLowerCase();

  switch (normalizedId) {
    case 'daihatsu':
      return (
        <svg viewBox="0 0 200 50" fill="none" className={className} aria-label="Daihatsu Logo">
          {/* Official Stylized D in Red Shield */}
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#E60012" />
          <path
            d="M17 16h7.5c4.5 0 8 3.5 8 8s-3.5 8-8 8H17V16zm4 12.5h3.5c2.5 0 4-1.8 4-4.5s-1.5-4.5-4-4.5H21v9z"
            fill="#FFFFFF"
          />
          <text
            x="48"
            y="32"
            fill="currentColor"
            fontSize="18"
            fontWeight="900"
            letterSpacing="2.5"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            DAIHATSU
          </text>
        </svg>
      );

    case 'honda':
      return (
        <svg viewBox="0 0 190 50" fill="none" className={className} aria-label="Honda AHM Logo">
          {/* Red Honda Wing */}
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#E4002B" />
          <path
            d="M14 17c4.5.8 8 3.8 10.5 8.5l-2.5 1c-2-3.8-4.8-6.2-8-7.2v-2.3zm-1.8 5.5c5 1.5 9.5 5 12.5 11l-2.5 1c-2.5-4.8-6-7.8-10-9.5v-2.5z"
            fill="#FFFFFF"
          />
          <text
            x="48"
            y="32"
            fill="currentColor"
            fontSize="19"
            fontWeight="900"
            letterSpacing="3"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            HONDA
          </text>
        </svg>
      );

    case 'yamaha':
      return (
        <svg viewBox="0 0 200 50" fill="none" className={className} aria-label="Yamaha Motor Logo">
          {/* Yamaha Tuning Forks Emblem */}
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#D71920" />
          <circle cx="23" cy="25" r="11" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
          <circle cx="23" cy="25" r="2.5" fill="#FFFFFF" />
          <path
            d="M23 15v6M23 29v5M14 20l5 3.2M27 27l5 3.2M14 30l5-3.2M27 23l5-3.2"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <text
            x="48"
            y="32"
            fill="currentColor"
            fontSize="18"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            YAMAHA
          </text>
        </svg>
      );

    case 'mitsubishi':
      return (
        <svg viewBox="0 0 215 50" fill="none" className={className} aria-label="Mitsubishi Motors Logo">
          {/* Mitsubishi 3 Diamonds */}
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#18181B" stroke="#ED1B2D" strokeWidth="1.5" />
          <g fill="#ED1B2D" transform="translate(23, 25) scale(0.65) translate(-18, -18)">
            <polygon points="18,3 24,14 18,25 12,14" />
            <polygon points="18,25 12,14 2,31 8,33" />
            <polygon points="18,25 24,14 34,31 28,33" />
          </g>
          <text
            x="48"
            y="32"
            fill="currentColor"
            fontSize="17"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            MITSUBISHI
          </text>
        </svg>
      );

    case 'kalbe':
      return (
        <svg viewBox="0 0 180 50" fill="none" className={className} aria-label="Kalbe Farma Logo">
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#009639" />
          <path d="M15 17c0 8 7 14 15 14 0-8-7-14-15-14z" fill="#FFFFFF" />
          <circle cx="21" cy="27" r="4" fill="#FBB034" />
          <text
            x="48"
            y="32"
            fill="currentColor"
            fontSize="18"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            KALBE
          </text>
        </svg>
      );

    case 'nsk':
      return (
        <svg viewBox="0 0 170 50" fill="none" className={className} aria-label="NSK Bearing Logo">
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#C41230" />
          <circle cx="23" cy="25" r="10" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <circle cx="23" cy="25" r="5" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
          <circle cx="23" cy="25" r="2" fill="#FFFFFF" />
          <text
            x="48"
            y="32"
            fill="currentColor"
            fontSize="21"
            fontWeight="900"
            letterSpacing="3"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            NSK
          </text>
        </svg>
      );

    case 'epson':
      return (
        <svg viewBox="0 0 200 50" fill="none" className={className} aria-label="Epson Robot Logo">
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#003399" />
          <text x="23" y="27" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">
            E
          </text>
          <text
            x="48"
            y="28"
            fill="#003399"
            className="dark:fill-[#38BDF8]"
            fontSize="19"
            fontWeight="900"
            letterSpacing="1"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            EPSON
          </text>
          <text
            x="48"
            y="41"
            fill="#F59E0B"
            fontSize="10"
            fontWeight="800"
            letterSpacing="2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            ROBOTICS
          </text>
        </svg>
      );

    case 'yaskawa':
      return (
        <svg viewBox="0 0 210 50" fill="none" className={className} aria-label="Yaskawa Motoman Logo">
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#005BBB" />
          <rect x="13" y="16" width="8" height="8" rx="1.5" fill="#FFFFFF" />
          <rect x="23" y="22" width="8" height="8" rx="1.5" fill="#FFB81C" />
          <text
            x="48"
            y="32"
            fill="currentColor"
            fontSize="18"
            fontWeight="900"
            letterSpacing="1.5"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            YASKAWA
          </text>
        </svg>
      );

    case 'keyence':
      return (
        <svg viewBox="0 0 200 50" fill="none" className={className} aria-label="Keyence Logo">
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#DE001A" />
          <polygon points="13,17 21,17 28,25 21,33 13,33 20,25" fill="#FFFFFF" />
          <text
            x="48"
            y="32"
            fill="currentColor"
            fontSize="18"
            fontWeight="900"
            letterSpacing="1.5"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            KEYENCE
          </text>
        </svg>
      );

    case 'bosch':
      return (
        <svg viewBox="0 0 215 50" fill="none" className={className} aria-label="Bosch Rexroth Logo">
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#E20015" />
          <circle cx="23" cy="25" r="9" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <path d="M17 22h12M17 28h12M19 22v6M27 22v6" stroke="#FFFFFF" strokeWidth="1.6" />
          <text
            x="48"
            y="28"
            fill="currentColor"
            fontSize="16"
            fontWeight="900"
            letterSpacing="1"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            REXROTH
          </text>
          <text
            x="48"
            y="40"
            fill="#94A3B8"
            fontSize="8"
            fontWeight="700"
            letterSpacing="1.5"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            A BOSCH COMPANY
          </text>
        </svg>
      );

    case 'omron':
      return (
        <svg viewBox="0 0 190 50" fill="none" className={className} aria-label="Omron Logo">
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#005AA0" />
          <circle cx="23" cy="25" r="8" stroke="#FFFFFF" strokeWidth="1.8" strokeDasharray="3 2" fill="none" />
          <circle cx="23" cy="25" r="4" fill="#FFFFFF" />
          <text
            x="48"
            y="33"
            fill="#005AA0"
            className="dark:fill-[#38BDF8]"
            fontSize="20"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            OMRON
          </text>
        </svg>
      );

    case 'hiwin':
      return (
        <svg viewBox="0 0 180 50" fill="none" className={className} aria-label="Hiwin Logo">
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#008837" />
          <rect x="13" y="18" width="20" height="14" rx="3" fill="#E30613" />
          <rect x="16" y="21" width="14" height="8" rx="1.5" fill="#FFFFFF" />
          <text
            x="48"
            y="33"
            fill="currentColor"
            fontSize="18"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            HIWIN
          </text>
        </svg>
      );

    case 'chuhatsu':
      return (
        <svg viewBox="0 0 200 50" fill="none" className={className} aria-label="Chuhatsu Logo">
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#0055A5" />
          <path
            d="M13 25c0-5 3.5-9 9-9s9 4 9 9-3.5 9-9 9"
            stroke="#FFB81C"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <text
            x="48"
            y="32"
            fill="currentColor"
            fontSize="16"
            fontWeight="900"
            letterSpacing="1.5"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            CHUHATSU
          </text>
        </svg>
      );

    case 'yutaka':
      return (
        <svg viewBox="0 0 190 50" fill="none" className={className} aria-label="Yutaka Logo">
          <rect x="6" y="8" width="34" height="34" rx="8" fill="#0066B3" />
          <circle cx="23" cy="25" r="9" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <circle cx="23" cy="25" r="3.5" fill="#FFB81C" />
          <text
            x="48"
            y="32"
            fill="currentColor"
            fontSize="17"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            YUTAKA
          </text>
        </svg>
      );

    default:
      return (
        <div className="flex items-center gap-2.5">
          <CompanyMiniLogo id={normalizedId} className="w-8 h-8" />
          <span className="font-bold text-sm tracking-wide">{id.replace('PT. ', '')}</span>
        </div>
      );
  }
};
