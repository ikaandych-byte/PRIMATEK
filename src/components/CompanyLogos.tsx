import React from 'react';

// Crisp, high-fidelity SVG logos for verified automotive OEM clients and technical partners
export const CompanyLogo: React.FC<{ id: string; className?: string }> = ({ id, className = "h-8 w-auto" }) => {
  switch (id) {
    case 'daihatsu':
      return (
        <svg viewBox="0 0 200 60" fill="currentColor" className={className} aria-label="Daihatsu Logo">
          <path
            d="M24 10C13 10 5 19 5 30s8 20 19 20c8 0 14-5 17-12h-8c-2 4-5 6-9 6-7 0-12-6-12-14s5-14 12-14c4 0 7 2 9 6h8c-3-7-9-12-17-12z"
            fill="#E60012"
          />
          <path
            d="M36 21c-2-4-5-6-9-6-7 0-12 6-12 15s5 15 12 15c4 0 7-2 9-6h-6c-2 2-3 2-5 2-4 0-7-4-7-11s3-11 7-11c2 0 3 0 5 2h9z"
            fill="#E60012"
            opacity="0.9"
          />
          <text x="52" y="38" fill="currentColor" fontSize="18" fontWeight="800" letterSpacing="1.5" fontFamily="sans-serif">
            DAIHATSU
          </text>
        </svg>
      );

    case 'honda':
      return (
        <svg viewBox="0 0 190 60" fill="currentColor" className={className} aria-label="Honda AHM Logo">
          <g fill="#E4002B">
            <path d="M12 12c4 1 8 5 11 11l-3 1c-2-4-5-8-8-9l0-3z" />
            <path d="M9 19c6 2 12 7 16 15l-3 1c-4-7-9-11-13-13v-3z" />
            <path d="M6 27c8 2 16 9 20 20l-3 1c-4-9-10-15-17-18v-3z" />
            <path d="M4 35c10 3 20 11 23 23h-3c-3-10-11-17-20-20v-3z" />
          </g>
          <text x="36" y="39" fill="currentColor" fontSize="19" fontWeight="900" letterSpacing="2" fontFamily="sans-serif">
            HONDA
          </text>
        </svg>
      );

    case 'yamaha':
      return (
        <svg viewBox="0 0 190 60" fill="currentColor" className={className} aria-label="Yamaha Motor Logo">
          <g fill="#D71920">
            <circle cx="20" cy="30" r="16" fill="none" stroke="#D71920" strokeWidth="2.5" />
            <circle cx="20" cy="30" r="3.5" fill="#D71920" />
            <path d="M20 14v12M20 34v12M8 23l10 5M22 32l10 5M8 37l10-5M22 28l10-5" stroke="#D71920" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <text x="44" y="38" fill="currentColor" fontSize="18" fontWeight="800" letterSpacing="1.5" fontFamily="sans-serif">
            YAMAHA
          </text>
        </svg>
      );

    case 'mitsubishi':
      return (
        <svg viewBox="0 0 210 60" fill="currentColor" className={className} aria-label="Mitsubishi Motors Logo">
          <g fill="#ED1B2D">
            <polygon points="20,12 28,26 20,40 12,26" />
            <polygon points="20,40 12,26 4,40 12,54" />
            <polygon points="20,40 28,26 36,40 28,54" />
          </g>
          <text x="44" y="39" fill="currentColor" fontSize="16" fontWeight="800" letterSpacing="1" fontFamily="sans-serif">
            MITSUBISHI
          </text>
        </svg>
      );

    case 'kalbe':
      return (
        <svg viewBox="0 0 190 60" fill="currentColor" className={className} aria-label="Kalbe Farma Logo">
          <g fill="#2BA643">
            <path d="M12 18c0 12 10 22 22 22 0-12-10-22-22-22z" fill="#009639" />
            <circle cx="20" cy="36" r="6" fill="#FBB034" />
          </g>
          <text x="40" y="38" fill="currentColor" fontSize="18" fontWeight="800" letterSpacing="1.5" fontFamily="sans-serif">
            KALBE
          </text>
        </svg>
      );

    case 'nsk':
      return (
        <svg viewBox="0 0 170 60" fill="currentColor" className={className} aria-label="NSK Bearing Logo">
          <g fill="#C41230">
            <circle cx="20" cy="30" r="14" fill="none" stroke="#C41230" strokeWidth="3" />
            <circle cx="20" cy="30" r="7" fill="none" stroke="#C41230" strokeWidth="2" />
            <circle cx="20" cy="30" r="2.5" fill="#C41230" />
          </g>
          <text x="42" y="39" fill="currentColor" fontSize="20" fontWeight="900" letterSpacing="2" fontFamily="sans-serif">
            NSK
          </text>
        </svg>
      );

    case 'epson':
      return (
        <svg viewBox="0 0 190 60" fill="currentColor" className={className} aria-label="Epson Robot Logo">
          <text x="6" y="36" fill="#003399" fontSize="22" fontWeight="900" letterSpacing="1" fontFamily="sans-serif">
            EPSON
          </text>
          <text x="6" y="49" fill="#F59E0B" fontSize="9" fontWeight="700" letterSpacing="1.5" fontFamily="sans-serif">
            ROBOTICS
          </text>
        </svg>
      );

    case 'yaskawa':
      return (
        <svg viewBox="0 0 200 60" fill="currentColor" className={className} aria-label="Yaskawa Logo">
          <g fill="#005BBB">
            <rect x="6" y="18" width="12" height="12" fill="#005BBB" />
            <rect x="20" y="24" width="12" height="12" fill="#FFB81C" />
          </g>
          <text x="38" y="38" fill="currentColor" fontSize="18" fontWeight="900" letterSpacing="1" fontFamily="sans-serif">
            YASKAWA
          </text>
        </svg>
      );

    case 'keyence':
      return (
        <svg viewBox="0 0 200 60" fill="currentColor" className={className} aria-label="Keyence Logo">
          <g fill="#DE001A">
            <polygon points="6,18 16,18 24,30 16,42 6,42 14,30" />
          </g>
          <text x="32" y="38" fill="currentColor" fontSize="19" fontWeight="900" letterSpacing="1.5" fontFamily="sans-serif">
            KEYENCE
          </text>
        </svg>
      );

    case 'bosch':
      return (
        <svg viewBox="0 0 210 60" fill="currentColor" className={className} aria-label="Bosch Rexroth Logo">
          <circle cx="18" cy="30" r="14" fill="none" stroke="#E20015" strokeWidth="2.5" />
          <path d="M10 24h16M10 36h16M12 24v12M24 24v12" stroke="#E20015" strokeWidth="2" />
          <text x="38" y="34" fill="currentColor" fontSize="16" fontWeight="800" letterSpacing="1" fontFamily="sans-serif">
            REXROTH
          </text>
          <text x="38" y="46" fill="#A3A3A3" fontSize="8" fontWeight="700" letterSpacing="1" fontFamily="sans-serif">
            A BOSCH COMPANY
          </text>
        </svg>
      );

    case 'omron':
      return (
        <svg viewBox="0 0 180 60" fill="currentColor" className={className} aria-label="Omron Logo">
          <text x="8" y="38" fill="#005AA0" fontSize="22" fontWeight="900" letterSpacing="1.5" fontFamily="sans-serif">
            OMRON
          </text>
        </svg>
      );

    default:
      return (
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="font-bold text-sm tracking-wide">{id.toUpperCase()}</span>
        </div>
      );
  }
};
