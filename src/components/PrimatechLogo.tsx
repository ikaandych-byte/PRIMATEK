import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface PrimatechLogoProps {
  className?: string;
  variant?: 'full' | 'badge';
  forceDark?: boolean;
}

export const PrimatechLogo: React.FC<PrimatechLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'full',
  forceDark,
}) => {
  const { theme } = useTheme();
  const isDark = forceDark !== undefined ? forceDark : theme === 'dark';

  // Primary color for "Prima", chevrons, and "PT. PRIMA TEKNIK"
  // Deep black in light mode, pure crisp white in dark mode
  const primaryColor = isDark ? '#FFFFFF' : '#0A0A0A';
  // Red color for "tech" and "TRADA" matching official artwork
  const redColor = '#E60012';

  if (variant === 'badge') {
    return (
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Primatech Badge Mark"
      >
        <rect
          width="60"
          height="60"
          rx="14"
          fill={isDark ? '#0f141f' : '#FFFFFF'}
          stroke={isDark ? '#262d3d' : '#E2E8F0'}
          strokeWidth="2"
        />
        {/* Three Aerodynamic Chevrons */}
        <g fill={primaryColor}>
          {/* 1st (Largest) */}
          <path d="M 8 10 C 13 15, 20 21, 28 26 C 20 31, 13 36, 7 41 C 12 32, 13 19, 8 10 Z" />
          {/* 2nd (Medium) */}
          <path d="M 23 13 C 27 17, 33 22, 40 26 C 33 30, 27 34, 22 38 C 26 31, 27 20, 23 13 Z" />
          {/* 3rd (Smallest) */}
          <path d="M 37 16 C 40 19, 45 23, 50 26 C 45 29, 40 32, 36 35 C 39 30, 40 22, 37 16 Z" />
        </g>
        {/* PT text */}
        <text
          x="30"
          y="52"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fontStyle="italic"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
          letterSpacing="1"
        >
          <tspan fill={primaryColor}>P</tspan>
          <tspan fill={redColor}>T</tspan>
        </text>
      </svg>
    );
  }

  // Full official corporate logo: 3 Chevrons + Primatech + PT. PRIMA TEKNIK TRADA
  return (
    <svg
      viewBox="0 0 310 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Primatech PT. Prima Teknik Trada"
    >
      {/* Three Aerodynamic Chevrons on Top Left */}
      <g fill={primaryColor}>
        {/* 1st Chevron (Largest, left) */}
        <path d="M 14 6 C 21 13, 31 20, 42 25 C 31 31, 21 38, 12 45 C 20 33, 21 18, 14 6 Z" />
        {/* 2nd Chevron (Medium, middle) */}
        <path d="M 44 11 C 49 16, 57 21, 66 26 C 57 31, 49 37, 41 42 C 48 33, 49 19, 44 11 Z" />
        {/* 3rd Chevron (Smallest, right) */}
        <path d="M 68 15 C 72 19, 79 23, 86 27 C 79 31, 72 35, 66 39 C 71 32, 72 22, 68 15 Z" />
      </g>

      {/* Middle Row: Primatech in bold italic */}
      <text
        x="10"
        y="96"
        fontSize="61"
        fontWeight="900"
        fontStyle="italic"
        fontFamily="Impact, 'Arial Black', -apple-system, sans-serif"
        letterSpacing="-0.5"
      >
        <tspan fill={primaryColor}>Prima</tspan>
        <tspan fill={redColor}>tech</tspan>
      </text>

      {/* Bottom Row: PT. PRIMA TEKNIK TRADA in clean upright bold sans-serif */}
      <text
        x="12"
        y="126"
        fontSize="19.5"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
        letterSpacing="2.2"
      >
        <tspan fill={primaryColor}>PT. PRIMA TEKNIK </tspan>
        <tspan fill={redColor}>TRADA</tspan>
      </text>
    </svg>
  );
};
