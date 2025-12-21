
import { ReactNode } from 'react';

/**
 * eAMS Typographic Logo
 * Displays "eAMS" in brand colors centered over "MARKETPULSE" subtext.
 */
export const EamsTextLogo = ({ className, width = 140, height = 60 }: { className?: string; width?: number; height?: number }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 160 60" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* eAMS Main Brand Text - Centered */}
    <text 
      x="80" 
      y="32" 
      textAnchor="middle"
      fontStyle="normal" 
      fontWeight="900" 
      fontSize="36" 
      fontFamily="Inter, system-ui, sans-serif" 
      letterSpacing="-1"
    >
      <tspan fill="#E53238">e</tspan>
      <tspan fill="#0064D2">A</tspan>
      <tspan fill="#F5AF02">M</tspan>
      <tspan fill="#86B817">S</tspan>
    </text>
    
    {/* MARKETPULSE Subtext - Centered */}
    <text 
      x="80" 
      y="52" 
      textAnchor="middle"
      fill="#334155" 
      fontFamily="Inter, system-ui, sans-serif" 
      fontWeight="800" 
      fontSize="14" 
      letterSpacing="3"
    >
      MARKETPULSE
    </text>
  </svg>
);

export const ChartLineIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M3 3V21H21V19H5V3H3Z" />
    <path d="M19.2929 6.70711L20.7071 8.12132L14 14.8284L10 10.8284L6.70711 14.1213L5.29289 12.7071L10 8L14 12L19.2929 6.70711Z" />
  </svg>
);

export const GlobeIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LoadingSpinner = () => (
  <svg
    className="animate-spin h-8 w-8 text-primary-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export const RefreshIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h5M20 20v-5h-5M20 4s-1.5-2-6-2-6 2-6 2M4 20s1.5 2 6 2 6-2 6-2"
    />
  </svg>
);

export const CopyIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
    />
  </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);
